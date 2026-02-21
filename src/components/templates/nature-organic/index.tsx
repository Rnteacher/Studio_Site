"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function NatureOrganic({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-[#f0f7e6] text-[#2d5016] font-varela-round scroll-smooth"
      dir="rtl"
    >
      {/* Decorative leaf top-corner */}
      <div className="fixed top-0 left-0 w-40 h-40 opacity-10 pointer-events-none">
        <div className="w-32 h-32 rounded-full bg-[#2d5016] translate-x-[-40%] translate-y-[-40%]" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#f0f7e6]/90 backdrop-blur-sm border-b border-[#2d5016]/10">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-sm font-frank-ruhl font-bold text-[#2d5016]/60">
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
                className="text-sm text-[#2d5016]/50 hover:text-[#2d5016] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row-reverse items-center gap-10">
        <div className="relative">
          {student.image && (
            <img
              src={student.image}
              alt={student.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-[#2d5016]/20 shadow-lg"
            />
          )}
          {/* Leaf decoration behind image */}
          <div className="absolute -z-10 top-4 right-4 w-48 h-48 rounded-full bg-[#2d5016]/10" />
        </div>
        <div className="text-center md:text-right flex-1">
          <h1 className="text-5xl md:text-6xl font-frank-ruhl font-bold leading-tight">
            {student.name}
          </h1>
          {about.subtitle && (
            <p className="text-xl text-[#2d5016]/60 mt-3">{about.subtitle}</p>
          )}
        </div>
      </header>

      {/* Organic divider */}
      <div className="flex justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#2d5016]/20" />
          <div className="w-3 h-3 rounded-full bg-[#2d5016]/30" />
          <div className="w-3 h-3 rounded-full bg-[#2d5016]/20" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* About */}
        {about.body && (
          <section id="about" className="py-16 scroll-mt-20">
            <h2 className="text-2xl font-frank-ruhl font-bold mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-8 rounded-full bg-[#2d5016]/10 flex items-center justify-center text-sm">
                ~
              </span>
              {about.title || "אודות"}
            </h2>
            <div className="bg-white/60 rounded-3xl p-8 shadow-sm border border-[#2d5016]/5">
              <p className="text-[#2d5016]/80 leading-relaxed whitespace-pre-line text-lg">
                {about.body}
              </p>
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" className="py-16 scroll-mt-20">
            <h2 className="text-2xl font-frank-ruhl font-bold mb-8 flex items-center gap-3">
              <span className="inline-block w-8 h-8 rounded-full bg-[#2d5016]/10 flex items-center justify-center text-sm">
                ~
              </span>
              פרויקטים
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white/70 rounded-3xl overflow-hidden shadow-sm border border-[#2d5016]/5 hover:shadow-md transition-shadow"
                >
                  {project.thumbnailUrl && (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-frank-ruhl font-bold">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-[#2d5016]/60 text-sm mt-2 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-[#2d5016]/10 text-[#2d5016]/70 px-3 py-1 rounded-full"
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
                                className="w-20 h-20 object-cover rounded-2xl"
                              />
                            ) : (
                              <div className="w-20 h-20 bg-[#2d5016]/5 rounded-2xl flex items-center justify-center text-[10px] text-[#2d5016]/40">
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
          <section id="cv" className="py-16 scroll-mt-20">
            <h2 className="text-2xl font-frank-ruhl font-bold mb-8 flex items-center gap-3">
              <span className="inline-block w-8 h-8 rounded-full bg-[#2d5016]/10 flex items-center justify-center text-sm">
                ~
              </span>
              קורות חיים
            </h2>
            <div className="space-y-10">
              {cvSections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white/60 rounded-3xl p-8 shadow-sm border border-[#2d5016]/5"
                >
                  <h3 className="text-lg font-frank-ruhl font-bold text-[#2d5016]/80 mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, i) => (
                      <div
                        key={i}
                        className="flex gap-4 pb-4 border-b border-[#2d5016]/5 last:border-0 last:pb-0"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#2d5016]/30 mt-2 shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium">{entry.title}</p>
                          {entry.subtitle && (
                            <p className="text-sm text-[#2d5016]/50 mt-0.5">
                              {entry.subtitle}
                            </p>
                          )}
                          {entry.description && (
                            <p className="text-sm text-[#2d5016]/50 mt-1 leading-relaxed">
                              {entry.description}
                            </p>
                          )}
                        </div>
                        {entry.dateRange && (
                          <span className="text-xs text-[#2d5016]/40 shrink-0 pt-1">
                            {entry.dateRange}
                          </span>
                        )}
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
          className="py-16 border-t border-[#2d5016]/10 scroll-mt-20"
        >
          <h2 className="text-2xl font-frank-ruhl font-bold mb-8 flex items-center gap-3">
            <span className="inline-block w-8 h-8 rounded-full bg-[#2d5016]/10 flex items-center justify-center text-sm">
              ~
            </span>
            צור קשר
          </h2>
          <div className="bg-white/60 rounded-3xl p-8 shadow-sm border border-[#2d5016]/5">
            <div className="flex flex-wrap gap-8 text-sm">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-[#2d5016]/60 hover:text-[#2d5016] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 text-[#2d5016]/60 hover:text-[#2d5016] transition-colors"
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
                  className="flex items-center gap-2 text-[#2d5016]/60 hover:text-[#2d5016] transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  אתר
                </a>
              )}
            </div>
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-[#2d5016]/5">
                {Object.entries(socialLinks)
                  .filter(([, v]) => v)
                  .map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#2d5016]/40 hover:text-[#2d5016] transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {key}
                    </a>
                  ))}
              </div>
            )}
          </div>
          <p className="text-xs text-[#2d5016]/30 mt-8 text-center">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
