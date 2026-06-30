import type { Card } from "@czech-flashcards/shared";
import type { DeckMemberships, ReviewStates, SavedCardIds } from "../../database";

export type AppDataSnapshot = {
  cards: Card[];
  savedCardIds: SavedCardIds;
  deckMemberships: DeckMemberships;
  states: ReviewStates;
  dailyProgress: string;
};
