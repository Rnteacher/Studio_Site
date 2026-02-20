export interface Template {
  id: string;
  name: string;
  label: string;
  category: "classic" | "modern" | "experimental";
  thumbnailUrl: string;
  description: string;
  createdAt: string;
}

export interface Portfolio {
  id: string;
  studentId: string;
  userId: string;
  templateId: string | null;
  slug: string | null;
  status: "draft" | "published";
  aboutTitle: string;
  aboutBody: string;
  aboutSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  contactWebsite: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CvEntry {
  title: string;
  subtitle?: string;
  dateRange?: string;
  description?: string;
}

export interface CvSection {
  id: string;
  portfolioId: string;
  sectionType: "education" | "experience" | "skills" | "awards" | "custom";
  title: string;
  entries: CvEntry[];
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  portfolioId: string;
  title: string;
  description: string;
  tags: string[];
  driveFolderUrl: string | null;
  thumbnailUrl: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectMedia {
  id: string;
  projectId: string;
  driveFileId: string | null;
  fileName: string;
  mimeType: string;
  thumbnailUrl: string | null;
  webViewUrl: string | null;
  sortOrder: number;
}

export interface ProjectWithMedia extends Project {
  media: ProjectMedia[];
}

export interface PortfolioFull {
  portfolio: Portfolio;
  template: Template | null;
  cvSections: CvSection[];
  projects: ProjectWithMedia[];
}
