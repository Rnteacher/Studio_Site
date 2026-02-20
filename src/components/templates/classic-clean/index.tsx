"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function ClassicClean({
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
    <div className="min-h-screen bg-white text-gray-900 font-heebo scroll-smooth" dir="rtl">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-rubik font-bold text-gray-900 text-sm truncate">
            {student.name}
          </span>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              אודות
            </a>
            <a href="#projects" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              פרויקטים
            </a>
            <a href="#cv" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              קורות חיים
            </a>
            <a href="#contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              יצירת קשר
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gray-50 py-20 px-6 text-center">
        {student.image && (
          <img
            src={student.image}
            alt={student.name}
            className="w-36 h-36 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
          />
        )}
        <h1 className="text-4xl font-bold font-rubik mb-3">{student.name}</h1>
        {about.subtitle && (
          <p className="text-lg text-gray-500 mb-2">{about.subtitle}</p>
        )}
        {contact.email && (
          <p className="text-sm text-gray-400">{contact.email}</p>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-16">
        {/* About */}
        <section id="about">
          <h2 className="text-2xl font-bold font-rubik mb-2">{about.title || "אודות"}</h2>
          <div className="w-12 h-0.5 bg-gray-300 mb-6" />
          {about.body && (
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {about.body}
            </p>
          )}
        </section>

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects">
            <h2 className="text-2xl font-bold font-rubik mb-2">פרויקטים</h2>
            <div className="w-12 h-0.5 bg-gray-300 mb-8" />
            <div className="space-y-10">
              {projects.map((project) => (
                <div key={project.id} className="border-b border-gray-100 pb-8">
                  <h3 className="text-xl font-semibold font-rubik mb-2">{project.title}</h3>
                  {project.description && (
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  )}
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.media.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {project.media.map((m) => (
                        <a
                          key={m.id}
                          href={m.webViewUrl ?? "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                        >
                          {m.thumbnailUrl ? (
                            <img
                              src={m.thumbnailUrl}
                              alt={m.fileName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
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
          <section id="cv">
            <h2 className="text-2xl font-bold font-rubik mb-2">קורות חיים</h2>
            <div className="w-12 h-0.5 bg-gray-300 mb-8" />
            <div className="space-y-10">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-lg font-semibold font-rubik border-b border-gray-200 pb-2 mb-5">
                    {section.title}
                  </h3>
                  <div className="space-y-5">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="pr-4 border-r-2 border-gray-200">
                        <p className="font-medium text-gray-900">{entry.title}</p>
                        {entry.subtitle && (
                          <p className="text-sm text-gray-600">{entry.subtitle}</p>
                        )}
                        {entry.dateRange && (
                          <p className="text-xs text-gray-400 mt-0.5">{entry.dateRange}</p>
                        )}
                        {entry.description && (
                          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            {entry.description}
                          </p>
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
        <footer id="contact" className="border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold font-rubik mb-6">יצירת קשר</h2>
          <div className="flex flex-wrap gap-5">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Globe className="h-4 w-4" /> אתר אישי
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
                    className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {key}
                  </a>
                ))}
            </div>
          )}
          <p className="text-xs text-gray-300 mt-10 text-center">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
