"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "צור קשר" },
];

export default function BrutalistRaw({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-[#e8e4dc] text-black font-heebo scroll-smooth selection:bg-black selection:text-[#e8e4dc]"
      dir="rtl"
    >
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-black text-[#e8e4dc]">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-12">
          <span className="font-mono text-sm font-bold uppercase tracking-widest">
            {student.name}
          </span>
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="font-mono text-xs px-3 py-1 border border-[#e8e4dc]/30 hover:bg-[#e8e4dc] hover:text-black transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-6xl mx-auto px-4 py-16 border-b-4 border-black">
        <div className="flex flex-col md:flex-row-reverse items-start gap-8">
          {student.image && (
            <div className="border-4 border-black">
              <img
                src={student.image}
                alt={student.name}
                className="w-44 h-44 object-cover grayscale"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-6xl md:text-8xl font-black font-secular-one leading-none uppercase">
              {student.name}
            </h1>
            {about.subtitle && (
              <p className="font-mono text-lg mt-4 border-r-4 border-black pr-4">
                {about.subtitle}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4">
        {/* About */}
        {about.body && (
          <section id="about" className="py-12 border-b-4 border-black scroll-mt-14">
            <h2 className="font-mono text-2xl font-bold uppercase mb-6 bg-black text-[#e8e4dc] inline-block px-4 py-1">
              {about.title || "אודות"}
            </h2>
            <p className="text-lg leading-relaxed whitespace-pre-line max-w-3xl font-mono">
              {about.body}
            </p>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" className="py-12 border-b-4 border-black scroll-mt-14">
            <h2 className="font-mono text-2xl font-bold uppercase mb-8 bg-black text-[#e8e4dc] inline-block px-4 py-1">
              פרויקטים
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border-2 border-black p-6 hover:bg-black hover:text-[#e8e4dc] transition-colors group"
                >
                  {project.thumbnailUrl && (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-40 object-cover grayscale border-2 border-black mb-4"
                    />
                  )}
                  <h3 className="font-mono text-xl font-bold uppercase">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="font-mono text-sm mt-2 leading-relaxed line-clamp-3 opacity-70">
                      {project.description}
                    </p>
                  )}
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs border border-current px-2 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.media.length > 0 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto">
                      {project.media.slice(0, 3).map((m) => (
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
                              className="w-16 h-16 object-cover grayscale border-2 border-current"
                            />
                          ) : (
                            <div className="w-16 h-16 border-2 border-current flex items-center justify-center font-mono text-[8px]">
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
          <section id="cv" className="py-12 border-b-4 border-black scroll-mt-14">
            <h2 className="font-mono text-2xl font-bold uppercase mb-8 bg-black text-[#e8e4dc] inline-block px-4 py-1">
              קורות חיים
            </h2>
            <div className="space-y-8">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="font-mono text-lg font-bold uppercase border-b-2 border-black pb-2 mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="flex gap-6 font-mono text-sm">
                        <span className="w-28 shrink-0 text-left font-bold">
                          {entry.dateRange || "—"}
                        </span>
                        <div className="flex-1">
                          <p className="font-bold">{entry.title}</p>
                          {entry.subtitle && (
                            <p className="opacity-60 mt-0.5">{entry.subtitle}</p>
                          )}
                          {entry.description && (
                            <p className="opacity-50 mt-1 leading-relaxed">
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

        {/* Contact */}
        <footer id="contact" className="py-12 scroll-mt-14">
          <h2 className="font-mono text-2xl font-bold uppercase mb-8 bg-black text-[#e8e4dc] inline-block px-4 py-1">
            צור קשר
          </h2>
          <div className="border-4 border-black p-6 font-mono">
            <div className="flex flex-wrap gap-8 text-sm">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 hover:underline underline-offset-4"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 hover:underline underline-offset-4"
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
                  className="flex items-center gap-2 hover:underline underline-offset-4"
                >
                  <Globe className="h-4 w-4" />
                  אתר
                </a>
              )}
            </div>
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t-2 border-black">
                {Object.entries(socialLinks)
                  .filter(([, v]) => v)
                  .map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {key}
                    </a>
                  ))}
              </div>
            )}
          </div>
          <p className="font-mono text-xs mt-8 text-center uppercase tracking-widest opacity-40">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
