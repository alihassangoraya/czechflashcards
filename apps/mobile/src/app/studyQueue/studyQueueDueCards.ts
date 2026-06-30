import type { Card, ReviewState } from "@czech-flashcards/shared";
import { sortDueCardsByUrgency } from "./dueCardSelection";
import type { RelearningEntry } from "./relearningTypes";

type Input = {
  deck: Card[];
  states: Record<string, ReviewState>;
  relearningQueue: RelearningEntry[];
  now: number;
};

export function selectDueStudyCards({ deck, states, relearningQueue, now }: Input) {
  const queuedIds = new Set(relearningQueue.map((entry) => entry.id));
  return sortDueCardsByUrgency(
    deck.filter((card) => (states[card.id]?.dueAt || 0) <= now && !queuedIds.has(card.id)),
    states,
    now
  );
}
