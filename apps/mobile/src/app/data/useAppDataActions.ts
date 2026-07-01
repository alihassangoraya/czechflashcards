import type { AppDatabase, StudySettings } from "../../database";
import type { AppSupabaseClient, SyncStatus } from "../../sync";
import { refreshAppData } from "./appDataRefresh";
import { persistAppSettings } from "./appDataSettings";
import type { AppDataState } from "./appDataStateTypes";
import { syncAppDataNow } from "./appDataSyncNow";

type Params = {
  state: AppDataState;
  supabase: AppSupabaseClient;
};

export function useAppDataActions({ state, supabase }: Params) {
  const { db, settings } = state;

  async function refresh(database = db, dailyGoal = settings?.dailyGoal || 30): Promise<void> {
    await refreshAppData(state, database, dailyGoal);
  }

  async function syncNow(database: AppDatabase | null = db): Promise<SyncStatus | null> {
    return syncAppDataNow(state, database, supabase, settings?.dailyGoal || 30);
  }

  async function persistSettings(next: StudySettings): Promise<void> {
    await persistAppSettings(state, db, next);
  }

  return { persistSettings, refresh, syncNow };
}

export type AppDataActions = ReturnType<typeof useAppDataActions>;
