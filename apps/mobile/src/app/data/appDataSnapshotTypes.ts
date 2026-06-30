import type { Card } from "@czech-flashcards/shared";
import type { DailyProgressLog, DeckMemberships, ReviewStates, SavedCardIds } from "../../database";

export type AppDataSnapshot = {
  cards: Card[];
  savedCardIds: SavedCardIds;
  deckMemberships: DeckMemberships;
  states: ReviewStates;
  dailyProgress: string;
  dailyProgressLog: DailyProgressLog;
};
