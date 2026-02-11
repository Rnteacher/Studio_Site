export interface Category {
  name: string;
  icon: string;
  subTags: string[];
}

export const categories: Category[] = [
  {
    name: "אמנות",
    icon: "🎨",
    subTags: ["סדנאות אמנות", "ציורים בהזמנה", "ציורי קיר", "אנימציה", "עיצוב דמויות", "אומנות קונספט", "סטורי בורד", "ויטראז׳", "תכשיטנות"],
  },
  {
    name: "מוזיקה",
    icon: "🎵",
    subTags: ["נגני אירועים", "נגני סשן", "קומפוזיציה", "כתיבת מוזיקה", "הפקה מוזיקלית", "סאונד והגברה", "שיעורי נגינה", "שירה", "כתיבת שירים"],
  },
  {
    name: "תפירה וסריגה",
    icon: "🧵",
    subTags: ["תפירה", "קרושה", "סריגה", "עיצוב אופנה"],
  },
  {
    name: "צילום",
    icon: "📸",
    subTags: ["צילום סטילס", "צילום וידאו", "צילום אירועים", "מגנטים", "תערוכות"],
  },
  {
    name: "עריכה והפקה",
    icon: "🎬",
    subTags: ["עריכת סרטונים", "הפקת אירועים", "הפקה מוזיקלית", "בניית אולפנים"],
  },
  {
    name: "משחק ודוגמנות",
    icon: "🎭",
    subTags: ["משחק", "דוגמנות", "קריינות", "הנחייה"],
  },
  {
    name: "בישול ואפייה",
    icon: "🍳",
    subTags: ["בישול", "אפייה", "קייטרינג", "סדנאות בישול"],
  },
  {
    name: "מחשבים וטכנולוגיה",
    icon: "💻",
    subTags: ["בניית מחשבים", "ייעוץ חומרה", "תכנאי מחשבים", "סדנאות בניית מחשבים", "בניית סרברי לינוקס", "סרטוני הדרכה", "רובוטיקה", "אלקטרוניקה", "עיצוב תלת מימד"],
  },
  {
    name: "בנייה ונגרות",
    icon: "🔨",
    subTags: ["בניית ריהוט", "בניית כלובים מעץ", "נגרות", "עבודות עץ"],
  },
  {
    name: "ספורט ותנועה",
    icon: "🤸",
    subTags: ["אקרובטיקה אווירית", "קונג פו", "אימוני כוח", "ריקוד"],
  },
  {
    name: "ללא קטגוריה",
    icon: "📌",
    subTags: ["ניהול צוות", "כתיבה יצירתית", "הדרכת סיורים", "איפור", "אופנה", "עיצוב גרפי"],
  },
];
