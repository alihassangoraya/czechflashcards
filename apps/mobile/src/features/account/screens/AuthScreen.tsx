import React, { useState } from "react";
import { ScrollView } from "react-native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { useI18n } from "../../../i18n/I18nProvider";
import { AuthPanel } from "../components/AuthPanel";
import { PasswordResetRequestPanel } from "../components/PasswordResetRequestPanel";
import type { AuthScreenProps } from "../types/authScreenTypes";
import { useAccountCredentials } from "../hooks/useAccountCredentials";
import { useAuthProviderSubmit } from "../hooks/useAuthProviderSubmit";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import { authScreenStyles as styles } from "./authScreenStyles";

export function AuthScreen({ configured, initialMode, busy, supabase, showToast, onBack, onSwitchMode, onAuthenticate, onAuthenticateProvider }: AuthScreenProps) {
  const { t } = useI18n();
  const [forgotPassword, setForgotPassword] = useState(false);
  const credentials = useAccountCredentials();
  const isRegister = initialMode === "sign-up";
  const submit = useAuthSubmit({ configured, credentials, showToast, onAuthenticate });
  const submitProvider = useAuthProviderSubmit({ configured, credentials, showToast, onAuthenticateProvider });

  return (
    <>
      <ScreenHeader title={isRegister ? t("account.create") : t("account.signIn")} backLabel={t("common.backHome")} onBack={onBack} />
      <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
        {forgotPassword ? <PasswordResetRequestPanel initialEmail={credentials.email} supabase={supabase} styles={styles} showToast={showToast} onBackToSignIn={() => setForgotPassword(false)} /> : <AuthPanel
          busy={busy} configured={configured} displayName={credentials.displayName} email={credentials.email}
          isRegister={isRegister}
          message={credentials.message} mode={initialMode} password={credentials.password}
          onChangeDisplayName={credentials.setDisplayName} onChangeEmail={credentials.setEmail} onChangePassword={credentials.setPassword} onForgotPassword={() => setForgotPassword(true)} onSwitchMode={onSwitchMode}
          onProviderSubmit={(provider) => void submitProvider(provider)}
          onSubmit={(mode) => void submit(mode)}
        />}
      </ScrollView>
    </>
  );
}
