"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "יצירת קשר" },
];

export default function ClassicGrid({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-heebo scroll-smooth" dir="rtl">
      {/* Sticky Top Nav */}
      <nav className="sticky top-0 z-50 bg-slate-700 shadow-md">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-rubik font-bold text-white text-sm truncate">
            {student.name}
          </span>
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero — Full width, centered content */}
      <header className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-6">
          {student.image && (
            <img
              src={student.image}
              alt={student.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          )}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-rubik text-slate-900">
              {student.name}
            </h1>
            {about.subtitle && (
              <p className="text-lg text-slate-500 mt-3">{about.subtitle}</p>
            )}
          </div>
          {/* Quick contact links */}
          <div className="flex items-center gap-5 mt-2">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="text-slate-400 hover:text-slate-700 transition-colors"
                title={contact.email}
              >
                <Mail className="h-5 w-5" />
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="text-slate-400 hover:text-slate-700 transition-colors"
                title={contact.phone}
              >
                <Phone className="h-5 w-5" />
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-700 transition-colors"
                title="אתר אישי"
              >
                <Globe className="h-5 w-5" />
              </a>
            )}
            {Object.entries(socialLinks)
              .filter(([, v]) => v)
              .map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-700 transition-colors"
                  title={key}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
          </div>
        </div>
      </header>

      {/* About */}
      <section id="about" className="scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold font-rubik text-slate-900 mb-2">
            אודות
          </h2>
          <div className="w-12 h-1 bg-slate-600 mb-8 rounded-full" />
          <div className="max-w-3xl">
            {about.title && about.title !== student.name && (
              <h3 className="text-lg font-semibold text-slate-700 mb-3">
                {about.title}
              </h3>
            )}
            {about.body && (
              <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">
                {about.body}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Projects — CSS Grid */}
      {projects.length > 0 && (
        <section id="projects" className="bg-slate-50 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold font-rubik text-slate-900 mb-2">
              פרויקטים
            </h2>
            <div className="w-12 h-1 bg-slate-600 mb-10 rounded-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  {/* Card thumbnail */}
                  {project.media[0]?.thumbnailUrl ? (
                    <img
                      src={project.media[0].thumbnailUrl}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-slate-100 flex items-center justify-center">
                      <span className="text-slate-300 text-sm">
                        {project.title}
                      </span>
                    </div>
                  )}
                  {/* Card content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold font-rubik text-slate-900 mb-2">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Additional media thumbnails */}
                    {project.media.length > 1 && (
                      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100 overflow-x-auto">
                        {project.media.slice(1, 5).map((m) => (
                          <a
                            key={m.id}
                            href={m.webViewUrl ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 rounded overflow-hidden hover:opacity-80 transition-opacity"
                          >
                            {m.thumbnailUrl ? (
                              <img
                                src={m.thumbnailUrl}
                                alt={m.fileName}
                                className="w-14 h-14 object-cover"
                              />
                            ) : (
                              <div className="w-14 h-14 bg-slate-50 flex items-center justify-center text-[9px] text-slate-400 border border-slate-200">
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

      {/* CV — 2-column grid layout on desktop */}
      {cvSections.length > 0 && (
        <section id="cv" className="scroll-mt-16">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold font-rubik text-slate-900 mb-2">
              קורות חיים
            </h2>
            <div className="w-12 h-1 bg-slate-600 mb-10 rounded-full" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
              {cvSections.map((section) => (
                <div
                  key={section.id}
                  className="bg-slate-50 rounded-lg p-6 border border-slate-200"
                >
                  <h3 className="text-lg font-bold font-rubik text-slate-800 mb-5 pb-3 border-b border-slate-200">
                    {section.title}
                  </h3>
                  <div className="space-y-5">
                    {section.entries.map((entry, i) => (
                      <div key={i}>
                        <div className="flex items-start justify-between gap-4">
                          <p className="font-medium text-slate-800">
                            {entry.title}
                          </p>
                          {entry.dateRange && (
                            <span className="text-xs text-slate-400 whitespace-nowrap bg-white px-2 py-1 rounded border border-slate-200 shrink-0">
                              {entry.dateRange}
                            </span>
                          )}
                        </div>
                        {entry.subtitle && (
                          <p className="text-sm text-slate-500 mt-0.5">
                            {entry.subtitle}
                          </p>
                        )}
                        {entry.description && (
                          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
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

      {/* Contact / Footer */}
      <footer id="contact" className="bg-slate-700 text-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold font-rubik mb-2">יצירת קשר</h2>
          <div className="w-12 h-1 bg-white/30 mb-8 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">אימייל</p>
                  <p className="text-sm">{contact.email}</p>
                </div>
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">טלפון</p>
                  <p className="text-sm">{contact.phone}</p>
                </div>
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">אתר</p>
                  <p className="text-sm">אתר אישי</p>
                </div>
              </a>
            )}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-white/10">
              {Object.entries(socialLinks)
                .filter(([, v]) => v)
                .map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {key}
                  </a>
                ))}
            </div>
          )}
          <p className="text-xs text-slate-500 mt-10">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
