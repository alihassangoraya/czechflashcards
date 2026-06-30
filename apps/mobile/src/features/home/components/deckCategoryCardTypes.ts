import type { Category } from "../models/homeContent";

export type DeckCategoryCardProps = {
  category: Category;
  selected: boolean;
  title: string;
  onSelect: (categoryId: string) => void;
};
