import {
  getDailyProgress,
  loadCards,
  loadDeckMemberships,
  loadReviewStates,
  loadSavedCardIds,
  type AppDatabase
} from "../../database";
import type { AppDataSnapshot } from "./appDataSnapshotTypes";

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
