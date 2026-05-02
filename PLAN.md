# Plan: Add 10 New Templates (31-40)

## Template List

| # | Slug | Hebrew Label | Description | Body Font | Heading Font | Colors (primary/accent/bg/text) |
|---|------|-------------|-------------|-----------|-------------|-------------------------------|
| 1 | `facebook-style` | סגנון פייסבוק | Facebook UI: cover photo, post cards, reactions | open-sans | rubik | #1877f2 / #42b72a / #f0f2f5 / #1c1e21 |
| 2 | `polaroid-photos` | תמונות פולורויד | Scattered polaroid cards with handwritten captions | heebo | amatic-sc | #e8d5b7 / #c7956d / #f5f0e8 / #3d3029 |
| 3 | `brush-strokes` | משיכות מכחול | Watercolor brush strokes as backgrounds/dividers | heebo | fredoka | #e63946 / #457b9d / #f1faee / #1d3557 |
| 4 | `colorful-chaos` | צבעוני מופרע | Wild color shifts, gradient animations, bouncing elements | fredoka | rubik-bubbles | #ff006e / #8338ec / #ffbe0b / #1a1a2e |
| 5 | `tech-glitch` | טכנולוגי מופרע | Glitch text effects, scan lines, shifting headers | heebo | rubik-glitch | #00ff41 / #ff0040 / #0d0d0d / #e0e0e0 |
| 6 | `news-modern` | חדשות מודרני | Modern news site (breaking bar, grid articles, categories) | open-sans | rubik | #cc0000 / #f4f4f4 / #ffffff / #222222 |
| 7 | `architect-office` | משרד אדריכלי | Blueprint grid, thin precise lines, minimalist | heebo | karantina | #2c3e50 / #e67e22 / #ecf0f1 / #2c3e50 |
| 8 | `woodwork-craft` | עבודת עץ | Wood grain textures, warm earthy tones, handcrafted feel | heebo | amatic-sc | #8b5e3c / #d4a574 / #f5e6d3 / #3e2723 |
| 9 | `childish-art` | אומנותי ילדותי | Crayon style, playful shapes, hand-drawn borders | playpen-sans | rubik-doodle | #ff6b6b / #4ecdc4 / #fffef2 / #2d3436 |
| 10 | `max-chaos` | הכי מופרע שיש | Upside-down headers, random rotations, animated disorder | rubik | rubik-glitch | #ff00ff / #00ffff / #1a1a1a / #ffffff |

## Required pattern per template

Each file `src/components/templates/<slug>/index.tsx`:
- `"use client"` directive
- Import `TemplateProps` from `../types`
- Import `Mail, Phone, Globe, ExternalLink` from `lucide-react`
- Destructure all props: `student, about, contact, socialLinks, cvSections, projects, customization, lang`
- Root `dir={lang === "en" ? "ltr" : "rtl"}`
- CSS custom properties: `--t-primary`, `--t-accent`, `--t-bg`, `--t-text`
- Customizable fonts: `bodyFont`, `headingFont`
- Section labels: `customization?.sectionLabels?.xxx ?? (lang === "en" ? "English" : "עברית")`
- Template-specific Hebrew: `lang === "en" ? "English" : "עברית"`
- Logical CSS only: `ps-*`, `pe-*`, `ms-*`, `me-*`, `text-start`, `text-end`, `border-s-*`, `start-*`, `end-*`

## Files to create
- 10 template files (see above)
- `supabase/migrations/012_batch4_templates.sql`

## Files to modify
- `src/components/templates/TemplateRenderer.tsx` — 10 new dynamic imports
- `src/components/templates/defaults.ts` — 10 new default entries

## Execution
1. Create templates in parallel (5 agents × 2 templates each)
2. Register all 10 in TemplateRenderer + defaults
3. Create migration SQL
4. TypeScript check
5. Commit and push
