import type { ReviewState } from "./types";

export function createReviewState(cardId: string): ReviewState {
  return { cardId, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
}
