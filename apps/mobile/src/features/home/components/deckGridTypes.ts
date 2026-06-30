import type { Category } from "../models/homeContent";

export type DeckGridProps = {
  categories: Category[];
  selectedDeckId: string;
  currentDeckCount: number;
  onSelectCategory: (category: string) => void;
};
