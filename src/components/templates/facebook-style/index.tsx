"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function FacebookStyle({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
  lang,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont
    ? `font-${customization.bodyFont}`
    : "font-open-sans";
  const headingFont = customization?.headingFont
    ? `font-${customization.headingFont}`
    : "font-rubik";

  const labelAbout =
    customization?.sectionLabels?.about ??
    (lang === "en" ? "About" : "אודות");
  const labelProjects =
    customization?.sectionLabels?.projects ??
    (lang === "en" ? "Projects" : "פרויקטים");
  const labelCv =
    customization?.sectionLabels?.cv ??
    (lang === "en" ? "Resume" : "קורות חיים");
  const labelContact =
    customization?.sectionLabels?.contact ??
    (lang === "en" ? "Contact" : "צור קשר");

  type Tab = "about" | "projects" | "cv" | "contact";
  const [activeTab, setActiveTab] = useState<Tab>("about");

  const tabs: { id: Tab; label: string }[] = [
    { id: "about", label: labelAbout },
    { id: "projects", label: labelProjects },
    { id: "cv", label: labelCv },
    { id: "contact", label: labelContact },
  ];

  return (
    <div
      className={`min-h-screen bg-[--t-bg] text-[--t-text] ${bodyFont} scroll-smooth`}
      dir={lang === "en" ? "ltr" : "rtl"}
      style={
        {
          "--t-primary": customization?.colors?.primary ?? "#1877f2",
          "--t-accent": customization?.colors?.accent ?? "#42b72a",
          "--t-bg": customization?.colors?.bg ?? "#f0f2f5",
          "--t-text": customization?.colors?.text ?? "#1c1e21",
        } as React.CSSProperties
      }
    >
      {/* ─── Cover Photo ─── */}
      <div className="relative w-full max-w-[940px] mx-auto">
        <div
          className="h-48 sm:h-64 md:h-80 rounded-b-lg overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, var(--t-primary) 0%, var(--t-accent) 100%)",
          }}
        />

        {/* Profile photo overlapping cover bottom */}
        <div className="absolute -bottom-16 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 sm:start-8 sm:translate-x-0 sm:rtl:translate-x-0 z-10">
          {student.image ? (
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
              <img
                src={student.image}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white bg-[#e4e6eb] shadow-lg flex items-center justify-center">
              <span
                className={`text-4xl font-bold ${headingFont} text-[#65676b]`}
              >
                {student.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ─── Name & Subtitle ─── */}
      <div className="max-w-[940px] mx-auto px-4 pt-20 sm:pt-6 sm:ps-52 pb-4 border-b border-[#dadde1]">
        <h1
          className={`text-2xl sm:text-3xl font-bold ${headingFont} text-center sm:text-start`}
        >
          {student.name}
        </h1>
        {about.subtitle && (
          <p className="text-[#65676b] text-sm mt-1 text-center sm:text-start">
            {about.subtitle}
          </p>
        )}
        {/* Friend-count style stats */}
        <div className="flex items-center justify-center sm:justify-start gap-1 mt-2 text-sm text-[#65676b]">
          <span className="font-semibold text-[--t-primary]">
            {projects.length}
          </span>
          <span>{labelProjects}</span>
          <span className="mx-1">&middot;</span>
          <span className="font-semibold text-[--t-primary]">
            {cvSections.reduce((a, s) => a + s.entries.length, 0)}
          </span>
          <span>{lang === "en" ? "Experiences" : "חוויות"}</span>
        </div>
      </div>

      {/* ─── Tab Navigation ─── */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-[940px] mx-auto px-4 flex items-center gap-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3.5 text-sm font-semibold transition-colors border-b-[3px] whitespace-nowrap ${
                activeTab === tab.id
                  ? "text-[--t-primary] border-[--t-primary]"
                  : "text-[#65676b] border-transparent hover:bg-[#f0f2f5]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* ─── Tab Content ─── */}
      <div className="max-w-[940px] mx-auto px-4 py-4">
        {/* ═══ ABOUT TAB ═══ */}
        {activeTab === "about" && (
          <section id="about" className="max-w-[680px] mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h2 className={`text-xl font-bold ${headingFont} mb-4`}>
                {about.title || labelAbout}
              </h2>

              {/* Info rows (Facebook "About" label:value style) */}
              <div className="space-y-3">
                {about.body && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#e4e6eb] flex items-center justify-center mt-0.5">
                      <svg
                        className="w-4 h-4 text-[#65676b]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#65676b] mb-0.5">
                        {lang === "en" ? "Bio" : "ביוגרפיה"}
                      </p>
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {about.body}
                      </p>
                    </div>
                  </div>
                )}

                {contact.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#e4e6eb] flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[#65676b]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#65676b]">
                        {lang === "en" ? "Email" : "אימייל"}
                      </p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm text-[--t-primary] hover:underline truncate block"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {contact.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#e4e6eb] flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[#65676b]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#65676b]">
                        {lang === "en" ? "Phone" : "טלפון"}
                      </p>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-sm text-[--t-primary] hover:underline"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {contact.website && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[#e4e6eb] flex items-center justify-center">
                      <Globe className="w-4 h-4 text-[#65676b]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#65676b]">
                        {lang === "en" ? "Website" : "אתר אישי"}
                      </p>
                      <a
                        href={contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[--t-primary] hover:underline truncate block"
                      >
                        {contact.website}
                      </a>
                    </div>
                  </div>
                )}

                {Object.entries(socialLinks)
                  .filter(([, v]) => v)
                  .map(([key, url]) => (
                    <div key={key} className="flex items-center gap-3">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-[#e4e6eb] flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-[#65676b]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#65676b]">{key}</p>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[--t-primary] hover:underline truncate block"
                        >
                          {url}
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ PROJECTS TAB (status updates / posts) ═══ */}
        {activeTab === "projects" && (
          <section id="projects" className="max-w-[680px] mx-auto space-y-4">
            {projects.length > 0 ? (
              projects.map((project) => (
                <article
                  key={project.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Post header */}
                  <div className="flex items-center gap-3 p-3">
                    {student.image ? (
                      <img
                        src={student.image}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#e4e6eb] flex items-center justify-center">
                        <span className="text-sm font-bold text-[#65676b]">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">
                        {student.name}
                      </p>
                      <p className="text-xs text-[#65676b]">
                        {lang === "en"
                          ? "Shared a project"
                          : "שיתפ/ה פרויקט"}
                      </p>
                    </div>
                  </div>

                  {/* Post text */}
                  <div className="px-4 pb-3">
                    <h3 className={`font-bold ${headingFont} text-base mb-1`}>
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-sm text-[#606770] leading-relaxed line-clamp-4">
                        {project.description}
                      </p>
                    )}
                    {project.tags.length > 0 && (
                      <p className="text-sm text-[--t-primary] mt-1">
                        {project.tags
                          .map((tag) => `#${tag.replace(/\s/g, "_")}`)
                          .join(" ")}
                      </p>
                    )}
                  </div>

                  {/* Post image */}
                  {project.media[0]?.thumbnailUrl ? (
                    <img
                      src={project.media[0].thumbnailUrl}
                      alt={project.title}
                      className="w-full aspect-video object-cover"
                    />
                  ) : (
                    <div
                      className="w-full aspect-video opacity-15"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--t-primary) 0%, var(--t-accent) 100%)",
                      }}
                    />
                  )}

                  {/* Extra media thumbnails */}
                  {project.media.length > 1 && (
                    <div className="px-4 py-2 flex gap-2 overflow-x-auto">
                      {project.media.slice(1).map((m) => (
                        <a
                          key={m.id}
                          href={m.webViewUrl ?? "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-16 h-16 shrink-0 rounded overflow-hidden bg-[#e4e6eb] hover:opacity-80 transition-opacity"
                        >
                          {m.thumbnailUrl ? (
                            <img
                              src={m.thumbnailUrl}
                              alt={m.fileName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] text-[#65676b]">
                              {m.fileName}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Reaction bar */}
                  <div className="px-4 py-2 border-t border-[#dadde1]">
                    <div className="flex items-center justify-around text-[#65676b] text-sm">
                      <button className="flex items-center gap-1.5 hover:bg-[#f0f2f5] px-3 py-1.5 rounded-md transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3.2a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.7c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                          />
                        </svg>
                        {lang === "en" ? "Like" : "אהבתי"}
                      </button>
                      <button className="flex items-center gap-1.5 hover:bg-[#f0f2f5] px-3 py-1.5 rounded-md transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                          />
                        </svg>
                        {lang === "en" ? "Comment" : "תגובה"}
                      </button>
                      <button className="flex items-center gap-1.5 hover:bg-[#f0f2f5] px-3 py-1.5 rounded-md transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                          />
                        </svg>
                        {lang === "en" ? "Share" : "שיתוף"}
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center text-[#65676b] text-sm">
                {lang === "en"
                  ? "No projects yet"
                  : "אין פרויקטים עדיין"}
              </div>
            )}
          </section>
        )}

        {/* ═══ CV TAB (life events timeline) ═══ */}
        {activeTab === "cv" && (
          <section id="cv" className="max-w-[680px] mx-auto space-y-4">
            {cvSections.length > 0 ? (
              cvSections.map((section) => (
                <div
                  key={section.id}
                  className="bg-white rounded-lg shadow-sm p-5"
                >
                  <h3
                    className={`text-lg font-bold ${headingFont} mb-4 flex items-center gap-2`}
                  >
                    <svg
                      className="w-5 h-5 text-[--t-primary]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                    {section.title}
                  </h3>

                  {/* Vertical timeline */}
                  <div className="relative ps-8">
                    {/* Timeline line */}
                    <div className="absolute start-3 top-0 bottom-0 w-0.5 bg-[#dadde1]" />

                    <div className="space-y-6">
                      {section.entries.map((entry, i) => (
                        <div key={i} className="relative">
                          {/* Timeline dot */}
                          <div className="absolute -start-5 top-1 w-4 h-4 rounded-full bg-[--t-primary] border-2 border-white shadow-sm" />

                          <div>
                            <p className="text-sm font-semibold">
                              {entry.title}
                            </p>
                            {entry.subtitle && (
                              <p className="text-xs text-[#65676b] mt-0.5">
                                {entry.subtitle}
                              </p>
                            )}
                            {entry.dateRange && (
                              <p className="text-xs text-[--t-primary] mt-0.5">
                                {entry.dateRange}
                              </p>
                            )}
                            {entry.description && (
                              <p className="text-xs text-[#606770] mt-1.5 leading-relaxed">
                                {entry.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center text-[#65676b] text-sm">
                {lang === "en"
                  ? "No experience added yet"
                  : "לא נוספו חוויות עדיין"}
              </div>
            )}
          </section>
        )}

        {/* ═══ CONTACT TAB (Send Message style) ═══ */}
        {activeTab === "contact" && (
          <section id="contact" className="max-w-[680px] mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Messenger-style header */}
              <div
                className="px-5 py-4 flex items-center gap-3"
                style={{
                  background:
                    "linear-gradient(135deg, var(--t-primary), var(--t-accent))",
                }}
              >
                <svg
                  className="w-6 h-6 text-white shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.936 1.444 5.536 3.706 7.236V22l3.39-1.862A10.733 10.733 0 0012 20.486c5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.064 12.436l-2.55-2.72-4.98 2.72 5.478-5.816 2.614 2.72 4.916-2.72-5.478 5.816z" />
                </svg>
                <div>
                  <h2 className={`text-white font-bold ${headingFont} text-lg`}>
                    {labelContact}
                  </h2>
                  <p className="text-white/70 text-xs">
                    {lang === "en"
                      ? "Send a message or connect"
                      : "שלח/י הודעה או צור/י קשר"}
                  </p>
                </div>
              </div>

              {/* Contact action buttons */}
              <div className="p-4 space-y-2">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#f0f2f5] hover:bg-[#e4e6eb] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[--t-primary] flex items-center justify-center text-white shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">
                        {lang === "en" ? "Email" : "אימייל"}
                      </p>
                      <p className="text-xs text-[#65676b] truncate">
                        {contact.email}
                      </p>
                    </div>
                  </a>
                )}

                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#f0f2f5] hover:bg-[#e4e6eb] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[--t-accent] flex items-center justify-center text-white shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">
                        {lang === "en" ? "Phone" : "טלפון"}
                      </p>
                      <p className="text-xs text-[#65676b]">{contact.phone}</p>
                    </div>
                  </a>
                )}

                {contact.website && (
                  <a
                    href={contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#f0f2f5] hover:bg-[#e4e6eb] transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#65676b] flex items-center justify-center text-white shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold">
                        {lang === "en" ? "Website" : "אתר אישי"}
                      </p>
                      <p className="text-xs text-[#65676b] truncate">
                        {contact.website}
                      </p>
                    </div>
                  </a>
                )}

                {Object.entries(socialLinks)
                  .filter(([, v]) => v)
                  .map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg bg-[#f0f2f5] hover:bg-[#e4e6eb] transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#8a8d91] flex items-center justify-center text-white shrink-0">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">{key}</p>
                        <p className="text-xs text-[#65676b] truncate">{url}</p>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ─── Footer ─── */}
      <footer className="text-center py-6 text-xs text-[#8a8d91]">
        {student.name} &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
