import { useMemo, useRef } from "react";
import type { RelearningEntry } from "../../features/study";

export function useStudyQueueRefs() {
  const forcedCardId = useRef<string | null>(null);
  const revealForcedCard = useRef(false);
  const shuffledDueQueue = useRef<string[]>([]);
  const relearningQueue = useRef<RelearningEntry[]>([]);
  const recentCardIds = useRef<string[]>([]);

  return useMemo(() => ({ forcedCardId, revealForcedCard, shuffledDueQueue, relearningQueue, recentCardIds }), []);
}

export type StudyQueueRefs = ReturnType<typeof useStudyQueueRefs>;
