import { useCallback } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import { isValidEmail, type AuthMode } from "./accountAuth";
import type { useAccountCredentials } from "./useAccountCredentials";

type Credentials = ReturnType<typeof useAccountCredentials>;

type Params = {
  configured: boolean;
  credentials: Credentials;
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
};

export function useAuthSubmit({ configured, credentials, onAuthenticate }: Params) {
  const { t } = useI18n();

  return useCallback(async (mode: AuthMode) => {
    if (!configured) {
      credentials.setMessage(t("account.syncNotConfigured"));
      return;
    }
    if (!isValidEmail(credentials.email)) {
      credentials.setMessage(t("account.invalidEmail"));
      return;
    }
    if (credentials.password.length < 6) {
      credentials.setMessage(t("account.shortPassword"));
      return;
    }

    const error = await onAuthenticate(mode, credentials.email, credentials.password, credentials.displayName);
    credentials.setMessage(error || (mode === "sign-up" ? t("account.created") : t("account.signedIn")));
  }, [configured, credentials, onAuthenticate, t]);
}
