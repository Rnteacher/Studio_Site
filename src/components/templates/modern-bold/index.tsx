"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function ModernBold({
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-black text-white font-heebo" dir="rtl">
      {/* Hero */}
      <header className="min-h-[60vh] flex items-center px-6 py-20 bg-gradient-to-bl from-violet-600 via-black to-black">
        <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row items-center gap-10">
          {about.imageUrl && (
            <img
              src={about.imageUrl}
              alt={about.title}
              className="w-48 h-48 rounded-2xl object-cover shadow-2xl shadow-violet-500/20"
            />
          )}
          <div>
            <h1 className="text-5xl md:text-7xl font-black font-rubik mb-4 bg-gradient-to-l from-violet-400 to-white bg-clip-text text-transparent">
              {about.title || "הפורטפוליו שלי"}
            </h1>
            {about.body && (
              <p className="text-gray-400 text-lg max-w-xl">{about.body}</p>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-3xl font-black font-rubik mb-8">פרויקטים</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-900 rounded-2xl overflow-hidden group hover:bg-gray-800 transition-colors">
                  {project.media[0]?.thumbnailUrl ? (
                    <img src={project.media[0].thumbnailUrl} alt={project.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-44 bg-gradient-to-br from-violet-900/50 to-gray-900" />
                  )}
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                    {project.description && <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">{tag}</span>
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
            <h2 className="text-3xl font-black font-rubik mb-8">קורות חיים</h2>
            <div className="space-y-8">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-xl font-bold mb-4 text-violet-400">{section.title}</h3>
                  <div className="space-y-4">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="bg-gray-900 rounded-xl p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold">{entry.title}</p>
                            {entry.subtitle && <p className="text-sm text-gray-400">{entry.subtitle}</p>}
                          </div>
                          {entry.dateRange && <span className="text-xs text-violet-400 bg-violet-500/10 px-2 py-1 rounded">{entry.dateRange}</span>}
                        </div>
                        {entry.description && <p className="text-sm text-gray-500 mt-2">{entry.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <footer className="border-t border-gray-800 pt-8">
          <h2 className="text-3xl font-black font-rubik mb-6">בואו נדבר</h2>
          <div className="flex flex-wrap gap-4">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-full hover:bg-violet-500 transition-colors">
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
                <Globe className="h-4 w-4" /> אתר
              </a>
            )}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-violet-400 flex items-center gap-1">
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
