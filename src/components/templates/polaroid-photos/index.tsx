"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

/* Deterministic rotation patterns per index */
const CARD_ROTATIONS = ["-2deg", "1deg", "-1deg", "2deg"];
const STICKY_COLORS = [
  "bg-amber-100",
  "bg-rose-100",
  "bg-sky-100",
  "bg-lime-100",
];
const STICKY_ROTATIONS = ["-1.5deg", "1deg", "-0.5deg", "1.5deg"];

export default function PolaroidPhotos({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
  lang,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont
    ? `font-${customization.bodyFont}`
    : "font-heebo";
  const headingFont = customization?.headingFont
    ? `font-${customization.headingFont}`
    : "font-amatic-sc";

  const NAV_ITEMS = [
    {
      id: "about",
      label:
        customization?.sectionLabels?.about ??
        (lang === "en" ? "About" : "אודות"),
    },
    {
      id: "projects",
      label:
        customization?.sectionLabels?.projects ??
        (lang === "en" ? "Projects" : "פרויקטים"),
    },
    {
      id: "cv",
      label:
        customization?.sectionLabels?.cv ??
        (lang === "en" ? "CV" : "קורות חיים"),
    },
    {
      id: "contact",
      label:
        customization?.sectionLabels?.contact ??
        (lang === "en" ? "Contact" : "יצירת קשר"),
    },
  ];

  return (
    <div
      className={`min-h-screen ${bodyFont} scroll-smooth`}
      dir={lang === "en" ? "ltr" : "rtl"}
      style={
        {
          "--t-primary": customization?.colors?.primary ?? "#e8d5b7",
          "--t-accent": customization?.colors?.accent ?? "#c7956d",
          "--t-bg": customization?.colors?.bg ?? "#f5f0e8",
          "--t-text": customization?.colors?.text ?? "#3d3029",
          color: "var(--t-text)",
          backgroundColor: "var(--t-bg)",
          /* Very subtle dot texture on the cork-board bg */
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--t-text) 6%, transparent) 0.7px, transparent 0.7px)",
          backgroundSize: "20px 20px",
        } as React.CSSProperties
      }
    >
      {/* ── Navigation ── */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-sm border-b"
        style={{
          backgroundColor: "color-mix(in srgb, var(--t-bg) 92%, transparent)",
          borderColor: "var(--t-primary)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span
            className={`${headingFont} text-3xl font-bold`}
            style={{ color: "var(--t-text)" }}
          >
            {student.name}
          </span>
          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`${headingFont} text-xl transition-opacity opacity-60 hover:opacity-100`}
                style={{ color: "var(--t-text)" }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero — Large polaroid with profile photo ── */}
      <header className="pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center">
          {/* Polaroid frame: white border, thick bottom for caption */}
          <div
            className="relative bg-white p-3 pb-16 shadow-[0_4px_24px_rgba(0,0,0,0.12)] inline-block"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            {/* Tape strip — top-end corner */}
            <div
              className="absolute -top-3 end-4 w-12 h-5 rounded-sm z-10"
              style={{
                backgroundColor: "var(--t-primary)",
                opacity: 0.55,
                transform: "rotate(45deg)",
              }}
              aria-hidden="true"
            />

            {student.image ? (
              <img
                src={student.image}
                alt={student.name}
                className="w-60 h-60 md:w-80 md:h-80 object-cover"
              />
            ) : (
              <div
                className="w-60 h-60 md:w-80 md:h-80 flex items-center justify-center"
                style={{ backgroundColor: "var(--t-primary)" }}
              >
                <span
                  className={`${headingFont} text-6xl`}
                  style={{ color: "var(--t-accent)" }}
                >
                  {student.name.charAt(0)}
                </span>
              </div>
            )}

            {/* Caption on thick white bottom strip */}
            <p
              className={`${headingFont} absolute bottom-3 inset-x-0 text-center text-2xl md:text-3xl font-bold`}
              style={{ color: "var(--t-text)" }}
            >
              {about.subtitle || ""}
            </p>
          </div>

          {/* Name below the polaroid */}
          <h1
            className={`${headingFont} text-5xl md:text-7xl font-bold text-center mt-8 leading-tight`}
            style={{ color: "var(--t-text)" }}
          >
            {student.name}
          </h1>
        </div>
      </header>

      {/* ── About — Note card on cork board ── */}
      {about.body && (
        <section id="about" className="scroll-mt-20 pb-14">
          <div className="max-w-2xl mx-auto px-6">
            <div
              className="relative bg-white p-8 md:p-10 shadow-[0_3px_16px_rgba(0,0,0,0.09)]"
              style={{ transform: "rotate(0.6deg)" }}
            >
              {/* Tape on top-start corner */}
              <div
                className="absolute -top-2.5 start-6 w-12 h-5 rounded-sm z-10"
                style={{
                  backgroundColor: "var(--t-primary)",
                  opacity: 0.5,
                  transform: "rotate(-30deg)",
                }}
                aria-hidden="true"
              />

              <h2
                className={`${headingFont} text-3xl md:text-4xl font-bold mb-4`}
                style={{ color: "var(--t-accent)" }}
              >
                {customization?.sectionLabels?.about ??
                  (lang === "en" ? "About Me" : "אודות")}
              </h2>
              <p
                className="leading-[1.9] whitespace-pre-line text-base opacity-80"
                style={{ color: "var(--t-text)" }}
              >
                {about.body}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Projects — Scattered polaroid cards ── */}
      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-20 pb-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2
              className={`${headingFont} text-4xl md:text-5xl font-bold text-center mb-12`}
              style={{ color: "var(--t-accent)" }}
            >
              {customization?.sectionLabels?.projects ??
                (lang === "en" ? "Projects" : "פרויקטים")}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project, idx) => {
                const rot = CARD_ROTATIONS[idx % CARD_ROTATIONS.length];
                return (
                  <div
                    key={project.id}
                    className="group relative bg-white p-3 pb-14 shadow-[0_3px_16px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.16)] hover:scale-[1.03]"
                    style={{ transform: `rotate(${rot})` }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform =
                        "rotate(0deg) scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform =
                        `rotate(${rot})`;
                    }}
                  >
                    {/* Tape strip — alternating positions */}
                    {idx % 3 === 0 && (
                      <div
                        className="absolute -top-2.5 start-4 w-10 h-4 rounded-sm z-10"
                        style={{
                          backgroundColor: "var(--t-primary)",
                          opacity: 0.5,
                          transform: "rotate(40deg)",
                        }}
                        aria-hidden="true"
                      />
                    )}
                    {idx % 3 === 1 && (
                      <div
                        className="absolute -top-2.5 end-4 w-10 h-4 rounded-sm z-10"
                        style={{
                          backgroundColor: "var(--t-primary)",
                          opacity: 0.45,
                          transform: "rotate(-35deg)",
                        }}
                        aria-hidden="true"
                      />
                    )}
                    {idx % 3 === 2 && (
                      <div
                        className="absolute -top-2.5 inset-x-0 mx-auto w-10 h-4 rounded-sm z-10"
                        style={{
                          backgroundColor: "var(--t-primary)",
                          opacity: 0.48,
                          transform: "rotate(2deg)",
                        }}
                        aria-hidden="true"
                      />
                    )}

                    {/* Photo area */}
                    {project.thumbnailUrl ? (
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full aspect-[4/3] object-cover"
                      />
                    ) : project.media[0]?.thumbnailUrl ? (
                      <a
                        href={project.media[0].webViewUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={project.media[0].thumbnailUrl}
                          alt={project.title}
                          className="w-full aspect-[4/3] object-cover"
                        />
                      </a>
                    ) : (
                      <div
                        className="w-full aspect-[4/3] flex items-center justify-center"
                        style={{ backgroundColor: "var(--t-primary)", opacity: 0.25 }}
                      >
                        <span
                          className={`${headingFont} text-4xl`}
                          style={{ color: "var(--t-accent)" }}
                        >
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    )}

                    {/* Title on the thick white bottom strip */}
                    <div className="absolute bottom-0 inset-x-0 px-3 pb-2 pt-1">
                      <h3
                        className={`${headingFont} text-xl md:text-2xl font-bold truncate text-center`}
                        style={{ color: "var(--t-text)" }}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* Description + tags overlay on hover */}
                    {(project.description || project.tags.length > 0) && (
                      <div className="absolute inset-x-3 top-3 bottom-14 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4 overflow-hidden flex flex-col justify-center">
                        {project.description && (
                          <p
                            className="text-sm leading-relaxed line-clamp-5 text-center"
                            style={{ color: "var(--t-text)" }}
                          >
                            {project.description}
                          </p>
                        )}
                        {project.tags.length > 0 && (
                          <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] px-2 py-0.5 rounded-sm"
                                style={{
                                  backgroundColor: "var(--t-primary)",
                                  color: "var(--t-text)",
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Extra media thumbnails */}
                    {project.media.length > 1 && (
                      <div className="relative z-10 flex gap-1.5 mt-2 overflow-x-auto">
                        {project.media.slice(1, 4).map((m) => (
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
                                className="w-12 h-12 object-cover"
                                style={{ border: "1px solid var(--t-primary)" }}
                              />
                            ) : (
                              <div
                                className="w-12 h-12 flex items-center justify-center text-[8px] opacity-50"
                                style={{
                                  backgroundColor: "var(--t-bg)",
                                  border: "1px solid var(--t-primary)",
                                  color: "var(--t-text)",
                                }}
                              >
                                {m.fileName}
                              </div>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CV — Sticky notes ── */}
      {cvSections.length > 0 && (
        <section id="cv" className="scroll-mt-20 pb-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2
              className={`${headingFont} text-4xl md:text-5xl font-bold text-center mb-12`}
              style={{ color: "var(--t-accent)" }}
            >
              {customization?.sectionLabels?.cv ??
                (lang === "en" ? "CV" : "קורות חיים")}
            </h2>

            <div className="space-y-14">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3
                    className={`${headingFont} text-2xl md:text-3xl font-bold mb-6 text-center`}
                    style={{ color: "var(--t-text)" }}
                  >
                    {section.title}
                  </h3>

                  <div className="flex flex-wrap justify-center gap-6">
                    {section.entries.map((entry, i) => {
                      const sColor = STICKY_COLORS[i % STICKY_COLORS.length];
                      const sRot = STICKY_ROTATIONS[i % STICKY_ROTATIONS.length];
                      return (
                        <div
                          key={i}
                          className={`${sColor} w-44 min-h-[7.5rem] p-4 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg`}
                          style={{
                            transform: `rotate(${sRot})`,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLDivElement).style.transform =
                              "rotate(0deg) scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLDivElement).style.transform =
                              `rotate(${sRot})`;
                          }}
                        >
                          <p
                            className="text-sm font-semibold leading-snug"
                            style={{ color: "var(--t-text)" }}
                          >
                            {entry.title}
                          </p>
                          {entry.subtitle && (
                            <p
                              className="text-xs mt-1 opacity-60"
                              style={{ color: "var(--t-text)" }}
                            >
                              {entry.subtitle}
                            </p>
                          )}
                          {entry.dateRange && (
                            <p
                              className={`${headingFont} text-base mt-2 font-bold opacity-50`}
                              style={{ color: "var(--t-text)" }}
                            >
                              {entry.dateRange}
                            </p>
                          )}
                          {entry.description && (
                            <p
                              className="text-[11px] mt-1.5 opacity-50 leading-relaxed line-clamp-3"
                              style={{ color: "var(--t-text)" }}
                            >
                              {entry.description}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Contact — Postcard ── */}
      <footer id="contact" className="scroll-mt-20 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          <h2
            className={`${headingFont} text-4xl md:text-5xl font-bold text-center mb-10`}
            style={{ color: "var(--t-accent)" }}
          >
            {customization?.sectionLabels?.contact ??
              (lang === "en" ? "Contact" : "יצירת קשר")}
          </h2>

          <div
            className="relative bg-white p-8 md:p-10 shadow-[0_3px_18px_rgba(0,0,0,0.1)]"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            {/* Tape strips on corners */}
            <div
              className="absolute -top-2.5 start-6 w-11 h-5 rounded-sm"
              style={{
                backgroundColor: "var(--t-primary)",
                opacity: 0.5,
                transform: "rotate(-35deg)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute -top-2.5 end-6 w-11 h-5 rounded-sm"
              style={{
                backgroundColor: "var(--t-primary)",
                opacity: 0.45,
                transform: "rotate(40deg)",
              }}
              aria-hidden="true"
            />

            {/* Postcard dashed border */}
            <div
              className="border-2 border-dashed p-6 md:p-8"
              style={{ borderColor: "var(--t-primary)" }}
            >
              {/* Stamp decoration */}
              <div
                className="absolute top-8 end-8 w-14 h-16 border-2 border-dashed flex items-center justify-center"
                style={{ borderColor: "var(--t-accent)" }}
                aria-hidden="true"
              >
                <span
                  className={`${headingFont} text-lg`}
                  style={{ color: "var(--t-accent)" }}
                >
                  {lang === "en" ? "Post" : "דואר"}
                </span>
              </div>

              <div className="flex flex-col gap-4 pe-20">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 opacity-75 hover:opacity-100 transition-opacity"
                    style={{ color: "var(--t-text)" }}
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="text-sm">{contact.email}</span>
                  </a>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-3 opacity-75 hover:opacity-100 transition-opacity"
                    style={{ color: "var(--t-text)" }}
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    <span className="text-sm">{contact.phone}</span>
                  </a>
                )}
                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 opacity-75 hover:opacity-100 transition-opacity"
                    style={{ color: "var(--t-text)" }}
                  >
                    <Globe className="h-4 w-4 shrink-0" />
                    <span className="text-sm">
                      {lang === "en" ? "Website" : "אתר"}
                    </span>
                  </a>
                )}
              </div>

              {Object.keys(socialLinks).length > 0 && (
                <div
                  className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-dashed"
                  style={{ borderColor: "var(--t-primary)" }}
                >
                  {Object.entries(socialLinks)
                    .filter(([, v]) => v)
                    .map(([key, url]) => (
                      <a
                        key={key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs opacity-50 hover:opacity-100 transition-opacity flex items-center gap-1.5"
                        style={{ color: "var(--t-text)" }}
                      >
                        <ExternalLink className="h-3 w-3" />
                        {key}
                      </a>
                    ))}
                </div>
              )}
            </div>
          </div>

          <p
            className={`${headingFont} text-lg text-center mt-10 opacity-40`}
            style={{ color: "var(--t-text)" }}
          >
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
