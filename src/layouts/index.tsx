import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Navbar, Footer } from '../components';
import { AdminNavbar } from '../components/admin';
import { useAuth } from '../hooks/useAuth';

export const AppLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
};