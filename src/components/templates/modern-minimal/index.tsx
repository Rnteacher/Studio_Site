"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ArrowUpLeft } from "lucide-react";

export default function ModernMinimal({
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-heebo" dir="rtl">
      {/* Header */}
      <header className="max-w-2xl mx-auto px-6 pt-20 pb-12">
        <div className="flex items-center gap-5 mb-8">
          {about.imageUrl && (
            <img
              src={about.imageUrl}
              alt={about.title}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <h1 className="text-3xl font-bold font-rubik">{about.title || "הפורטפוליו שלי"}</h1>
        </div>
        {about.body && (
          <p className="text-neutral-500 leading-relaxed whitespace-pre-line">{about.body}</p>
        )}
      </header>

      <div className="max-w-2xl mx-auto px-6 pb-20 space-y-16">
        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">פרויקטים</h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="group">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      {project.description && (
                        <p className="text-neutral-500 text-sm mt-1">{project.description}</p>
                      )}
                    </div>
                    <ArrowUpLeft className="h-4 w-4 text-neutral-300 group-hover:text-neutral-900 transition-colors mt-1" />
                  </div>
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs text-neutral-400">{tag}</span>
                      ))}
                    </div>
                  )}
                  {project.media.length > 0 && (
                    <div className="flex gap-2 mt-3 overflow-x-auto">
                      {project.media.slice(0, 3).map((m) => (
                        <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer">
                          {m.thumbnailUrl ? (
                            <img src={m.thumbnailUrl} alt={m.fileName} className="w-20 h-20 object-cover rounded" />
                          ) : (
                            <div className="w-20 h-20 bg-neutral-100 rounded flex items-center justify-center text-[10px] text-neutral-400">{m.fileName}</div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                  <div className="border-b border-neutral-100 mt-6" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CV */}
        {cvSections.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-[0.2em] text-neutral-400 mb-6">קורות חיים</h2>
            <div className="space-y-8">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="font-semibold mb-3">{section.title}</h3>
                  <div className="space-y-3">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="flex gap-3">
                        <span className="text-xs text-neutral-400 w-20 shrink-0 mt-0.5">{entry.dateRange}</span>
                        <div>
                          <p className="text-sm font-medium">{entry.title}</p>
                          {entry.subtitle && <p className="text-xs text-neutral-500">{entry.subtitle}</p>}
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
        <footer className="pt-8 border-t border-neutral-100">
          <div className="flex flex-wrap gap-6 text-sm text-neutral-500">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-neutral-900">
                <Mail className="h-3.5 w-3.5" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center gap-1.5 hover:text-neutral-900">
                <Phone className="h-3.5 w-3.5" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-neutral-900">
                <Globe className="h-3.5 w-3.5" /> אתר
              </a>
            )}
            {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900">{key}</a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
