import React from "react";
import { Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { AccountAuthButton } from "./AccountAuthButton";
import { AccountAuthInput } from "./AccountAuthInput";
import { AccountAuthMessage } from "./AccountAuthMessage";
import type { ResetPasswordFormProps } from "./resetPasswordFormTypes";

export function ResetPasswordForm({ busy, confirmPassword, message, password, onChangeConfirmPassword, onChangePassword, onSubmit, styles }: ResetPasswordFormProps) {
  const { t } = useI18n();
  return (
    <View style={styles.formPanel}>
      <Text style={styles.heading}>{t("account.resetHeading")}</Text>
      <Text style={styles.copy}>{t("account.resetCopy")}</Text>
      <AccountAuthInput value={password} onChangeText={onChangePassword} secureTextEntry placeholder={t("account.newPassword")} />
      <AccountAuthInput value={confirmPassword} onChangeText={onChangeConfirmPassword} secureTextEntry placeholder={t("account.confirmPassword")} />
      <AccountAuthMessage message={message} />
      <AccountAuthButton busy={busy} label={t("account.updatePassword")} variant="primary" onPress={onSubmit} />
    </View>
  );
}
