"use client";

import type { TemplateProps } from "../types";
import { Mail, Phone, Globe, ExternalLink } from "lucide-react";

const Timestamp = ({ text }: { text: string }) => (
  <span className="text-[10px] text-[#8a8a8a] mr-1">{text}</span>
);

const ReadReceipt = () => (
  <span className="text-[10px] text-[#53bdeb] mr-1">&#10003;&#10003;</span>
);

const DateSeparator = ({ text }: { text: string }) => (
  <div className="flex justify-center my-4">
    <span className="bg-[#d9d5c7] text-[#5a5a5a] text-[11px] px-3 py-1 rounded-full shadow-sm">{text}</span>
  </div>
);

export default function ChatBubbles({
  student,
  about,
  contact,
  socialLinks,
  cvSections,
  projects,
  customization,
}: TemplateProps) {
  const bodyFont = customization?.bodyFont ? `font-${customization.bodyFont}` : 'font-open-sans';
  const headingFont = customization?.headingFont ? `font-${customization.headingFont}` : 'font-rubik';

  const time = (offset: number) => {
    const h = 9 + Math.floor(offset / 60);
    const m = offset % 60;
    return `${h}:${m.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`min-h-screen bg-[#e5ddd5] ${bodyFont} scroll-smooth`}
      dir="rtl"
      style={{
        '--t-primary': customization?.colors?.primary ?? '#075e54',
        '--t-accent': customization?.colors?.accent ?? '#25d366',
        '--t-bg': customization?.colors?.bg ?? '#e5ddd5',
        '--t-text': customization?.colors?.text ?? '#303030',
      } as React.CSSProperties}
    >
      {/* Chat header */}
      <nav className="sticky top-0 z-50 bg-[#075e54] text-white">
        <div className="max-w-2xl mx-auto px-4 flex items-center gap-3 h-14">
          {student.image ? (
            <img src={student.image} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#128c7e]" />
          )}
          <div className="flex-1">
            <p className={`font-bold ${headingFont} text-sm`}>{student.name}</p>
            <p className="text-[10px] text-white/60">מחובר/ת</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="#about" className="text-xs text-white/50 hover:text-white transition-colors">{customization?.sectionLabels?.about ?? "אודות"}</a>
            <a href="#projects" className="text-xs text-white/50 hover:text-white transition-colors">{customization?.sectionLabels?.projects ?? "פרויקטים"}</a>
            <a href="#cv" className="text-xs text-white/50 hover:text-white transition-colors">{customization?.sectionLabels?.cv ?? "קורות חיים"}</a>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-4">
        <DateSeparator text="היום" />

        {/* About — received messages */}
        <section id="about" className="mb-2 scroll-mt-16">
          {/* System message */}
          <div className="flex justify-center my-3">
            <span className="bg-[#ffeeba] text-[#5a5a5a] text-[11px] px-3 py-1 rounded-md shadow-sm">
              {about.title || "אודות"}
            </span>
          </div>

          {/* Received bubble */}
          <div className="flex justify-start mb-2">
            <div className="bg-white rounded-xl rounded-tr-sm max-w-[80%] px-4 py-2.5 shadow-sm">
              {about.body && (
                <p className="text-sm text-[#303030] leading-relaxed whitespace-pre-line">{about.body}</p>
              )}
              <div className="flex justify-end items-center gap-1 mt-1">
                <Timestamp text={time(0)} />
              </div>
            </div>
          </div>

          {/* Sent reply */}
          {about.subtitle && (
            <div className="flex justify-end mb-2">
              <div className="bg-[#dcf8c6] rounded-xl rounded-tl-sm max-w-[80%] px-4 py-2.5 shadow-sm">
                <p className="text-sm text-[#303030]">{about.subtitle}</p>
                <div className="flex justify-end items-center gap-1 mt-1">
                  <Timestamp text={time(2)} />
                  <ReadReceipt />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Projects — shared images */}
        {projects.length > 0 && (
          <section id="projects" className="mb-2 scroll-mt-16">
            <div className="flex justify-center my-3">
              <span className="bg-[#ffeeba] text-[#5a5a5a] text-[11px] px-3 py-1 rounded-md shadow-sm">
                פרויקטים
              </span>
            </div>

            {projects.map((project, pi) => (
              <div key={project.id} className="mb-3">
                {/* Sent — project as shared media */}
                <div className="flex justify-end mb-1">
                  <div className="bg-[#dcf8c6] rounded-xl rounded-tl-sm max-w-[80%] shadow-sm overflow-hidden">
                    {project.media[0]?.thumbnailUrl && (
                      <img src={project.media[0].thumbnailUrl} alt={project.title} className="w-full h-40 object-cover" />
                    )}
                    <div className="px-4 py-2.5">
                      <p className="font-bold font-rubik text-sm text-[#303030]">{project.title}</p>
                      {project.description && (
                        <p className="text-sm text-[#303030]/80 mt-1 leading-relaxed line-clamp-2">{project.description}</p>
                      )}
                      {project.tags.length > 0 && (
                        <p className="text-xs text-[#075e54] mt-1">
                          {project.tags.map((t) => `#${t.replace(/\s/g, "_")}`).join(" ")}
                        </p>
                      )}
                      <div className="flex justify-end items-center gap-1 mt-1">
                        <Timestamp text={time(10 + pi * 5)} />
                        <ReadReceipt />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extra media as mini thumbnails in a received message */}
                {project.media.length > 1 && (
                  <div className="flex justify-start mb-1">
                    <div className="bg-white rounded-xl rounded-tr-sm max-w-[80%] px-3 py-2 shadow-sm">
                      <div className="flex gap-1.5 overflow-x-auto">
                        {project.media.slice(1, 5).map((m) => (
                          <a key={m.id} href={m.webViewUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-[#f0f0f0]">
                            {m.thumbnailUrl ? (
                              <img src={m.thumbnailUrl} alt={m.fileName} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[8px] text-[#8a8a8a]">{m.fileName}</div>
                            )}
                          </a>
                        ))}
                      </div>
                      <div className="flex justify-end items-center gap-1 mt-1">
                        <Timestamp text={time(12 + pi * 5)} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* CV — document messages */}
        {cvSections.length > 0 && (
          <section id="cv" className="mb-2 scroll-mt-16">
            <div className="flex justify-center my-3">
              <span className="bg-[#ffeeba] text-[#5a5a5a] text-[11px] px-3 py-1 rounded-md shadow-sm">
                קורות חיים
              </span>
            </div>

            {cvSections.map((section, si) => (
              <div key={section.id} className="mb-3">
                {/* Received — section as document */}
                <div className="flex justify-start mb-1">
                  <div className="bg-white rounded-xl rounded-tr-sm max-w-[80%] px-4 py-2.5 shadow-sm">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#f0f0f0]">
                      <div className="w-8 h-8 bg-[#075e54]/10 rounded flex items-center justify-center text-[#075e54] text-xs font-bold">
                        CV
                      </div>
                      <p className="font-bold font-rubik text-sm text-[#303030]">{section.title}</p>
                    </div>
                    <div className="space-y-2.5">
                      {section.entries.map((entry, i) => (
                        <div key={i} className="text-sm">
                          <p className="font-semibold text-[#303030]">{entry.title}</p>
                          {entry.subtitle && <p className="text-xs text-[#8a8a8a]">{entry.subtitle}</p>}
                          {entry.dateRange && <p className="text-[10px] text-[#075e54]">{entry.dateRange}</p>}
                          {entry.description && <p className="text-xs text-[#8a8a8a] mt-0.5 leading-relaxed">{entry.description}</p>}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end items-center gap-1 mt-2">
                      <Timestamp text={time(40 + si * 3)} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Contact — Contact card message */}
        <section id="contact" className="mb-4 scroll-mt-16">
          <div className="flex justify-center my-3">
            <span className="bg-[#ffeeba] text-[#5a5a5a] text-[11px] px-3 py-1 rounded-md shadow-sm">
              יצירת קשר
            </span>
          </div>

          <div className="flex justify-start mb-2">
            <div className="bg-white rounded-xl rounded-tr-sm max-w-[80%] shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-[#f0f0f0]">
                {student.image ? (
                  <img src={student.image} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#ddd]" />
                )}
                <div>
                  <p className="font-bold font-rubik text-sm">{student.name}</p>
                  <p className="text-[10px] text-[#8a8a8a]">כרטיס איש קשר</p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {contact.email && (
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-sm text-[#075e54] hover:underline">
                    <Mail className="h-3.5 w-3.5" /> {contact.email}
                  </a>
                )}
                {contact.phone && (
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-2 text-sm text-[#075e54] hover:underline">
                    <Phone className="h-3.5 w-3.5" /> {contact.phone}
                  </a>
                )}
                {contact.website && (
                  <a href={contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#075e54] hover:underline">
                    <Globe className="h-3.5 w-3.5" /> אתר אישי
                  </a>
                )}
                {Object.entries(socialLinks).filter(([, v]) => v).map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#075e54] hover:underline">
                    <ExternalLink className="h-3.5 w-3.5" /> {key}
                  </a>
                ))}
              </div>
              <div className="flex justify-end items-center gap-1 px-4 pb-2">
                <Timestamp text={time(55)} />
              </div>
            </div>
          </div>
        </section>

        {/* End encryption notice */}
        <div className="flex justify-center py-6">
          <p className="text-[10px] text-[#8a8a8a] text-center">
            {student.name} &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
