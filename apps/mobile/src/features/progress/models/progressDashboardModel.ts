import { recentDateKeys } from "./progressDates";
import { countGoalStreak, countStudyStreak } from "./progressStreaks";
import type { ProgressDashboardInput, ProgressDashboardModel } from "../types/progressTypes";

export function buildProgressDashboardModel(input: ProgressDashboardInput): ProgressDashboardModel {
  const dailyPoints = recentDateKeys(7).map(({ key, label }) => {
    const progress = input.dailyProgressLog[key];
    return { key, label, reviewed: progress?.reviewed || 0, goal: progress?.goal || input.settings.dailyGoal, completed: Boolean(progress?.completed) };
  });
  const masteredCount = input.cards.filter((card) => (input.states[card.id]?.knownStreak || 0) >= 4).length;
  const learningCount = input.cards.filter((card) => {
    const state = input.states[card.id];
    return Boolean(state?.seen && (state.knownStreak || 0) < 4);
  }).length;
  const today = dailyPoints[dailyPoints.length - 1];
  const dailyGoal = today?.goal || input.settings.dailyGoal;

  return {
    currentStreak: countStudyStreak(input.dailyProgressLog),
    goalStreak: countGoalStreak(input.dailyProgressLog),
    masteredCount,
    learningCount,
    unseenCount: Math.max(0, input.cards.length - masteredCount - learningCount),
    reviewedToday: today?.reviewed || 0,
    dailyGoal,
    goalRatio: dailyGoal ? Math.min(1, (today?.reviewed || 0) / dailyGoal) : 0,
    weeklyTotal: dailyPoints.reduce((sum, point) => sum + point.reviewed, 0),
    dailyPoints
  };
}
