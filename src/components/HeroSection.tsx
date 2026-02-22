"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Palette, Music, Camera, Wrench } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const HeroSection = () => {
  const { data: content } = useSiteContent();
  const hero = content?.hero ?? {};

  const title = hero.title ?? "סטודיו דוריאן";

  return (
    <section
      className="relative overflow-hidden py-20 md:py-32"
      style={hero.background_image ? { backgroundImage: `url(${hero.background_image})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      {hero.background_image && <div className="absolute inset-0 bg-background/80" />}

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 select-none">🎨</div>
      <div className="absolute top-20 right-20 text-5xl opacity-10 select-none">🎵</div>
      <div className="absolute bottom-10 left-1/4 text-4xl opacity-10 select-none">📸</div>
      <div className="absolute bottom-20 right-1/3 text-5xl opacity-10 select-none">🧵</div>

      {/* Floating decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 flex items-center justify-center overflow-hidden">
        <img src="/images/durian-logo.jpeg" alt="סטודיו דוריאן" className="w-40 h-40 object-contain mix-blend-multiply opacity-30" />
      </div>
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-secondary/30" />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Creative icons row */}
        <div className="flex justify-center gap-4 mb-8 opacity-60">
          <Palette className="h-6 w-6 text-primary" />
          <Music className="h-6 w-6 text-heading" />
          <Camera className="h-6 w-6 text-primary" />
          <Wrench className="h-6 w-6 text-heading" />
        </div>

        <img alt={title} className="h-36 md:h-48 w-auto mx-auto mb-6 mix-blend-multiply" src="/lovable-uploads/26cde093-9e8f-43ac-b26a-eb2b64ea0e5e.png" />
        <h1 className="font-rubik text-5xl md:text-7xl font-extrabold text-heading mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {hero.subtitle ?? "כישרונות צעירים. שירותים אמיתיים. השפעה אמיתית."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
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

          <div className="relative z-10 p-8 md:p-10 text-foreground">
            <p className="text-xl md:text-2xl font-extrabold leading-snug mb-3 tracking-tight text-heading">
              {hero.mission ?? "סטודיו דוריאן מחבר בין יכולות של נוער"}
              <br />
              <span className="text-primary">{hero.mission_line2 ?? "לבין צרכים של העולם האמיתי."}</span>
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-6 max-w-xl mx-auto text-center">
              {hero.mission_sub ?? "אנחנו מציעים שירותים מקצועיים לעמותות ולעסקים קטנים. מתוך רצון ללמוד, להתפתח ולהשפיע."}
            </p>
            <div className="flex flex-wrap gap-2 mb-5 justify-center">
              <span className="bg-soft-bg/60 px-4 py-1 rounded-sm text-xs font-bold uppercase tracking-widest border-r-2 border-primary text-heading">{hero.badge1_text ?? "עובדים עם קהילה"}</span>
              <span className="bg-soft-bg/60 px-4 py-1 rounded-sm text-xs font-bold uppercase tracking-widest border-r-2 border-primary text-heading">{hero.badge2_text ?? "לומדים דרך אחריות"}</span>
            </div>
            <p className="text-lg md:text-xl font-black text-primary italic">
              {hero.tagline ?? "גיל הוא לא מגבלה — אלא יתרון."}
            </p>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;
