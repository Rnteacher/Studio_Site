-- Migration: Add website column to students + new templates
-- This lets contact info live only in the students table

-- Add website to students
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS website TEXT DEFAULT '';

-- Copy existing contact_website from portfolios to students (if any)
UPDATE public.students s
SET website = COALESCE(p.contact_website, '')
FROM public.portfolios p
WHERE p.student_id = s.id
  AND s.website = ''
  AND p.contact_website IS NOT NULL
  AND p.contact_website != '';

-- Insert 6 new templates
INSERT INTO public.templates (name, label, category, description) VALUES
    ('classic-serif', 'קלאסי סריף', 'classic', 'עיצוב עם טיפוגרפיה סריפית, sidebar וצבעי navy'),
    ('classic-grid', 'קלאסי גריד', 'classic', 'עיצוב מסודר בגריד עם כרטיסים שווי גודל'),
    ('modern-gradient', 'מודרני גרדיאנט', 'modern', 'עיצוב עם רקעים gradient ואפקטי זכוכית'),
    ('modern-dark', 'מודרני כהה', 'modern', 'עיצוב dark theme עם אקסנטים זוהרים'),
    ('experimental-retro', 'ניסיוני רטרו', 'experimental', 'עיצוב רטרו שנות ה-90 עם borders פיקסליים'),
    ('experimental-magazine', 'ניסיוני מגזין', 'experimental', 'עיצוב editorial כמו מגזין עם multi-column')
ON CONFLICT (name) DO NOTHING;
