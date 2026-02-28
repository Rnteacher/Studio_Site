"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function ArchitectOffice({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
  lang,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont ? `font-${customization.bodyFont}` : 'font-heebo';
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : 'font-karantina';

  const NAV_ITEMS = [
    { id: "about", label: customization?.sectionLabels?.about ?? (lang === "en" ? "About" : "\u05D0\u05D5\u05D3\u05D5\u05EA") },
    { id: "projects", label: customization?.sectionLabels?.projects ?? (lang === "en" ? "Projects" : "\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD") },
    { id: "cv", label: customization?.sectionLabels?.cv ?? (lang === "en" ? "CV" : "\u05E7\u05D5\u05E8\u05D5\u05EA \u05D7\u05D9\u05D9\u05DD") },
    { id: "contact", label: customization?.sectionLabels?.contact ?? (lang === "en" ? "Contact" : "\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8") },
  ];

  const sectionNumber = (n: number) =>
    `${String(n).padStart(2, "0")}.`;

  return (
    <div
      className={`min-h-screen ${bodyFont} scroll-smooth`}
      dir={lang === "en" ? "ltr" : "rtl"}
      style={{
        '--t-primary': customization?.colors?.primary ?? '#2c3e50',
        '--t-accent': customization?.colors?.accent ?? '#e67e22',
        '--t-bg': customization?.colors?.bg ?? '#ecf0f1',
        '--t-text': customization?.colors?.text ?? '#2c3e50',
        backgroundColor: 'var(--t-bg)',
        color: 'var(--t-text)',
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(44,62,80,0.06) 39px, rgba(44,62,80,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(44,62,80,0.06) 39px, rgba(44,62,80,0.06) 40px)',
      } as React.CSSProperties}
    >
      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm border-b" style={{ backgroundColor: 'color-mix(in srgb, var(--t-bg) 92%, transparent)', borderColor: 'color-mix(in srgb, var(--t-primary) 15%, transparent)' }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span
            className="text-sm font-bold tracking-[0.2em] uppercase"
            style={{ color: 'var(--t-primary)' }}
          >
            {student.name}
          </span>
          <div className="w-px h-5 mx-4 hidden md:block" style={{ backgroundColor: 'color-mix(in srgb, var(--t-primary) 20%, transparent)' }} />
          <div className="flex items-center gap-6 md:gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs tracking-[0.15em] uppercase transition-colors"
                style={{ color: 'color-mix(in srgb, var(--t-primary) 45%, transparent)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--t-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'color-mix(in srgb, var(--t-primary) 45%, transparent)')}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="max-w-5xl mx-auto px-6 py-24 md:py-36">
        <h1
          className={`text-6xl md:text-8xl ${headingFont} font-bold uppercase tracking-wide leading-none`}
          style={{ color: 'var(--t-primary)' }}
        >
          {student.name}
        </h1>
        <div className="h-px w-24 mt-6 mb-4" style={{ backgroundColor: 'var(--t-accent)' }} />
        {about.subtitle && (
          <p
            className="text-lg md:text-xl italic font-light lowercase"
            style={{ color: 'color-mix(in srgb, var(--t-primary) 55%, transparent)' }}
          >
            {about.subtitle}
          </p>
        )}
      </header>

      <div className="max-w-5xl mx-auto px-6">
        {/* ── 01. About ── */}
        {about.body && (
          <section id="about" className="py-16 scroll-mt-16">
            <div className="flex items-center gap-3 mb-8">
              <span
                className={`text-sm ${headingFont} tracking-wider`}
                style={{ color: 'var(--t-accent)' }}
              >
                {sectionNumber(1)}
              </span>
              <h2
                className={`text-2xl md:text-3xl ${headingFont} font-bold uppercase tracking-wider`}
                style={{ color: 'var(--t-primary)' }}
              >
                {customization?.sectionLabels?.about ?? (lang === "en" ? "About" : "\u05D0\u05D5\u05D3\u05D5\u05EA")}
              </h2>
              <div className="flex-1 h-px" style={{ backgroundColor: 'color-mix(in srgb, var(--t-primary) 12%, transparent)' }} />
            </div>
            <div
              className="border-b pb-8"
              style={{ borderColor: 'color-mix(in srgb, var(--t-primary) 10%, transparent)' }}
            >
              <p className="leading-[2] whitespace-pre-line text-base md:text-lg" style={{ color: 'color-mix(in srgb, var(--t-text) 75%, transparent)' }}>
                {about.body}
              </p>
            </div>
          </section>
        )}

        {/* ── 02. Projects ── */}
        {projects.length > 0 && (
          <section id="projects" className="py-16 scroll-mt-16">
            <div className="flex items-center gap-3 mb-12">
              <span
                className={`text-sm ${headingFont} tracking-wider`}
                style={{ color: 'var(--t-accent)' }}
              >
                {sectionNumber(2)}
              </span>
              <h2
                className={`text-2xl md:text-3xl ${headingFont} font-bold uppercase tracking-wider`}
                style={{ color: 'var(--t-primary)' }}
              >
                {customization?.sectionLabels?.projects ?? (lang === "en" ? "Projects" : "\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD")}
              </h2>
              <div className="flex-1 h-px" style={{ backgroundColor: 'color-mix(in srgb, var(--t-primary) 12%, transparent)' }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="group border transition-colors"
                  style={{
                    borderColor: 'color-mix(in srgb, var(--t-primary) 12%, transparent)',
                    backgroundColor: 'color-mix(in srgb, var(--t-bg) 60%, white)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--t-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--t-primary) 12%, transparent)')}
                >
                  {/* Project thumbnail */}
                  {project.thumbnailUrl && (
                    <div className="overflow-hidden">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full aspect-[16/10] object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  )}

                  <div className="p-5 md:p-6">
                    {/* Project number + title */}
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-xs ${headingFont} tracking-wider mt-1 shrink-0`}
                        style={{ color: 'var(--t-accent)' }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={`text-lg md:text-xl ${headingFont} font-bold uppercase tracking-wide`}
                        style={{ color: 'var(--t-primary)' }}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {project.description && (
                      <p
                        className="text-sm mt-3 leading-relaxed line-clamp-3"
                        style={{ color: 'color-mix(in srgb, var(--t-text) 60%, transparent)' }}
                      >
                        {project.description}
                      </p>
                    )}

                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase tracking-[0.1em] border px-2.5 py-0.5"
                            style={{
                              borderColor: 'color-mix(in srgb, var(--t-primary) 15%, transparent)',
                              color: 'color-mix(in srgb, var(--t-text) 50%, transparent)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.media.length > 0 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto">
                        {project.media.slice(0, 4).map((m) => (
                          <a
                            key={m.id}
                            href={m.webViewUrl ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0"
                          >
                            {m.thumbnailUrl ? (
                              <img
                                src={m.thumbnailUrl}
                                alt={m.fileName}
                                className="w-16 h-16 object-cover border grayscale hover:grayscale-0 transition-all duration-300"
                                style={{ borderColor: 'color-mix(in srgb, var(--t-primary) 12%, transparent)' }}
                              />
                            ) : (
                              <div
                                className="w-16 h-16 border flex items-center justify-center text-[8px]"
                                style={{
                                  borderColor: 'color-mix(in srgb, var(--t-primary) 12%, transparent)',
                                  color: 'color-mix(in srgb, var(--t-text) 35%, transparent)',
                                }}
                              >
                                {m.fileName}
                              </div>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 03. CV ── */}
        {cvSections.length > 0 && (
          <section id="cv" className="py-16 scroll-mt-16">
            <div className="flex items-center gap-3 mb-12">
              <span
                className={`text-sm ${headingFont} tracking-wider`}
                style={{ color: 'var(--t-accent)' }}
              >
                {sectionNumber(3)}
              </span>
              <h2
                className={`text-2xl md:text-3xl ${headingFont} font-bold uppercase tracking-wider`}
                style={{ color: 'var(--t-primary)' }}
              >
                {customization?.sectionLabels?.cv ?? (lang === "en" ? "CV" : "\u05E7\u05D5\u05E8\u05D5\u05EA \u05D7\u05D9\u05D9\u05DD")}
              </h2>
              <div className="flex-1 h-px" style={{ backgroundColor: 'color-mix(in srgb, var(--t-primary) 12%, transparent)' }} />
            </div>

            <div className="space-y-10">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3
                    className={`text-base ${headingFont} font-bold uppercase tracking-[0.15em] mb-5 pb-2 border-b`}
                    style={{
                      color: 'var(--t-primary)',
                      borderColor: 'color-mix(in srgb, var(--t-accent) 40%, transparent)',
                    }}
                  >
                    {section.title}
                  </h3>
                  <div className="space-y-0">
                    {section.entries.map((entry, i) => (
                      <div
                        key={i}
                        className="flex border-b py-4"
                        style={{ borderColor: 'color-mix(in srgb, var(--t-primary) 8%, transparent)' }}
                      >
                        {/* Date column */}
                        {entry.dateRange && (
                          <div
                            className="w-28 md:w-36 shrink-0 pe-4 border-e"
                            style={{ borderColor: 'color-mix(in srgb, var(--t-primary) 12%, transparent)' }}
                          >
                            <span
                              className="text-xs tracking-wide"
                              style={{ color: 'color-mix(in srgb, var(--t-text) 40%, transparent)' }}
                            >
                              {entry.dateRange}
                            </span>
                          </div>
                        )}
                        {/* Details column */}
                        <div className="flex-1 ps-4">
                          <p className="text-sm font-semibold" style={{ color: 'var(--t-primary)' }}>
                            {entry.title}
                          </p>
                          {entry.subtitle && (
                            <p
                              className="text-xs mt-0.5"
                              style={{ color: 'color-mix(in srgb, var(--t-text) 45%, transparent)' }}
                            >
                              {entry.subtitle}
                            </p>
                          )}
                          {entry.description && (
                            <p
                              className="text-xs mt-1.5 leading-relaxed"
                              style={{ color: 'color-mix(in srgb, var(--t-text) 55%, transparent)' }}
                            >
                              {entry.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 04. Contact ── */}
        <footer id="contact" className="py-16 scroll-mt-16">
          <div className="flex items-center gap-3 mb-10">
            <span
              className={`text-sm ${headingFont} tracking-wider`}
              style={{ color: 'var(--t-accent)' }}
            >
              {sectionNumber(4)}
            </span>
            <h2
              className={`text-2xl md:text-3xl ${headingFont} font-bold uppercase tracking-wider`}
              style={{ color: 'var(--t-primary)' }}
            >
              {customization?.sectionLabels?.contact ?? (lang === "en" ? "Contact" : "\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8")}
            </h2>
            <div className="flex-1 h-px" style={{ backgroundColor: 'color-mix(in srgb, var(--t-primary) 12%, transparent)' }} />
          </div>

          <div
            className="border p-6 md:p-8 inline-block"
            style={{
              borderColor: 'color-mix(in srgb, var(--t-primary) 12%, transparent)',
              backgroundColor: 'color-mix(in srgb, var(--t-bg) 60%, white)',
            }}
          >
            <div className="flex flex-col gap-4 text-sm">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 transition-colors"
                  style={{ color: 'color-mix(in srgb, var(--t-text) 60%, transparent)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--t-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'color-mix(in srgb, var(--t-text) 60%, transparent)')}
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 transition-colors"
                  style={{ color: 'color-mix(in srgb, var(--t-text) 60%, transparent)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--t-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'color-mix(in srgb, var(--t-text) 60%, transparent)')}
                >
                  <Phone className="h-4 w-4" />
                  {contact.phone}
                </a>
              )}
              {contact.website && (
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors"
                  style={{ color: 'color-mix(in srgb, var(--t-text) 60%, transparent)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--t-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'color-mix(in srgb, var(--t-text) 60%, transparent)')}
                >
                  <Globe className="h-4 w-4" />
                  {lang === "en" ? "Website" : "\u05D0\u05EA\u05E8"}
                </a>
              )}
            </div>
          </div>

          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-4 mt-8">
              {Object.entries(socialLinks)
                .filter(([, v]) => v)
                .map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-wide uppercase flex items-center gap-1.5 transition-colors"
                    style={{ color: 'color-mix(in srgb, var(--t-text) 40%, transparent)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--t-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'color-mix(in srgb, var(--t-text) 40%, transparent)')}
                  >
                    <ExternalLink className="h-3 w-3" />
                    {key}
                  </a>
                ))}
            </div>
          )}

          <div
            className="mt-16 pt-4 border-t"
            style={{ borderColor: 'color-mix(in srgb, var(--t-primary) 10%, transparent)' }}
          >
            <p
              className="text-xs text-center tracking-[0.15em] uppercase"
              style={{ color: 'color-mix(in srgb, var(--t-text) 25%, transparent)' }}
            >
              {student.name} &copy; {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
