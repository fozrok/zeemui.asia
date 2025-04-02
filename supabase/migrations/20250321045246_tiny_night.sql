/*
  # Create schema for luxury real estate properties

  1. New Tables
    - `properties`: Main table for property listings
      - `id` (uuid, primary key)
      - `title` (text, property title)
      - `description` (text, property description)
      - `price` (int8, property price)
      - `type` (text, property type)
      - `bedrooms` (int2, number of bedrooms)
      - `bathrooms` (int2, number of bathrooms)
      - `city` (text, property city)
      - `country` (text, property country)
      - `area` (text, property area)
      - `featured` (boolean, is featured property)
      - `new_property` (boolean, is new property)
      - `active` (boolean, is property active/visible)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `property_features`: Table for property features/amenities
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `feature` (text, feature description)
      
    - `property_images`: Table for property images
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `image_url` (text, image URL)
      - `display_order` (int2, order to display images)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage properties
*/

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price int8 NOT NULL,
  type text NOT NULL,
  bedrooms int2 NOT NULL,
  bathrooms int2 NOT NULL,
  city text NOT NULL,
  country text NOT NULL,
  area text NOT NULL,
  featured boolean DEFAULT false,
  new_property boolean DEFAULT false,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create property_features table
CREATE TABLE IF NOT EXISTS property_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  feature text NOT NULL
);

-- Create property_images table
CREATE TABLE IF NOT EXISTS property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  display_order int2 NOT NULL
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for properties table
CREATE POLICY "Anyone can view active properties"
  ON properties
  FOR SELECT
  USING (active = true);

CREATE POLICY "Authenticated users can create properties"
  ON properties
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update their properties"
  ON properties
  FOR UPDATE
  TO authenticated
  USING (true);
  
CREATE POLICY "Authenticated users can delete their properties"
  ON properties
  FOR DELETE
  TO authenticated
  USING (true);

-- Create RLS policies for property_features table
CREATE POLICY "Anyone can view property features"
  ON property_features
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create property features"
  ON property_features
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update property features"
  ON property_features
  FOR UPDATE
  TO authenticated
  USING (true);
  
CREATE POLICY "Authenticated users can delete property features"
  ON property_features
  FOR DELETE
  TO authenticated
  USING (true);

-- Create RLS policies for property_images table
CREATE POLICY "Anyone can view property images"
  ON property_images
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create property images"
  ON property_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update property images"
  ON property_images
  FOR UPDATE
  TO authenticated
  USING (true);
  
CREATE POLICY "Authenticated users can delete property images"
  ON property_images
  FOR DELETE
  TO authenticated
  USING (true);