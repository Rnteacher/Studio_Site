"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "יצירת קשר" },
];

export default function ClassicSerif({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div className="min-h-screen scroll-smooth" dir="rtl">
      {/* Mobile Header — collapses sidebar into horizontal strip */}
      <header className="lg:hidden bg-[#1b2a4a] text-white">
        <div className="flex flex-col items-center py-8 px-6 gap-4">
          {student.image && (
            <img
              src={student.image}
              alt={student.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-[#c9b97a]/50"
            />
          )}
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {student.name}
          </h1>
          {about.subtitle && (
            <p className="text-sm text-[#c9b97a]/80">{about.subtitle}</p>
          )}
        </div>
        {/* Mobile nav */}
        <nav className="sticky top-0 z-50 bg-[#162240] border-t border-white/10">
          <div className="flex items-center justify-center gap-6 h-12 px-4 overflow-x-auto">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-[#c9b97a]/70 hover:text-[#c9b97a] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Desktop Sidebar — sticky, dark navy */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 xl:w-80 bg-[#1b2a4a] text-white lg:sticky lg:top-0 lg:h-screen overflow-y-auto shrink-0">
          <div className="flex flex-col items-center p-8 pt-12 gap-5 flex-1">
            {student.image && (
              <img
                src={student.image}
                alt={student.name}
                className="w-36 h-36 rounded-full object-cover border-3 border-[#c9b97a]/40 shadow-lg"
              />
            )}
            <div className="text-center">
              <h1
                className="text-2xl font-bold leading-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {student.name}
              </h1>
              {about.subtitle && (
                <p className="text-sm text-[#c9b97a]/70 mt-2">
                  {about.subtitle}
                </p>
              )}
            </div>

            {/* Sidebar nav */}
            <nav className="w-full mt-6 border-t border-white/10 pt-6">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-2.5 px-4 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                    style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Contact info in sidebar */}
            <div className="w-full mt-auto pt-8 border-t border-white/10 space-y-3">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2.5 text-xs text-white/40 hover:text-[#c9b97a] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2.5 text-xs text-white/40 hover:text-[#c9b97a] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  {contact.phone}
                </a>
              )}
              {contact.website && (
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs text-white/40 hover:text-[#c9b97a] transition-colors"
                >
                  <Globe className="h-3.5 w-3.5 shrink-0" />
                  אתר אישי
                </a>
              )}
              {Object.keys(socialLinks).length > 0 && (
                <div className="flex flex-wrap gap-3 pt-3">
                  {Object.entries(socialLinks)
                    .filter(([, v]) => v)
                    .map(([key, url]) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white/30 hover:text-[#c9b97a] transition-colors flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {key}
                      </a>
                    ))}
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content — warm cream background */}
        <main className="flex-1 bg-[#faf8f3]">
          <div className="max-w-3xl mx-auto px-6 md:px-10 py-16 lg:py-20">
            {/* About */}
            <section id="about" className="mb-20 scroll-mt-16">
              <h2
                className="text-3xl font-bold text-[#1b2a4a] mb-6"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {about.title || "אודות"}
              </h2>
              <div className="w-16 h-0.5 bg-[#c9b97a] mb-8" />
              {about.body && (
                <p
                  className="text-[#4a4a4a] text-lg leading-[1.9] whitespace-pre-line"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {about.body}
                </p>
              )}
            </section>

            {/* Projects */}
            {projects.length > 0 && (
              <section id="projects" className="mb-20 scroll-mt-16">
                <h2
                  className="text-3xl font-bold text-[#1b2a4a] mb-6"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  פרויקטים
                </h2>
                <div className="w-16 h-0.5 bg-[#c9b97a] mb-10" />
                <div className="space-y-10">
                  {projects.map((project) => (
                    <article
                      key={project.id}
                      className="border-b border-[#e5e0d5] pb-10 last:border-b-0"
                    >
                      <h3
                        className="text-xl font-bold text-[#1b2a4a] mb-2"
                        style={{
                          fontFamily: "Georgia, 'Times New Roman', serif",
                        }}
                      >
                        {project.title}
                      </h3>
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-[#8a7d5a] border border-[#d4cbb3] rounded px-2.5 py-0.5"
                              style={{
                                fontFamily:
                                  "Georgia, 'Times New Roman', serif",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.description && (
                        <p
                          className="text-[#5a5a5a] leading-relaxed"
                          style={{
                            fontFamily: "Georgia, 'Times New Roman', serif",
                          }}
                        >
                          {project.description}
                        </p>
                      )}
                      {project.media.length > 0 && (
                        <div className="flex gap-3 mt-5 overflow-x-auto">
                          {project.media.slice(0, 5).map((m) => (
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
                                  className="w-28 h-20 object-cover rounded border border-[#e5e0d5] hover:border-[#c9b97a] transition-colors"
                                />
                              ) : (
                                <div className="w-28 h-20 bg-[#efe9db] rounded border border-[#e5e0d5] flex items-center justify-center text-[10px] text-[#8a7d5a]">
                                  {m.fileName}
                                </div>
                              )}
                            </a>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* CV — elegant indented timeline */}
            {cvSections.length > 0 && (
              <section id="cv" className="mb-20 scroll-mt-16">
                <h2
                  className="text-3xl font-bold text-[#1b2a4a] mb-6"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                  }}
                >
                  קורות חיים
                </h2>
                <div className="w-16 h-0.5 bg-[#c9b97a] mb-10" />
                <div className="space-y-12">
                  {cvSections.map((section) => (
                    <div key={section.id}>
                      <h3
                        className="text-lg font-bold text-[#1b2a4a] mb-6 pb-2 border-b-2 border-[#c9b97a]/40"
                        style={{
                          fontFamily: "Georgia, 'Times New Roman', serif",
                        }}
                      >
                        {section.title}
                      </h3>
                      <div className="relative pr-8 space-y-8">
                        {/* Timeline line */}
                        <div className="absolute right-2.5 top-1 bottom-0 w-px bg-[#d4cbb3]" />
                        {section.entries.map((entry, i) => (
                          <div key={i} className="relative">
                            {/* Timeline dot */}
                            <div className="absolute -right-[1.375rem] top-1.5 w-2.5 h-2.5 rounded-full bg-[#c9b97a] border-2 border-[#faf8f3]" />
                            <div>
                              <p
                                className="font-semibold text-[#1b2a4a]"
                                style={{
                                  fontFamily:
                                    "Georgia, 'Times New Roman', serif",
                                }}
                              >
                                {entry.title}
                              </p>
                              {entry.subtitle && (
                                <p
                                  className="text-sm text-[#8a7d5a] mt-0.5"
                                  style={{
                                    fontFamily:
                                      "Georgia, 'Times New Roman', serif",
                                  }}
                                >
                                  {entry.subtitle}
                                </p>
                              )}
                              {entry.dateRange && (
                                <p className="text-xs text-[#a0977d] mt-1 font-heebo">
                                  {entry.dateRange}
                                </p>
                              )}
                              {entry.description && (
                                <p
                                  className="text-sm text-[#6a6a6a] mt-2 leading-relaxed"
                                  style={{
                                    fontFamily:
                                      "Georgia, 'Times New Roman', serif",
                                  }}
                                >
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

            {/* Contact — mobile-only since desktop has sidebar */}
            <footer
              id="contact"
              className="lg:hidden pt-10 border-t border-[#e5e0d5] scroll-mt-16"
            >
              <h2
                className="text-2xl font-bold text-[#1b2a4a] mb-6"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                יצירת קשר
              </h2>
              <div className="space-y-4">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-[#5a5a5a] hover:text-[#1b2a4a] transition-colors"
                  >
                    <Mail className="h-4 w-4 text-[#c9b97a]" />
                    {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-3 text-[#5a5a5a] hover:text-[#1b2a4a] transition-colors"
                  >
                    <Phone className="h-4 w-4 text-[#c9b97a]" />
                    {contact.phone}
                  </a>
                )}
                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#5a5a5a] hover:text-[#1b2a4a] transition-colors"
                  >
                    <Globe className="h-4 w-4 text-[#c9b97a]" />
                    אתר אישי
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
                        className="text-sm text-[#8a7d5a] hover:text-[#1b2a4a] transition-colors flex items-center gap-1.5"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {key}
                      </a>
                    ))}
                </div>
              )}
            </footer>

            {/* Desktop-only contact anchor for sidebar navigation */}
            <div id="contact" className="hidden lg:block scroll-mt-16" />

            {/* Copyright footer */}
            <div className="mt-16 pt-8 border-t border-[#e5e0d5] text-center">
              <p
                className="text-xs text-[#b0a890]"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {student.name} &copy; {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
