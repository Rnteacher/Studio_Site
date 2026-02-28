"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

/* helper — random-ish but deterministic per index */
const chaos = (i: number, range: number) => ((i * 7 + 3) % range) - range / 2;

export default function MaxChaos({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
  lang,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont ? `font-${customization.bodyFont}` : "font-rubik";
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : "font-rubik-glitch";

  return (
    <div
      className={`min-h-screen ${bodyFont} scroll-smooth overflow-hidden`}
      dir={lang === "en" ? "ltr" : "rtl"}
      style={{
        "--t-primary": customization?.colors?.primary ?? "#ff00ff",
        "--t-accent": customization?.colors?.accent ?? "#00ffff",
        "--t-bg": customization?.colors?.bg ?? "#1a1a1a",
        "--t-text": customization?.colors?.text ?? "#ffffff",
        background: "var(--t-bg)",
        color: "var(--t-text)",
      } as React.CSSProperties}
    >
      {/* Animated background noise */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10"
        style={{
          backgroundImage: `repeating-conic-gradient(var(--t-primary) 0% 25%, transparent 0% 50%)`,
          backgroundSize: "60px 60px",
          animation: "chaosRotate 20s linear infinite",
        }}
      />

      <style jsx>{`
        @keyframes chaosRotate { to { transform: rotate(360deg); } }
        @keyframes chaosFloat { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }
        @keyframes chaosPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes chaosSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes chaosShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-5px) rotate(-1deg); } 75% { transform: translateX(5px) rotate(1deg); } }
        @keyframes chaosColorShift { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
        @keyframes chaosBounce { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(-1); } }
        @keyframes chaosSkew { 0%,100% { transform: skewX(0deg); } 50% { transform: skewX(10deg); } }
      `}</style>

      {/* Hero — upside down title */}
      <header className="relative z-10 py-16 px-4 text-center overflow-hidden">
        {/* Diagonal stripe */}
        <div className="absolute inset-0 -z-10 opacity-20"
          style={{
            background: `repeating-linear-gradient(45deg, var(--t-primary), var(--t-primary) 10px, transparent 10px, transparent 20px)`,
          }}
        />

        {student.image && (
          <div className="mx-auto mb-6 w-32 h-32 rounded-full overflow-hidden border-4"
            style={{
              borderColor: "var(--t-accent)",
              animation: "chaosShake 2s ease-in-out infinite",
            }}
          >
            <img src={student.image} alt={student.name} className="w-full h-full object-cover"
              style={{ animation: "chaosColorShift 8s linear infinite" }}
            />
          </div>
        )}

        {/* Upside-down name */}
        <h1
          className={`text-5xl md:text-7xl font-black ${headingFont} mb-4`}
          style={{
            color: "var(--t-primary)",
            transform: "scaleY(-1)",
            animation: "chaosBounce 6s ease-in-out infinite",
            textShadow: "3px 3px 0 var(--t-accent), -3px -3px 0 var(--t-primary)",
          }}
        >
          {student.name}
        </h1>

        {about.subtitle && (
          <p className="text-xl md:text-2xl mt-4"
            style={{
              animation: "chaosSkew 3s ease-in-out infinite",
              color: "var(--t-accent)",
            }}
          >
            {about.subtitle}
          </p>
        )}

        {/* Sliding ticker */}
        <div className="mt-6 overflow-hidden">
          <div className="whitespace-nowrap text-sm opacity-40"
            style={{ animation: "chaosSlide 10s linear infinite" }}
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="mx-4">★ {student.name} ★</span>
            ))}
          </div>
        </div>
      </header>

      {/* Nav — scattered links */}
      <nav className="relative z-10 flex flex-wrap justify-center gap-3 px-4 mb-12">
        {[
          { href: "#about", label: customization?.sectionLabels?.about ?? (lang === "en" ? "About" : "אודות") },
          { href: "#projects", label: customization?.sectionLabels?.projects ?? (lang === "en" ? "Projects" : "פרויקטים") },
          { href: "#cv", label: customization?.sectionLabels?.cv ?? (lang === "en" ? "Resume" : "קורות חיים") },
          { href: "#contact", label: customization?.sectionLabels?.contact ?? (lang === "en" ? "Contact" : "צור קשר") },
        ].map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className={`px-4 py-2 text-sm font-bold border-2 ${headingFont} hover:scale-110 transition-transform`}
            style={{
              borderColor: "var(--t-primary)",
              color: "var(--t-primary)",
              transform: `rotate(${chaos(i, 20)}deg)`,
              animation: `chaosFloat ${2 + (i % 3)}s ease-in-out infinite`,
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        {/* About — tilted card */}
        <section
          id="about"
          className="mb-16 p-6 border-4 scroll-mt-16"
          style={{
            borderColor: "var(--t-accent)",
            transform: "rotate(-2deg)",
            background: `linear-gradient(135deg, transparent 60%, color-mix(in srgb, var(--t-primary) 10%, transparent))`,
          }}
        >
          <h2
            className={`text-3xl font-black ${headingFont} mb-4`}
            style={{
              color: "var(--t-primary)",
              transform: "rotate(3deg)",
              textDecoration: "line-through",
              textDecorationColor: "var(--t-accent)",
            }}
          >
            {about.title || (customization?.sectionLabels?.about ?? (lang === "en" ? "About" : "אודות"))}
          </h2>
          {about.body && (
            <p className="text-lg leading-relaxed whitespace-pre-line"
              style={{ animation: "chaosShake 4s ease-in-out infinite" }}
            >
              {about.body}
            </p>
          )}
        </section>

        {/* Projects — chaotic grid */}
        {projects.length > 0 && (
          <section id="projects" className="mb-16 scroll-mt-16">
            <h2
              className={`text-4xl font-black ${headingFont} text-center mb-8`}
              style={{
                color: "var(--t-accent)",
                transform: "scaleX(-1)",
                animation: "chaosPulse 2s ease-in-out infinite",
              }}
            >
              {customization?.sectionLabels?.projects ?? (lang === "en" ? "Projects" : "פרויקטים")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <article
                  key={project.id}
                  className="border-2 overflow-hidden group"
                  style={{
                    borderColor: i % 2 === 0 ? "var(--t-primary)" : "var(--t-accent)",
                    transform: `rotate(${chaos(i, 8)}deg) scale(${0.95 + (i % 3) * 0.05})`,
                    animation: `chaosFloat ${3 + (i % 4)}s ease-in-out infinite`,
                  }}
                >
                  {project.media[0]?.thumbnailUrl ? (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.media[0].thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        style={{ animation: "chaosColorShift 12s linear infinite" }}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video"
                      style={{
                        background: `repeating-linear-gradient(${45 + i * 30}deg, var(--t-primary), var(--t-primary) 5px, var(--t-accent) 5px, var(--t-accent) 10px)`,
                        opacity: 0.3,
                      }}
                    />
                  )}

                  <div className="p-4">
                    <h3 className={`text-xl font-black ${headingFont} mb-2`}
                      style={{
                        color: "var(--t-primary)",
                        transform: i % 3 === 0 ? "scaleY(-1)" : `rotate(${chaos(i, 4)}deg)`,
                      }}
                    >
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-sm opacity-80 line-clamp-3">{project.description}</p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag, j) => (
                          <span key={tag} className="text-xs px-2 py-1 font-bold"
                            style={{
                              background: "var(--t-primary)",
                              color: "var(--t-bg)",
                              transform: `rotate(${chaos(j, 12)}deg)`,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Links */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.media.map((m) => (
                        <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer"
                          className="text-xs underline hover:no-underline"
                          style={{ color: "var(--t-accent)" }}
                        >
                          {m.fileName}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CV Sections — wild cards */}
        {cvSections.length > 0 && (
          <section id="cv" className="mb-16 scroll-mt-16">
            <h2
              className={`text-4xl font-black ${headingFont} text-center mb-8`}
              style={{
                color: "var(--t-primary)",
                transform: "rotate(180deg)",
                textShadow: "2px 2px 0 var(--t-accent)",
              }}
            >
              {customization?.sectionLabels?.cv ?? (lang === "en" ? "Resume" : "קורות חיים")}
            </h2>

            <div className="space-y-8">
              {cvSections.map((section, si) => (
                <div
                  key={section.id}
                  className="border-4 p-6"
                  style={{
                    borderColor: si % 2 === 0 ? "var(--t-primary)" : "var(--t-accent)",
                    transform: `rotate(${chaos(si, 6)}deg)`,
                    borderStyle: si % 3 === 0 ? "dashed" : si % 3 === 1 ? "dotted" : "double",
                  }}
                >
                  <h3
                    className={`text-2xl font-black ${headingFont} mb-4`}
                    style={{
                      color: "var(--t-accent)",
                      animation: `chaosShake ${2 + si}s ease-in-out infinite`,
                    }}
                  >
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, ei) => (
                      <div
                        key={ei}
                        className="ps-4 border-s-4"
                        style={{
                          borderColor: "var(--t-primary)",
                          transform: `translateX(${chaos(ei, 20)}px)`,
                        }}
                      >
                        <p className="font-bold" style={{ color: "var(--t-primary)" }}>{entry.title}</p>
                        {entry.subtitle && <p className="text-sm opacity-70">{entry.subtitle}</p>}
                        {entry.dateRange && (
                          <p className="text-xs mt-1 font-mono opacity-50">{entry.dateRange}</p>
                        )}
                        {entry.description && (
                          <p className="text-sm mt-1 opacity-80">{entry.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact — glitchy footer */}
        <footer
          id="contact"
          className="mb-16 p-8 text-center scroll-mt-16 border-4"
          style={{
            borderColor: "var(--t-primary)",
            borderStyle: "double",
            animation: "chaosShake 3s ease-in-out infinite",
          }}
        >
          <h2
            className={`text-3xl font-black ${headingFont} mb-6`}
            style={{
              color: "var(--t-accent)",
              transform: "scaleY(-1)",
            }}
          >
            {customization?.sectionLabels?.contact ?? (lang === "en" ? "Contact" : "צור קשר")}
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {contact.email && (
              <a href={`mailto:${contact.email}`}
                className="flex items-center gap-2 px-4 py-2 border-2 font-bold text-sm hover:scale-110 transition-transform"
                style={{
                  borderColor: "var(--t-primary)",
                  color: "var(--t-primary)",
                  transform: "rotate(-3deg)",
                }}
              >
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`}
                className="flex items-center gap-2 px-4 py-2 border-2 font-bold text-sm hover:scale-110 transition-transform"
                style={{
                  borderColor: "var(--t-accent)",
                  color: "var(--t-accent)",
                  transform: "rotate(2deg)",
                }}
              >
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border-2 font-bold text-sm hover:scale-110 transition-transform"
                style={{
                  borderColor: "var(--t-primary)",
                  color: "var(--t-primary)",
                  transform: "rotate(-1deg)",
                }}
              >
                <Globe className="h-4 w-4" /> {lang === "en" ? "Website" : "אתר אישי"}
              </a>
            )}
            {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border-2 font-bold text-sm hover:scale-110 transition-transform"
                style={{
                  borderColor: "var(--t-accent)",
                  color: "var(--t-accent)",
                  transform: `rotate(${chaos(key.length, 8)}deg)`,
                }}
              >
                <ExternalLink className="h-4 w-4" /> {key}
              </a>
            ))}
          </div>
        </footer>

        {/* Footer */}
        <p className="text-center text-sm pb-8 opacity-40"
          style={{ transform: "rotate(180deg)" }}
        >
          {student.name} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
