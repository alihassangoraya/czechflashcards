import type { createSupabaseClient } from "../../../sync";
import { useI18n } from "../../../i18n/I18nProvider";
import { type AuthMode } from "../accountAuth";
import { useAccountCredentials } from "./useAccountCredentials";
import { useFriendActivity } from "./useFriendActivity";

type Params = {
  accountEmail: string | null;
  supabase: ReturnType<typeof createSupabaseClient>;
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
  onSignOut: () => Promise<string | null>;
};

export function useAccountPanel({ accountEmail, supabase, onAuthenticate, onSignOut }: Params) {
  const { t } = useI18n();
  const credentials = useAccountCredentials();
  const friends = useFriendActivity({ accountEmail, supabase, setMessage: credentials.setMessage });

  async function submit(mode: AuthMode) {
    if (!credentials.email.trim() || !credentials.password) {
      credentials.setMessage(t("account.enterCredentials"));
      return;
    }
    const error = await onAuthenticate(mode, credentials.email, credentials.password, credentials.displayName);
    credentials.setMessage(error || (mode === "sign-up" ? t("account.created") : t("account.signedIn")));
  }

  async function signOut() {
    credentials.setMessage((await onSignOut()) || t("account.signedOut"));
  }

  return {
    ...credentials,
    ...friends,
    submit,
    signOut
  };
}
