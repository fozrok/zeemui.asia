import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { createProperty, updateProperty, fetchPropertyById } from '../api/properties';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ChevronLeft, Plus, X, Upload } from 'lucide-react';

// Validation schema
const propertyFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  type: z.string().min(1, "Property type is required"),
  bedrooms: z.number().int().nonnegative("Bedrooms must be a non-negative integer"),
  bathrooms: z.number().int().nonnegative("Bathrooms must be a non-negative integer"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  area: z.string().min(1, "Area is required"),
  featured: z.boolean().optional(),
  new_property: z.boolean().optional(),
  active: z.boolean().optional()
});

const propertyDetailsSchema = z.object({
  square_feet: z.number().int().positive("Square feet must be a positive integer"),
  amenities: z.array(z.string()).optional(),
  additional_images: z.array(z.string().url("Invalid image URL")).optional()
});

const PropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [amenity, setAmenity] = useState('');
  
  // Main form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    type: '',
    bedrooms: 0,
    bathrooms: 0,
    city: '',
    country: 'Koh Samui',
    area: 'Koh Samui',
    featured: false,
    new_property: false,
    active: true
  });
  
  // Property details state
  const [detailsData, setDetailsData] = useState({
    square_feet: 0,
    amenities: [],
    additional_images: []
  });
  
  // Load existing property data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      fetchPropertyById(id).then(response => {
        if (response.data) {
          // Set main property data
          setFormData({
            title: response.data.title,
            description: response.data.description,
            price: response.data.price,
            type: response.data.type,
            bedrooms: response.data.bedrooms,
            bathrooms: response.data.bathrooms,
            city: response.data.city,
            country: response.data.country,
            area: response.data.area,
            featured: response.data.featured,
            new_property: response.data.new_property,
            active: response.data.active
          });
          
          // Set property details data if available
          if (response.data.property_details && response.data.property_details.length > 0) {
            const details = response.data.property_details[0];
            setDetailsData({
              square_feet: details.square_feet || 0,
              amenities: details.amenities || [],
              additional_images: details.additional_images || []
            });
          }
        }
        setLoading(false);
      });
    }
  }, [id, isEditMode]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Handle details input changes
  const handleDetailsChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setDetailsData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setDetailsData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Add amenity
  const handleAddAmenity = () => {
    if (amenity.trim()) {
      setDetailsData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity.trim()]
      }));
      setAmenity('');
    }
  };
  
  // Remove amenity
  const handleRemoveAmenity = (index) => {
    setDetailsData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };
  
  // Add image URL
  const handleAddImage = () => {
    setDetailsData(prev => ({
      ...prev,
      additional_images: [...prev.additional_images, '']
    }));
  };
  
  // Update image URL
  const handleImageChange = (index, value) => {
    setDetailsData(prev => {
      const newImages = [...prev.additional_images];
      newImages[index] = value;
      return { ...prev, additional_images: newImages };
    });
  };
  
  // Remove image URL
  const handleRemoveImage = (index) => {
    setDetailsData(prev => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index)
    }));
  };
  
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    try {
      // Validate form data
      propertyFormSchema.parse(formData);
      propertyDetailsSchema.parse(detailsData);
      
      setLoading(true);
      
      if (isEditMode) {
        // Update existing property
        const { error } = await updateProperty(id, formData, detailsData);
        
        if (error) {
          setErrors({ form: error.message });
          setLoading(false);
          return;
        }
      } else {
        // Create new property
        const { error } = await createProperty(formData, detailsData);
        
        if (error) {
          setErrors({ form: error.message });
          setLoading(false);
          return;
        }
      }
      
      // Redirect to property list
      navigate('/admin/properties');
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Transform Zod errors into a more usable format
        const fieldErrors = {};
        error.errors.forEach(err => {
          const field = err.path.join('.');
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ form: 'An unexpected error occurred' });
      }
      
      setLoading(false);
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
          {isEditMode ? 'Edit Property' : 'Add New Property'}
        </h1>
      </div>
      
      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-6">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {/* Featured Property Toggle */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="featured" className="ml-2 flex items-center">
              <span className="font-medium text-gray-800">Featured Property</span> 
              <span className="ml-2 text-sm text-gray-600">(Will appear in the featured section on the homepage)</span>
            </label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Basic Property Details */}
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
              className={`w-full px-4 py-2 border ${errors.title ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
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
              className={`w-full px-4 py-2 border ${errors.type ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            >
              <option value="">Select Type</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Land">Land</option>
            </select>
            {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
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
              className={`w-full px-4 py-2 border ${errors.price ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City*
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
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
              className={`w-full px-4 py-2 border ${errors.bedrooms ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
            {errors.bedrooms && <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>}
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
              className={`w-full px-4 py-2 border ${errors.bathrooms ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              required
            />
            {errors.bathrooms && <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>}
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
            className={`w-full px-4 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            required
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        
        <hr className="my-8 border-gray-200" />
        
        <h3 className="text-xl font-bold mb-4 text-gray-800">Additional Details</h3>
        
        <div className="mb-6">
          <label htmlFor="square_feet" className="block text-sm font-medium text-gray-700 mb-1">
            Square Feet*
          </label>
          <input
            type="number"
            id="square_feet"
            name="square_feet"
            value={detailsData.square_feet}
            onChange={handleDetailsChange}
            min="1"
            className={`w-full px-4 py-2 border ${errors['square_feet'] ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            required
          />
          {errors['square_feet'] && <p className="text-red-500 text-sm mt-1">{errors['square_feet']}</p>}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amenities
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {detailsData.amenities.map((item, index) => (
              <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center">
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAmenity(index)}
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
              value={amenity}
              onChange={(e) => setAmenity(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add an amenity (e.g., 'Swimming Pool')"
            />
            <button
              type="button"
              onClick={handleAddAmenity}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Images
          </label>
          <div className="space-y-2">
            {detailsData.additional_images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className={`flex-1 px-4 py-2 border ${errors[`additional_images.${index}`] ? 'border-red-300' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Image URL"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
            {errors['additional_images'] && <p className="text-red-500 text-sm mt-1">{errors['additional_images']}</p>}
            <button
              type="button"
              onClick={handleAddImage}
              className="mt-2 inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              <Plus size={16} className="mr-1" />
              Add Another Image
            </button>
          </div>
        </div>
        
        <div className="mb-6 space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="new_property"
              name="new_property"
              checked={formData.new_property}
              onChange={handleChange}
              className="h-4 w-4 text-custom-green border-gray-300 rounded focus:ring-custom-green"
            />
            <label htmlFor="new_property" className="ml-2 text-sm text-gray-700">
              New Property (Adds a "New" tag)
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleChange}
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
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-custom-green text-white rounded-md hover:bg-custom-green-600 transition-colors flex items-center"
          >
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isEditMode ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <Save size={18} className="mr-1" />
                {isEditMode ? 'Update Property' : 'Create Property'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;