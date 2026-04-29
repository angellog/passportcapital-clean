
-- Create program-images storage bucket (public)
INSERT INTO storage.buckets (id, name, public)
VALUES ('program-images', 'program-images', true);

-- RLS: Anyone can view (public bucket)
CREATE POLICY "Anyone can view program images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'program-images');

-- RLS: Admins can upload
CREATE POLICY "Admins can upload program images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'program-images' AND public.has_role(auth.uid(), 'admin'));

-- RLS: Admins can update
CREATE POLICY "Admins can update program images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'program-images' AND public.has_role(auth.uid(), 'admin'));

-- RLS: Admins can delete
CREATE POLICY "Admins can delete program images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'program-images' AND public.has_role(auth.uid(), 'admin'));
