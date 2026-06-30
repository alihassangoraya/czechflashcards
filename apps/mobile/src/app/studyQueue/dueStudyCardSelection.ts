import type { Card } from "@czech-flashcards/shared";
import type { ReviewStates } from "../../database";
import { chooseVariedDueCard } from "./dueCardSelection";
import { findQueuedDueCard } from "./dueShuffleQueue";

type Input = {
  dueCards: Card[];
  states: ReviewStates;
  shuffledDueQueue: string[];
  recentCardIds: string[];
  now: number;
};

export function selectDueStudyCard({ dueCards, states, shuffledDueQueue, recentCardIds, now }: Input): Card | null {
  return findQueuedDueCard(shuffledDueQueue, dueCards) || chooseVariedDueCard(dueCards, states, recentCardIds, now);
}
