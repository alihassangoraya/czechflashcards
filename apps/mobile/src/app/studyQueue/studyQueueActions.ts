import type { ReviewGrade } from "@czech-flashcards/shared";
import { buildDueShuffleNotice } from "./dueShuffleNotice";
import { recordRelearningReview, restoreRelearningQueue as restoreRelearningEntries, snapshotRelearningQueue as snapshotRelearningEntries } from "./relearningQueue";
import type { RelearningEntry } from "./relearningTypes";
import type { StudyQueueActionInput } from "./studyQueueActionTypes";

export function buildStudyQueueActions({ deck, states, current, refs, translate }: StudyQueueActionInput) {
  return {
    forceCard(cardId: string, reveal = false) {
      refs.forcedCardId.current = cardId;
      refs.revealForcedCard.current = reveal;
    },
    recordReviewedCard(cardId: string, grade: ReviewGrade) {
      refs.shuffledDueQueue.current = refs.shuffledDueQueue.current.filter((id) => id !== cardId);
      refs.relearningQueue.current = recordRelearningReview(refs.relearningQueue.current, cardId, grade);
    },
    snapshotRelearningQueue() {
      return snapshotRelearningEntries(refs.relearningQueue.current);
    },
    restoreRelearningQueue(queue: RelearningEntry[]) {
      refs.relearningQueue.current = restoreRelearningEntries(queue);
    },
    shuffleDueCards(onNotice: (message: string) => void) {
      const result = buildDueShuffleNotice({ deck, states, current, translate });
      refs.shuffledDueQueue.current = result.queue;
      refs.forcedCardId.current = null;
      onNotice(result.notice);
    },
    clearShuffledDueQueue() {
      refs.shuffledDueQueue.current = [];
    }
  };
}
