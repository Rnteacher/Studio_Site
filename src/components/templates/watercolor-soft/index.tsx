"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "צור קשר" },
];

export default function WatercolorSoft({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#e0f2fe] via-white to-[#f0fdf4] text-slate-700 font-assistant scroll-smooth"
      dir="rtl"
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-sky-100">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-suez-one text-lg text-sky-700">
            {student.name}
          </span>
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-slate-400 hover:text-sky-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header id="about" className="scroll-mt-14 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            {student.image && (
              <div className="relative mb-8">
                {/* Watercolor blob effect behind image */}
                <div className="absolute -inset-4 bg-gradient-to-br from-sky-200/60 via-teal-100/40 to-emerald-200/60 rounded-full blur-2xl" />
                <img
                  src={student.image}
                  alt={student.name}
                  className="relative w-40 h-40 md:w-52 md:h-52 object-cover rounded-full border-4 border-white shadow-lg"
                />
              </div>
            )}
            <h1 className="font-suez-one text-4xl md:text-6xl text-slate-800 leading-tight">
              {student.name}
            </h1>
            {about.subtitle && (
              <p className="text-lg text-sky-600/70 mt-3">
                {about.subtitle}
              </p>
            )}
            <div className="w-20 h-0.5 bg-gradient-to-l from-sky-300 via-teal-200 to-emerald-300 mt-6 rounded-full" />
          </div>

          {about.body && (
            <div className="mt-14 max-w-2xl mx-auto">
              <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-sky-100/50">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-sky-100/50 to-transparent rounded-tr-2xl rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-emerald-100/50 to-transparent rounded-bl-2xl rounded-tr-full" />
                <p className="relative text-slate-600 leading-[1.9] whitespace-pre-line">
                  {about.body}
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Projects */}
      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-20 pb-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-suez-one text-3xl md:text-4xl text-slate-700 text-center mb-2">
              פרויקטים
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-l from-sky-300 to-teal-300 mx-auto rounded-full mb-12" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, idx) => {
                const accents = [
                  "from-sky-100/70 to-sky-50/30",
                  "from-teal-100/70 to-teal-50/30",
                  "from-emerald-100/70 to-emerald-50/30",
                  "from-cyan-100/70 to-cyan-50/30",
                ];
                return (
                  <div
                    key={project.id}
                    className={`bg-gradient-to-br ${accents[idx % accents.length]} backdrop-blur-sm rounded-2xl overflow-hidden border border-white/80 shadow-sm hover:shadow-md transition-shadow`}
                  >
                    {project.media[0]?.thumbnailUrl && (
                      <a
                        href={project.media[0].webViewUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={project.media[0].thumbnailUrl}
                          alt={project.title}
                          className="w-full h-44 object-cover"
                        />
                      </a>
                    )}
                    <div className="p-6">
                      <h3 className="font-suez-one text-xl text-slate-800">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-white/70 text-sky-600 px-2.5 py-0.5 rounded-full border border-sky-200/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.media.length > 1 && (
                        <div className="flex gap-2 mt-4 overflow-x-auto">
                          {project.media.slice(1, 5).map((m) => (
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
                                  className="w-14 h-14 object-cover rounded-lg border border-white shadow-sm"
                                />
                              ) : (
                                <div className="w-14 h-14 bg-white/60 rounded-lg border border-sky-100 flex items-center justify-center text-[8px] text-slate-400">
                                  {m.fileName}
                                </div>
                              )}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CV */}
      {cvSections.length > 0 && (
        <section id="cv" className="scroll-mt-20 pb-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="font-suez-one text-3xl md:text-4xl text-slate-700 text-center mb-2">
              קורות חיים
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-l from-teal-300 to-emerald-300 mx-auto rounded-full mb-12" />

            <div className="max-w-3xl mx-auto space-y-10">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="font-suez-one text-xl text-sky-700 mb-5">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, i) => (
                      <div
                        key={i}
                        className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-sky-100/50"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-sm font-semibold text-slate-700">
                            {entry.title}
                          </p>
                          {entry.dateRange && (
                            <span className="text-xs text-sky-400 shrink-0">
                              {entry.dateRange}
                            </span>
                          )}
                        </div>
                        {entry.subtitle && (
                          <p className="text-xs text-slate-400 mt-1">
                            {entry.subtitle}
                          </p>
                        )}
                        {entry.description && (
                          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
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
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-suez-one text-3xl md:text-4xl text-slate-700 text-center mb-2">
            צור קשר
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-l from-sky-300 to-emerald-300 mx-auto rounded-full mb-10" />

          <div className="flex flex-wrap justify-center gap-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 text-sm text-slate-600 border border-sky-100 hover:border-sky-300 hover:shadow-sm transition-all"
              >
                <Mail className="h-4 w-4 text-sky-500" />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 text-sm text-slate-600 border border-teal-100 hover:border-teal-300 hover:shadow-sm transition-all"
              >
                <Phone className="h-4 w-4 text-teal-500" />
                {contact.phone}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-6 py-3 text-sm text-slate-600 border border-emerald-100 hover:border-emerald-300 hover:shadow-sm transition-all"
              >
                <Globe className="h-4 w-4 text-emerald-500" />
                אתר
              </a>
            )}
          </div>

          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {Object.entries(socialLinks)
                .filter(([, v]) => v)
                .map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-sky-500 transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {key}
                  </a>
                ))}
            </div>
          )}

          <p className="text-xs text-slate-300 mt-12 text-center">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
