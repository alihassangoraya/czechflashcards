import type { DailyProgress, ReviewEvent, ReviewState } from "@czech-flashcards/shared";
import { createDailyProgress, createReviewState, recordDailyReview, undoDailyReview } from "@czech-flashcards/shared";
import type { AppDatabase } from "./storageTypes";
import { DEFAULT_SETTINGS } from "./storageTypes";
import { localDateKey, persistDatabase } from "./storageCore";
import { removePendingReviewSync, removeReviewEvent, restorePreviousReviewState } from "./reviewUndoHelpers";
import { enqueueSync } from "./syncQueueRepository";

export async function getReviewState(db: AppDatabase, cardId: string): Promise<ReviewState> {
  return db.store.reviewStates[cardId] || createReviewState(cardId);
}

export async function loadReviewStates(db: AppDatabase): Promise<Record<string, ReviewState>> {
  return { ...db.store.reviewStates };
}

export async function saveReviewResult(db: AppDatabase, state: ReviewState, event: ReviewEvent, dailyGoal: number): Promise<DailyProgress> {
  const date = localDateKey(new Date(event.reviewedAt));
  const progress = recordDailyReview(db.store.dailyProgress[date], date, dailyGoal, event.wasNew);
  db.store.reviewStates[state.cardId] = state;
  db.store.reviews.push(event);
  db.store.dailyProgress[date] = progress;
  await enqueueSync(db, "review_recorded", { event, state, date, dailyGoal });
  return progress;
}

export async function markCardsDueNow(db: AppDatabase, cardIds: string[]): Promise<number> {
  const now = Date.now();
  for (const cardId of cardIds) {
    const state = db.store.reviewStates[cardId] || createReviewState(cardId);
    db.store.reviewStates[cardId] = { ...state, dueAt: 0 };
  }
  await enqueueSync(db, "cards_marked_due", { cardIds, updatedAt: now });
  return cardIds.length;
}

export async function undoReviewResult(
  db: AppDatabase,
  previousState: ReviewState,
  event: ReviewEvent,
  dailyGoal: number
): Promise<DailyProgress> {
  const date = localDateKey(new Date(event.reviewedAt));
  const progress = undoDailyReview(db.store.dailyProgress[date], date, dailyGoal, event.wasNew);
  restorePreviousReviewState(db, previousState);
  removeReviewEvent(db, event);
  removePendingReviewSync(db);
  db.store.dailyProgress[date] = progress;
  await persistDatabase(db);
  return progress;
}

export async function getDailyProgress(db: AppDatabase, date = localDateKey(), goal = DEFAULT_SETTINGS.dailyGoal): Promise<DailyProgress> {
  return db.store.dailyProgress[date] || createDailyProgress(date, goal);
}
