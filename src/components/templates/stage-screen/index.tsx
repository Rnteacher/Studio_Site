"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function StageScreen({
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

  return (
    <div className={`min-h-screen bg-[#0c0c0c] text-[#e8e0d0] ${bodyFont} scroll-smooth border-x-4 border-[#b91c1c]`} dir={lang === "en" ? "ltr" : "rtl"}
      style={{
        '--t-primary': customization?.colors?.primary ?? '#e11d48',
        '--t-accent': customization?.colors?.accent ?? '#be123c',
        '--t-bg': customization?.colors?.bg ?? '#0f0f0f',
        '--t-text': customization?.colors?.text ?? '#e5e5e5',
      } as React.CSSProperties}
    >
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0c0c0c]/90 backdrop-blur-sm border-b border-[#b91c1c]/30">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-12">
          <span className={`${headingFont} text-xl text-[#c9a44a]`}>{student.name}</span>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-xs text-[#e8e0d0]/40 hover:text-[#c9a44a] transition-colors">{customization?.sectionLabels?.about ?? "אודות"}</a>
            <a href="#projects" className="text-xs text-[#e8e0d0]/40 hover:text-[#c9a44a] transition-colors">{customization?.sectionLabels?.projects ?? "הפקות"}</a>
            <a href="#cv" className="text-xs text-[#e8e0d0]/40 hover:text-[#c9a44a] transition-colors">{customization?.sectionLabels?.cv ?? "קורות חיים"}</a>
            <a href="#contact" className="text-xs text-[#e8e0d0]/40 hover:text-[#c9a44a] transition-colors">{customization?.sectionLabels?.contact ?? "דלת במה"}</a>
          </div>
        </div>
      </nav>

      {/* Hero — Spotlight */}
      <header className="relative py-24 md:py-32 overflow-hidden" style={{ background: "radial-gradient(ellipse at center, #1a1a1a 0%, #0c0c0c 70%)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {student.image && (
            <img src={student.image} alt={student.name} className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover mx-auto mb-8 border-2 border-[#c9a44a]/40" style={{ boxShadow: "0 0 60px rgba(201,164,74,0.15)" }} />
          )}
          <h1 className={`text-5xl md:text-7xl font-bold ${headingFont} text-[#c9a44a] mb-4 leading-none`} style={{ textShadow: "0 0 30px rgba(201,164,74,0.2)" }}>
            {student.name}
          </h1>
          {about.subtitle && (
            <p className="text-lg text-[#e8e0d0]/50 tracking-wider">{about.subtitle}</p>
          )}
          <div className="flex justify-center gap-3 mt-8">
            <div className="w-8 h-0.5 bg-[#b91c1c]" />
            <div className="w-2 h-2 rounded-full bg-[#c9a44a]" />
            <div className="w-8 h-0.5 bg-[#b91c1c]" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* About */}
        <section id="about" className="scroll-mt-16">
          <h2 className={`text-3xl font-bold ${headingFont} text-[#c9a44a] mb-2`}>{customization?.sectionLabels?.about ?? "אודות"}</h2>
          <div className="w-20 h-0.5 bg-[#b91c1c] mb-6" />
          <div className="bg-[#1a1a1a] rounded-sm p-8 border border-[#b91c1c]/15">
            <h3 className={`text-xl font-bold ${headingFont} text-[#c9a44a] mb-3`}>{about.title || student.name}</h3>
            {about.body && (
              <p className="text-[#e8e0d0]/70 leading-[1.8] whitespace-pre-line">{about.body}</p>
            )}
          </div>
        </section>

        {/* Projects — Film strip cards */}
        {projects.length > 0 && (
          <section id="projects" className="scroll-mt-16">
            <h2 className={`text-3xl font-bold ${headingFont} text-[#c9a44a] mb-2`}>הפקות</h2>
            <div className="w-20 h-0.5 bg-[#b91c1c] mb-8" />
            <div className="space-y-8">
              {projects.map((project) => (
                <article key={project.id} className="bg-[#1a1a1a] border border-[#b91c1c]/15 overflow-hidden">
                  {/* Film strip top border */}
                  <div className="flex bg-[#111] h-4">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="flex-1 mx-0.5 bg-[#0c0c0c] rounded-sm" />
                    ))}
                  </div>
                  <div className="p-6">
                    <h3 className={`text-2xl font-bold ${headingFont} text-[#c9a44a] mb-2`}>{project.title}</h3>
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs text-[#b91c1c] border border-[#b91c1c]/30 px-2.5 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.description && (
                      <p className="text-sm text-[#e8e0d0]/50 leading-relaxed">{project.description}</p>
                    )}
                    {project.media.length > 0 && (
                      <div className="flex gap-3 mt-5 overflow-x-auto">
                        {project.media.slice(0, 5).map((m) => (
                          <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="shrink-0">
                            {m.thumbnailUrl ? (
                              <img src={m.thumbnailUrl} alt={m.fileName} className="w-28 h-20 object-cover border border-[#333] hover:border-[#c9a44a] transition-colors" />
                            ) : (
                              <div className="w-28 h-20 bg-[#111] border border-[#333] flex items-center justify-center text-[10px] text-[#555]">
                                {m.fileName}
                              </div>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Film strip bottom border */}
                  <div className="flex bg-[#111] h-4">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="flex-1 mx-0.5 bg-[#0c0c0c] rounded-sm" />
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CV — Playbill */}
        {cvSections.length > 0 && (
          <section id="cv" className="scroll-mt-16">
            <h2 className={`text-3xl font-bold ${headingFont} text-[#c9a44a] mb-2`}>תוכניה</h2>
            <div className="w-20 h-0.5 bg-[#b91c1c] mb-8" />
            <div className="space-y-10">
              {cvSections.map((section) => (
                <div key={section.id} className="bg-[#1a1a1a] border border-[#b91c1c]/15 p-6">
                  <h3 className={`text-2xl font-bold ${headingFont} text-[#c9a44a] mb-5 pb-2 border-b border-[#c9a44a]/20`}>
                    {section.title}
                  </h3>
                  <div className="space-y-5">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-1 shrink-0 bg-[#b91c1c]/30 rounded-full" />
                        <div>
                          <p className="font-semibold text-[#e8e0d0]">{entry.title}</p>
                          {entry.subtitle && <p className="text-sm text-[#c9a44a]/60 mt-0.5">{entry.subtitle}</p>}
                          {entry.dateRange && <p className="text-xs text-[#e8e0d0]/30 mt-1">{entry.dateRange}</p>}
                          {entry.description && <p className="text-sm text-[#e8e0d0]/40 mt-2 leading-relaxed">{entry.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact — Stage Door */}
        <footer id="contact" className="scroll-mt-16 border-t border-[#b91c1c]/20 pt-10">
          <h2 className={`text-3xl font-bold ${headingFont} text-[#c9a44a] mb-6`}>דלת הבמה</h2>
          <div className="flex flex-wrap gap-4">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 bg-[#b91c1c] text-white px-5 py-2.5 text-sm hover:bg-[#991b1b] transition-colors">
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 bg-[#1a1a1a] border border-[#c9a44a]/20 px-5 py-2.5 text-sm hover:border-[#c9a44a] transition-colors">
                <Phone className="h-4 w-4 text-[#c9a44a]" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1a1a1a] border border-[#c9a44a]/20 px-5 py-2.5 text-sm hover:border-[#c9a44a] transition-colors">
                <Globe className="h-4 w-4 text-[#c9a44a]" /> אתר אישי
              </a>
            )}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-4 mt-6">
              {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#e8e0d0]/30 hover:text-[#c9a44a] flex items-center gap-1.5 transition-colors">
                  <ExternalLink className="h-3 w-3" /> {key}
                </a>
              ))}
            </div>
          )}
          <p className="text-xs text-[#e8e0d0]/15 mt-12 text-center">{student.name} &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
