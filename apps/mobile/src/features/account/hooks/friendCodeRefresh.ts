import { getFriendCode, type AppSupabaseClient } from "../../../sync";

type Params = {
  supabase: AppSupabaseClient;
  setupMessage: string;
  setMessage: (message: string) => void;
  setMyFriendCode: (code: string | null) => void;
};

export async function refreshOwnFriendCode({ supabase, setupMessage, setMessage, setMyFriendCode }: Params) {
  try {
    setMyFriendCode(await getFriendCode(supabase));
  } catch {
    setMessage(setupMessage);
  }
}
