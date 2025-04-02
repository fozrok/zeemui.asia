import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../../hooks/useProperties';
import { Home, Eye, EyeOff, Plus, DollarSign, RefreshCw, Star } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { isMockData } from '../../lib/supabase';

const AdminDashboard: React.FC = () => {
  const { properties, loading, error, refreshProperties } = useProperties();

  const dashboardStats = useMemo(() => {
    const totalProperties = properties.length;
    const activeProperties = properties.filter(p => p.active).length;
    const inactiveProperties = properties.filter(p => !p.active).length;
    const featuredProperties = properties.filter(p => p.featured).length;
    const totalValue = properties.reduce((sum, property) => sum + property.price, 0);
    
    return {
      totalProperties,
      activeProperties,
      inactiveProperties,
      featuredProperties,
      totalValue
    };
  }, [properties]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <button
          onClick={() => refreshProperties()}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center transition-colors"
        >
          <RefreshCw size={18} className="mr-1" />
          Refresh Data
        </button>
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
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Properties</p>
              <h3 className="text-3xl font-bold text-gray-800">{dashboardStats.totalProperties}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Home className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Active Properties</p>
              <h3 className="text-3xl font-bold text-gray-800">{dashboardStats.activeProperties}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Eye className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Hidden Properties</p>
              <h3 className="text-3xl font-bold text-gray-800">{dashboardStats.inactiveProperties}</h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <EyeOff className="text-red-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Featured Properties</p>
              <h3 className="text-3xl font-bold text-gray-800">{dashboardStats.featuredProperties}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Star className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Value</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {formatCurrency(dashboardStats.totalValue)}
              </h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <DollarSign className="text-amber-600" size={24} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/properties/new"
            className="bg-blue-600 text-white p-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add New Property
          </Link>
          <Link
            to="/admin/properties"
            className="bg-gray-700 text-white p-4 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <Eye size={20} className="mr-2" />
            Manage Properties
          </Link>
          <Link
            to="/"
            target="_blank"
            className="bg-green-600 text-white p-4 rounded-lg flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            <Home size={20} className="mr-2" />
            View Live Site
          </Link>
        </div>
      </div>
      
      {/* Recent Properties */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Properties</h2>
          <Link 
            to="/admin/properties" 
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-left">
                <th className="py-3 px-4 font-medium">Title</th>
                <th className="py-3 px-4 font-medium">Location</th>
                <th className="py-3 px-4 font-medium">Price</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Featured</th>
              </tr>
            </thead>
            <tbody>
              {properties.slice(0, 5).map(property => (
                <tr key={property.id} className="border-t border-gray-100">
                  <td className="py-3 px-4">
                    <Link to={`/admin/properties/${property.id}`} className="text-blue-600 hover:text-blue-800">
                      {property.title}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;