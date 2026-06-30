import type { Card } from "@czech-flashcards/shared";
import type { ReviewStates } from "../../database";
import { sortDueCardsByUrgency } from "./dueCardSelection";
import type { RelearningEntry } from "./relearningTypes";

type Input = {
  deck: Card[];
  states: ReviewStates;
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
