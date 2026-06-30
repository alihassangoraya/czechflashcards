import React from "react";
import type { AuthMode } from "../../../sync";
import { useI18n } from "../../../i18n/I18nProvider";
import { AccountAuthButton } from "./AccountAuthButton";

type Props = {
  activeMode: AuthMode;
  busy: boolean;
  fixedMode: boolean;
  onSwitchMode?: (mode: AuthMode) => void;
  onSubmit: (mode: AuthMode) => void;
};

export function AccountAuthActions({ activeMode, busy, fixedMode, onSwitchMode, onSubmit }: Props) {
  const { t } = useI18n();
  const isRegister = activeMode === "sign-up";

  if (!fixedMode) {
    return (
      <>
        <AccountAuthButton busy={busy} variant="primary" label={t("account.signIn")} onPress={() => onSubmit("sign-in")} />
        <AccountAuthButton busy={busy} variant="secondary" label={t("account.create")} onPress={() => onSubmit("sign-up")} />
      </>
    );
  }

  return (
    <>
      <AccountAuthButton busy={busy} variant="primary" label={isRegister ? t("account.create") : t("account.signIn")} onPress={() => onSubmit(activeMode)} />
      <AccountAuthButton busy={busy} variant="secondary" label={isRegister ? t("account.haveAccount") : t("account.newAccount")} onPress={() => onSwitchMode?.(isRegister ? "sign-in" : "sign-up")} />
    </>
  );
}
