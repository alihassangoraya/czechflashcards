import { useStudyQueue } from "../studyQueue/useStudyQueue";
import { useStudyReviewActions } from "../studySession/useStudyReviewActions";
import { buildStudySession } from "./buildStudySession";
import type { StudySessionProps } from "./studySessionProps";
import { useStudySessionAnimations } from "./useStudySessionAnimations";

export function useStudySession({ db, settings, deck, states, refresh }: StudySessionProps) {
  const queue = useStudyQueue(deck, states);
  const reviews = useStudyReviewActions({ db, settings, queue, refresh });
  const studyAnimations = useStudySessionAnimations({ queue, reviews });
  return buildStudySession({ queue, reviews, studyAnimations, states });
}

export type StudySession = ReturnType<typeof useStudySession>;
