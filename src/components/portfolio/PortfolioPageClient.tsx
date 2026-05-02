"use client";

import { type SyntheticEvent, useMemo, useState } from "react";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { LanguageToggle } from "@/components/portfolio/LanguageToggle";
import { StickyContactBar } from "@/components/portfolio/StickyContactBar";
import { resolvePortfolioLang } from "@/lib/resolveLanguage";
import type { Lang } from "@/components/templates/types";
import type { Portfolio, CvSection, ProjectMedia, ProjectWithMedia } from "@/types/portfolio";

type MediaType = "image" | "video" | "audio" | "unknown";

const VIDEO_FALLBACK = "/video.webp";
const AUDIO_FALLBACK = "/audio.webp";

const EXTENSION_TYPES: Record<string, MediaType> = {
  jpg: "image",
  jpeg: "image",
  png: "image",
  webp: "image",
  gif: "image",
  mp4: "video",
  webm: "video",
  mov: "video",
  mp3: "audio",
  wav: "audio",
  ogg: "audio",
};

function mediaTypeFromMimeType(mimeType: string | null | undefined): MediaType {
  if (!mimeType) return "unknown";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  return "unknown";
}

function extensionFrom(value: string | null | undefined): string | null {
  if (!value) return null;
  const path = value.split(/[?#]/)[0] ?? "";
  const match = path.match(/\.([a-z0-9]+)$/i);
  return match?.[1]?.toLowerCase() ?? null;
}

function detectMediaType(media: Pick<ProjectMedia, "mimeType" | "fileName" | "thumbnailUrl" | "webViewUrl">): MediaType {
  const mimeType = mediaTypeFromMimeType(media.mimeType);
  if (mimeType !== "unknown") return mimeType;

  const extension =
    extensionFrom(media.fileName) ??
    extensionFrom(media.webViewUrl) ??
    extensionFrom(media.thumbnailUrl);

  return extension ? EXTENSION_TYPES[extension] ?? "unknown" : "unknown";
}

function fallbackFor(mediaType: MediaType): string {
  return mediaType === "audio" ? AUDIO_FALLBACK : VIDEO_FALLBACK;
}

function thumbnailFor(media: ProjectMedia): string | null {
  const mediaType = detectMediaType(media);
  if (mediaType === "video" || mediaType === "audio") return fallbackFor(mediaType);
  return media.thumbnailUrl;
}

function registerFallback(
  fallbacks: Map<string, string>,
  src: string | null | undefined,
  fallback: string,
) {
  if (!src || src === VIDEO_FALLBACK || src === AUDIO_FALLBACK) return;

  fallbacks.set(src, fallback);

  try {
    const base = typeof window === "undefined" ? "http://localhost" : window.location.origin;
    const url = new URL(src, base);
    fallbacks.set(url.href, fallback);
    fallbacks.set(url.pathname, fallback);
  } catch {
    // Keep the original key when a thumbnail string is not URL-like.
  }
}

interface Props {
  portfolio: Portfolio;
  student: { name: string; nameEn: string; image: string };
  templateName: string;
  cvSections: CvSection[];
  projects: ProjectWithMedia[];
  email: string;
  phone: string;
  website: string;
  socialLinks: Record<string, string>;
}

export function PortfolioPageClient({
  portfolio,
  student,
  templateName,
  cvSections,
  projects,
  email,
  phone,
  website,
  socialLinks,
}: Props) {
  const [lang, setLang] = useState<Lang>("he");
  const thumbnailFallbacks = useMemo(() => new Map<string, string>(), [projects]);

  const projectsWithMediaThumbnails = useMemo(() => {
    thumbnailFallbacks.clear();

    return projects.map((project): ProjectWithMedia => {
      const media = project.media.map((item) => {
        const mediaType = detectMediaType(item);
        const fallback = fallbackFor(mediaType);
        registerFallback(thumbnailFallbacks, item.thumbnailUrl, fallback);

        return {
          ...item,
          thumbnailUrl: thumbnailFor(item),
        };
      });

      const firstMedia = media[0];
      const firstMediaType = firstMedia ? detectMediaType(firstMedia) : "unknown";
      const projectThumbnailFallback = fallbackFor(firstMediaType);
      registerFallback(thumbnailFallbacks, project.thumbnailUrl, projectThumbnailFallback);

      return {
        ...project,
        media,
        thumbnailUrl:
          firstMediaType === "video" || firstMediaType === "audio"
            ? projectThumbnailFallback
            : project.thumbnailUrl,
      };
    });
  }, [projects, thumbnailFallbacks]);

  function handleImageError(event: SyntheticEvent<HTMLDivElement>) {
    const target = event.target;
    if (!(target instanceof HTMLImageElement)) return;
    if (target.src.endsWith(VIDEO_FALLBACK) || target.src.endsWith(AUDIO_FALLBACK)) return;

    const fallback =
      thumbnailFallbacks.get(target.currentSrc) ??
      thumbnailFallbacks.get(target.src) ??
      thumbnailFallbacks.get(target.getAttribute("src") ?? "") ??
      thumbnailFallbacks.get(new URL(target.src).pathname) ??
      VIDEO_FALLBACK;

    target.src = fallback;
  }

  const resolved = resolvePortfolioLang(
    lang,
    portfolio,
    student,
    cvSections,
    projectsWithMediaThumbnails,
    portfolio.customSettings,
  );

  return (
    <>
      <div onError={handleImageError}>
        <TemplateRenderer
          templateName={templateName}
          student={resolved.student}
          portfolio={portfolio}
          about={resolved.about}
          contact={{ email, phone, website }}
          socialLinks={socialLinks}
          cvSections={resolved.cvSections}
          projects={resolved.projects}
          customization={resolved.customization}
          lang={lang}
        />
      </div>
      {cvSections.length > 0 && (
        <a
          href={`/api/cv/pdf?portfolioId=${portfolio.id}${lang === "en" ? "&lang=en" : ""}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 md:bottom-6 left-4 z-40 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-full shadow-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          {lang === "en" ? "Download CV" : "הורד קורות חיים"}
        </a>
      )}
      <LanguageToggle lang={lang} onChange={setLang} />
      <StickyContactBar email={email} phone={phone} />
    </>
  );
}
