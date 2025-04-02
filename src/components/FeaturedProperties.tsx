import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { useProperties } from '../hooks/useProperties';

const FeaturedProperties = () => {
  const { getFeaturedProperties } = useProperties();
  
  const featuredProperties = useMemo(() => {
    return getFeaturedProperties();
  }, [getFeaturedProperties]);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-800 uppercase tracking-wider mb-2">
            Featured
          </h2>
          <div className="w-full max-w-lg mx-auto flex items-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-custom-green uppercase text-lg">Properties</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link
            to="/properties"
            className="inline-block border-2 border-custom-green text-custom-green hover:bg-custom-green hover:text-white px-6 py-3 rounded-md transition-colors uppercase font-medium tracking-wider"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;