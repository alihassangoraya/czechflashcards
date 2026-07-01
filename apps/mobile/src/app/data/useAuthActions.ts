import { useState } from "react";
import { signInWithOAuthProvider, signInWithPassword, signOut, signUpWithPassword, type AppSupabaseClient, type AuthMode, type AuthProvider } from "../../sync";

export function useAuthActions(supabase: AppSupabaseClient, onAuthenticated: () => Promise<void>) {
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

  async function authenticateWithProvider(provider: AuthProvider) {
    setAuthBusy(true);
    const error = await signInWithOAuthProvider(supabase, provider);
    setAuthBusy(false);
    return error;
  }

  return { authBusy, authenticate, authenticateWithProvider, signOutAccount };
}

export type AuthActions = ReturnType<typeof useAuthActions>;
