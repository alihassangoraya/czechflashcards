import type { AppSupabaseClient, AuthProvider } from "../../../sync";
import { useI18n } from "../../../i18n/I18nProvider";
import { type AuthMode } from "../models/accountAuth";
import { useAccountCredentials } from "./useAccountCredentials";
import { useFriendActivity } from "./useFriendActivity";

type Params = { accountEmail: string | null; supabase: AppSupabaseClient; onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>; onAuthenticateProvider: (provider: AuthProvider) => Promise<string | null>; onSignOut: () => Promise<string | null> };

export function useAccountPanel({ accountEmail, supabase, onAuthenticate, onAuthenticateProvider, onSignOut }: Params) {
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

  async function signInWithProvider(provider: AuthProvider) {
    credentials.setMessage((await onAuthenticateProvider(provider)) || t("account.providerStarted"));
  }

  return { ...credentials, ...friends, signInWithProvider, submit, signOut };
}
