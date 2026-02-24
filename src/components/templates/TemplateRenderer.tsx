"use client";

import dynamic from "next/dynamic";
import type { TemplateProps } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => <Skeleton className="h-[600px] w-full" />;

const templates: Record<string, React.ComponentType<TemplateProps>> = {
  // Existing (kept)
  "classic-elegant": dynamic(() => import("./classic-elegant"), { loading }),
  "classic-serif": dynamic(() => import("./classic-serif"), { loading }),
  "modern-bold": dynamic(() => import("./modern-bold"), { loading }),
  "modern-minimal": dynamic(() => import("./modern-minimal"), { loading }),
  "modern-gradient": dynamic(() => import("./modern-gradient"), { loading }),
  "modern-dark": dynamic(() => import("./modern-dark"), { loading }),
  "experimental-creative": dynamic(() => import("./experimental-creative"), { loading }),
  "experimental-avant-garde": dynamic(() => import("./experimental-avant-garde"), { loading }),
  "experimental-retro": dynamic(() => import("./experimental-retro"), { loading }),
  // New templates
  "nature-organic": dynamic(() => import("./nature-organic"), { loading }),
  "tech-terminal": dynamic(() => import("./tech-terminal"), { loading }),
  "pastel-dreamy": dynamic(() => import("./pastel-dreamy"), { loading }),
  "brutalist-raw": dynamic(() => import("./brutalist-raw"), { loading }),
  "neon-glow": dynamic(() => import("./neon-glow"), { loading }),
  "paper-craft": dynamic(() => import("./paper-craft"), { loading }),
  "geometric-sharp": dynamic(() => import("./geometric-sharp"), { loading }),
  "watercolor-soft": dynamic(() => import("./watercolor-soft"), { loading }),
  "monochrome-photo": dynamic(() => import("./monochrome-photo"), { loading }),
  "playful-pop": dynamic(() => import("./playful-pop"), { loading }),
  // Batch 3: 11 new templates
  "sidebar-dark": dynamic(() => import("./sidebar-dark"), { loading }),
  "sidebar-creative": dynamic(() => import("./sidebar-creative"), { loading }),
  "sidebar-playful": dynamic(() => import("./sidebar-playful"), { loading }),
  "newspaper-vintage": dynamic(() => import("./newspaper-vintage"), { loading }),
  "social-feed": dynamic(() => import("./social-feed"), { loading }),
  "chat-bubbles": dynamic(() => import("./chat-bubbles"), { loading }),
  "restaurant-menu": dynamic(() => import("./restaurant-menu"), { loading }),
  "maker-workshop": dynamic(() => import("./maker-workshop"), { loading }),
  "stage-screen": dynamic(() => import("./stage-screen"), { loading }),
  "tech-startup": dynamic(() => import("./tech-startup"), { loading }),
  "academic-science": dynamic(() => import("./academic-science"), { loading }),
};

interface RendererProps extends TemplateProps {
  templateName: string;
}

export function TemplateRenderer({ templateName, ...props }: RendererProps) {
  const Component = templates[templateName] ?? templates["classic-elegant"];
  return <Component {...props} />;
}
