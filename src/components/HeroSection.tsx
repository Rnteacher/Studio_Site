import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Palette, Music, Camera, Wrench } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
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

        <img alt="סטודיו דוריאן" className="h-36 md:h-48 w-auto mx-auto mb-6 mix-blend-multiply" src="/lovable-uploads/26cde093-9e8f-43ac-b26a-eb2b64ea0e5e.png" />
        <h1 className="font-rubik text-5xl md:text-7xl font-extrabold text-heading mb-6 leading-tight">
          סטודיו דוריאן
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          כישרונות צעירים. שירותים אמיתיים. השפעה אמיתית.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button asChild size="lg" className="text-lg px-8 bg-primary hover:bg-heading">
            <a href="#services">גלו את השירותים שלנו</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-lg px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/students">החניכים שלנו</Link>
          </Button>
        </div>

        {/* Mission statement */}
        <div className="max-w-2xl mx-auto text-right space-y-6">
          <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
            סטודיו דוריאן מחבר בין יכולות של נוער לבין צרכים של העולם האמיתי.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            אנחנו מציעים שירותים מקצועיים לעמותות ולעסקים קטנים – מתוך רצון ללמוד, להתפתח ולהשפיע.
          </p>
          <div className="flex flex-col gap-2 pr-4 border-r-4 border-primary/40">
            <p className="text-base text-foreground font-medium">אנחנו עובדים עם קהילה.</p>
            <p className="text-base text-foreground font-medium">אנחנו לומדים דרך אחריות.</p>
          </div>
          <p className="text-base md:text-lg text-heading font-bold">
            ואנחנו מאמינים שגיל הוא לא מגבלה – אלא יתרון.
          </p>
        </div>
      </div>
    </section>);

};

export default HeroSection;