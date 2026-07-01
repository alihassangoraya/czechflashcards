import { useCallback } from "react";
import type { AuthProvider } from "../../../sync";
import { useI18n } from "../../../i18n/I18nProvider";
import type { AccountCredentials } from "./useAccountCredentials";

type Params = {
  configured: boolean;
  credentials: AccountCredentials;
  onAuthenticateProvider: (provider: AuthProvider) => Promise<string | null>;
};

export function useAuthProviderSubmit({ configured, credentials, onAuthenticateProvider }: Params) {
  const { t } = useI18n();

  return useCallback(async (provider: AuthProvider) => {
    if (!configured) {
      credentials.setMessage(t("account.syncNotConfigured"));
      return;
    }
    credentials.setMessage((await onAuthenticateProvider(provider)) || t("account.providerStarted"));
  }, [configured, credentials, onAuthenticateProvider, t]);
}
