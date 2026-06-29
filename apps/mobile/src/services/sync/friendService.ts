import type { SupabaseClient } from "./supabaseClient";
import type { FriendRequest, FriendStreak } from "./syncTypes";

export async function getFriendCode(supabase: SupabaseClient | null): Promise<string | null> {
  if (!supabase) return null;
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;
  const { data } = await supabase.from("profiles").select("friend_code").eq("user_id", userData.user.id).maybeSingle();
  return data?.friend_code || null;
}

export async function sendFriendRequest(supabase: SupabaseClient | null, friendCode: string): Promise<string | null> {
  if (!supabase) return "Supabase is not configured for this build.";
  const { error } = await supabase.rpc("send_friend_request", { target_friend_code: friendCode.trim() });
  return error?.message || null;
}

export async function loadFriendActivity(supabase: SupabaseClient | null): Promise<{ requests: FriendRequest[]; friends: FriendStreak[] }> {
  if (!supabase) return { requests: [], friends: [] };
  const [requestsResult, friendsResult] = await Promise.all([
    supabase.rpc("friend_requests"),
    supabase.rpc("friend_streaks")
  ]);
  return { requests: requestsResult.data || [], friends: friendsResult.data || [] };
}

export async function respondToFriendRequest(supabase: SupabaseClient | null, requestId: string, accept: boolean): Promise<string | null> {
  if (!supabase) return "Supabase is not configured for this build.";
  const { error } = await supabase.rpc("respond_to_friend_request", { request_id: requestId, accept_request: accept });
  return error?.message || null;
}
