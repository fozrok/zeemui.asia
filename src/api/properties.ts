import { supabase, handleSupabaseError } from '../lib/supabaseClient';
import { z } from 'zod';

// Validation schemas
const propertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title cannot exceed 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  type: z.string().min(1, "Property type is required"),
  bedrooms: z.number().int().nonnegative("Bedrooms must be a non-negative integer"),
  bathrooms: z.number().int().nonnegative("Bathrooms must be a non-negative integer"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  area: z.string().min(1, "Area is required"),
  featured: z.boolean().optional(),
  new_property: z.boolean().optional(),
  active: z.boolean().optional()
});

const propertyDetailsSchema = z.object({
  property_id: z.string().uuid("Invalid property ID"),
  square_feet: z.number().int().positive("Square feet must be a positive integer"),
  amenities: z.array(z.string()).optional(),
  additional_images: z.array(z.string().url("Invalid image URL")).optional()
});

const propertyTransactionSchema = z.object({
  property_id: z.string().uuid("Invalid property ID"),
  transaction_type: z.enum(["sale", "rent", "lease", "deposit", "withdrawal"]),
  amount: z.number().int(),
  date: z.string().datetime().optional(),
  notes: z.string().optional()
});

// Fetch all properties with pagination
export async function fetchProperties(page = 1, pageSize = 10, filters = {}) {
  try {
    const startIndex = (page - 1) * pageSize;
    
    let query = supabase
      .from('properties')
      .select(`
        *,
        property_features (id, feature),
        property_images (id, image_url, display_order),
        property_details (id, square_feet, amenities, additional_images)
      `)
      .order('created_at', { ascending: false })
      .range(startIndex, startIndex + pageSize - 1);
    
    // Apply filters if provided
    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    if (filters.city) {
      query = query.eq('city', filters.city);
    }
    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters.bedrooms) {
      query = query.eq('bedrooms', filters.bedrooms);
    }
    if (filters.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }
    if (filters.active !== undefined) {
      query = query.eq('active', filters.active);
    }
    
    const { data, error, count } = await query;
    
    if (error) {
      return handleSupabaseError(error);
    }
    
    // Get total count for pagination
    const { count: totalCount, error: countError } = await supabase
      .from('properties')
      .select('*', { count: 'exact' });
    
    return {
      data,
      meta: {
        page,
        pageSize,
        totalCount: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / pageSize)
      }
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Fetch a single property by ID
export async function fetchPropertyById(propertyId) {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        *,
        property_features (id, feature),
        property_images (id, image_url, display_order),
        property_details (id, square_feet, amenities, additional_images),
        property_transactions (id, transaction_type, amount, date, notes)
      `)
      .eq('id', propertyId)
      .single();
    
    if (error) {
      return handleSupabaseError(error);
    }
    
    return { data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Create a new property
export async function createProperty(propertyData, detailsData = null) {
  try {
    // Validate input data
    const validatedPropertyData = propertySchema.parse(propertyData);
    
    // Start a transaction
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .insert(validatedPropertyData)
      .select()
      .single();
    
    if (propertyError) {
      return handleSupabaseError(propertyError);
    }
    
    // If we have details data, insert it as well
    if (detailsData) {
      const validatedDetailsData = propertyDetailsSchema.parse({
        ...detailsData,
        property_id: property.id
      });
      
      const { error: detailsError } = await supabase
        .from('property_details')
        .insert(validatedDetailsData);
      
      if (detailsError) {
        return handleSupabaseError(detailsError);
      }
    }
    
    return { data: property };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: {
          message: 'Validation error',
          details: error.errors,
          status: 400
        }
      };
    }
    
    return handleSupabaseError(error);
  }
}

// Update an existing property
export async function updateProperty(propertyId, propertyData, detailsData = null) {
  try {
    // Validate input data
    const validatedPropertyData = propertySchema.partial().parse(propertyData);
    
    // Update property data
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .update({
        ...validatedPropertyData,
        updated_at: new Date().toISOString()
      })
      .eq('id', propertyId)
      .select()
      .single();
    
    if (propertyError) {
      return handleSupabaseError(propertyError);
    }
    
    // If we have details data, update or insert it
    if (detailsData) {
      const validatedDetailsData = propertyDetailsSchema.partial().parse({
        ...detailsData,
        property_id: propertyId
      });
      
      // Check if property details exist
      const { data: existingDetails, error: checkError } = await supabase
        .from('property_details')
        .select('id')
        .eq('property_id', propertyId)
        .maybeSingle();
      
      if (checkError) {
        return handleSupabaseError(checkError);
      }
      
      if (existingDetails) {
        // Update existing details
        const { error: updateError } = await supabase
          .from('property_details')
          .update({
            ...validatedDetailsData,
            updated_at: new Date().toISOString()
          })
          .eq('property_id', propertyId);
        
        if (updateError) {
          return handleSupabaseError(updateError);
        }
      } else {
        // Insert new details
        const { error: insertError } = await supabase
          .from('property_details')
          .insert({
            ...validatedDetailsData,
            property_id: propertyId
          });
        
        if (insertError) {
          return handleSupabaseError(insertError);
        }
      }
    }
    
    return { data: property };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: {
          message: 'Validation error',
          details: error.errors,
          status: 400
        }
      };
    }
    
    return handleSupabaseError(error);
  }
}

// Delete a property
export async function deleteProperty(propertyId) {
  try {
    // Delete the property (cascade deletion will handle related records)
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', propertyId);
    
    if (error) {
      return handleSupabaseError(error);
    }
    
    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
}

// Add property transaction
export async function addPropertyTransaction(transactionData) {
  try {
    // Validate transaction data
    const validatedData = propertyTransactionSchema.parse(transactionData);
    
    const { data, error } = await supabase
      .from('property_transactions')
      .insert(validatedData)
      .select()
      .single();
    
    if (error) {
      return handleSupabaseError(error);
    }
    
    return { data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: {
          message: 'Validation error',
          details: error.errors,
          status: 400
        }
      };
    }
    
    return handleSupabaseError(error);
  }
}

// Get property transactions
export async function getPropertyTransactions(propertyId) {
  try {
    const { data, error } = await supabase
      .from('property_transactions')
      .select('*')
      .eq('property_id', propertyId)
      .order('date', { ascending: false });
    
    if (error) {
      return handleSupabaseError(error);
    }
    
    return { data };
  } catch (error) {
    return handleSupabaseError(error);
  }
}