import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';
import { Property } from '../types';
import { X, Plus, Save, ChevronLeft, Star, Upload, Trash2 } from 'lucide-react';
import { cities, propertyTypes } from '../data/properties';
import { supabase } from '../lib/supabase';
import { uploadPropertyImages, validateImageFile, compressImage } from '../utils/fileUpload';

interface ImageFile {
  file: File;
  preview: string;
  uploaded?: boolean;
  url?: string;
}

const EnhancedPropertyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addProperty, updateProperty } = useProperties();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  const emptyProperty: Omit<Property, 'id'> = {
    title: '',
    location: {
      city: '',
      country: 'Koh Samui',
      area: 'Koh Samui'
    },
    price: 0,
    type: '',
    bedrooms: 0,
    bathrooms: 0,
    description: '',
    features: [],
    images: [''],
    featured: false,
    newProperty: false,
    active: true
  };

  const [formData, setFormData] = useState<Omit<Property, 'id'>>(emptyProperty);
  const [feature, setFeature] = useState('');

  // Load existing property data
  useEffect(() => {
    const loadProperty = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (propertyError) throw propertyError;

        const { data: featuresData } = await supabase
          .from('property_features')
          .select('feature')
          .eq('property_id', id);

        const { data: imagesData } = await supabase
          .from('property_images')
          .select('image_url')
          .eq('property_id', id)
          .order('display_order', { ascending: true });

        const combinedData = {
          title: propertyData.title,
          description: propertyData.description,
          price: propertyData.price,
          type: propertyData.type,
          bedrooms: propertyData.bedrooms,
          bathrooms: propertyData.bathrooms,
          location: {
            city: propertyData.city,
            country: propertyData.country,
            area: propertyData.area
          },
          features: featuresData?.map(f => f.feature) || [],
          images: imagesData?.map(i => i.image_url) || [''],
          featured: propertyData.featured,
          newProperty: propertyData.new_property,
          active: propertyData.active
        };

        setFormData(combinedData);
        
        // Set existing images
        if (imagesData) {
          const existingImages: ImageFile[] = imagesData.map(img => ({
            file: null as any,
            preview: img.image_url,
            uploaded: true,
            url: img.image_url
          }));
          setImageFiles(existingImages);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load property');
      } finally {
        setIsLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  const handleFileSelect = useCallback(async (files: FileList) => {
    const newImageFiles: ImageFile[] = [];
    
    for (const file of Array.from(files)) {
      try {
        validateImageFile(file);
        const compressedFile = await compressImage(file);
        const preview = URL.createObjectURL(compressedFile);
        
        newImageFiles.push({
          file: compressedFile,
          preview
        });
      } catch (error) {
        alert(`Error processing ${file.name}: ${error}`);
      }
    }
    
    setImageFiles(prev => [...prev, ...newImageFiles]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeImage = useCallback((index: number) => {
    setImageFiles(prev => {
      const newFiles = [...prev];
      const removed = newFiles.splice(index, 1)[0];
      
      // Clean up preview URL
      if (removed.preview && !removed.uploaded) {
        URL.revokeObjectURL(removed.preview);
      }
      
      return newFiles;
    });
  }, []);

  const reorderImages = useCallback((fromIndex: number, toIndex: number) => {
    setImageFiles(prev => {
      const newFiles = [...prev];
      const [moved] = newFiles.splice(fromIndex, 1);
      newFiles.splice(toIndex, 0, moved);
      return newFiles;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      let propertyId = id;
      
      if (!id) {
        // Create new property
        const newId = await addProperty(formData);
        if (!newId) throw new Error('Failed to create property');
        propertyId = newId;
      } else {
        // Update existing property
        const success = await updateProperty({ ...formData, id });
        if (!success) throw new Error('Failed to update property');
      }
      
      // Upload new images
      const newImages = imageFiles.filter(img => !img.uploaded);
      if (newImages.length > 0) {
        const files = newImages.map(img => img.file);
        const uploadedUrls = await uploadPropertyImages(files, propertyId);
        
        // Update image URLs in database
        const imageRecords = uploadedUrls.map((url, index) => ({
          property_id: propertyId,
          image_url: url,
          display_order: imageFiles.findIndex(img => !img.uploaded) + index + 1
        }));
        
        const { error: imageError } = await supabase
          .from('property_images')
          .insert(imageRecords);
        
        if (imageError) throw imageError;
      }
      
      navigate('/admin/properties');
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-custom-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/properties')}
          className="mr-4 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          {id ? 'Edit Property' : 'Add New Property'}
        </h1>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Featured Property Toggle */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="featured" className="ml-2 flex items-center">
              <Star size={18} className="text-blue-600 mr-2" />
              <span className="font-medium text-gray-800">Featured Property</span>
            </label>
          </div>
        </div>
        
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title*
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Property Type*
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Type</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (THB)*
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <select
                id="city"
                value={formData.location.city}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  location: { ...prev.location, city: e.target.value }
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bedrooms*
              </label>
              <input
                type="number"
                id="bedrooms"
                value={formData.bedrooms}
                onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: Number(e.target.value) }))}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                Bathrooms*
              </label>
              <input
                type="number"
                id="bathrooms"
                value={formData.bathrooms}
                onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: Number(e.target.value) }))}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        
        {/* Image Upload */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Property Images</h2>
          
          {/* Drag & Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop images here or click to select
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Upload high-quality images (JPEG, PNG, WebP). Max 10MB per image.
            </p>
            <label className="cursor-pointer">
              <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Upload className="mr-2 h-4 w-4" />
                Select Images
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                className="sr-only"
              />
            </label>
          </div>
          
          {/* Image Preview Grid */}
          {imageFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Uploaded Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {imageFiles.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image.preview}
                      alt={`Property image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="opacity-0 group-hover:opacity-100 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Drag images to reorder. The first image will be the main property image.
              </p>
            </div>
          )}
        </div>
        
        {/* Features */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Features & Amenities</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.features.map((feat, index) => (
              <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center">
                <span>{feat}</span>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    features: prev.features.filter((_, i) => i !== index)
                  }))}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a feature (e.g., 'Swimming Pool')"
            />
            <button
              type="button"
              onClick={() => {
                if (feature.trim()) {
                  setFormData(prev => ({
                    ...prev,
                    features: [...prev.features, feature.trim()]
                  }));
                  setFeature('');
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
        
        {/* Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="newProperty"
                checked={formData.newProperty}
                onChange={(e) => setFormData(prev => ({ ...prev, newProperty: e.target.checked }))}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="newProperty" className="ml-2 flex items-center">
                <span className="font-medium text-gray-800">New Property</span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {id ? 'Update Property' : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnhancedPropertyForm; 