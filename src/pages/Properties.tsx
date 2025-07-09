import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { cities, propertyTypes, priceRanges } from '../data/properties';
import { PropertyFilter } from '../types';
import { Search } from 'lucide-react';
import { useProperties } from '../hooks/useProperties';
import ContactForm from '../components/ContactForm';

const Properties = () => {
  const location = useLocation();
  const { getActiveProperties } = useProperties();
  const [filteredProperties, setFilteredProperties] = useState<ReturnType<typeof getActiveProperties>>([]);
  const [filters, setFilters] = useState<PropertyFilter>({
    country: '',
    location: '',
    type: '',
    price: ''
  });
  
  // Initialize filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialFilters: PropertyFilter = {
      country: params.get('country') || '',
      location: params.get('location') || '',
      type: params.get('type') || '',
      price: params.get('price') || ''
    };
    
    setFilters(initialFilters);
    applyFilters(initialFilters);
  }, [location.search, getActiveProperties]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
  };
  
  const applyFilters = (currentFilters: PropertyFilter) => {
    let result = getActiveProperties();
    
    if (currentFilters.country) {
      result = result.filter(property => 
        property.location.country.toLowerCase() === currentFilters.country.toLowerCase()
      );
    }
    
    if (currentFilters.location) {
      result = result.filter(property => 
        property.location.city.toLowerCase() === currentFilters.location.toLowerCase()
      );
    }
    
    if (currentFilters.type) {
      result = result.filter(property => 
        property.type.toLowerCase() === currentFilters.type.toLowerCase()
      );
    }
    
    if (currentFilters.price) {
      result = result.filter(property => {
        const price = property.price;
        switch (currentFilters.price) {
          case '<5M THB':
            return price < 5000000;
          case '5 - 10M THB':
            return price >= 5000000 && price < 10000000;
          case '10 - 20M THB':
            return price >= 10000000 && price < 20000000;
          case '20 - 30M THB':
            return price >= 20000000 && price < 30000000;
          case '30 - 50M THB':
            return price >= 30000000 && price < 50000000;
          case '50 - 100M THB':
            return price >= 50000000 && price < 100000000;
          case '>100M THB':
            return price >= 100000000;
          default:
            return true;
        }
      });
    }
    
    setFilteredProperties(result);
  };
  
  const handleSearch = () => {
    applyFilters(filters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (filters.country) params.append('country', filters.country);
    if (filters.location) params.append('location', filters.location);
    if (filters.type) params.append('type', filters.type);
    if (filters.price) params.append('price', filters.price);
    
    window.history.pushState({}, '', `${location.pathname}?${params.toString()}`);
  };
  
  return (
    <div>
      {/* Header Banner */}
      <div className="bg-gray-900 py-16 bg-cover bg-center relative" style={{ backgroundImage: "url('https://res.cloudinary.com/dhxriuzu5/image/upload/v1741727836/a-modern-two-story-house-with-a-sleek-de_SBjwVImtS8iYd2MXRhFS7A_GeTPWMkAQK68003jvQuSRA_zz129a.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-white mb-4">
              Our Properties
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our exclusive collection of luxury properties in Koh Samui's most desirable locations.
            </p>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <select
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              className="px-4 py-3 border border-gray-300 rounded text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              <option value="Thailand">Thailand</option>
            </select>
            
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="px-4 py-3 border border-gray-300 rounded text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">All Areas</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="px-4 py-3 border border-gray-300 rounded text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="px-4 py-3 border border-gray-300 rounded text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="">All Prices</option>
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
            
            <button
              onClick={handleSearch}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded transition-colors flex items-center justify-center"
            >
              <Search size={20} className="mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>
      
      {/* Properties Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              {filteredProperties.length} Properties Found
            </h2>
          </div>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                No properties found
              </h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your filters to find properties that match your criteria.
              </p>
              <button
                onClick={() => {
                  setFilters({
                    country: '',
                    location: '',
                    type: '',
                    price: ''
                  });
                  setFilteredProperties(getActiveProperties());
                  window.history.pushState({}, '', location.pathname);
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded transition-colors"
              >
                Reset Filters
              </button>
              <div className="max-w-xl mx-auto mt-12">
                <h4 className="text-xl font-semibold mb-4 text-gray-800 text-center">
                  Didn’t find what you’re looking for? Let us know your requirements and we’ll help you find the perfect property!
                </h4>
                <ContactForm />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;