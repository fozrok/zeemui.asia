import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Bed, Bath, MapPin, Home, DollarSign, Tag, CheckCircle } from 'lucide-react';
import { Property } from '../types';
import PropertyGallery from '../components/PropertyGallery';
import ContactForm from '../components/ContactForm';
import PropertyCard from '../components/PropertyCard';
import { formatCurrency } from '../utils/format';
import { useProperties } from '../hooks/useProperties';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProperty, getActiveProperties } = useProperties();
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  
  useEffect(() => {
    if (id) {
      const foundProperty = getProperty(id);
      
      if (foundProperty && foundProperty.active) {
        setProperty(foundProperty);
        
        // Find similar properties (same location or similar price)
        const active = getActiveProperties();
        const similar = active.filter(p => 
          p.id !== id && 
          (p.location.city === foundProperty.location.city || 
          Math.abs(p.price - foundProperty.price) < 5000000)
        ).slice(0, 3);
        
        setSimilarProperties(similar);
      } else {
        setProperty(null);
      }
    }
  }, [id, getProperty, getActiveProperties]);
  
  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Property not found</h2>
        <p className="mb-8">The property you are looking for is not available.</p>
        <Link 
          to="/properties" 
          className="bg-custom-green hover:bg-custom-green-600 text-white px-6 py-3 rounded transition-colors"
        >
          Browse Properties
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      {/* Header */}
      <div className="bg-gray-900 py-12 bg-cover bg-center relative" style={{ backgroundImage: `url(${property.images[0]})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="mb-2">
            <Link to="/properties" className="text-custom-green hover:text-custom-green-300 inline-flex items-center">
              <span className="mr-2">←</span> Back to Properties
            </Link>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-300 mb-4">
              <MapPin size={18} className="mr-1" />
              <span>{property.location.city}, {property.location.area}, {property.location.country}</span>
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
            <PropertyGallery images={property.images} title={property.title} />
            
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Description</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {property.description}
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Property Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle size={18} className="text-custom-green mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Location</h2>
                <p className="text-gray-700 mb-4">
                  This property is located in {property.location.city}, {property.location.area}, {property.location.country}.
                </p>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  {/* Map placeholder - in a real app, this would be an actual map */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <MapPin size={48} className="text-gray-400" />
                    <span className="ml-2 text-gray-500">Map view would be displayed here</span>
                  </div>
                </div>
              </div>
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
                <Link 
                  to="/contact" 
                  className="block w-full bg-custom-green hover:bg-custom-green-600 text-white py-3 px-6 rounded-md transition-colors text-center mb-4"
                >
                  Schedule Viewing
                </Link>
              </div>
              
              <ContactForm propertyTitle={property.title} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-gray-800 mb-8">
              Similar Properties
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PropertyDetails;