import type { Card, ReviewState } from "@czech-flashcards/shared";
import { compareDueReviewStates } from "@czech-flashcards/shared";

export function chooseVariedDueCard(dueCards: Card[], states: Record<string, ReviewState>, recentCardIds: string[], now: number): Card | null {
  const ranked = sortDueCardsByUrgency(dueCards, states, now);
  if (!ranked.length) return null;
  const firstState = stateFor(states, ranked[0].id);
  const equallyUrgent = ranked.filter((card) => compareDueReviewStates(stateFor(states, card.id), firstState, now) === 0);
  const freshCandidates = equallyUrgent.filter((card) => !recentCardIds.includes(card.id));
  const pool = freshCandidates.length ? freshCandidates : equallyUrgent;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function sortDueCardsByUrgency(dueCards: Card[], states: Record<string, ReviewState>, now: number): Card[] {
  return dueCards.slice().sort((a, b) => compareDueReviewStates(stateFor(states, a.id), stateFor(states, b.id), now));
}

function stateFor(states: Record<string, ReviewState>, cardId: string): ReviewState {
  return states[cardId] || { cardId, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
}
