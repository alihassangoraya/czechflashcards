import type { DailyProgress, ReviewEvent, ReviewState } from "@czech-flashcards/shared";
import { createReviewState } from "@czech-flashcards/shared";
import type { AppDatabase } from "./storageTypes";
import { DEFAULT_SETTINGS } from "./storageTypes";
import { localDateKey, persistDatabase } from "./storageCore";
import { enqueueSync } from "./syncQueueRepository";

export async function getReviewState(db: AppDatabase, cardId: string): Promise<ReviewState> {
  return db.store.reviewStates[cardId] || createReviewState(cardId);
}

export async function loadReviewStates(db: AppDatabase): Promise<Record<string, ReviewState>> {
  return { ...db.store.reviewStates };
}

export async function saveReviewResult(db: AppDatabase, state: ReviewState, event: ReviewEvent, dailyGoal: number): Promise<DailyProgress> {
  const date = localDateKey(new Date(event.reviewedAt));
  const previous = db.store.dailyProgress[date] || { date, reviewed: 0, newCards: 0, goal: dailyGoal, completed: false };
  const progress: DailyProgress = {
    date,
    reviewed: previous.reviewed + 1,
    newCards: previous.newCards + (event.wasNew ? 1 : 0),
    goal: dailyGoal,
    completed: previous.reviewed + 1 >= dailyGoal
  };
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
  const previous = db.store.dailyProgress[date] || { date, reviewed: 0, newCards: 0, goal: dailyGoal, completed: false };
  const progress: DailyProgress = {
    date,
    reviewed: Math.max(0, previous.reviewed - 1),
    newCards: Math.max(0, previous.newCards - (event.wasNew ? 1 : 0)),
    goal: dailyGoal,
    completed: Math.max(0, previous.reviewed - 1) >= dailyGoal
  };
  if (!previousState.seen && !previousState.knownStreak && !previousState.againCount && !previousState.dueAt) {
    delete db.store.reviewStates[previousState.cardId];
  } else {
    db.store.reviewStates[previousState.cardId] = previousState;
  }
  const reviewIndex = db.store.reviews.findLastIndex((review) => review.cardId === event.cardId && review.reviewedAt === event.reviewedAt);
  if (reviewIndex >= 0) db.store.reviews.splice(reviewIndex, 1);
  const queueIndex = db.store.syncQueue.findLastIndex((entry) => entry.type === "review_recorded" && !entry.syncedAt);
  if (queueIndex >= 0) db.store.syncQueue.splice(queueIndex, 1);
  db.store.dailyProgress[date] = progress;
  await persistDatabase(db);
  return progress;
}

export async function getDailyProgress(db: AppDatabase, date = localDateKey(), goal = DEFAULT_SETTINGS.dailyGoal): Promise<DailyProgress> {
  return db.store.dailyProgress[date] || { date, reviewed: 0, newCards: 0, goal, completed: false };
}
