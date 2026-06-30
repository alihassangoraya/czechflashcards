import type { DailyProgressLog } from "../../../database";
import { formatDateKey, previousDateKey } from "./progressDates";

function hasStudied(log: DailyProgressLog, key: string) {
  return (log[key]?.reviewed || 0) > 0;
}

export function countStudyStreak(log: DailyProgressLog, today = new Date()) {
  let key = formatDateKey(today);
  let streak = 0;

  while (hasStudied(log, key)) {
    streak += 1;
    key = previousDateKey(key);
  }

  return streak;
}

export function countGoalStreak(log: DailyProgressLog, today = new Date()) {
  let key = formatDateKey(today);
  let streak = 0;

  while (log[key]?.completed) {
    streak += 1;
    key = previousDateKey(key);
  }

  return streak;
}
