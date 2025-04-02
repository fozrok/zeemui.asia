import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '../../hooks/useProperties';
import { Property } from '../../types';
import { X, Plus, Save, ChevronLeft, Star } from 'lucide-react';
import { cities, propertyTypes } from '../../data/properties';

const PropertyForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProperty, addProperty, updateProperty } = useProperties();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
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

  useEffect(() => {
    if (id) {
      const property = getProperty(id);
      if (property) {
        setFormData(property);
      } else {
        setError('Property not found');
      }
    }
  }, [id, getProperty]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData] as any,
          [child]: value
        }
      });
    } else if (name === 'price' || name === 'bedrooms' || name === 'bathrooms') {
      setFormData({
        ...formData,
        [name]: Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (feature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, feature.trim()]
      });
      setFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData({
      ...formData,
      features: updatedFeatures
    });
  };

  const handleAddImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, '']
    });
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({
      ...formData,
      images: updatedImages
    });
  };

  const handleRemoveImage = (index: number) => {
    if (formData.images.length > 1) {
      const updatedImages = [...formData.images];
      updatedImages.splice(index, 1);
      setFormData({
        ...formData,
        images: updatedImages
      });
    }
  };

  const validateForm = useCallback((): boolean => {
    // Basic validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    
    if (!formData.location.city) {
      setError('City is required');
      return false;
    }
    
    if (!formData.type) {
      setError('Property type is required');
      return false;
    }
    
    if (formData.price <= 0) {
      setError('Price must be greater than 0');
      return false;
    }
    
    if (formData.bedrooms < 0 || formData.bathrooms < 0) {
      setError('Bedrooms and bathrooms cannot be negative');
      return false;
    }
    
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    
    if (formData.images.some(img => !img.trim())) {
      setError('All image URLs must be filled');
      return false;
    }
    
    return true;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (id) {
        // Update existing property
        const success = await updateProperty({ ...formData, id });
        if (success) {
          navigate('/admin/properties');
        } else {
          setError('Failed to update property. Please try again.');
        }
      } else {
        // Add new property
        const newId = await addProperty(formData);
        if (newId) {
          navigate('/admin/properties');
        } else {
          setError('Failed to add property. Please try again.');
        }
      }
    } catch (err) {
      setError('An error occurred while saving the property');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
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
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {/* Featured Property Toggle - Prominent at the top */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleCheckboxChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="featured" className="ml-2 flex items-center">
              <Star size={18} className="text-blue-600 mr-2" />
              <span className="font-medium text-gray-800">Featured Property</span> 
              <span className="ml-2 text-sm text-gray-600">(Will appear in the featured section on the homepage)</span>
            </label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Property Type*
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="location.city" className="block text-sm font-medium text-gray-700 mb-1">
              City*
            </label>
            <select
              id="location.city"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Features
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.features.map((feat, index) => (
              <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center">
                <span>{feat}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(index)}
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
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a feature (e.g., 'Swimming Pool')"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images*
          </label>
          <div className="space-y-2">
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Image URL"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 hover:text-red-700"
                  disabled={formData.images.length === 1}
                >
                  <X size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddImageField}
              className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <Plus size={16} className="mr-1" />
              Add Another Image
            </button>
          </div>
        </div>
        
        {/* Preview first image */}
        {formData.images[0] && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main Image Preview
            </label>
            <div className="mt-1 border border-gray-300 rounded-md overflow-hidden max-w-md">
              <img 
                src={formData.images[0]} 
                alt="Property preview" 
                className="w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                }}
              />
            </div>
          </div>
        )}
        
        <div className="mb-6 space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="newProperty"
              name="newProperty"
              checked={formData.newProperty}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-custom-green border-gray-300 rounded focus:ring-custom-green"
            />
            <label htmlFor="newProperty" className="ml-2 text-sm text-gray-700">
              New Property (Adds a "New" tag)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-custom-green border-gray-300 rounded focus:ring-custom-green"
            />
            <label htmlFor="active" className="ml-2 text-sm text-gray-700">
              Active (visible on site)
            </label>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/properties')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-custom-green text-white rounded-md hover:bg-custom-green-600 transition-colors flex items-center"
          >
            <Save size={18} className="mr-1" />
            {isLoading ? 'Saving...' : 'Save Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;