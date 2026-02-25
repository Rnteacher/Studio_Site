"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function AcademicScience({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont ? `font-${customization.bodyFont}` : 'font-mono';
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : 'font-heebo';

  return (
    <div
      className={`min-h-screen text-[#1f2937] ${bodyFont} scroll-smooth`}
      dir="rtl"
      style={{
        background: "#f9fafb",
        backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        '--t-primary': customization?.colors?.primary ?? '#1e40af',
        '--t-accent': customization?.colors?.accent ?? '#3b82f6',
        '--t-bg': customization?.colors?.bg ?? '#f8fafc',
        '--t-text': customization?.colors?.text ?? '#1e293b',
      } as React.CSSProperties}
    >
      {/* Nav — minimal academic */}
      <nav className="sticky top-0 z-50 bg-[#f9fafb]/90 backdrop-blur-sm border-b border-[#d1d5db]">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-12">
          <span className={`${headingFont} font-bold text-sm text-[#1f2937] truncate`}>{student.name}</span>
          <div className="flex items-center gap-6">
            <a href="#about" className="text-xs text-[#6b7280] hover:text-[#2563eb] transition-colors">1. {customization?.sectionLabels?.about ?? "אודות"}</a>
            <a href="#projects" className="text-xs text-[#6b7280] hover:text-[#2563eb] transition-colors">2. {customization?.sectionLabels?.projects ?? "פרויקטים"}</a>
            <a href="#cv" className="text-xs text-[#6b7280] hover:text-[#2563eb] transition-colors">3. {customization?.sectionLabels?.cv ?? "קורות חיים"}</a>
            <a href="#contact" className="text-xs text-[#6b7280] hover:text-[#2563eb] transition-colors">4. {customization?.sectionLabels?.contact ?? "התכתבות"}</a>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Paper Title */}
        <header className="text-center mb-16 pb-8 border-b-2 border-[#1f2937]">
          {student.image && (
            <img src={student.image} alt={student.name} className="w-28 h-28 rounded-full object-cover mx-auto mb-6 border-2 border-[#d1d5db]" />
          )}
          <h1 className={`text-3xl md:text-4xl font-bold ${headingFont} mb-3 leading-tight`}>{student.name}</h1>
          {about.subtitle && (
            <p className="text-[#6b7280] text-lg italic">{about.subtitle}</p>
          )}
          <div className="flex justify-center gap-4 mt-4 text-xs text-[#6b7280]">
            {contact.email && <span>{contact.email}</span>}
            {contact.phone && <span>{contact.phone}</span>}
          </div>
        </header>

        {/* 1. About — Abstract */}
        <section id="about" className="mb-16 scroll-mt-16">
          <h2 className={`text-xl font-bold ${headingFont} mb-4 text-[#2563eb]`}>
            <span className="text-[#6b7280] font-mono">1.</span> {about.title || "תקציר"}
          </h2>
          <div className="border-r-2 border-[#2563eb] pr-6">
            {about.body && (
              <p className="text-[#374151] leading-[1.9] whitespace-pre-line text-sm" style={{ textIndent: "2rem" }}>
                {about.body}
              </p>
            )}
          </div>
        </section>

        {/* 2. Projects — References/Citations */}
        {projects.length > 0 && (
          <section id="projects" className="mb-16 scroll-mt-16">
            <h2 className={`text-xl font-bold ${headingFont} mb-6 text-[#2563eb]`}>
              <span className="text-[#6b7280] font-mono">2.</span> {customization?.sectionLabels?.projects ?? "פרויקטים"}
            </h2>
            <div className="space-y-6">
              {projects.map((project, pi) => (
                <article key={project.id} className="bg-white/60 border border-[#d1d5db] rounded-lg p-6">
                  <div className="flex gap-3">
                    <span className="text-[#6b7280] font-mono text-sm shrink-0">[{pi + 1}]</span>
                    <div className="flex-1">
                      <h3 className={`font-bold ${headingFont} text-lg mb-1`}>{project.title}</h3>
                      {project.tags.length > 0 && (
                        <p className="text-xs text-[#2563eb] mb-2 italic">
                          מילות מפתח: {project.tags.join(", ")}
                        </p>
                      )}
                      {project.description && (
                        <p className="text-sm text-[#4b5563] leading-relaxed">{project.description}</p>
                      )}
                      {project.media.length > 0 && (
                        <div className="flex gap-3 mt-4 overflow-x-auto">
                          {project.media.slice(0, 4).map((m) => (
                            <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="shrink-0">
                              {m.thumbnailUrl ? (
                                <img src={m.thumbnailUrl} alt={m.fileName} className="w-24 h-18 object-cover rounded border border-[#d1d5db] hover:border-[#2563eb] transition-colors" />
                              ) : (
                                <div className="w-24 h-18 bg-[#f3f4f6] rounded border border-[#d1d5db] flex items-center justify-center text-[10px] text-[#9ca3af]">
                                  {m.fileName}
                                </div>
                              )}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 3. CV — Structured */}
        {cvSections.length > 0 && (
          <section id="cv" className="mb-16 scroll-mt-16">
            <h2 className={`text-xl font-bold ${headingFont} mb-6 text-[#2563eb]`}>
              <span className="text-[#6b7280] font-mono">3.</span> {customization?.sectionLabels?.cv ?? "קורות חיים"}
            </h2>
            <div className="space-y-8">
              {cvSections.map((section, si) => (
                <div key={section.id} className="bg-white/60 border border-[#d1d5db] rounded-lg p-6">
                  <h3 className={`font-bold ${headingFont} text-lg mb-4 pb-2 border-b border-[#e5e7eb]`}>
                    <span className="text-[#6b7280] font-mono text-sm">3.{si + 1}</span> {section.title}
                  </h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {section.entries.map((entry, i) => (
                        <tr key={i} className="border-b border-[#f3f4f6] last:border-b-0">
                          <td className="py-3 pl-4 align-top font-semibold text-[#1f2937] w-1/3">
                            {entry.title}
                            {entry.subtitle && (
                              <span className="block text-xs text-[#6b7280] font-normal mt-0.5">{entry.subtitle}</span>
                            )}
                          </td>
                          <td className="py-3 align-top text-[#4b5563]">
                            {entry.description}
                            {entry.dateRange && (
                              <span className="block text-xs text-[#9ca3af] mt-1">{entry.dateRange}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Contact — Correspondence */}
        <footer id="contact" className="mb-16 scroll-mt-16">
          <h2 className={`text-xl font-bold ${headingFont} mb-6 text-[#2563eb]`}>
            <span className="text-[#6b7280] font-mono">4.</span> התכתבות
          </h2>
          <div className="bg-white/60 border border-[#d1d5db] rounded-lg p-6">
            <div className="space-y-3">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-[#4b5563] hover:text-[#2563eb] transition-colors">
                  <Mail className="h-4 w-4 text-[#2563eb]" /> {contact.email}
                </a>
              )}
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm text-[#4b5563] hover:text-[#2563eb] transition-colors">
                  <Phone className="h-4 w-4 text-[#2563eb]" /> {contact.phone}
                </a>
              )}
              {contact.website && (
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#4b5563] hover:text-[#2563eb] transition-colors">
                  <Globe className="h-4 w-4 text-[#2563eb]" /> אתר אישי
                </a>
              )}
            </div>
            {Object.keys(socialLinks).length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-[#e5e7eb]">
                {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-[#6b7280] hover:text-[#2563eb] flex items-center gap-1.5 transition-colors">
                    <ExternalLink className="h-3 w-3" /> {key}
                  </a>
                ))}
              </div>
            )}
          </div>
        </footer>

        {/* Footnote */}
        <div className="border-t border-[#d1d5db] pt-6 text-center">
          <p className="text-[10px] text-[#9ca3af]">
            <sup>*</sup> {student.name} &copy; {new Date().getFullYear()} | מסמך זה נוצר באופן דיגיטלי
          </p>
        </div>
      </div>
    </div>
  );
}
