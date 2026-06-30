import { useState } from "react";
import type { AppSupabaseClient, FriendRequest, FriendStreak } from "../../../sync";
import { fetchFriendActivity } from "./friendActivityActions";

type Params = {
  supabase: AppSupabaseClient;
};

export function useFriendActivityList({ supabase }: Params) {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<FriendStreak[]>([]);

  async function refreshFriends() {
    const activity = await fetchFriendActivity(supabase);
    setFriendRequests(activity.requests);
    setFriends(activity.friends);
  }

  return { friendRequests, friends, refreshFriends };
}
