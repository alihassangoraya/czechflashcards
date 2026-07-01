import type { ProgressDailyPoint } from "./progressDailyTypes";
import type { ProgressFocusArea } from "./progressFocusTypes";
import type { ProgressInsight } from "./progressInsightTypes";
import type { ProgressQueueHealth } from "./progressQueueTypes";

export type ProgressDashboardModel = {
  currentStreak: number;
  goalStreak: number;
  masteredCount: number;
  learningCount: number;
  unseenCount: number;
  studiedCount: number;
  reviewedToday: number;
  dailyGoal: number;
  weeklyTotal: number;
  completionRate: number;
  averageDailyReviews: number;
  examLevel: string;
  activeDeckLabel: string;
  remainingToday: number;
  dailyPoints: ProgressDailyPoint[];
  focusAreas: ProgressFocusArea[];
  insights: ProgressInsight[];
  queueHealth: ProgressQueueHealth;
};
