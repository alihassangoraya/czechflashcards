import { useEffect, useState } from "react";
import { useI18n } from "../../../i18n/I18nProvider";
import { normalizeFriendCode } from "../../../sync";
import { refreshOwnFriendCode } from "./friendCodeRefresh";
import { submitFriendRequest, submitFriendResponse } from "./friendActivityActions";
import type { FriendActivityParams } from "./friendActivityTypes";
import { useFriendActivityList } from "./useFriendActivityList";
export function useFriendActivity({ accountEmail, supabase, setMessage }: FriendActivityParams) {
  const { t } = useI18n();
  const [friendCode, setFriendCode] = useState(""), [friendBusy, setFriendBusy] = useState(false), [myFriendCode, setMyFriendCode] = useState<string | null>(null);
  const { friendRequests, friends, loadingFriends, refreshFriends } = useFriendActivityList({ supabase });
  async function sendFriend() {
    const code = normalizeFriendCode(friendCode);
    if (!code) return setMessage(t("account.friendCodeRequired"));
    if (myFriendCode && code === normalizeFriendCode(myFriendCode)) return setMessage(t("account.friendSelf"));
    setFriendBusy(true);
    try {
      const error = await submitFriendRequest(supabase, code);
      if (!error) setFriendCode("");
      setMessage((await refreshFriends()) || (error || t("account.friendSent")));
    } catch (error) { setMessage(error instanceof Error ? error.message : t("account.friendError")); } finally { setFriendBusy(false); }
  }
  async function respondToRequest(requestId: string, accepted: boolean) {
    setFriendBusy(true);
    try {
      const error = await submitFriendResponse(supabase, requestId, accepted);
      const success = accepted ? t("account.friendAdded") : t("account.friendDeclined");
      setMessage((await refreshFriends()) || (error || success));
    } catch (error) { setMessage(error instanceof Error ? error.message : t("account.friendError")); } finally { setFriendBusy(false); }
  }
  useEffect(() => {
    if (accountEmail) void refreshOwnFriendCode({ supabase, setMyFriendCode, setMessage, setupMessage: t("account.friendSetupMissing") });
    if (accountEmail) void refreshFriends().then((error) => error && setMessage(error));
  }, [accountEmail, supabase]);
  return { friendCode, myFriendCode, friendRequests, friends, friendBusy, loadingFriends, setFriendCode, sendFriend, respondToRequest };
}
