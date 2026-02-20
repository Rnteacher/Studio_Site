"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "אודות", color: "bg-amber-400" },
  { id: "projects", label: "עבודות", color: "bg-orange-400" },
  { id: "cv", label: "ניסיון", color: "bg-rose-400" },
  { id: "contact", label: "קשר", color: "bg-yellow-400" },
];

export default function ExperimentalCreative({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
}: TemplateProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-heebo scroll-smooth" dir="rtl">
      {/* Side Navigation — desktop vertical, mobile horizontal */}
      <nav className="fixed top-0 right-0 z-50 md:top-1/2 md:-translate-y-1/2 md:right-4 w-full md:w-auto bg-neutral-950/90 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border-b md:border-b-0 border-neutral-800">
        <div className="flex md:flex-col items-center justify-center gap-4 md:gap-6 px-4 py-3 md:px-0 md:py-0">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex items-center gap-2 md:flex-row-reverse"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${item.color} group-hover:scale-150 transition-transform`} />
              <span className="text-xs text-neutral-500 group-hover:text-neutral-100 transition-colors hidden md:inline">
                {item.label}
              </span>
              <span className="text-xs text-neutral-500 group-hover:text-neutral-100 transition-colors md:hidden">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {/* Hero — asymmetric with blob-shaped image */}
      <header id="about" className="relative overflow-hidden pt-16 md:pt-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-amber-400 text-sm tracking-widest uppercase mb-4">
              {about.subtitle}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-rubik leading-[0.9] tracking-tight">
              {student.name}
            </h1>
            {about.body && (
              <p className="text-neutral-400 text-lg mt-8 max-w-lg leading-relaxed">
                {about.body}
              </p>
            )}
          </div>
          {student.image && (
            <div className="order-1 md:order-2 relative mx-auto md:mx-0">
              {/* Offset decorative border */}
              <div className="absolute -inset-3 rounded-[40%_60%_65%_35%/55%_40%_60%_45%] border-2 border-amber-500/40 rotate-3" />
              <div className="absolute -inset-6 rounded-[55%_45%_50%_50%/45%_55%_45%_55%] border border-orange-400/20 -rotate-2" />
              <img
                src={student.image}
                alt={student.name}
                className="w-56 h-56 md:w-72 md:h-72 object-cover rounded-[40%_60%_65%_35%/55%_40%_60%_45%]"
              />
            </div>
          )}
        </div>
      </header>

      {/* Projects — masonry-like staggered grid */}
      {projects.length > 0 && (
        <section id="projects" className="max-w-6xl mx-auto px-6 md:px-12 py-20 scroll-mt-20">
          <h2 className="text-4xl md:text-5xl font-black font-rubik mb-14">
            <span className="text-amber-400">עבודות</span> נבחרות
          </h2>
          <div className="columns-1 md:columns-2 gap-6 space-y-6">
            {projects.map((project, idx) => {
              const isLarge = idx % 3 === 0;
              return (
                <div
                  key={project.id}
                  className={`break-inside-avoid rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm ${
                    isLarge ? "md:p-8 p-6" : "p-5"
                  } ${idx % 2 === 0 ? "md:translate-y-4" : ""}`}
                >
                  {project.media[0]?.thumbnailUrl && (
                    <a
                      href={project.media[0].webViewUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mb-4"
                    >
                      <img
                        src={project.media[0].thumbnailUrl}
                        alt={project.title}
                        className={`w-full object-cover rounded-lg ${
                          isLarge ? "max-h-80" : "max-h-48"
                        }`}
                      />
                    </a>
                  )}
                  <h3
                    className={`font-bold font-rubik ${
                      isLarge ? "text-2xl" : "text-lg"
                    }`}
                  >
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.media.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto">
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
                              className="w-16 h-16 object-cover rounded-lg hover:ring-2 hover:ring-amber-400 transition-all"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-neutral-800 rounded-lg flex items-center justify-center text-[9px] text-neutral-500">
                              {m.fileName}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* CV — horizontal scrollable timeline */}
      {cvSections.length > 0 && (
        <section id="cv" className="py-20 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <h2 className="text-4xl md:text-5xl font-black font-rubik mb-14">
              <span className="text-orange-400">ניסיון</span> מקצועי
            </h2>
          </div>
          <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">
            {cvSections.map((section) => (
              <div key={section.id}>
                <h3 className="text-xl font-bold font-rubik mb-8 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-orange-400" />
                  {section.title}
                </h3>
                {/* Horizontal timeline track */}
                <div className="relative">
                  <div className="absolute top-4 right-0 left-0 h-px bg-neutral-800" />
                  <div className="flex gap-6 overflow-x-auto pb-4 pr-2">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="relative shrink-0 w-64 pt-10">
                        {/* Timeline dot */}
                        <div className="absolute top-2 right-4 w-4 h-4 rounded-full bg-neutral-950 border-2 border-orange-400" />
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                          {entry.dateRange && (
                            <span className="text-xs text-orange-400 mb-2 block">
                              {entry.dateRange}
                            </span>
                          )}
                          <p className="font-bold text-sm">{entry.title}</p>
                          {entry.subtitle && (
                            <p className="text-xs text-neutral-500 mt-1">
                              {entry.subtitle}
                            </p>
                          )}
                          {entry.description && (
                            <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                              {entry.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact / Footer */}
      <footer
        id="contact"
        className="scroll-mt-20 bg-gradient-to-br from-amber-500/10 via-neutral-950 to-orange-500/10 border-t border-neutral-800"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-20">
          <h2 className="text-4xl md:text-5xl font-black font-rubik mb-10">
            <span className="text-amber-400">בואו</span> נדבר
          </h2>
          <div className="flex flex-wrap gap-4">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 px-5 py-3 rounded-full transition-colors"
              >
                <Mail className="h-4 w-4 text-amber-400" />
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 hover:border-orange-500/50 px-5 py-3 rounded-full transition-colors"
              >
                <Phone className="h-4 w-4 text-orange-400" />
                {contact.phone}
              </a>
            )}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 hover:border-yellow-500/50 px-5 py-3 rounded-full transition-colors"
              >
                <Globe className="h-4 w-4 text-yellow-400" />
                אתר
              </a>
            )}
          </div>
          {Object.keys(socialLinks).length > 0 && (
            <div className="flex flex-wrap gap-4 mt-8">
              {Object.entries(socialLinks)
                .filter(([, v]) => v)
                .map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-500 hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {key}
                  </a>
                ))}
            </div>
          )}
          <p className="text-xs text-neutral-700 mt-16">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
