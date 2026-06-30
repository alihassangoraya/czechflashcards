import type { Card, ReviewGrade, ReviewState } from "@czech-flashcards/shared";
import type { RelearningEntry } from "../../features/study";
import type { TranslationKey } from "../../i18n/translations";
import { buildDueShuffleNotice } from "./dueShuffleNotice";
import { recordRelearningReview, restoreRelearningQueue as restoreRelearningEntries, snapshotRelearningQueue as snapshotRelearningEntries } from "./relearningQueue";
import type { StudyQueueRefs } from "./studyQueueRefs";

type Input = {
  deck: Card[];
  states: Record<string, ReviewState>;
  current: Card | null;
  refs: StudyQueueRefs;
  translate: (key: TranslationKey) => string;
};

export function buildStudyQueueActions({ deck, states, current, refs, translate }: Input) {
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
