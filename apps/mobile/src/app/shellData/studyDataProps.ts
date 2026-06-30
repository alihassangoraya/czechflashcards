import { buildSessionProgressProps } from "./sessionProgressProps";
import type { AppShellDataInput } from "./shellDataInput";

export function buildStudyDataProps(input: AppShellDataInput) {
  const { studySession, cardManagement, data } = input;
  return {
    current: studySession.current,
    deckManagementCard: cardManagement.deckManagementCard,
    revealed: studySession.revealed,
    grading: studySession.grading,
    lastReviewCard: studySession.lastReview?.card || null,
    sessionReviews: studySession.sessionReviews,
    ...buildSessionProgressProps(input),
    dailyProgressLog: data.dailyProgressLog,
    studyAnimations: studySession.studyAnimations,
    dailyProgress: data.dailyProgress,
    reviewInterval: studySession.reviewInterval
  };
}
