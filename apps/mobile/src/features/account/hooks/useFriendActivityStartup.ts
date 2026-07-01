import { useEffect } from "react";
import type { AppSupabaseClient } from "../../../sync";
import { refreshOwnFriendCode } from "./friendCodeRefresh";

type Params = {
  accountEmail: string | null;
  refreshFriends: () => Promise<string | null>;
  setFriendSetupUnavailable: (value: boolean) => void;
  setMessage: (message: string) => void;
  setMyFriendCode: (code: string | null) => void;
  setupMessage: string;
  supabase: AppSupabaseClient;
};

export function useFriendActivityStartup({ accountEmail, refreshFriends, setFriendSetupUnavailable, setMessage, setMyFriendCode, setupMessage, supabase }: Params) {
  useEffect(() => {
    if (accountEmail) void refreshOwnFriendCode({ supabase, setMyFriendCode, setFriendSetupUnavailable, setMessage, setupMessage });
    if (accountEmail) void refreshFriends().then((error) => {
      if (error === setupMessage) setFriendSetupUnavailable(true);
      if (error) setMessage(error);
    });
  }, [accountEmail, supabase]);
}
