export function parseDailyProgress(dailyProgress: string) {
  const [reviewedToday, dailyGoal] = dailyProgress.split(" / ").map((value) => Number.parseInt(value, 10) || 0);
  return {
    reviewedToday,
    dailyGoal,
    sessionProgress: dailyGoal ? Math.min(1, reviewedToday / dailyGoal) : 0
  };
}
