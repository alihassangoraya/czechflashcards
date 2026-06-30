import type { Card } from "@czech-flashcards/shared";
import type { RelearningEntry } from "./relearningTypes";

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
