import type { ReviewEvent, ReviewState } from "@czech-flashcards/shared";
import type { AppDatabase } from "./storageTypes";

export function restorePreviousReviewState(db: AppDatabase, previousState: ReviewState) {
  if (isEmptyReviewState(previousState)) {
    delete db.store.reviewStates[previousState.cardId];
    return;
  }
  db.store.reviewStates[previousState.cardId] = previousState;
}

export function removeReviewEvent(db: AppDatabase, event: ReviewEvent) {
  const reviewIndex = db.store.reviews.findLastIndex((review) => review.cardId === event.cardId && review.reviewedAt === event.reviewedAt);
  if (reviewIndex >= 0) db.store.reviews.splice(reviewIndex, 1);
}

export function removePendingReviewSync(db: AppDatabase) {
  const queueIndex = db.store.syncQueue.findLastIndex((entry) => entry.type === "review_recorded" && !entry.syncedAt);
  if (queueIndex >= 0) db.store.syncQueue.splice(queueIndex, 1);
}

function isEmptyReviewState(state: ReviewState) {
  return !state.seen && !state.knownStreak && !state.againCount && !state.dueAt;
}
