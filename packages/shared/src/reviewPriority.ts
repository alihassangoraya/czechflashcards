import type { ReviewState } from "./types";

export function reviewPriority(state: ReviewState): number {
  if (!state.seen) return 1;
  if (state.againCount > 0) return 3;
  return 2;
}

export function compareDueReviewStates(a: ReviewState, b: ReviewState, now = Date.now()): number {
  void now;
  const priorityDifference = reviewPriority(b) - reviewPriority(a);
  if (priorityDifference) return priorityDifference;

  const overdueDifference = (b.dueAt || 0) - (a.dueAt || 0);
  if (overdueDifference) return overdueDifference;

  return (b.againCount || 0) - (a.againCount || 0) || (a.knownStreak || 0) - (b.knownStreak || 0);
}
