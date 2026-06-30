import { useState } from "react";
import type { FriendRequest, FriendStreak, createSupabaseClient } from "../../../sync";
import { fetchFriendActivity } from "./friendActivityActions";

type Params = {
  supabase: ReturnType<typeof createSupabaseClient>;
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
