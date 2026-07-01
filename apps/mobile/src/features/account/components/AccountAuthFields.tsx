import React from "react";
import type { AuthMode } from "../../../sync";
import { useI18n } from "../../../i18n/I18nProvider";
import { AccountAuthInput } from "./AccountAuthInput";

type Props = {
  activeMode: AuthMode;
  displayName: string;
  email: string;
  password: string;
  onChangeDisplayName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
};

export function AccountAuthFields({ activeMode, displayName, email, password, onChangeDisplayName, onChangeEmail, onChangePassword }: Props) {
  const { t } = useI18n();
  const showDisplayName = activeMode === "sign-up";

  return (
    <>
      {showDisplayName && <AccountAuthInput value={displayName} onChangeText={onChangeDisplayName} placeholder={t("account.displayName")} />}
      <AccountAuthInput value={email} onChangeText={onChangeEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder={t("account.email")} />
      <AccountAuthInput value={password} onChangeText={onChangePassword} secureTextEntry placeholder={t("account.password")} />
    </>
  );
}
