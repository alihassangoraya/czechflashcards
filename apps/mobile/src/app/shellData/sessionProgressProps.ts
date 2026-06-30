import type { Card } from "@czech-flashcards/shared";
import type { AppData } from "../data/useAppData";
import type { StudySession } from "../study/useStudySession";
import { parseDailyProgress } from "../studySummary";

type Input = {
  data: AppData;
  deck: Card[];
  studySession: StudySession;
};

export function buildSessionProgressProps({ data, deck, studySession }: Input) {
  const { reviewedToday, dailyGoal, sessionProgress } = parseDailyProgress(data.dailyProgress);
  const sessionTarget = Math.min(deck.length, Math.max(1, dailyGoal - reviewedToday + studySession.sessionReviews));
  return { dailyGoal, reviewedToday, sessionProgress, sessionTarget };
}
