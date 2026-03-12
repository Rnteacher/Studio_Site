-- Allow authenticated students to upload/update/delete their own images
-- in the "students/" folder of the "images" bucket.

CREATE POLICY "Students can upload own images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images'
  AND (storage.foldername(name))[1] = 'students'
);

CREATE POLICY "Students can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images'
  AND (storage.foldername(name))[1] = 'students'
);

CREATE POLICY "Students can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'images'
  AND (storage.foldername(name))[1] = 'students'
);
