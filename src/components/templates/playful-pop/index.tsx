"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות" },
  { id: "projects", label: "פרויקטים" },
  { id: "cv", label: "קורות חיים" },
  { id: "contact", label: "צור קשר" },
];

const COLORS = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff"];

export default function PlayfulPop({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div
      className="min-h-screen bg-[#fffbf0] text-neutral-800 font-assistant scroll-smooth"
      dir="rtl"
    >
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#fffbf0]/90 backdrop-blur-sm border-b-2 border-dashed border-[#ffd93d]">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className="font-amatic-sc text-2xl font-bold text-[#ff6b6b]">
            {student.name}
          </span>
          <div className="flex items-center gap-4">
            {NAV_ITEMS.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm font-bold px-3 py-1 rounded-full transition-colors hover:text-white"
                style={{
                  color: COLORS[i % COLORS.length],
                  borderWidth: 2,
                  borderColor: COLORS[i % COLORS.length],
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = COLORS[i % COLORS.length];
                  (e.currentTarget as HTMLElement).style.color = "white";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.color = COLORS[i % COLORS.length];
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          {student.image && (
            <div className="relative">
              <img
                src={student.image}
                alt={student.name}
                className="w-48 h-48 rounded-[2rem] object-cover border-4 border-[#ffd93d] rotate-3 hover:rotate-0 transition-transform"
              />
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#ff6b6b] flex items-center justify-center text-white text-lg">
                ✦
              </div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-[#6bcb77]" />
            </div>
          )}
          <div className="text-center md:text-right flex-1">
            <h1 className="font-amatic-sc text-6xl md:text-8xl font-bold leading-tight">
              <span className="text-[#ff6b6b]">{student.name.split(" ")[0]}</span>
              {student.name.includes(" ") && (
                <span className="text-[#4d96ff]"> {student.name.split(" ").slice(1).join(" ")}</span>
              )}
            </h1>
            {about.subtitle && (
              <p className="text-xl text-neutral-500 mt-3 font-bold">
                {about.subtitle}
              </p>
            )}
            {/* Decorative dots */}
            <div className="flex gap-2 mt-6 justify-center md:justify-start">
              {COLORS.map((c) => (
                <div
                  key={c}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        {/* About */}
        {about.body && (
          <section id="about" className="py-12 scroll-mt-16">
            <h2 className="font-amatic-sc text-4xl font-bold text-[#6bcb77] mb-6">
              {about.title || "אודות"} ✿
            </h2>
            <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-[#6bcb77]/40 shadow-sm">
              <p className="text-neutral-600 leading-relaxed whitespace-pre-line text-lg">
                {about.body}
              </p>
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" className="py-12 scroll-mt-16">
            <h2 className="font-amatic-sc text-4xl font-bold text-[#ff6b6b] mb-8">
              פרויקטים ★
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="bg-white rounded-3xl overflow-hidden border-2 shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1 transition-transform"
                  style={{ borderColor: COLORS[idx % COLORS.length] + "60" }}
                >
                  {project.thumbnailUrl && (
                    <img
                      src={project.thumbnailUrl}
                      alt={project.title}
                      className="w-full h-44 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3
                      className="font-amatic-sc text-2xl font-bold"
                      style={{ color: COLORS[idx % COLORS.length] }}
                    >
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-neutral-500 text-sm mt-2 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag, tagIdx) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full text-white font-bold"
                            style={{ backgroundColor: COLORS[(idx + tagIdx) % COLORS.length] + "cc" }}
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
                                className="w-16 h-16 object-cover rounded-xl"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-[#fffbf0] rounded-xl flex items-center justify-center text-[9px] text-neutral-400">
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
          <section id="cv" className="py-12 scroll-mt-16">
            <h2 className="font-amatic-sc text-4xl font-bold text-[#4d96ff] mb-8">
              קורות חיים ◆
            </h2>
            <div className="space-y-8">
              {cvSections.map((section, secIdx) => (
                <div
                  key={section.id}
                  className="bg-white rounded-3xl p-8 border-2 border-dashed shadow-sm"
                  style={{ borderColor: COLORS[secIdx % COLORS.length] + "40" }}
                >
                  <h3
                    className="font-amatic-sc text-2xl font-bold mb-4"
                    style={{ color: COLORS[secIdx % COLORS.length] }}
                  >
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="flex gap-4 pb-3 border-b border-dashed border-neutral-100 last:border-0 last:pb-0">
                        <div
                          className="w-3 h-3 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: COLORS[(secIdx + i) % COLORS.length] }}
                        />
                        <div className="flex-1">
                          <p className="font-bold text-sm">{entry.title}</p>
                          {entry.subtitle && (
                            <p className="text-xs text-neutral-400 mt-0.5">
                              {entry.subtitle}
                            </p>
                          )}
                          {entry.description && (
                            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                              {entry.description}
                            </p>
                          )}
                        </div>
                        {entry.dateRange && (
                          <span className="text-xs text-neutral-400 shrink-0 pt-0.5">
                            {entry.dateRange}
                          </span>
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
        <footer id="contact" className="py-12 scroll-mt-16">
          <h2 className="font-amatic-sc text-4xl font-bold text-[#ffd93d] mb-8">
            צור קשר ♡
          </h2>
          <div className="bg-white rounded-3xl p-8 border-2 border-dashed border-[#ffd93d]/40 shadow-sm text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-neutral-500 hover:text-[#ff6b6b] transition-colors font-bold"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 text-neutral-500 hover:text-[#6bcb77] transition-colors font-bold"
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
                  className="flex items-center gap-2 text-neutral-500 hover:text-[#4d96ff] transition-colors font-bold"
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
                  .map(([key, url], i) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm transition-colors flex items-center gap-1 font-bold"
                      style={{ color: COLORS[i % COLORS.length] }}
                    >
                      <ExternalLink className="h-3 w-3" />
                      {key}
                    </a>
                  ))}
              </div>
            )}
            <div className="flex justify-center gap-1 mt-8">
              {COLORS.map((c) => (
                <div key={c} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className="text-xs text-neutral-300 mt-4">
              {student.name} &copy; {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
