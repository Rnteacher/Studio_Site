"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const COLORS = ["#ec4899", "#8b5cf6", "#fbbf24", "#34d399"];

export default function SidebarPlayful({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
  lang,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont ? `font-${customization.bodyFont}` : 'font-fredoka';
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : 'font-rubik-bubbles';

  const NAV_ITEMS = [
    { id: "about", label: customization?.sectionLabels?.about ?? "אודות" },
    { id: "projects", label: customization?.sectionLabels?.projects ?? "פרויקטים" },
    { id: "cv", label: customization?.sectionLabels?.cv ?? "קורות חיים" },
    { id: "contact", label: customization?.sectionLabels?.contact ?? "יצירת קשר" },
  ];


  return (
    <div className={`min-h-screen ${bodyFont} scroll-smooth`} dir={lang === "en" ? "ltr" : "rtl"}
      style={{
        '--t-primary': customization?.colors?.primary ?? '#ec4899',
        '--t-accent': customization?.colors?.accent ?? '#a855f7',
        '--t-bg': customization?.colors?.bg ?? '#fdf2f8',
        '--t-text': customization?.colors?.text ?? '#1e1e1e',
      } as React.CSSProperties}
    >
      {/* Mobile Header */}
      <header className="lg:hidden bg-[#fbbf24] text-[#44403c]">
        <div className="flex flex-col items-center py-8 px-6 gap-4">
          {student.image && (
            <div className="relative">
              <div className="w-28 h-28 rounded-full border-4 border-dashed border-[#ec4899] p-1">
                <img src={student.image} alt={student.name} className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
          )}
          <h1 className={`text-2xl font-bold ${headingFont} text-[#44403c]`}>
            {student.name}
          </h1>
          {about.subtitle && <p className="text-sm text-[#44403c]/60">{about.subtitle}</p>}
        </div>
        <nav className="sticky top-0 z-50 bg-[#f59e0b]/90 backdrop-blur-sm border-t border-white/20">
          <div className="flex items-center justify-center gap-4 h-12 px-4 overflow-x-auto">
            {NAV_ITEMS.map((item, i) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm px-3 py-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors whitespace-nowrap" style={{ color: COLORS[i % COLORS.length] }}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Desktop Sidebar — bright yellow with rounded corners */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 xl:w-80 bg-[#fbbf24] text-[#44403c] lg:sticky lg:top-0 lg:h-screen overflow-y-auto shrink-0 lg:rounded-l-3xl">
          <div className="flex flex-col items-center p-8 pt-12 gap-5 flex-1">
            {student.image && (
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-dashed border-[#ec4899] p-1.5">
                  <img src={student.image} alt={student.name} className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
            )}
            <div className="text-center">
              <h1 className={`text-2xl font-bold leading-tight ${headingFont}`}>
                {student.name}
              </h1>
              {about.subtitle && (
                <p className="text-sm text-[#44403c]/50 mt-2">{about.subtitle}</p>
              )}
            </div>

            <nav className="w-full mt-6 border-t border-white/30 pt-6">
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item, i) => (
                  <a key={item.id} href={`#${item.id}`} className="block py-2.5 px-4 rounded-full text-sm bg-white/20 hover:bg-white/40 transition-colors text-center font-medium" style={{ color: COLORS[i % COLORS.length] }}>
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            <div className="w-full mt-auto pt-8 border-t border-white/30 space-y-3">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 text-xs text-[#44403c]/50 hover:text-[#ec4899] transition-colors">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </a>
              )}
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-2.5 text-xs text-[#44403c]/50 hover:text-[#ec4899] transition-colors">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {contact.phone}
                </a>
              )}
              {contact.website && (
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-xs text-[#44403c]/50 hover:text-[#ec4899] transition-colors">
                  <Globe className="h-3.5 w-3.5 shrink-0" />
                  אתר אישי
                </a>
              )}
              {Object.keys(socialLinks).length > 0 && (
                <div className="flex flex-wrap gap-3 pt-3">
                  {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#44403c]/40 hover:text-[#8b5cf6] transition-colors flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" /> {key}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content — pale yellow */}
        <main className="flex-1 bg-[#fefce8]">
          <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 lg:py-20">
            {/* About */}
            <section id="about" className="mb-20 scroll-mt-16">
              <h2 className={`text-3xl font-bold mb-6 ${headingFont} text-[#ec4899]`}>
                {about.title || "אודות"}
              </h2>
              <div className="flex gap-1.5 mb-8">
                {COLORS.map((c) => <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />)}
              </div>
              {about.body && (
                <p className="text-[#44403c] text-lg leading-[1.9] whitespace-pre-line">{about.body}</p>
              )}
            </section>

            {/* Projects */}
            {projects.length > 0 && (
              <section id="projects" className="mb-20 scroll-mt-16">
                <h2 className={`text-3xl font-bold mb-6 ${headingFont} text-[#8b5cf6]`}>{customization?.sectionLabels?.projects ?? "פרויקטים"}</h2>
                <div className="flex gap-1.5 mb-10">
                  {COLORS.map((c) => <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />)}
                </div>
                <div className="space-y-8">
                  {projects.map((project, pi) => (
                    <article key={project.id} className="bg-white rounded-3xl border-2 border-dashed p-6 hover:-translate-y-1 transition-transform" style={{ borderColor: COLORS[pi % COLORS.length] }}>
                      <h3 className={`text-xl font-bold mb-2 ${headingFont}`} style={{ color: COLORS[pi % COLORS.length] }}>
                        {project.title}
                      </h3>
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map((tag, ti) => (
                            <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full text-white" style={{ backgroundColor: COLORS[ti % COLORS.length] }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.description && (
                        <p className="text-[#44403c]/80 leading-relaxed">{project.description}</p>
                      )}
                      {project.media.length > 0 && (
                        <div className="flex gap-3 mt-5 overflow-x-auto">
                          {project.media.slice(0, 5).map((m) => (
                            <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="shrink-0">
                              {m.thumbnailUrl ? (
                                <img src={m.thumbnailUrl} alt={m.fileName} className="w-28 h-20 object-cover rounded-2xl border-2 border-transparent hover:border-[#ec4899] transition-colors" />
                              ) : (
                                <div className="w-28 h-20 bg-[#fef3c7] rounded-2xl flex items-center justify-center text-[10px] text-[#a0977d]">
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

            {/* CV */}
            {cvSections.length > 0 && (
              <section id="cv" className="mb-20 scroll-mt-16">
                <h2 className={`text-3xl font-bold mb-6 ${headingFont} text-[#34d399]`}>{customization?.sectionLabels?.cv ?? "קורות חיים"}</h2>
                <div className="flex gap-1.5 mb-10">
                  {COLORS.map((c) => <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />)}
                </div>
                <div className="space-y-12">
                  {cvSections.map((section, si) => (
                    <div key={section.id}>
                      <h3 className={`text-lg font-bold mb-6 pb-2 border-b-2 border-dashed ${headingFont}`} style={{ color: COLORS[si % COLORS.length], borderColor: COLORS[si % COLORS.length] + "60" }}>
                        {section.title}
                      </h3>
                      <div className="space-y-6">
                        {section.entries.map((entry, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="w-3 h-3 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: COLORS[(si + i) % COLORS.length] }} />
                            <div>
                              <p className="font-semibold text-[#44403c]">{entry.title}</p>
                              {entry.subtitle && <p className="text-sm text-[#8b5cf6]/60 mt-0.5">{entry.subtitle}</p>}
                              {entry.dateRange && <p className="text-xs text-[#a0977d] mt-1">{entry.dateRange}</p>}
                              {entry.description && <p className="text-sm text-[#44403c]/60 mt-2 leading-relaxed">{entry.description}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contact — mobile only */}
            <footer id="contact" className="lg:hidden pt-10 border-t-2 border-dashed border-[#ec4899]/30 scroll-mt-16">
              <h2 className={`text-2xl font-bold text-[#ec4899] mb-6 ${headingFont}`}>{customization?.sectionLabels?.contact ?? "יצירת קשר"}</h2>
              <div className="space-y-4">
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-[#44403c]/70 hover:text-[#ec4899] transition-colors">
                    <Mail className="h-4 w-4 text-[#ec4899]" /> {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-[#44403c]/70 hover:text-[#8b5cf6] transition-colors">
                    <Phone className="h-4 w-4 text-[#8b5cf6]" /> {contact.phone}
                  </a>
                )}
                {contact.website && (
                  <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#44403c]/70 hover:text-[#34d399] transition-colors">
                    <Globe className="h-4 w-4 text-[#34d399]" /> אתר אישי
                  </a>
                )}
              </div>
              {Object.keys(socialLinks).length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">
                  {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#44403c]/40 hover:text-[#8b5cf6] transition-colors flex items-center gap-1.5">
                      <ExternalLink className="h-3 w-3" /> {key}
                    </a>
                  ))}
                </div>
              )}
            </footer>

            <div id="contact" className="hidden lg:block scroll-mt-16" />

            <div className="mt-16 pt-8 border-t-2 border-dashed border-[#fbbf24]/30 text-center">
              <div className="flex justify-center gap-1.5 mb-3">
                {COLORS.map((c) => <div key={c} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />)}
              </div>
              <p className="text-xs text-[#a0977d]">{student.name} &copy; {new Date().getFullYear()}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
