import { z } from "zod";

export const CarDetailsSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.int().min(1900).max(2099),
});
