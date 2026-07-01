import type { Category } from "../models/homeContent";

export type DeckGridProps = {
  categories: Category[];
  selectedDeckId: string;
  currentDeckCount: number;
  wide: boolean;
  onSelectCategory: (category: string) => void;
};
