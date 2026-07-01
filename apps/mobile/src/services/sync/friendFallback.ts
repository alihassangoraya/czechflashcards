import type { AppSupabaseClient } from "./supabaseClient";
import type { FriendRequest, FriendStreak } from "./syncTypes";

type Friendship = { id: string; requester_id: string; addressee_id: string; status: "pending" | "accepted"; created_at: string | null };
type Profile = { user_id: string; friend_code: string; display_name: string | null; privacy_level?: string };

export async function loadFriendActivityFallback(supabase: AppSupabaseClient): Promise<{ requests: FriendRequest[]; friends: FriendStreak[] }> {
  if (!supabase) return { requests: [], friends: [] };
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return { requests: [], friends: [] };
  const { data, error } = await supabase.from("friendships").select("id,requester_id,addressee_id,status,created_at").or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);
  if (error) throw new Error(error.message);
  const rows = (data || []) as Friendship[];
  const ids = Array.from(new Set(rows.flatMap((row) => [row.requester_id, row.addressee_id]).filter((id) => id !== userId)));
  const profiles = await loadProfiles(supabase, ids);
  return {
    requests: rows.filter((row) => row.status === "pending" && row.addressee_id === userId).map((row) => toRequest(row, profiles[row.requester_id])),
    friends: rows.filter((row) => row.status === "accepted" || row.requester_id === userId).map((row) => toFriend(row, profiles[row.requester_id === userId ? row.addressee_id : row.requester_id]))
  };
}

async function loadProfiles(supabase: AppSupabaseClient, userIds: string[]) {
  if (!supabase || !userIds.length) return {} as Record<string, Profile>;
  const { data } = await supabase.from("profiles").select("user_id,friend_code,display_name,privacy_level").in("user_id", userIds);
  return Object.fromEntries(((data || []) as Profile[]).map((profile) => [profile.user_id, profile]));
}

function toRequest(row: Friendship, profile?: Profile): FriendRequest {
  return { id: row.id, friend_code: profile?.friend_code || "", display_name: profile?.display_name || null, created_at: row.created_at };
}

function toFriend(row: Friendship, profile?: Profile): FriendStreak {
  return { friend_code: profile?.friend_code || "", display_name: profile?.display_name || null, current_streak: null, longest_streak: null, last_completed_on: null, privacy_level: profile?.privacy_level || "private", status: row.status === "pending" ? "pending" : "accepted" };
}
