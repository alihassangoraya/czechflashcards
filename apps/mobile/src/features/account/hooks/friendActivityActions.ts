import {
  loadFriendActivity,
  respondToFriendRequest,
  sendFriendRequest,
  type FriendRequest,
  type FriendStreak,
  type createSupabaseClient
} from "../../../sync";

type Supabase = ReturnType<typeof createSupabaseClient>;

export type FriendActivity = {
  requests: FriendRequest[];
  friends: FriendStreak[];
};

export async function fetchFriendActivity(supabase: Supabase): Promise<FriendActivity> {
  return loadFriendActivity(supabase);
}

export async function submitFriendRequest(supabase: Supabase, friendCode: string): Promise<string | null> {
  return sendFriendRequest(supabase, friendCode);
}

export async function submitFriendResponse(supabase: Supabase, requestId: string, accepted: boolean): Promise<string | null> {
  return respondToFriendRequest(supabase, requestId, accepted);
}
