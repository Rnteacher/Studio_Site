"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NEON_BORDERS = ["#ff006e", "#8338ec", "#ffbe0b", "#00f5d4", "#fb5607"];

export default function ColorfulChaos({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
  lang,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont ? `font-${customization.bodyFont}` : 'font-fredoka';
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : 'font-rubik-bubbles';

  const navItems = [
    { id: "about", label: customization?.sectionLabels?.about ?? (lang === "en" ? "About" : "אודות") },
    { id: "projects", label: customization?.sectionLabels?.projects ?? (lang === "en" ? "Projects" : "פרויקטים") },
    { id: "cv", label: customization?.sectionLabels?.cv ?? (lang === "en" ? "Experience" : "קורות חיים") },
    { id: "contact", label: customization?.sectionLabels?.contact ?? (lang === "en" ? "Contact" : "צור קשר") },
  ];

  return (
    <div
      className={`min-h-screen text-white ${bodyFont} scroll-smooth selection:bg-[#ff006e]/40 overflow-x-hidden`}
      dir={lang === "en" ? "ltr" : "rtl"}
      style={{
        '--t-primary': customization?.colors?.primary ?? '#ff006e',
        '--t-accent': customization?.colors?.accent ?? '#8338ec',
        '--t-bg': customization?.colors?.bg ?? '#1a1a2e',
        '--t-text': customization?.colors?.text ?? '#ffffff',
      } as React.CSSProperties}
    >
      {/* Custom keyframes */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 0%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes color-cycle {
          0% { border-color: #ff006e; }
          25% { border-color: #8338ec; }
          50% { border-color: #ffbe0b; }
          75% { border-color: #00f5d4; }
          100% { border-color: #ff006e; }
        }
        @keyframes wobble {
          0%, 100% { transform: rotate(-2deg); }
          25% { transform: rotate(2deg); }
          50% { transform: rotate(-1deg); }
          75% { transform: rotate(1.5deg); }
        }
        @keyframes underline-grow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes float-up {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.8; }
        }
        @keyframes rainbow-text {
          0% { color: #ff006e; }
          20% { color: #fb5607; }
          40% { color: #ffbe0b; }
          60% { color: #00f5d4; }
          80% { color: #8338ec; }
          100% { color: #ff006e; }
        }
        @keyframes border-dance {
          0% { border-color: #ff006e; box-shadow: 0 0 15px #ff006e40; }
          33% { border-color: #8338ec; box-shadow: 0 0 15px #8338ec40; }
          66% { border-color: #ffbe0b; box-shadow: 0 0 15px #ffbe0b40; }
          100% { border-color: #ff006e; box-shadow: 0 0 15px #ff006e40; }
        }
        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 8s ease infinite;
        }
        .animate-color-cycle {
          animation: color-cycle 4s linear infinite;
        }
        .animate-wobble {
          animation: wobble 3s ease-in-out infinite;
        }
        .animate-underline-grow {
          animation: underline-grow 0.8s ease-out forwards;
          transform-origin: start;
        }
        .animate-float {
          animation: float-up 4s ease-in-out infinite;
        }
        .animate-rainbow-text {
          animation: rainbow-text 4s linear infinite;
        }
        .animate-border-dance {
          animation: border-dance 3s linear infinite;
        }
        .project-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .project-card:hover {
          transform: rotate(2deg) scale(1.03);
          box-shadow: 0 0 30px #ff006e50, 0 0 60px #8338ec30;
        }
        .cta-pulse {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px #ff006e80, 0 0 20px #ff006e40; }
          50% { box-shadow: 0 0 20px #ff006eb0, 0 0 40px #ff006e60, 0 0 60px #8338ec30; }
        }
        .cv-entry-border {
          animation: color-cycle 3s linear infinite;
          border-inline-start-width: 4px;
          border-inline-start-style: solid;
        }
      `}</style>

      {/* Animated gradient background */}
      <div
        className="fixed inset-0 -z-10 animate-gradient-shift"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #1a1a2e 50%, #0f3460 75%, #1a1a2e 100%)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Floating decorative circles */}
      <div className="fixed inset-0 -z-[5] pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] start-[5%] w-32 h-32 rounded-full bg-[#ff006e]/15 animate-pulse" />
        <div className="absolute top-[30%] end-[8%] w-24 h-24 rounded-full bg-[#8338ec]/20 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[55%] start-[12%] w-20 h-20 rounded-full bg-[#ffbe0b]/15 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[75%] end-[15%] w-28 h-28 rounded-full bg-[#00f5d4]/10 animate-float" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-[15%] end-[40%] w-16 h-16 rounded-full bg-[#fb5607]/15 animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[85%] start-[35%] w-36 h-36 rounded-full bg-[#8338ec]/10 animate-float" style={{ animationDelay: "3s" }} />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#1a1a2e]/80 backdrop-blur-md border-b-2 animate-color-cycle">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <span className={`${headingFont} text-xl font-bold animate-rainbow-text`}>
            {student.name}
          </span>
          <div className="flex items-center gap-4">
            {navItems.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm font-bold px-3 py-1 rounded-full border-2 transition-all duration-300 hover:scale-110"
                style={{
                  borderColor: NEON_BORDERS[i % NEON_BORDERS.length],
                  color: NEON_BORDERS[i % NEON_BORDERS.length],
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = NEON_BORDERS[i % NEON_BORDERS.length];
                  (e.currentTarget as HTMLElement).style.color = "#1a1a2e";
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${NEON_BORDERS[i % NEON_BORDERS.length]}80`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.color = NEON_BORDERS[i % NEON_BORDERS.length];
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 py-20 relative">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          {student.image && (
            <div className="relative animate-wobble">
              <img
                src={student.image}
                alt={student.name}
                className="w-52 h-52 rounded-3xl object-cover border-4 animate-border-dance"
              />
              {/* Corner decorations */}
              <div className="absolute -top-3 -end-3 w-8 h-8 rounded-full bg-[#ffbe0b] animate-bounce" />
              <div className="absolute -bottom-3 -start-3 w-6 h-6 rounded-full bg-[#8338ec] animate-pulse" />
              <div className="absolute -top-2 -start-2 w-5 h-5 rounded-full bg-[#00f5d4] animate-ping" style={{ animationDuration: "2s" }} />
            </div>
          )}
          <div className="text-center md:text-start flex-1">
            <h1 className={`${headingFont} text-6xl md:text-8xl font-bold leading-tight animate-bounce`} style={{ animationDuration: "3s" }}>
              {student.name}
            </h1>
            {about.subtitle && (
              <p
                className="text-2xl mt-4 font-bold animate-rainbow-text"
                style={{ animationDuration: "3s" }}
              >
                {about.subtitle}
              </p>
            )}
            {/* Decorative color strip */}
            <div className="flex gap-2 mt-6 justify-center md:justify-start">
              {NEON_BORDERS.map((c, i) => (
                <div
                  key={c}
                  className="w-6 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: c, animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        {/* About */}
        {about.body && (
          <section id="about" className="py-16 scroll-mt-16">
            <div className="relative inline-block mb-8">
              <h2 className={`${headingFont} text-4xl font-bold text-[#ffbe0b]`}>
                {about.title || (customization?.sectionLabels?.about ?? (lang === "en" ? "About Me" : "אודות"))}
              </h2>
              <div
                className="h-1 bg-gradient-to-r from-[#ff006e] via-[#8338ec] to-[#ffbe0b] rounded-full mt-2 animate-underline-grow"
              />
            </div>
            <div
              className="rounded-2xl p-8 bg-white/5 backdrop-blur-sm border-2 animate-border-dance"
            >
              <p className="text-gray-200 leading-relaxed whitespace-pre-line text-lg">
                {about.body}
              </p>
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section id="projects" className="py-16 scroll-mt-16">
            <div className="relative inline-block mb-8">
              <h2 className={`${headingFont} text-4xl font-bold text-[#ff006e]`}>
                {customization?.sectionLabels?.projects ?? (lang === "en" ? "Projects" : "פרויקטים")}
              </h2>
              <div
                className="h-1 bg-gradient-to-r from-[#ffbe0b] via-[#ff006e] to-[#8338ec] rounded-full mt-2 animate-underline-grow"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="project-card rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border-2"
                  style={{
                    borderColor: NEON_BORDERS[idx % NEON_BORDERS.length],
                    boxShadow: `0 0 10px ${NEON_BORDERS[idx % NEON_BORDERS.length]}30`,
                  }}
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
                      style={{ color: NEON_BORDERS[idx % NEON_BORDERS.length] }}
                    >
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag, tagIdx) => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 rounded-full font-bold text-[#1a1a2e]"
                            style={{ backgroundColor: NEON_BORDERS[(idx + tagIdx) % NEON_BORDERS.length] }}
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
                                className="w-16 h-16 object-cover rounded-xl border-2"
                                style={{ borderColor: NEON_BORDERS[idx % NEON_BORDERS.length] + "60" }}
                              />
                            ) : (
                              <div
                                className="w-16 h-16 rounded-xl border-2 flex items-center justify-center text-[8px] text-gray-500"
                                style={{ borderColor: NEON_BORDERS[idx % NEON_BORDERS.length] + "40" }}
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
        )}

        {/* CV */}
        {cvSections.length > 0 && (
          <section id="cv" className="py-16 scroll-mt-16">
            <div className="relative inline-block mb-8">
              <h2 className={`${headingFont} text-4xl font-bold text-[#8338ec]`}>
                {customization?.sectionLabels?.cv ?? (lang === "en" ? "Experience" : "קורות חיים")}
              </h2>
              <div
                className="h-1 bg-gradient-to-r from-[#8338ec] via-[#00f5d4] to-[#ff006e] rounded-full mt-2 animate-underline-grow"
              />
            </div>
            <div className="space-y-8">
              {cvSections.map((section, secIdx) => (
                <div
                  key={section.id}
                  className="rounded-2xl p-8 bg-white/5 backdrop-blur-sm border-2"
                  style={{
                    borderColor: NEON_BORDERS[secIdx % NEON_BORDERS.length] + "40",
                  }}
                >
                  <h3
                    className={`${headingFont} text-2xl font-bold mb-5`}
                    style={{ color: NEON_BORDERS[secIdx % NEON_BORDERS.length] }}
                  >
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, i) => (
                      <div
                        key={i}
                        className="cv-entry-border ps-4 pb-4 border-b border-white/5 last:border-b-0 last:pb-0"
                        style={{ animationDelay: `${i * 0.5}s` }}
                      >
                        <p className="font-bold text-white">{entry.title}</p>
                        {entry.subtitle && (
                          <p className="text-sm text-gray-400 mt-0.5">
                            {entry.subtitle}
                          </p>
                        )}
                        {entry.description && (
                          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            {entry.description}
                          </p>
                        )}
                        {entry.dateRange && (
                          <span
                            className="inline-block text-xs mt-1 px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: NEON_BORDERS[(secIdx + i) % NEON_BORDERS.length] + "20",
                              color: NEON_BORDERS[(secIdx + i) % NEON_BORDERS.length],
                            }}
                          >
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
        <footer id="contact" className="py-16 scroll-mt-16">
          <div className="relative inline-block mb-8">
            <h2 className={`${headingFont} text-4xl font-bold text-[#00f5d4]`}>
              {customization?.sectionLabels?.contact ?? (lang === "en" ? "Contact" : "צור קשר")}
            </h2>
            <div
              className="h-1 bg-gradient-to-r from-[#00f5d4] via-[#ffbe0b] to-[#ff006e] rounded-full mt-2 animate-underline-grow"
            />
          </div>
          <div className="rounded-2xl p-8 bg-white/5 backdrop-blur-sm border-2 animate-border-dance text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="cta-pulse flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ff006e] text-white font-bold transition-transform hover:scale-110"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#8338ec] text-[#8338ec] font-bold transition-all hover:bg-[#8338ec] hover:text-white hover:scale-110"
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
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#ffbe0b] text-[#ffbe0b] font-bold transition-all hover:bg-[#ffbe0b] hover:text-[#1a1a2e] hover:scale-110"
                >
                  <Globe className="h-4 w-4" />
                  {lang === "en" ? "Website" : "אתר"}
                </a>
              )}
            </div>
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-white/10">
                {Object.entries(socialLinks)
                  .filter(([, v]) => v)
                  .map(([key, url], i) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold flex items-center gap-1 transition-all hover:scale-110"
                      style={{ color: NEON_BORDERS[i % NEON_BORDERS.length] }}
                    >
                      <ExternalLink className="h-3 w-3" />
                      {key}
                    </a>
                  ))}
              </div>
            )}
            {/* Decorative color dots */}
            <div className="flex justify-center gap-2 mt-8">
              {NEON_BORDERS.map((c, i) => (
                <div
                  key={c}
                  className="w-3 h-3 rounded-full animate-bounce"
                  style={{ backgroundColor: c, animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-8 text-center">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}
