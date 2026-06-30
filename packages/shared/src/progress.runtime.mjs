export function createDailyProgress(date, goal) {
  return { date, reviewed: 0, newCards: 0, goal, completed: false };
}

export function recordDailyReview(previous, date, goal, wasNew) {
  const base = previous || createDailyProgress(date, goal);
  const reviewed = base.reviewed + 1;
  return {
    date,
    reviewed,
    newCards: base.newCards + (wasNew ? 1 : 0),
    goal,
    completed: reviewed >= goal
  };
}

export function undoDailyReview(previous, date, goal, wasNew) {
  const base = previous || createDailyProgress(date, goal);
  const reviewed = Math.max(0, base.reviewed - 1);
  return {
    date,
    reviewed,
    newCards: Math.max(0, base.newCards - (wasNew ? 1 : 0)),
    goal,
    completed: reviewed >= goal
  };
}
