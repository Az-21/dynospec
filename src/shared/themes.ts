import { z } from "zod";

// Authoritative `color-scheme` split taken from `node_modules/daisyui/theme/*.css`.
export const LIGHT_THEMES = [
  "light",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "cyberpunk",
  "valentine",
  "garden",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "cmyk",
  "autumn",
  "acid",
  "lemonade",
  "winter",
  "nord",
  "retro",
  "silk",
  "caramellatte",
] as const;

export const DARK_THEMES = [
  // Custom dark themes defined via `@plugin "daisyui/theme"` in `src/app.css`.
  "macos-dark",
  "material-expressive",
  "monokai",
  "ayu-dark",
  // Built-in DaisyUI themes
  "dark",
  "synthwave",
  "halloween",
  "forest",
  "aqua",
  "black",
  "luxury",
  "dracula",
  "business",
  "night",
  "coffee",
  "dim",
  "sunset",
  "abyss",
] as const;

const ALL_THEMES = [...LIGHT_THEMES, ...DARK_THEMES] as const;

export const themeNameSchema = z.enum(ALL_THEMES);
export type ThemeName = z.infer<typeof themeNameSchema>;

// Display transform: humanize kebab-case ("caramellatte" -> "Caramellatte",
// "macos-dark" -> "macOS Dark"). Raw theme names are still used for
// `data-theme`, storage, and `aria-label` values.
const DISPLAY_WORDS: Record<string, string> = {
  macos: "macOS",
};

export const themeDisplayNameSchema = themeNameSchema.transform((name) =>
  name
    .split(/[-_]+/)
    .map((word) => DISPLAY_WORDS[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
);

export function formatThemeName(name: ThemeName): string {
  return themeDisplayNameSchema.parse(name);
}

export const brightnessFilterSchema = z.enum(["all", "light", "dark"]);
export type BrightnessFilter = z.infer<typeof brightnessFilterSchema>;

export const DEFAULT_THEME = themeNameSchema.parse("macos-dark");
export const THEME_STORAGE_KEY = "dynospec-theme";
