import type { Card, ReviewState } from "@czech-flashcards/shared";
import { chooseVariedDueCard, sortDueCardsByUrgency, type RelearningEntry } from "../../features/study";
import { findQueuedDueCard, pruneShuffledDueQueue } from "./dueShuffleQueue";
import { takeNextRelearningCard } from "./relearningQueue";

type SelectionInput = {
  deck: Card[];
  states: Record<string, ReviewState>;
  forcedCardId: string | null;
  shuffledDueQueue: string[];
  relearningQueue: RelearningEntry[];
  recentCardIds: string[];
  now: number;
};

export type SelectionResult = {
  nextCard: Card | null;
  shuffledDueQueue: string[];
  relearningQueue: RelearningEntry[];
  forced: Card | null;
};

export function selectNextStudyCard({
  deck,
  states,
  forcedCardId,
  shuffledDueQueue,
  relearningQueue,
  recentCardIds,
  now
}: SelectionInput): SelectionResult {
  const queuedIds = new Set(relearningQueue.map((entry) => entry.id));
  const due = sortDueCardsByUrgency(
    deck.filter((card) => (states[card.id]?.dueAt || 0) <= now && !queuedIds.has(card.id)),
    states,
    now
  );
  const forced = forcedCardId ? deck.find((card) => card.id === forcedCardId) || null : null;
  const relearning = forced ? { card: null, queue: relearningQueue } : takeNextRelearningCard(relearningQueue, deck, recentCardIds);
  const fallbackRelearning = forced || relearning.card || due.length ? { card: null, queue: relearning.queue } : takeNextRelearningCard(relearning.queue, deck, recentCardIds, true);
  const nextShuffledDueQueue = pruneShuffledDueQueue(shuffledDueQueue, due);
  const queued = findQueuedDueCard(nextShuffledDueQueue, due);
  const nextCard = forced || relearning.card || queued || chooseVariedDueCard(due, states, recentCardIds, now) || fallbackRelearning.card || null;

  return {
    nextCard,
    forced,
    shuffledDueQueue: nextShuffledDueQueue,
    relearningQueue: fallbackRelearning.queue
  };
}
