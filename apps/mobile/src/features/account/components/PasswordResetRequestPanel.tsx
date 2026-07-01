import React, { useState } from "react";
import { Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { sendPasswordReset, type AppSupabaseClient } from "../../../sync";
import { AccountAuthButton } from "./AccountAuthButton";
import { AccountAuthInput } from "./AccountAuthInput";
import { AccountAuthMessage } from "./AccountAuthMessage";
import type { AuthScreenStyles } from "./passwordResetRequestTypes";

type Props = { initialEmail: string; supabase: AppSupabaseClient; styles: AuthScreenStyles; showToast: (message: string) => void; onBackToSignIn: () => void };

export function PasswordResetRequestPanel({ initialEmail, supabase, styles, showToast, onBackToSignIn }: Props) {
  const { t } = useI18n();
  const [email, setEmail] = useState(initialEmail), [busy, setBusy] = useState(false), [message, setMessage] = useState("");
  async function submit() {
    setBusy(true);
    const feedback = (await sendPasswordReset(supabase, email)) || t("account.resetEmailSent");
    setMessage(feedback);
    showToast(feedback);
    setBusy(false);
  }
  return (
    <View style={styles.formPanel}>
      <Text style={styles.heading}>{t("account.resetEmailHeading")}</Text>
      <Text style={styles.copy}>{t("account.resetEmailCopy")}</Text>
      <AccountAuthInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder={t("account.email")} />
      <AccountAuthMessage message={message} />
      <AccountAuthButton busy={busy} label={t("account.sendResetLink")} variant="primary" onPress={() => void submit()} />
      <AccountAuthButton busy={busy} label={t("account.backToSignIn")} variant="secondary" onPress={onBackToSignIn} />
    </View>
  );
}
