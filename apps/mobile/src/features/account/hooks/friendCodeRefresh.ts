import { getFriendCode, type AppSupabaseClient } from "../../../sync";

type Params = {
  supabase: AppSupabaseClient;
  setupMessage: string;
  setMessage: (message: string) => void;
  setMyFriendCode: (code: string | null) => void;
  setFriendSetupUnavailable: (value: boolean) => void;
};

export async function refreshOwnFriendCode({ supabase, setupMessage, setMessage, setMyFriendCode, setFriendSetupUnavailable }: Params) {
  try {
    setMyFriendCode(await getFriendCode(supabase));
    setFriendSetupUnavailable(false);
  } catch {
    setMyFriendCode(null);
    setFriendSetupUnavailable(true);
    setMessage(setupMessage);
  }
}
