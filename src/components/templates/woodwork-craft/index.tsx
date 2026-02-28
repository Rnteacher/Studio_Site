"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

/* Small decorative "nail" dot used at card corners */
const Nail = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute w-2 h-2 rounded-full bg-[#3e2723]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] ${className}`}
  />
);

/* Horizontal wood-grain divider */
const GrainDivider = () => (
  <div className="flex items-center gap-3 my-10">
    <div className="h-px flex-1 bg-[#8b5e3c]/20" />
    <div className="flex gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full bg-[#8b5e3c]/40" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#8b5e3c]/30" />
      <div className="w-1.5 h-1.5 rounded-full bg-[#8b5e3c]/40" />
    </div>
    <div className="h-px flex-1 bg-[#8b5e3c]/20" />
  </div>
);

export default function WoodworkCraft({
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
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : 'font-amatic-sc';

  return (
    <div
      className={`min-h-screen bg-[#f5e6d3] text-[#3e2723] ${bodyFont} scroll-smooth`}
      dir={lang === "en" ? "ltr" : "rtl"}
      style={{
        '--t-primary': customization?.colors?.primary ?? '#8b5e3c',
        '--t-accent': customization?.colors?.accent ?? '#d4a574',
        '--t-bg': customization?.colors?.bg ?? '#f5e6d3',
        '--t-text': customization?.colors?.text ?? '#3e2723',
      } as React.CSSProperties}
    >
      {/* ===== Navigation — Wooden Shelf ===== */}
      <nav
        className="sticky top-0 z-50"
        style={{
          background: "linear-gradient(180deg, #5d3a1a 0%, #4a2e14 40%, #3e2510 100%)",
          boxShadow: "0 4px 12px rgba(62,39,35,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className={`${headingFont} text-2xl font-bold text-[#d4a574]`}>
            {student.name}
          </span>
          <div className="flex items-center gap-6">
            {[
              { id: "about", label: customization?.sectionLabels?.about ?? (lang === "en" ? "About" : "אודות") },
              { id: "projects", label: customization?.sectionLabels?.projects ?? (lang === "en" ? "Projects" : "פרויקטים") },
              { id: "cv", label: customization?.sectionLabels?.cv ?? (lang === "en" ? "Experience" : "קורות חיים") },
              { id: "contact", label: customization?.sectionLabels?.contact ?? (lang === "en" ? "Contact" : "צור קשר") },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-[#d4a574]/70 hover:text-[#f5e6d3] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        {/* Shelf edge highlight */}
        <div className="h-1 bg-gradient-to-b from-[#8b5e3c]/40 to-transparent" />
      </nav>

      {/* ===== Hero — Carved Frame ===== */}
      <header className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          {student.image && (
            <div className="shrink-0 relative">
              {/* Carved wooden frame */}
              <div
                className="w-44 h-44 md:w-52 md:h-52 overflow-hidden rounded-lg"
                style={{
                  border: "6px solid #6d4224",
                  boxShadow:
                    "inset 0 0 20px rgba(62,39,35,0.5), 0 4px 16px rgba(62,39,35,0.25), inset 0 0 0 2px rgba(212,165,116,0.3)",
                }}
              >
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-full h-full object-cover sepia-[0.15]"
                />
              </div>
              {/* Corner nails on the frame */}
              <Nail className="top-0 start-0 -translate-x-1/2 -translate-y-1/2" />
              <Nail className="top-0 end-0 translate-x-1/2 -translate-y-1/2" />
              <Nail className="bottom-0 start-0 -translate-x-1/2 translate-y-1/2" />
              <Nail className="bottom-0 end-0 translate-x-1/2 translate-y-1/2" />
            </div>
          )}
          <div className="text-center md:text-start flex-1">
            <h1 className={`text-5xl md:text-7xl font-bold ${headingFont} text-[#3e2723] leading-tight`}>
              {student.name}
            </h1>
            {about.subtitle && (
              <p className="text-lg text-[#8b5e3c]/70 mt-3 italic">{about.subtitle}</p>
            )}
            {/* Grain line accent */}
            <div className="flex items-center gap-2 mt-6">
              <div className="h-px w-16 bg-[#8b5e3c]/30" />
              <div className="w-2 h-2 rounded-full bg-[#8b5e3c]/40" />
              <div className="h-px w-16 bg-[#8b5e3c]/30" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 pb-16">
        {/* ===== About — Parchment Card ===== */}
        {about.body && (
          <section id="about" className="scroll-mt-20 mb-4">
            <h2 className={`text-3xl md:text-4xl font-bold ${headingFont} text-[#3e2723] mb-6`}>
              {about.title || (customization?.sectionLabels?.about ?? (lang === "en" ? "About" : "אודות"))}
            </h2>
            <div
              className="relative p-8 md:p-10 rounded-sm"
              style={{
                background: "linear-gradient(135deg, #faf0e0 0%, #f5e6d3 50%, #eedcc5 100%)",
                boxShadow:
                  "0 2px 12px rgba(139,94,60,0.15), inset 0 1px 0 rgba(255,255,255,0.5), 0 0 0 1px rgba(139,94,60,0.1)",
              }}
            >
              {/* Parchment corner nails */}
              <Nail className="top-3 start-3" />
              <Nail className="top-3 end-3" />
              <Nail className="bottom-3 start-3" />
              <Nail className="bottom-3 end-3" />

              <p className="text-[#3e2723]/80 leading-[1.9] whitespace-pre-line text-base">
                {about.body}
              </p>
            </div>
          </section>
        )}

        <GrainDivider />

        {/* ===== Projects — Wood Panel Cards ===== */}
        {projects.length > 0 && (
          <section id="projects" className="scroll-mt-20 mb-4">
            <h2 className={`text-3xl md:text-4xl font-bold ${headingFont} text-[#3e2723] mb-8`}>
              {customization?.sectionLabels?.projects ?? (lang === "en" ? "Projects" : "פרויקטים")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="relative group rounded-sm overflow-hidden transition-shadow hover:shadow-lg"
                  style={{
                    background: "linear-gradient(160deg, #a97c50 0%, #8b5e3c 40%, #7a5230 100%)",
                    boxShadow:
                      "inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 6px rgba(0,0,0,0.2), 0 2px 8px rgba(62,39,35,0.2)",
                  }}
                >
                  {/* Corner nails */}
                  <Nail className="top-2.5 start-2.5 bg-[#2a1a0e]/70" />
                  <Nail className="top-2.5 end-2.5 bg-[#2a1a0e]/70" />
                  <Nail className="bottom-2.5 start-2.5 bg-[#2a1a0e]/70" />
                  <Nail className="bottom-2.5 end-2.5 bg-[#2a1a0e]/70" />

                  {project.media[0]?.thumbnailUrl && (
                    <a
                      href={project.media[0].webViewUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={project.media[0].thumbnailUrl}
                        alt={project.title}
                        className="w-full h-44 object-cover opacity-90 group-hover:opacity-100 transition-opacity sepia-[0.1]"
                      />
                    </a>
                  )}
                  <div className="p-5">
                    <h3 className={`text-2xl font-bold ${headingFont} text-[#f5e6d3]`}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-sm text-[#f5e6d3]/70 mt-2 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] bg-[#f5e6d3]/15 border border-[#f5e6d3]/25 text-[#f5e6d3]/80 px-2 py-0.5 rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.media.length > 1 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto">
                        {project.media.slice(1, 5).map((m) => (
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
                                className="w-16 h-16 object-cover rounded-sm border border-[#f5e6d3]/20 hover:border-[#f5e6d3]/50 transition-colors"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-[#3e2723]/30 rounded-sm border border-[#f5e6d3]/20 flex items-center justify-center text-[9px] text-[#f5e6d3]/50">
                                {m.fileName}
                              </div>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <GrainDivider />

        {/* ===== CV — Chiseled Items ===== */}
        {cvSections.length > 0 && (
          <section id="cv" className="scroll-mt-20 mb-4">
            <h2 className={`text-3xl md:text-4xl font-bold ${headingFont} text-[#3e2723] mb-8`}>
              {customization?.sectionLabels?.cv ?? (lang === "en" ? "Experience" : "קורות חיים")}
            </h2>
            <div className="space-y-10">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className={`text-2xl font-bold ${headingFont} text-[#8b5e3c] mb-5 pb-2 border-b border-[#8b5e3c]/20`}>
                    {section.title}
                  </h3>
                  <div className="space-y-5">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="relative ps-5">
                        {/* Chiseled start-side line */}
                        <div className="absolute start-0 top-0 bottom-0 w-0.5 bg-[#8b5e3c]/30" />
                        {/* Warm accent dot */}
                        <div className="absolute start-[-3px] top-1.5 w-2 h-2 rounded-full bg-[#d4a574] shadow-[0_0_0_2px_#f5e6d3]" />
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <p className="font-semibold text-[#3e2723]">{entry.title}</p>
                            {entry.subtitle && (
                              <p className="text-sm text-[#8b5e3c]/70 mt-0.5">{entry.subtitle}</p>
                            )}
                            {entry.description && (
                              <p className="text-sm text-[#3e2723]/55 mt-1 leading-relaxed">
                                {entry.description}
                              </p>
                            )}
                          </div>
                          {entry.dateRange && (
                            <span className="text-xs text-[#8b5e3c]/50 shrink-0 pt-1 bg-[#8b5e3c]/8 px-2 py-0.5 rounded-sm">
                              {entry.dateRange}
                            </span>
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

        <GrainDivider />

        {/* ===== Contact — Hand-Carved Sign ===== */}
        <footer id="contact" className="scroll-mt-20">
          <h2 className={`text-3xl md:text-4xl font-bold ${headingFont} text-[#3e2723] mb-8 text-center`}>
            {customization?.sectionLabels?.contact ?? (lang === "en" ? "Contact" : "צור קשר")}
          </h2>
          <div
            className="relative text-center p-8 md:p-10 rounded-sm max-w-lg mx-auto"
            style={{
              border: "3px solid #8b5e3c",
              background: "linear-gradient(135deg, #faf0e0 0%, #f5e6d3 50%, #eedcc5 100%)",
              boxShadow:
                "0 4px 16px rgba(139,94,60,0.2), inset 0 0 30px rgba(139,94,60,0.06)",
            }}
          >
            {/* Sign corner nails */}
            <Nail className="top-2.5 start-2.5" />
            <Nail className="top-2.5 end-2.5" />
            <Nail className="bottom-2.5 start-2.5" />
            <Nail className="bottom-2.5 end-2.5" />

            <div className="space-y-3">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-center gap-2 text-sm text-[#3e2723]/70 hover:text-[#8b5e3c] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-center gap-2 text-sm text-[#3e2723]/70 hover:text-[#8b5e3c] transition-colors"
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
                  className="flex items-center justify-center gap-2 text-sm text-[#3e2723]/70 hover:text-[#8b5e3c] transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {lang === "en" ? "Website" : "אתר אישי"}
                </a>
              )}
            </div>

            {Object.keys(socialLinks).length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t border-[#8b5e3c]/15">
                {Object.entries(socialLinks)
                  .filter(([, v]) => v)
                  .map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#8b5e3c]/50 hover:text-[#8b5e3c] transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {key}
                    </a>
                  ))}
              </div>
            )}
          </div>

          <p className="text-xs text-[#8b5e3c]/30 mt-10 text-center">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
