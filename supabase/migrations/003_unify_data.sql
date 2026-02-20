-- Migration 003: Unify data model
-- - Consolidate social links into students.social_links JSONB
-- - Remove duplicate fields from portfolios (about_image_url, social_links)
-- - Add about_subtitle to portfolios
-- - Update RLS so students can edit their own record (except name)

BEGIN;

-- ─── 1. Add social_links JSONB to students ───

ALTER TABLE public.students
  ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}';

-- Migrate existing instagram/facebook/tiktok data into social_links JSON
UPDATE public.students
SET social_links = jsonb_strip_nulls(jsonb_build_object(
  'instagram', NULLIF(instagram, ''),
  'facebook', NULLIF(facebook, ''),
  'tiktok', NULLIF(tiktok, '')
))
WHERE social_links = '{}' OR social_links IS NULL;

-- Drop the old individual social link columns
ALTER TABLE public.students
  DROP COLUMN IF EXISTS instagram,
  DROP COLUMN IF EXISTS facebook,
  DROP COLUMN IF EXISTS tiktok;

-- Drop portfolio_url and resume_url (portfolio system replaces these)
ALTER TABLE public.students
  DROP COLUMN IF EXISTS portfolio_url,
  DROP COLUMN IF EXISTS resume_url;

-- ─── 2. Update portfolios table ───

-- Add subtitle
ALTER TABLE public.portfolios
  ADD COLUMN IF NOT EXISTS about_subtitle TEXT DEFAULT '';

-- Remove about_image_url (will use students.image instead)
ALTER TABLE public.portfolios
  DROP COLUMN IF EXISTS about_image_url;

-- Remove social_links (will use students.social_links instead)
ALTER TABLE public.portfolios
  DROP COLUMN IF EXISTS social_links;

-- ─── 3. RLS: Allow students to update their own record ───

-- Students can read their own student record
DROP POLICY IF EXISTS "Students can read own record" ON public.students;
CREATE POLICY "Students can read own record"
  ON public.students FOR SELECT
  USING (user_id = auth.uid());

-- Students can update their own record (except name and id, enforced at app level)
DROP POLICY IF EXISTS "Students can update own record" ON public.students;
CREATE POLICY "Students can update own record"
  ON public.students FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

COMMIT;
