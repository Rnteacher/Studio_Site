"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Heart, Shield, Star, Rocket, Zap, Award, Target, Lightbulb,
  Users, Handshake, Sparkles, Crown, Trophy, Flame, Eye, Compass,
  Leaf, Sun, Music, Camera, Palette, Brain, BookOpen, GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart, Shield, Star, Rocket, Zap, Award, Target, Lightbulb,
  Users, Handshake, Sparkles, Crown, Trophy, Flame, Eye, Compass,
  Leaf, Sun, Music, Camera, Palette, Brain, BookOpen, GraduationCap,
};

const DEFAULT_ICONS = ["Heart", "Shield", "Star", "Rocket"];

export default function AboutPage() {
  const { data: content } = useSiteContent();
  const about = content?.about ?? {};

  const values = [
    { icon: ICON_MAP[about.value1_icon ?? DEFAULT_ICONS[0]] ?? Heart, title: about.value1_title ?? "קהילה", description: about.value1_desc ?? "אנחנו מאמינים בכוח של קהילה ותמיכה הדדית" },
    { icon: ICON_MAP[about.value2_icon ?? DEFAULT_ICONS[1]] ?? Shield, title: about.value2_title ?? "אחריות", description: about.value2_desc ?? "לוקחים אחריות על כל פרויקט ומחויבים לאיכות" },
    { icon: ICON_MAP[about.value3_icon ?? DEFAULT_ICONS[2]] ?? Star, title: about.value3_title ?? "מקצועיות", description: about.value3_desc ?? "עובדים ברמה מקצועית גבוהה למרות הגיל הצעיר" },
    { icon: ICON_MAP[about.value4_icon ?? DEFAULT_ICONS[3]] ?? Rocket, title: about.value4_title ?? "יזמות צעירה", description: about.value4_desc ?? "מפתחים כישורים עסקיים ויצירתיים מגיל צעיר" },
  ];

  const images = [
    about.image1 ?? "/images/behind-1.jpg",
    about.image2 ?? "/images/behind-2.jpg",
    about.image3 ?? "/images/behind-3.jpg",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h1 className="font-rubik text-4xl md:text-5xl font-extrabold text-heading mb-6">
              מי אנחנו?
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {about.description ?? (
                <>
                  סטודיו דוריאן הוא יוזמת נוער יצירתית שנולדה מתוך תיכון{" "}
                  <strong className="text-foreground">&quot;החממה&quot;</strong> בהוד השרון. אנחנו קבוצה של
                  חניכים מוכשרים שמציעים שירותים יצירתיים וטכניים לעמותות ולעסקים קטנים — בהתנדבות
                  או בתשלום סמלי.
                </>
              )}
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-soft-bg/40">
          <div className="container mx-auto px-4">
            <h2 className="font-rubik text-3xl font-bold text-heading text-center mb-12">
              הערכים שלנו
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card rounded-2xl p-6 shadow-sm text-center hover-scale"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-rubik text-lg font-bold text-heading mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Behind the scenes */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="font-rubik text-3xl font-bold text-heading text-center mb-10">
              {about.subtitle ?? "מאחורי הקלעים"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`מאחורי הקלעים ${i + 1}`}
                  className="aspect-[4/3] rounded-2xl object-cover w-full"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
