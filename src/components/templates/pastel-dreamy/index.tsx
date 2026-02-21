"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function PastelDreamy({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#fce4ec] via-[#f3e5f5] to-[#e8f5e9] text-[#4a4a5a] font-assistant scroll-smooth"
      dir="rtl"
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/40 backdrop-blur-md border-b border-white/50">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-sm font-varela-round font-bold text-[#9c6b98]">
            {student.name}
          </span>
          <div className="flex items-center gap-6">
            {[
              { id: "about", label: "אודות" },
              { id: "projects", label: "פרויקטים" },
              { id: "cv", label: "קורות חיים" },
              { id: "contact", label: "צור קשר" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-[#9c6b98]/60 hover:text-[#9c6b98] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 py-20 text-center">
        {student.image && (
          <div className="relative inline-block mb-8">
            <img
              src={student.image}
              alt={student.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-white/80 shadow-xl"
            />
            {/* Floating decorative circles */}
            <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-[#fce4ec]/80 -z-10" />
            <div className="absolute -bottom-2 -right-4 w-8 h-8 rounded-full bg-[#e8f5e9]/80 -z-10" />
            <div className="absolute top-1/2 -right-6 w-6 h-6 rounded-full bg-[#f3e5f5]/80 -z-10" />
          </div>
        )}
        <h1 className="text-5xl md:text-6xl font-varela-round font-bold text-[#7b5ea7] leading-tight">
          {student.name}
        </h1>
        {about.subtitle && (
          <p className="text-xl text-[#9c6b98]/70 mt-4 font-light">
            {about.subtitle}
          </p>
        )}
      </header>

      <div className="max-w-5xl mx-auto px-6">
        {/* About */}
        {about.body && (
          <section id="about" className="py-14 scroll-mt-20">
            <h2 className="text-2xl font-varela-round font-bold text-[#7b5ea7] mb-6 text-center">
              {about.title || "אודות"}
            </h2>
            <div className="bg-white/50 backdrop-blur-sm rounded-[2rem] p-8 shadow-sm max-w-3xl mx-auto">
              <p className="text-[#4a4a5a]/80 leading-relaxed whitespace-pre-line text-lg text-center">
                {about.body}
              </p>
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" className="py-14 scroll-mt-20">
            <h2 className="text-2xl font-varela-round font-bold text-[#7b5ea7] mb-10 text-center">
              פרויקטים
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white/60 backdrop-blur-sm rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {project.thumbnailUrl && (
                    <div className="relative">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-44 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-varela-round font-bold text-[#7b5ea7]">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-[#4a4a5a]/60 text-sm mt-2 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gradient-to-r from-[#fce4ec] to-[#f3e5f5] text-[#9c6b98] px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.media.length > 0 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto">
                        {project.media.slice(0, 3).map((m) => (
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
                                className="w-16 h-16 object-cover rounded-xl"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-white/50 rounded-xl flex items-center justify-center text-[9px] text-[#9c6b98]/40">
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

        {/* CV */}
        {cvSections.length > 0 && (
          <section id="cv" className="py-14 scroll-mt-20">
            <h2 className="text-2xl font-varela-round font-bold text-[#7b5ea7] mb-10 text-center">
              קורות חיים
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              {cvSections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white/50 backdrop-blur-sm rounded-[1.5rem] p-8 shadow-sm"
                >
                  <h3 className="text-lg font-varela-round font-bold text-[#9c6b98] mb-5">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, i) => (
                      <div
                        key={i}
                        className="flex gap-4 pb-4 border-b border-[#f3e5f5] last:border-0 last:pb-0"
                      >
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#fce4ec] to-[#f3e5f5] mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-baseline justify-between gap-2">
                            <p className="font-medium text-[#4a4a5a]">
                              {entry.title}
                            </p>
                            {entry.dateRange && (
                              <span className="text-xs text-[#9c6b98]/40 shrink-0">
                                {entry.dateRange}
                              </span>
                            )}
                          </div>
                          {entry.subtitle && (
                            <p className="text-sm text-[#9c6b98]/60 mt-0.5">
                              {entry.subtitle}
                            </p>
                          )}
                          {entry.description && (
                            <p className="text-sm text-[#4a4a5a]/50 mt-1 leading-relaxed">
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

        {/* Contact */}
        <footer
          id="contact"
          className="py-14 border-t border-white/50 scroll-mt-20"
        >
          <h2 className="text-2xl font-varela-round font-bold text-[#7b5ea7] mb-8 text-center">
            צור קשר
          </h2>
          <div className="bg-white/50 backdrop-blur-sm rounded-[1.5rem] p-8 shadow-sm max-w-2xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-[#9c6b98]/70 hover:text-[#7b5ea7] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 text-[#9c6b98]/70 hover:text-[#7b5ea7] transition-colors"
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
                  className="flex items-center gap-2 text-[#9c6b98]/70 hover:text-[#7b5ea7] transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  אתר
                </a>
              )}
            </div>
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t border-[#f3e5f5]">
                {Object.entries(socialLinks)
                  .filter(([, v]) => v)
                  .map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#9c6b98]/40 hover:text-[#7b5ea7] transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {key}
                    </a>
                  ))}
              </div>
            )}
          </div>
          <p className="text-xs text-[#9c6b98]/30 mt-10 text-center">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
