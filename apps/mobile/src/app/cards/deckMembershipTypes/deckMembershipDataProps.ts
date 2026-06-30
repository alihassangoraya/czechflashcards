import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase } from "../../../database";

export type DeckMembershipDataProps = {
  db: AppDatabase | null;
  cards: Card[];
};
