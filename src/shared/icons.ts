import { z } from "zod";

export const iconSizeSchema = z.enum(["Small", "Medium", "Large", "ExtraLarge"]);
export type IconSize = z.infer<typeof iconSizeSchema>;

export const IconSize = {
  Small: 16,
  Medium: 20,
  Large: 24,
  ExtraLarge: 28,
} as const satisfies Record<IconSize, number>;

export const DEFAULT_ICON_SIZE = iconSizeSchema.parse("Medium");

export function getIconSize(size: IconSize): number {
  return IconSize[size];
}
