export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      contact_enquiries: {
        Row: {
          assigned_to: string | null
          country_code: string
          created_at: string
          email: string
          enquiry: string | null
          first_name: string
          id: string
          investment_budget: string
          last_name: string
          nationality: string
          notes: string | null
          phone: string
          program_interest: string
          residence: string
          status: Database["public"]["Enums"]["enquiry_status"]
        }
        Insert: {
          assigned_to?: string | null
          country_code?: string
          created_at?: string
          email: string
          enquiry?: string | null
          first_name: string
          id?: string
          investment_budget: string
          last_name: string
          nationality: string
          notes?: string | null
          phone: string
          program_interest: string
          residence: string
          status?: Database["public"]["Enums"]["enquiry_status"]
        }
        Update: {
          assigned_to?: string | null
          country_code?: string
          created_at?: string
          email?: string
          enquiry?: string | null
          first_name?: string
          id?: string
          investment_budget?: string
          last_name?: string
          nationality?: string
          notes?: string | null
          phone?: string
          program_interest?: string
          residence?: string
          status?: Database["public"]["Enums"]["enquiry_status"]
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      programs: {
        Row: {
          about_country: string | null
          coming_soon: boolean
          cost_breakdown: Json | null
          country: string
          created_at: string
          currency: string | null
          description: string
          dual_citizenship: boolean
          eligibility: Json | null
          family_inclusion: boolean
          faqs: Json | null
          flag: string
          highlights: Json
          id: string
          image: string
          investment_type: string
          is_crypto_friendly: boolean
          is_new: boolean
          is_popular: boolean
          key_benefits: Json | null
          language: string | null
          legal_framework: string | null
          min_investment: number
          passport_validity: string | null
          physical_presence: string
          population: string | null
          processing_time: string
          program_type: string
          region: string
          required_documents: Json | null
          tagline: string | null
          timeline: Json | null
          timezone: string | null
          updated_at: string
          visa_free_by_region: Json | null
          visa_free_countries: number
        }
        Insert: {
          about_country?: string | null
          coming_soon?: boolean
          cost_breakdown?: Json | null
          country: string
          created_at?: string
          currency?: string | null
          description: string
          dual_citizenship?: boolean
          eligibility?: Json | null
          family_inclusion?: boolean
          faqs?: Json | null
          flag: string
          highlights?: Json
          id: string
          image: string
          investment_type: string
          is_crypto_friendly?: boolean
          is_new?: boolean
          is_popular?: boolean
          key_benefits?: Json | null
          language?: string | null
          legal_framework?: string | null
          min_investment: number
          passport_validity?: string | null
          physical_presence: string
          population?: string | null
          processing_time: string
          program_type: string
          region: string
          required_documents?: Json | null
          tagline?: string | null
          timeline?: Json | null
          timezone?: string | null
          updated_at?: string
          visa_free_by_region?: Json | null
          visa_free_countries: number
        }
        Update: {
          about_country?: string | null
          coming_soon?: boolean
          cost_breakdown?: Json | null
          country?: string
          created_at?: string
          currency?: string | null
          description?: string
          dual_citizenship?: boolean
          eligibility?: Json | null
          family_inclusion?: boolean
          faqs?: Json | null
          flag?: string
          highlights?: Json
          id?: string
          image?: string
          investment_type?: string
          is_crypto_friendly?: boolean
          is_new?: boolean
          is_popular?: boolean
          key_benefits?: Json | null
          language?: string | null
          legal_framework?: string | null
          min_investment?: number
          passport_validity?: string | null
          physical_presence?: string
          population?: string | null
          processing_time?: string
          program_type?: string
          region?: string
          required_documents?: Json | null
          tagline?: string | null
          timeline?: Json | null
          timezone?: string | null
          updated_at?: string
          visa_free_by_region?: Json | null
          visa_free_countries?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_moderator: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      enquiry_status: "new" | "contacted" | "in_progress" | "closed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      enquiry_status: ["new", "contacted", "in_progress", "closed"],
    },
  },
} as const
