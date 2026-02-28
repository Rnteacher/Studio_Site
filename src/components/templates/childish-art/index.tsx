"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

/* Six crayon colors for cycling through letters & accents */
const CRAYON = ["#ff6b6b", "#4ecdc4", "#ffe66d", "#a18cd1", "#ff9a76", "#74b9ff"];

export default function ChildishArt({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
  lang,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont ? `font-${customization.bodyFont}` : 'font-playpen-sans';
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : 'font-rubik-doodle';

  const label = (key: "about" | "projects" | "cv" | "contact", he: string, en: string) =>
    customization?.sectionLabels?.[key] ?? (lang === "en" ? en : he);

  const navItems = [
    { id: "about", label: label("about", "אודות", "About") },
    { id: "projects", label: label("projects", "פרויקטים", "Projects") },
    { id: "cv", label: label("cv", "קורות חיים", "Resume") },
    { id: "contact", label: label("contact", "צור קשר", "Contact") },
  ];

  /* Split the student name into individual characters for coloured letters */
  const nameChars = student.name.split("");

  return (
    <div
      className={`min-h-screen ${bodyFont} scroll-smooth overflow-x-hidden`}
      dir={lang === "en" ? "ltr" : "rtl"}
      style={{
        '--t-primary': customization?.colors?.primary ?? '#ff6b6b',
        '--t-accent': customization?.colors?.accent ?? '#4ecdc4',
        '--t-bg': customization?.colors?.bg ?? '#fffef2',
        '--t-text': customization?.colors?.text ?? '#2d3436',
        backgroundColor: customization?.colors?.bg ?? '#fffef2',
        color: customization?.colors?.text ?? '#2d3436',
        /* subtle dot-grid paper background */
        backgroundImage:
          "radial-gradient(circle, #ccc 0.7px, transparent 0.7px)",
        backgroundSize: "20px 20px",
      } as React.CSSProperties}
    >
      {/* ===== Scattered decorative shapes (fixed, non-interactive) ===== */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* circles */}
        <div className="absolute top-[8%] start-[4%] w-10 h-10 rounded-full border-[3px] border-dashed border-[#ff6b6b]/30" />
        <div className="absolute top-[22%] end-[6%] w-8 h-8 rounded-full bg-[#ffe66d]/25" />
        <div className="absolute top-[55%] start-[8%] w-12 h-12 rounded-full border-[3px] border-dashed border-[#4ecdc4]/25" />
        <div className="absolute top-[70%] end-[10%] w-6 h-6 rounded-full bg-[#a18cd1]/20" />
        {/* triangles (via borders) */}
        <div
          className="absolute top-[35%] end-[3%]"
          style={{
            width: 0,
            height: 0,
            borderLeft: "14px solid transparent",
            borderRight: "14px solid transparent",
            borderBottom: "24px solid rgba(255,154,118,0.2)",
          }}
        />
        <div
          className="absolute top-[80%] start-[15%]"
          style={{
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "18px solid rgba(116,185,255,0.2)",
          }}
        />
        {/* stars */}
        <div className="absolute top-[12%] end-[30%] text-[#ffe66d]/30 text-3xl select-none">
          ★
        </div>
        <div className="absolute top-[65%] start-[25%] text-[#ff6b6b]/20 text-2xl select-none">
          ★
        </div>
      </div>

      {/* ===== Navigation ===== */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm border-b-[3px] border-dashed border-[#4ecdc4]"
        style={{ backgroundColor: (customization?.colors?.bg ?? '#fffef2') + 'e6' }}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className={`${headingFont} text-2xl font-bold text-[#ff6b6b]`}>
            {student.name}
          </span>
          <div className="flex items-center gap-3">
            {navItems.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm font-bold px-3 py-1 rounded-full border-[2.5px] border-dashed transition-colors"
                style={{
                  borderColor: CRAYON[i % CRAYON.length],
                  color: CRAYON[i % CRAYON.length],
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ===== Hero ===== */}
      <header className="max-w-5xl mx-auto px-6 pt-14 pb-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Profile image — hand-drawn circle frame */}
          {student.image && (
            <div className="relative shrink-0">
              <div
                className="w-44 h-44 md:w-52 md:h-52 overflow-hidden border-[5px] border-dashed border-[#ff6b6b]"
                style={{ borderRadius: "50% 45% 55% 50% / 45% 55% 50% 45%" }}
              >
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* small decorative dots */}
              <div className="absolute -top-2 -end-2 w-5 h-5 rounded-full bg-[#ffe66d]" />
              <div className="absolute -bottom-1 -start-1 w-4 h-4 rounded-full bg-[#4ecdc4]" />
              <div className="absolute top-1/2 -end-4 text-lg select-none" aria-hidden="true">
                ★
              </div>
            </div>
          )}

          <div className="text-center md:text-start flex-1">
            {/* Each letter in a different crayon color */}
            <h1 className={`${headingFont} text-5xl md:text-7xl font-bold leading-tight`}>
              {nameChars.map((char, i) => (
                <span key={i} style={{ color: char === " " ? "transparent" : CRAYON[i % CRAYON.length] }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h1>

            {/* Subtitle in a speech-bubble shape */}
            {about.subtitle && (
              <div className="relative inline-block mt-5">
                <div
                  className="relative px-6 py-3 border-[3px] border-dashed border-[#4ecdc4] bg-white/70"
                  style={{ borderRadius: "1.5rem 1.5rem 1.5rem 0.3rem" }}
                >
                  <p className="text-base md:text-lg font-semibold text-[#2d3436]">
                    {about.subtitle}
                  </p>
                </div>
                {/* Speech bubble triangle */}
                <div
                  className="absolute -bottom-3 start-6"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderTop: "12px solid #4ecdc4",
                  }}
                />
              </div>
            )}

            {/* Crayon-color dots row */}
            <div className="flex gap-2 mt-6 justify-center md:justify-start">
              {CRAYON.map((c) => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        {/* ===== About — notebook page ===== */}
        {about.body && (
          <section id="about" className="py-10 scroll-mt-16">
            <h2 className={`${headingFont} text-4xl font-bold text-[#ff6b6b] mb-6`}>
              {about.title || label("about", "אודות", "About")} ✏️
            </h2>
            <div
              className="relative bg-white/80 rounded-2xl p-8 border-[3px] border-dashed border-[#ffe66d] overflow-hidden"
            >
              {/* Ruled lines background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(transparent, transparent 27px, #e0d9cf 27px, #e0d9cf 28px)",
                }}
                aria-hidden="true"
              />
              {/* Red margin line */}
              <div
                className="absolute top-0 bottom-0 start-12 w-[2px] bg-[#ff6b6b]/20"
                aria-hidden="true"
              />
              <p className="relative text-[#2d3436] leading-[1.85] whitespace-pre-line text-base ps-8">
                {about.body}
              </p>
            </div>
          </section>
        )}

        {/* ===== Projects — coloring book pages ===== */}
        {projects.length > 0 && (
          <section id="projects" className="py-10 scroll-mt-16">
            <h2 className={`${headingFont} text-4xl font-bold text-[#4ecdc4] mb-8`}>
              {label("projects", "פרויקטים", "Projects")} 🎨
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, idx) => {
                const color = CRAYON[idx % CRAYON.length];
                /* Alternate slight tilts for the hand-drawn feel */
                const tilt = idx % 3 === 0 ? "rotate-[1deg]" : idx % 3 === 1 ? "-rotate-[1.5deg]" : "rotate-[0.5deg]";
                return (
                  <div
                    key={project.id}
                    className={`bg-white/80 rounded-xl overflow-hidden border-[4px] border-dashed transition-transform hover:scale-[1.02] ${tilt}`}
                    style={{ borderColor: color }}
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
                        className={`${headingFont} text-2xl font-bold`}
                        style={{ color }}
                      >
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-[#636e72] text-sm mt-2 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      )}
                      {/* Crayon-style category dots */}
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.map((tag, tagIdx) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                              style={{ backgroundColor: CRAYON[(idx + tagIdx) % CRAYON.length] }}
                            >
                              <span
                                className="inline-block w-2 h-2 rounded-full bg-white/50"
                                aria-hidden="true"
                              />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.media.length > 0 && (
                        <div className="flex gap-2 mt-4 overflow-x-auto">
                          {project.media.slice(0, 4).map((m) => (
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
                                  className="w-14 h-14 object-cover rounded-lg border-2 border-dashed"
                                  style={{ borderColor: color + "80" }}
                                />
                              ) : (
                                <div
                                  className="w-14 h-14 rounded-lg border-2 border-dashed flex items-center justify-center text-[8px] text-[#636e72]"
                                  style={{ borderColor: color + "60" }}
                                >
                                  {m.fileName}
                                </div>
                              )}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ===== CV — colorful star bullets + thick dashed timeline ===== */}
        {cvSections.length > 0 && (
          <section id="cv" className="py-10 scroll-mt-16">
            <h2 className={`${headingFont} text-4xl font-bold text-[#a18cd1] mb-8`}>
              {label("cv", "קורות חיים", "Resume")} ⭐
            </h2>
            <div className="space-y-8">
              {cvSections.map((section, secIdx) => {
                const sectionColor = CRAYON[secIdx % CRAYON.length];
                return (
                  <div
                    key={section.id}
                    className="bg-white/80 rounded-2xl p-8 border-[3px] border-dashed"
                    style={{ borderColor: sectionColor + "60" }}
                  >
                    <h3
                      className={`${headingFont} text-2xl font-bold mb-5`}
                      style={{ color: sectionColor }}
                    >
                      {section.title}
                    </h3>
                    {/* Timeline with thick dashed line */}
                    <div
                      className="relative border-s-[4px] border-dashed ps-6 space-y-5"
                      style={{ borderColor: sectionColor + "50" }}
                    >
                      {section.entries.map((entry, i) => {
                        const bulletColor = CRAYON[(secIdx + i) % CRAYON.length];
                        return (
                          <div key={i} className="relative">
                            {/* Colorful star/circle bullet on the timeline */}
                            <span
                              className="absolute -start-[2.1rem] top-0 text-base select-none"
                              style={{ color: bulletColor }}
                              aria-hidden="true"
                            >
                              {i % 2 === 0 ? "⭐" : "●"}
                            </span>
                            <div>
                              <p className="font-bold text-sm">{entry.title}</p>
                              {entry.subtitle && (
                                <p className="text-xs text-[#636e72] mt-0.5">
                                  {entry.subtitle}
                                </p>
                              )}
                              {entry.description && (
                                <p className="text-xs text-[#636e72] mt-1 leading-relaxed">
                                  {entry.description}
                                </p>
                              )}
                              {entry.dateRange && (
                                <span
                                  className="inline-block text-xs mt-1 px-2 py-0.5 rounded-full font-semibold"
                                  style={{
                                    backgroundColor: bulletColor + "25",
                                    color: bulletColor,
                                  }}
                                >
                                  {entry.dateRange}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ===== Contact — colored crayon bars ===== */}
        <footer id="contact" className="py-10 scroll-mt-16 pb-16">
          <h2 className={`${headingFont} text-4xl font-bold text-[#ff9a76] mb-8`}>
            {label("contact", "צור קשר", "Contact")} 🖍️
          </h2>
          <div className="bg-white/80 rounded-2xl p-8 border-[3px] border-dashed border-[#ff9a76]/40">
            {/* Crayon-bar style contact methods */}
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl text-white font-bold transition-transform hover:scale-[1.03] text-sm"
                  style={{ backgroundColor: CRAYON[0] }}
                >
                  <Mail className="h-5 w-5 shrink-0" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl text-white font-bold transition-transform hover:scale-[1.03] text-sm"
                  style={{ backgroundColor: CRAYON[1] }}
                >
                  <Phone className="h-5 w-5 shrink-0" />
                  {contact.phone}
                </a>
              )}
              {contact.website && (
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-xl text-white font-bold transition-transform hover:scale-[1.03] text-sm"
                  style={{ backgroundColor: CRAYON[3] }}
                >
                  <Globe className="h-5 w-5 shrink-0" />
                  {lang === "en" ? "Website" : "אתר"}
                </a>
              )}
            </div>

            {/* Social links */}
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t-[3px] border-dashed border-[#ffe66d]/40">
                {Object.entries(socialLinks)
                  .filter(([, v]) => v)
                  .map(([key, url], i) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold flex items-center gap-1 transition-transform hover:scale-110"
                      style={{ color: CRAYON[i % CRAYON.length] }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {key}
                    </a>
                  ))}
              </div>
            )}

            {/* Crayon dot row */}
            <div className="flex justify-center gap-2 mt-8">
              {CRAYON.map((c) => (
                <div key={c} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>

          <p className="text-xs text-[#b2bec3] mt-6 text-center">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
