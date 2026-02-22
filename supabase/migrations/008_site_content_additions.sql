-- Additional site content entries for full dynamic control

-- About page icons
INSERT INTO site_content (section, key, value, type) VALUES
  ('about', 'value1_icon', 'Heart', 'icon'),
  ('about', 'value2_icon', 'Shield', 'icon'),
  ('about', 'value3_icon', 'Star', 'icon'),
  ('about', 'value4_icon', 'Rocket', 'icon')
ON CONFLICT (section, key) DO NOTHING;

-- Hero section: all remaining hardcoded text
INSERT INTO site_content (section, key, value, type) VALUES
  ('hero', 'cta_services', 'גלו את השירותים שלנו', 'text'),
  ('hero', 'cta_students', 'החניכים שלנו', 'text'),
  ('hero', 'tagline', 'גיל הוא לא מגבלה — אלא יתרון.', 'text'),
  ('hero', 'mission_line2', 'לבין צרכים של העולם האמיתי.', 'text'),
  ('hero', 'mission_sub', 'אנחנו מציעים שירותים מקצועיים לעמותות ולעסקים קטנים. מתוך רצון ללמוד, להתפתח ולהשפיע.', 'text'),
  ('hero', 'badge1_text', 'עובדים עם קהילה', 'text'),
  ('hero', 'badge2_text', 'לומדים דרך אחריות', 'text'),
  ('hero', 'background_image', '', 'image')
ON CONFLICT (section, key) DO NOTHING;

-- Color palette (hex values matching current globals.css)
INSERT INTO site_content (section, key, value, type) VALUES
  ('palette', 'primary', '#D6336C', 'color'),
  ('palette', 'secondary', '#702A2A', 'color'),
  ('palette', 'accent', '#FFF0F0', 'color'),
  ('palette', 'heading', '#570038', 'color'),
  ('palette', 'background', '#F1F1F2', 'color')
ON CONFLICT (section, key) DO NOTHING;
