import { useState } from "react";
import { useI18n } from "../../../i18n/I18nProvider";
import type { AppSupabaseClient, FriendRequest, FriendStreak } from "../../../sync";
import { fetchFriendActivity } from "./friendActivityActions";

type Params = {
  supabase: AppSupabaseClient;
};

export function useFriendActivityList({ supabase }: Params) {
  const { t } = useI18n();
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<FriendStreak[]>([]);
  const [loadingFriends, setLoadingFriends] = useState(false);

  async function refreshFriends() {
    setLoadingFriends(true);
    try {
      const activity = await fetchFriendActivity(supabase);
      setFriendRequests(activity.requests);
      setFriends(activity.friends);
      return null;
    } catch (error) {
      if (isFriendSchemaError(error)) return t("account.friendSetupMissing");
      return error instanceof Error ? error.message : "Could not load friend activity.";
    } finally {
      setLoadingFriends(false);
    }
  }

  return { friendRequests, friends, loadingFriends, refreshFriends };
}

function isFriendSchemaError(error: unknown) {
  return error instanceof Error && /friend_requests|friend_streaks|schema cache|PGRST202/.test(error.message);
}
