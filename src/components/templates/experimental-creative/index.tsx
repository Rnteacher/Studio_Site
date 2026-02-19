"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function ExperimentalCreative({
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-amber-50 text-amber-950 font-heebo" dir="rtl">
      {/* Hero with asymmetric layout */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-200/50 via-amber-100/30 to-sky-200/50" />
        <div className="relative max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-black font-rubik leading-tight">
              {about.title || "הפורטפוליו שלי"}
            </h1>
            {about.body && (
              <p className="text-amber-800/70 text-lg mt-4 max-w-lg">{about.body}</p>
            )}
          </div>
          {about.imageUrl && (
            <div className="relative">
              <div className="absolute -inset-4 bg-rose-300/30 rounded-[2rem] rotate-3" />
              <img
                src={about.imageUrl}
                alt={about.title}
                className="relative w-full aspect-square object-cover rounded-[2rem] -rotate-2"
              />
            </div>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* Projects — masonry-like */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-4xl font-black font-rubik mb-10 text-rose-600">עבודות</h2>
            <div className="columns-1 md:columns-2 gap-6 space-y-6">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className={`break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-200/50 ${
                    idx % 3 === 0 ? "rotate-[-0.5deg]" : idx % 3 === 1 ? "rotate-[0.5deg]" : ""
                  }`}
                >
                  {project.media[0]?.thumbnailUrl && (
                    <img src={project.media[0].thumbnailUrl} alt={project.title} className="w-full object-cover" />
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    {project.description && <p className="text-amber-800/60 text-sm">{project.description}</p>}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CV — timeline */}
        {cvSections.length > 0 && (
          <section>
            <h2 className="text-4xl font-black font-rubik mb-10 text-sky-600">ניסיון</h2>
            <div className="space-y-10">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-400" />
                    {section.title}
                  </h3>
                  <div className="space-y-4 pr-6 border-r-2 border-sky-200">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -right-[1.6rem] top-1 w-3 h-3 rounded-full bg-sky-300 border-2 border-sky-100" />
                        <p className="font-bold">{entry.title}</p>
                        {entry.subtitle && <p className="text-sm text-amber-700">{entry.subtitle}</p>}
                        {entry.dateRange && <p className="text-xs text-amber-500">{entry.dateRange}</p>}
                        {entry.description && <p className="text-sm text-amber-800/60 mt-1">{entry.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <footer className="bg-gradient-to-r from-rose-100 to-sky-100 rounded-3xl p-8">
          <h2 className="text-2xl font-black font-rubik mb-4">דברו איתי</h2>
          <div className="flex flex-wrap gap-4">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <Mail className="h-4 w-4 text-rose-500" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <Phone className="h-4 w-4 text-sky-500" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow">
                <Globe className="h-4 w-4 text-amber-500" /> אתר
              </a>
            )}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-amber-700 hover:text-rose-600 flex items-center gap-1">
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
