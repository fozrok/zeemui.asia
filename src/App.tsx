import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppLayout, AdminProtectedRoute } from './layouts';
import { 
  Home, 
  Properties, 
  PropertyDetails, 
  Blog, 
  About, 
  Contact,
  AdminLogin,
  AdminDashboard,
  PropertyList,
  PropertyForm
} from './pages';

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
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
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
              path="/admin/properties/:id"
              element={
                <AdminProtectedRoute>
                  <PropertyForm />
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