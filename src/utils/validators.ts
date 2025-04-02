import { z } from 'zod';

// Address validation schema
export const addressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required")
});

// Image validation schema
export const imageSchema = z.object({
  url: z.string().url("Invalid image URL"),
  alt: z.string().optional(),
  displayOrder: z.number().int().nonnegative().optional()
});

// Price range validation function
export const validatePriceRange = (minPrice, maxPrice) => {
  const errors = [];
  
  if (minPrice !== undefined && minPrice < 0) {
    errors.push("Minimum price cannot be negative");
  }
  
  if (maxPrice !== undefined && maxPrice < 0) {
    errors.push("Maximum price cannot be negative");
  }
  
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    errors.push("Minimum price cannot be greater than maximum price");
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Email validation schema
export const emailSchema = z.string().email("Invalid email address");

// Phone validation schema (basic)
export const phoneSchema = z.string()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number cannot exceed 15 digits")
  .regex(/^[+]?[\d\s()-]+$/, "Invalid phone number format");

// URL validation schema 
export const urlSchema = z.string().url("Invalid URL");

// Date validation schema
export const dateSchema = z.string().datetime("Invalid date format");

// Integer validation schema
export const integerSchema = z.number().int("Value must be an integer");

// Positive number validation schema
export const positiveNumberSchema = z.number().positive("Value must be positive");

// Non-negative number validation schema
export const nonNegativeNumberSchema = z.number().nonnegative("Value must be non-negative");