import type { Card, MeaningLanguage } from "@czech-flashcards/shared";
import type { SavedCardIds } from "../../../database";

export type SearchPanelProps = {
  cards: Card[];
  query: string;
  meaningLanguage: MeaningLanguage;
  savedCardIds: SavedCardIds;
  onQueryChange: (value: string) => void;
  onStudy: (card: Card) => void;
  onToggleSaved: (card: Card) => void;
  onManageDecks: (card: Card) => void;
  onEdit: (card: Card) => void;
};
