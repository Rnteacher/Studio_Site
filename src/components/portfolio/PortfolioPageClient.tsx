"use client";

import { useState } from "react";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { LanguageToggle } from "@/components/portfolio/LanguageToggle";
import { StickyContactBar } from "@/components/portfolio/StickyContactBar";
import { resolvePortfolioLang } from "@/lib/resolveLanguage";
import type { Lang } from "@/components/templates/types";
import type { Portfolio, CvSection, ProjectWithMedia } from "@/types/portfolio";

interface Props {
  portfolio: Portfolio;
  student: { name: string; nameEn: string; image: string };
  templateName: string;
  cvSections: CvSection[];
  projects: ProjectWithMedia[];
  email: string;
  phone: string;
  website: string;
  socialLinks: Record<string, string>;
}

export function PortfolioPageClient({
  portfolio,
  student,
  templateName,
  cvSections,
  projects,
  email,
  phone,
  website,
  socialLinks,
}: Props) {
  const [lang, setLang] = useState<Lang>("he");

  const resolved = resolvePortfolioLang(
    lang,
    portfolio,
    student,
    cvSections,
    projects,
    portfolio.customSettings,
  );

  return (
    <>
      <TemplateRenderer
        templateName={templateName}
        student={resolved.student}
        portfolio={portfolio}
        about={resolved.about}
        contact={{ email, phone, website }}
        socialLinks={socialLinks}
        cvSections={resolved.cvSections}
        projects={resolved.projects}
        customization={resolved.customization}
        lang={lang}
      />
      {cvSections.length > 0 && (
        <a
          href={`/api/cv/pdf?portfolioId=${portfolio.id}${lang === "en" ? "&lang=en" : ""}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 md:bottom-6 left-4 z-40 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-full shadow-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          {lang === "en" ? "Download CV" : "הורד קורות חיים"}
        </a>
      )}
      <LanguageToggle lang={lang} onChange={setLang} />
      <StickyContactBar email={email} phone={phone} />
    </>
  );
}
