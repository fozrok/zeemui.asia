import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../../hooks/useProperties';
import { Eye, EyeOff, Edit, Trash2, Plus, Search, RefreshCw, Star, StarOff } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { isMockData } from '../../lib/supabase';
import { Property } from '../../types';
import { API_BASE_URL } from '@/config';

const PropertyList: React.FC = () => {
  const { properties, togglePropertyStatus, deleteProperty, loading, error, refreshProperties, updateProperty } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterFeatured, setFilterFeatured] = useState<boolean | null>(null);

  // Log properties and their IDs when the component mounts or properties change
  useEffect(() => {
    console.log('Available properties:', properties.map(p => ({
      id: p.id,
      title: p.title
    })));
  }, [properties]);

  const filteredProperties = React.useMemo(() => {
    return properties.filter(property => {
      // Text search filter
      const matchesSearch = 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Featured filter
      const matchesFeatured = 
        filterFeatured === null || 
        property.featured === filterFeatured;
      
      return matchesSearch && matchesFeatured;
    });
  }, [properties, searchTerm, filterFeatured]);

  const handleDelete = useCallback(async (id: string) => {
    const success = await deleteProperty(id);
    if (success) {
      setShowConfirmation(null);
    }
  }, [deleteProperty]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshProperties();
    setIsRefreshing(false);
  }, [refreshProperties]);

  const toggleFeaturedStatus = async (property: Property) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${API_BASE_URL}/properties/${property.id}/toggle-featured`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update property featured status');
      }

      // Refresh the property list after successful update
      await refreshProperties();
    } catch (error) {
      console.error('Error toggling featured status:', error);
      // You can add a toast notification here to show the error
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Properties</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center transition-colors"
          >
            <RefreshCw size={18} className={`mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link
            to="/admin/properties/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
          >
            <Plus size={18} className="mr-1" />
            Add Property
          </Link>
        </div>
      </div>

      {isMockData && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-md mb-6">
          <strong>Development Mode:</strong> Using mock data. Connect to Supabase for persistent database functionality.
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search properties by title, location, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterFeatured(null)}
              className={`px-4 py-2 rounded-md transition-colors ${
                filterFeatured === null 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterFeatured(true)}
              className={`px-4 py-2 rounded-md transition-colors flex items-center ${
                filterFeatured === true 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <Star size={16} className="mr-1" />
              Featured
            </button>
            <button
              onClick={() => setFilterFeatured(false)}
              className={`px-4 py-2 rounded-md transition-colors flex items-center ${
                filterFeatured === false 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <StarOff size={16} className="mr-1" />
              Not Featured
            </button>
          </div>
        </div>
      </div>
      
      {/* Properties Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-gray-600">Loading properties...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="py-3 px-4 font-medium">Image</th>
                  <th className="py-3 px-4 font-medium">Title</th>
                  <th className="py-3 px-4 font-medium">Location</th>
                  <th className="py-3 px-4 font-medium">Price</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Featured</th>
                  <th className="py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map(property => (
                  <tr key={property.id} className="border-t border-gray-100">
                    <td className="py-3 px-4">
                      <img 
                        src={property.images[0]} 
                        alt={property.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Link to={`/admin/properties/${property.id}`} className="text-blue-600 hover:text-blue-800">
                        {property.title.length > 40 
                          ? `${property.title.substring(0, 40)}...` 
                          : property.title
                        }
                      </Link>
                    </td>
                    <td className="py-3 px-4">{property.location.city}</td>
                    <td className="py-3 px-4">
                      {formatCurrency(property.price)}
                    </td>
                    <td className="py-3 px-4">
                      {property.active ? (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Active
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Hidden
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {property.featured ? (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center w-fit">
                          <Star size={12} className="mr-1" />
                          Featured
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        {properties.map((property: Property) => (
                          <button
                            key={property.id}
                            onClick={() => {
                              console.log('Toggling property status:', property.id);
                              togglePropertyStatus(property.id);
                            }}
                            className="text-gray-600 hover:text-gray-800"
                            title={property.active ? 'Deactivate' : 'Activate'}
                          >
                            {property.active ? <Eye size={18} /> : <EyeOff size={18} />}
                          </button>
                        ))}
                        <Link
                          to={`/admin/properties/edit/${property.id}`}
                          onClick={() => console.log('Navigating to edit property:', property.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => toggleFeaturedStatus(property)}
                          className={`p-1 rounded ${property.featured ? 'text-gray-600 hover:bg-gray-50' : 'text-blue-600 hover:bg-blue-50'}`}
                          title={property.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          {property.featured ? <StarOff size={18} /> : <Star size={18} />}
                        </button>
                        <button
                          onClick={() => setShowConfirmation(property.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Delete property"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredProperties.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                      No properties found. Try a different search term or <Link to="/admin/properties/new" className="text-blue-600">add a new property</Link>.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this property? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showConfirmation)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyList;