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

-- Color palette (HSL values matching current globals.css)
INSERT INTO site_content (section, key, value, type) VALUES
  ('palette', 'primary', '333 71% 50%', 'color'),
  ('palette', 'secondary', '5 57% 28%', 'color'),
  ('palette', 'accent', '355 100% 97%', 'color'),
  ('palette', 'heading', '320 100% 17%', 'color'),
  ('palette', 'background', '240 4% 95%', 'color')
ON CONFLICT (section, key) DO NOTHING;
