import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Home, List, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/admin" className="flex items-center">
            <img 
              src="https://www.zeemui.com/img/zeemui_logo_green.svg" 
              alt="Zeemui Logo" 
              className="h-10 w-auto mr-2"
            />
            <span className="font-bold text-xl">Admin</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              to="/admin"
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <Home size={18} className="mr-1" />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to="/admin/properties"
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <List size={18} className="mr-1" />
              <span>Properties</span>
            </Link>
            
            <Link 
              to="/admin/properties/new"
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <Plus size={18} className="mr-1" />
              <span>Add Property</span>
            </Link>
            
            <Link 
              to="/"
              className="text-gray-300 hover:text-white transition-colors"
              target="_blank"
            >
              View Site
            </Link>

            <div className="border-l border-gray-600 h-6 mx-2"></div>

            <div className="flex items-center">
              <span className="text-sm mr-4">Welcome, {user?.name}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm flex items-center transition-colors"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;