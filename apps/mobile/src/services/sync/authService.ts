import type { AppSupabaseClient } from "./supabaseClient";

const notConfiguredMessage = "Supabase is not configured for this build.";

export async function signInWithPassword(supabase: AppSupabaseClient, email: string, password: string): Promise<string | null> {
  if (!supabase) return notConfiguredMessage;
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  return error?.message || null;
}

export async function signUpWithPassword(supabase: AppSupabaseClient, email: string, password: string, displayName: string): Promise<string | null> {
  if (!supabase) return notConfiguredMessage;
  const { error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { display_name: displayName.trim() } }
  });
  return error?.message || null;
}

export async function signOut(supabase: AppSupabaseClient): Promise<string | null> {
  if (!supabase) return notConfiguredMessage;
  const { error } = await supabase.auth.signOut();
  return error?.message || null;
}
