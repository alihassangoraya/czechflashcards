import type { Card, ReviewState } from "@czech-flashcards/shared";
import { compareDueReviewStates } from "@czech-flashcards/shared";

export type RelearningEntry = { id: string; remaining: number };

export function scheduleRelearningEntry(entries: RelearningEntry[], cardId: string, minCards: number, maxCards: number): RelearningEntry[] {
  const remaining = minCards + Math.floor(Math.random() * (maxCards - minCards + 1));
  return [...entries.filter((entry) => entry.id !== cardId), { id: cardId, remaining }];
}

export function advanceRelearningQueue(entries: RelearningEntry[], reviewedCardId: string): RelearningEntry[] {
  return entries.map((entry) =>
    entry.id === reviewedCardId ? entry : { ...entry, remaining: Math.max(0, entry.remaining - 1) }
  );
}

export function takeRelearningCardFromQueue(
  entries: RelearningEntry[],
  deckCards: Card[],
  recentCardIds: string[],
  allowEarlyReturn = false
): { card: Card | null; queue: RelearningEntry[] } {
  const cardsById = new Map(deckCards.map((card) => [card.id, card]));
  const eligible = entries.filter((entry) => cardsById.has(entry.id));
  const ready = eligible.filter((item) => item.remaining <= 0);
  const candidates = ready.length ? ready : allowEarlyReturn ? eligible.filter((item) => item.remaining === Math.min(...eligible.map((item) => item.remaining))) : [];
  const freshCandidates = candidates.filter((item) => !recentCardIds.includes(item.id));
  const pool = freshCandidates.length ? freshCandidates : candidates;
  const entry = pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
  if (!entry) return { card: null, queue: entries };
  return {
    card: cardsById.get(entry.id) || null,
    queue: entries.filter((item) => item.id !== entry.id)
  };
}

export function chooseVariedDueCard(dueCards: Card[], states: Record<string, ReviewState>, recentCardIds: string[], now: number): Card | null {
  const ranked = dueCards.slice().sort((a, b) => compareDueReviewStates(stateFor(states, a.id), stateFor(states, b.id), now));
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

export function rememberShownCardId(recentCardIds: string[], card: Card | null, limit: number): string[] {
  if (!card || recentCardIds[recentCardIds.length - 1] === card.id) return recentCardIds;
  return [...recentCardIds.filter((id) => id !== card.id), card.id].slice(-limit);
}

export function shuffleValues<T>(items: T[]): T[] {
  const shuffled = items.slice();
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function stateFor(states: Record<string, ReviewState>, cardId: string): ReviewState {
  return states[cardId] || { cardId, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
}
