import type { Portfolio, CvSection, ProjectWithMedia } from "@/types/portfolio";

export interface TemplateProps {
  portfolio: Portfolio;
  about: {
    title: string;
    body: string;
    imageUrl: string;
  };
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  socialLinks: Record<string, string>;
  cvSections: CvSection[];
  projects: ProjectWithMedia[];
  isPreview?: boolean;
}
