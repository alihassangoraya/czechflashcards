import { useCallback } from "react";
import { useI18n } from "../../../i18n/I18nProvider";
import { isValidEmail, type AuthMode } from "../models/accountAuth";
import type { AccountCredentials } from "./useAccountCredentials";

type Params = {
  configured: boolean;
  credentials: AccountCredentials;
  showToast: (message: string) => void;
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
};

export function useAuthSubmit({ configured, credentials, showToast, onAuthenticate }: Params) {
  const { t } = useI18n();
  const setFeedback = (message: string) => { credentials.setMessage(message); showToast(message); };

  return useCallback(async (mode: AuthMode) => {
    if (!configured) {
      setFeedback(t("account.syncNotConfigured"));
      return;
    }
    if (!isValidEmail(credentials.email)) {
      setFeedback(t("account.invalidEmail"));
      return;
    }
    if (credentials.password.length < 6) {
      setFeedback(t("account.shortPassword"));
      return;
    }
    if (mode === "sign-up" && !credentials.displayName.trim()) {
      setFeedback(t("account.nameRequired"));
      return;
    }

    const error = await onAuthenticate(mode, credentials.email, credentials.password, credentials.displayName);
    setFeedback(error || (mode === "sign-up" ? t("account.created") : t("account.signedIn")));
  }, [configured, credentials, onAuthenticate, setFeedback, t]);
}
