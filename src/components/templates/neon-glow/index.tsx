"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "צור קשר" },
];

export default function NeonGlow({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-[#0a0a14] text-gray-300 font-rubik scroll-smooth selection:bg-[#ff00ff]/30"
      dir="rtl"
    >
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0a0a14]/90 backdrop-blur-md border-b border-[#ff00ff]/20">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-sm font-bold bg-gradient-to-l from-[#ff00ff] to-[#00ffff] bg-clip-text text-transparent">
            {student.name}
          </span>
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-gray-500 hover:text-[#00ffff] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          {student.image && (
            <div className="relative">
              <img
                src={student.image}
                alt={student.name}
                className="w-44 h-44 rounded-2xl object-cover border-2 border-[#ff00ff]/40"
                style={{ boxShadow: "0 0 30px rgba(255,0,255,0.3), 0 0 60px rgba(0,255,255,0.1)" }}
              />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#ff00ff]/20 to-[#00ffff]/20 -z-10 blur-sm" />
            </div>
          )}
          <div className="text-center md:text-right flex-1">
            <h1
              className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-l from-[#ff00ff] to-[#00ffff] bg-clip-text text-transparent"
              style={{ textShadow: "none" }}
            >
              {student.name}
            </h1>
            {about.subtitle && (
              <p className="text-lg text-gray-500 mt-3">{about.subtitle}</p>
            )}
          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-l from-transparent via-[#ff00ff]/40 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* About */}
        {about.body && (
          <section id="about" className="py-16 scroll-mt-16">
            <h2 className="text-2xl font-bold mb-6 text-[#00ffff]">
              {about.title || "אודות"}
            </h2>
            <div
              className="rounded-xl p-8 border border-[#ff00ff]/15 bg-[#12121f]"
              style={{ boxShadow: "inset 0 0 40px rgba(255,0,255,0.03)" }}
            >
              <p className="text-gray-400 leading-relaxed whitespace-pre-line text-lg">
                {about.body}
              </p>
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" className="py-16 scroll-mt-16">
            <h2 className="text-2xl font-bold mb-8 text-[#00ffff]">פרויקטים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl overflow-hidden border border-[#ff00ff]/10 bg-[#12121f] hover:border-[#ff00ff]/30 transition-all group"
                  style={{ boxShadow: "0 0 0 rgba(255,0,255,0)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(255,0,255,0.15)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 rgba(255,0,255,0)"; }}
                >
                  {project.thumbnailUrl && (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-44 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-gray-500 text-sm mt-2 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 rounded-full border border-[#00ffff]/20 text-[#00ffff]/60"
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
                                className="w-16 h-16 object-cover rounded-lg border border-[#ff00ff]/20"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-lg border border-[#ff00ff]/20 flex items-center justify-center text-[8px] text-gray-600">
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
          <section id="cv" className="py-16 scroll-mt-16">
            <h2 className="text-2xl font-bold mb-8 text-[#00ffff]">קורות חיים</h2>
            <div className="space-y-8">
              {cvSections.map((section) => (
                <div
                  key={section.id}
                  className="rounded-xl p-8 border border-[#ff00ff]/10 bg-[#12121f]"
                >
                  <h3 className="text-lg font-bold text-[#ff00ff]/80 mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, i) => (
                      <div
                        key={i}
                        className="flex gap-4 pb-4 border-b border-gray-800/50 last:border-0 last:pb-0"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#00ffff]/40 mt-2 shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium text-white">{entry.title}</p>
                          {entry.subtitle && (
                            <p className="text-sm text-gray-500 mt-0.5">
                              {entry.subtitle}
                            </p>
                          )}
                          {entry.description && (
                            <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                              {entry.description}
                            </p>
                          )}
                        </div>
                        {entry.dateRange && (
                          <span className="text-xs text-[#00ffff]/40 shrink-0 pt-1">
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
        <footer id="contact" className="py-16 border-t border-[#ff00ff]/10 scroll-mt-16">
          <h2 className="text-2xl font-bold mb-8 text-[#00ffff]">צור קשר</h2>
          <div className="rounded-xl p-8 border border-[#ff00ff]/10 bg-[#12121f]">
            <div className="flex flex-wrap gap-8 text-sm">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-gray-500 hover:text-[#00ffff] transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 text-gray-500 hover:text-[#00ffff] transition-colors"
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
                  className="flex items-center gap-2 text-gray-500 hover:text-[#00ffff] transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  אתר
                </a>
              )}
            </div>
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-800/50">
                {Object.entries(socialLinks)
                  .filter(([, v]) => v)
                  .map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-[#ff00ff] transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {key}
                    </a>
                  ))}
              </div>
            )}
          </div>
          <p className="text-xs text-gray-700 mt-8 text-center">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
