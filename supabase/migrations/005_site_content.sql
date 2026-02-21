-- Dynamic site content table
CREATE TABLE IF NOT EXISTS site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL DEFAULT '',
    type TEXT DEFAULT 'text',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(section, key)
);

-- RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Everyone can read
CREATE POLICY "site_content_read" ON site_content
    FOR SELECT USING (true);

-- Only admins can write
CREATE POLICY "site_content_admin_write" ON site_content
    FOR ALL USING (
        EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')
    );

-- Seed with current static values
INSERT INTO site_content (section, key, value, type) VALUES
    -- Hero
    ('hero', 'title', 'סטודיו דוריאן', 'text'),
    ('hero', 'subtitle', 'יוזמת נוער יצירתית מתוך תיכון החממה בהוד השרון', 'text'),
    ('hero', 'mission', 'המשימה שלנו היא להעצים את חניכי תיכון החממה בהוד השרון, ולהפוך את הכישרונות שלהם לשירותים אמיתיים', 'text'),
    ('hero', 'badge1', 'כישרונות צעירים', 'text'),
    ('hero', 'badge2', 'שירותים אמיתיים', 'text'),
    ('hero', 'badge3', 'חממה בהוד השרון', 'text'),
    -- Footer
    ('footer', 'title', 'סטודיו דוריאן', 'text'),
    ('footer', 'description', 'יוזמת נוער יצירתית מתוך תיכון החממה בהוד השרון.\nכישרונות צעירים, שירותים אמיתיים.', 'text'),
    ('footer', 'email', 'studio@chamama.org', 'text'),
    ('footer', 'copyright', 'תיכון החממה. כל הזכויות שמורות.', 'text'),
    -- Navbar
    ('navbar', 'title', 'סטודיו דוריאן', 'text'),
    ('navbar', 'logo', '/lovable-uploads/7dd05dcf-56df-4ab1-9241-faba25333bc7.jpg', 'image'),
    -- Services section
    ('services_section', 'title', 'השירותים שלנו', 'text'),
    ('services_section', 'description', 'מגוון שירותים מקצועיים שמוצעים על ידי חניכי החממה', 'text'),
    -- About page
    ('about', 'title', 'אודות סטודיו דוריאן', 'text'),
    ('about', 'subtitle', 'מאחורי הקלעים', 'text'),
    ('about', 'description', 'סטודיו דוריאן הוא יוזמת נוער יצירתית מתוך תיכון החממה בהוד השרון.', 'text'),
    ('about', 'value1_title', 'תשוקה', 'text'),
    ('about', 'value1_desc', 'אנחנו עושים את מה שאנחנו אוהבים ואוהבים את מה שאנחנו עושים', 'text'),
    ('about', 'value2_title', 'אמינות', 'text'),
    ('about', 'value2_desc', 'מחויבות למקצועיות ולאיכות בכל פרויקט', 'text'),
    ('about', 'value3_title', 'מצוינות', 'text'),
    ('about', 'value3_desc', 'שאיפה מתמדת לשיפור ולמקצועיות', 'text'),
    ('about', 'value4_title', 'חדשנות', 'text'),
    ('about', 'value4_desc', 'חשיבה יצירתית ופתרונות מקוריים', 'text'),
    ('about', 'image1', '/lovable-uploads/studio1.jpg', 'image'),
    ('about', 'image2', '/lovable-uploads/studio2.jpg', 'image'),
    ('about', 'image3', '/lovable-uploads/studio3.jpg', 'image'),
    -- Meta
    ('meta', 'title', 'סטודיו דוריאן | כישרונות צעירים, שירותים אמיתיים', 'text'),
    ('meta', 'description', 'יוזמת נוער יצירתית מתוך תיכון החממה בהוד השרון. פורטפוליו חניכים, שירותים מקצועיים ועוד.', 'text')
ON CONFLICT (section, key) DO NOTHING;

-- Grants (required for Supabase RLS to work)
GRANT SELECT ON public.site_content TO anon;
GRANT ALL ON public.site_content TO authenticated;
