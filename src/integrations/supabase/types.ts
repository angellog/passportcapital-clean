export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      programs: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          country: string
          flag_emoji: string | null
          region: string
          program_type: string
          program_name: string
          slug: string
          tagline: string | null
          description: string | null
          highlights: string[] | null
          min_investment: number
          max_investment: number | null
          advisory_fee_min: number | null
          advisory_fee_max: number | null
          processing_time: string | null
          visa_free_countries: number | null
          success_rate: string | null
          investment_options: Json | null
          min_age: number | null
          criminal_record_allowed: boolean
          net_worth_required: string | null
          source_of_funds_required: boolean
          eligible_nationalities: string[] | null
          excluded_nationalities: string[] | null
          required_documents: string[] | null
          due_diligence_stages: string[] | null
          family_included: boolean
          spouse_included: boolean
          children_age_limit: number | null
          parents_included: boolean
          siblings_included: boolean
          family_notes: string | null
          benefits: string[] | null
          travel_access_highlights: string[] | null
          crypto_accepted: boolean
          crypto_notes: string | null
          consultant_pitch: string | null
          ideal_client_profile: string | null
          key_talking_points: string[] | null
          objections: Json | null
          competitor_comparison: string | null
          red_flags: string[] | null
          closing_tips: string | null
          is_active: boolean
          is_featured: boolean
          sort_order: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          country: string
          flag_emoji?: string | null
          region: string
          program_type: string
          program_name: string
          slug: string
          tagline?: string | null
          description?: string | null
          highlights?: string[] | null
          min_investment: number
          max_investment?: number | null
          advisory_fee_min?: number | null
          advisory_fee_max?: number | null
          processing_time?: string | null
          visa_free_countries?: number | null
          success_rate?: string | null
          investment_options?: Json | null
          min_age?: number
          criminal_record_allowed?: boolean
          net_worth_required?: string | null
          source_of_funds_required?: boolean
          eligible_nationalities?: string[] | null
          excluded_nationalities?: string[] | null
          required_documents?: string[] | null
          due_diligence_stages?: string[] | null
          family_included?: boolean
          spouse_included?: boolean
          children_age_limit?: number | null
          parents_included?: boolean
          siblings_included?: boolean
          family_notes?: string | null
          benefits?: string[] | null
          travel_access_highlights?: string[] | null
          crypto_accepted?: boolean
          crypto_notes?: string | null
          consultant_pitch?: string | null
          ideal_client_profile?: string | null
          key_talking_points?: string[] | null
          objections?: Json | null
          competitor_comparison?: string | null
          red_flags?: string[] | null
          closing_tips?: string | null
          is_active?: boolean
          is_featured?: boolean
          sort_order?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          country?: string
          flag_emoji?: string | null
          region?: string
          program_type?: string
          program_name?: string
          slug?: string
          tagline?: string | null
          description?: string | null
          highlights?: string[] | null
          min_investment?: number
          max_investment?: number | null
          advisory_fee_min?: number | null
          advisory_fee_max?: number | null
          processing_time?: string | null
          visa_free_countries?: number | null
          success_rate?: string | null
          investment_options?: Json | null
          min_age?: number
          criminal_record_allowed?: boolean
          net_worth_required?: string | null
          source_of_funds_required?: boolean
          eligible_nationalities?: string[] | null
          excluded_nationalities?: string[] | null
          required_documents?: string[] | null
          due_diligence_stages?: string[] | null
          family_included?: boolean
          spouse_included?: boolean
          children_age_limit?: number | null
          parents_included?: boolean
          siblings_included?: boolean
          family_notes?: string | null
          benefits?: string[] | null
          travel_access_highlights?: string[] | null
          crypto_accepted?: boolean
          crypto_notes?: string | null
          consultant_pitch?: string | null
          ideal_client_profile?: string | null
          key_talking_points?: string[] | null
          objections?: Json | null
          competitor_comparison?: string | null
          red_flags?: string[] | null
          closing_tips?: string | null
          is_active?: boolean
          is_featured?: boolean
          sort_order?: number
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          id: string
          created_at: string
          full_name: string
          email: string | null
          whatsapp: string | null
          country_of_residence: string | null
          nationality: string | null
          program_interest: string | null
          budget_range: string | null
          timeline: string | null
          programs_of_interest: string[] | null
          source: string | null
          referral_partner: string | null
          notes: string | null
          status: string
          assigned_to: string | null
          last_contacted_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          full_name: string
          email?: string | null
          whatsapp?: string | null
          country_of_residence?: string | null
          nationality?: string | null
          program_interest?: string | null
          budget_range?: string | null
          timeline?: string | null
          programs_of_interest?: string[] | null
          source?: string | null
          referral_partner?: string | null
          notes?: string | null
          status?: string
          assigned_to?: string | null
          last_contacted_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          full_name?: string
          email?: string | null
          whatsapp?: string | null
          country_of_residence?: string | null
          nationality?: string | null
          program_interest?: string | null
          budget_range?: string | null
          timeline?: string | null
          programs_of_interest?: string[] | null
          source?: string | null
          referral_partner?: string | null
          notes?: string | null
          status?: string
          assigned_to?: string | null
          last_contacted_at?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string | null
          role: string
          is_active: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name?: string | null
          role?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string | null
          role?: string
          is_active?: boolean
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
