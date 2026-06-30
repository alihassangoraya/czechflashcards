import type { Card } from "@czech-flashcards/shared";
import { shuffleValues } from "./shuffleValues";

export function pruneShuffledDueQueue(queue: string[], dueCards: Card[]) {
  return queue.filter((id) => dueCards.some((card) => card.id === id));
}

export function findQueuedDueCard(queue: string[], dueCards: Card[]) {
  return queue.length ? dueCards.find((card) => card.id === queue[0]) || null : null;
}

export function buildShuffledDueQueue(dueCards: Card[], current: Card | null) {
  const currentId = current && dueCards.some((card) => card.id === current.id) ? current.id : null;
  const otherIds = dueCards.map((card) => card.id).filter((id) => id !== currentId);
  return currentId ? [...shuffleValues(otherIds), currentId] : shuffleValues(otherIds);
}
