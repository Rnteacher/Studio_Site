import type { Portfolio, CvSection, CvEntry, ProjectWithMedia } from "@/types/portfolio";
import type { TemplateCustomization, Lang } from "@/components/templates/types";

interface BilingualStudent {
  name: string;
  nameEn: string;
  image: string;
}

interface ResolvedTemplateData {
  student: { name: string; image: string };
  about: { title: string; subtitle: string; body: string };
  cvSections: CvSection[];
  projects: ProjectWithMedia[];
  customization: TemplateCustomization;
}

/** Pick English text, falling back to Hebrew if English is empty */
function en(enVal: string | undefined, heVal: string): string {
  return enVal?.trim() ? enVal : heVal;
}

export function resolvePortfolioLang(
  lang: Lang,
  portfolio: Portfolio,
  student: BilingualStudent,
  cvSections: CvSection[],
  projects: ProjectWithMedia[],
  customization?: TemplateCustomization,
): ResolvedTemplateData {
  if (lang === "he") {
    return {
      student: { name: student.name, image: student.image },
      about: {
        title: portfolio.aboutTitle,
        subtitle: portfolio.aboutSubtitle,
        body: portfolio.aboutBody,
      },
      cvSections,
      projects,
      customization: customization ?? {},
    };
  }

  // English — fall back to Hebrew for empty fields
  const enSections: CvSection[] = cvSections.map((s) => {
    const entries: CvEntry[] = (s.entriesEn?.length ? s.entriesEn : s.entries).map((e, i) => {
      const heEntry = s.entries[i] ?? { title: "" };
      return {
        title: en(e.titleEn ?? e.title, heEntry.title),
        subtitle: en(e.subtitleEn ?? e.subtitle, heEntry.subtitle ?? ""),
        dateRange: e.dateRange ?? heEntry.dateRange,
        description: en(e.descriptionEn ?? e.description, heEntry.description ?? ""),
      };
    });
    return { ...s, title: en(s.titleEn, s.title), entries };
  });

  const enProjects: ProjectWithMedia[] = projects.map((p) => ({
    ...p,
    title: en(p.titleEn, p.title),
    description: en(p.descriptionEn, p.description),
    tags: p.tagsEn?.length ? p.tagsEn : p.tags,
  }));

  // Resolve section labels for English
  const labels = customization?.sectionLabels;
  const enCustomization: TemplateCustomization = {
    ...customization,
    sectionLabels: {
      about: labels?.aboutEn?.trim() || "About",
      projects: labels?.projectsEn?.trim() || "Projects",
      cv: labels?.cvEn?.trim() || "Resume",
      contact: labels?.contactEn?.trim() || "Contact",
    },
  };

  return {
    student: { name: en(student.nameEn, student.name), image: student.image },
    about: {
      title: en(portfolio.aboutTitleEn, portfolio.aboutTitle),
      subtitle: en(portfolio.aboutSubtitleEn, portfolio.aboutSubtitle),
      body: en(portfolio.aboutBodyEn, portfolio.aboutBody),
    },
    cvSections: enSections,
    projects: enProjects,
    customization: enCustomization,
  };
}
