import type { Portfolio, CvSection, ProjectWithMedia } from "@/types/portfolio";

export type Lang = "he" | "en";

export interface TemplateCustomization {
  colors?: {
    primary?: string;
    accent?: string;
    bg?: string;
    text?: string;
  };
  bodyFont?: string;
  headingFont?: string;
  sectionLabels?: {
    about?: string;
    projects?: string;
    cv?: string;
    contact?: string;
    aboutEn?: string;
    projectsEn?: string;
    cvEn?: string;
    contactEn?: string;
  };
}

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
  customization?: TemplateCustomization;
  lang?: Lang;
}
