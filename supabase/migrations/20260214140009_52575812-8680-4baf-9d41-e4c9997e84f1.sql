
-- Drop existing default first
ALTER TABLE public.students ALTER COLUMN services DROP DEFAULT;

-- Change services column from text[] to jsonb
ALTER TABLE public.students 
  ALTER COLUMN services TYPE jsonb 
  USING (
    CASE 
      WHEN array_length(categories, 1) > 0 AND array_length(services, 1) > 0 
      THEN jsonb_build_object(categories[1], to_jsonb(services))
      ELSE '{}'::jsonb
    END
  );

-- Set new default
ALTER TABLE public.students 
  ALTER COLUMN services SET DEFAULT '{}'::jsonb;
