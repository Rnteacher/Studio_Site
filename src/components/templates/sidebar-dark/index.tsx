"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function SidebarDark({
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
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : 'font-fredoka';

  const NAV_ITEMS = [
    { id: "about", label: customization?.sectionLabels?.about ?? "אודות" },
    { id: "projects", label: customization?.sectionLabels?.projects ?? "פרויקטים" },
    { id: "cv", label: customization?.sectionLabels?.cv ?? "קורות חיים" },
    { id: "contact", label: customization?.sectionLabels?.contact ?? "יצירת קשר" },
  ];


  return (
    <div className={`min-h-screen ${bodyFont} scroll-smooth`} dir={lang === "en" ? "ltr" : "rtl"}
      style={{
        '--t-primary': customization?.colors?.primary ?? '#50c878',
        '--t-accent': customization?.colors?.accent ?? '#50c878',
        '--t-bg': customization?.colors?.bg ?? '#121212',
        '--t-text': customization?.colors?.text ?? '#d4d4d4',
      } as React.CSSProperties}
    >
      {/* Mobile Header */}
      <header className="lg:hidden bg-[#1a1a1a] text-[#d4d4d4]">
        <div className="flex flex-col items-center py-8 px-6 gap-4">
          {student.image && (
            <img
              src={student.image}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-[#50c878]/40"
              style={{ boxShadow: "0 0 20px rgba(80,200,120,0.2)" }}
            />
          )}
          <h1 className={`text-2xl font-bold ${headingFont} text-white`}>
            {student.name}
          </h1>
          {about.subtitle && (
            <p className="text-sm text-[#50c878]/70">{about.subtitle}</p>
          )}
        </div>
        <nav className="sticky top-0 z-50 bg-[#141414] border-t border-white/5">
          <div className="flex items-center justify-center gap-6 h-12 px-4 overflow-x-auto">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-[#50c878]/60 hover:text-[#50c878] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 xl:w-80 bg-[#1a1a1a] text-[#d4d4d4] shrink-0 border-l border-[#50c878]/10">
          <div className="flex flex-col items-center p-8 pt-12 gap-5 flex-1 sticky top-0 h-screen overflow-y-auto">
            {student.image && (
              <img
                src={student.image}
                alt={student.name}
                className="w-36 h-36 rounded-full object-cover border-2 border-[#50c878]/30 shadow-lg"
                style={{ boxShadow: "0 0 25px rgba(80,200,120,0.15)" }}
              />
            )}
            <div className="text-center">
              <h1 className={`text-2xl font-bold leading-tight ${headingFont} text-white`}>
                {student.name}
              </h1>
              {about.subtitle && (
                <p className="text-sm text-[#50c878]/60 mt-2">{about.subtitle}</p>
              )}
            </div>

            <nav className="w-full mt-6 border-t border-white/5 pt-6">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-2.5 px-4 rounded-lg text-sm text-[#8a8a8a] hover:text-[#50c878] hover:bg-[#50c878]/5 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            <div className="w-full mt-auto pt-8 border-t border-white/5 space-y-3">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 text-xs text-[#6a6a6a] hover:text-[#50c878] transition-colors">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </a>
              )}
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-2.5 text-xs text-[#6a6a6a] hover:text-[#50c878] transition-colors">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {contact.phone}
                </a>
              )}
              {contact.website && (
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-xs text-[#6a6a6a] hover:text-[#50c878] transition-colors">
                  <Globe className="h-3.5 w-3.5 shrink-0" />
                  אתר אישי
                </a>
              )}
              {Object.keys(socialLinks).length > 0 && (
                <div className="flex flex-wrap gap-3 pt-3">
                  {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#555] hover:text-[#50c878] transition-colors flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      {key}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-[#121212]">
          <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 lg:py-20">
            {/* About */}
            <section id="about" className="mb-20 scroll-mt-16">
              <h2 className={`text-3xl font-bold text-white mb-6 ${headingFont}`}>
                {about.title || "אודות"}
              </h2>
              <div className="w-16 h-0.5 bg-[#50c878] mb-8" />
              {about.body && (
                <p className="text-[#a0a0a0] text-lg leading-[1.9] whitespace-pre-line">
                  {about.body}
                </p>
              )}
            </section>

            {/* Projects */}
            {projects.length > 0 && (
              <section id="projects" className="mb-20 scroll-mt-16">
                <h2 className={`text-3xl font-bold text-white mb-6 ${headingFont}`}>{customization?.sectionLabels?.projects ?? "פרויקטים"}</h2>
                <div className="w-16 h-0.5 bg-[#50c878] mb-10" />
                <div className="space-y-10">
                  {projects.map((project) => (
                    <article key={project.id} className="border-b border-[#2a2a2a] pb-10 last:border-b-0">
                      <h3 className={`text-xl font-bold text-white mb-2 ${headingFont}`}>{project.title}</h3>
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map((tag) => (
                            <span key={tag} className="text-xs text-[#50c878]/80 border border-[#50c878]/20 rounded px-2.5 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.description && (
                        <p className="text-[#8a8a8a] leading-relaxed">{project.description}</p>
                      )}
                      {project.media.length > 0 && (
                        <div className="flex gap-3 mt-5 overflow-x-auto">
                          {project.media.slice(0, 5).map((m) => (
                            <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="shrink-0">
                              {m.thumbnailUrl ? (
                                <img src={m.thumbnailUrl} alt={m.fileName} className="w-28 h-20 object-cover rounded border border-[#2a2a2a] hover:border-[#50c878]/50 transition-colors" />
                              ) : (
                                <div className="w-28 h-20 bg-[#2a2a2a] rounded border border-[#333] flex items-center justify-center text-[10px] text-[#6a6a6a]">
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
                <h2 className={`text-3xl font-bold text-white mb-6 ${headingFont}`}>{customization?.sectionLabels?.cv ?? "קורות חיים"}</h2>
                <div className="w-16 h-0.5 bg-[#50c878] mb-10" />
                <div className="space-y-12">
                  {cvSections.map((section) => (
                    <div key={section.id}>
                      <h3 className={`text-lg font-bold text-white mb-6 pb-2 border-b-2 border-[#50c878]/30 ${headingFont}`}>
                        {section.title}
                      </h3>
                      <div className="relative pr-8 space-y-8">
                        <div className="absolute right-2.5 top-1 bottom-0 w-px bg-[#2a2a2a]" />
                        {section.entries.map((entry, i) => (
                          <div key={i} className="relative">
                            <div className="absolute -right-[1.375rem] top-1.5 w-2.5 h-2.5 rounded-full bg-[#50c878] border-2 border-[#121212]" />
                            <div>
                              <p className="font-semibold text-white">{entry.title}</p>
                              {entry.subtitle && <p className="text-sm text-[#50c878]/60 mt-0.5">{entry.subtitle}</p>}
                              {entry.dateRange && <p className="text-xs text-[#6a6a6a] mt-1">{entry.dateRange}</p>}
                              {entry.description && <p className="text-sm text-[#8a8a8a] mt-2 leading-relaxed">{entry.description}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contact */}
            <footer id="contact" className="pt-10 border-t border-[#2a2a2a] scroll-mt-16">
              <h2 className={`text-2xl font-bold text-white mb-6 ${headingFont}`}>{customization?.sectionLabels?.contact ?? "יצירת קשר"}</h2>
              <div className="space-y-4">
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-[#8a8a8a] hover:text-[#50c878] transition-colors">
                    <Mail className="h-4 w-4 text-[#50c878]" /> {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-[#8a8a8a] hover:text-[#50c878] transition-colors">
                    <Phone className="h-4 w-4 text-[#50c878]" /> {contact.phone}
                  </a>
                )}
                {contact.website && (
                  <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#8a8a8a] hover:text-[#50c878] transition-colors">
                    <Globe className="h-4 w-4 text-[#50c878]" /> אתר אישי
                  </a>
                )}
              </div>
              {Object.keys(socialLinks).length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">
                  {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#6a6a6a] hover:text-[#50c878] transition-colors flex items-center gap-1.5">
                      <ExternalLink className="h-3 w-3" /> {key}
                    </a>
                  ))}
                </div>
              )}
            </footer>

            <div className="mt-16 pt-8 border-t border-[#2a2a2a] text-center">
              <p className="text-xs text-[#4a4a4a]">{student.name} &copy; {new Date().getFullYear()}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
