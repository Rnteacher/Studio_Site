-- Migration: Update templates – remove 3 old, add 10 new, relax category constraint

-- Drop the old CHECK constraint on category
ALTER TABLE public.templates DROP CONSTRAINT IF EXISTS templates_category_check;

-- Delete removed templates (portfolios referencing them get template_id = NULL via ON DELETE SET NULL)
DELETE FROM public.templates WHERE name IN ('classic-clean', 'classic-grid', 'experimental-magazine');

-- Insert 10 new templates
INSERT INTO public.templates (name, label, category, description) VALUES
    ('nature-organic',   'טבע אורגני',    'artistic',      'עיצוב ירקרק ורגוע עם פינות מעוגלות ואווירה טבעית'),
    ('tech-terminal',    'טרמינל טכנולוגי', 'modern',       'עיצוב בהשראת טרמינל עם רקע כהה ואקצנט ירוק'),
    ('pastel-dreamy',    'פסטל חלומי',     'artistic',      'גוונים רכים ופסטליים עם gradients חלומיים'),
    ('brutalist-raw',    'ברוטליסטי גולמי', 'experimental', 'עיצוב ברוטליסטי גולמי עם קווים עבים ומונוכרום'),
    ('neon-glow',        'ניאון זוהר',     'modern',        'רקע כהה עם צבעי ניאון ורודים וכחולים זוהרים'),
    ('paper-craft',      'נייר יצירתי',    'artistic',      'טקסטורת נייר עם מראה של מכתב ושוליים קרועים'),
    ('geometric-sharp',  'גיאומטרי חד',    'modern',        'צורות גיאומטריות חדות עם דפוסים זוויתיים'),
    ('watercolor-soft',  'צבע מים רך',     'artistic',      'גבולות רכים בצבעי מים עם layout זורם ואוורירי'),
    ('monochrome-photo', 'מונוכרום צילומי', 'classic',       'שחור-לבן עם דגש על תמונות רקע וטיפוגרפיה סריפית'),
    ('playful-pop',      'שובב פופ',       'experimental',  'צבעים חיים וצורות שובבות בהשראת פופ-ארט')
ON CONFLICT (name) DO NOTHING;
