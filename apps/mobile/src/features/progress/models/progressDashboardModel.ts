import { getProgressCardCounts } from "./progressCardCounts";
import { countGoalStreak, countStudyStreak } from "./progressStreaks";
import { buildDailyPoints, getDailyAverage, getGoalDays } from "./progressDailySummary";
import { buildFocusAreas } from "./progressFocusAreas";
import { buildProgressInsights } from "./progressInsights";
import { buildProgressQueueHealth } from "./progressQueueHealth";
import type { ProgressDashboardInput, ProgressDashboardModel } from "../types/progressTypes";
export function buildProgressDashboardModel(input: ProgressDashboardInput): ProgressDashboardModel {
  const dailyPoints = buildDailyPoints(input);
  const counts = getProgressCardCounts(input);
  const today = dailyPoints[dailyPoints.length - 1];
  const dailyGoal = today?.goal || input.settings.dailyGoal;
  const goalDays = getGoalDays(dailyPoints);
  const averageDailyReviews = getDailyAverage(dailyPoints);
  const remainingToday = Math.max(0, dailyGoal - (today?.reviewed || 0));
  const activeDeckLabel = input.settings.customDecks.find((deck) => deck.id === input.settings.deckFilter)?.name || input.settings.deckFilter;
  const completionRate = Math.round((goalDays / dailyPoints.length) * 100);
  return {
    currentStreak: countStudyStreak(input.dailyProgressLog),
    goalStreak: countGoalStreak(input.dailyProgressLog),
    masteredCount: counts.mastered,
    learningCount: counts.learning,
    unseenCount: counts.unseen,
    studiedCount: counts.studied,
    reviewedToday: today?.reviewed || 0,
    dailyGoal,
    weeklyTotal: dailyPoints.reduce((sum, point) => sum + point.reviewed, 0),
    completionRate,
    averageDailyReviews,
    examLevel: input.settings.examLevel,
    activeDeckLabel,
    remainingToday,
    dailyPoints,
    focusAreas: buildFocusAreas(input),
    insights: buildProgressInsights(completionRate, averageDailyReviews, activeDeckLabel),
    queueHealth: buildProgressQueueHealth(input)
  };
}
