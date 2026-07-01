import type { AppSupabaseClient } from "./supabaseClient";
import { loadOwnFriendCode, createOwnFriendCode } from "./friendProfileFallback";

export async function getFriendCode(supabase: AppSupabaseClient): Promise<string | null> {
  if (!supabase) return null;
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return null;
  const { data, error } = await supabase.rpc("ensure_profile");
  if (!error && typeof data === "string") return data;
  return (await loadOwnFriendCode(supabase, userId)) || createOwnFriendCode(supabase, userId);
}
