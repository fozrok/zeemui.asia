import React, { createContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { Property } from '../types';
import { supabase, isMockData, mockDb } from '../lib/supabase';

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  error: string | null;
  addProperty: (property: Omit<Property, 'id'>) => Promise<string | null>;
  updateProperty: (property: Property) => Promise<boolean>;
  togglePropertyStatus: (id: string) => Promise<boolean>;
  deleteProperty: (id: string) => Promise<boolean>;
  getProperty: (id: string) => Property | undefined;
  getFeaturedProperties: () => Property[];
  getActiveProperties: () => Property[];
  refreshProperties: () => Promise<void>;
}

export const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch properties from Supabase or mock data
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (isMockData) {
        // Use mock data when no Supabase connection
        const mockProperties = await mockDb.getProperties();
        setProperties(mockProperties);
      } else {
        // Fetch from actual Supabase database
        // Fetch properties
        const { data: propertiesData, error: propertiesError } = await supabase
          .from('properties')
          .select('*');

        if (propertiesError) throw propertiesError;

        // Create a map to store property data with features and images
        const propertiesMap = new Map<string, any>();
        
        propertiesData.forEach(property => {
          propertiesMap.set(property.id, {
            id: property.id,
            title: property.title,
            description: property.description,
            price: property.price,
            type: property.type,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            location: {
              city: property.city,
              country: property.country,
              area: property.area
            },
            features: [],
            images: [],
            featured: property.featured,
            newProperty: property.new_property,
            active: property.active
          });
        });

        // Fetch property features
        const { data: featuresData, error: featuresError } = await supabase
          .from('property_features')
          .select('*');

        if (featuresError) throw featuresError;

        // Add features to properties
        featuresData.forEach(feature => {
          const property = propertiesMap.get(feature.property_id);
          if (property) {
            property.features.push(feature.feature);
          }
        });

        // Fetch property images
        const { data: imagesData, error: imagesError } = await supabase
          .from('property_images')
          .select('*')
          .order('display_order', { ascending: true });

        if (imagesError) throw imagesError;

        // Add images to properties
        imagesData.forEach(image => {
          const property = propertiesMap.get(image.property_id);
          if (property) {
            property.images.push(image.image_url);
          }
        });

        // Convert map to array and set state
        const propertiesArray = Array.from(propertiesMap.values());
        setProperties(propertiesArray);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to fetch properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Add a new property
  const addProperty = useCallback(async (property: Omit<Property, 'id'>): Promise<string | null> => {
    try {
      setError(null);
      
      if (isMockData) {
        // Use mock implementation
        const newId = await mockDb.addProperty(property);
        await fetchProperties();
        return newId;
      } else {
        // Insert into properties table
        const { data: insertedProperty, error: insertError } = await supabase
          .from('properties')
          .insert({
            title: property.title,
            description: property.description,
            price: property.price,
            type: property.type,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            city: property.location.city,
            country: property.location.country,
            area: property.location.area,
            featured: property.featured,
            new_property: property.newProperty,
            active: property.active
          })
          .select('id')
          .single();

        if (insertError) throw insertError;

        const newPropertyId = insertedProperty.id;

        // Insert features
        if (property.features.length > 0) {
          const featuresToInsert = property.features.map(feature => ({
            property_id: newPropertyId,
            feature
          }));

          const { error: featuresError } = await supabase
            .from('property_features')
            .insert(featuresToInsert);

          if (featuresError) throw featuresError;
        }

        // Insert images
        if (property.images.length > 0) {
          const imagesToInsert = property.images.map((url, index) => ({
            property_id: newPropertyId,
            image_url: url,
            display_order: index + 1
          }));

          const { error: imagesError } = await supabase
            .from('property_images')
            .insert(imagesToInsert);

          if (imagesError) throw imagesError;
        }

        // Refresh properties
        await fetchProperties();
        
        return newPropertyId;
      }
    } catch (err) {
      console.error('Error adding property:', err);
      setError('Failed to add property. Please try again.');
      return null;
    }
  }, [fetchProperties]);

  // Update an existing property
  const updateProperty = useCallback(async (updatedProperty: Property): Promise<boolean> => {
    try {
      setError(null);
      
      if (isMockData) {
        // Use mock implementation
        const success = await mockDb.updateProperty(updatedProperty);
        await fetchProperties();
        return success;
      } else {
        // Update properties table
        const { error: updateError } = await supabase
          .from('properties')
          .update({
            title: updatedProperty.title,
            description: updatedProperty.description,
            price: updatedProperty.price,
            type: updatedProperty.type,
            bedrooms: updatedProperty.bedrooms,
            bathrooms: updatedProperty.bathrooms,
            city: updatedProperty.location.city,
            country: updatedProperty.location.country,
            area: updatedProperty.location.area,
            featured: updatedProperty.featured,
            new_property: updatedProperty.newProperty,
            active: updatedProperty.active,
            updated_at: new Date().toISOString()
          })
          .eq('id', updatedProperty.id);

        if (updateError) throw updateError;

        // Delete existing features and images
        const { error: deleteFeatureError } = await supabase
          .from('property_features')
          .delete()
          .eq('property_id', updatedProperty.id);

        if (deleteFeatureError) throw deleteFeatureError;

        const { error: deleteImageError } = await supabase
          .from('property_images')
          .delete()
          .eq('property_id', updatedProperty.id);

        if (deleteImageError) throw deleteImageError;

        // Insert new features
        if (updatedProperty.features.length > 0) {
          const featuresToInsert = updatedProperty.features.map(feature => ({
            property_id: updatedProperty.id,
            feature
          }));

          const { error: featuresError } = await supabase
            .from('property_features')
            .insert(featuresToInsert);

          if (featuresError) throw featuresError;
        }

        // Insert new images
        if (updatedProperty.images.length > 0) {
          const imagesToInsert = updatedProperty.images.map((url, index) => ({
            property_id: updatedProperty.id,
            image_url: url,
            display_order: index + 1
          }));

          const { error: imagesError } = await supabase
            .from('property_images')
            .insert(imagesToInsert);

          if (imagesError) throw imagesError;
        }

        // Refresh properties
        await fetchProperties();
        
        return true;
      }
    } catch (err) {
      console.error('Error updating property:', err);
      setError('Failed to update property. Please try again.');
      return false;
    }
  }, [fetchProperties]);

  // Toggle property active status
  const togglePropertyStatus = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      
      if (isMockData) {
        // Use mock implementation
        const success = await mockDb.togglePropertyStatus(id);
        await fetchProperties();
        return success;
      } else {
        // Find the property to toggle
        const property = properties.find(p => p.id === id);
        if (!property) return false;

        // Update in database
        const { error: updateError } = await supabase
          .from('properties')
          .update({
            active: !property.active,
            updated_at: new Date().toISOString()
          })
          .eq('id', id);

        if (updateError) throw updateError;

        // Refresh properties
        await fetchProperties();
        
        return true;
      }
    } catch (err) {
      console.error('Error toggling property status:', err);
      setError('Failed to update property status. Please try again.');
      return false;
    }
  }, [properties, fetchProperties]);

  // Delete a property
  const deleteProperty = useCallback(async (id: string): Promise<boolean> => {
    try {
      setError(null);
      
      if (isMockData) {
        // Use mock implementation
        const success = await mockDb.deleteProperty(id);
        await fetchProperties();
        return success;
      } else {
        // Delete from database (cascade delete will handle features and images)
        const { error: deleteError } = await supabase
          .from('properties')
          .delete()
          .eq('id', id);

        if (deleteError) throw deleteError;

        // Refresh properties
        await fetchProperties();
        
        return true;
      }
    } catch (err) {
      console.error('Error deleting property:', err);
      setError('Failed to delete property. Please try again.');
      return false;
    }
  }, [fetchProperties]);

  // Get a specific property
  const getProperty = useCallback((id: string) => {
    return properties.find(p => p.id === id);
  }, [properties]);

  // Get featured properties
  const getFeaturedProperties = useCallback(() => {
    return properties.filter(p => p.featured && p.active);
  }, [properties]);

  // Get active properties
  const getActiveProperties = useCallback(() => {
    return properties.filter(p => p.active);
  }, [properties]);

  // Manual refresh function
  const refreshProperties = useCallback(async () => {
    await fetchProperties();
  }, [fetchProperties]);

  const contextValue = useMemo(() => ({ 
    properties, 
    loading,
    error,
    addProperty, 
    updateProperty, 
    togglePropertyStatus, 
    deleteProperty, 
    getProperty,
    getFeaturedProperties,
    getActiveProperties,
    refreshProperties
  }), [
    properties,
    loading,
    error,
    addProperty, 
    updateProperty, 
    togglePropertyStatus, 
    deleteProperty, 
    getProperty,
    getFeaturedProperties,
    getActiveProperties,
    refreshProperties
  ]);

  return (
    <PropertyContext.Provider value={contextValue}>
      {children}
    </PropertyContext.Provider>
  );
};