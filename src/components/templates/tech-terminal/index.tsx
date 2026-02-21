"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function TechTerminal({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-[#b0b0b0] font-heebo scroll-smooth selection:bg-[#00ff41]/20"
      dir="rtl"
    >
      {/* Top bar */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#00ff41]/20">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-12">
          <span className="font-mono text-[#00ff41] text-sm">
            ~/portfolio/{student.name.replace(/\s+/g, "_")}
          </span>
          <div className="flex items-center gap-6">
            {[
              { id: "about", label: "אודות" },
              { id: "projects", label: "פרויקטים" },
              { id: "cv", label: "קורות_חיים" },
              { id: "contact", label: "צור_קשר" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="font-mono text-xs text-[#b0b0b0]/50 hover:text-[#00ff41] transition-colors"
              >
                ./{item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row-reverse items-start gap-10">
          {student.image && (
            <img
              src={student.image}
              alt={student.name}
              className="w-36 h-36 object-cover border border-[#00ff41]/30 grayscale hover:grayscale-0 transition-all"
            />
          )}
          <div className="flex-1">
            <p className="font-mono text-[#00ff41]/50 text-sm mb-2">
              $ whoami
            </p>
            <h1 className="text-4xl md:text-5xl font-mono font-bold text-[#00ff41] leading-tight">
              {student.name}
            </h1>
            {about.subtitle && (
              <p className="font-mono text-[#b0b0b0]/60 mt-3 text-lg">
                {`// ${about.subtitle}`}
              </p>
            )}
            <div className="mt-4 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00ff41] animate-pulse" />
              <span className="font-mono text-xs text-[#00ff41]/60">
                online
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6">
        {/* About */}
        {about.body && (
          <section id="about" className="py-12 scroll-mt-16">
            <h2 className="font-mono text-lg text-[#00ff41] mb-6">
              <span className="text-[#00ff41]/40">&gt; </span>
              {about.title || "אודות"}
            </h2>
            <div className="border border-[#00ff41]/10 bg-[#0f0f0f] p-6">
              <p className="text-[#b0b0b0]/80 leading-relaxed whitespace-pre-line font-mono text-sm">
                {about.body}
              </p>
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" className="py-12 scroll-mt-16">
            <h2 className="font-mono text-lg text-[#00ff41] mb-6">
              <span className="text-[#00ff41]/40">&gt; </span>
              פרויקטים
              <span className="text-[#00ff41]/30 text-sm mr-3">
                [{projects.length}]
              </span>
            </h2>
            <div className="space-y-4">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="border border-[#00ff41]/10 bg-[#0f0f0f] p-6 hover:border-[#00ff41]/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[#00ff41]/40 text-xs">
                          [{String(idx).padStart(2, "0")}]
                        </span>
                        <h3 className="font-mono text-[#00ff41] font-bold text-lg">
                          {project.title}
                        </h3>
                      </div>
                      {project.description && (
                        <p className="text-[#b0b0b0]/50 text-sm mt-2 leading-relaxed mr-10 font-mono">
                          {project.description}
                        </p>
                      )}
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3 mr-10">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-xs text-[#00ff41]/50 border border-[#00ff41]/15 px-2 py-0.5"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {project.thumbnailUrl && (
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-28 h-20 object-cover border border-[#00ff41]/20 grayscale hover:grayscale-0 transition-all shrink-0"
                      />
                    )}
                  </div>
                  {project.media.length > 0 && (
                    <div className="flex gap-2 mt-4 mr-10 overflow-x-auto">
                      {project.media.slice(0, 4).map((m) => (
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
                              className="w-16 h-16 object-cover border border-[#00ff41]/15 grayscale hover:grayscale-0 transition-all"
                            />
                          ) : (
                            <div className="w-16 h-16 border border-[#00ff41]/15 flex items-center justify-center font-mono text-[8px] text-[#00ff41]/30">
                              {m.fileName}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CV */}
        {cvSections.length > 0 && (
          <section id="cv" className="py-12 scroll-mt-16">
            <h2 className="font-mono text-lg text-[#00ff41] mb-6">
              <span className="text-[#00ff41]/40">&gt; </span>
              קורות חיים
            </h2>
            <div className="space-y-6">
              {cvSections.map((section) => (
                <div
                  key={section.id}
                  className="border border-[#00ff41]/10 bg-[#0f0f0f] p-6"
                >
                  <h3 className="font-mono text-[#00ff41]/70 font-bold mb-4 text-sm">
                    --- {section.title} ---
                  </h3>
                  <div className="space-y-3">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="flex gap-4 font-mono text-sm">
                        <span className="text-[#00ff41]/30 shrink-0">
                          {entry.dateRange || "---"}
                        </span>
                        <div>
                          <p className="text-[#b0b0b0]">{entry.title}</p>
                          {entry.subtitle && (
                            <p className="text-[#b0b0b0]/40 text-xs mt-0.5">
                              {entry.subtitle}
                            </p>
                          )}
                          {entry.description && (
                            <p className="text-[#b0b0b0]/30 text-xs mt-1 leading-relaxed">
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
          className="py-12 border-t border-[#00ff41]/10 scroll-mt-16"
        >
          <h2 className="font-mono text-lg text-[#00ff41] mb-6">
            <span className="text-[#00ff41]/40">&gt; </span>
            צור קשר
          </h2>
          <div className="border border-[#00ff41]/10 bg-[#0f0f0f] p-6 font-mono text-sm">
            <div className="space-y-2">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-[#b0b0b0]/60 hover:text-[#00ff41] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>email: {contact.email}</span>
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-[#b0b0b0]/60 hover:text-[#00ff41] transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>phone: {contact.phone}</span>
                </a>
              )}
              {contact.website && (
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#b0b0b0]/60 hover:text-[#00ff41] transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  <span>web: אתר</span>
                </a>
              )}
            </div>
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-[#00ff41]/10">
                {Object.entries(socialLinks)
                  .filter(([, v]) => v)
                  .map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#b0b0b0]/40 hover:text-[#00ff41] transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {key}
                    </a>
                  ))}
              </div>
            )}
          </div>
          <p className="font-mono text-xs text-[#00ff41]/20 mt-8 text-center">
            $ echo &quot;{student.name} &copy; {new Date().getFullYear()}&quot;
          </p>
        </footer>
      </div>
    </div>
  );
}
