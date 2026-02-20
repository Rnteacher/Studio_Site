"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "יצירת קשר" },
];

export default function ExperimentalMagazine({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-stone-100 text-stone-800 scroll-smooth selection:bg-red-700 selection:text-white"
      dir="rtl"
    >
      {/* Fixed top navigation */}
      <nav className="sticky top-0 z-50 bg-stone-100/90 backdrop-blur-sm border-b border-stone-300">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-12">
          <span className="text-xs uppercase tracking-[0.3em] text-stone-400 font-medium">
            {student.name}
          </span>
          <div className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-xs uppercase tracking-wider text-stone-500 hover:text-red-700 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero — Magazine Cover Style */}
      <header id="about" className="scroll-mt-12 border-b border-stone-300">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              {/* Oversized name */}
              <h1
                className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {student.name}
              </h1>
              {/* Thin rule */}
              <div className="w-full h-px bg-stone-400 mt-6" />
              {/* Pull quote subtitle */}
              {about.subtitle && (
                <div className="mt-6 relative pr-8">
                  <span
                    className="absolute top-0 right-0 text-6xl text-red-700/30 leading-none"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    &ldquo;
                  </span>
                  <p
                    className="text-2xl md:text-3xl italic text-stone-600 leading-relaxed"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {about.subtitle}
                  </p>
                </div>
              )}
            </div>

            {/* Profile image */}
            {student.image && (
              <div className="mx-auto md:mx-0">
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-56 h-72 md:w-64 md:h-80 object-cover grayscale-[30%]"
                />
              </div>
            )}
          </div>

          {/* About body with drop cap and columns */}
          {about.body && (
            <div className="mt-12 md:mt-16">
              <div className="columns-1 md:columns-2 gap-10 text-stone-600 leading-relaxed text-base">
                {about.body.split("\n").filter(Boolean).map((paragraph, i) => (
                  <p key={i} className={`mb-4 ${i === 0 ? "first-letter:text-5xl first-letter:font-bold first-letter:float-right first-letter:ml-3 first-letter:mt-1 first-letter:leading-none first-letter:text-red-700" : ""}`} style={i === 0 ? { fontFamily: "Georgia, 'Times New Roman', serif" } : {}}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Projects — Editorial Grid */}
      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-16 border-b border-stone-300 py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-baseline gap-4 mb-14">
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                פרויקטים
              </h2>
              <div className="flex-1 h-px bg-stone-300" />
              <span className="text-xs text-stone-400 uppercase tracking-widest">
                {projects.length} עבודות
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {projects.map((project, idx) => {
                const isLarge = idx % 3 === 0;
                return (
                  <div
                    key={project.id}
                    className={`${
                      isLarge
                        ? "md:col-span-7"
                        : "md:col-span-5"
                    }`}
                  >
                    {/* Media — large or small */}
                    {project.media[0]?.thumbnailUrl && (
                      <a
                        href={project.media[0].webViewUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mb-4 overflow-hidden"
                      >
                        <img
                          src={project.media[0].thumbnailUrl}
                          alt={project.title}
                          className={`w-full object-cover hover:scale-[1.02] transition-transform duration-500 ${
                            isLarge ? "h-64 md:h-80" : "h-48 md:h-56"
                          }`}
                        />
                      </a>
                    )}

                    <h3
                      className="text-xl md:text-2xl font-bold leading-tight"
                      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                      {project.title}
                    </h3>

                    {project.description && (
                      <p className="text-stone-500 text-sm mt-2 leading-relaxed">
                        {project.description}
                      </p>
                    )}

                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-red-700 border-b border-red-700/30 pb-0.5"
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
                                className="w-16 h-16 object-cover grayscale-[20%] hover:grayscale-0 transition-all"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-stone-200 flex items-center justify-center text-[9px] text-stone-500">
                                {m.fileName}
                              </div>
                            )}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Article-style separator */}
                    <div className="mt-6 mb-2 border-b border-stone-200" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CV — Magazine Sidebar Style */}
      {cvSections.length > 0 && (
        <section id="cv" className="scroll-mt-16 border-b border-stone-300 py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-baseline gap-4 mb-14">
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                קורות חיים
              </h2>
              <div className="flex-1 h-px bg-stone-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3
                    className="text-lg font-bold mb-4 pb-2 border-b-2 border-red-700 text-red-700"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, i) => (
                      <div key={i}>
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-stone-800">
                            {entry.title}
                          </p>
                          {entry.dateRange && (
                            <span
                              className="text-xs text-stone-400 shrink-0 italic"
                              style={{ fontFamily: "Georgia, serif" }}
                            >
                              {entry.dateRange}
                            </span>
                          )}
                        </div>
                        {entry.subtitle && (
                          <p className="text-xs text-stone-500 mt-0.5 italic">
                            {entry.subtitle}
                          </p>
                        )}
                        {entry.description && (
                          <p className="text-xs text-stone-400 mt-1 leading-relaxed">
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
      <footer id="contact" className="scroll-mt-16 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="border-t-2 border-stone-800 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <h2
                  className="text-3xl font-bold mb-6"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  יצירת קשר
                </h2>
                <div className="flex flex-wrap gap-6 text-sm">
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-stone-600 hover:text-red-700 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      {contact.email}
                    </a>
                  )}
                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 text-stone-600 hover:text-red-700 transition-colors"
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
                      className="flex items-center gap-2 text-stone-600 hover:text-red-700 transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      אתר
                    </a>
                  )}
                </div>

                {Object.keys(socialLinks).length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {Object.entries(socialLinks)
                      .filter(([, v]) => v)
                      .map(([key, url]) => (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-stone-400 hover:text-red-700 transition-colors flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {key}
                        </a>
                      ))}
                  </div>
                )}
              </div>

              <p
                className="text-xs text-stone-400 italic"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {student.name} &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
