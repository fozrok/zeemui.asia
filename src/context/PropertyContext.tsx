import React, { createContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
import { Property } from '../types';
import allProperties from '../data/allProperties';

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  error: string | null;
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

  // Load properties from files
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setProperties(allProperties);
    } catch (err) {
      setError('Failed to load properties.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const getProperty = useCallback((id: string) => {
    return properties.find(p => p.id === id);
  }, [properties]);

  const getFeaturedProperties = useCallback(() => {
    return properties.filter(p => p.featured && p.active);
  }, [properties]);

  const getActiveProperties = useCallback(() => {
    return properties.filter(p => p.active);
  }, [properties]);

  const refreshProperties = useCallback(async () => {
    await fetchProperties();
  }, [fetchProperties]);

  const contextValue = useMemo(() => ({
    properties,
    loading,
    error,
    getProperty,
    getFeaturedProperties,
    getActiveProperties,
    refreshProperties
  }), [properties, loading, error, getProperty, getFeaturedProperties, getActiveProperties, refreshProperties]);

  return (
    <PropertyContext.Provider value={contextValue}>
      {children}
    </PropertyContext.Provider>
  );
};