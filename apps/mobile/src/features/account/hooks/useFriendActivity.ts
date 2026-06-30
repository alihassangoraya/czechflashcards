import { useEffect, useState } from "react";
import { getFriendCode } from "../../../sync";
import { useI18n } from "../../../i18n/I18nProvider";
import { submitFriendRequest, submitFriendResponse } from "./friendActivityActions";
import type { FriendActivityParams } from "./friendActivityTypes";
import { useFriendActivityList } from "./useFriendActivityList";

export function useFriendActivity({ accountEmail, supabase, setMessage }: FriendActivityParams) {
  const { t } = useI18n();
  const [friendCode, setFriendCode] = useState("");
  const [myFriendCode, setMyFriendCode] = useState<string | null>(null);
  const { friendRequests, friends, refreshFriends } = useFriendActivityList({ supabase });

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
