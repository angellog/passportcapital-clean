
-- Create programs table
CREATE TABLE public.programs (
  id text PRIMARY KEY,
  country text NOT NULL,
  region text NOT NULL,
  flag text NOT NULL,
  min_investment integer NOT NULL,
  investment_type text NOT NULL,
  processing_time text NOT NULL,
  visa_free_countries integer NOT NULL,
  family_inclusion boolean NOT NULL DEFAULT true,
  dual_citizenship boolean NOT NULL DEFAULT true,
  physical_presence text NOT NULL,
  highlights jsonb NOT NULL DEFAULT '[]'::jsonb,
  description text NOT NULL,
  program_type text NOT NULL,
  image text NOT NULL,
  is_crypto_friendly boolean NOT NULL DEFAULT false,
  is_new boolean NOT NULL DEFAULT false,
  is_popular boolean NOT NULL DEFAULT false,
  coming_soon boolean NOT NULL DEFAULT false,
  tagline text,
  timezone text,
  language text,
  currency text,
  population text,
  passport_validity text,
  about_country text,
  legal_framework text,
  key_benefits jsonb,
  cost_breakdown jsonb,
  eligibility jsonb,
  required_documents jsonb,
  visa_free_by_region jsonb,
  faqs jsonb,
  timeline jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view programs" ON public.programs FOR SELECT USING (true);

-- Admin write access
CREATE POLICY "Admins can insert programs" ON public.programs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update programs" ON public.programs FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete programs" ON public.programs FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Updated_at trigger
CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
