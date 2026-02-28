"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Brush-stroke shaped decorative div                                */
/* ------------------------------------------------------------------ */
function BrushStroke({
  color,
  className = "",
  style,
}: {
  color: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        background: color,
        borderRadius: "50% 20% 40% 60% / 60% 40% 30% 50%",
        ...style,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Section divider: wide horizontal brush stroke                     */
/* ------------------------------------------------------------------ */
function StrokeDivider({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center py-8" aria-hidden="true">
      <BrushStroke
        color={color}
        className="h-2 opacity-60"
        style={{ width: "55%", transform: "rotate(-1deg)" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Paint dot for CV timeline                                         */
/* ------------------------------------------------------------------ */
function PaintDot({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0"
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: "50% 40% 55% 45% / 45% 55% 40% 50%",
      }}
    />
  );
}

/* ================================================================== */
/*  BRUSH STROKES TEMPLATE                                            */
/* ================================================================== */
export default function BrushStrokes({
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
    : "font-fredoka";

  /* Resolved colour values for inline styles */
  const primary = customization?.colors?.primary ?? "#e63946";
  const accent = customization?.colors?.accent ?? "#457b9d";
  const bgColor = customization?.colors?.bg ?? "#f1faee";
  const textColor = customization?.colors?.text ?? "#1d3557";

  /* Rotate through the 4 palette colours */
  const palette = [primary, accent, textColor, primary];
  const pick = (i: number) => palette[i % palette.length];

  /* Bilingual section label helper */
  const lbl = (
    key: "about" | "projects" | "cv" | "contact",
    he: string,
    en: string,
  ) => customization?.sectionLabels?.[key] ?? (lang === "en" ? en : he);

  return (
    <div
      className={`min-h-screen ${bodyFont} scroll-smooth`}
      dir={lang === "en" ? "ltr" : "rtl"}
      style={
        {
          "--t-primary": primary,
          "--t-accent": accent,
          "--t-bg": bgColor,
          "--t-text": textColor,
          background: bgColor,
          color: textColor,
        } as React.CSSProperties
      }
    >
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <header className="relative overflow-hidden px-6 pt-20 pb-16">
        {/* Large decorative blobs */}
        <BrushStroke
          color={primary}
          className="absolute pointer-events-none opacity-[0.08]"
          style={{
            insetBlockStart: -40,
            insetInlineStart: -60,
            width: 300,
            height: 300,
          }}
        />
        <BrushStroke
          color={accent}
          className="absolute pointer-events-none opacity-[0.06]"
          style={{
            insetBlockEnd: -50,
            insetInlineEnd: -80,
            width: 380,
            height: 240,
            borderRadius: "40% 60% 30% 50% / 50% 30% 60% 40%",
          }}
        />

        <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
          {/* Profile image with paint-splatter frame */}
          {student.image && (
            <div className="relative mb-8">
              {/* Colored shadow offset = "splatter" */}
              <div
                className="absolute"
                aria-hidden="true"
                style={{
                  inset: 0,
                  transform: "translate(6px, 6px)",
                  background: accent,
                  borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
                  opacity: 0.45,
                }}
              />
              <img
                src={student.image}
                alt={student.name}
                className="relative w-40 h-40 object-cover border-4"
                style={{
                  borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
                  borderColor: "white",
                  boxShadow: `4px 4px 0 ${primary}`,
                }}
              />
            </div>
          )}

          {/* Name with painted underline */}
          <div className="relative inline-block mb-3">
            <h1
              className={`text-4xl md:text-6xl font-bold ${headingFont} relative z-10`}
              style={{ color: textColor }}
            >
              {student.name}
            </h1>
            <div
              className="absolute z-0 opacity-40"
              aria-hidden="true"
              style={{
                insetBlockEnd: -4,
                insetInlineStart: 0,
                insetInlineEnd: 0,
                height: 14,
                background: primary,
                borderRadius: "50% 20% 40% 60% / 60% 40% 30% 50%",
              }}
            />
          </div>

          {/* Subtitle with lighter brush stroke behind */}
          {about.subtitle && (
            <div className="relative inline-block mt-2">
              <p className="text-lg md:text-xl relative z-10 px-4 py-1">
                {about.subtitle}
              </p>
              <div
                className="absolute z-0 opacity-20"
                aria-hidden="true"
                style={{
                  inset: 0,
                  background: accent,
                  borderRadius: "40% 60% 30% 50% / 50% 30% 60% 40%",
                }}
              />
            </div>
          )}
        </div>
      </header>

      {/* ============================================================ */}
      {/*  NAVIGATION                                                  */}
      {/* ============================================================ */}
      <nav
        className="sticky z-50 backdrop-blur-md border-b"
        style={{
          insetBlockStart: 0,
          background: `${bgColor}ee`,
          borderColor: `${accent}22`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-center gap-8 h-12">
          {(["about", "projects", "cv", "contact"] as const).map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: textColor }}
            >
              {lbl(
                id,
                { about: "אודות", projects: "פרויקטים", cv: "קורות חיים", contact: "יצירת קשר" }[id],
                { about: "About", projects: "Projects", cv: "CV", contact: "Contact" }[id],
              )}
            </a>
          ))}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-4">
        {/* ========================================================== */}
        {/*  ABOUT — painted initial letter                            */}
        {/* ========================================================== */}
        <section id="about">
          <h2
            className={`text-2xl md:text-3xl font-bold ${headingFont} mb-6 text-start`}
            style={{ color: textColor }}
          >
            {lbl("about", "אודות", "About")}
          </h2>
          {about.title && (
            <h3
              className={`text-lg font-semibold ${headingFont} mb-3`}
              style={{ color: primary }}
            >
              {about.title}
            </h3>
          )}
          {about.body && (
            <p
              className="text-base md:text-lg leading-relaxed whitespace-pre-line"
              style={{ color: textColor }}
            >
              {/* Large painted first letter via inline style block */}
              <style>{`
                #about p::first-letter {
                  font-size: 3.2em;
                  font-weight: 700;
                  float: inline-start;
                  line-height: 0.8;
                  margin-inline-end: 0.15em;
                  margin-block-start: 0.05em;
                  color: ${primary};
                  text-shadow: 2px 2px 0 ${accent}44;
                }
              `}</style>
              {about.body}
            </p>
          )}
        </section>

        <StrokeDivider color={primary} />

        {/* ========================================================== */}
        {/*  PROJECTS — gallery cards with paint-smear accent edge     */}
        {/* ========================================================== */}
        {projects.length > 0 && (
          <>
            <section id="projects">
              <h2
                className={`text-2xl md:text-3xl font-bold ${headingFont} mb-8 text-start`}
                style={{ color: textColor }}
              >
                {lbl("projects", "פרויקטים", "Projects")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, idx) => (
                  <div
                    key={project.id}
                    className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    style={{
                      background: "#ffffff",
                      borderInlineStart: `6px solid ${pick(idx)}`,
                      borderStartStartRadius: 4,
                      borderEndStartRadius: 4,
                      borderStartEndRadius: 12,
                      borderEndEndRadius: 12,
                    }}
                  >
                    {/* Thumbnail */}
                    {project.media[0]?.thumbnailUrl ? (
                      <img
                        src={project.media[0].thumbnailUrl}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-48 flex items-center justify-center"
                        style={{ background: `${pick(idx)}18` }}
                      >
                        <BrushStroke
                          color={pick(idx)}
                          className="w-24 h-8 opacity-30"
                        />
                      </div>
                    )}

                    <div className="p-5">
                      <h3
                        className={`text-lg font-bold ${headingFont} mb-2`}
                        style={{ color: textColor }}
                      >
                        {project.title}
                      </h3>
                      {project.description && (
                        <p
                          className="text-sm leading-relaxed mb-3 opacity-80"
                          style={{ color: textColor }}
                        >
                          {project.description}
                        </p>
                      )}
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-0.5 rounded-full"
                              style={{
                                background: `${accent}1a`,
                                color: accent,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {/* Extra media thumbnails */}
                      {project.media.length > 1 && (
                        <div className="flex gap-2 mt-3 overflow-x-auto">
                          {project.media.slice(1).map((m) => (
                            <a
                              key={m.id}
                              href={m.webViewUrl ?? "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-14 h-14 shrink-0 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                              style={{ background: `${accent}12` }}
                            >
                              {m.thumbnailUrl ? (
                                <img
                                  src={m.thumbnailUrl}
                                  alt={m.fileName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div
                                  className="w-full h-full flex items-center justify-center text-[10px] opacity-50"
                                  style={{ color: textColor }}
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
                ))}
              </div>
            </section>

            <StrokeDivider color={accent} />
          </>
        )}

        {/* ========================================================== */}
        {/*  CV — paint-dot bullets on thin vertical line              */}
        {/* ========================================================== */}
        {cvSections.length > 0 && (
          <>
            <section id="cv">
              <h2
                className={`text-2xl md:text-3xl font-bold ${headingFont} mb-8 text-start`}
                style={{ color: textColor }}
              >
                {lbl("cv", "קורות חיים", "CV")}
              </h2>
              <div className="space-y-10">
                {cvSections.map((section, sIdx) => (
                  <div key={section.id}>
                    <h3
                      className={`text-xl font-semibold ${headingFont} mb-5`}
                      style={{ color: primary }}
                    >
                      {section.title}
                    </h3>
                    <div className="relative ps-8">
                      {/* Thin vertical timeline line */}
                      <div
                        className="absolute w-px"
                        aria-hidden="true"
                        style={{
                          insetInlineStart: 5,
                          insetBlockStart: 4,
                          insetBlockEnd: 4,
                          background: `${accent}40`,
                        }}
                      />
                      <div className="space-y-6">
                        {section.entries.map((entry, i) => {
                          const dotSize = 10 + ((i + sIdx) % 3) * 3;
                          return (
                            <div key={i} className="relative">
                              {/* Paint dot on timeline */}
                              <div
                                className="absolute flex items-center justify-center"
                                style={{
                                  insetInlineStart: -32,
                                  insetBlockStart: 6,
                                  width: 12,
                                }}
                              >
                                <PaintDot
                                  color={pick(i + sIdx)}
                                  size={dotSize}
                                />
                              </div>
                              <div>
                                <p
                                  className="font-medium"
                                  style={{ color: textColor }}
                                >
                                  {entry.title}
                                </p>
                                {entry.subtitle && (
                                  <p
                                    className="text-sm opacity-70"
                                    style={{ color: textColor }}
                                  >
                                    {entry.subtitle}
                                  </p>
                                )}
                                {entry.dateRange && (
                                  <p
                                    className="text-xs mt-0.5 opacity-50"
                                    style={{ color: textColor }}
                                  >
                                    {entry.dateRange}
                                  </p>
                                )}
                                {entry.description && (
                                  <p
                                    className="text-sm mt-1.5 leading-relaxed opacity-75"
                                    style={{ color: textColor }}
                                  >
                                    {entry.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <StrokeDivider color={textColor} />
          </>
        )}

        {/* ========================================================== */}
        {/*  CONTACT — canvas card with painted border accents         */}
        {/* ========================================================== */}
        <footer id="contact">
          <h2
            className={`text-2xl md:text-3xl font-bold ${headingFont} mb-8 text-start`}
            style={{ color: textColor }}
          >
            {lbl("contact", "יצירת קשר", "Contact")}
          </h2>
          <div
            className="relative rounded-xl p-8 md:p-10"
            style={{
              background: "#fffef9",
              boxShadow: `6px 6px 0 ${primary}30, -2px -2px 0 ${accent}20`,
            }}
          >
            {/* Painted border accent — top start corner */}
            <div
              className="absolute"
              aria-hidden="true"
              style={{
                insetBlockStart: 0,
                insetInlineStart: 0,
                width: 96,
                height: 8,
                background: primary,
                borderRadius: "0 50% 50% 0 / 0 60% 40% 0",
              }}
            />
            {/* Painted border accent — bottom end corner */}
            <div
              className="absolute"
              aria-hidden="true"
              style={{
                insetBlockEnd: 0,
                insetInlineEnd: 0,
                width: 80,
                height: 8,
                background: accent,
                borderRadius: "50% 0 0 50% / 40% 0 0 60%",
              }}
            />

            <div className="flex flex-wrap gap-6">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                  style={{ color: textColor }}
                >
                  <Mail className="h-4 w-4" style={{ color: primary }} />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                  style={{ color: textColor }}
                >
                  <Phone className="h-4 w-4" style={{ color: primary }} />
                  {contact.phone}
                </a>
              )}
              {contact.website && (
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
                  style={{ color: textColor }}
                >
                  <Globe className="h-4 w-4" style={{ color: primary }} />
                  {lang === "en" ? "Website" : "אתר אישי"}
                </a>
              )}
            </div>

            {/* Social links */}
            {Object.keys(socialLinks).length > 0 && (
              <div
                className="flex flex-wrap gap-4 mt-6 pt-6 border-t"
                style={{ borderColor: `${accent}25` }}
              >
                {Object.entries(socialLinks)
                  .filter(([, v]) => v)
                  .map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                      style={{ color: accent }}
                    >
                      <ExternalLink className="h-3 w-3" />
                      {key}
                    </a>
                  ))}
              </div>
            )}
          </div>

          {/* Footer credit */}
          <p
            className="text-xs opacity-40 mt-8 text-center"
            style={{ color: textColor }}
          >
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
