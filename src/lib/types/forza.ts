import { z } from "zod";

import { CarDetailsSchema } from "./car";
import { TuneInfoSchema } from "./tune";

export const ForzaTuneInfoSchema = z.object({
  class: z.enum(["D", "C", "B", "A", "S1", "S2", "R", "X"]),
  shareCode: z.string().regex(/^\d{3} \d{3} \d{3}$/), // "012 345 678"
  createdOn: z.iso.date(),
  discipline: z.enum(["Cross Country", "Road", "Dirt", "Drift", "Special"]),
  drivetrain: z.enum(["AWD", "FWD", "RWD"]),
});

export const ForzaTuneSchema = z
  .object({
    car: CarDetailsSchema,
    tune: TuneInfoSchema,
    forza: ForzaTuneInfoSchema,
  })
  .readonly();
