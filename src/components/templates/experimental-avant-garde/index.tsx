"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קו\"ח" },
  { id: "contact", label: "קשר" },
];

export default function ExperimentalAvantGarde({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-black text-white font-heebo scroll-smooth selection:bg-emerald-400 selection:text-black"
      dir="rtl"
    >
      {/* Sticky Neon Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-emerald-400/30">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="text-emerald-400 text-sm font-rubik font-bold tracking-wider">
            {student.name}
          </span>
          <div className="flex items-center gap-6 md:gap-10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-emerald-400/70 hover:text-emerald-400 hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] transition-all"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero — large rotated name with geometric elements */}
      <header id="about" className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Geometric decorative elements */}
        <div className="absolute top-10 left-10 w-40 h-40 border-2 border-emerald-400/20 rotate-12" />
        <div className="absolute top-1/4 left-1/3 w-64 h-px bg-gradient-to-l from-emerald-400/40 to-transparent" />
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-lime-400/30 rotate-45" />
        <div className="absolute bottom-1/3 left-20 w-32 h-32 border-2 border-emerald-400/10 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-96 h-px bg-gradient-to-r from-lime-400/20 to-transparent -rotate-12" />

        <div className="relative max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              {/* Rotated large name */}
              <div className="relative">
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-black font-rubik leading-none tracking-tighter text-white md:-rotate-2 origin-right">
                  {student.name}
                </h1>
                <div className="w-full h-1 bg-gradient-to-l from-emerald-400 via-lime-400 to-transparent mt-4 md:-rotate-2 origin-right" />
              </div>
              {about.subtitle && (
                <p className="text-emerald-400 text-xl md:text-2xl mt-6 font-light tracking-wide">
                  {about.subtitle}
                </p>
              )}
              {about.body && (
                <p className="text-neutral-500 mt-8 max-w-xl text-lg leading-relaxed">
                  {about.body}
                </p>
              )}
            </div>

            {/* Profile image with neon border/offset shadow */}
            {student.image && (
              <div className="relative mx-auto md:mx-0">
                <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 via-lime-400 to-emerald-400 opacity-70" />
                <div className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-emerald-400/40" />
                <img
                  src={student.image}
                  alt={student.name}
                  className="relative w-60 h-60 md:w-72 md:h-72 object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Projects — overlapping cards with neon borders */}
      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-20 relative py-24">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-emerald-400/50 to-transparent" />
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl md:text-6xl font-black font-rubik mb-16">
              <span className="text-emerald-400">{"{"}</span> פרויקטים{" "}
              <span className="text-emerald-400">{"}"}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className={`relative group border border-neutral-800 hover:border-emerald-400 bg-neutral-950 transition-all duration-300 ${
                    idx % 3 === 1
                      ? "md:translate-y-8"
                      : idx % 3 === 2
                      ? "md:translate-y-4"
                      : ""
                  }`}
                >
                  {/* Neon glow on hover */}
                  <div className="absolute -inset-px bg-emerald-400/0 group-hover:bg-emerald-400/5 transition-all duration-300" />
                  <div className="relative p-6">
                    {project.media[0]?.thumbnailUrl && (
                      <a
                        href={project.media[0].webViewUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mb-5"
                      >
                        <img
                          src={project.media[0].thumbnailUrl}
                          alt={project.title}
                          className="w-full h-44 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </a>
                    )}
                    <span className="text-emerald-400/40 text-xs font-mono">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-bold font-rubik mt-1">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-emerald-400/70 border border-emerald-400/20 px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.media.length > 1 && (
                      <div className="flex gap-2 mt-4">
                        {project.media.slice(1, 4).map((m) => (
                          <a
                            key={m.id}
                            href={m.webViewUrl ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-14 h-14 bg-neutral-900 overflow-hidden hover:ring-1 hover:ring-emerald-400 transition-all"
                          >
                            {m.thumbnailUrl ? (
                              <img
                                src={m.thumbnailUrl}
                                alt={m.fileName}
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[8px] text-neutral-600">
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

      {/* CV — geometric grid with neon accents */}
      {cvSections.length > 0 && (
        <section id="cv" className="scroll-mt-20 relative py-24">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-lime-400/50 to-transparent" />
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl md:text-6xl font-black font-rubik mb-16">
              <span className="text-lime-400">{"{"}</span> קורות חיים{" "}
              <span className="text-lime-400">{"}"}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cvSections.map((section) => (
                <div
                  key={section.id}
                  className="border border-neutral-800 relative"
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                  <div className="p-6">
                    <h3 className="text-lg font-bold font-rubik mb-5 pb-3 border-b border-neutral-800">
                      {section.title}
                    </h3>
                    <div className="space-y-4">
                      {section.entries.map((entry, i) => (
                        <div key={i} className="relative pr-4 border-r-2 border-neutral-800 hover:border-emerald-400 transition-colors">
                          <div className="flex justify-between items-start gap-4">
                            <p className="font-medium text-sm">{entry.title}</p>
                            {entry.dateRange && (
                              <span className="text-xs text-emerald-400/60 shrink-0">
                                {entry.dateRange}
                              </span>
                            )}
                          </div>
                          {entry.subtitle && (
                            <p className="text-xs text-neutral-500 mt-0.5">
                              {entry.subtitle}
                            </p>
                          )}
                          {entry.description && (
                            <p className="text-xs text-neutral-600 mt-1">
                              {entry.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact / Footer */}
      <footer id="contact" className="scroll-mt-20 relative py-20">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-emerald-400 via-lime-400 to-emerald-400" />
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black font-rubik mb-12">
            <span className="text-emerald-400">{"{"}</span> קשר{" "}
            <span className="text-emerald-400">{"}"}</span>
          </h2>
          <div className="flex flex-wrap gap-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 border border-neutral-800 hover:border-emerald-400 px-5 py-3 text-sm text-neutral-300 hover:text-emerald-400 transition-all group"
              >
                <Mail className="h-4 w-4 text-emerald-400" />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 border border-neutral-800 hover:border-emerald-400 px-5 py-3 text-sm text-neutral-300 hover:text-emerald-400 transition-all group"
              >
                <Phone className="h-4 w-4 text-emerald-400" />
                {contact.phone}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 border border-neutral-800 hover:border-emerald-400 px-5 py-3 text-sm text-neutral-300 hover:text-emerald-400 transition-all group"
              >
                <Globe className="h-4 w-4 text-emerald-400" />
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
                    className="text-xs text-neutral-600 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {key}
                  </a>
                ))}
            </div>
          )}
          <div className="mt-16 flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-800" />
            <p className="text-xs text-neutral-700">
              {student.name} &copy; {new Date().getFullYear()}
            </p>
            <div className="h-px flex-1 bg-neutral-800" />
          </div>
        </div>
      </footer>
    </div>
  );
}
