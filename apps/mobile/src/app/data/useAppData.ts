import { useEffect } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useAppDataAuthSession } from "./appDataAuthSession";
import { bootAppData } from "./appDataBoot";
import { useAppDataActions } from "./useAppDataActions";
import { useAppDataState } from "./appDataState";
import { useAuthActions } from "./useAuthActions";

export function useAppData(supabase: SupabaseClient | null) {
  const state = useAppDataState();
  const { persistSettings, refresh, syncNow } = useAppDataActions({ state, supabase });
  const auth = useAuthActions(supabase, async () => syncNow());

  useEffect(() => {
    void bootAppData(state, supabase);
  }, []);

  useAppDataAuthSession(state, supabase, state.db, syncNow);

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

export type AppData = ReturnType<typeof useAppData>;
