/*
  # Enhanced Real Estate Property Management System
  
  1. New Tables
    - `property_details`: Extended property information
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `square_feet` (int4, property size)
      - `amenities` (jsonb, property amenities)
      - `additional_images` (jsonb, additional property images)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `property_transactions`: Property transaction records
      - `id` (uuid, primary key)
      - `property_id` (uuid, foreign key to properties)
      - `transaction_type` (text, type of transaction)
      - `amount` (int8, transaction amount)
      - `date` (timestamptz, transaction date)
      - `notes` (text, transaction notes)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create property_details table that extends the existing properties table
CREATE TABLE IF NOT EXISTS property_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  square_feet int4 NOT NULL DEFAULT 0,
  amenities jsonb DEFAULT '[]'::jsonb,
  additional_images jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create property_transactions table
CREATE TABLE IF NOT EXISTS property_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  transaction_type text NOT NULL,
  amount int8 NOT NULL,
  date timestamptz NOT NULL DEFAULT now(),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE property_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for property_details table
CREATE POLICY "Anyone can view property details for active properties"
  ON property_details
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_details.property_id
      AND properties.active = true
    )
  );

CREATE POLICY "Authenticated users can create property details"
  ON property_details
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update property details"
  ON property_details
  FOR UPDATE
  TO authenticated
  USING (true);
  
CREATE POLICY "Authenticated users can delete property details"
  ON property_details
  FOR DELETE
  TO authenticated
  USING (true);

-- Create RLS policies for property_transactions table
CREATE POLICY "Authenticated users can view transactions"
  ON property_transactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create transactions"
  ON property_transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update transactions"
  ON property_transactions
  FOR UPDATE
  TO authenticated
  USING (true);
  
CREATE POLICY "Authenticated users can delete transactions"
  ON property_transactions
  FOR DELETE
  TO authenticated
  USING (true);

-- Add indexes for better performance
CREATE INDEX property_details_property_id_idx ON property_details(property_id);
CREATE INDEX property_transactions_property_id_idx ON property_transactions(property_id);
CREATE INDEX property_transactions_date_idx ON property_transactions(date);