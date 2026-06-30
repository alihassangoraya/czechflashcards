export function parseHomeDailyProgress(dailyProgress: string, fallbackDailyGoal: number) {
  const [reviewedToday, goalToday] = dailyProgress.split(" / ").map((value) => Number.parseInt(value, 10) || 0);
  const dailyGoal = goalToday || fallbackDailyGoal;
  return {
    reviewedToday,
    dailyGoal,
    dailyRatio: dailyGoal ? Math.min(1, reviewedToday / dailyGoal) : 0
  };
}
