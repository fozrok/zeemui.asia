import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, ArrowRight } from 'lucide-react';
import { Property } from '../types';
import { formatCurrency } from '../utils/format';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = React.memo(({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          loading="lazy" 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Tag overlays */}
        <div className="absolute top-4 left-4 flex space-x-2">
          {property.sold && (
            <span className="bg-red-600 text-white px-3 py-1 text-xs uppercase font-semibold rounded">
              Sold
            </span>
          )}
          {property.newProperty && !property.sold && (
            <span className="bg-custom-green text-white px-3 py-1 text-xs uppercase font-semibold rounded">
              New
            </span>
          )}
          {property.featured && !property.newProperty && !property.sold && (
            <span className="bg-blue-600 text-white px-3 py-1 text-xs uppercase font-semibold rounded">
              Featured
            </span>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-gray-800">
          {property.title}
        </h3>
        
        <div className="text-custom-green font-medium mb-3">
          {property.location.city}, {property.location.area}
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {property.description.substring(0, 120)}...
        </p>
        
        <div className="flex items-center space-x-4 mb-4 text-gray-700">
          <div className="flex items-center">
            <Bed size={18} className="mr-2 text-gray-500" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center">
            <Bath size={18} className="mr-2 text-gray-500" />
            <span>{property.bathrooms}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(property.price)}
          </div>
          <Link 
            to={`/properties/${property.id}`}
            className="text-custom-green hover:text-custom-green-800 font-medium flex items-center"
          >
            View Details
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
});

export default PropertyCard;