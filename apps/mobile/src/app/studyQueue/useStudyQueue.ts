import { useMemo, useState } from "react";
import type { Card } from "@czech-flashcards/shared";
import type { ReviewStates } from "../../database";
import { useI18n } from "../../i18n/I18nProvider";
import { buildStudyQueueActions } from "./studyQueueActions";
import { useStudyQueueRefs } from "./studyQueueRefs";
import { useStudyQueueSelectionEffect } from "./useStudyQueueSelectionEffect";

export function useStudyQueue(deck: Card[], states: ReviewStates) {
  const { t } = useI18n();
  const [current, setCurrent] = useState<Card | null>(null);
  const [revealed, setRevealed] = useState(false);
  const refs = useStudyQueueRefs();
  const actions = useMemo(() => buildStudyQueueActions({ deck, states, current, refs, translate: t }), [current, deck, refs, states, t]);

  useStudyQueueSelectionEffect({ deck, refs, setCurrent, setRevealed, states });

  return {
    current,
    revealed,
    setCurrent,
    setRevealed,
    ...actions
  };
}

export type StudyQueue = ReturnType<typeof useStudyQueue>;
