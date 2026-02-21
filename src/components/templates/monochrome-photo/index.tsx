"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "צור קשר" },
];

export default function MonochromePhoto({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-white text-neutral-900 font-frank-ruhl scroll-smooth"
      dir="rtl"
    >
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-sm font-bold tracking-wide text-neutral-400">
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

      {/* Hero — full-width image bg */}
      <header className="relative">
        {student.image && (
          <div className="h-[60vh] min-h-[400px] overflow-hidden">
            <img
              src={student.image}
              alt={student.name}
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </div>
        )}
        <div className={`${student.image ? "absolute bottom-0 left-0 right-0" : ""} max-w-5xl mx-auto px-6 pb-12`}>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-lg">
            {student.name}
          </h1>
          {about.subtitle && (
            <p className="text-xl text-white/70 mt-3 drop-shadow">
              {about.subtitle}
            </p>
          )}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        {/* About */}
        {about.body && (
          <section id="about" className="py-16 scroll-mt-16">
            <h2 className="text-3xl font-bold mb-6">
              {about.title || "אודות"}
            </h2>
            <div className="border-r-2 border-neutral-300 pr-6">
              <p className="text-neutral-600 leading-[1.9] whitespace-pre-line text-lg font-heebo">
                {about.body}
              </p>
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" className="py-16 scroll-mt-16">
            <h2 className="text-3xl font-bold mb-10">פרויקטים</h2>
            <div className="space-y-16">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-start`}
                >
                  {project.thumbnailUrl && (
                    <div className="w-full md:w-1/2 shrink-0">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full aspect-[4/3] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    {project.description && (
                      <p className="text-neutral-500 mt-3 leading-relaxed font-heebo">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-neutral-400 border border-neutral-200 px-3 py-1"
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
                                className="w-20 h-20 object-cover grayscale hover:grayscale-0 transition-all"
                              />
                            ) : (
                              <div className="w-20 h-20 bg-neutral-100 flex items-center justify-center text-[9px] text-neutral-400">
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
            <h2 className="text-3xl font-bold mb-10">קורות חיים</h2>
            <div className="space-y-12">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-xl font-bold text-neutral-700 mb-4 pb-2 border-b border-neutral-200">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="flex gap-6">
                        {entry.dateRange && (
                          <span className="text-sm text-neutral-400 w-28 shrink-0 pt-0.5 text-left font-heebo">
                            {entry.dateRange}
                          </span>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold">{entry.title}</p>
                          {entry.subtitle && (
                            <p className="text-sm text-neutral-400 mt-0.5 font-heebo">
                              {entry.subtitle}
                            </p>
                          )}
                          {entry.description && (
                            <p className="text-sm text-neutral-500 mt-1 leading-relaxed font-heebo">
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
        <footer id="contact" className="py-16 border-t border-neutral-200 scroll-mt-16">
          <h2 className="text-3xl font-bold mb-8">צור קשר</h2>
          <div className="flex flex-wrap gap-8 text-sm font-heebo text-neutral-500">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 hover:text-neutral-900 transition-colors"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 hover:text-neutral-900 transition-colors"
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
                className="flex items-center gap-2 hover:text-neutral-900 transition-colors"
              >
                <Globe className="h-4 w-4" />
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
                    className="text-sm text-neutral-400 hover:text-neutral-900 transition-colors flex items-center gap-1 font-heebo"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {key}
                  </a>
                ))}
            </div>
          )}
          <p className="text-xs text-neutral-300 mt-12 text-center font-heebo">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
