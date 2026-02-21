"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "צור קשר" },
];

export default function PaperCraft({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-[#faf8f0] text-stone-800 font-frank-ruhl scroll-smooth"
      dir="rtl"
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#faf8f0]/90 backdrop-blur-sm border-b border-stone-300/50">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-amatic-sc text-2xl font-bold text-stone-600">
            {student.name}
          </span>
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero — Letter-style header */}
      <header id="about" className="scroll-mt-14 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="relative bg-white p-8 md:p-12 shadow-[0_2px_15px_rgba(0,0,0,0.08)]"
            style={{
              clipPath:
                "polygon(0% 2%, 3% 0%, 7% 1.5%, 12% 0.5%, 18% 2%, 25% 0%, 32% 1%, 40% 0.5%, 48% 2%, 55% 0%, 63% 1.5%, 70% 0%, 78% 1%, 85% 0.5%, 92% 2%, 97% 0%, 100% 1.5%, 100% 97%, 97% 100%, 92% 98.5%, 85% 100%, 78% 99%, 70% 100%, 63% 98%, 55% 100%, 48% 98.5%, 40% 100%, 32% 99%, 25% 100%, 18% 98%, 12% 100%, 7% 98.5%, 3% 100%, 0% 98%)",
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {student.image && (
                <div className="shrink-0">
                  <div
                    className="w-40 h-40 md:w-52 md:h-52 overflow-hidden shadow-md border-4 border-[#faf8f0]"
                    style={{
                      clipPath:
                        "polygon(2% 0%, 98% 1%, 100% 3%, 99% 97%, 97% 100%, 3% 99%, 0% 97%, 1% 3%)",
                    }}
                  >
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-full h-full object-cover sepia-[0.15]"
                    />
                  </div>
                </div>
              )}
              <div className="text-center md:text-right flex-1">
                <h1 className="font-amatic-sc text-5xl md:text-7xl font-bold text-stone-800 leading-tight">
                  {student.name}
                </h1>
                {about.subtitle && (
                  <p className="text-lg text-stone-500 mt-2 italic">
                    {about.subtitle}
                  </p>
                )}
                <div className="w-24 h-px bg-stone-300 mx-auto md:mx-0 md:mr-0 mt-6" />
              </div>
            </div>

            {about.body && (
              <div className="mt-10 pt-8 border-t border-dashed border-stone-200">
                <p className="text-stone-600 leading-[1.9] whitespace-pre-line text-base">
                  {about.body}
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Projects */}
      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-20 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-amatic-sc text-4xl md:text-5xl font-bold text-stone-700 mb-10 text-center">
              פרויקטים
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white p-6 shadow-[0_1px_10px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
                  style={{
                    clipPath:
                      "polygon(0% 1%, 2% 0%, 98% 0.5%, 100% 0%, 100% 99%, 98% 100%, 2% 99.5%, 0% 100%)",
                  }}
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
                        className="w-full h-44 object-cover sepia-[0.1]"
                      />
                    </a>
                  )}
                  <h3 className="font-amatic-sc text-2xl font-bold text-stone-800">
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
                          className="text-xs bg-[#faf8f0] text-stone-500 px-2 py-0.5 border border-stone-200"
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
                              className="w-16 h-16 object-cover border border-stone-200 sepia-[0.15]"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-[#faf8f0] border border-stone-200 flex items-center justify-center text-[9px] text-stone-400">
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

      {/* CV */}
      {cvSections.length > 0 && (
        <section id="cv" className="scroll-mt-20 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-amatic-sc text-4xl md:text-5xl font-bold text-stone-700 mb-10 text-center">
              קורות חיים
            </h2>

            <div
              className="bg-white p-8 md:p-10 shadow-[0_2px_15px_rgba(0,0,0,0.08)]"
              style={{
                clipPath:
                  "polygon(0% 1%, 1% 0%, 99% 0.5%, 100% 0%, 100% 99%, 99% 100%, 1% 99.5%, 0% 100%)",
              }}
            >
              <div className="space-y-10">
                {cvSections.map((section) => (
                  <div key={section.id}>
                    <h3 className="font-amatic-sc text-2xl font-bold text-stone-700 mb-4 pb-2 border-b border-dashed border-stone-200">
                      {section.title}
                    </h3>
                    <div className="space-y-4">
                      {section.entries.map((entry, i) => (
                        <div key={i} className="flex gap-4">
                          {entry.dateRange && (
                            <span className="text-xs text-stone-400 w-24 shrink-0 pt-1 text-left italic">
                              {entry.dateRange}
                            </span>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-stone-700">
                              {entry.title}
                            </p>
                            {entry.subtitle && (
                              <p className="text-xs text-stone-400 mt-0.5 italic">
                                {entry.subtitle}
                              </p>
                            )}
                            {entry.description && (
                              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
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
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <footer id="contact" className="scroll-mt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-amatic-sc text-4xl md:text-5xl font-bold text-stone-700 mb-8 text-center">
            צור קשר
          </h2>

          <div
            className="bg-white p-8 shadow-[0_2px_15px_rgba(0,0,0,0.08)] text-center"
            style={{
              clipPath:
                "polygon(0% 2%, 2% 0%, 98% 1%, 100% 0%, 100% 98%, 98% 100%, 2% 99%, 0% 100%)",
            }}
          >
            <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-500">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 hover:text-stone-800 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 hover:text-stone-800 transition-colors"
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
                  className="flex items-center gap-2 hover:text-stone-800 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  אתר
                </a>
              )}
            </div>

            {Object.keys(socialLinks).length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {Object.entries(socialLinks)
                  .filter(([, v]) => v)
                  .map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-stone-400 hover:text-stone-700 transition-colors flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {key}
                    </a>
                  ))}
              </div>
            )}

            <p className="text-xs text-stone-300 mt-10 italic">
              {student.name} &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
