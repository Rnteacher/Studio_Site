"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function MakerWorkshop({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-[#2b2118] text-[#d4c5a0] font-rubik scroll-smooth" dir="rtl">
      {/* Shelf/pegboard nav */}
      <nav className="sticky top-0 z-50 bg-[#231a10] border-b-4 border-[#d97706]">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-rubik-glitch text-lg text-[#d97706]">{student.name}</span>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm text-[#78716c] hover:text-[#d97706] transition-colors">אודות</a>
            <a href="#projects" className="text-sm text-[#78716c] hover:text-[#d97706] transition-colors">עבודות</a>
            <a href="#cv" className="text-sm text-[#78716c] hover:text-[#d97706] transition-colors">ניסיון</a>
            <a href="#contact" className="text-sm text-[#78716c] hover:text-[#d97706] transition-colors">קשר</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-[#231a10] py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          {student.image && (
            <img src={student.image} alt={student.name} className="w-40 h-40 object-cover border-4 border-[#78716c] shrink-0" />
          )}
          <div className="text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-bold font-rubik-glitch text-[#d97706] mb-3 tracking-wide">
              {student.name}
            </h1>
            {about.subtitle && <p className="text-[#d4c5a0]/50 text-lg">{about.subtitle}</p>}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* About — Notice board */}
        <section id="about" className="scroll-mt-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#78716c]" />
            <h2 className="text-2xl font-bold font-rubik-glitch text-[#d97706] uppercase tracking-wider">אודות</h2>
          </div>
          <div className="bg-[#3a3028] border-2 border-[#78716c]/30 p-8">
            <h3 className="text-lg font-bold text-[#d97706] mb-3">{about.title || student.name}</h3>
            {about.body && (
              <p className="text-[#d4c5a0]/70 leading-[1.8] whitespace-pre-line">{about.body}</p>
            )}
          </div>
        </section>

        {/* Projects — Workbench cards */}
        {projects.length > 0 && (
          <section id="projects" className="scroll-mt-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#78716c]" />
              <h2 className="text-2xl font-bold font-rubik-glitch text-[#d97706] uppercase tracking-wider">עבודות</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <article key={project.id} className="bg-[#3a3028] border-t-4 border-[#d97706] group hover:border-[#f59e0b] transition-colors">
                  {project.media[0]?.thumbnailUrl ? (
                    <img src={project.media[0].thumbnailUrl} alt={project.title} className="w-full h-44 object-cover group-hover:brightness-110 transition-all" />
                  ) : (
                    <div className="w-full h-44 bg-[#2b2118]" />
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-bold font-rubik-glitch text-[#d4c5a0] mb-2">{project.title}</h3>
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[10px] bg-[#d97706]/15 border border-[#d97706]/30 text-[#d97706] px-2 py-0.5 uppercase tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.description && (
                      <p className="text-sm text-[#d4c5a0]/50 leading-relaxed line-clamp-3">{project.description}</p>
                    )}
                    {project.media.length > 1 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto">
                        {project.media.slice(1, 4).map((m) => (
                          <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="w-14 h-14 shrink-0 overflow-hidden bg-[#2b2118] border border-[#78716c]/30 hover:border-[#d97706] transition-colors">
                            {m.thumbnailUrl ? (
                              <img src={m.thumbnailUrl} alt={m.fileName} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[8px] text-[#78716c]">{m.fileName}</div>
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

        {/* CV — Blueprint */}
        {cvSections.length > 0 && (
          <section id="cv" className="scroll-mt-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-[#78716c]" />
              <h2 className="text-2xl font-bold font-rubik-glitch text-[#d97706] uppercase tracking-wider">ניסיון</h2>
            </div>
            <div className="space-y-10">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-xl font-bold font-rubik-glitch text-[#d97706] mb-5 pb-2 border-b-2 border-[#78716c]/30">
                    {section.title}
                  </h3>
                  <div className="relative pr-6 space-y-6">
                    <div className="absolute right-1.5 top-1 bottom-0 w-0.5 bg-[#78716c]/30" />
                    {section.entries.map((entry, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -right-[0.6rem] top-1.5 w-2.5 h-2.5 bg-[#d97706] border-2 border-[#2b2118]" />
                        <div className="bg-[#3a3028] p-4 border border-[#78716c]/15">
                          <div className="flex justify-between items-start gap-4">
                            <p className="font-bold text-[#d4c5a0]">{entry.title}</p>
                            {entry.dateRange && (
                              <span className="text-[10px] text-[#d97706] bg-[#d97706]/10 px-2 py-0.5 shrink-0 uppercase">{entry.dateRange}</span>
                            )}
                          </div>
                          {entry.subtitle && <p className="text-sm text-[#78716c] mt-0.5">{entry.subtitle}</p>}
                          {entry.description && <p className="text-sm text-[#d4c5a0]/40 mt-2 leading-relaxed">{entry.description}</p>}
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
        <footer id="contact" className="scroll-mt-16 border-t-4 border-[#d97706] pt-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#78716c]" />
            <h2 className="text-2xl font-bold font-rubik-glitch text-[#d97706] uppercase tracking-wider">צור קשר</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 bg-[#d97706] text-[#1c1008] px-5 py-2.5 text-sm font-bold hover:bg-[#f59e0b] transition-colors">
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 bg-[#3a3028] border-2 border-[#78716c]/30 px-5 py-2.5 text-sm hover:border-[#d97706] transition-colors">
                <Phone className="h-4 w-4 text-[#d97706]" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#3a3028] border-2 border-[#78716c]/30 px-5 py-2.5 text-sm hover:border-[#d97706] transition-colors">
                <Globe className="h-4 w-4 text-[#d97706]" /> אתר אישי
              </a>
            )}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-4 mt-6">
              {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#78716c] hover:text-[#d97706] flex items-center gap-1.5 transition-colors">
                  <ExternalLink className="h-3 w-3" /> {key}
                </a>
              ))}
            </div>
          )}
          <p className="text-xs text-[#78716c]/30 mt-12 text-center">{student.name} &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
