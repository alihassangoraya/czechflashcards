import type { DailyProgress } from "@czech-flashcards/shared";
import { createDailyProgress } from "@czech-flashcards/shared";
import type { AppDatabase } from "./storageTypes";
import { DEFAULT_SETTINGS } from "./storageTypes";
import { localDateKey } from "./storageDateKey";

export async function getDailyProgress(db: AppDatabase, date = localDateKey(), goal = DEFAULT_SETTINGS.dailyGoal): Promise<DailyProgress> {
  return db.store.dailyProgress[date] || createDailyProgress(date, goal);
}
