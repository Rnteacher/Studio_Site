"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function TechGlitch({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
  lang,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont ? `font-${customization.bodyFont}` : 'font-heebo';
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : 'font-rubik-glitch';

  const NAV_ITEMS = [
    { id: "about", label: customization?.sectionLabels?.about ?? (lang === "en" ? "About" : "\u05D0\u05D5\u05D3\u05D5\u05EA") },
    { id: "projects", label: customization?.sectionLabels?.projects ?? (lang === "en" ? "Projects" : "\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD") },
    { id: "cv", label: customization?.sectionLabels?.cv ?? (lang === "en" ? "CV" : "\u05E7\u05D5\u05E8\u05D5\u05EA \u05D7\u05D9\u05D9\u05DD") },
    { id: "contact", label: customization?.sectionLabels?.contact ?? (lang === "en" ? "Contact" : "\u05D9\u05E6\u05D9\u05E8\u05EA \u05E7\u05E9\u05E8") },
  ];

  return (
    <div
      className={`relative min-h-screen bg-[#0d0d0d] text-[#e0e0e0] ${bodyFont} scroll-smooth selection:bg-[#00ff41]/20`}
      dir={lang === "en" ? "ltr" : "rtl"}
      style={{
        '--t-primary': customization?.colors?.primary ?? '#00ff41',
        '--t-accent': customization?.colors?.accent ?? '#ff0040',
        '--t-bg': customization?.colors?.bg ?? '#0d0d0d',
        '--t-text': customization?.colors?.text ?? '#e0e0e0',
      } as React.CSSProperties}
    >
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[100]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        }}
        aria-hidden="true"
      />

      {/* Random static lines decoration */}
      <div
        className="pointer-events-none fixed inset-0 z-[99] opacity-[0.04]"
        style={{
          background: 'repeating-linear-gradient(90deg, #00ff41 0px, #00ff41 1px, transparent 1px, transparent 60px)',
        }}
        aria-hidden="true"
      />

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes glitch {
          0%, 100% {
            text-shadow: 2px 0 #ff0040, -2px 0 #00d4ff;
          }
          20% {
            text-shadow: -3px 2px #ff0040, 3px -1px #00d4ff;
          }
          40% {
            text-shadow: 3px -2px #ff0040, -2px 3px #00d4ff;
          }
          60% {
            text-shadow: -2px 1px #ff0040, 1px -3px #00d4ff;
          }
          80% {
            text-shadow: 1px -1px #ff0040, -3px 2px #00d4ff;
          }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink-cursor {
          0%, 100% { border-color: #00ff41; }
          50% { border-color: transparent; }
        }
        @keyframes scanmove {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.7; }
          94% { opacity: 1; }
          96% { opacity: 0.4; }
          97% { opacity: 1; }
        }
        @keyframes glitch-card {
          0%, 100% {
            box-shadow: 0 0 0 1px rgba(0,255,65,0.15);
            text-shadow: none;
          }
          50% {
            box-shadow: 3px 0 0 0 #ff0040, -3px 0 0 0 #00d4ff, 0 0 20px rgba(0,255,65,0.2);
            text-shadow: 2px 0 #ff0040, -2px 0 #00d4ff;
          }
        }
      `}</style>

      {/* Terminal Nav */}
      <nav className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-sm border-b border-[#00ff41]/20">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-12">
          <span className="font-mono text-[#00ff41] text-sm flex items-center gap-1">
            <span className="text-[#ff0040]">[</span>
            sys
            <span className="text-[#ff0040]">:</span>
            ~/{student.name.replace(/\s+/g, "_").toLowerCase()}
            <span className="text-[#ff0040]">]</span>
            <span className="inline-block w-2 h-4 bg-[#00ff41] animate-pulse ms-1" />
          </span>
          <div className="flex items-center gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="font-mono text-xs text-[#e0e0e0]/40 hover:text-[#00ff41] transition-colors relative group"
              >
                <span className="text-[#ff0040]/60 group-hover:text-[#ff0040]">&gt;</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {student.image && (
            <div className="relative shrink-0">
              {/* Glitch offset shadows */}
              <div className="absolute inset-0 translate-x-1 -translate-y-1 border-2 border-[#ff0040]/40" />
              <div className="absolute inset-0 -translate-x-1 translate-y-1 border-2 border-[#00d4ff]/40" />
              <img
                src={student.image}
                alt={student.name}
                className="relative w-40 h-40 object-cover border border-[#00ff41]/30 grayscale hover:grayscale-0 transition-all"
                style={{ animation: 'flicker 4s infinite' }}
              />
            </div>
          )}
          <div className="text-center md:text-start flex-1 min-w-0">
            <h1
              className={`${headingFont} text-5xl md:text-7xl font-black text-[#00ff41] leading-none break-words`}
              style={{ animation: 'glitch 3s infinite' }}
            >
              {student.name}
            </h1>
            {about.subtitle && (
              <div className="mt-4 overflow-hidden">
                <p
                  className="font-mono text-lg md:text-xl text-[#e0e0e0]/70 whitespace-nowrap overflow-hidden border-e-2 border-[#00ff41]"
                  style={{
                    animation: 'typewriter 3s steps(30) 1s forwards, blink-cursor 0.75s step-end infinite',
                    width: '0',
                  }}
                >
                  {about.subtitle}
                </p>
              </div>
            )}
            <div className="mt-5 flex items-center gap-2 justify-center md:justify-start">
              <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
              <span className="font-mono text-xs text-[#00ff41]/50">
                {lang === "en" ? "STATUS: ONLINE" : "STATUS: ONLINE"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        {/* About - Terminal Window */}
        {about.body && (
          <section id="about" className="py-14 scroll-mt-16">
            <h2 className={`${headingFont} text-2xl text-[#00ff41] mb-6 flex items-center gap-3`}>
              <span className="text-[#ff0040]">//</span>
              {about.title || (customization?.sectionLabels?.about ?? (lang === "en" ? "About" : "\u05D0\u05D5\u05D3\u05D5\u05EA"))}
            </h2>
            <div className="border border-[#00ff41]/20 bg-[#0a0a0a]">
              {/* Terminal title bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-[#00ff41]/10 bg-[#111]">
                <div className="w-3 h-3 rounded-full bg-[#ff0040]/60" />
                <div className="w-3 h-3 rounded-full bg-[#f59e0b]/60" />
                <div className="w-3 h-3 rounded-full bg-[#00ff41]/60" />
                <span className="font-mono text-[10px] text-[#e0e0e0]/30 ms-3">about.sh</span>
              </div>
              <div className="p-6">
                <p className="font-mono text-sm text-[#00ff41]/80 leading-[1.9] whitespace-pre-line">
                  {about.body}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Projects - Glitch Cards */}
        {projects.length > 0 && (
          <section id="projects" className="py-14 scroll-mt-16">
            <h2 className={`${headingFont} text-2xl text-[#00ff41] mb-8 flex items-center gap-3`}>
              <span className="text-[#ff0040]">//</span>
              {customization?.sectionLabels?.projects ?? (lang === "en" ? "Projects" : "\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD")}
              <span className="font-mono text-sm text-[#ff0040]/50 ms-2">[{projects.length}]</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <article
                  key={project.id}
                  className="group border border-[#00ff41]/15 bg-[#0a0a0a] transition-all duration-300 hover:border-[#00ff41]/40"
                  style={{
                    animation: 'none',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.animation = 'glitch-card 0.3s ease-in-out';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.animation = 'none';
                  }}
                >
                  {project.media[0]?.thumbnailUrl && (
                    <a
                      href={project.media[0].webViewUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden"
                    >
                      <img
                        src={project.media[0].thumbnailUrl}
                        alt={project.title}
                        className="w-full h-44 object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:brightness-110"
                      />
                    </a>
                  )}
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-xs text-[#ff0040]/60 shrink-0 mt-1">
                        [{String(idx).padStart(2, "0")}]
                      </span>
                      <h3 className={`${headingFont} text-lg text-[#00ff41] font-bold group-hover:text-[#00ff41]`}>
                        {project.title}
                      </h3>
                    </div>
                    {project.description && (
                      <p className="text-[#e0e0e0]/40 text-sm mt-3 leading-relaxed ps-9 font-mono">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4 ps-9">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] text-[#00ff41]/50 border border-[#00ff41]/15 px-2 py-0.5 bg-[#00ff41]/5"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.media.length > 1 && (
                      <div className="flex gap-2 mt-4 ps-9 overflow-x-auto">
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
                                className="w-14 h-14 object-cover border border-[#00ff41]/15 grayscale hover:grayscale-0 transition-all"
                              />
                            ) : (
                              <div className="w-14 h-14 border border-[#00ff41]/15 flex items-center justify-center font-mono text-[8px] text-[#00ff41]/30 bg-[#111]">
                                {m.fileName}
                              </div>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CV - Terminal entries with blinking dots */}
        {cvSections.length > 0 && (
          <section id="cv" className="py-14 scroll-mt-16">
            <h2 className={`${headingFont} text-2xl text-[#00ff41] mb-8 flex items-center gap-3`}>
              <span className="text-[#ff0040]">//</span>
              {customization?.sectionLabels?.cv ?? (lang === "en" ? "CV" : "\u05E7\u05D5\u05E8\u05D5\u05EA \u05D7\u05D9\u05D9\u05DD")}
            </h2>
            <div className="space-y-8">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className={`${headingFont} text-lg text-[#ff0040]/80 font-bold mb-5 flex items-center gap-2`}>
                    <span className="text-[#00ff41]/40">&gt;</span>
                    {section.title}
                  </h3>
                  <div className="space-y-4 ps-4">
                    {section.entries.map((entry, i) => (
                      <div
                        key={i}
                        className="relative border-s-2 border-[#00ff41]/30 ps-5 py-2"
                      >
                        {/* Blinking terminal cursor dot */}
                        <div className="absolute start-[-5px] top-3 w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-[#e0e0e0] font-bold text-sm">{entry.title}</p>
                          {entry.dateRange && (
                            <span className="font-mono text-[10px] text-[#00ff41]/50 border border-[#00ff41]/15 px-2 py-0.5 shrink-0">
                              {entry.dateRange}
                            </span>
                          )}
                        </div>
                        {entry.subtitle && (
                          <p className="text-[#ff0040]/50 text-xs mt-0.5 font-mono">
                            -- {entry.subtitle}
                          </p>
                        )}
                        {entry.description && (
                          <p className="text-[#e0e0e0]/30 text-xs mt-1.5 leading-relaxed font-mono">
                            {entry.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact - Connection Request Dialog */}
        <footer id="contact" className="py-14 scroll-mt-16 border-t border-[#00ff41]/10">
          <h2 className={`${headingFont} text-2xl text-[#00ff41] mb-8 flex items-center gap-3`}>
            <span className="text-[#ff0040]">//</span>
            {customization?.sectionLabels?.contact ?? (lang === "en" ? "Contact" : "\u05D9\u05E6\u05D9\u05E8\u05EA \u05E7\u05E9\u05E8")}
          </h2>

          <div className="border border-[#00ff41]/20 bg-[#0a0a0a]">
            {/* Dialog title bar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#00ff41]/10 bg-[#111]">
              <div className="w-3 h-3 rounded-full bg-[#ff0040]/60" />
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]/60" />
              <div className="w-3 h-3 rounded-full bg-[#00ff41]/60" />
              <span className="font-mono text-[10px] text-[#e0e0e0]/30 ms-3">
                {lang === "en" ? "connection_request.exe" : "connection_request.exe"}
              </span>
            </div>

            <div className="p-6 font-mono text-sm space-y-3">
              <p className="text-[#00ff41]/50 text-xs mb-4">
                {lang === "en"
                  ? ">> Initiating connection protocol..."
                  : ">> Initiating connection protocol..."}
              </p>

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-[#e0e0e0]/50 hover:text-[#00ff41] transition-colors group"
                >
                  <Mail className="h-4 w-4 text-[#ff0040]/60 group-hover:text-[#ff0040]" />
                  <span className="text-[#00ff41]/30">[MAIL]</span>
                  <span>{contact.email}</span>
                </a>
              )}
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-[#e0e0e0]/50 hover:text-[#00ff41] transition-colors group"
                >
                  <Phone className="h-4 w-4 text-[#ff0040]/60 group-hover:text-[#ff0040]" />
                  <span className="text-[#00ff41]/30">[TEL]&nbsp;</span>
                  <span>{contact.phone}</span>
                </a>
              )}
              {contact.website && (
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#e0e0e0]/50 hover:text-[#00ff41] transition-colors group"
                >
                  <Globe className="h-4 w-4 text-[#ff0040]/60 group-hover:text-[#ff0040]" />
                  <span className="text-[#00ff41]/30">[WEB]&nbsp;</span>
                  <span>{lang === "en" ? "Website" : "\u05D0\u05EA\u05E8"}</span>
                </a>
              )}

              {Object.keys(socialLinks).length > 0 && (
                <div className="pt-4 mt-4 border-t border-[#00ff41]/10">
                  <p className="text-[#00ff41]/30 text-xs mb-3">
                    {lang === "en" ? ">> Social endpoints:" : ">> Social endpoints:"}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(socialLinks)
                      .filter(([, v]) => v)
                      .map(([key, url]) => (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#e0e0e0]/30 hover:text-[#00ff41] flex items-center gap-1.5 transition-colors border border-[#00ff41]/10 px-2 py-1 hover:border-[#00ff41]/30"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {key}
                        </a>
                      ))}
                  </div>
                </div>
              )}

              <p className="text-[#00ff41]/30 text-xs pt-3 flex items-center gap-1">
                <span className="text-[#00ff41]">&gt;</span>
                <span className="inline-block w-2 h-3.5 bg-[#00ff41] animate-pulse" />
              </p>
            </div>
          </div>

          <p className="font-mono text-xs text-[#00ff41]/15 mt-10 text-center">
            &lt;{student.name} /&gt; &copy; {new Date().getFullYear()} // ALL_SYSTEMS_NOMINAL
          </p>
        </footer>
      </div>
    </div>
  );
}
