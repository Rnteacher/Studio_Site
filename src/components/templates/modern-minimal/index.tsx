"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "צור קשר" },
];

export default function ModernMinimal({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-heebo scroll-smooth" dir="rtl">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-sm font-rubik font-medium tracking-wide text-neutral-400">
            {student.name}
          </span>
          <div className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Banner — full-width image with name overlay */}
      <header id="about" className="relative">
        <div className="w-full aspect-[3/1] overflow-hidden bg-neutral-100">
          {student.image && (
            <img
              src={student.image}
              alt={student.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 right-0 left-0 p-6 md:p-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-rubik font-bold text-white tracking-tight">
              {student.name}
            </h1>
            {about.subtitle && (
              <p className="text-lg md:text-xl text-white/70 mt-2 font-light">
                {about.subtitle}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* About */}
      <div className="max-w-3xl mx-auto px-6 py-20">
        {about.body && (
          <section className="mb-20">
            <p className="text-neutral-500 text-lg leading-relaxed whitespace-pre-line">
              {about.body}
            </p>
            <div className="w-12 h-px bg-neutral-200 mt-10" />
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" className="mb-20 scroll-mt-20">
            <h2 className="text-xs uppercase tracking-[0.25em] text-neutral-300 mb-10 font-rubik">
              פרויקטים
            </h2>
            <div className="space-y-10">
              {projects.map((project) => (
                <div key={project.id} className="group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-rubik font-semibold tracking-tight">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-neutral-300 tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.media.length > 0 && (
                    <div className="flex gap-3 mt-4 overflow-x-auto">
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
                              className="w-24 h-24 object-cover rounded-sm grayscale hover:grayscale-0 transition-all"
                            />
                          ) : (
                            <div className="w-24 h-24 bg-neutral-50 rounded-sm flex items-center justify-center text-[10px] text-neutral-300">
                              {m.fileName}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                  <div className="border-b border-neutral-100 mt-10" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CV */}
        {cvSections.length > 0 && (
          <section id="cv" className="mb-20 scroll-mt-20">
            <h2 className="text-xs uppercase tracking-[0.25em] text-neutral-300 mb-10 font-rubik">
              קורות חיים
            </h2>
            <div className="space-y-12">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-sm font-rubik font-semibold mb-5 text-neutral-700">
                    {section.title}
                  </h3>
                  <div className="space-y-5">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="flex gap-6">
                        <span className="text-xs text-neutral-300 w-24 shrink-0 pt-0.5 text-left">
                          {entry.dateRange}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-neutral-800">
                            {entry.title}
                          </p>
                          {entry.subtitle && (
                            <p className="text-xs text-neutral-400 mt-0.5">
                              {entry.subtitle}
                            </p>
                          )}
                          {entry.description && (
                            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
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

        {/* Contact / Footer */}
        <footer id="contact" className="pt-10 border-t border-neutral-100 scroll-mt-20">
          <h2 className="text-xs uppercase tracking-[0.25em] text-neutral-300 mb-8 font-rubik">
            צור קשר
          </h2>
          <div className="flex flex-wrap gap-8 text-sm text-neutral-400">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 hover:text-neutral-900 transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 hover:text-neutral-900 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {contact.phone}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-neutral-900 transition-colors"
              >
                <Globe className="h-3.5 w-3.5" />
                אתר
              </a>
            )}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-4 mt-6">
              {Object.entries(socialLinks)
                .filter(([, v]) => v)
                .map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-300 hover:text-neutral-900 transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {key}
                  </a>
                ))}
            </div>
          )}
          <p className="text-xs text-neutral-200 mt-12">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
