export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          type: string
          bedrooms: number
          bathrooms: number
          city: string
          country: string
          area: string
          featured: boolean
          new_property: boolean
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          type: string
          bedrooms: number
          bathrooms: number
          city: string
          country: string
          area: string
          featured?: boolean
          new_property?: boolean
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          type?: string
          bedrooms?: number
          bathrooms?: number
          city?: string
          country?: string
          area?: string
          featured?: boolean
          new_property?: boolean
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      property_features: {
        Row: {
          id: string
          property_id: string
          feature: string
        }
        Insert: {
          id?: string
          property_id: string
          feature: string
        }
        Update: {
          id?: string
          property_id?: string
          feature?: string
        }
      }
      property_images: {
        Row: {
          id: string
          property_id: string
          image_url: string
          display_order: number
        }
        Insert: {
          id?: string
          property_id: string
          image_url: string
          display_order: number
        }
        Update: {
          id?: string
          property_id?: string
          image_url?: string
          display_order?: number
        }
      }
      property_details: {
        Row: {
          id: string
          property_id: string
          square_feet: number
          amenities: Json
          additional_images: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          square_feet: number
          amenities?: Json
          additional_images?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          square_feet?: number
          amenities?: Json
          additional_images?: Json
          created_at?: string
          updated_at?: string
        }
      }
      property_transactions: {
        Row: {
          id: string
          property_id: string
          transaction_type: string
          amount: number
          date: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          property_id: string
          transaction_type: string
          amount: number
          date?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          transaction_type?: string
          amount?: number
          date?: string
          notes?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}