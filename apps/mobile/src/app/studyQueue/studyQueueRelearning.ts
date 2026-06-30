import type { Card } from "@czech-flashcards/shared";
import { takeNextRelearningCard } from "./relearningQueue";
import type { RelearningEntry } from "./relearningTypes";

type Input = {
  deck: Card[];
  dueCards: Card[];
  forced: Card | null;
  relearningQueue: RelearningEntry[];
  recentCardIds: string[];
};

export function selectRelearningStudyCard({ deck, dueCards, forced, relearningQueue, recentCardIds }: Input) {
  const primary = forced ? { card: null, queue: relearningQueue } : takeNextRelearningCard(relearningQueue, deck, recentCardIds);
  const fallback = forced || primary.card || dueCards.length ? { card: null, queue: primary.queue } : takeNextRelearningCard(primary.queue, deck, recentCardIds, true);

  return {
    primaryCard: primary.card,
    fallbackCard: fallback.card,
    queue: fallback.queue
  };
}
