-- Add English columns for bilingual portfolio support

-- portfolios: about section English fields
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS about_title_en TEXT NOT NULL DEFAULT '';
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS about_body_en TEXT NOT NULL DEFAULT '';
ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS about_subtitle_en TEXT NOT NULL DEFAULT '';

-- students: English name
ALTER TABLE students ADD COLUMN IF NOT EXISTS name_en TEXT NOT NULL DEFAULT '';

-- projects: English title, description, tags
ALTER TABLE projects ADD COLUMN IF NOT EXISTS title_en TEXT NOT NULL DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS description_en TEXT NOT NULL DEFAULT '';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags_en TEXT[] DEFAULT '{}';

-- cv_sections: English section title and entries
ALTER TABLE cv_sections ADD COLUMN IF NOT EXISTS title_en TEXT NOT NULL DEFAULT '';
ALTER TABLE cv_sections ADD COLUMN IF NOT EXISTS entries_en JSONB DEFAULT '[]';
