/**
 * Centralized default colors & fonts for every template.
 * Used by the design-page colour-pickers so users see the current
 * template defaults before they override anything.
 */
export interface TemplateDefaults {
  colors: { primary: string; accent: string; bg: string; text: string };
  bodyFont: string;
  headingFont: string;
}

export const TEMPLATE_DEFAULTS: Record<string, TemplateDefaults> = {
  "classic-elegant": {
    colors: { primary: "#1c1917", accent: "#78716c", bg: "#fafaf9", text: "#44403c" },
    bodyFont: "heebo",
    headingFont: "fredoka",
  },
  "classic-serif": {
    colors: { primary: "#1b2a4a", accent: "#c9b97a", bg: "#faf8f3", text: "#4a4a4a" },
    bodyFont: "heebo",
    headingFont: "fredoka",
  },
  "modern-bold": {
    colors: { primary: "#6366f1", accent: "#a855f7", bg: "#030712", text: "#ffffff" },
    bodyFont: "heebo",
    headingFont: "rubik",
  },
  "modern-minimal": {
    colors: { primary: "#171717", accent: "#a3a3a3", bg: "#ffffff", text: "#262626" },
    bodyFont: "heebo",
    headingFont: "karantina",
  },
  "modern-gradient": {
    colors: { primary: "#7c3aed", accent: "#3b82f6", bg: "#f8fafc", text: "#1e293b" },
    bodyFont: "heebo",
    headingFont: "fredoka",
  },
  "modern-dark": {
    colors: { primary: "#a3e635", accent: "#22d3ee", bg: "#030712", text: "#f3f4f6" },
    bodyFont: "heebo",
    headingFont: "rubik",
  },
  "experimental-creative": {
    colors: { primary: "#ec4899", accent: "#8b5cf6", bg: "#fffbeb", text: "#1c1917" },
    bodyFont: "playpen-sans",
    headingFont: "rubik",
  },
  "experimental-avant-garde": {
    colors: { primary: "#34d399", accent: "#a3e635", bg: "#000000", text: "#ffffff" },
    bodyFont: "heebo",
    headingFont: "rubik-dirt",
  },
  "experimental-retro": {
    colors: { primary: "#f59e0b", accent: "#ef4444", bg: "#fef3c7", text: "#451a03" },
    bodyFont: "heebo",
    headingFont: "rubik-pixels",
  },
  "nature-organic": {
    colors: { primary: "#16a34a", accent: "#65a30d", bg: "#f0fdf4", text: "#1a2e1a" },
    bodyFont: "open-sans",
    headingFont: "fredoka",
  },
  "tech-terminal": {
    colors: { primary: "#00ff41", accent: "#00ff41", bg: "#0a0a0a", text: "#b0b0b0" },
    bodyFont: "mono",
    headingFont: "rubik-pixels",
  },
  "pastel-dreamy": {
    colors: { primary: "#c084fc", accent: "#f9a8d4", bg: "#fdf4ff", text: "#581c87" },
    bodyFont: "fredoka",
    headingFont: "rubik-doodle",
  },
  "brutalist-raw": {
    colors: { primary: "#000000", accent: "#e8e4dc", bg: "#e8e4dc", text: "#000000" },
    bodyFont: "heebo",
    headingFont: "rubik-dirt",
  },
  "neon-glow": {
    colors: { primary: "#ff00ff", accent: "#00ffff", bg: "#0a0a14", text: "#d1d5db" },
    bodyFont: "rubik",
    headingFont: "rubik",
  },
  "paper-craft": {
    colors: { primary: "#57534e", accent: "#78716c", bg: "#faf8f0", text: "#292524" },
    bodyFont: "heebo",
    headingFont: "amatic-sc",
  },
  "geometric-sharp": {
    colors: { primary: "#ef4444", accent: "#f97316", bg: "#ffffff", text: "#171717" },
    bodyFont: "heebo",
    headingFont: "rubik",
  },
  "watercolor-soft": {
    colors: { primary: "#6366f1", accent: "#a78bfa", bg: "#faf5ff", text: "#3b0764" },
    bodyFont: "heebo",
    headingFont: "amatic-sc",
  },
  "monochrome-photo": {
    colors: { primary: "#171717", accent: "#525252", bg: "#ffffff", text: "#262626" },
    bodyFont: "heebo",
    headingFont: "karantina",
  },
  "playful-pop": {
    colors: { primary: "#ff6b6b", accent: "#ffd93d", bg: "#fffbf0", text: "#262626" },
    bodyFont: "fredoka",
    headingFont: "rubik-bubbles",
  },
  "sidebar-dark": {
    colors: { primary: "#50c878", accent: "#50c878", bg: "#121212", text: "#d4d4d4" },
    bodyFont: "heebo",
    headingFont: "fredoka",
  },
  "sidebar-creative": {
    colors: { primary: "#f97316", accent: "#fb923c", bg: "#1c1917", text: "#e7e5e4" },
    bodyFont: "rubik",
    headingFont: "rubik-dirt",
  },
  "sidebar-playful": {
    colors: { primary: "#ec4899", accent: "#a855f7", bg: "#fdf2f8", text: "#1e1e1e" },
    bodyFont: "fredoka",
    headingFont: "rubik-bubbles",
  },
  "newspaper-vintage": {
    colors: { primary: "#1a1a1a", accent: "#8b0000", bg: "#f5f0e8", text: "#333333" },
    bodyFont: "heebo",
    headingFont: "karantina",
  },
  "social-feed": {
    colors: { primary: "#262626", accent: "#e1306c", bg: "#fafafa", text: "#262626" },
    bodyFont: "open-sans",
    headingFont: "rubik",
  },
  "chat-bubbles": {
    colors: { primary: "#075e54", accent: "#25d366", bg: "#e5ddd5", text: "#303030" },
    bodyFont: "open-sans",
    headingFont: "rubik",
  },
  "restaurant-menu": {
    colors: { primary: "#c9a44a", accent: "#8b2332", bg: "#1c1008", text: "#e8dcc8" },
    bodyFont: "heebo",
    headingFont: "amatic-sc",
  },
  "maker-workshop": {
    colors: { primary: "#f59e0b", accent: "#ef4444", bg: "#1c1917", text: "#e7e5e4" },
    bodyFont: "rubik",
    headingFont: "rubik-glitch",
  },
  "stage-screen": {
    colors: { primary: "#e11d48", accent: "#be123c", bg: "#0f0f0f", text: "#e5e5e5" },
    bodyFont: "heebo",
    headingFont: "karantina",
  },
  "tech-startup": {
    colors: { primary: "#3b82f6", accent: "#06b6d4", bg: "#ffffff", text: "#1e293b" },
    bodyFont: "heebo",
    headingFont: "rubik",
  },
  "academic-science": {
    colors: { primary: "#1e40af", accent: "#3b82f6", bg: "#f8fafc", text: "#1e293b" },
    bodyFont: "mono",
    headingFont: "heebo",
  },
  "tech-glitch": {
    colors: { primary: "#00ff41", accent: "#ff0040", bg: "#0d0d0d", text: "#e0e0e0" },
    bodyFont: "heebo",
    headingFont: "rubik-glitch",
  },
  "facebook-style": {
    colors: { primary: "#1877f2", accent: "#42b72a", bg: "#f0f2f5", text: "#1c1e21" },
    bodyFont: "open-sans",
    headingFont: "rubik",
  },
  "brush-strokes": {
    colors: { primary: "#e63946", accent: "#457b9d", bg: "#f1faee", text: "#1d3557" },
    bodyFont: "heebo",
    headingFont: "fredoka",
  },
  "polaroid-photos": {
    colors: { primary: "#e8d5b7", accent: "#c7956d", bg: "#f5f0e8", text: "#3d3029" },
    bodyFont: "heebo",
    headingFont: "amatic-sc",
  },
  "colorful-chaos": {
    colors: { primary: "#ff006e", accent: "#8338ec", bg: "#ffbe0b", text: "#1a1a2e" },
    bodyFont: "fredoka",
    headingFont: "rubik-bubbles",
  },
  "news-modern": {
    colors: { primary: "#cc0000", accent: "#f4f4f4", bg: "#ffffff", text: "#222222" },
    bodyFont: "open-sans",
    headingFont: "rubik",
  },
  "architect-office": {
    colors: { primary: "#2c3e50", accent: "#e67e22", bg: "#ecf0f1", text: "#2c3e50" },
    bodyFont: "heebo",
    headingFont: "karantina",
  },
  "woodwork-craft": {
    colors: { primary: "#8b5e3c", accent: "#d4a574", bg: "#f5e6d3", text: "#3e2723" },
    bodyFont: "heebo",
    headingFont: "amatic-sc",
  },
  "childish-art": {
    colors: { primary: "#ff6b6b", accent: "#4ecdc4", bg: "#fffef2", text: "#2d3436" },
    bodyFont: "playpen-sans",
    headingFont: "rubik-doodle",
  },
  "max-chaos": {
    colors: { primary: "#ff00ff", accent: "#00ffff", bg: "#1a1a1a", text: "#ffffff" },
    bodyFont: "rubik",
    headingFont: "rubik-glitch",
  },
};
