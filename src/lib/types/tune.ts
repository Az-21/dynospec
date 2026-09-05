import { z } from "zod";

export const TuneInfoSchema = z.object({
  creator: z.string(),
  comment: z.string().nullable(),
  leaderboard: z.string().nullable(),
  difficulty: z.int().min(1).max(5),
  speed: z.int().min(1).max(5),
  handling: z.int().min(1).max(5),
  meta: z.int().min(1).max(5),
});
