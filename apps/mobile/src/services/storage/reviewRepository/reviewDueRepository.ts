import { createReviewState } from "@czech-flashcards/shared";
import type { AppDatabase } from "../storageTypes";
import { enqueueSync } from "../syncQueueRepository";

export async function markCardsDueNow(db: AppDatabase, cardIds: string[]): Promise<number> {
  const now = Date.now();
  for (const cardId of cardIds) {
    const state = db.store.reviewStates[cardId] || createReviewState(cardId);
    db.store.reviewStates[cardId] = { ...state, dueAt: 0 };
  }
  await enqueueSync(db, "cards_marked_due", { cardIds, updatedAt: now });
  return cardIds.length;
}
