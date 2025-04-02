import React, { createContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { adminUsers } from '../data/admin';
import { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('adminUser');
      }
    }
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    const foundUser = adminUsers.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('adminUser', JSON.stringify(foundUser));
      return true;
    }
    
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('adminUser');
  }, []);

  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated
  }), [user, login, logout, isAuthenticated]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};