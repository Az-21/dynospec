export enum CarClass {
  D = "D",
  C = "C",
  B = "B",
  A = "A",
  S1 = "S1",
  S2 = "S2",
  X = "X",
}

export enum Category {
  Road = "Road",
  Dirt = "Dirt",
  CC = "CC",
  PrStunt = "PR Stunt",
  Drift = "Drift",
}

export enum Characteristic {
  HandlingPlus = "Full Handling",
  HandlingMinus = "Handling Biased",
  Balanced = "Balanced",
  PowerMinus = "Power Biased",
  PowerPlus = "Full Power",
}

export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export interface Tune {
  make: string;
  model: string;
  year: number;
  carClass: CarClass;
  category: Category;
  characteristic: Characteristic;
  difficulty: Difficulty;
  tuneId: string;
  tuneCreator: string;
  comments: string;
  time: string;
}

export interface ColumnDef {
  id: keyof Tune;
  label: string;
  visible: boolean;
  sortable: boolean;
}

export interface SortKey {
  key: keyof Tune;
  dir: "asc" | "desc";
}
