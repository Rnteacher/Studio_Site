"use client";

import type { Lang } from "@/components/templates/types";

interface LanguageToggleProps {
  lang: Lang;
  onChange: (lang: Lang) => void;
}

export function LanguageToggle({ lang, onChange }: LanguageToggleProps) {
  return (
    <button
      onClick={() => onChange(lang === "he" ? "en" : "he")}
      className="fixed bottom-20 md:bottom-6 right-4 z-50 flex items-center gap-0.5 rounded-full shadow-lg border bg-background/95 backdrop-blur-sm text-sm font-medium overflow-hidden select-none"
      aria-label="Switch language"
    >
      <span
        className={`px-3 py-2 transition-colors ${
          lang === "he"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        עב
      </span>
      <span
        className={`px-3 py-2 transition-colors ${
          lang === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </span>
    </button>
  );
}
