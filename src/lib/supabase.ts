import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { properties as mockProperties } from '../data/properties';
import { Property } from '../types';

// Default to mock values for development if actual credentials are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key-for-development-only';

// Create Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Flag to indicate if we're using mock data
export const isMockData = supabaseUrl === 'https://placeholder-project.supabase.co';

// Show a message in console only in development mode
if (isMockData) {
  console.warn('Using mock data for development. To use actual Supabase:');
  console.warn('1. Click "Connect to Supabase" in the top right');
  console.warn('2. Create a new Supabase project or connect to an existing one');
}

// Helper functions for mock data operations (used when no real Supabase connection exists)
export const mockDb = {
  properties: [...mockProperties],
  
  async getProperties(): Promise<Property[]> {
    return this.properties;
  },
  
  async addProperty(property: Omit<Property, 'id'>): Promise<string> {
    const id = Math.random().toString(36).substring(2, 11);
    const newProperty = { ...property, id };
    this.properties.push(newProperty);
    return id;
  },
  
  async updateProperty(property: Property): Promise<boolean> {
    const index = this.properties.findIndex(p => p.id === property.id);
    if (index !== -1) {
      this.properties[index] = property;
      return true;
    }
    return false;
  },
  
  async deleteProperty(id: string): Promise<boolean> {
    const index = this.properties.findIndex(p => p.id === id);
    if (index !== -1) {
      this.properties.splice(index, 1);
      return true;
    }
    return false;
  },
  
  async togglePropertyStatus(id: string): Promise<boolean> {
    const property = this.properties.find(p => p.id === id);
    if (property) {
      property.active = !property.active;
      return true;
    }
    return false;
  }
};