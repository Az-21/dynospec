import { ForzaTuneSchema } from "$lib/types/forza";
import { z } from "zod";

const _tunes: z.input<typeof ForzaTuneSchema>[] = [
  {
    car: {
      make: "Toyota",
      model: "Supra",
      year: 2010,
    },
    tune: {
      creator: "KapienPL",
      comment:
        "Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
      leaderboard: null,
      difficulty: 1,
      speed: 1,
      handling: 1,
      meta: 1,
    },
    forza: {
      class: "D",
      shareCode: "123 456 789",
      createdOn: "2026-08-10",
      discipline: "Cross Country",
      drivetrain: "AWD",
    },
  },
  {
    car: {
      make: "Nissan",
      model: "Skyline GT-R (R34)",
      year: 2005,
    },
    tune: {
      creator: "ESV Mars",
      comment: null,
      leaderboard: "Track XYZ | 01:23 | Top 3k",
      difficulty: 2,
      speed: 2,
      handling: 2,
      meta: 2,
    },
    forza: {
      class: "A",
      shareCode: "456 456 789",
      createdOn: "2026-09-01",
      discipline: "Road",
      drivetrain: "AWD",
    },
  },
  {
    car: {
      make: "Nissan",
      model: "Skyline GT-R (R33)",
      year: 2001,
    },
    tune: {
      creator: "ESV Mars",
      comment: null,
      leaderboard:
        "Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum Lorem ipsum lorem ipsum",
      difficulty: 2,
      speed: 2,
      handling: 2,
      meta: 2,
    },
    forza: {
      class: "A",
      shareCode: "456 456 789",
      createdOn: "2026-09-01",
      discipline: "Road",
      drivetrain: "AWD",
    },
  },
];

export const forzaHorizon6Tunes = ForzaTuneSchema.array().parse(_tunes);
