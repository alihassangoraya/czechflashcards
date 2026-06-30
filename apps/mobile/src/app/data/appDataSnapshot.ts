import type { Card, ReviewState } from "@czech-flashcards/shared";
import {
  getDailyProgress,
  loadCards,
  loadDeckMemberships,
  loadReviewStates,
  loadSavedCardIds,
  type AppDatabase
} from "../../database";

export type AppDataSnapshot = {
  cards: Card[];
  savedCardIds: Set<string>;
  deckMemberships: Record<string, string[]>;
  states: Record<string, ReviewState>;
  dailyProgress: string;
};

export async function loadAppDataSnapshot(database: AppDatabase, dailyGoal: number): Promise<AppDataSnapshot> {
  const progress = await getDailyProgress(database, undefined, dailyGoal);
  return {
    cards: await loadCards(database),
    savedCardIds: await loadSavedCardIds(database),
    deckMemberships: await loadDeckMemberships(database),
    states: await loadReviewStates(database),
    dailyProgress: `${progress.reviewed} / ${progress.goal}`
  };
}
