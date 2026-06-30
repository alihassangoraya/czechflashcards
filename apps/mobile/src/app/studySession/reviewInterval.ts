import { applyReviewGrade, formatInterval, type Card, type ReviewGrade, type ReviewState } from "@czech-flashcards/shared";

export function formatReviewInterval(card: Card | null, states: Record<string, ReviewState>, grade: ReviewGrade) {
  if (!card) return "";
  const state = states[card.id] || { cardId: card.id, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
  const now = Date.now();
  const next = applyReviewGrade(state, grade, now);
  return formatInterval(next.event.nextDueAt - now);
}
