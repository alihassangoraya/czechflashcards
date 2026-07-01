import type { AppSupabaseClient, AuthProvider } from "../../../sync";
import { useI18n } from "../../../i18n/I18nProvider";
import { type AuthMode } from "../models/accountAuth";
import { useAccountCredentials } from "./useAccountCredentials";
import { useAccountLifecycle } from "./useAccountLifecycle";
import { useFriendActivity } from "./useFriendActivity";

type Params = { accountEmail: string | null; supabase: AppSupabaseClient; showToast: (message: string) => void; onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>; onAuthenticateProvider: (provider: AuthProvider) => Promise<string | null>; onSignOut: () => Promise<string | null> };

export function useAccountPanel({ accountEmail, supabase, showToast, onAuthenticate, onAuthenticateProvider, onSignOut }: Params) {
  const { t } = useI18n();
  const credentials = useAccountCredentials();
  const setFeedback = (message: string) => { credentials.setMessage(message); showToast(message); };
  const friends = useFriendActivity({ accountEmail, supabase, setMessage: setFeedback });
  const lifecycle = useAccountLifecycle({ accountEmail, supabase, setMessage: setFeedback, onSignOut });

  async function submit(mode: AuthMode) {
    if (!credentials.email.trim() || !credentials.password) {
      setFeedback(t("account.enterCredentials"));
      return;
    }
    if (mode === "sign-up" && !credentials.displayName.trim()) {
      setFeedback(t("account.nameRequired"));
      return;
    }
    const error = await onAuthenticate(mode, credentials.email, credentials.password, credentials.displayName);
    setFeedback(error || (mode === "sign-up" ? t("account.created") : t("account.signedIn")));
  }

  async function signOut() {
    setFeedback((await onSignOut()) || t("account.signedOut"));
  }

  async function signInWithProvider(provider: AuthProvider) {
    setFeedback((await onAuthenticateProvider(provider)) || t("account.providerStarted"));
  }

  return { ...credentials, ...friends, ...lifecycle, signInWithProvider, submit, signOut };
}
