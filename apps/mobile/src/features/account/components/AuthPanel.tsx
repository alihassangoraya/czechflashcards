import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { AuthMode } from "../accountAuth";
import { AccountAuthForm } from "./AccountAuthForm";

type Props = {
  busy: boolean;
  configured: boolean;
  displayName: string;
  email: string;
  isRegister: boolean;
  message: string;
  mode: AuthMode;
  password: string;
  onChangeDisplayName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSwitchMode: (mode: AuthMode) => void;
  onSubmit: (mode: AuthMode) => void;
};

export function AuthPanel({ busy, configured, displayName, email, isRegister, message, mode, password, onChangeDisplayName, onChangeEmail, onChangePassword, onSwitchMode, onSubmit }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.panel}>
      <View style={styles.iconWrap}>
        <MaterialIcons name={isRegister ? "person" : "login"} size={size.iconLarge} color={colors.primaryDeep} />
      </View>
      <Text style={styles.heading}>{isRegister ? t("account.backupHeading") : t("account.welcomeHeading")}</Text>
      <Text style={styles.copy}>{isRegister ? t("account.backupCopy") : t("account.restoreCopy")}</Text>
      {!configured && <Text style={styles.warning}>{t("account.supabaseMissing")}</Text>}
      <AccountAuthForm
        busy={busy}
        displayName={displayName}
        email={email}
        mode={mode}
        password={password}
        message={message}
        onChangeDisplayName={onChangeDisplayName}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onSwitchMode={onSwitchMode}
        onSubmit={onSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.panel },
  iconWrap: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primarySoft },
  heading: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightSemibold },
  copy: { color: colors.textMuted, fontSize: typography.body, lineHeight: typography.screenTitle },
  warning: { color: colors.dangerStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
