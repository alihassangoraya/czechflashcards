import { useEffect } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  loadSettings,
  saveSettings,
  type StudySettings
} from "../database";
import { configureLocalNotifications } from "../notifications";
import { loadAppDataSnapshot, openSeededDatabase } from "./appDataSnapshot";
import { syncAppDatabase } from "./appDataSync";
import { useAppDataState } from "./appDataState";
import { useAuthActions } from "./useAuthActions";

export function useAppData(supabase: SupabaseClient | null) {
  const state = useAppDataState();
  const { db, settings } = state;

  async function refresh(database = db, dailyGoal = settings?.dailyGoal || 30) {
    if (!database) return;
    state.applySnapshot(await loadAppDataSnapshot(database, dailyGoal));
  }

  async function syncNow(database = db) {
    if (!database) return;
    const result = await syncAppDatabase(database, supabase);
    state.setSyncStatus(result.status);
    if (result.settings) state.setSettingsState(result.settings);
    await refresh(database);
  }

  async function persistSettings(next: StudySettings) {
    if (!db) return;
    state.setSettingsState(next);
    await saveSettings(db, next);
    await configureLocalNotifications(next.notifications);
  }

  const auth = useAuthActions(supabase, async () => syncNow());

  useEffect(() => {
    async function boot() {
      const database = await openSeededDatabase();
      const nextSettings = await loadSettings(database);
      state.setDb(database);
      state.setSettingsState(nextSettings);
      await refresh(database, nextSettings.dailyGoal);
      await configureLocalNotifications(nextSettings.notifications);
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        state.setAccountEmail(data.session?.user.email || null);
      }
      const syncResult = await syncAppDatabase(database, supabase);
      state.setSyncStatus(syncResult.status);
      if (syncResult.settings) state.setSettingsState(syncResult.settings);
    }
    void boot();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      state.setAccountEmail(session?.user.email || null);
      if (db && session?.user) void syncNow(db);
      if (!session?.user) state.setSyncStatus("guest");
    });
    return () => listener.subscription.unsubscribe();
  }, [db, supabase]);

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
