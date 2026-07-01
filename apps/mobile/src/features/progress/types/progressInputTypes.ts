import type { Card } from "@czech-flashcards/shared";
import type { DailyProgressLog, ReviewStates, StudySettings } from "../../../database";

export type ProgressDashboardInput = {
  cards: Card[];
  states: ReviewStates;
  settings: StudySettings;
  dailyProgressLog: DailyProgressLog;
};
