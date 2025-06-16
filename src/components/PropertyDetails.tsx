import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPropertyById } from '../api/properties';
import { formatCurrency } from '../utils/format';
import PropertyGallery from './PropertyGallery';
import ContactForm from './ContactForm';
import { usePropertyChanges } from '../hooks/useRealtime';
import { MapPin, Bed, Bath, Home, DollarSign, Tag, CheckCircle, Ruler } from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Load property data
  const loadProperty = async () => {
    if (!id) return;
    
    setLoading(true);
    try {
      const response = await fetchPropertyById(id);
      
      if (response.error) {
        setError(response.error.message);
        setProperty(null);
      } else {
        setProperty(response.data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to load property details');
      setProperty(null);
    } finally {
      setLoading(false);
    }
  };
  
  // Initial data load
  useEffect(() => {
    loadProperty();
  }, [id]);
  
  // Set up real-time updates
  usePropertyChanges(id, (payload) => {
    if (payload.eventType === 'UPDATE') {
      // Only update the property data if it's already loaded
      if (property) {
        setProperty((prev) => ({ ...prev, ...payload.new }));
      }
    } else if (payload.eventType === 'DELETE') {
      // Redirect to properties page if the property is deleted
      navigate('/properties');
    }
  });
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2 text-gray-600">Loading property details...</p>
      </div>
    );
  }
  
  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Property not found</h2>
        <p className="mb-8">{error || 'The property you are looking for is not available.'}</p>
        <button 
          onClick={() => navigate('/properties')}
          className="bg-custom-green hover:bg-custom-green-600 text-white px-6 py-3 rounded transition-colors"
        >
          Browse Properties
        </button>
      </div>
    );
  }
  
  // Prepare additional images
  const propertyDetails = property.property_details?.[0] || null;
  const allImages = [
    ...property.property_images.map(img => img.image_url),
    ...(propertyDetails?.additional_images || [])
  ];
  
  // Get amenities from both features and details
  const amenities = [
    ...(property.property_features?.map(f => f.feature) || []),
    ...(propertyDetails?.amenities || [])
  ];
  
  return (
    <div>
      {/* Header */}
      <div className="bg-gray-900 py-12 bg-cover bg-center relative" style={{ backgroundImage: `url(${allImages[0] || ''})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="mb-2">
            <button onClick={() => navigate('/properties')} className="text-custom-green hover:text-custom-green-300 inline-flex items-center">
              <span className="mr-2">←</span> Back to Properties
            </button>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-300 mb-4">
              <MapPin size={18} className="mr-1" />
              <span>{property.area}, {property.city}, {property.country}</span>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                <Bed size={18} className="text-custom-green mr-2" />
                <span className="text-white">{property.bedrooms} Bedrooms</span>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                <Bath size={18} className="text-custom-green mr-2" />
                <span className="text-white">{property.bathrooms} Bathrooms</span>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                <Home size={18} className="text-custom-green mr-2" />
                <span className="text-white">{property.type}</span>
              </div>
              {propertyDetails?.square_feet && (
                <div className="bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                  <Ruler size={18} className="text-custom-green mr-2" />
                  <span className="text-white">{propertyDetails.square_feet} sq ft</span>
                </div>
              )}
              <div className="bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
                <DollarSign size={18} className="text-custom-green mr-2" />
                <span className="text-white">{formatCurrency(property.price)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <PropertyGallery images={allImages} title={property.title} />
            
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Description</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {property.description}
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Property Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                {amenities.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle size={18} className="text-custom-green mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Location</h2>
                <p className="text-gray-700 mb-4">
                  This property is located in {property.area}, {property.city}, {property.country}.
                </p>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  {/* Map placeholder */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <MapPin size={48} className="text-gray-400" />
                    <span className="ml-2 text-gray-500">Map view would be displayed here</span>
                  </div>
                </div>
              </div>
              
              {/* Property Transactions - Only show for authenticated admin users */}
              {/* This section would normally be conditional based on user role */}
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="sticky top-6">
              <div className="mb-8 text-center p-6 bg-custom-green-50 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {formatCurrency(property.price)}
                </h3>
                <div className="flex items-center justify-center text-gray-600 mb-4">
                  <Tag size={16} className="mr-1" />
                  <span>ID: {property.id}</span>
                </div>
                <button 
                  onClick={() => navigate('/contact')}
                  className="block w-full bg-custom-green hover:bg-custom-green-600 text-white py-3 px-6 rounded-md transition-colors text-center mb-4"
                >
                  Schedule Viewing
                </button>
              </div>
              
              <ContactForm propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;