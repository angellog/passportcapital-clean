-- ============================================================
-- Passport Capital — Remote Supabase Migration
-- Run this in the Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  email text NOT NULL,
  name text,
  role text DEFAULT 'consultant' NOT NULL,
  is_active boolean DEFAULT true NOT NULL
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated full access to admin_users"
  ON public.admin_users FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- 2. Create enquiries table (new schema)
CREATE TABLE IF NOT EXISTS public.enquiries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  full_name text,
  email text,
  whatsapp text,
  country_of_residence text,
  nationality text,
  program_interest text,
  budget_range text,
  timeline text,
  programs_of_interest text[],
  source text,
  referral_partner text,
  notes text,
  status text DEFAULT 'new',
  assigned_to text,
  last_contacted_at timestamptz
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit enquiries"
  ON public.enquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated full access to enquiries"
  ON public.enquiries FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- 3. Add missing columns to programs table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'program_name') THEN
    ALTER TABLE public.programs ADD COLUMN program_name text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'slug') THEN
    ALTER TABLE public.programs ADD COLUMN slug text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'flag_emoji') THEN
    ALTER TABLE public.programs ADD COLUMN flag_emoji text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'max_investment') THEN
    ALTER TABLE public.programs ADD COLUMN max_investment numeric;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'advisory_fee_min') THEN
    ALTER TABLE public.programs ADD COLUMN advisory_fee_min numeric;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'advisory_fee_max') THEN
    ALTER TABLE public.programs ADD COLUMN advisory_fee_max numeric;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'success_rate') THEN
    ALTER TABLE public.programs ADD COLUMN success_rate numeric;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'investment_options') THEN
    ALTER TABLE public.programs ADD COLUMN investment_options jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'min_age') THEN
    ALTER TABLE public.programs ADD COLUMN min_age integer;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'criminal_record_allowed') THEN
    ALTER TABLE public.programs ADD COLUMN criminal_record_allowed boolean DEFAULT false;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'net_worth_required') THEN
    ALTER TABLE public.programs ADD COLUMN net_worth_required numeric;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'source_of_funds_required') THEN
    ALTER TABLE public.programs ADD COLUMN source_of_funds_required boolean DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'eligible_nationalities') THEN
    ALTER TABLE public.programs ADD COLUMN eligible_nationalities jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'excluded_nationalities') THEN
    ALTER TABLE public.programs ADD COLUMN excluded_nationalities jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'due_diligence_stages') THEN
    ALTER TABLE public.programs ADD COLUMN due_diligence_stages jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'family_included') THEN
    ALTER TABLE public.programs ADD COLUMN family_included boolean DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'spouse_included') THEN
    ALTER TABLE public.programs ADD COLUMN spouse_included boolean;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'children_age_limit') THEN
    ALTER TABLE public.programs ADD COLUMN children_age_limit text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'parents_included') THEN
    ALTER TABLE public.programs ADD COLUMN parents_included boolean;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'siblings_included') THEN
    ALTER TABLE public.programs ADD COLUMN siblings_included boolean;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'family_notes') THEN
    ALTER TABLE public.programs ADD COLUMN family_notes text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'benefits') THEN
    ALTER TABLE public.programs ADD COLUMN benefits jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'travel_access_highlights') THEN
    ALTER TABLE public.programs ADD COLUMN travel_access_highlights jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'crypto_accepted') THEN
    ALTER TABLE public.programs ADD COLUMN crypto_accepted boolean DEFAULT false;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'crypto_notes') THEN
    ALTER TABLE public.programs ADD COLUMN crypto_notes text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'consultant_pitch') THEN
    ALTER TABLE public.programs ADD COLUMN consultant_pitch text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'ideal_client_profile') THEN
    ALTER TABLE public.programs ADD COLUMN ideal_client_profile text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'key_talking_points') THEN
    ALTER TABLE public.programs ADD COLUMN key_talking_points jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'objections') THEN
    ALTER TABLE public.programs ADD COLUMN objections jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'competitor_comparison') THEN
    ALTER TABLE public.programs ADD COLUMN competitor_comparison jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'red_flags') THEN
    ALTER TABLE public.programs ADD COLUMN red_flags jsonb;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'closing_tips') THEN
    ALTER TABLE public.programs ADD COLUMN closing_tips text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'is_active') THEN
    ALTER TABLE public.programs ADD COLUMN is_active boolean DEFAULT true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'is_featured') THEN
    ALTER TABLE public.programs ADD COLUMN is_featured boolean DEFAULT false;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'programs' AND column_name = 'sort_order') THEN
    ALTER TABLE public.programs ADD COLUMN sort_order integer DEFAULT 0;
  END IF;
END
$$;

-- 4. Backfill new columns from existing data
UPDATE public.programs
SET
  program_name = COALESCE(program_name, country || ' Citizenship by Investment'),
  slug = COALESCE(slug, replace(lower(country), ' & ', '-')),
  flag_emoji = COALESCE(flag_emoji, flag),
  is_active = COALESCE(is_active, NOT COALESCE(coming_soon, false)),
  is_featured = COALESCE(is_featured, COALESCE(is_popular, false)),
  crypto_accepted = COALESCE(crypto_accepted, COALESCE(is_crypto_friendly, false)),
  family_included = COALESCE(family_included, COALESCE(family_inclusion, true))
WHERE program_name IS NULL OR slug IS NULL OR flag_emoji IS NULL;

-- 5. Also backfill investment_options from investment_type where missing
UPDATE public.programs
SET investment_options = COALESCE(investment_options,
  jsonb_build_array(jsonb_build_object('type', investment_type, 'amount', min_investment, 'recommended', true)))
WHERE investment_options IS NULL AND investment_type IS NOT NULL;

-- 5. Fix RLS on programs — add authenticated access policy
CREATE POLICY "Authenticated full access to programs"
  ON public.programs FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- 6. Add newsletter_subscribers authenticated access
CREATE POLICY "Authenticated full access to newsletter_subscribers"
  ON public.newsletter_subscribers FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- 7. Drop the broken handle_first_user_admin trigger if it exists
DROP TRIGGER IF EXISTS on_first_user_admin ON auth.users;

-- 8. Insert default admin user (uncomment and change email before running)
-- INSERT INTO public.admin_users (email, name, role) VALUES
--   ('your-email@example.com', 'Your Name', 'admin');

-- 9. Create admin auth user (run separately in Dashboard → Authentication → Users → Add User)
-- Email: your-email@example.com
-- Password: (set a strong password)
-- Must match the email inserted in admin_users above
