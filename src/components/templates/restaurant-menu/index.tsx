"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const Ornament = () => (
  <div className="flex items-center justify-center gap-3 my-8">
    <div className="h-px flex-1 bg-[#c9a44a]/30" />
    <span className="text-[#c9a44a] text-lg">&#10022;</span>
    <div className="h-px flex-1 bg-[#c9a44a]/30" />
  </div>
);

export default function RestaurantMenu({
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
      className={`min-h-screen bg-[#1c1008] text-[#e8dcc8] ${bodyFont} scroll-smooth`}
      dir={lang === "en" ? "ltr" : "rtl"}
      style={{
        '--t-primary': customization?.colors?.primary ?? '#c9a44a',
        '--t-accent': customization?.colors?.accent ?? '#8b2332',
        '--t-bg': customization?.colors?.bg ?? '#1c1008',
        '--t-text': customization?.colors?.text ?? '#e8dcc8',
      } as React.CSSProperties}
    >
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#1c1008]/95 backdrop-blur-sm border-b border-[#c9a44a]/20">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between h-12">
          <span className={`${headingFont} font-bold text-xl text-[#c9a44a]`}>{student.name}</span>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-xs text-[#c9a44a]/60 hover:text-[#c9a44a] transition-colors">{customization?.sectionLabels?.about ?? (lang === "en" ? "About" : "אודות")}</a>
            <a href="#projects" className="text-xs text-[#c9a44a]/60 hover:text-[#c9a44a] transition-colors">{customization?.sectionLabels?.projects ?? (lang === "en" ? "Projects" : "עבודות")}</a>
            <a href="#cv" className="text-xs text-[#c9a44a]/60 hover:text-[#c9a44a] transition-colors">{customization?.sectionLabels?.cv ?? (lang === "en" ? "Experience" : "ניסיון")}</a>
            <a href="#contact" className="text-xs text-[#c9a44a]/60 hover:text-[#c9a44a] transition-colors">{customization?.sectionLabels?.contact ?? (lang === "en" ? "Reservations" : "הזמנות")}</a>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Cover */}
        <header className="text-center mb-4 py-12 border-2 border-[#c9a44a]/30 rounded-sm">
          <div className="flex justify-center gap-2 mb-6">
            <span className="text-[#c9a44a]">&#10022;</span>
            <span className="text-[#c9a44a]">&#10022;</span>
            <span className="text-[#c9a44a]">&#10022;</span>
          </div>
          {student.image && (
            <img src={student.image} alt={student.name} className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-2 border-[#c9a44a]/40" />
          )}
          <h1 className={`text-5xl md:text-6xl font-bold ${headingFont} text-[#c9a44a] mb-3`}>{student.name}</h1>
          {about.subtitle && (
            <p className="text-sm text-[#e8dcc8]/50 italic tracking-wider">{about.subtitle}</p>
          )}
          <div className="flex justify-center gap-2 mt-6">
            <span className="text-[#c9a44a]">&#10022;</span>
            <span className="text-[#c9a44a]">&#10022;</span>
            <span className="text-[#c9a44a]">&#10022;</span>
          </div>
        </header>

        <Ornament />

        {/* About — Chef's Philosophy */}
        <section id="about" className="mb-4 scroll-mt-16">
          <h2 className={`text-center text-3xl font-bold ${headingFont} text-[#c9a44a] mb-2`}>
            {about.title || (lang === "en" ? "Our Philosophy" : "הפילוסופיה שלנו")}
          </h2>
          <div className="text-center text-[#c9a44a]/40 text-xs tracking-[0.3em] mb-6">&#8212; &#8212; &#8212;</div>
          {about.body && (
            <p className="text-center text-[#e8dcc8]/80 leading-[1.9] whitespace-pre-line max-w-xl mx-auto">
              {about.body}
            </p>
          )}
        </section>

        <Ornament />

        {/* Projects — Menu Items */}
        {projects.length > 0 && (
          <section id="projects" className="mb-4 scroll-mt-16">
            <h2 className={`text-center text-3xl font-bold ${headingFont} text-[#c9a44a] mb-2`}>
              {customization?.sectionLabels?.projects ?? (lang === "en" ? "The Menu" : "התפריט")}
            </h2>
            <div className="text-center text-[#c9a44a]/40 text-xs tracking-[0.3em] mb-8">&#8212; &#8212; &#8212;</div>
            <div className="space-y-8">
              {projects.map((project) => (
                <article key={project.id} className="group">
                  <div className="flex items-baseline gap-2">
                    <h3 className={`text-xl font-bold ${headingFont} text-[#e8dcc8] shrink-0`}>{project.title}</h3>
                    <div className="flex-1 border-b border-dotted border-[#c9a44a]/30 mb-1" />
                    {project.tags.length > 0 && (
                      <span className={`text-sm text-[#c9a44a] shrink-0 ${headingFont}`}>
                        {project.tags[0]}
                      </span>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-sm text-[#e8dcc8]/50 mt-1 italic">{project.description}</p>
                  )}
                  {project.tags.length > 1 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.slice(1).map((tag) => (
                        <span key={tag} className="text-[10px] text-[#c9a44a]/60 border border-[#c9a44a]/20 px-2 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.media.length > 0 && (
                    <div className="flex gap-3 mt-4 overflow-x-auto">
                      {project.media.slice(0, 4).map((m) => (
                        <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="shrink-0">
                          {m.thumbnailUrl ? (
                            <img src={m.thumbnailUrl} alt={m.fileName} className="w-24 h-18 object-cover border border-[#c9a44a]/20 hover:border-[#c9a44a] transition-colors" />
                          ) : (
                            <div className="w-24 h-18 bg-[#2a1f10] border border-[#c9a44a]/20 flex items-center justify-center text-[10px] text-[#c9a44a]/40">
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

        <Ornament />

        {/* CV — Wine List / Specials */}
        {cvSections.length > 0 && (
          <section id="cv" className="mb-4 scroll-mt-16">
            <h2 className={`text-center text-3xl font-bold ${headingFont} text-[#c9a44a] mb-2`}>
              {customization?.sectionLabels?.cv ?? (lang === "en" ? "Wine List" : "רשימת היינות")}
            </h2>
            <div className="text-center text-[#c9a44a]/40 text-xs tracking-[0.3em] mb-8">&#8212; &#8212; &#8212;</div>
            <div className="space-y-10">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-2xl font-bold font-amatic-sc text-[#c9a44a] mb-4 text-center">
                    ~ {section.title} ~
                  </h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, i) => (
                      <div key={i}>
                        <div className="flex items-baseline gap-2">
                          <p className="font-semibold text-[#e8dcc8] shrink-0">{entry.title}</p>
                          <div className="flex-1 border-b border-dotted border-[#c9a44a]/20 mb-1" />
                          {entry.dateRange && (
                            <span className="text-xs text-[#c9a44a]/50 shrink-0">{entry.dateRange}</span>
                          )}
                        </div>
                        {entry.subtitle && <p className="text-xs text-[#8b2332] mt-0.5">{entry.subtitle}</p>}
                        {entry.description && <p className="text-xs text-[#e8dcc8]/40 mt-1 italic">{entry.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <Ornament />

        {/* Contact — Reservations */}
        <footer id="contact" className="text-center scroll-mt-16">
          <h2 className="text-3xl font-bold font-amatic-sc text-[#c9a44a] mb-2">{customization?.sectionLabels?.contact ?? (lang === "en" ? "Reservations" : "להזמנת מקום")}</h2>
          <div className="text-center text-[#c9a44a]/40 text-xs tracking-[0.3em] mb-6">&#8212; &#8212; &#8212;</div>
          <div className="space-y-3 max-w-sm mx-auto">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center justify-center gap-3 text-sm text-[#e8dcc8]/60 hover:text-[#c9a44a] transition-colors">
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center justify-center gap-3 text-sm text-[#e8dcc8]/60 hover:text-[#c9a44a] transition-colors">
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 text-sm text-[#e8dcc8]/60 hover:text-[#c9a44a] transition-colors">
                <Globe className="h-4 w-4" /> {lang === "en" ? "Website" : "אתר אישי"}
              </a>
            )}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#c9a44a]/40 hover:text-[#c9a44a] transition-colors flex items-center gap-1.5">
                  <ExternalLink className="h-3 w-3" /> {key}
                </a>
              ))}
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-[#c9a44a]/10">
            <div className="flex justify-center gap-2 mb-3">
              <span className="text-[#c9a44a]/30">&#10022;</span>
            </div>
            <p className="text-[10px] text-[#e8dcc8]/20">{student.name} &copy; {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
