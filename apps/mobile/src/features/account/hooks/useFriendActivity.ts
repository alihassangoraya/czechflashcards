import { useEffect, useState } from "react";
import {
  getFriendCode,
  type FriendRequest,
  type FriendStreak
} from "../../../sync";
import type { createSupabaseClient } from "../../../sync";
import { useI18n } from "../../../i18n/I18nProvider";
import { fetchFriendActivity, submitFriendRequest, submitFriendResponse } from "./friendActivityActions";

type Params = {
  accountEmail: string | null;
  supabase: ReturnType<typeof createSupabaseClient>;
  setMessage: (message: string) => void;
};

export function useFriendActivity({ accountEmail, supabase, setMessage }: Params) {
  const { t } = useI18n();
  const [friendCode, setFriendCode] = useState("");
  const [myFriendCode, setMyFriendCode] = useState<string | null>(null);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<FriendStreak[]>([]);

  async function refreshFriends() {
    const activity = await fetchFriendActivity(supabase);
    setFriendRequests(activity.requests);
    setFriends(activity.friends);
  }

  async function sendFriend() {
    setMessage((await submitFriendRequest(supabase, friendCode)) || t("account.friendSent"));
    setFriendCode("");
    await refreshFriends();
  }

  async function respondToRequest(requestId: string, accepted: boolean) {
    setMessage((await submitFriendResponse(supabase, requestId, accepted)) || (accepted ? t("account.friendAdded") : t("account.friendDeclined")));
    await refreshFriends();
  }

  useEffect(() => {
    if (!accountEmail) return;
    void getFriendCode(supabase).then(setMyFriendCode);
    void refreshFriends();
  }, [accountEmail, supabase]);

  return {
    friendCode,
    myFriendCode,
    friendRequests,
    friends,
    setFriendCode,
    sendFriend,
    respondToRequest
  };
}
