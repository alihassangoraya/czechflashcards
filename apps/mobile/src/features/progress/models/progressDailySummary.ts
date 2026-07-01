import { recentDateKeys } from "./progressDates";
import type { ProgressDashboardInput, ProgressDailyPoint } from "../types/progressTypes";

export function buildDailyPoints(input: ProgressDashboardInput): ProgressDailyPoint[] {
  return recentDateKeys(7).map(({ key, label }) => {
    const progress = input.dailyProgressLog[key];
    return { key, label, reviewed: progress?.reviewed || 0, goal: progress?.goal || input.settings.dailyGoal, completed: Boolean(progress?.completed) };
  });
}

export function getDailyAverage(points: ProgressDailyPoint[]) {
  return Math.round(points.reduce((sum, point) => sum + point.reviewed, 0) / points.length);
}

export function getGoalDays(points: ProgressDailyPoint[]) {
  return points.filter((point) => point.completed || point.reviewed >= point.goal).length;
}
