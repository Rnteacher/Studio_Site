"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function SidebarCreative({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont ? `font-${customization.bodyFont}` : 'font-rubik';
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : 'font-rubik-dirt';

  const NAV_ITEMS = [
    { id: "about", label: customization?.sectionLabels?.about ?? "אודות" },
    { id: "projects", label: customization?.sectionLabels?.projects ?? "פרויקטים" },
    { id: "cv", label: customization?.sectionLabels?.cv ?? "קורות חיים" },
    { id: "contact", label: customization?.sectionLabels?.contact ?? "יצירת קשר" },
  ];


  return (
    <div className={`min-h-screen ${bodyFont} scroll-smooth`} dir="rtl"
      style={{
        '--t-primary': customization?.colors?.primary ?? '#f97316',
        '--t-accent': customization?.colors?.accent ?? '#fb923c',
        '--t-bg': customization?.colors?.bg ?? '#1c1917',
        '--t-text': customization?.colors?.text ?? '#e7e5e4',
      } as React.CSSProperties}
    >
      {/* Mobile Header */}
      <header className="lg:hidden text-white" style={{ background: "linear-gradient(135deg, #6b21a8 0%, #1e3a5f 100%)" }}>
        <div className="flex flex-col items-center py-8 px-6 gap-4">
          {student.image && (
            <img
              src={student.image}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#f97316] rotate-3"
            />
          )}
          <h1 className={`text-2xl font-bold ${headingFont} text-white`}>
            {student.name}
          </h1>
          {about.subtitle && (
            <p className="text-sm text-white/60">{about.subtitle}</p>
          )}
        </div>
        <nav className="sticky top-0 z-50 bg-[#1e3a5f]/90 backdrop-blur-sm border-t border-white/10">
          <div className="flex items-center justify-center gap-6 h-12 px-4 overflow-x-auto">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-sm text-white/50 hover:text-[#f97316] transition-colors whitespace-nowrap">
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Desktop Sidebar — purple-to-navy gradient */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 xl:w-80 text-white shrink-0" style={{ background: "linear-gradient(180deg, #6b21a8 0%, #1e3a5f 100%)" }}>
          <div className="flex flex-col items-center p-8 pt-12 gap-5 flex-1 sticky top-0 h-screen overflow-y-auto">
            {student.image && (
              <img
                src={student.image}
                alt={student.name}
                className="w-36 h-36 rounded-full object-cover border-4 border-[#f97316] shadow-lg rotate-3"
              />
            )}
            <div className="text-center">
              <h1 className={`text-2xl font-bold leading-tight ${headingFont}`}>
                {student.name}
              </h1>
              {about.subtitle && (
                <p className="text-sm text-white/50 mt-2">{about.subtitle}</p>
              )}
            </div>

            <nav className="w-full mt-6 border-t border-white/10 pt-6">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className="block py-2.5 px-4 rounded-lg text-sm text-white/50 hover:text-[#f97316] hover:bg-white/5 transition-colors border-b-2 border-transparent hover:border-[#f97316]">
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            <div className="w-full mt-auto pt-8 border-t border-white/10 space-y-3">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 text-xs text-white/35 hover:text-[#f97316] transition-colors">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </a>
              )}
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-2.5 text-xs text-white/35 hover:text-[#f97316] transition-colors">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {contact.phone}
                </a>
              )}
              {contact.website && (
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-xs text-white/35 hover:text-[#f97316] transition-colors">
                  <Globe className="h-3.5 w-3.5 shrink-0" />
                  אתר אישי
                </a>
              )}
              {Object.keys(socialLinks).length > 0 && (
                <div className="flex flex-wrap gap-3 pt-3">
                  {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-white/25 hover:text-[#f97316] transition-colors flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" /> {key}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content — warm off-white */}
        <main className="flex-1 bg-[#fef9f0] relative overflow-hidden">
          {/* Decorative paint-splash circles */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#6b21a8] rounded-full opacity-[0.04]" />
          <div className="absolute bottom-40 right-10 w-48 h-48 bg-[#f97316] rounded-full opacity-[0.06]" />

          <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 lg:py-20 relative z-10">
            {/* About */}
            <section id="about" className="mb-20 scroll-mt-16">
              <h2 className={`text-3xl font-bold text-[#6b21a8] mb-6 ${headingFont}`}>
                {about.title || "אודות"}
              </h2>
              <div className="w-16 h-1 bg-[#f97316] mb-8 rounded-full" />
              {about.body && (
                <p className="text-[#3a3a4a] text-lg leading-[1.9] whitespace-pre-line">{about.body}</p>
              )}
            </section>

            {/* Projects */}
            {projects.length > 0 && (
              <section id="projects" className="mb-20 scroll-mt-16">
                <h2 className={`text-3xl font-bold text-[#6b21a8] mb-6 ${headingFont}`}>{customization?.sectionLabels?.projects ?? "פרויקטים"}</h2>
                <div className="w-16 h-1 bg-[#f97316] mb-10 rounded-full" />
                <div className="space-y-10">
                  {projects.map((project) => (
                    <article key={project.id} className="border-r-4 border-[#6b21a8] pr-6 pb-10">
                      <h3 className={`text-xl font-bold text-[#3a3a4a] mb-2 ${headingFont}`}>{project.title}</h3>
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map((tag, i) => (
                            <span key={tag} className={`text-xs px-2.5 py-0.5 rounded-full ${i % 2 === 0 ? "bg-[#6b21a8]/10 text-[#6b21a8]" : "bg-[#f97316]/10 text-[#f97316]"}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.description && (
                        <p className="text-[#5a5a6a] leading-relaxed">{project.description}</p>
                      )}
                      {project.media.length > 0 && (
                        <div className="flex gap-3 mt-5 overflow-x-auto">
                          {project.media.slice(0, 5).map((m) => (
                            <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="shrink-0">
                              {m.thumbnailUrl ? (
                                <img src={m.thumbnailUrl} alt={m.fileName} className="w-28 h-20 object-cover rounded-lg border-2 border-transparent hover:border-[#f97316] transition-colors" />
                              ) : (
                                <div className="w-28 h-20 bg-[#f0e8d8] rounded-lg flex items-center justify-center text-[10px] text-[#8a7d6a]">
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
                <h2 className={`text-3xl font-bold text-[#6b21a8] mb-6 ${headingFont}`}>{customization?.sectionLabels?.cv ?? "קורות חיים"}</h2>
                <div className="w-16 h-1 bg-[#f97316] mb-10 rounded-full" />
                <div className="space-y-12">
                  {cvSections.map((section) => (
                    <div key={section.id}>
                      <h3 className={`text-lg font-bold text-[#6b21a8] mb-6 pb-2 border-b-2 border-[#f97316]/40 ${headingFont}`}>
                        {section.title}
                      </h3>
                      <div className="relative pr-8 space-y-8">
                        <div className="absolute right-2.5 top-1 bottom-0 w-px bg-[#6b21a8]/20" />
                        {section.entries.map((entry, i) => (
                          <div key={i} className="relative">
                            <div className="absolute -right-[1.375rem] top-1.5 w-2.5 h-2.5 rounded-full bg-[#f97316] border-2 border-[#fef9f0]" />
                            <div>
                              <p className="font-semibold text-[#3a3a4a]">{entry.title}</p>
                              {entry.subtitle && <p className="text-sm text-[#6b21a8]/60 mt-0.5">{entry.subtitle}</p>}
                              {entry.dateRange && <p className="text-xs text-[#a09080] mt-1">{entry.dateRange}</p>}
                              {entry.description && <p className="text-sm text-[#6a6a7a] mt-2 leading-relaxed">{entry.description}</p>}
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
            <footer id="contact" className="pt-10 border-t border-[#e5e0d5] scroll-mt-16">
              <h2 className={`text-2xl font-bold text-[#6b21a8] mb-6 ${headingFont}`}>{customization?.sectionLabels?.contact ?? "יצירת קשר"}</h2>
              <div className="space-y-4">
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-[#5a5a6a] hover:text-[#f97316] transition-colors">
                    <Mail className="h-4 w-4 text-[#f97316]" /> {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-[#5a5a6a] hover:text-[#f97316] transition-colors">
                    <Phone className="h-4 w-4 text-[#f97316]" /> {contact.phone}
                  </a>
                )}
                {contact.website && (
                  <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#5a5a6a] hover:text-[#f97316] transition-colors">
                    <Globe className="h-4 w-4 text-[#f97316]" /> אתר אישי
                  </a>
                )}
              </div>
              {Object.keys(socialLinks).length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">
                  {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#8a7d6a] hover:text-[#f97316] transition-colors flex items-center gap-1.5">
                      <ExternalLink className="h-3 w-3" /> {key}
                    </a>
                  ))}
                </div>
              )}
            </footer>

            <div className="mt-16 pt-8 border-t border-[#e5e0d5] text-center">
              <p className="text-xs text-[#b0a890]">{student.name} &copy; {new Date().getFullYear()}</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
