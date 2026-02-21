"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "צור קשר" },
];

export default function GeometricSharp({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-[#1a1a2e] text-white font-rubik scroll-smooth"
      dir="rtl"
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-sm border-b border-orange-500/30">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-secular-one text-lg text-orange-400">
            {student.name}
          </span>
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-white/50 hover:text-orange-400 transition-colors uppercase tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero — Diagonal split layout */}
      <header id="about" className="scroll-mt-14 relative overflow-hidden">
        {/* Diagonal background */}
        <div
          className="absolute inset-0 bg-orange-500"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 40%, 0 70%)",
          }}
        />
        <div
          className="absolute inset-0 bg-orange-600/50"
          style={{
            clipPath: "polygon(100% 0, 100% 55%, 0 85%, 0 20%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {student.image && (
              <div className="shrink-0">
                <div
                  className="w-44 h-44 md:w-56 md:h-56 overflow-hidden border-4 border-white shadow-2xl"
                  style={{
                    clipPath:
                      "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                  }}
                >
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className="text-center md:text-right flex-1">
              <h1 className="font-secular-one text-5xl md:text-7xl leading-tight text-white drop-shadow-lg">
                {student.name}
              </h1>
              {about.subtitle && (
                <p className="text-xl text-white/80 mt-3 font-light">
                  {about.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* About section */}
      {about.body && (
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative bg-white/5 border border-white/10 p-8 md:p-10">
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-orange-500" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-orange-500" />
              <p className="text-white/70 leading-[1.9] whitespace-pre-line text-base">
                {about.body}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-20 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
              <div
                className="w-10 h-10 bg-orange-500"
                style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
              />
              <h2 className="font-secular-one text-3xl md:text-4xl text-white">
                פרויקטים
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-orange-500/50 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="group relative bg-white/5 border border-white/10 overflow-hidden hover:border-orange-500/50 transition-colors"
                >
                  {/* Top accent bar */}
                  <div
                    className="h-1 bg-gradient-to-l from-orange-500 to-orange-300"
                    style={{ width: `${60 + (idx % 4) * 10}%` }}
                  />

                  {project.media[0]?.thumbnailUrl && (
                    <a
                      href={project.media[0].webViewUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={project.media[0].thumbnailUrl}
                        alt={project.title}
                        className="w-full h-40 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  )}

                  <div className="p-5">
                    <h3 className="font-secular-one text-lg text-white">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-white/50 text-sm mt-2 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.media.length > 1 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto">
                        {project.media.slice(1, 4).map((m) => (
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
                                className="w-14 h-14 object-cover border border-white/10 hover:border-orange-500 transition-colors"
                              />
                            ) : (
                              <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-[8px] text-white/30">
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
          </div>
        </section>
      )}

      {/* CV */}
      {cvSections.length > 0 && (
        <section id="cv" className="scroll-mt-20 pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
              <div
                className="w-10 h-10 bg-orange-500"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 50%)" }}
              />
              <h2 className="font-secular-one text-3xl md:text-4xl text-white">
                קורות חיים
              </h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-orange-500/50 to-transparent" />
            </div>

            <div className="space-y-10">
              {cvSections.map((section) => (
                <div key={section.id} className="relative pr-6 border-r-2 border-orange-500/40">
                  <div className="absolute top-0 right-[-5px] w-2 h-2 bg-orange-500 rotate-45" />
                  <h3 className="font-secular-one text-xl text-orange-400 mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-sm font-semibold text-white">
                            {entry.title}
                          </p>
                          {entry.dateRange && (
                            <span className="text-xs text-orange-300/70 shrink-0">
                              {entry.dateRange}
                            </span>
                          )}
                        </div>
                        {entry.subtitle && (
                          <p className="text-xs text-white/40 mt-1">
                            {entry.subtitle}
                          </p>
                        )}
                        {entry.description && (
                          <p className="text-xs text-white/50 mt-2 leading-relaxed">
                            {entry.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <footer id="contact" className="scroll-mt-20 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <div
              className="w-10 h-10 bg-orange-500"
              style={{ clipPath: "polygon(0 50%, 50% 0, 100% 50%, 50% 100%)" }}
            />
            <h2 className="font-secular-one text-3xl md:text-4xl text-white">
              צור קשר
            </h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-orange-500/50 to-transparent" />
          </div>

          <div className="flex flex-wrap gap-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-5 py-3 text-sm text-orange-300 hover:bg-orange-500/20 transition-colors"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-5 py-3 text-sm text-orange-300 hover:bg-orange-500/20 transition-colors"
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
                className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 px-5 py-3 text-sm text-orange-300 hover:bg-orange-500/20 transition-colors"
              >
                <Globe className="h-4 w-4" />
                אתר
              </a>
            )}
          </div>

          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-3 mt-6">
              {Object.entries(socialLinks)
                .filter(([, v]) => v)
                .map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/30 hover:text-orange-400 transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {key}
                  </a>
                ))}
            </div>
          )}

          <div className="mt-16 pt-4 border-t border-white/10">
            <p className="text-xs text-white/20 text-center">
              {student.name} &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
