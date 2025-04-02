import { supabase } from '../lib/supabase';

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error.message);
      return false;
    }
    
    console.log('Successfully connected to Supabase!');
    return true;
  } catch (err) {
    console.error('Failed to connect to Supabase:', err);
    return false;
  }
} 