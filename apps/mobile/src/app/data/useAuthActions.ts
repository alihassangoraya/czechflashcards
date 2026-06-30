import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { signInWithPassword, signOut, signUpWithPassword, type AuthMode } from "../../sync";

export function useAuthActions(supabase: SupabaseClient | null, onAuthenticated: () => Promise<void>) {
  const [authBusy, setAuthBusy] = useState(false);

  async function authenticate(mode: AuthMode, email: string, password: string, displayName: string) {
    setAuthBusy(true);
    const error = mode === "sign-in"
      ? await signInWithPassword(supabase, email, password)
      : await signUpWithPassword(supabase, email, password, displayName);
    setAuthBusy(false);
    if (!error) await onAuthenticated();
    return error;
  }

  async function signOutAccount() {
    setAuthBusy(true);
    const error = await signOut(supabase);
    setAuthBusy(false);
    return error;
  }

  return { authBusy, authenticate, signOutAccount };
}
