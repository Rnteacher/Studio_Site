"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function ModernBold({
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
    <div className="min-h-screen bg-gray-950 text-white font-heebo scroll-smooth" dir="rtl">
      {/* Sticky Navigation - glassmorphism */}
      <nav className="sticky top-0 z-50 bg-gray-950/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-rubik font-black text-white text-sm truncate">
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

      {/* Hero Section - Large gradient */}
      <header className="relative min-h-[70vh] flex items-center px-6 py-24 bg-gradient-to-bl from-indigo-600 via-purple-600 to-gray-950 overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-12 relative z-10">
          {student.image && (
            <img
              src={student.image}
              alt={student.name}
              className="w-52 h-52 md:w-64 md:h-64 rounded-2xl object-cover shadow-2xl shadow-purple-500/30 shrink-0"
            />
          )}
          <div className="text-center md:text-right">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black font-rubik mb-4 bg-gradient-to-l from-purple-300 via-white to-white bg-clip-text text-transparent leading-tight">
              {student.name}
            </h1>
            {about.subtitle && (
              <p className="text-xl md:text-2xl text-purple-200/80 mb-6 max-w-xl">
                {about.subtitle}
              </p>
            )}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors"
                >
                  <Mail className="h-4 w-4" /> {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-colors"
                >
                  <Phone className="h-4 w-4" /> {contact.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-20 space-y-24">
        {/* About */}
        <section id="about">
          <h2 className="text-3xl font-black font-rubik mb-8">אודות</h2>
          <div className="bg-gray-900/50 rounded-2xl p-8 md:p-10 border border-white/5">
            <h3 className="text-xl font-bold font-rubik mb-4 text-purple-300">
              {about.title || student.name}
            </h3>
            {about.body && (
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                {about.body}
              </p>
            )}
          </div>
        </section>

        {/* Projects - Large cards with hover */}
        {projects.length > 0 && (
          <section id="projects">
            <h2 className="text-3xl font-black font-rubik mb-10">פרויקטים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-gray-900 rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="overflow-hidden">
                    {project.media[0]?.thumbnailUrl ? (
                      <img
                        src={project.media[0].thumbnailUrl}
                        alt={project.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-56 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-gray-900" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-rubik mb-2 group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-purple-500/15 text-purple-300 px-3 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.media.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto pt-2 border-t border-white/5">
                        {project.media.map((m) => (
                          <a
                            key={m.id}
                            href={m.webViewUrl ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-800 hover:ring-2 hover:ring-purple-500/50 transition-all"
                          >
                            {m.thumbnailUrl ? (
                              <img
                                src={m.thumbnailUrl}
                                alt={m.fileName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500 text-[10px]">
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
            <h2 className="text-3xl font-black font-rubik mb-10">קורות חיים</h2>
            <div className="space-y-10">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-xl font-bold font-rubik mb-5 text-purple-300">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, i) => (
                      <div
                        key={i}
                        className="bg-gray-900 rounded-xl p-5 border border-white/5 hover:border-purple-500/20 transition-colors"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <p className="font-bold text-white">{entry.title}</p>
                            {entry.subtitle && (
                              <p className="text-sm text-gray-400 mt-0.5">{entry.subtitle}</p>
                            )}
                          </div>
                          {entry.dateRange && (
                            <span className="text-xs text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full shrink-0">
                              {entry.dateRange}
                            </span>
                          )}
                        </div>
                        {entry.description && (
                          <p className="text-sm text-gray-500 mt-3 leading-relaxed">
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
        <footer id="contact" className="border-t border-white/10 pt-12">
          <h2 className="text-3xl font-black font-rubik mb-8">בואו נדבר</h2>
          <div className="flex flex-wrap gap-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-500 transition-colors font-medium"
              >
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Globe className="h-4 w-4" /> אתר אישי
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
                    className="text-sm text-gray-500 hover:text-purple-400 flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {key}
                  </a>
                ))}
            </div>
          )}
          <p className="text-xs text-gray-700 mt-12 text-center">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
