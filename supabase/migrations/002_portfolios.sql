-- Studio Durian - Portfolio System Schema
-- Run this in the Supabase SQL Editor after 001_schema.sql
-- IDEMPOTENT: safe to re-run if partially applied

-- ─── Add user_id to students (links student record to auth user) ───
ALTER TABLE public.students
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) UNIQUE;

-- ─── Templates ───
CREATE TABLE IF NOT EXISTS public.templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('classic', 'modern', 'experimental')),
    thumbnail_url TEXT NOT NULL DEFAULT '/images/templates/default.png',
    description TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read templates" ON public.templates;
CREATE POLICY "Anyone can read templates"
ON public.templates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage templates" ON public.templates;
CREATE POLICY "Admins can manage templates"
ON public.templates FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ─── Portfolios ───
CREATE TABLE IF NOT EXISTS public.portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id TEXT NOT NULL REFERENCES public.students(id) ON DELETE CASCADE UNIQUE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    template_id UUID REFERENCES public.templates(id) ON DELETE SET NULL,
    slug TEXT UNIQUE,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    about_title TEXT NOT NULL DEFAULT '',
    about_body TEXT NOT NULL DEFAULT '',
    about_image_url TEXT,
    contact_email TEXT NOT NULL DEFAULT '',
    contact_phone TEXT NOT NULL DEFAULT '',
    contact_website TEXT,
    social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read published portfolios" ON public.portfolios;
CREATE POLICY "Anyone can read published portfolios"
ON public.portfolios FOR SELECT
USING (status = 'published');

DROP POLICY IF EXISTS "Owner can read own portfolio" ON public.portfolios;
CREATE POLICY "Owner can read own portfolio"
ON public.portfolios FOR SELECT
TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Owner can insert own portfolio" ON public.portfolios;
CREATE POLICY "Owner can insert own portfolio"
ON public.portfolios FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Owner can update own portfolio" ON public.portfolios;
CREATE POLICY "Owner can update own portfolio"
ON public.portfolios FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Owner can delete own portfolio" ON public.portfolios;
CREATE POLICY "Owner can delete own portfolio"
ON public.portfolios FOR DELETE
TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage all portfolios" ON public.portfolios;
CREATE POLICY "Admins can manage all portfolios"
ON public.portfolios FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS update_portfolios_updated_at ON public.portfolios;
CREATE TRIGGER update_portfolios_updated_at
BEFORE UPDATE ON public.portfolios
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ─── CV Sections ───
CREATE TABLE IF NOT EXISTS public.cv_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
    section_type TEXT NOT NULL CHECK (section_type IN ('education', 'experience', 'skills', 'awards', 'custom')),
    title TEXT NOT NULL DEFAULT '',
    entries JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.cv_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read cv_sections of published portfolios" ON public.cv_sections;
CREATE POLICY "Anyone can read cv_sections of published portfolios"
ON public.cv_sections FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.portfolios p
        WHERE p.id = portfolio_id AND p.status = 'published'
    )
);

DROP POLICY IF EXISTS "Owner can read own cv_sections" ON public.cv_sections;
CREATE POLICY "Owner can read own cv_sections"
ON public.cv_sections FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.portfolios p
        WHERE p.id = portfolio_id AND p.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Owner can insert own cv_sections" ON public.cv_sections;
CREATE POLICY "Owner can insert own cv_sections"
ON public.cv_sections FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.portfolios p
        WHERE p.id = portfolio_id AND p.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Owner can update own cv_sections" ON public.cv_sections;
CREATE POLICY "Owner can update own cv_sections"
ON public.cv_sections FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.portfolios p
        WHERE p.id = portfolio_id AND p.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Owner can delete own cv_sections" ON public.cv_sections;
CREATE POLICY "Owner can delete own cv_sections"
ON public.cv_sections FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.portfolios p
        WHERE p.id = portfolio_id AND p.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Admins can manage all cv_sections" ON public.cv_sections;
CREATE POLICY "Admins can manage all cv_sections"
ON public.cv_sections FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS update_cv_sections_updated_at ON public.cv_sections;
CREATE TRIGGER update_cv_sections_updated_at
BEFORE UPDATE ON public.cv_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ─── Projects ───
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_id UUID NOT NULL REFERENCES public.portfolios(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    tags TEXT[] NOT NULL DEFAULT '{}',
    drive_folder_url TEXT,
    thumbnail_url TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read projects of published portfolios" ON public.projects;
CREATE POLICY "Anyone can read projects of published portfolios"
ON public.projects FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.portfolios p
        WHERE p.id = portfolio_id AND p.status = 'published'
    )
);

DROP POLICY IF EXISTS "Owner can read own projects" ON public.projects;
CREATE POLICY "Owner can read own projects"
ON public.projects FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.portfolios p
        WHERE p.id = portfolio_id AND p.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Owner can insert own projects" ON public.projects;
CREATE POLICY "Owner can insert own projects"
ON public.projects FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.portfolios p
        WHERE p.id = portfolio_id AND p.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Owner can update own projects" ON public.projects;
CREATE POLICY "Owner can update own projects"
ON public.projects FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.portfolios p
        WHERE p.id = portfolio_id AND p.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Owner can delete own projects" ON public.projects;
CREATE POLICY "Owner can delete own projects"
ON public.projects FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.portfolios p
        WHERE p.id = portfolio_id AND p.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Admins can manage all projects" ON public.projects;
CREATE POLICY "Admins can manage all projects"
ON public.projects FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ─── Project Media ───
CREATE TABLE IF NOT EXISTS public.project_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    drive_file_id TEXT,
    file_name TEXT NOT NULL DEFAULT '',
    mime_type TEXT NOT NULL DEFAULT '',
    thumbnail_url TEXT,
    web_view_url TEXT,
    sort_order INT NOT NULL DEFAULT 0
);
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read media of published portfolios" ON public.project_media;
CREATE POLICY "Anyone can read media of published portfolios"
ON public.project_media FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.projects pr
        JOIN public.portfolios p ON p.id = pr.portfolio_id
        WHERE pr.id = project_id AND p.status = 'published'
    )
);

DROP POLICY IF EXISTS "Owner can read own project_media" ON public.project_media;
CREATE POLICY "Owner can read own project_media"
ON public.project_media FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.projects pr
        JOIN public.portfolios p ON p.id = pr.portfolio_id
        WHERE pr.id = project_id AND p.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Owner can insert own project_media" ON public.project_media;
CREATE POLICY "Owner can insert own project_media"
ON public.project_media FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.projects pr
        JOIN public.portfolios p ON p.id = pr.portfolio_id
        WHERE pr.id = project_id AND p.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Owner can update own project_media" ON public.project_media;
CREATE POLICY "Owner can update own project_media"
ON public.project_media FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.projects pr
        JOIN public.portfolios p ON p.id = pr.portfolio_id
        WHERE pr.id = project_id AND p.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Owner can delete own project_media" ON public.project_media;
CREATE POLICY "Owner can delete own project_media"
ON public.project_media FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.projects pr
        JOIN public.portfolios p ON p.id = pr.portfolio_id
        WHERE pr.id = project_id AND p.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Admins can manage all project_media" ON public.project_media;
CREATE POLICY "Admins can manage all project_media"
ON public.project_media FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ─── Storage: portfolio-images bucket ───
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read access for portfolio images" ON storage.objects;
CREATE POLICY "Public read access for portfolio images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

DROP POLICY IF EXISTS "Authenticated users can upload portfolio images" ON storage.objects;
CREATE POLICY "Authenticated users can upload portfolio images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'portfolio-images');

DROP POLICY IF EXISTS "Users can update own portfolio images" ON storage.objects;
CREATE POLICY "Users can update own portfolio images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'portfolio-images' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "Users can delete own portfolio images" ON storage.objects;
CREATE POLICY "Users can delete own portfolio images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'portfolio-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- ─── Seed Templates (upsert) ───
INSERT INTO public.templates (name, label, category, description) VALUES
    ('classic-clean', 'קלאסי נקי', 'classic', 'עיצוב נקי ומינימלי עם טיפוגרפיה ברורה'),
    ('classic-elegant', 'קלאסי אלגנטי', 'classic', 'עיצוב אלגנטי עם דגש על תמונות ומרווחים'),
    ('modern-bold', 'מודרני נועז', 'modern', 'עיצוב נועז עם צבעים חזקים ואלמנטים גרפיים'),
    ('modern-minimal', 'מודרני מינימלי', 'modern', 'עיצוב מודרני מינימלי עם קווים נקיים'),
    ('experimental-creative', 'ניסיוני יצירתי', 'experimental', 'עיצוב יצירתי עם אנימציות ואפקטים'),
    ('experimental-avant-garde', 'ניסיוני אוונגרד', 'experimental', 'עיצוב אוונגרדי עם פריסה לא שגרתית')
ON CONFLICT (name) DO NOTHING;

-- ─── Add student RLS policy for own record update ───
DROP POLICY IF EXISTS "Students can update own record" ON public.students;
CREATE POLICY "Students can update own record"
ON public.students FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

-- ─── Grants for new tables ───
GRANT SELECT ON public.templates TO anon;
GRANT SELECT ON public.portfolios TO anon;
GRANT SELECT ON public.cv_sections TO anon;
GRANT SELECT ON public.projects TO anon;
GRANT SELECT ON public.project_media TO anon;

GRANT ALL ON public.templates TO authenticated;
GRANT ALL ON public.portfolios TO authenticated;
GRANT ALL ON public.cv_sections TO authenticated;
GRANT ALL ON public.projects TO authenticated;
GRANT ALL ON public.project_media TO authenticated;
