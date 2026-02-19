"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function ClassicElegant({
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-heebo" dir="rtl">
      {/* Hero */}
      <header className="relative bg-stone-800 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {about.imageUrl && (
            <img
              src={about.imageUrl}
              alt={about.title}
              className="w-40 h-40 rounded-full object-cover border-4 border-white/20 shadow-lg"
            />
          )}
          <div className="text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-bold font-rubik mb-3">{about.title || "הפורטפוליו שלי"}</h1>
            {about.body && (
              <p className="text-stone-300 text-lg max-w-xl leading-relaxed line-clamp-3">{about.body}</p>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        {/* About (full) */}
        {about.body && (
          <section>
            <h2 className="text-sm uppercase tracking-widest text-stone-400 mb-4 font-rubik">אודות</h2>
            <p className="text-stone-700 text-lg leading-relaxed whitespace-pre-line">{about.body}</p>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-sm uppercase tracking-widest text-stone-400 mb-8 font-rubik">פרויקטים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {project.media[0]?.thumbnailUrl ? (
                    <img src={project.media[0].thumbnailUrl} alt={project.title} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-stone-200" />
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    {project.description && <p className="text-stone-600 text-sm mb-3">{project.description}</p>}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">{tag}</span>
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
          <section>
            <h2 className="text-sm uppercase tracking-widest text-stone-400 mb-8 font-rubik">קורות חיים</h2>
            <div className="space-y-10">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-stone-200">{section.title}</h3>
                  <div className="space-y-5">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-24 shrink-0 text-sm text-stone-400 pt-1">{entry.dateRange}</div>
                        <div>
                          <p className="font-medium">{entry.title}</p>
                          {entry.subtitle && <p className="text-sm text-stone-500">{entry.subtitle}</p>}
                          {entry.description && <p className="text-sm text-stone-600 mt-1">{entry.description}</p>}
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
        <footer className="bg-stone-800 text-white rounded-xl p-8">
          <h2 className="text-sm uppercase tracking-widest text-stone-400 mb-4 font-rubik">יצירת קשר</h2>
          <div className="flex flex-wrap gap-6">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-stone-300 hover:text-white">
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-stone-300 hover:text-white">
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-stone-300 hover:text-white">
                <Globe className="h-4 w-4" /> אתר
              </a>
            )}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-400 hover:text-white flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" /> {key}
                </a>
              ))}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
