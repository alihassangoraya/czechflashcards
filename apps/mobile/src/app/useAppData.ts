import { useEffect } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { AppDatabase, StudySettings } from "../database";
import { useAppDataAuthSession } from "./appDataAuthSession";
import { bootAppData } from "./appDataBoot";
import { refreshAppData } from "./appDataRefresh";
import { persistAppSettings } from "./appDataSettings";
import { syncAppDataNow } from "./appDataSyncNow";
import { useAppDataState } from "./appDataState";
import { useAuthActions } from "./useAuthActions";

export function useAppData(supabase: SupabaseClient | null) {
  const state = useAppDataState();
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

  const auth = useAuthActions(supabase, async () => syncNow());

  useEffect(() => {
    void bootAppData(state, supabase);
  }, []);

  useAppDataAuthSession(state, supabase, db, syncNow);

  return {
    db: state.db,
    cards: state.cards,
    savedCardIds: state.savedCardIds,
    deckMemberships: state.deckMemberships,
    states: state.states,
    settings: state.settings,
    dailyProgress: state.dailyProgress,
    syncStatus: state.syncStatus,
    accountEmail: state.accountEmail,
    authBusy: auth.authBusy,
    setCards: state.setCards,
    setSavedCardIds: state.setSavedCardIds,
    setDeckMemberships: state.setDeckMemberships,
    setStates: state.setStates,
    setSettingsState: state.setSettingsState,
    setSyncStatus: state.setSyncStatus,
    refresh,
    persistSettings,
    syncNow,
    authenticate: auth.authenticate,
    signOutAccount: auth.signOutAccount
  };
}
