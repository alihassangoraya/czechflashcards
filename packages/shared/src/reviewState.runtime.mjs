export function createReviewState(cardId) {
  return { cardId, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
}
