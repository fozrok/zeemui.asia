import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { countries, cities, propertyTypes, priceRanges } from '../data/properties';
import { PropertyFilter } from '../types';

const HeroSection = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<PropertyFilter>({
    country: '',
    location: '',
    type: '',
    price: ''
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (filters.country) params.append('country', filters.country);
    if (filters.location) params.append('location', filters.location);
    if (filters.type) params.append('type', filters.type);
    if (filters.price) params.append('price', filters.price);
    
    navigate({
      pathname: '/properties',
      search: params.toString()
    });
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dhxriuzu5/image/upload/v1741726808/a-luxurious-modern-villa-with-an-infinit__IeWg50eSy6SiOD580qnjg_Bn614P7vTy20g1-4ro7q7Q_gralzm.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4 max-w-3xl">
          Bespoke Properties for Sale in Koh Samui
        </h1>
        
        <div className="w-full max-w-4xl mt-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-1">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
            <select
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              className="px-4 py-3 rounded text-gray-700 w-full focus:outline-none"
            >
              <option value="">COUNTRY</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="px-4 py-3 rounded text-gray-700 w-full focus:outline-none"
            >
              <option value="">LOCATION</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="px-4 py-3 rounded text-gray-700 w-full focus:outline-none"
            >
              <option value="">TYPE</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <select
              name="price"
              value={filters.price}
              onChange={handleFilterChange}
              className="px-4 py-3 rounded text-gray-700 w-full focus:outline-none"
            >
              <option value="">PRICE</option>
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>
          
          <div className="mt-2 flex justify-center">
            <button
              onClick={handleSearch}
              className="bg-custom-green hover:bg-custom-green-600 text-white px-8 py-3 rounded transition-colors w-full md:w-auto flex items-center justify-center"
            >
              <Search size={20} className="mr-2" />
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;