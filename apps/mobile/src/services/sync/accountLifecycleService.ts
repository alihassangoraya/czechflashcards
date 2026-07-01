import type { AppSupabaseClient } from "./supabaseClient";

const notConfiguredMessage = "Supabase is not configured for this build.";

function redirectUrl(): string | undefined {
  if (typeof window === "undefined" || !window.location?.origin) return undefined;
  return `${window.location.origin}/reset-password`;
}

export async function sendPasswordReset(supabase: AppSupabaseClient, email: string): Promise<string | null> {
  if (!supabase) return notConfiguredMessage;
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: redirectUrl() });
  return error?.message || null;
}

export async function deleteAccount(supabase: AppSupabaseClient): Promise<string | null> {
  if (!supabase) return notConfiguredMessage;
  const { error } = await supabase.rpc("delete_own_account");
  return error?.message || null;
}
