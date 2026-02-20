"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "יצירת קשר" },
];

export default function ExperimentalRetro({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-amber-50 text-neutral-900 font-heebo scroll-smooth selection:bg-fuchsia-500 selection:text-white"
      dir="rtl"
    >
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-amber-50 border-b-4 border-black">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-mono font-black text-sm tracking-widest uppercase text-fuchsia-600">
            [{student.name}]
          </span>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="font-mono text-xs uppercase font-bold border-2 border-black px-3 py-1.5 hover:bg-black hover:text-amber-50 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="about" className="scroll-mt-14 border-b-4 border-black">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Profile Image with thick border */}
            {student.image && (
              <div className="relative shrink-0">
                {/* Offset shadow box */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 bg-fuchsia-500 border-4 border-black" />
                <img
                  src={student.image}
                  alt={student.name}
                  className="relative w-48 h-48 md:w-56 md:h-56 object-cover border-4 border-black"
                />
              </div>
            )}

            <div className="text-center md:text-right flex-1">
              <h1 className="font-mono text-5xl md:text-7xl font-black tracking-tight leading-none">
                {student.name}
              </h1>
              {about.subtitle && (
                <div className="mt-4 overflow-hidden">
                  <p className="font-mono text-lg md:text-xl text-fuchsia-600 font-bold inline-block animate-[marquee_12s_linear_infinite] whitespace-nowrap">
                    {`*** ${about.subtitle} *** ${about.subtitle} *** ${about.subtitle} ***`}
                  </p>
                </div>
              )}
              {about.body && (
                <div className="mt-8 bg-white border-4 border-black p-6 text-right">
                  <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                    {about.body}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Inline keyframes style for marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>

      {/* Projects Section */}
      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-20 border-b-4 border-black py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-6 h-6 bg-blue-500 border-2 border-black" />
              <h2 className="font-mono text-3xl md:text-4xl font-black uppercase">
                // פרויקטים
              </h2>
              <div className="flex-1 border-t-4 border-dashed border-black" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="group bg-white border-4 border-black p-5 transition-transform duration-200 hover:-rotate-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
                >
                  {project.media[0]?.thumbnailUrl && (
                    <a
                      href={project.media[0].webViewUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mb-4"
                    >
                      <img
                        src={project.media[0].thumbnailUrl}
                        alt={project.title}
                        className="w-full h-44 object-cover border-2 border-black"
                      />
                    </a>
                  )}

                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-white bg-fuchsia-500 border-2 border-black px-2 py-0.5 shrink-0">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-mono text-xl font-black leading-tight">
                      {project.title}
                    </h3>
                  </div>

                  {project.description && (
                    <p className="text-neutral-600 text-sm mt-3 leading-relaxed">
                      {project.description}
                    </p>
                  )}

                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag, tagIdx) => {
                        const colors = [
                          "bg-lime-500",
                          "bg-blue-500",
                          "bg-fuchsia-500",
                        ];
                        return (
                          <span
                            key={tag}
                            className={`font-mono text-xs font-bold text-white ${
                              colors[tagIdx % colors.length]
                            } border-2 border-black px-2 py-0.5`}
                          >
                            {tag}
                          </span>
                        );
                      })}
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
                              className="w-14 h-14 object-cover border-2 border-black hover:border-fuchsia-500 transition-colors"
                            />
                          ) : (
                            <div className="w-14 h-14 bg-amber-100 border-2 border-black flex items-center justify-center font-mono text-[8px] font-bold">
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
          </div>
        </section>
      )}

      {/* CV Section — Terminal Style */}
      {cvSections.length > 0 && (
        <section id="cv" className="scroll-mt-20 border-b-4 border-black py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-6 h-6 bg-lime-500 border-2 border-black" />
              <h2 className="font-mono text-3xl md:text-4xl font-black uppercase">
                // קורות חיים
              </h2>
              <div className="flex-1 border-t-4 border-dashed border-black" />
            </div>

            <div className="bg-neutral-900 border-4 border-black p-6 md:p-8 font-mono text-sm">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-neutral-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-neutral-500 text-xs mr-4">
                  cv.exe -- {student.name}
                </span>
              </div>

              <div className="space-y-8">
                {cvSections.map((section) => (
                  <div key={section.id}>
                    <p className="text-lime-400 font-bold text-base mb-4">
                      {">"} {section.title}
                    </p>
                    <div className="space-y-3 pr-6">
                      {section.entries.map((entry, i) => (
                        <div key={i} className="text-neutral-300">
                          <div className="flex items-start gap-2">
                            <span className="text-fuchsia-400 shrink-0">$</span>
                            <span className="text-white font-bold">
                              {entry.title}
                            </span>
                            {entry.dateRange && (
                              <span className="text-blue-400 mr-auto text-xs">
                                [{entry.dateRange}]
                              </span>
                            )}
                          </div>
                          {entry.subtitle && (
                            <p className="text-yellow-400/80 text-xs pr-5 mt-0.5">
                              -- {entry.subtitle}
                            </p>
                          )}
                          {entry.description && (
                            <p className="text-neutral-500 text-xs pr-5 mt-1 leading-relaxed">
                              {entry.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <p className="text-lime-400 animate-pulse">{">"} _</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact / Footer */}
      <footer id="contact" className="scroll-mt-20 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-6 h-6 bg-fuchsia-500 border-2 border-black" />
            <h2 className="font-mono text-3xl md:text-4xl font-black uppercase">
              // יצירת קשר
            </h2>
            <div className="flex-1 border-t-4 border-dashed border-black" />
          </div>

          <div className="flex flex-wrap gap-3">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 bg-white border-4 border-black px-5 py-3 font-mono text-sm font-bold hover:bg-fuchsia-500 hover:text-white hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 bg-white border-4 border-black px-5 py-3 font-mono text-sm font-bold hover:bg-blue-500 hover:text-white hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
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
                className="flex items-center gap-2 bg-white border-4 border-black px-5 py-3 font-mono text-sm font-bold hover:bg-lime-500 hover:text-white hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all"
              >
                <Globe className="h-4 w-4" />
                אתר
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
                    className="font-mono text-xs font-bold border-2 border-black px-3 py-1.5 hover:bg-black hover:text-amber-50 transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {key}
                  </a>
                ))}
            </div>
          )}

          <div className="mt-16 border-t-4 border-black pt-4">
            <p className="font-mono text-xs text-neutral-500 text-center">
              &lt;/&gt; {student.name} &copy; {new Date().getFullYear()} --- ALL
              RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
