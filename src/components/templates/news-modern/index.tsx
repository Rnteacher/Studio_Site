"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

export default function NewsModern({
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

  const now = new Date();
  const dateStr = now.toLocaleDateString(lang === "en" ? "en-US" : "he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString(lang === "en" ? "en-US" : "he-IL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  /* Collect all unique tags for the tag cloud widget */
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags).filter(Boolean))
  );

  /* Stats */
  const totalEntries = cvSections.reduce((a, s) => a + s.entries.length, 0);

  /* Lead project (first) and the rest */
  const leadProject = projects[0] ?? null;
  const gridProjects = projects.slice(1, 5);

  return (
    <div
      className={`min-h-screen bg-[#ffffff] text-[#222222] ${bodyFont} scroll-smooth`}
      dir={lang === "en" ? "ltr" : "rtl"}
      style={
        {
          "--t-primary": customization?.colors?.primary ?? "#cc0000",
          "--t-accent": customization?.colors?.accent ?? "#cc0000",
          "--t-bg": customization?.colors?.bg ?? "#ffffff",
          "--t-text": customization?.colors?.text ?? "#222222",
        } as React.CSSProperties
      }
    >
      {/* ── Breaking news ticker ── */}
      <div className="bg-[var(--t-primary)] text-white overflow-hidden">
        <div className="flex items-center h-9">
          <span
            className={`shrink-0 bg-white text-[var(--t-primary)] text-xs font-bold uppercase px-3 py-1 ${headingFont} tracking-wide`}
          >
            {lang === "en" ? "Breaking" : "מבזק"}
          </span>
          <div className="overflow-hidden whitespace-nowrap flex-1 relative">
            <p className="inline-block animate-marquee text-sm ps-4">
              {about.subtitle
                ? about.subtitle
                : lang === "en"
                  ? `${student.name} — Portfolio now live. Explore projects and experience.`
                  : `${student.name} — הפורטפוליו עכשיו באוויר. גלו פרויקטים וניסיון.`}
              <span className="mx-8 text-white/60">&#9679;</span>
              {projects.length > 0 &&
                projects
                  .slice(0, 3)
                  .map((p) => p.title)
                  .join("  \u2022  ")}
            </p>
          </div>
        </div>
      </div>

      {/* ── Sticky navigation ── */}
      <nav className="sticky top-0 z-50 bg-white border-b-[3px] border-[var(--t-primary)] shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <a
            href="#"
            className={`${headingFont} font-black text-2xl text-[var(--t-primary)] leading-none`}
          >
            {student.name}
          </a>
          <div className="flex items-center gap-6">
            <a
              href="#about"
              className="text-sm font-semibold text-[#555] hover:text-[var(--t-primary)] transition-colors"
            >
              {customization?.sectionLabels?.about ??
                (lang === "en" ? "About" : "\u05D0\u05D5\u05D3\u05D5\u05EA")}
            </a>
            <a
              href="#projects"
              className="text-sm font-semibold text-[#555] hover:text-[var(--t-primary)] transition-colors"
            >
              {customization?.sectionLabels?.projects ??
                (lang === "en"
                  ? "Projects"
                  : "\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD")}
            </a>
            <a
              href="#cv"
              className="text-sm font-semibold text-[#555] hover:text-[var(--t-primary)] transition-colors"
            >
              {customization?.sectionLabels?.cv ??
                (lang === "en"
                  ? "Experience"
                  : "\u05E0\u05D9\u05E1\u05D9\u05D5\u05DF")}
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold text-[#555] hover:text-[var(--t-primary)] transition-colors"
            >
              {customization?.sectionLabels?.contact ??
                (lang === "en"
                  ? "Contact"
                  : "\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8")}
            </a>
          </div>
        </div>
      </nav>

      {/* Dateline bar */}
      <div className="bg-[#f4f4f4] border-b border-[#ddd]">
        <div className="max-w-6xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <span className="text-[11px] text-[#888]">
            {dateStr} &middot; {timeStr}
          </span>
          <span className="text-[11px] text-[var(--t-primary)] font-bold uppercase tracking-wider">
            {lang === "en" ? "Live" : "\u05E9\u05D9\u05D3\u05D5\u05E8 \u05D7\u05D9"}
          </span>
        </div>
      </div>

      {/* ── Hero: Lead Story ── */}
      <section id="about" className="scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main lead */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded group">
                {student.image ? (
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-full h-[340px] md:h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-[340px] md:h-[420px] bg-gradient-to-br from-[#222] to-[#555]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <span className="inline-block bg-[var(--t-primary)] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-3">
                    {lang === "en" ? "Featured" : "\u05DB\u05EA\u05D1\u05D4 \u05E8\u05D0\u05E9\u05D9\u05EA"}
                  </span>
                  <h1
                    className={`text-3xl md:text-4xl font-black ${headingFont} text-white leading-tight mb-2`}
                  >
                    {about.title || student.name}
                  </h1>
                  {about.subtitle && (
                    <p className="text-white/80 text-sm md:text-base max-w-xl">
                      {about.subtitle}
                    </p>
                  )}
                </div>
              </div>
              {/* About body text */}
              {about.body && (
                <div className="mt-6 border-s-4 border-[var(--t-primary)] ps-4">
                  <p className="text-[15px] leading-[1.8] text-[var(--t-text)] whitespace-pre-line">
                    {about.body}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar widgets */}
            <aside className="space-y-6">
              {/* Stats counter widget */}
              <div className="bg-[#f4f4f4] rounded p-5">
                <h3
                  className={`text-xs font-bold uppercase tracking-wider text-[#888] mb-4 ${headingFont}`}
                >
                  {lang === "en"
                    ? "At a Glance"
                    : "\u05D1\u05DE\u05D1\u05D8 \u05D7\u05D8\u05D5\u05E3"}
                </h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p
                      className={`text-2xl font-black ${headingFont} text-[var(--t-primary)]`}
                    >
                      {projects.length}
                    </p>
                    <p className="text-[10px] text-[#888] mt-1">
                      {customization?.sectionLabels?.projects ??
                        (lang === "en"
                          ? "Projects"
                          : "\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD")}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-2xl font-black ${headingFont} text-[var(--t-primary)]`}
                    >
                      {cvSections.length}
                    </p>
                    <p className="text-[10px] text-[#888] mt-1">
                      {lang === "en"
                        ? "Fields"
                        : "\u05EA\u05D7\u05D5\u05DE\u05D9\u05DD"}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-2xl font-black ${headingFont} text-[var(--t-primary)]`}
                    >
                      {totalEntries}
                    </p>
                    <p className="text-[10px] text-[#888] mt-1">
                      {lang === "en"
                        ? "Entries"
                        : "\u05E8\u05E9\u05D5\u05DE\u05D5\u05EA"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tag cloud widget */}
              {allTags.length > 0 && (
                <div className="bg-[#f4f4f4] rounded p-5">
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider text-[#888] mb-4 ${headingFont}`}
                  >
                    {lang === "en"
                      ? "Topics"
                      : "\u05E0\u05D5\u05E9\u05D0\u05D9\u05DD"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-white border border-[#ddd] text-[#555] px-2.5 py-1 rounded-sm hover:border-[var(--t-primary)] hover:text-[var(--t-primary)] transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Latest headlines mini-list */}
              {projects.length > 0 && (
                <div className="bg-[#f4f4f4] rounded p-5">
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider text-[#888] mb-4 ${headingFont}`}
                  >
                    {lang === "en"
                      ? "Latest"
                      : "\u05D0\u05D7\u05E8\u05D5\u05E0\u05D9\u05DD"}
                  </h3>
                  <div className="space-y-3">
                    {projects.slice(0, 4).map((p, i) => (
                      <a
                        key={p.id}
                        href={`#project-${p.id}`}
                        className="flex items-start gap-3 group"
                      >
                        <span
                          className={`text-lg font-black ${headingFont} text-[var(--t-primary)] shrink-0 w-6 text-end`}
                        >
                          {i + 1}
                        </span>
                        <span className="text-sm leading-tight text-[#333] group-hover:text-[var(--t-primary)] transition-colors line-clamp-2">
                          {p.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Red divider */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-[3px] bg-[var(--t-primary)]" />
      </div>

      {/* ── Projects: News Grid ── */}
      {projects.length > 0 && (
        <section id="projects" className="scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <h2
              className={`text-2xl font-black ${headingFont} text-[var(--t-text)] mb-1`}
            >
              {customization?.sectionLabels?.projects ??
                (lang === "en"
                  ? "Projects"
                  : "\u05E4\u05E8\u05D5\u05D9\u05E7\u05D8\u05D9\u05DD")}
            </h2>
            <div className="h-[3px] bg-[var(--t-primary)] w-16 mb-8" />

            {/* Lead + 4 grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Lead project */}
              {leadProject && (
                <article
                  id={`project-${leadProject.id}`}
                  className="lg:row-span-2 group"
                >
                  <div className="relative overflow-hidden rounded mb-4">
                    {leadProject.media[0]?.thumbnailUrl ? (
                      <img
                        src={leadProject.media[0].thumbnailUrl}
                        alt={leadProject.title}
                        className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-72 bg-[#eee]" />
                    )}
                    <span className="absolute top-3 start-3 bg-[var(--t-primary)] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                      {leadProject.tags[0] ||
                        (lang === "en"
                          ? "Featured"
                          : "\u05DE\u05D5\u05D1\u05D7\u05E8")}
                    </span>
                  </div>
                  <h3
                    className={`text-xl font-black ${headingFont} text-[var(--t-text)] mb-2 group-hover:text-[var(--t-primary)] transition-colors`}
                  >
                    {leadProject.title}
                  </h3>
                  {leadProject.description && (
                    <p className="text-sm text-[#666] leading-relaxed line-clamp-4 mb-3">
                      {leadProject.description}
                    </p>
                  )}
                  {leadProject.media.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {leadProject.media.slice(1, 5).map((m) => (
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
                              className="w-20 h-14 object-cover rounded hover:opacity-80 transition-opacity"
                            />
                          ) : (
                            <div className="w-20 h-14 bg-[#eee] rounded flex items-center justify-center text-[10px] text-[#888]">
                              {m.fileName}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                  <p className="text-[10px] text-[#aaa] mt-3">{dateStr}</p>
                </article>
              )}

              {/* Grid of 4 smaller articles */}
              {gridProjects.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {gridProjects.map((project) => (
                    <article
                      key={project.id}
                      id={`project-${project.id}`}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded mb-3">
                        {project.media[0]?.thumbnailUrl ? (
                          <img
                            src={project.media[0].thumbnailUrl}
                            alt={project.title}
                            className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-36 bg-[#eee]" />
                        )}
                        <span className="absolute top-2 start-2 bg-[var(--t-primary)] text-white text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">
                          {project.tags[0] ||
                            (lang === "en"
                              ? "Featured"
                              : "\u05DE\u05D5\u05D1\u05D7\u05E8")}
                        </span>
                      </div>
                      <h3
                        className={`text-sm font-bold ${headingFont} text-[var(--t-text)] mb-1 group-hover:text-[var(--t-primary)] transition-colors line-clamp-2`}
                      >
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-xs text-[#666] leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      )}
                      <p className="text-[9px] text-[#aaa] mt-2">{dateStr}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining projects as a list */}
            {projects.length > 5 && (
              <div className="mt-8 border-t-[3px] border-[var(--t-primary)] pt-6">
                <h3
                  className={`text-sm font-bold uppercase tracking-wider text-[#888] mb-4 ${headingFont}`}
                >
                  {lang === "en"
                    ? "More Stories"
                    : "\u05E2\u05D5\u05D3 \u05E1\u05D9\u05E4\u05D5\u05E8\u05D9\u05DD"}
                </h3>
                <div className="space-y-4">
                  {projects.slice(5).map((project) => (
                    <article
                      key={project.id}
                      id={`project-${project.id}`}
                      className="flex items-start gap-4 group pb-4 border-b border-[#eee]"
                    >
                      {project.media[0]?.thumbnailUrl && (
                        <img
                          src={project.media[0].thumbnailUrl}
                          alt={project.title}
                          className="w-24 h-16 object-cover rounded shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        {project.tags[0] && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--t-primary)]">
                            {project.tags[0]}
                          </span>
                        )}
                        <h4
                          className={`text-sm font-bold ${headingFont} text-[var(--t-text)] group-hover:text-[var(--t-primary)] transition-colors line-clamp-1`}
                        >
                          {project.title}
                        </h4>
                        {project.description && (
                          <p className="text-xs text-[#888] line-clamp-1 mt-0.5">
                            {project.description}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Red divider */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-[3px] bg-[var(--t-primary)]" />
      </div>

      {/* ── CV: Opinion / Editorial Timeline ── */}
      {cvSections.length > 0 && (
        <section id="cv" className="scroll-mt-20 bg-[#f9f9f9]">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <h2
              className={`text-2xl font-black ${headingFont} text-[var(--t-text)] mb-1`}
            >
              {customization?.sectionLabels?.cv ??
                (lang === "en"
                  ? "Experience"
                  : "\u05E0\u05D9\u05E1\u05D9\u05D5\u05DF")}
            </h2>
            <p className="text-xs text-[#888] uppercase tracking-wider mb-6">
              {lang === "en"
                ? "Opinion & Analysis"
                : "\u05D3\u05E2\u05D5\u05EA \u05D5\u05E0\u05D9\u05EA\u05D5\u05D7"}
            </p>
            <div className="h-[3px] bg-[var(--t-primary)] w-16 mb-8" />

            <div className="space-y-8">
              {cvSections.map((section) => (
                <div key={section.id}>
                  <h3
                    className={`text-lg font-bold ${headingFont} text-[var(--t-text)] mb-4 flex items-center gap-3`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[var(--t-primary)] shrink-0" />
                    {section.title}
                  </h3>
                  <div className="border-s-2 border-[#ddd] ms-1 ps-6 space-y-5">
                    {section.entries.map((entry, i) => (
                      <div key={i} className="relative">
                        {/* Timeline dot */}
                        <span className="absolute -start-[calc(1.5rem+5px)] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--t-primary)] border-2 border-white" />
                        <div>
                          <h4 className="text-sm font-bold text-[var(--t-text)]">
                            {entry.title}
                          </h4>
                          {entry.subtitle && (
                            <p className="text-xs text-[#888] mt-0.5">
                              {entry.subtitle}
                            </p>
                          )}
                          {entry.dateRange && (
                            <p className="text-[10px] text-[var(--t-primary)] font-semibold mt-1">
                              {entry.dateRange}
                            </p>
                          )}
                          {entry.description && (
                            <p className="text-xs text-[#666] mt-1.5 leading-relaxed">
                              {entry.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Contact: "Send a Tip" Footer ── */}
      <footer id="contact" className="scroll-mt-20 bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left column */}
            <div>
              <span className="inline-block bg-[var(--t-primary)] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mb-4">
                {lang === "en"
                  ? "Send a Tip"
                  : "\u05E9\u05DC\u05D7\u05D5 \u05DC\u05E0\u05D5 \u05D8\u05D9\u05E4"}
              </span>
              <h2
                className={`text-2xl font-black ${headingFont} mb-2`}
              >
                {customization?.sectionLabels?.contact ??
                  (lang === "en"
                    ? "Contact"
                    : "\u05E6\u05D5\u05E8 \u05E7\u05E9\u05E8")}
              </h2>
              <p className="text-sm text-[#999] mb-6">
                {lang === "en"
                  ? "Have a story? Get in touch."
                  : "\u05D9\u05E9 \u05DC\u05DB\u05DD \u05E1\u05D9\u05E4\u05D5\u05E8? \u05E6\u05E8\u05D5 \u05E7\u05E9\u05E8."}
              </p>

              <div className="space-y-3">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 text-sm text-[#ccc] hover:text-[var(--t-primary)] transition-colors"
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-3 text-sm text-[#ccc] hover:text-[var(--t-primary)] transition-colors"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    {contact.phone}
                  </a>
                )}
                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-[#ccc] hover:text-[var(--t-primary)] transition-colors"
                  >
                    <Globe className="h-4 w-4 shrink-0" />
                    {lang === "en"
                      ? "Website"
                      : "\u05D0\u05EA\u05E8 \u05D0\u05D9\u05E9\u05D9"}
                  </a>
                )}
              </div>
            </div>

            {/* Right column — social links */}
            <div>
              {Object.keys(socialLinks).length > 0 && (
                <>
                  <h3
                    className={`text-xs font-bold uppercase tracking-wider text-[#666] mb-4 ${headingFont}`}
                  >
                    {lang === "en"
                      ? "Follow"
                      : "\u05E2\u05E7\u05D1\u05D5 \u05D0\u05D7\u05E8\u05D9\u05E0\u05D5"}
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(socialLinks)
                      .filter(([, v]) => v)
                      .map(([key, url]) => (
                        <a
                          key={key}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-[#999] hover:text-[var(--t-primary)] transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          {key}
                        </a>
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-[#333] flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className={`text-xs text-[#666] ${headingFont}`}>
              {student.name} &copy; {new Date().getFullYear()}
            </p>
            <p className="text-[10px] text-[#444]">
              {lang === "en"
                ? "All Rights Reserved"
                : "\u05DB\u05DC \u05D4\u05D6\u05DB\u05D5\u05D9\u05D5\u05EA \u05E9\u05DE\u05D5\u05E8\u05D5\u05EA"}
            </p>
          </div>
        </div>
      </footer>

      {/* Marquee animation keyframes */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        [dir="rtl"] .animate-marquee {
          animation: marquee-rtl 20s linear infinite;
        }
        [dir="ltr"] .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee-rtl {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
