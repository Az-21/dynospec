import { constructSortFn } from "@tanstack/svelte-table";
import { z } from "zod";

import { CarDetailsSchema } from "./car";
import { TuneInfoSchema } from "./tune";

/** Canonical Forza class order: D -> C -> B -> A -> S1 -> S2 -> R -> X. Single source of truth for the zod enum and table sorting. */
export const forzaClassOrder = ["D", "C", "B", "A", "S1", "S2", "R", "X"] as const;

export type ForzaClass = (typeof forzaClassOrder)[number];

const forzaClassRank: Record<string, number> = Object.fromEntries(forzaClassOrder.map((c, i) => [c, i]));

/** Sorts by `forzaClassOrder` index; unknown values fall back to basic comparison and sort last. */
export const sortFn_forzaClass = constructSortFn({
  sort: (dataValueA: unknown, dataValueB: unknown) => {
    const rankA = typeof dataValueA === "string" ? forzaClassRank[dataValueA] : undefined;
    const rankB = typeof dataValueB === "string" ? forzaClassRank[dataValueB] : undefined;
    if (rankA !== undefined && rankB !== undefined) return rankA - rankB;
    if (rankA !== undefined) return -1;
    if (rankB !== undefined) return 1;
    return dataValueA === dataValueB ? 0 : dataValueA! > dataValueB! ? 1 : -1;
  },
});

export const ForzaTuneInfoSchema = z.object({
  class: z.enum(forzaClassOrder),
  shareCode: z.string().regex(/^\d{3} \d{3} \d{3}$/), // "012 345 678"
  createdOn: z.iso.date().nullable(),
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
