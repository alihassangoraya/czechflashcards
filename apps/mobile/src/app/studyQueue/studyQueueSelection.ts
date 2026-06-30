import { selectDueStudyCard } from "./dueStudyCardSelection";
import { pruneShuffledDueQueue } from "./dueShuffleQueue";
import { selectForcedStudyCard } from "./forcedCardSelection";
import { selectDueStudyCards } from "./studyQueueDueCards";
import { selectRelearningStudyCard } from "./studyQueueRelearning";
import type { StudyQueueSelectionInput, StudyQueueSelectionResult } from "./studyQueueSelectionTypes";

export function selectNextStudyCard({
  deck,
  states,
  forcedCardId,
  shuffledDueQueue,
  relearningQueue,
  recentCardIds,
  now
}: StudyQueueSelectionInput): StudyQueueSelectionResult {
  const due = selectDueStudyCards({ deck, states, relearningQueue, now });
  const forced = selectForcedStudyCard(deck, forcedCardId);
  const relearning = selectRelearningStudyCard({ deck, dueCards: due, forced, relearningQueue, recentCardIds });
  const nextShuffledDueQueue = pruneShuffledDueQueue(shuffledDueQueue, due);
  const dueCard = selectDueStudyCard({ dueCards: due, states, shuffledDueQueue: nextShuffledDueQueue, recentCardIds, now });
  const nextCard = forced || relearning.primaryCard || dueCard || relearning.fallbackCard || null;

  return {
    nextCard,
    forced,
    shuffledDueQueue: nextShuffledDueQueue,
    relearningQueue: relearning.queue
  };
}
