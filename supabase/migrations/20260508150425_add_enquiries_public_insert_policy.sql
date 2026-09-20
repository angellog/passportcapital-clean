CREATE POLICY "Public can submit enquiries"
  ON public.enquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can read own enquiry status"
  ON public.enquiries
  FOR SELECT
  TO anon
  USING (false);

ALTER TABLE public.enquiries
  ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES public.admin_users(id);

CREATE POLICY "Admins can view all enquiries"
  ON public.enquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update enquiries"
  ON public.enquiries
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admins can delete enquiries"
  ON public.enquiries
  FOR DELETE
  TO authenticated
  USING (true);
