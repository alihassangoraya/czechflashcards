import type { AppDatabase } from "../database";
import { loadAppDataSnapshot } from "./appDataSnapshot";
import type { AppDataState } from "./appDataState";

export async function refreshAppData(state: AppDataState, database: AppDatabase | null, dailyGoal = 30): Promise<void> {
  if (!database) return;
  state.applySnapshot(await loadAppDataSnapshot(database, dailyGoal));
}
