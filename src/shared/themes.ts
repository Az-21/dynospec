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

// Display transform: capitalize the first letter ("caramellatte" -> "Caramellatte").
// Raw theme names are still used for `data-theme`, storage, and `aria-label` values.
export const themeDisplayNameSchema = themeNameSchema.transform((name) => name.charAt(0).toUpperCase() + name.slice(1));

export function formatThemeName(name: ThemeName): string {
  return themeDisplayNameSchema.parse(name);
}

export const brightnessFilterSchema = z.enum(["all", "light", "dark"]);
export type BrightnessFilter = z.infer<typeof brightnessFilterSchema>;

export const DEFAULT_THEME = themeNameSchema.parse("forest");
export const THEME_STORAGE_KEY = "dynospec-theme";
