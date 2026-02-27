"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function NewspaperVintage({
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

  const today = new Date();
  const dateStr = today.toLocaleDateString("he-IL", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className={`min-h-screen bg-[#f5f0e1] text-[#2c2417] ${bodyFont} scroll-smooth`} dir={lang === "en" ? "ltr" : "rtl"}
      style={{
        '--t-primary': customization?.colors?.primary ?? '#1a1a1a',
        '--t-accent': customization?.colors?.accent ?? '#8b0000',
        '--t-bg': customization?.colors?.bg ?? '#f5f0e8',
        '--t-text': customization?.colors?.text ?? '#333333',
      } as React.CSSProperties}
    >
      {/* Edition strip */}
      <nav className="sticky top-0 z-50 bg-[#f5f0e1]/95 backdrop-blur-sm border-b-2 border-[#2c2417]">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-10">
          <span className="text-xs text-[#8b7d5a]">{dateStr} | מהדורה מיוחדת</span>
          <div className="flex items-center gap-5">
            <a href="#about" className="text-xs text-[#8b7d5a] hover:text-[#8b0000] transition-colors">{customization?.sectionLabels?.about ?? "אודות"}</a>
            <a href="#projects" className="text-xs text-[#8b7d5a] hover:text-[#8b0000] transition-colors">{customization?.sectionLabels?.projects ?? "עבודות"}</a>
            <a href="#cv" className="text-xs text-[#8b7d5a] hover:text-[#8b0000] transition-colors">{customization?.sectionLabels?.cv ?? "ניסיון"}</a>
            <a href="#contact" className="text-xs text-[#8b7d5a] hover:text-[#8b0000] transition-colors">{customization?.sectionLabels?.contact ?? "קשר"}</a>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Masthead */}
        <header className="text-center mb-8">
          <div className="border-t-4 border-b-2 border-[#2c2417] py-2 mb-4">
            <p className="text-[10px] text-[#8b7d5a] tracking-[0.5em] uppercase">פורטפוליו אישי</p>
          </div>
          <h1 className={`text-5xl md:text-7xl font-bold ${headingFont} text-[#2c2417] leading-none mb-3`}>
            {student.name}
          </h1>
          {about.subtitle && (
            <p className="text-lg text-[#8b7d5a] italic font-serif">{about.subtitle}</p>
          )}
          <div className="border-t-2 border-b-4 border-[#2c2417] py-1.5 mt-4 flex items-center justify-between text-[10px] text-[#8b7d5a]">
            <span>{projects.length} פרויקטים</span>
            <span>&#10022;</span>
            <span>{cvSections.length} תחומי ניסיון</span>
            <span>&#10022;</span>
            <span>מהדורה {today.getFullYear()}</span>
          </div>
        </header>

        {/* About — Lead article with columns */}
        <section id="about" className="mb-10 scroll-mt-16">
          <div className="flex items-center gap-4 mb-4">
            {student.image && (
              <img src={student.image} alt={student.name} className="w-24 h-24 object-cover grayscale border border-[#d4c5a0]" />
            )}
            <div className="flex-1">
              <h2 className={`text-2xl font-bold ${headingFont} text-[#8b0000] mb-1`}>{about.title || "כתבה ראשית"}</h2>
              <div className="h-0.5 bg-[#8b0000]" />
            </div>
          </div>
          {about.body && (
            <div className="columns-1 md:columns-2 gap-8" style={{ columnRule: "1px solid #d4c5a0" }}>
              <p className="text-[#2c2417] leading-[1.8] whitespace-pre-line text-sm" style={{ textIndent: "1.5rem" }}>
                {about.body}
              </p>
            </div>
          )}
        </section>

        <div className="border-t-2 border-b border-[#2c2417] my-8" />

        {/* Projects — Articles */}
        {projects.length > 0 && (
          <section id="projects" className="mb-10 scroll-mt-16">
            <h2 className={`text-3xl font-bold ${headingFont} text-[#8b0000] mb-1`}>חדשות</h2>
            <div className="h-0.5 bg-[#8b0000] mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, pi) => (
                <article key={project.id} className={`${pi === 0 ? "md:col-span-2" : ""} border-b border-[#d4c5a0] pb-6`}>
                  {project.media[0]?.thumbnailUrl && (
                    <img src={project.media[0].thumbnailUrl} alt={project.title} className={`w-full ${pi === 0 ? "h-64" : "h-40"} object-cover grayscale hover:grayscale-0 transition-all duration-500 mb-3 border border-[#d4c5a0]`} />
                  )}
                  <h3 className={`text-xl font-bold ${headingFont} text-[#2c2417] mb-1`}>{project.title}</h3>
                  {project.tags.length > 0 && (
                    <p className="text-[10px] text-[#8b0000] mb-2 tracking-wider">
                      {project.tags.join(" | ")}
                    </p>
                  )}
                  {project.description && (
                    <p className="text-sm text-[#4a3f2f] leading-relaxed line-clamp-3">{project.description}</p>
                  )}
                  {project.media.length > 1 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                      {project.media.slice(1, 4).map((m) => (
                        <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="shrink-0">
                          {m.thumbnailUrl ? (
                            <img src={m.thumbnailUrl} alt={m.fileName} className="w-20 h-16 object-cover grayscale hover:grayscale-0 transition-all border border-[#d4c5a0]" />
                          ) : (
                            <div className="w-20 h-16 bg-[#ebe5d5] border border-[#d4c5a0] flex items-center justify-center text-[10px] text-[#8b7d5a]">
                              {m.fileName}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="border-t-2 border-b border-[#2c2417] my-8" />

        {/* CV — Classified ads */}
        {cvSections.length > 0 && (
          <section id="cv" className="mb-10 scroll-mt-16">
            <h2 className={`text-3xl font-bold ${headingFont} text-[#8b0000] mb-1`}>מודעות מסווגות</h2>
            <div className="h-0.5 bg-[#8b0000] mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cvSections.map((section) => (
                <div key={section.id} className="border-2 border-dotted border-[#d4c5a0] p-4">
                  <h3 className={`text-lg font-bold ${headingFont} text-[#2c2417] mb-3 text-center border-b border-[#d4c5a0] pb-2`}>
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="text-sm">
                        <p className="font-semibold text-[#2c2417]">{entry.title}</p>
                        {entry.subtitle && <p className="text-xs text-[#8b7d5a]">{entry.subtitle}</p>}
                        {entry.dateRange && <p className="text-[10px] text-[#c9a959]">{entry.dateRange}</p>}
                        {entry.description && <p className="text-xs text-[#6a5d45] mt-1 leading-relaxed">{entry.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="border-t-2 border-b border-[#2c2417] my-8" />

        {/* Contact */}
        <footer id="contact" className="scroll-mt-16">
          <h2 className={`text-2xl font-bold ${headingFont} text-[#8b0000] mb-4`}>מערכת העיתון</h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="space-y-2">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-[#4a3f2f] hover:text-[#8b0000] transition-colors">
                  <Mail className="h-4 w-4" /> {contact.email}
                </a>
              )}
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-sm text-[#4a3f2f] hover:text-[#8b0000] transition-colors">
                  <Phone className="h-4 w-4" /> {contact.phone}
                </a>
              )}
              {contact.website && (
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#4a3f2f] hover:text-[#8b0000] transition-colors">
                  <Globe className="h-4 w-4" /> אתר אישי
                </a>
              )}
            </div>
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex flex-wrap gap-3">
                {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#8b7d5a] hover:text-[#8b0000] flex items-center gap-1 transition-colors">
                    <ExternalLink className="h-3 w-3" /> {key}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 pt-4 border-t-4 border-b-2 border-[#2c2417] text-center">
            <p className="text-[10px] text-[#8b7d5a] py-2">{student.name} &copy; {new Date().getFullYear()} | כל הזכויות שמורות</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
