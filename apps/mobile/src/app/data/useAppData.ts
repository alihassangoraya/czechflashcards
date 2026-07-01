import { useEffect } from "react";
import type { AppSupabaseClient } from "../../sync";
import { useAppDataAuthSession } from "./appDataAuthSession";
import { bootAppData } from "./appDataBoot";
import { buildAppDataResult } from "./appDataResult";
import { useAppDataActions } from "./useAppDataActions";
import { useAppDataState } from "./appDataState";
import { useAuthActions } from "./useAuthActions";

export function useAppData(supabase: AppSupabaseClient) {
  const state = useAppDataState();
  const actions = useAppDataActions({ state, supabase });
  const auth = useAuthActions(supabase, async () => { await actions.syncNow(); });

  useEffect(() => {
    void bootAppData(state, supabase);
  }, []);

  useAppDataAuthSession(state, supabase, state.db, actions.syncNow);

  return buildAppDataResult({ state, actions, auth });
}

export type AppData = ReturnType<typeof useAppData>;
