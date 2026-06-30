import type { DailyProgress, ReviewEvent, ReviewState } from "@czech-flashcards/shared";
import { recordDailyReview } from "@czech-flashcards/shared";
import type { AppDatabase } from "../storageTypes";
import { localDateKey } from "../storageDateKey";
import { enqueueSync } from "../syncQueueRepository";

export async function saveReviewResult(db: AppDatabase, state: ReviewState, event: ReviewEvent, dailyGoal: number): Promise<DailyProgress> {
  const date = localDateKey(new Date(event.reviewedAt));
  const progress = recordDailyReview(db.store.dailyProgress[date], date, dailyGoal, event.wasNew);
  db.store.reviewStates[state.cardId] = state;
  db.store.reviews.push(event);
  db.store.dailyProgress[date] = progress;
  await enqueueSync(db, "review_recorded", { event, state, date, dailyGoal });
  return progress;
}
