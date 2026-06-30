import type { SupabaseClient } from "@supabase/supabase-js";
import type { AppDatabase, StudySettings } from "../../database";
import { refreshAppData } from "./appDataRefresh";
import { persistAppSettings } from "./appDataSettings";
import type { AppDataState } from "./appDataState";
import { syncAppDataNow } from "./appDataSyncNow";

type Params = {
  state: AppDataState;
  supabase: SupabaseClient | null;
};

export function useAppDataActions({ state, supabase }: Params) {
  const { db, settings } = state;

  async function refresh(database = db, dailyGoal = settings?.dailyGoal || 30): Promise<void> {
    await refreshAppData(state, database, dailyGoal);
  }

  async function syncNow(database: AppDatabase | null = db): Promise<void> {
    await syncAppDataNow(state, database, supabase, settings?.dailyGoal || 30);
  }

  async function persistSettings(next: StudySettings): Promise<void> {
    await persistAppSettings(state, db, next);
  }

  return { persistSettings, refresh, syncNow };
}
