import { useEffect, useRef, useState } from "react";
import type { Card, ReviewGrade, ReviewState } from "@czech-flashcards/shared";
import {
  rememberShownCardId,
  type RelearningEntry
} from "../features/study";
import { useI18n } from "../i18n/I18nProvider";
import { buildDueShuffleNotice } from "./studyQueue/dueShuffleNotice";
import { recordRelearningReview, restoreRelearningQueue as restoreRelearningEntries, snapshotRelearningQueue as snapshotRelearningEntries } from "./studyQueue/relearningQueue";
import { selectNextStudyCard } from "./studyQueue/studyQueueSelection";
import { RECENT_CARD_LIMIT } from "./studyQueue/studyQueueConstants";

export function useStudyQueue(deck: Card[], states: Record<string, ReviewState>) {
  const { t } = useI18n();
  const [current, setCurrent] = useState<Card | null>(null);
  const [revealed, setRevealed] = useState(false);
  const forcedCardId = useRef<string | null>(null);
  const revealForcedCard = useRef(false);
  const shuffledDueQueue = useRef<string[]>([]);
  const relearningQueue = useRef<RelearningEntry[]>([]);
  const recentCardIds = useRef<string[]>([]);

  useEffect(() => {
    const selection = selectNextStudyCard({
      deck,
      states,
      forcedCardId: forcedCardId.current,
      shuffledDueQueue: shuffledDueQueue.current,
      relearningQueue: relearningQueue.current,
      recentCardIds: recentCardIds.current,
      now: Date.now()
    });
    shuffledDueQueue.current = selection.shuffledDueQueue;
    relearningQueue.current = selection.relearningQueue;
    rememberShownCard(selection.nextCard);
    setCurrent(selection.nextCard);
    setRevealed(Boolean(selection.forced && revealForcedCard.current));
    forcedCardId.current = null;
    revealForcedCard.current = false;
  }, [deck, states]);

  function forceCard(cardId: string, reveal = false) {
    forcedCardId.current = cardId;
    revealForcedCard.current = reveal;
  }

  function recordReviewedCard(cardId: string, grade: ReviewGrade) {
    shuffledDueQueue.current = shuffledDueQueue.current.filter((id) => id !== cardId);
    relearningQueue.current = recordRelearningReview(relearningQueue.current, cardId, grade);
  }

  function snapshotRelearningQueue() {
    return snapshotRelearningEntries(relearningQueue.current);
  }

  function restoreRelearningQueue(queue: RelearningEntry[]) {
    relearningQueue.current = restoreRelearningEntries(queue);
  }

  function shuffleDueCards(onNotice: (message: string) => void) {
    const result = buildDueShuffleNotice({ deck, states, current, translate: t });
    shuffledDueQueue.current = result.queue;
    forcedCardId.current = null;
    onNotice(result.notice);
  }

  function clearShuffledDueQueue() {
    shuffledDueQueue.current = [];
  }

  function rememberShownCard(card: Card | null) {
    recentCardIds.current = rememberShownCardId(recentCardIds.current, card, RECENT_CARD_LIMIT);
  }

  return {
    current,
    revealed,
    setCurrent,
    setRevealed,
    forceCard,
    recordReviewedCard,
    snapshotRelearningQueue,
    restoreRelearningQueue,
    shuffleDueCards,
    clearShuffledDueQueue
  };
}

export type StudyQueue = ReturnType<typeof useStudyQueue>;
