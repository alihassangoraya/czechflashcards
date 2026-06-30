import {
  loadFriendActivity,
  respondToFriendRequest,
  sendFriendRequest,
  type AppSupabaseClient,
  type FriendRequest,
  type FriendStreak
} from "../../../sync";

export type FriendActivity = {
  requests: FriendRequest[];
  friends: FriendStreak[];
};

export async function fetchFriendActivity(supabase: AppSupabaseClient): Promise<FriendActivity> {
  return loadFriendActivity(supabase);
}

export async function submitFriendRequest(supabase: AppSupabaseClient, friendCode: string): Promise<string | null> {
  return sendFriendRequest(supabase, friendCode);
}

export async function submitFriendResponse(supabase: AppSupabaseClient, requestId: string, accepted: boolean): Promise<string | null> {
  return respondToFriendRequest(supabase, requestId, accepted);
}
