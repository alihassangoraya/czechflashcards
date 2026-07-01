import type { AppSupabaseClient } from "./supabaseClient";
import type { FriendRequest, FriendStreak } from "./syncTypes";
import { toFriendRequest, toFriendStreak } from "./friendRows";

export async function loadFriendActivityRpc(supabase: AppSupabaseClient): Promise<{ requests: FriendRequest[]; friends: FriendStreak[] }> {
  if (!supabase) return { requests: [], friends: [] };
  const [requestsResult, friendsResult] = await Promise.all([
    supabase.rpc("friend_requests"),
    supabase.rpc("friend_streaks")
  ]);
  if (requestsResult.error) throw new Error(`${requestsResult.error.code || ""} ${requestsResult.error.message}`);
  if (friendsResult.error) throw new Error(`${friendsResult.error.code || ""} ${friendsResult.error.message}`);
  return {
    requests: ((requestsResult.data || []) as Record<string, unknown>[]).map(toFriendRequest),
    friends: ((friendsResult.data || []) as Record<string, unknown>[]).map(toFriendStreak)
  };
}
