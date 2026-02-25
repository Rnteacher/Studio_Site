"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function TechStartup({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont ? `font-${customization.bodyFont}` : 'font-heebo';
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : 'font-rubik';

  const stats = [
    { label: customization?.sectionLabels?.projects ?? "פרויקטים", value: projects.length },
    { label: "תחומי ניסיון", value: cvSections.length },
    { label: "כישורים", value: cvSections.reduce((acc, s) => acc + s.entries.length, 0) },
  ];

  return (
    <div className={`min-h-screen bg-[#f8fafc] text-[#1e293b] ${bodyFont} scroll-smooth`} dir="rtl"
      style={{
        '--t-primary': customization?.colors?.primary ?? '#3b82f6',
        '--t-accent': customization?.colors?.accent ?? '#06b6d4',
        '--t-bg': customization?.colors?.bg ?? '#ffffff',
        '--t-text': customization?.colors?.text ?? '#1e293b',
      } as React.CSSProperties}
    >
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#3b82f6]/10">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className={`${headingFont} font-bold text-[#1e293b] text-sm truncate`}>{student.name}</span>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm text-[#64748b] hover:text-[#3b82f6] transition-colors">{customization?.sectionLabels?.about ?? "אודות"}</a>
            <a href="#projects" className="text-sm text-[#64748b] hover:text-[#3b82f6] transition-colors">{customization?.sectionLabels?.projects ?? "פרויקטים"}</a>
            <a href="#cv" className="text-sm text-[#64748b] hover:text-[#3b82f6] transition-colors">{customization?.sectionLabels?.cv ?? "קורות חיים"}</a>
            <a href="#contact" className="text-sm text-[#64748b] hover:text-[#3b82f6] transition-colors">{customization?.sectionLabels?.contact ?? "יצירת קשר"}</a>
          </div>
        </div>
      </nav>

      {/* Hero — gradient banner */}
      <header className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)" }}>
        <div className="absolute top-10 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#06b6d4]/20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10 relative z-10">
          {student.image && (
            <img src={student.image} alt={student.name} className="w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover shadow-2xl shrink-0 border-4 border-white/20" />
          )}
          <div className="text-center md:text-right">
            <h1 className={`text-4xl md:text-5xl font-black ${headingFont} text-white mb-3 leading-tight`}>{student.name}</h1>
            {about.subtitle && <p className="text-lg text-white/70 mb-4">{about.subtitle}</p>}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm hover:bg-white/25 transition-colors">
                  <Mail className="h-4 w-4" /> {contact.email}
                </a>
              )}
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm hover:bg-white/25 transition-colors">
                  <Phone className="h-4 w-4" /> {contact.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Metrics */}
      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#3b82f6]/10 p-5 text-center shadow-sm">
              <p className={`text-3xl font-black ${headingFont} text-[#3b82f6]`}>{s.value}</p>
              <p className="text-sm text-[#64748b] mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">
        {/* About */}
        <section id="about">
          <h2 className={`text-3xl font-black ${headingFont} mb-8`}>{customization?.sectionLabels?.about ?? "אודות"}</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#3b82f6]/10 shadow-sm">
            <h3 className={`text-xl font-bold ${headingFont} mb-4 text-[#3b82f6]`}>{about.title || student.name}</h3>
            {about.body && <p className="text-[#475569] text-lg leading-relaxed whitespace-pre-line">{about.body}</p>}
          </div>
        </section>

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects">
            <h2 className={`text-3xl font-black ${headingFont} mb-10`}>{customization?.sectionLabels?.projects ?? "פרויקטים"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#3b82f6]/10 hover:border-[#3b82f6]/30 transition-all shadow-sm hover:shadow-md">
                  <div className="overflow-hidden">
                    {project.media[0]?.thumbnailUrl ? (
                      <img src={project.media[0].thumbnailUrl} alt={project.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-48" style={{ background: "linear-gradient(135deg, #3b82f6/10 0%, #06b6d4/10 100%)" }} />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-bold ${headingFont} mb-2 group-hover:text-[#3b82f6] transition-colors`}>{project.title}</h3>
                    {project.description && <p className="text-[#64748b] text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-[#3b82f6]/10 text-[#3b82f6] px-3 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    )}
                    {project.media.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto pt-3 border-t border-[#e2e8f0]">
                        {project.media.slice(1).map((m) => (
                          <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-[#f1f5f9] hover:ring-2 hover:ring-[#3b82f6]/30 transition-all">
                            {m.thumbnailUrl ? (
                              <img src={m.thumbnailUrl} alt={m.fileName} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#94a3b8] text-[10px]">{m.fileName}</div>
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

        {/* CV */}
        {cvSections.length > 0 && (
          <section id="cv">
            <h2 className={`text-3xl font-black ${headingFont} mb-10`}>{customization?.sectionLabels?.cv ?? "קורות חיים"}</h2>
            <div className="space-y-10">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className={`text-xl font-bold ${headingFont} mb-5 text-[#3b82f6]`}>{section.title}</h3>
                  <div className="relative pr-8 space-y-6">
                    <div className="absolute right-2.5 top-1 bottom-0 w-0.5" style={{ background: "linear-gradient(180deg, #3b82f6, #06b6d4)" }} />
                    {section.entries.map((entry, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -right-[1.375rem] top-1.5 w-2.5 h-2.5 rounded-full bg-[#3b82f6] border-2 border-[#f8fafc]" />
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-[#e2e8f0]">
                          <div className="flex justify-between items-start gap-4">
                            <p className="font-bold text-[#1e293b]">{entry.title}</p>
                            {entry.dateRange && (
                              <span className="text-xs text-[#3b82f6] bg-[#3b82f6]/10 px-3 py-1 rounded-full shrink-0">{entry.dateRange}</span>
                            )}
                          </div>
                          {entry.subtitle && <p className="text-sm text-[#64748b] mt-0.5">{entry.subtitle}</p>}
                          {entry.description && <p className="text-sm text-[#94a3b8] mt-2 leading-relaxed">{entry.description}</p>}
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
        <footer id="contact" className="border-t border-[#e2e8f0] pt-12">
          <h2 className={`text-3xl font-black ${headingFont} mb-8`}>{customization?.sectionLabels?.contact ?? "בואו נדבר"}</h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-[#3b82f6]/10">
            <div className="flex flex-wrap gap-4">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity font-medium" style={{ background: "linear-gradient(135deg, #3b82f6, #06b6d4)" }}>
                  <Mail className="h-4 w-4" /> {contact.email}
                </a>
              )}
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-2 bg-[#f1f5f9] text-[#1e293b] px-5 py-2.5 rounded-full hover:bg-[#e2e8f0] transition-colors">
                  <Phone className="h-4 w-4" /> {contact.phone}
                </a>
              )}
              {contact.website && (
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#f1f5f9] text-[#1e293b] px-5 py-2.5 rounded-full hover:bg-[#e2e8f0] transition-colors">
                  <Globe className="h-4 w-4" /> אתר אישי
                </a>
              )}
            </div>
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex flex-wrap gap-4 mt-6">
                {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#64748b] hover:text-[#3b82f6] flex items-center gap-1.5 transition-colors">
                    <ExternalLink className="h-3 w-3" /> {key}
                  </a>
                ))}
              </div>
            )}
          </div>
          <p className="text-xs text-[#94a3b8] mt-12 text-center">{student.name} &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
