import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase } from "../../../database";
import type { SavedCardIds } from "../savedCardState";

export type SavedCardDataProps = {
  db: AppDatabase | null;
  cards: Card[];
  savedCardIds: SavedCardIds;
};
