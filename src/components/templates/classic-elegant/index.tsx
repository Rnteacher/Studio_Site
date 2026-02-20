"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function ClassicElegant({
  student,
  portfolio,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  isPreview,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-heebo scroll-smooth" dir="rtl">
      {/* Sticky Navigation - dark background */}
      <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-rubik font-bold text-white text-sm truncate">
            {student.name}
          </span>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">
              אודות
            </a>
            <a href="#projects" className="text-sm text-gray-400 hover:text-white transition-colors">
              פרויקטים
            </a>
            <a href="#cv" className="text-sm text-gray-400 hover:text-white transition-colors">
              קורות חיים
            </a>
            <a href="#contact" className="text-sm text-gray-400 hover:text-white transition-colors">
              יצירת קשר
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Header - Dark with side-by-side layout */}
      <header className="relative bg-gray-900 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {student.image && (
            <img
              src={student.image}
              alt={student.name}
              className="w-44 h-44 rounded-full object-cover border-4 border-white/10 shadow-2xl shrink-0"
            />
          )}
          <div className="text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-bold font-rubik mb-3">
              {student.name}
            </h1>
            {about.subtitle && (
              <p className="text-xl text-stone-300 mb-4">{about.subtitle}</p>
            )}
            {contact.email && (
              <p className="text-sm text-stone-500">{contact.email}</p>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* About - Two-column: image + text */}
        <section id="about">
          <h2 className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-8 font-rubik">
            אודות
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {student.image && (
              <img
                src={student.image}
                alt={student.name}
                className="w-64 h-72 object-cover rounded-xl shadow-md shrink-0 hidden md:block"
              />
            )}
            <div className="flex-1">
              <h3 className="text-2xl font-bold font-rubik mb-4">
                {about.title || student.name}
              </h3>
              {about.body && (
                <p className="text-stone-700 text-lg leading-relaxed whitespace-pre-line">
                  {about.body}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Projects - 2-column grid */}
        {projects.length > 0 && (
          <section id="projects">
            <h2 className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-8 font-rubik">
              פרויקטים
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {project.media[0]?.thumbnailUrl ? (
                    <img
                      src={project.media[0].thumbnailUrl}
                      alt={project.title}
                      className="w-full h-52 object-cover"
                    />
                  ) : (
                    <div className="w-full h-52 bg-stone-200" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold font-rubik mb-2">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-stone-600 text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.media.length > 1 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto">
                        {project.media.slice(1).map((m) => (
                          <a
                            key={m.id}
                            href={m.webViewUrl ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-stone-100 hover:opacity-80 transition-opacity"
                          >
                            {m.thumbnailUrl ? (
                              <img
                                src={m.thumbnailUrl}
                                alt={m.fileName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-stone-400 text-[10px]">
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
          <section id="cv">
            <h2 className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-8 font-rubik">
              קורות חיים
            </h2>
            <div className="space-y-10">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-xl font-semibold font-rubik mb-5 pb-3 border-b border-stone-200">
                    {section.title}
                  </h3>
                  <div className="space-y-6">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="flex gap-6">
                        <div className="w-28 shrink-0 text-sm text-stone-400 pt-0.5">
                          {entry.dateRange}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-stone-900">{entry.title}</p>
                          {entry.subtitle && (
                            <p className="text-sm text-stone-500">{entry.subtitle}</p>
                          )}
                          {entry.description && (
                            <p className="text-sm text-stone-600 mt-1 leading-relaxed">
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

        {/* Contact - Dark footer card */}
        <footer id="contact" className="bg-gray-900 text-white rounded-xl p-10">
          <h2 className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-6 font-rubik">
            יצירת קשר
          </h2>
          <div className="flex flex-wrap gap-6">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors"
              >
                <Globe className="h-4 w-4" /> אתר אישי
              </a>
            )}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
              {Object.entries(socialLinks)
                .filter(([, v]) => v)
                .map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-stone-400 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {key}
                  </a>
                ))}
            </div>
          )}
          <p className="text-xs text-stone-600 mt-8">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
