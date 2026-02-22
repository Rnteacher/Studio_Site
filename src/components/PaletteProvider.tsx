"use client";

import { useEffect } from "react";
import { useSiteContent } from "@/hooks/useSiteContent";

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
    for (const [key, value] of Object.entries(vars)) {
      if (value) root.style.setProperty(key, value);
    }
    return () => {
      for (const key of Object.keys(vars)) {
        root.style.removeProperty(key);
      }
    };
  }, [palette]);

  return <>{children}</>;
}
