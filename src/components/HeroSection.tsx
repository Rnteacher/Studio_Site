"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import InteractiveBackground from "./InteractiveBackground";

const HeroSection = () => {
  const { data: content } = useSiteContent();
  const hero = content?.hero ?? {};

  const title = hero.title ?? "סטודיו דוריאן";
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[calc(100svh-4.25rem)] items-center overflow-hidden py-6 md:py-8">
      <InteractiveBackground />

      <div className="container mx-auto px-4 pb-10 text-center relative z-10">
        <h1 className="font-rubik text-5xl md:text-7xl font-extrabold text-heading mb-4 md:mb-5 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-7 leading-relaxed">
          {hero.subtitle ?? "כישרונות צעירים. שירותים אמיתיים. השפעה אמיתית."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 md:mb-10">
          <Button asChild size="lg" className="text-lg px-8 bg-primary hover:bg-heading">
            <a href="#services">{hero.cta_services ?? "גלו את השירותים שלנו"}</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="/students">{hero.cta_students ?? "החניכים שלנו"}</Link>
          </Button>
        </div>

        {/* Mission banner */}
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute inset-0 bg-heading/10 rounded-2xl rotate-1 scale-[1.02]" />
          <div className="absolute inset-0 bg-card rounded-2xl -rotate-[0.5deg] border border-border" />

          <div className="relative z-10 p-6 md:p-7 text-foreground">
            <p className="text-xl md:text-2xl font-extrabold leading-snug mb-2 tracking-tight text-heading">
              {hero.mission ?? "סטודיו דוריאן מחבר בין יכולות של נוער"}
              <br />
              <span className="text-primary">{hero.mission_line2 ?? "לבין צרכים של העולם האמיתי."}</span>
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-4 max-w-xl mx-auto text-center">
              {hero.mission_sub ?? "אנחנו מציעים שירותים מקצועיים לעמותות ולעסקים קטנים. מתוך רצון ללמוד, להתפתח ולהשפיע."}
            </p>
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              <span className="bg-soft-bg/60 px-4 py-1 rounded-sm text-xs font-bold uppercase tracking-widest border-r-2 border-primary text-heading">{hero.badge1_text ?? "עובדים עם קהילה"}</span>
              <span className="bg-soft-bg/60 px-4 py-1 rounded-sm text-xs font-bold uppercase tracking-widest border-r-2 border-primary text-heading">{hero.badge2_text ?? "לומדים דרך אחריות"}</span>
            </div>
            <p className="text-lg md:text-xl font-black text-primary italic">
              {hero.tagline ?? "גיל הוא לא מגבלה — אלא יתרון."}
            </p>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={scrollToServices}
        aria-label="גללו לשירותים שלנו"
        className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-primary/30 bg-card/70 p-2.5 text-primary shadow-sm backdrop-blur-sm transition hover:-translate-x-1/2 hover:-translate-y-1 hover:border-primary/60 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:bottom-5"
      >
        <ChevronDown className="h-6 w-6" aria-hidden="true" />
      </button>
    </section>);

};

export default HeroSection;
