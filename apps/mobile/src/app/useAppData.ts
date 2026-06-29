import { useEffect, useState } from "react";
import type { Card, ReviewState } from "@czech-flashcards/shared";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getDailyProgress,
  loadCards,
  loadDeckMemberships,
  loadReviewStates,
  loadSavedCardIds,
  loadSettings,
  openAppDatabase,
  saveSettings,
  seedCards,
  type AppDatabase,
  type StudySettings
} from "../database";
import { configureLocalNotifications } from "../notifications";
import { flushSyncQueue, restoreSyncSnapshot, signInWithPassword, signOut, signUpWithPassword, type SyncStatus } from "../sync";
import { seedCardsNormalized } from "./appSeed";

type AuthMode = "sign-in" | "sign-up";

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
  const [authBusy, setAuthBusy] = useState(false);

  async function refresh(database = db, dailyGoal = settings?.dailyGoal || 30) {
    if (!database) return;
    setCards(await loadCards(database));
    setSavedCardIds(await loadSavedCardIds(database));
    setDeckMemberships(await loadDeckMemberships(database));
    setStates(await loadReviewStates(database));
    const progress = await getDailyProgress(database, undefined, dailyGoal);
    setDailyProgress(`${progress.reviewed} / ${progress.goal}`);
  }

  async function syncNow(database = db) {
    if (!database) return;
    const flushStatus = await flushSyncQueue(database, supabase);
    const restoreStatus = flushStatus === "error" ? flushStatus : await restoreSyncSnapshot(database, supabase);
    setSyncStatus(restoreStatus);
    if (restoreStatus === "synced") setSettingsState(await loadSettings(database));
    await refresh(database);
  }

  async function persistSettings(next: StudySettings) {
    if (!db) return;
    setSettingsState(next);
    await saveSettings(db, next);
    await configureLocalNotifications(next.notifications);
  }

  async function authenticate(mode: AuthMode, email: string, password: string, displayName: string) {
    setAuthBusy(true);
    const error = mode === "sign-in"
      ? await signInWithPassword(supabase, email, password)
      : await signUpWithPassword(supabase, email, password, displayName);
    setAuthBusy(false);
    if (!error) await syncNow();
    return error;
  }

  async function signOutAccount() {
    setAuthBusy(true);
    const error = await signOut(supabase);
    setAuthBusy(false);
    return error;
  }

  useEffect(() => {
    async function boot() {
      const database = await openAppDatabase();
      await seedCards(database, seedCardsNormalized);
      const nextSettings = await loadSettings(database);
      setDb(database);
      setSettingsState(nextSettings);
      await refresh(database, nextSettings.dailyGoal);
      await configureLocalNotifications(nextSettings.notifications);
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        setAccountEmail(data.session?.user.email || null);
      }
      const flushStatus = await flushSyncQueue(database, supabase);
      const restoreStatus = flushStatus === "error" ? flushStatus : await restoreSyncSnapshot(database, supabase);
      setSyncStatus(restoreStatus);
      if (restoreStatus === "synced") setSettingsState(await loadSettings(database));
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
    authBusy,
    setCards,
    setSavedCardIds,
    setDeckMemberships,
    setStates,
    setSettingsState,
    setSyncStatus,
    refresh,
    persistSettings,
    syncNow,
    authenticate,
    signOutAccount
  };
}
