import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout, AdminProtectedRoute } from './layouts';
import { 
  Home, 
  Properties, 
  PropertyDetails, 
  Blog, 
  BlogPost,
  BuyersGuide,
  About, 
  Contact,
  AdminLogin,
  AdminDashboard,
  PropertyList,
  PropertyForm,
  BulkUpload,
  Terms
} from './pages';

import { BlogPostList, BlogPostForm } from './pages/admin';

// Context providers
import { AuthProvider } from './context/AuthContext';
import { PropertyProvider } from './context/PropertyContext';

function App() {
  return (
    <AuthProvider>
      <PropertyProvider>
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Client Routes */}
            <Route path="/*" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="properties" element={<Properties />} />
              <Route path="properties/:id" element={<PropertyDetails />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:id" element={<BlogPost />} />
              <Route path="blog/buyers-guide" element={<BuyersGuide />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="terms" element={<Terms />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/properties"
              element={
                <AdminProtectedRoute>
                  <PropertyList />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/properties/new"
              element={
                <AdminProtectedRoute>
                  <PropertyForm />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/properties/edit/:id"
              element={
                <AdminProtectedRoute>
                  <PropertyForm />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/properties/bulk-upload"
              element={
                <AdminProtectedRoute>
                  <BulkUpload />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/blog"
              element={
                <AdminProtectedRoute>
                  <BlogPostList />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/blog/new"
              element={
                <AdminProtectedRoute>
                  <BlogPostForm />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/admin/blog/edit/:id"
              element={
                <AdminProtectedRoute>
                  <BlogPostForm />
                </AdminProtectedRoute>
              }
            />
          </Routes>
        </div>
      </PropertyProvider>
    </AuthProvider>
  );
}

export default App;