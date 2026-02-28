-- Migration: Add batch 4 templates (10 new portfolio templates, total 40)

INSERT INTO public.templates (name, label, category, description) VALUES
    ('brush-strokes',    'משיכות מכחול',       'artistic',      'עיצוב בהשראת צבעי מים עם משיכות מכחול כרקע ומפרידים'),
    ('polaroid-photos',  'תמונות פולורויד',     'artistic',      'כרטיסי פולרויד מפוזרים עם כיתובים בכתב יד'),
    ('colorful-chaos',   'צבעוני מופרע',        'experimental',  'שינויי צבע פרועים, גרדיאנטים מונפשים ואלמנטים קופצניים'),
    ('news-modern',      'חדשות מודרני',        'modern',        'עיצוב בסגנון אתר חדשות מודרני עם פס מהדורה, רשת כתבות וקטגוריות'),
    ('architect-office',  'משרד אדריכלי',       'modern',        'עיצוב בהשראת שרטוט אדריכלי עם גריד, קווים דקיקים ומינימליזם'),
    ('woodwork-craft',   'עבודת עץ',           'artistic',      'טקסטורות עץ, גוונים חמים וארציים ותחושה של עבודת יד'),
    ('childish-art',     'אומנותי ילדותי',      'experimental',  'סגנון צבעי פנדה, צורות משחקיות ומסגרות מצוירות ביד'),
    ('max-chaos',        'הכי מופרע שיש',      'experimental',  'כותרות הפוכות, סיבובים אקראיים, אנימציות פרועות ואי-סדר מוחלט'),
    ('tech-glitch',      'טכנולוגי מופרע',      'experimental',  'אפקטי גליץ׳, קווי סריקה, כותרות זזות ואסתטיקה סייברפאנקית'),
    ('facebook-style',   'סגנון פייסבוק',       'modern',        'עיצוב בהשראת פייסבוק עם תמונת קאבר, כרטיסי פוסט ותגובות')
ON CONFLICT (name) DO NOTHING;
