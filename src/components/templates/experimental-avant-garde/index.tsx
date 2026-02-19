"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function ExperimentalAvantGarde({
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-heebo selection:bg-lime-400 selection:text-black" dir="rtl">
      {/* Hero — brutalist */}
      <header className="border-b-4 border-lime-400">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col justify-center">
            <span className="text-lime-400 text-sm font-mono mb-2">// portfolio</span>
            <h1 className="text-6xl md:text-8xl font-black font-rubik leading-none tracking-tight">
              {about.title || "פורטפוליו"}
            </h1>
            {about.body && (
              <p className="text-zinc-500 mt-6 max-w-md font-mono text-sm leading-relaxed">{about.body}</p>
            )}
          </div>
          {about.imageUrl && (
            <div className="flex justify-center md:justify-end">
              <img
                src={about.imageUrl}
                alt={about.title}
                className="w-64 h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500 mix-blend-luminosity hover:mix-blend-normal"
              />
            </div>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        {/* Projects — grid with numbering */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-lime-400 font-mono text-sm mb-8">{"{"} פרויקטים {"}"}</h2>
            <div className="space-y-1">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="group border border-zinc-800 hover:border-lime-400 transition-colors p-6 flex gap-6"
                >
                  <span className="text-4xl font-black text-zinc-800 group-hover:text-lime-400 transition-colors font-mono">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    {project.description && <p className="text-zinc-500 text-sm mt-2">{project.description}</p>}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs font-mono text-lime-400/70 border border-lime-400/30 px-2 py-0.5">{tag}</span>
                        ))}
                      </div>
                    )}
                    {project.media.length > 0 && (
                      <div className="flex gap-2 mt-4">
                        {project.media.slice(0, 4).map((m) => (
                          <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-zinc-900 overflow-hidden hover:ring-1 hover:ring-lime-400 transition-all">
                            {m.thumbnailUrl ? (
                              <img src={m.thumbnailUrl} alt={m.fileName} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[8px] font-mono text-zinc-600">{m.fileName}</div>
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

        {/* CV — monospace grid */}
        {cvSections.length > 0 && (
          <section>
            <h2 className="text-lime-400 font-mono text-sm mb-8">{"{"} קורות חיים {"}"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cvSections.map((section) => (
                <div key={section.id} className="border border-zinc-800 p-6">
                  <h3 className="font-bold text-lg mb-4 border-b border-zinc-800 pb-2">{section.title}</h3>
                  <div className="space-y-3 font-mono text-sm">
                    {section.entries.map((entry, i) => (
                      <div key={i}>
                        <div className="flex justify-between">
                          <span className="text-zinc-300">{entry.title}</span>
                          {entry.dateRange && <span className="text-zinc-600">{entry.dateRange}</span>}
                        </div>
                        {entry.subtitle && <p className="text-zinc-500 text-xs">{entry.subtitle}</p>}
                        {entry.description && <p className="text-zinc-600 text-xs mt-1">{entry.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <footer className="border-t-4 border-lime-400 pt-8">
          <h2 className="text-lime-400 font-mono text-sm mb-6">{"{"} קשר {"}"}</h2>
          <div className="flex flex-wrap gap-4 font-mono text-sm">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-zinc-400 hover:text-lime-400 transition-colors">
                <Mail className="h-4 w-4" /> {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-zinc-400 hover:text-lime-400 transition-colors">
                <Phone className="h-4 w-4" /> {contact.phone}
              </a>
            )}
            {contact.website && (
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-lime-400 transition-colors">
                <Globe className="h-4 w-4" /> www
              </a>
            )}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-zinc-600 hover:text-lime-400 flex items-center gap-1">
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
