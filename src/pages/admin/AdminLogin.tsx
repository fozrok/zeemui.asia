import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Lock, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from the location state or default to /admin
  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      const { error: loginError } = await login(email, password);
      
      if (loginError) {
        setError(loginError.message);
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, login, navigate, from]);

  const handleSignUp = useCallback(async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: 'admin'
          }
        }
      });

      if (error) {
        setError(error.message);
      } else {
        setError('Success! Please check your email for verification link.');
      }
    } catch (err) {
      setError('Failed to create user');
    } finally {
      setIsLoading(false);
    }
  }, [email, password]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-800 py-4 px-6">
          <div className="flex justify-center">
            <img 
              src="https://www.zeemui.com/img/zeemui_logo_green.svg" 
              alt="Zeemui Logo" 
              className="h-12 w-auto"
            />
          </div>
          <h2 className="mt-2 text-center text-2xl font-bold text-white">Admin Login</h2>
        </div>
        
        <div className="p-6">
          {error && (
            <div className={`mb-4 ${error.includes('Success') ? 'bg-green-50 border-green-200 text-green-600' : 'bg-red-50 border-red-200 text-red-600'} p-3 rounded border`}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>

              {/* Development only - remove in production */}
              <button
                type="button"
                onClick={handleSignUp}
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Create Admin User
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Default login credentials:</p>
            <p>Username: admin | Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;