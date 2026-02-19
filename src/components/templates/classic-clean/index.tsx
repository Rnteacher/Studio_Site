"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function ClassicClean({
  portfolio,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-heebo" dir="rtl">
      {/* Header */}
      <header className="bg-gray-50 border-b py-16 px-6 text-center">
        {about.imageUrl && (
          <img
            src={about.imageUrl}
            alt={about.title}
            className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
          />
        )}
        <h1 className="text-4xl font-bold font-rubik mb-2">{about.title || "הפורטפוליו שלי"}</h1>
        {contact.email && (
          <p className="text-gray-500">{contact.email}</p>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-16">
        {/* About */}
        {about.body && (
          <section>
            <h2 className="text-2xl font-bold font-rubik mb-4">אודות</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{about.body}</p>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold font-rubik mb-6">פרויקטים</h2>
            <div className="space-y-8">
              {projects.map((project) => (
                <div key={project.id} className="border-b pb-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  {project.description && (
                    <p className="text-gray-600 mb-3">{project.description}</p>
                  )}
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  )}
                  {project.media.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {project.media.map((m) => (
                        <a
                          key={m.id}
                          href={m.webViewUrl ?? "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aspect-square bg-gray-100 rounded overflow-hidden hover:opacity-80 transition-opacity"
                        >
                          {m.thumbnailUrl ? (
                            <img src={m.thumbnailUrl} alt={m.fileName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              {m.fileName}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CV */}
        {cvSections.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold font-rubik mb-6">קורות חיים</h2>
            <div className="space-y-8">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-lg font-semibold border-b pb-2 mb-4">{section.title}</h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="pr-4 border-r-2 border-gray-200">
                        <p className="font-medium">{entry.title}</p>
                        {entry.subtitle && <p className="text-sm text-gray-600">{entry.subtitle}</p>}
                        {entry.dateRange && <p className="text-xs text-gray-400">{entry.dateRange}</p>}
                        {entry.description && <p className="text-sm text-gray-500 mt-1">{entry.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <footer className="border-t pt-8">
          <h2 className="text-2xl font-bold font-rubik mb-4">יצירת קשר</h2>
          <div className="flex flex-wrap gap-4">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                <Globe className="h-4 w-4" /> אתר אישי
              </a>
            )}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  {key}
                </a>
              ))}
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}
