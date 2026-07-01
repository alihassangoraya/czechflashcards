import { useCallback } from "react";
import type { AuthProvider } from "../../../sync";
import { useI18n } from "../../../i18n/I18nProvider";
import type { AccountCredentials } from "./useAccountCredentials";

type Params = {
  configured: boolean;
  credentials: AccountCredentials;
  showToast: (message: string) => void;
  onAuthenticateProvider: (provider: AuthProvider) => Promise<string | null>;
};

export function useAuthProviderSubmit({ configured, credentials, showToast, onAuthenticateProvider }: Params) {
  const { t } = useI18n();
  const setFeedback = (message: string) => { credentials.setMessage(message); showToast(message); };

  return useCallback(async (provider: AuthProvider) => {
    if (!configured) {
      setFeedback(t("account.syncNotConfigured"));
      return;
    }
    setFeedback((await onAuthenticateProvider(provider)) || t("account.providerStarted"));
  }, [configured, onAuthenticateProvider, setFeedback, t]);
}
