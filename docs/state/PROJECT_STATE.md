# Project State

## Overview

- Project name: Studio Durian portfolio/site app
- Stack: Vite, React, TypeScript, Tailwind CSS, shadcn-ui, Lovable-origin project
- Current local scripts observed: Next.js app scripts via `next dev`, `next build`, and `next lint`
- Public site: https://durian-studio-site.vercel.app/
- Existing uploaded reference files: `README.md`, `PLAN.md`

## Current Requested Change

- Fix the existing `npm run build` failure.
- Known errors investigated: `EISDIR` for `src/app/api/contact/route.ts` and `EPERM` opening `.next/trace`.
- Preserve app behavior and avoid redesign or unrelated routing changes.

## Working Notes

- Homepage entry point appears to be `src/app/page.tsx`.
- Landing hero component appears to be `src/components/HeroSection.tsx`.
- Important: update this file after every meaningful change.

## 2026-04-30 Update

- Changed files:
  - `src/components/HeroSection.tsx`
  - `docs/state/PROJECT_STATE.md`
  - `docs/state/AGENT_RULES.md`
- Summary: removed the homepage hero's decorative icon row and uploaded branch/fruit image, then reduced hero section padding so the title, subtitle, CTA buttons, and mission card move upward and fill the visible hero area more fully.
- Preserved: Hebrew RTL content, mission card content, routing, data model, portfolio logic, colors, typography, and background treatment.
- Commands run:
  - `npm run build` - failed before completing due existing Next/font/filesystem issues: missing font override values for `Playpen Sans Hebrew`, `EISDIR` on `src/app/api/contact/route.ts`, and `EPERM` opening `.next/trace`.
  - `npm run lint` - failed because `next lint` opened the interactive ESLint setup prompt instead of running checks.
  - `npm run dev -- --hostname 127.0.0.1 --port 3000` - succeeded after removing stale generated `.next/trace`.
  - Playwright snapshot/screenshot check at `http://127.0.0.1:3000` - succeeded; confirmed the hero starts with the title and no decorative icon row or branch/fruit image appears above it.

## 2026-04-30 Update - Full-Height Hero

- Changed files:
  - `src/components/HeroSection.tsx`
  - `docs/state/PROJECT_STATE.md`
- Summary: changed the homepage hero to fill the visible viewport under the sticky navigation, kept the centered Hebrew composition, and added a subtle pink/purple bottom arrow that calls `scrollIntoView({ behavior: "smooth" })` for `#services`.
- Services target: `src/components/ServicesSection.tsx` already had `id="services"`, so no services-section code change was needed.
- Preserved: removed decorative image/icon row stayed removed; Hebrew text, mission card content, current CTA buttons, background dots, routing, Supabase logic, portfolio logic, and template logic were unchanged.
- Commands run:
  - `npx tsc --noEmit` - passed.
  - `npm run build` - failed due existing project/tooling issues: `EISDIR` on `src/app/api/contact/route.ts` and `EPERM` opening `.next/trace`.
  - `npm run lint` - failed because `next lint` opened the interactive ESLint setup prompt instead of running checks.
  - `npm run dev -- --hostname 127.0.0.1 --port 3000` - succeeded after clearing stale generated `.next/trace`.
  - Playwright desktop check at 1280x720 - succeeded; hero bottom and services top align at the fold, arrow is visible, and clicking it scrolls to `#services`.
  - Playwright mobile check at 390x844 - succeeded; hero remains readable, arrow is visible near the bottom, and services begin after the hero.

## 2026-04-30 Update - Build Fix

- Changed files:
  - `package.json`
  - `scripts/node-readlink-eisdir-compat.cjs`
  - `docs/state/PROJECT_STATE.md`
- Cause of build failure:
  - `src/app/api/contact/route.ts` was inspected and is a valid file, not a directory.
  - `src/app/api/contact/` contains the expected `route.ts` file.
  - Node.js v22.19.0 on this Windows workspace returns `EISDIR` from `fs.readlinkSync()` for normal files, including `package.json` and multiple route files. Next/Webpack treats that as a resolver error during build.
  - The `.next/trace` `EPERM` issue was caused by generated build/dev artifacts and active local Next processes; safely removing `.next` after stopping those processes cleared it.
- Fix:
  - Added a narrow Windows build-time compatibility preload at `scripts/node-readlink-eisdir-compat.cjs` that normalizes `fs.readlink`, `fs.readlinkSync`, and `fs.promises.readlink` `EISDIR` errors to the expected non-symlink `EINVAL` error.
  - Updated `npm run build` to run Next with that preload.
  - Contact API source behavior was preserved unchanged.
- Commands run:
  - Inspected `src/app/api/contact/route.ts` and `src/app/api/contact/` - route file is valid and no directory conversion was needed.
  - Removed `.next` safely after stopping Studio Durian Node/Next processes - succeeded.
  - `npx tsc --noEmit` - passed.
  - `npm run build` - passed; generated the route table including `/api/contact`.
  - Remaining note: build output still prints `Failed to find font override values for font Playpen Sans Hebrew`, but the build exits successfully.

## 2026-05-02 Update - Admin Full Portfolio Editing - Planning

- Plan file: `docs/plans/admin-portfolio-editing.md`
- Status: plan complete, not yet implemented
- Summary: admin portfolio editing expansion — About bilingual fields, full CV entry
  editing, and a new Projects section — reusing existing student dashboard components.
- Key findings:
  - RLS confirmed for admin on cv_sections, projects, project_media (migration 002)
  - No DB schema changes needed (all bilingual columns exist from migration 011)
  - SectionEditor + EntryEditor in `dashboard/cv/page.tsx` can be extracted to
    `src/components/shared/CvSectionEditor.tsx` and reused in admin
  - All hooks (useCvSections, useProjects) are portfolio-ID-based; no user coupling
- Files to change:
  - NEW `src/components/shared/CvSectionEditor.tsx`
  - MOD `src/app/dashboard/cv/page.tsx` (import from shared)
  - MOD `src/app/admin/student/[id]/page.tsx` (About EN fields, full CV editor, Projects section)

## 2026-05-02 Update - Media Thumbnail Fallback

- Changed files:
  - `src/components/portfolio/PortfolioPageClient.tsx`
  - `docs/state/PROJECT_STATE.md`
- Summary: media thumbnail fallback for video/audio.
- Detection:
  - Media type is detected from `mimeType` first.
  - If `mimeType` is missing or unknown, detection falls back to the extension in `fileName`, `webViewUrl`, or `thumbnailUrl`.
  - Images keep their existing Drive thumbnail.
  - Video media uses `/video.webp`; audio media uses `/audio.webp`.
  - Runtime `<img>` load failures fall back to the detected video/audio icon, or `/video.webp` when the type is unknown.
- Preserved: data model, upload logic, Supabase code, routing, templates, and existing template styling.
- Commands run:
  - `npx tsc --noEmit` - passed.
  - `npm run build` - passed.

## 2026-05-02 Update - Admin Full Portfolio Editing

- Changed files:
  - `src/components/shared/CvSectionEditor.tsx`
  - `src/app/dashboard/cv/page.tsx`
  - `src/app/admin/student/[id]/page.tsx`
  - `docs/state/PROJECT_STATE.md`
- Summary: implemented admin full portfolio editing according to `docs/plans/admin-portfolio-editing.md`.
- Details:
  - Extracted reusable `EntryEditor` and `SectionEditor` from the student CV dashboard into `src/components/shared/CvSectionEditor.tsx`.
  - Updated `src/app/dashboard/cv/page.tsx` to import the shared `SectionEditor`; student dashboard CV behavior remains the same.
  - Added admin editing for Hebrew and English About fields: title, subtitle, and body.
  - Replaced the admin CV read-only entry display with the shared full `SectionEditor`, including section title editing, entry editing, add/remove, and entry reordering.
  - Added admin project management using existing project hooks: create, edit, delete, list media thumbnails, and Drive sync for projects with a Drive folder URL.
  - No DB schema, RLS, upload logic, public portfolio rendering, routing, or templates were changed.
- Encoding note:
  - Edited CV/admin files were checked for mojibake marker characters after the extraction and admin additions.
- Commands run:
  - `npx tsc --noEmit` - passed.
  - First `npm run build` - failed with the known Windows generated `.next/trace` `EPERM` lock.
  - Stopped only Studio Durian Node/Next processes and removed generated `.next`.
  - Second `npm run build` - passed; build still prints the known `Playpen Sans Hebrew` font override warning.
- Manual verification:
  - Not exercised in-browser in this turn because no admin session/data flow was opened; implementation compiles and builds successfully.

## 2026-05-02 Update - Local Admin Login Redirect

- Changed files:
  - `src/lib/authRedirect.ts`
  - `src/hooks/useAuth.ts`
  - `src/app/auth/callback/route.ts`
  - `src/middleware.ts`
  - `docs/state/PROJECT_STATE.md`
- Cause:
  - The Google OAuth call was already passing a browser-origin callback URL, but the legacy `/admin/login` middleware redirect ran before the client page could redirect and normalized local `127.0.0.1` requests to `localhost`.
  - If login still returns to production after this code fix, the remaining likely cause is external Supabase Auth redirect URL configuration falling back to the project Site URL; the local callback must be allowed in Supabase Auth redirect URLs.
- Fix:
  - Added `src/lib/authRedirect.ts` to centralize auth callback URL construction.
  - OAuth login now uses the browser origin via `window.location.origin` through the helper.
  - The auth callback route now derives post-login redirects from the incoming request origin.
  - Middleware no longer server-redirects `/admin/login`; the existing client page redirects relatively to `/auth/login`, preserving the current browser origin.
  - Protected `/admin` and `/dashboard` middleware redirects remain unchanged in behavior.
- Verification:
  - `npx tsc --noEmit` - passed.
  - `npm run build` - passed.
  - Local dev server at `http://127.0.0.1:3000`:
    - `GET /admin/login` returns 200 instead of redirecting to `localhost` or production.
    - Browser opened `http://127.0.0.1:3000/admin/login` and client-side navigation landed on `http://127.0.0.1:3000/auth/login`.
    - Clicking Google login produced a Google/Supabase OAuth URL containing `redirect_to=http://127.0.0.1:3000/auth/callback`.
  - Full Google account completion/admin page load was not completed because it requires an interactive Google login session.
