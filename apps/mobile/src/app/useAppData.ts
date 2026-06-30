import { useEffect, useState } from "react";
import type { Card, ReviewState } from "@czech-flashcards/shared";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  loadSettings,
  saveSettings,
  type AppDatabase,
  type StudySettings
} from "../database";
import { configureLocalNotifications } from "../notifications";
import type { SyncStatus } from "../sync";
import { loadAppDataSnapshot, openSeededDatabase, type AppDataSnapshot } from "./appDataSnapshot";
import { syncAppDatabase } from "./appDataSync";
import { useAuthActions } from "./useAuthActions";

export function useAppData(supabase: SupabaseClient | null) {
  const [db, setDb] = useState<AppDatabase | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [savedCardIds, setSavedCardIds] = useState<Set<string>>(new Set());
  const [deckMemberships, setDeckMemberships] = useState<Record<string, string[]>>({});
  const [states, setStates] = useState<Record<string, ReviewState>>({});
  const [settings, setSettingsState] = useState<StudySettings | null>(null);
  const [dailyProgress, setDailyProgress] = useState("0 / 30");
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("not-configured");
  const [accountEmail, setAccountEmail] = useState<string | null>(null);

  function applySnapshot(snapshot: AppDataSnapshot) {
    setCards(snapshot.cards);
    setSavedCardIds(snapshot.savedCardIds);
    setDeckMemberships(snapshot.deckMemberships);
    setStates(snapshot.states);
    setDailyProgress(snapshot.dailyProgress);
  }

  async function refresh(database = db, dailyGoal = settings?.dailyGoal || 30) {
    if (!database) return;
    applySnapshot(await loadAppDataSnapshot(database, dailyGoal));
  }

  async function syncNow(database = db) {
    if (!database) return;
    const result = await syncAppDatabase(database, supabase);
    setSyncStatus(result.status);
    if (result.settings) setSettingsState(result.settings);
    await refresh(database);
  }

  async function persistSettings(next: StudySettings) {
    if (!db) return;
    setSettingsState(next);
    await saveSettings(db, next);
    await configureLocalNotifications(next.notifications);
  }

  const auth = useAuthActions(supabase, async () => syncNow());

  useEffect(() => {
    async function boot() {
      const database = await openSeededDatabase();
      const nextSettings = await loadSettings(database);
      setDb(database);
      setSettingsState(nextSettings);
      await refresh(database, nextSettings.dailyGoal);
      await configureLocalNotifications(nextSettings.notifications);
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        setAccountEmail(data.session?.user.email || null);
      }
      const syncResult = await syncAppDatabase(database, supabase);
      setSyncStatus(syncResult.status);
      if (syncResult.settings) setSettingsState(syncResult.settings);
    }
    void boot();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccountEmail(session?.user.email || null);
      if (db && session?.user) void syncNow(db);
      if (!session?.user) setSyncStatus("guest");
    });
    return () => listener.subscription.unsubscribe();
  }, [db, supabase]);

  return {
    db,
    cards,
    savedCardIds,
    deckMemberships,
    states,
    settings,
    dailyProgress,
    syncStatus,
    accountEmail,
    authBusy: auth.authBusy,
    setCards,
    setSavedCardIds,
    setDeckMemberships,
    setStates,
    setSettingsState,
    setSyncStatus,
    refresh,
    persistSettings,
    syncNow,
    authenticate: auth.authenticate,
    signOutAccount: auth.signOutAccount
  };
}
