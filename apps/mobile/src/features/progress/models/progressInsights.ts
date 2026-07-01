import type { ProgressInsight } from "../types/progressTypes";

export function buildProgressInsights(completionRate: number, averageDailyReviews: number, activeDeckLabel: string): ProgressInsight[] {
  return [
    { icon: "flag", labelKey: "progress.goalHitRate", value: `${completionRate}%` },
    { icon: "trending-up", labelKey: "progress.dailyAverage", value: String(averageDailyReviews) },
    { icon: "layers", labelKey: "progress.activeDeck", value: activeDeckLabel }
  ];
}
