import type { DailyProgress, ReviewEvent, ReviewState } from "@czech-flashcards/shared";
import { undoDailyReview } from "@czech-flashcards/shared";
import type { AppDatabase } from "../storageTypes";
import { persistDatabase } from "../storageCore";
import { localDateKey } from "../storageDateKey";
import { removePendingReviewSync, removeReviewEvent, restorePreviousReviewState } from "../reviewUndoHelpers";

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
