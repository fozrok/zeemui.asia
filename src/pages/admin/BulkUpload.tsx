import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, Image, Database, CheckCircle, AlertCircle, X } from 'lucide-react';
import { parseCSV, generateCSVTemplate, CSVPropertyData } from '../../utils/csvParser';
import { uploadPropertyImages, validateImageFile, compressImage } from '../../utils/fileUpload';
import { supabase } from '../../lib/supabase';

interface UploadStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  error?: string;
}

interface PropertyUpload {
  data: CSVPropertyData;
  images: File[];
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

const BulkUpload: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [csvData, setCsvData] = useState<CSVPropertyData[]>([]);
  const [propertyUploads, setPropertyUploads] = useState<PropertyUpload[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [csvError, setCsvError] = useState<string | null>(null);
  
  const steps: UploadStep[] = [
    {
      id: 'csv',
      title: 'Upload CSV Data',
      description: 'Import property details from CSV file',
      completed: csvData.length > 0
    },
    {
      id: 'images',
      title: 'Upload Images',
      description: 'Upload images for each property',
      completed: propertyUploads.length > 0 && propertyUploads.every(p => p.images.length > 0)
    },
    {
      id: 'review',
      title: 'Review & Confirm',
      description: 'Review all data before uploading',
      completed: false
    },
    {
      id: 'upload',
      title: 'Upload to Database',
      description: 'Save all properties to the database',
      completed: false
    }
  ];

  const handleCSVUpload = useCallback(async (file: File) => {
    setCsvError(null);
    try {
      const data = await parseCSV(file);
      setCsvData(data);
      setCsvError(null);
      
      // Initialize property uploads
      const uploads: PropertyUpload[] = data.map(property => ({
        data: property,
        images: [],
        status: 'pending'
      }));
      
      setPropertyUploads(uploads);
      setCurrentStep(1);
    } catch (error: any) {
      console.error('CSV parsing error:', error);
      setCsvError(error.message || 'Error parsing CSV file. Please check the format.');
    }
  }, []);

  const handleImageUpload = useCallback(async (propertyIndex: number, files: FileList) => {
    const fileArray = Array.from(files);
    
    // Validate and compress images
    const processedFiles: File[] = [];
    for (const file of fileArray) {
      try {
        validateImageFile(file);
        const compressedFile = await compressImage(file);
        processedFiles.push(compressedFile);
      } catch (error) {
        alert(`Error processing ${file.name}: ${error}`);
        return;
      }
    }
    
    setPropertyUploads(prev => prev.map((upload, index) => 
      index === propertyIndex 
        ? { ...upload, images: processedFiles }
        : upload
    ));
  }, []);

  const downloadTemplate = useCallback(() => {
    const csvContent = generateCSVTemplate();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'property_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  const uploadToDatabase = useCallback(async () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      for (let i = 0; i < propertyUploads.length; i++) {
        const upload = propertyUploads[i];
        
        // Update status to uploading
        setPropertyUploads(prev => prev.map((p, index) => 
          index === i ? { ...p, status: 'uploading' } : p
        ));
        
        try {
          // Create property record
          const { data: property, error: propertyError } = await supabase
            .from('properties')
            .insert({
              title: upload.data.title,
              description: upload.data.description,
              price: upload.data.price,
              type: upload.data.type,
              bedrooms: upload.data.bedrooms,
              bathrooms: upload.data.bathrooms,
              city: upload.data.city,
              country: upload.data.country,
              area: upload.data.area,
              active: true
            })
            .select()
            .single();
          
          if (propertyError) throw propertyError;
          
          // Upload images
          if (upload.images.length > 0) {
            const imageUrls = await uploadPropertyImages(
              upload.images,
              property.id,
              (progress) => {
                const totalProgress = ((i + progress.percentage / 100) / propertyUploads.length) * 100;
                setUploadProgress(totalProgress);
              }
            );
            
            // Save image URLs to database
            const imageRecords = imageUrls.map((url, index) => ({
              property_id: property.id,
              image_url: url,
              display_order: index + 1
            }));
            
            const { error: imageError } = await supabase
              .from('property_images')
              .insert(imageRecords);
            
            if (imageError) throw imageError;
          }
          
          // Mark as completed
          setPropertyUploads(prev => prev.map((p, index) => 
            index === i ? { ...p, status: 'completed' } : p
          ));
          
        } catch (error: any) {
          console.error(`Error uploading property ${i + 1}:`, error);
          setPropertyUploads(prev => prev.map((p, index) => 
            index === i ? { ...p, status: 'error', error: error.message } : p
          ));
        }
      }
      
      setCurrentStep(3);
    } catch (error: any) {
      console.error('Upload error:', error);
      alert('Error during upload. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [propertyUploads]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload Property Data
              </h3>
              <p className="text-gray-600">
                Start by uploading a CSV file with your property details
              </p>
            </div>
            
            {csvError && (
              <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-4">
                {csvError}
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={downloadTemplate}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FileText className="mr-2 h-4 w-4" />
                Download Template
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="csv-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload CSV File
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      CSV, up to 10MB
                    </span>
                  </label>
                  <input
                    id="csv-upload"
                    type="file"
                    accept=".csv"
                    onChange={(e) => e.target.files?.[0] && handleCSVUpload(e.target.files[0])}
                    className="sr-only"
                  />
                </div>
              </div>
            </div>
            
            {csvData.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      CSV Uploaded Successfully
                    </h3>
                    <p className="mt-1 text-sm text-green-700">
                      {csvData.length} properties found
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload Property Images
              </h3>
              <p className="text-gray-600">
                Upload images for each property. You can select multiple images per property.
              </p>
            </div>
            
            <div className="space-y-4">
              {propertyUploads.map((upload, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {upload.data.title}
                      </h4>
                      {upload.data.id && (
                        <div className="text-xs text-gray-500 mt-1">ID: {upload.data.id}</div>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {upload.images.length} images
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <label className="cursor-pointer">
                      <span className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Image className="mr-2 h-4 w-4" />
                        Select Images
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => e.target.files && handleImageUpload(index, e.target.files)}
                        className="sr-only"
                      />
                    </label>
                    
                    {upload.images.length > 0 && (
                      <div className="flex space-x-2">
                        {upload.images.slice(0, 3).map((file, fileIndex) => (
                          <div key={fileIndex} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${fileIndex + 1}`}
                              className="w-12 h-12 object-cover rounded"
                            />
                            {fileIndex === 2 && upload.images.length > 3 && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center">
                                <span className="text-white text-xs">
                                  +{upload.images.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(0)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                disabled={propertyUploads.some(p => p.images.length === 0)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Review Properties
              </h3>
              <p className="text-gray-600">
                Review all properties before uploading to the database
              </p>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {propertyUploads.map((upload, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    {upload.images[0] && (
                      <img
                        src={URL.createObjectURL(upload.images[0])}
                        alt={upload.data.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{upload.data.title}</h4>
                      <p className="text-sm text-gray-600">{upload.data.description}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        <span className="mr-4">Price: ฿{upload.data.price.toLocaleString()}</span>
                        <span className="mr-4">{upload.data.bedrooms} beds</span>
                        <span className="mr-4">{upload.data.bathrooms} baths</span>
                        <span>{upload.images.length} images</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={uploadToDatabase}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Upload to Database
              </button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload Progress
              </h3>
              <p className="text-gray-600">
                Uploading properties to the database...
              </p>
            </div>
            
            {isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
            
            <div className="space-y-2">
              {propertyUploads.map((upload, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {upload.status === 'pending' && (
                    <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                  )}
                  {upload.status === 'uploading' && (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  )}
                  {upload.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                  {upload.status === 'error' && (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  <span className="text-sm">{upload.data.title}</span>
                  {upload.error && (
                    <span className="text-xs text-red-600">{upload.error}</span>
                  )}
                </div>
              ))}
            </div>
            
            {!isUploading && (
              <div className="flex justify-center">
                <button
                  onClick={() => navigate('/admin/properties')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  View Properties
                </button>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/properties')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          Bulk Property Upload
        </h1>
      </div>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index < currentStep
                    ? 'bg-green-600 text-white'
                    : index === currentStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-4 ${
                  index < currentStep ? 'bg-green-600' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default BulkUpload; 