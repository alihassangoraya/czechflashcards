import type { AppSupabaseClient } from "./supabaseClient";
import { clearPasswordRecoveryUrl, passwordRecoveryTokens } from "./passwordRecoveryUrl";

const notConfiguredMessage = "Supabase is not configured for this build.";

export async function consumePasswordRecoverySession(supabase: AppSupabaseClient): Promise<string | null> {
  if (!supabase) return notConfiguredMessage;
  const tokens = passwordRecoveryTokens();
  if (tokens.code) {
    const { error } = await supabase.auth.exchangeCodeForSession(tokens.code);
    if (error) return error.message;
  } else if (tokens.accessToken && tokens.refreshToken) {
    const { error } = await supabase.auth.setSession({ access_token: tokens.accessToken, refresh_token: tokens.refreshToken });
    if (error) return error.message;
  }
  clearPasswordRecoveryUrl();
  return null;
}

export async function updateRecoveredPassword(supabase: AppSupabaseClient, password: string): Promise<string | null> {
  if (!supabase) return notConfiguredMessage;
  const { error } = await supabase.auth.updateUser({ password });
  return error?.message || null;
}
