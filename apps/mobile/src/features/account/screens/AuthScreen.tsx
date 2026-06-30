import React from "react";
import { ScrollView } from "react-native";
import { ScreenHeader } from "../../../components/ScreenHeader";
import { useI18n } from "../../../i18n/I18nProvider";
import { AuthPanel } from "../components/AuthPanel";
import type { AuthScreenProps } from "../authScreenTypes";
import { useAccountCredentials } from "../hooks/useAccountCredentials";
import { useAuthSubmit } from "../hooks/useAuthSubmit";
import { authScreenStyles as styles } from "./authScreenStyles";

export function AuthScreen({ configured, initialMode, busy, onBack, onSwitchMode, onAuthenticate }: AuthScreenProps) {
  const { t } = useI18n();
  const credentials = useAccountCredentials();
  const isRegister = initialMode === "sign-up";
  const submit = useAuthSubmit({ configured, credentials, onAuthenticate });

  return (
    <>
      <ScreenHeader title={isRegister ? t("account.create") : t("account.signIn")} backLabel={t("common.backHome")} onBack={onBack} />
      <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
        <AuthPanel
          busy={busy}
          configured={configured}
          displayName={credentials.displayName}
          email={credentials.email}
          isRegister={isRegister}
          message={credentials.message}
          mode={initialMode}
          password={credentials.password}
          onChangeDisplayName={credentials.setDisplayName}
          onChangeEmail={credentials.setEmail}
          onChangePassword={credentials.setPassword}
          onSwitchMode={onSwitchMode}
          onSubmit={(mode) => void submit(mode)}
        />
      </ScrollView>
    </>
  );
}
