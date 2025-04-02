import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { fetchProperties } from '../api/properties';
import PropertyCard from './PropertyCard';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNewPropertyListings, usePropertyStatusChanges, usePropertyPriceUpdates } from '../hooks/useRealtime';

const PropertyList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    featured: undefined,
    active: true
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 9,
    totalCount: 0,
    totalPages: 0
  });
  const [notifications, setNotifications] = useState([]);
  
  // Parse URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = { ...filters };
    
    if (params.has('type')) newFilters.type = params.get('type');
    if (params.has('city')) newFilters.city = params.get('city');
    if (params.has('minPrice')) newFilters.minPrice = params.get('minPrice');
    if (params.has('maxPrice')) newFilters.maxPrice = params.get('maxPrice');
    if (params.has('bedrooms')) newFilters.bedrooms = params.get('bedrooms');
    if (params.has('featured')) newFilters.featured = params.get('featured') === 'true';
    if (params.has('page')) setPagination(prev => ({ ...prev, page: parseInt(params.get('page')) || 1 }));
    
    setFilters(newFilters);
  }, [location.search]);
  
  // Load properties
  const loadProperties = async () => {
    setLoading(true);
    try {
      const response = await fetchProperties(
        pagination.page,
        pagination.pageSize,
        filters
      );
      
      if (response.error) {
        setError(response.error.message);
      } else {
        setProperties(response.data || []);
        setPagination(prev => ({
          ...prev,
          totalCount: response.meta.totalCount,
          totalPages: response.meta.totalPages
        }));
        setError(null);
      }
    } catch (err) {
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };
  
  // Load properties when filters or pagination change
  useEffect(() => {
    loadProperties();
  }, [filters, pagination.page, pagination.pageSize]);
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Apply filters
  const applyFilters = () => {
    // Reset to page 1 when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
    
    // Update URL with filters
    const params = new URLSearchParams();
    if (filters.type) params.append('type', filters.type);
    if (filters.city) params.append('city', filters.city);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
    if (filters.featured !== undefined) params.append('featured', filters.featured.toString());
    
    navigate({ pathname: location.pathname, search: params.toString() });
  };
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      type: '',
      city: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      featured: undefined,
      active: true
    });
    
    setPagination(prev => ({ ...prev, page: 1 }));
    navigate(location.pathname);
  };
  
  // Pagination handlers
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    
    setPagination(prev => ({ ...prev, page: newPage }));
    
    // Update URL with page number
    const params = new URLSearchParams(location.search);
    params.set('page', newPage.toString());
    navigate({ pathname: location.pathname, search: params.toString() });
  };
  
  // Set up real-time subscriptions
  
  // New property notifications
  useNewPropertyListings((newProperty) => {
    // Add notification
    setNotifications(prev => [
      {
        id: Date.now(),
        type: 'new',
        message: `New property added: ${newProperty.title}`,
        timestamp: new Date()
      },
      ...prev.slice(0, 4) // Keep only 5 most recent notifications
    ]);
    
    // Refresh the property list
    loadProperties();
  });
  
  // Property status changes
  usePropertyStatusChanges((property) => {
    setNotifications(prev => [
      {
        id: Date.now(),
        type: 'status',
        message: `Property "${property.title}" is now ${property.active ? 'active' : 'inactive'}`,
        timestamp: new Date()
      },
      ...prev.slice(0, 4)
    ]);
    
    // Update the property in the list if it exists
    setProperties(prev => prev.map(p => 
      p.id === property.id ? { ...p, active: property.active } : p
    ));
  });
  
  // Price updates
  usePropertyPriceUpdates((data) => {
    const { property, oldPrice, newPrice } = data;
    setNotifications(prev => [
      {
        id: Date.now(),
        type: 'price',
        message: `Price updated for "${property.title}": ${oldPrice} → ${newPrice}`,
        timestamp: new Date()
      },
      ...prev.slice(0, 4)
    ]);
    
    // Update the property in the list if it exists
    setProperties(prev => prev.map(p => 
      p.id === property.id ? { ...p, price: property.price } : p
    ));
  });
  
  // Dismiss a notification
  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
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
      
      {/* Real-time Notifications */}
      {notifications.length > 0 && (
        <div className="bg-gray-100 border-b border-gray-200">
          <div className="container mx-auto px-4 py-2">
            <div className="space-y-1">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`flex justify-between items-center p-2 rounded-md text-sm ${
                    notification.type === 'new' ? 'bg-green-50 text-green-800' :
                    notification.type === 'status' ? 'bg-blue-50 text-blue-800' :
                    'bg-amber-50 text-amber-800'
                  }`}
                >
                  <span>{notification.message}</span>
                  <button 
                    onClick={() => dismissNotification(notification.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Filters */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">All Types</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
                <option value="Land">Land</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">All Locations</option>
                <option value="Ban Makham">Ban Makham</option>
                <option value="Big Buddha">Big Buddha</option>
                <option value="Chaweng Noi">Chaweng Noi</option>
                <option value="Lamai">Lamai</option>
                <option value="Maenam">Maenam</option>
                <option value="Bophut">Bophut</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <select
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">No Min</option>
                <option value="10000000">10,000,000 THB</option>
                <option value="15000000">15,000,000 THB</option>
                <option value="20000000">20,000,000 THB</option>
                <option value="25000000">25,000,000 THB</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <select
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">No Max</option>
                <option value="15000000">15,000,000 THB</option>
                <option value="20000000">20,000,000 THB</option>
                <option value="25000000">25,000,000 THB</option>
                <option value="30000000">30,000,000 THB</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <select
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            <div className="flex items-end space-x-2">
              <button
                onClick={applyFilters}
                className="flex-1 bg-amber-500 text-white p-2 rounded flex items-center justify-center"
              >
                <Filter size={18} className="mr-1" />
                Filter
              </button>
              <button
                onClick={resetFilters}
                className="flex-1 bg-gray-200 text-gray-700 p-2 rounded"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Properties List */}
      <div className="container mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-6">
            {error}
          </div>
        )}
        
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            {loading ? 'Loading properties...' : `${pagination.totalCount} Properties Found`}
          </h2>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          </div>
        ) : properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <div className="flex space-x-1">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`px-4 py-2 rounded-md ${
                      pagination.page === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  {[...Array(pagination.totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-4 py-2 rounded-md ${
                          pagination.page === pageNumber
                            ? 'bg-amber-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className={`px-4 py-2 rounded-md ${
                      pagination.page === pagination.totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              No properties found
            </h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your filters to find properties that match your criteria.
            </p>
            <button
              onClick={resetFilters}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList;