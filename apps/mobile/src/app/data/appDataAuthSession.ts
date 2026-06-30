import { useEffect } from "react";
import type { AppDatabase } from "../../database";
import type { AppSupabaseClient } from "../../sync";
import type { AppDataState } from "./appDataState";

export function useAppDataAuthSession(
  state: AppDataState,
  supabase: AppSupabaseClient,
  database: AppDatabase | null,
  syncNow: (database: AppDatabase) => Promise<void>
): void {
  useEffect(() => {
    if (!supabase) return;
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      state.setAccountEmail(session?.user.email || null);
      if (database && session?.user) void syncNow(database);
      if (!session?.user) state.setSyncStatus("guest");
    });
    return () => listener.subscription.unsubscribe();
  }, [database, supabase]);
}
