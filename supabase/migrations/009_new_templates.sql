-- Migration: Add 11 new portfolio templates

INSERT INTO public.templates (name, label, category, description) VALUES
    ('sidebar-dark',       'צד כהה אלגנטי',       'classic',       'עיצוב כהה עם sidebar בגוון פחם ואקסנטים של אמרלד'),
    ('sidebar-creative',   'צד יצירתי',           'artistic',      'עיצוב sidebar עם צבעים נועזים, אלמנטים א-סימטריים ואווירה אמנותית'),
    ('sidebar-playful',    'צד שובב',             'experimental',  'עיצוב sidebar צבעוני ועליז עם פינות מעוגלות ואווירה חברותית'),
    ('newspaper-vintage',  'עיתון וינטג׳',        'artistic',      'עיצוב בסגנון עיתון ישן עם עמודות, טיפוגרפיה סריפית וגוונים חומים'),
    ('social-feed',        'פיד חברתי',           'modern',        'עיצוב בהשראת אינסטגרם עם כרטיסי פוסטים, פרופיל מרכזי ואסתטיקה חברתית'),
    ('chat-bubbles',       'בועות צ׳אט',          'experimental',  'עיצוב בהשראת WhatsApp עם בועות הודעה, זמנים וקריאה'),
    ('restaurant-menu',    'תפריט מסעדה',         'artistic',      'עיצוב בסגנון תפריט מסעדה אלגנטי עם טיפוגרפיה עשירה וגוונים חמים'),
    ('maker-workshop',     'סדנת יוצרים',         'artistic',      'עיצוב בהשראת סדנה עם אסתטיקה של עץ ומתכת ותחושה יצירתית'),
    ('stage-screen',       'במה ומסך',            'artistic',      'עיצוב בהשראת תיאטרון וקולנוע עם אפקטי ספוטלייט ואווירה דרמטית'),
    ('tech-startup',       'סטארטאפ טכנולוגי',     'modern',        'עיצוב מקצועי בהשראת סטארטאפ עם כרטיסי זכוכית ומראה dashboard'),
    ('academic-science',   'אקדמי מדעי',          'modern',        'עיצוב מדעי ואקדמי עם רקע גריד, טיפוגרפיה מדויקת וצבעים ניטרליים')
ON CONFLICT (name) DO NOTHING;
