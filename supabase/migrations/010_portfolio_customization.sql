-- Migration: Add custom_settings JSONB column for per-portfolio customization
-- Stores color overrides, font choices, and section label overrides

ALTER TABLE public.portfolios
ADD COLUMN IF NOT EXISTS custom_settings JSONB NOT NULL DEFAULT '{}';

COMMENT ON COLUMN public.portfolios.custom_settings IS
'Per-portfolio customization: { colors?: {primary,accent,bg,text}, bodyFont?, headingFont?, sectionLabels?: {about,projects,cv,contact} }';
