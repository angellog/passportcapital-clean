-- Drop overly broad public SELECT on storage.objects for program-images if it exists
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND cmd = 'SELECT'
      AND qual LIKE '%program-images%'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
  END LOOP;
END $$;

-- Restrict LIST/SELECT on the bucket to admins only.
-- Public access to individual image URLs continues to work because the bucket itself is public.
CREATE POLICY "Admins can list program images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'program-images'
  AND public.has_role(auth.uid(), 'admin'::public.app_role)
);