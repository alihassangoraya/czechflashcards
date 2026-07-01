import type { AppSupabaseClient } from "./supabaseClient";

type ProfileRow = { friend_code?: string | null };

export async function loadOwnFriendCode(supabase: AppSupabaseClient, userId: string) {
  if (!supabase) return null;
  const { data, error } = await supabase.from("profiles").select("friend_code").eq("user_id", userId).maybeSingle();
  if (error) throw new Error(error.message);
  return ((data as ProfileRow | null)?.friend_code || "").trim() || null;
}

export async function createOwnFriendCode(supabase: AppSupabaseClient, userId: string) {
  if (!supabase) return null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const friendCode = randomFriendCode();
    const { error } = await supabase.from("profiles").upsert({ user_id: userId, friend_code: friendCode }, { onConflict: "user_id" });
    if (!error) return friendCode;
    if (!/duplicate|unique/i.test(error.message)) throw new Error(error.message);
  }
  return null;
}

function randomFriendCode() {
  return Math.random().toString(36).slice(2, 10).padEnd(8, "0").toLowerCase();
}
