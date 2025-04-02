import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key-for-development-only';

// Create the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Check if we're using mock data
export const isMockData = supabaseUrl === 'https://placeholder-project.supabase.co';

// Show a warning in development mode if using mock data
if (import.meta.env.DEV && isMockData) {
  console.warn('Using mock data for development. To use actual Supabase:');
  console.warn('1. Click "Connect to Supabase" in the top right');
  console.warn('2. Create a new Supabase project or connect to an existing one');
}

// Helper function to handle Supabase errors consistently
export const handleSupabaseError = (error: any) => {
  console.error('Supabase error:', error);
  return {
    error: {
      message: error?.message || 'An unknown error occurred',
      status: error?.status || 500
    }
  };
};