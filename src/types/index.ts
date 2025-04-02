// Property Types
export interface Property {
  id: string;
  title: string;
  location: PropertyLocation;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  features: string[];
  images: string[];
  featured: boolean;
  newProperty: boolean;
  active: boolean;
}

export interface PropertyLocation {
  city: string;
  country: string;
  area: string;
}

export interface PropertyFilter {
  country: string;
  location: string;
  type: string;
  price: string;
}

// User Types
export interface AdminUser {
  username: string;
  password: string;
  name: string;
}

// UI Types
export interface SelectOption {
  value: string;
  label: string;
}