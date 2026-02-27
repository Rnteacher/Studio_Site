"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function SocialFeed({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
  lang,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont ? `font-${customization.bodyFont}` : 'font-open-sans';
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : 'font-rubik';

  return (
    <div
      className={`min-h-screen bg-[#fafafa] text-[#262626] ${bodyFont} scroll-smooth`}
      dir={lang === "en" ? "ltr" : "rtl"}
      style={{
        '--t-primary': customization?.colors?.primary ?? '#262626',
        '--t-accent': customization?.colors?.accent ?? '#e1306c',
        '--t-bg': customization?.colors?.bg ?? '#fafafa',
        '--t-text': customization?.colors?.text ?? '#262626',
      } as React.CSSProperties}
    >
      {/* App-style top bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#dbdbdb]">
        <div className="max-w-lg mx-auto px-4 flex items-center justify-between h-12">
          <span className={`${headingFont} font-bold text-lg`}>{student.name}</span>
          <div className="flex items-center gap-4">
            <a href="#about" className="text-xs text-[#8e8e8e] hover:text-[#262626] transition-colors">{customization?.sectionLabels?.about ?? "אודות"}</a>
            <a href="#projects" className="text-xs text-[#8e8e8e] hover:text-[#262626] transition-colors">{customization?.sectionLabels?.projects ?? "פרויקטים"}</a>
            <a href="#cv" className="text-xs text-[#8e8e8e] hover:text-[#262626] transition-colors">{customization?.sectionLabels?.cv ?? "קורות חיים"}</a>
            <a href="#contact" className="text-xs text-[#8e8e8e] hover:text-[#262626] transition-colors">{customization?.sectionLabels?.contact ?? "צור קשר"}</a>
          </div>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Profile Header */}
        <header className="mb-6">
          <div className="flex items-center gap-6 mb-4">
            {student.image ? (
              <div className="shrink-0 p-0.5 rounded-full" style={{ background: "linear-gradient(135deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)" }}>
                <div className="p-0.5 bg-white rounded-full">
                  <img src={student.image} alt={student.name} className="w-20 h-20 rounded-full object-cover" />
                </div>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#efefef] shrink-0" />
            )}
            <div className="flex-1">
              <h1 className={`text-xl font-bold ${headingFont} mb-1`}>{student.name}</h1>
              {about.subtitle && <p className="text-sm text-[#8e8e8e]">{about.subtitle}</p>}
            </div>
          </div>
          {/* Stats row */}
          <div className="flex justify-around py-3 border-y border-[#dbdbdb]">
            <div className="text-center">
              <p className={`font-bold ${headingFont}`}>{projects.length}</p>
              <p className="text-xs text-[#8e8e8e]">פרויקטים</p>
            </div>
            <div className="text-center">
              <p className={`font-bold ${headingFont}`}>{cvSections.length}</p>
              <p className="text-xs text-[#8e8e8e]">תחומים</p>
            </div>
            <div className="text-center">
              <p className={`font-bold ${headingFont}`}>{cvSections.reduce((a, s) => a + s.entries.length, 0)}</p>
              <p className="text-xs text-[#8e8e8e]">כישורים</p>
            </div>
          </div>
        </header>

        {/* Story Highlights — CV sections */}
        {cvSections.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-4 mb-6" id="cv">
            {cvSections.map((section) => (
              <div key={section.id} className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-16 h-16 rounded-full border-2 border-[#dbdbdb] flex items-center justify-center bg-[#fafafa]">
                  <span className={`text-lg font-bold ${headingFont} text-[#262626]`}>{section.entries.length}</span>
                </div>
                <span className="text-[10px] text-[#8e8e8e] max-w-[64px] text-center truncate">{section.title}</span>
              </div>
            ))}
          </div>
        )}

        {/* About — Pinned Post */}
        <section id="about" className="bg-white rounded-lg border border-[#dbdbdb] mb-4 scroll-mt-16">
          <div className="flex items-center gap-3 p-3 border-b border-[#efefef]">
            {student.image && <img src={student.image} alt="" className="w-8 h-8 rounded-full object-cover" />}
            <div>
              <span className="text-sm font-bold">{student.name}</span>
              <span className="text-xs text-[#8e8e8e] mr-2">נעוץ</span>
            </div>
          </div>
          <div className="p-4">
            <h2 className={`font-bold ${headingFont} mb-2`}>{about.title || (customization?.sectionLabels?.about ?? "אודות")}</h2>
            {about.body && <p className="text-sm leading-relaxed whitespace-pre-line text-[#262626]">{about.body}</p>}
          </div>
        </section>

        {/* Projects — Posts */}
        {projects.length > 0 && (
          <section id="projects" className="space-y-4 mb-6 scroll-mt-16">
            {projects.map((project) => (
              <article key={project.id} className="bg-white rounded-lg border border-[#dbdbdb] overflow-hidden">
                {/* Post header */}
                <div className="flex items-center gap-3 p-3">
                  {student.image && <img src={student.image} alt="" className="w-8 h-8 rounded-full object-cover" />}
                  <span className="text-sm font-bold flex-1">{student.name}</span>
                </div>
                {/* Post image */}
                {project.media[0]?.thumbnailUrl ? (
                  <img src={project.media[0].thumbnailUrl} alt={project.title} className="w-full aspect-square object-cover" />
                ) : (
                  <div className="w-full aspect-square bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] opacity-20" />
                )}
                {/* Post actions */}
                <div className="p-3">
                  <div className="flex items-center gap-4 mb-2">
                    <svg className="w-6 h-6 text-[#262626]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    <svg className="w-6 h-6 text-[#262626]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    <svg className="w-6 h-6 text-[#262626]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  </div>
                  {/* Caption */}
                  <h3 className={`font-bold ${headingFont} text-sm mb-1`}>{project.title}</h3>
                  {project.description && (
                    <p className="text-sm text-[#262626] leading-relaxed line-clamp-3">{project.description}</p>
                  )}
                  {project.tags.length > 0 && (
                    <p className="text-sm text-[#00376b] mt-1">
                      {project.tags.map((tag) => `#${tag.replace(/\s/g, "_")}`).join(" ")}
                    </p>
                  )}
                  {/* Extra media */}
                  {project.media.length > 1 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                      {project.media.slice(1).map((m) => (
                        <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="w-12 h-12 shrink-0 rounded-md overflow-hidden bg-[#efefef]">
                          {m.thumbnailUrl ? (
                            <img src={m.thumbnailUrl} alt={m.fileName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] text-[#8e8e8e]">{m.fileName}</div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}

        {/* CV Details — expandable sections */}
        {cvSections.length > 0 && (
          <section className="space-y-3 mb-6 scroll-mt-16">
            {cvSections.map((section) => (
              <div key={section.id} className="bg-white rounded-lg border border-[#dbdbdb] p-4">
                <h3 className={`font-bold ${headingFont} mb-3 text-sm`}>{section.title}</h3>
                <div className="space-y-3">
                  {section.entries.map((entry, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-1 rounded-full shrink-0" style={{ background: "linear-gradient(180deg, #e1306c, #405de6)" }} />
                      <div>
                        <p className="text-sm font-semibold">{entry.title}</p>
                        {entry.subtitle && <p className="text-xs text-[#8e8e8e]">{entry.subtitle}</p>}
                        {entry.dateRange && <p className="text-[10px] text-[#8e8e8e] mt-0.5">{entry.dateRange}</p>}
                        {entry.description && <p className="text-xs text-[#8e8e8e] mt-1 leading-relaxed">{entry.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Contact — Link in Bio */}
        <footer id="contact" className="bg-white rounded-lg border border-[#dbdbdb] p-4 mb-6 scroll-mt-16">
          <h2 className={`font-bold ${headingFont} text-sm mb-3`}>{customization?.sectionLabels?.contact ?? "צור קשר"}</h2>
          <div className="space-y-2">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-[#00376b] hover:text-[#e1306c] transition-colors p-2 rounded-lg hover:bg-[#fafafa]">
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm text-[#00376b] hover:text-[#e1306c] transition-colors p-2 rounded-lg hover:bg-[#fafafa]">
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#00376b] hover:text-[#e1306c] transition-colors p-2 rounded-lg hover:bg-[#fafafa]">
                <Globe className="h-4 w-4" /> אתר אישי
              </a>
            )}
            {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#00376b] hover:text-[#e1306c] transition-colors p-2 rounded-lg hover:bg-[#fafafa]">
                <ExternalLink className="h-4 w-4" /> {key}
              </a>
            ))}
          </div>
        </footer>

        <p className="text-xs text-[#c7c7c7] text-center py-4">{student.name} &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
