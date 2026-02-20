import type { Portfolio, CvSection, ProjectWithMedia } from "@/types/portfolio";

export interface TemplateProps {
  student: {
    name: string;
    image: string;
  };
  portfolio: Portfolio;
  about: {
    title: string;
    subtitle: string;
    body: string;
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
