import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase } from "../../../database";
import type { Panel } from "../../appTypes";
import type { SavedCardIds } from "../savedCardState";

export type CardManagementDataProps = {
  db: AppDatabase | null;
  cards: Card[];
  current: Card | null;
  panel: Panel | null;
  savedCardIds: SavedCardIds;
};
