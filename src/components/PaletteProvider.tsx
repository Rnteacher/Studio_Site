"use client";

import { useEffect } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

/** Convert hex (#D6336C) to Tailwind HSL format (333 71% 50%) */
function hexToHsl(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const { data: content } = useSiteContent();
  const palette = content?.palette;

  useEffect(() => {
    if (!palette) return;
    const root = document.documentElement;
    const vars: Record<string, string> = {
      "--primary": palette.primary,
      "--secondary": palette.secondary,
      "--accent": palette.accent,
      "--heading": palette.heading,
      "--background": palette.background,
    };
    const setKeys: string[] = [];
    for (const [key, value] of Object.entries(vars)) {
      if (!value) continue;
      // If value looks like hex, convert to HSL for Tailwind
      const hsl = value.startsWith("#") ? hexToHsl(value) : value;
      if (hsl) {
        root.style.setProperty(key, hsl);
        setKeys.push(key);
      }
    }
    return () => {
      for (const key of setKeys) {
        root.style.removeProperty(key);
      }
    };
  }, [palette]);

  return <>{children}</>;
}
