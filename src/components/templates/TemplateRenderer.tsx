"use client";

import dynamic from "next/dynamic";
import type { TemplateProps } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

const templates: Record<string, React.ComponentType<TemplateProps>> = {
  "classic-clean": dynamic(() => import("./classic-clean"), {
    loading: () => <Skeleton className="h-[600px] w-full" />,
  }),
  "classic-elegant": dynamic(() => import("./classic-elegant"), {
    loading: () => <Skeleton className="h-[600px] w-full" />,
  }),
  "modern-bold": dynamic(() => import("./modern-bold"), {
    loading: () => <Skeleton className="h-[600px] w-full" />,
  }),
  "modern-minimal": dynamic(() => import("./modern-minimal"), {
    loading: () => <Skeleton className="h-[600px] w-full" />,
  }),
  "experimental-creative": dynamic(() => import("./experimental-creative"), {
    loading: () => <Skeleton className="h-[600px] w-full" />,
  }),
  "experimental-avant-garde": dynamic(() => import("./experimental-avant-garde"), {
    loading: () => <Skeleton className="h-[600px] w-full" />,
  }),
};

interface RendererProps extends TemplateProps {
  templateName: string;
}

export function TemplateRenderer({ templateName, ...props }: RendererProps) {
  const Component = templates[templateName] ?? templates["classic-clean"];
  return <Component {...props} />;
}
