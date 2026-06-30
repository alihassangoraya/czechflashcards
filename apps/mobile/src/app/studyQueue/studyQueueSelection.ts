import type { Card } from "@czech-flashcards/shared";
import type { ReviewStates } from "../../database";
import { chooseVariedDueCard } from "./dueCardSelection";
import { findQueuedDueCard, pruneShuffledDueQueue } from "./dueShuffleQueue";
import type { RelearningEntry } from "./relearningTypes";
import { selectDueStudyCards } from "./studyQueueDueCards";
import { selectRelearningStudyCard } from "./studyQueueRelearning";

type SelectionInput = {
  deck: Card[];
  states: ReviewStates;
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
  const due = selectDueStudyCards({ deck, states, relearningQueue, now });
  const forced = forcedCardId ? deck.find((card) => card.id === forcedCardId) || null : null;
  const relearning = selectRelearningStudyCard({ deck, dueCards: due, forced, relearningQueue, recentCardIds });
  const nextShuffledDueQueue = pruneShuffledDueQueue(shuffledDueQueue, due);
  const queued = findQueuedDueCard(nextShuffledDueQueue, due);
  const dueCard = queued || chooseVariedDueCard(due, states, recentCardIds, now);
  const nextCard = forced || relearning.primaryCard || dueCard || relearning.fallbackCard || null;

  return {
    nextCard,
    forced,
    shuffledDueQueue: nextShuffledDueQueue,
    relearningQueue: relearning.queue
  };
}
