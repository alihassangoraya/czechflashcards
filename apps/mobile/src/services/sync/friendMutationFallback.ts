import type { AppSupabaseClient } from "./supabaseClient";
import { normalizeFriendCode } from "./friendCode";

export async function sendFriendRequestFallback(supabase: AppSupabaseClient, friendCode: string): Promise<string | null> {
  if (!supabase) return "Supabase is not configured for this build.";
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id, code = normalizeFriendCode(friendCode);
  if (!userId || !code) return "Enter a friend code.";
  const { data: target } = await supabase.from("profiles").select("user_id").eq("friend_code", code).maybeSingle();
  const targetId = (target as { user_id?: string } | null)?.user_id;
  if (!targetId) return "Friend code not found.";
  if (targetId === userId) return "You cannot add yourself.";
  const existing = await findFriendship(supabase, userId, targetId);
  if (existing?.status === "accepted") return null;
  if (existing?.status === "blocked") return "This friendship is unavailable.";
  if (existing?.requester_id === targetId) return acceptFriendship(supabase, existing.id);
  if (existing) return null;
  const { error } = await supabase.from("friendships").insert({ requester_id: userId, addressee_id: targetId });
  return error?.message || null;
}

export async function respondToFriendRequestFallback(supabase: AppSupabaseClient, requestId: string, accept: boolean): Promise<string | null> {
  if (!supabase) return "Supabase is not configured for this build.";
  if (accept) return acceptFriendship(supabase, requestId);
  const { error } = await supabase.from("friendships").delete().eq("id", requestId).eq("status", "pending");
  return error?.message || null;
}

async function findFriendship(supabase: AppSupabaseClient, userId: string, targetId: string) {
  if (!supabase) return null;
  const { data } = await supabase.from("friendships").select("id,requester_id,status").or(`and(requester_id.eq.${userId},addressee_id.eq.${targetId}),and(requester_id.eq.${targetId},addressee_id.eq.${userId})`).maybeSingle();
  return data as { id: string; requester_id: string; status: string } | null;
}

async function acceptFriendship(supabase: AppSupabaseClient, requestId: string) {
  if (!supabase) return "Supabase is not configured for this build.";
  const { error } = await supabase.from("friendships").update({ status: "accepted", updated_at: new Date().toISOString() }).eq("id", requestId);
  return error?.message || null;
}
