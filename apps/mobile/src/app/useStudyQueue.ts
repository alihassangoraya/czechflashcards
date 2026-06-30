import { useEffect, useMemo, useState } from "react";
import type { Card, ReviewState } from "@czech-flashcards/shared";
import { rememberShownCardId } from "../features/study";
import { useI18n } from "../i18n/I18nProvider";
import { buildStudyQueueActions } from "./studyQueue/studyQueueActions";
import { RECENT_CARD_LIMIT } from "./studyQueue/studyQueueConstants";
import { useStudyQueueRefs } from "./studyQueue/studyQueueRefs";
import { selectNextStudyCard } from "./studyQueue/studyQueueSelection";

export function useStudyQueue(deck: Card[], states: Record<string, ReviewState>) {
  const { t } = useI18n();
  const [current, setCurrent] = useState<Card | null>(null);
  const [revealed, setRevealed] = useState(false);
  const refs = useStudyQueueRefs();
  const actions = useMemo(() => buildStudyQueueActions({ deck, states, current, refs, translate: t }), [current, deck, refs, states, t]);

  useEffect(() => {
    const selection = selectNextStudyCard({
      deck,
      states,
      forcedCardId: refs.forcedCardId.current,
      shuffledDueQueue: refs.shuffledDueQueue.current,
      relearningQueue: refs.relearningQueue.current,
      recentCardIds: refs.recentCardIds.current,
      now: Date.now()
    });
    refs.shuffledDueQueue.current = selection.shuffledDueQueue;
    refs.relearningQueue.current = selection.relearningQueue;
    refs.recentCardIds.current = rememberShownCardId(refs.recentCardIds.current, selection.nextCard, RECENT_CARD_LIMIT);
    setCurrent(selection.nextCard);
    setRevealed(Boolean(selection.forced && refs.revealForcedCard.current));
    refs.forcedCardId.current = null;
    refs.revealForcedCard.current = false;
  }, [deck, refs, states]);

  return {
    current,
    revealed,
    setCurrent,
    setRevealed,
    ...actions
  };
}

export type StudyQueue = ReturnType<typeof useStudyQueue>;
