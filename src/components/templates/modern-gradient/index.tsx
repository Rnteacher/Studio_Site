"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "יצירת קשר" },
];

export default function ModernGradient({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-800 font-heebo scroll-smooth"
      dir="rtl"
    >
      {/* Glass Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-white/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-sm font-rubik font-bold bg-gradient-to-l from-purple-600 to-blue-500 bg-clip-text text-transparent">
            {student.name}
          </span>
          <div className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-slate-500 hover:text-purple-600 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section with gradient */}
      <header id="about" className="relative overflow-hidden scroll-mt-14">
        {/* Large gradient background */}
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-600 via-violet-500 to-blue-500" />
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-40">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Profile Image with gradient ring */}
            {student.image && (
              <div className="relative shrink-0">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-white/40 to-white/10 blur-sm" />
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-white/60 to-purple-300/30" />
                <img
                  src={student.image}
                  alt={student.name}
                  className="relative w-44 h-44 md:w-56 md:h-56 object-cover rounded-full ring-4 ring-white/30"
                />
              </div>
            )}

            <div className="text-center md:text-right flex-1">
              <h1 className="text-5xl md:text-7xl font-rubik font-black text-white drop-shadow-lg">
                {student.name}
              </h1>
              {about.subtitle && (
                <p className="text-purple-100 text-lg md:text-xl mt-3 font-light">
                  {about.subtitle}
                </p>
              )}
              {about.body && (
                <p className="text-white/80 text-base md:text-lg mt-6 leading-relaxed max-w-xl whitespace-pre-line">
                  {about.body}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full text-slate-50">
            <path fill="currentColor" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,80L0,80Z" />
          </svg>
        </div>
      </header>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-20 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-rubik font-bold bg-gradient-to-l from-purple-600 to-blue-500 bg-clip-text text-transparent">
              פרויקטים
            </h2>
            <div className="w-24 h-1 bg-gradient-to-l from-purple-600 to-blue-500 rounded-full mt-2 mb-14" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 rounded-2xl" />
                  <div className="absolute inset-px bg-white rounded-2xl" />

                  <div className="relative">
                    {project.media[0]?.thumbnailUrl && (
                      <a
                        href={project.media[0].webViewUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={project.media[0].thumbnailUrl}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                      </a>
                    )}

                    <div className="p-5">
                      <h3 className="text-lg font-rubik font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-slate-500 text-sm mt-2 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      )}
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-gradient-to-l from-purple-50 to-blue-50 text-purple-700 px-3 py-1 rounded-full border border-purple-100"
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
                                  className="w-14 h-14 object-cover rounded-xl border border-purple-100 hover:border-purple-400 transition-colors"
                                />
                              ) : (
                                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-[9px] text-slate-400">
                                  {m.fileName}
                                </div>
                              )}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CV Section */}
      {cvSections.length > 0 && (
        <section id="cv" className="scroll-mt-20 py-20 bg-gradient-to-b from-slate-50 to-purple-50/30">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-rubik font-bold bg-gradient-to-l from-purple-600 to-blue-500 bg-clip-text text-transparent">
              קורות חיים
            </h2>
            <div className="w-24 h-1 bg-gradient-to-l from-blue-500 to-purple-600 rounded-full mt-2 mb-14" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cvSections.map((section) => (
                <div
                  key={section.id}
                  className="backdrop-blur-sm bg-white/70 border border-purple-100/50 rounded-2xl p-6 shadow-lg shadow-purple-500/5"
                >
                  <h3 className="text-lg font-rubik font-bold text-purple-700 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                    {section.title}
                  </h3>

                  {/* Timeline */}
                  <div className="space-y-5 relative">
                    <div className="absolute right-[3px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-300 via-blue-300 to-transparent rounded-full" />

                    {section.entries.map((entry, i) => (
                      <div key={i} className="relative pr-6">
                        {/* Timeline dot */}
                        <div className="absolute right-0 top-1.5 w-2 h-2 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 ring-2 ring-white" />

                        <div className="flex items-start justify-between gap-3">
                          <p className="font-medium text-sm text-slate-700">
                            {entry.title}
                          </p>
                          {entry.dateRange && (
                            <span className="text-xs bg-gradient-to-l from-purple-100 to-blue-100 text-purple-600 px-2 py-0.5 rounded-full shrink-0">
                              {entry.dateRange}
                            </span>
                          )}
                        </div>
                        {entry.subtitle && (
                          <p className="text-xs text-slate-500 mt-0.5">{entry.subtitle}</p>
                        )}
                        {entry.description && (
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{entry.description}</p>
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

      {/* Contact Section */}
      <footer id="contact" className="scroll-mt-20 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-rubik font-bold bg-gradient-to-l from-purple-600 to-blue-500 bg-clip-text text-transparent">
            יצירת קשר
          </h2>
          <div className="w-24 h-1 bg-gradient-to-l from-purple-600 to-blue-500 rounded-full mt-2 mb-10" />

          <div className="flex flex-wrap gap-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 bg-gradient-to-l from-purple-600 to-blue-500 text-white px-6 py-3 rounded-2xl text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 backdrop-blur-sm bg-white/80 border border-purple-200 px-6 py-3 rounded-2xl text-sm text-purple-700 hover:border-purple-400 hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Phone className="h-4 w-4 text-purple-500" />
                {contact.phone}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 backdrop-blur-sm bg-white/80 border border-blue-200 px-6 py-3 rounded-2xl text-sm text-blue-700 hover:border-blue-400 hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Globe className="h-4 w-4 text-blue-500" />
                אתר
              </a>
            )}
          </div>

          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-4 mt-8">
              {Object.entries(socialLinks)
                .filter(([, v]) => v)
                .map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-purple-600 transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {key}
                  </a>
                ))}
            </div>
          )}

          <div className="mt-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-l from-purple-200 to-transparent" />
            <p className="text-xs text-slate-400">
              {student.name} &copy; {new Date().getFullYear()}
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-blue-200 to-transparent" />
          </div>
        </div>
      </footer>
    </div>
  );
}
