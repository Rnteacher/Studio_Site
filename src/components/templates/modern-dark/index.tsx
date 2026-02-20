"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "יצירת קשר" },
];

export default function ModernDark({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-gray-950 text-gray-100 font-heebo scroll-smooth selection:bg-lime-400 selection:text-gray-950"
      dir="rtl"
    >
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-lime-400/10">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-sm font-rubik font-bold text-lime-400 tracking-wider">
            {student.name}
          </span>
          <div className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-gray-500 hover:text-lime-400 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="about" className="relative overflow-hidden scroll-mt-14">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-36">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Profile Image with neon ring */}
            {student.image && (
              <div className="relative shrink-0">
                {/* Outer neon glow ring */}
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-lime-400 via-cyan-400 to-lime-400 opacity-60 blur-md" />
                {/* Inner ring */}
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-lime-400 via-cyan-400 to-lime-400 opacity-80" />
                {/* Dark gap */}
                <div className="absolute -inset-0.5 rounded-full bg-gray-950" />
                <img
                  src={student.image}
                  alt={student.name}
                  className="relative w-48 h-48 md:w-56 md:h-56 object-cover rounded-full"
                />
              </div>
            )}

            {/* Name & About */}
            <div className="text-center md:text-right flex-1">
              <h1 className="text-5xl md:text-7xl font-rubik font-black tracking-tight text-white">
                {student.name}
              </h1>
              {about.subtitle && (
                <p className="text-lime-400 text-lg md:text-xl mt-3 font-light tracking-wide">
                  {about.subtitle}
                </p>
              )}
              {about.body && (
                <p className="text-gray-400 text-base md:text-lg mt-6 leading-relaxed max-w-xl whitespace-pre-line">
                  {about.body}
                </p>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-20 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-rubik font-bold mb-2 text-white">
              פרויקטים
            </h2>
            <div className="w-20 h-1 bg-gradient-to-l from-lime-400 to-cyan-400 rounded-full mb-14" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-lime-400/50 hover:shadow-[0_0_30px_-5px_rgba(163,230,53,0.15)]"
                >
                  {/* Top media */}
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
                        className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </a>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-rubik font-bold text-white group-hover:text-lime-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-lime-400/10 text-lime-400 border border-lime-400/20 px-3 py-1 rounded-full"
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
                                className="w-16 h-16 object-cover rounded-lg border border-zinc-700 hover:border-lime-400/50 transition-colors"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center text-[9px] text-gray-600">
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

      {/* CV Section */}
      {cvSections.length > 0 && (
        <section id="cv" className="scroll-mt-20 py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-rubik font-bold mb-2 text-white">
              קורות חיים
            </h2>
            <div className="w-20 h-1 bg-gradient-to-l from-cyan-400 to-lime-400 rounded-full mb-14" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cvSections.map((section) => (
                <div
                  key={section.id}
                  className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 border-r-4 border-r-lime-400"
                >
                  <h3 className="text-lg font-rubik font-bold text-lime-400 mb-6">
                    {section.title}
                  </h3>
                  <div className="space-y-5">
                    {section.entries.map((entry, i) => (
                      <div
                        key={i}
                        className="relative pr-4 before:absolute before:right-0 before:top-0 before:bottom-0 before:w-px before:bg-zinc-800"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <p className="font-medium text-sm text-gray-200">
                            {entry.title}
                          </p>
                          {entry.dateRange && (
                            <span className="text-xs text-cyan-400 shrink-0 font-mono">
                              {entry.dateRange}
                            </span>
                          )}
                        </div>
                        {entry.subtitle && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {entry.subtitle}
                          </p>
                        )}
                        {entry.description && (
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
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
      <footer id="contact" className="scroll-mt-20 py-20 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-rubik font-bold mb-2 text-white">
            יצירת קשר
          </h2>
          <div className="w-20 h-1 bg-gradient-to-l from-lime-400 to-cyan-400 rounded-full mb-10" />

          <div className="flex flex-wrap gap-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 hover:shadow-[0_0_20px_-5px_rgba(163,230,53,0.2)] px-5 py-3 rounded-xl text-sm text-gray-300 hover:text-lime-400 transition-all"
              >
                <Mail className="h-4 w-4 text-lime-400" />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-lime-400/50 hover:shadow-[0_0_20px_-5px_rgba(163,230,53,0.2)] px-5 py-3 rounded-xl text-sm text-gray-300 hover:text-lime-400 transition-all"
              >
                <Phone className="h-4 w-4 text-lime-400" />
                {contact.phone}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 hover:border-cyan-400/50 hover:shadow-[0_0_20px_-5px_rgba(34,211,238,0.2)] px-5 py-3 rounded-xl text-sm text-gray-300 hover:text-cyan-400 transition-all"
              >
                <Globe className="h-4 w-4 text-cyan-400" />
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
                    className="text-sm text-gray-600 hover:text-lime-400 transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {key}
                  </a>
                ))}
            </div>
          )}

          <div className="mt-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-l from-zinc-800 to-transparent" />
            <p className="text-xs text-gray-700">
              {student.name} &copy; {new Date().getFullYear()}
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
          </div>
        </div>
      </footer>
    </div>
  );
}
