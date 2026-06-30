import type { ReviewState } from "@czech-flashcards/shared";
import { createReviewState } from "@czech-flashcards/shared";
import type { AppDatabase, ReviewStates } from "../storageTypes";

export async function getReviewState(db: AppDatabase, cardId: string): Promise<ReviewState> {
  return db.store.reviewStates[cardId] || createReviewState(cardId);
}

export async function loadReviewStates(db: AppDatabase): Promise<ReviewStates> {
  return { ...db.store.reviewStates };
}
