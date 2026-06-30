import type { Card } from "@czech-flashcards/shared";
import type { DailyProgressLog, ReviewStates, StudySettings } from "../../../database";

export type ProgressDailyPoint = {
  key: string;
  label: string;
  reviewed: number;
  goal: number;
  completed: boolean;
};

export type ProgressDashboardModel = {
  currentStreak: number;
  goalStreak: number;
  masteredCount: number;
  learningCount: number;
  unseenCount: number;
  reviewedToday: number;
  dailyGoal: number;
  goalRatio: number;
  weeklyTotal: number;
  dailyPoints: ProgressDailyPoint[];
};

export type ProgressDashboardInput = {
  cards: Card[];
  states: ReviewStates;
  settings: StudySettings;
  dailyProgressLog: DailyProgressLog;
};
