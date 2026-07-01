import type { Category } from "../models/homeContent";

export type DeckCategoryCardProps = {
  category: Category;
  selected: boolean;
  title: string;
  wide: boolean;
  onSelect: (categoryId: string) => void;
};
