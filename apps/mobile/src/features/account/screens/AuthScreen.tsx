import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { type AuthMode, isValidEmail } from "../accountAuth";
import { AccountAuthForm } from "../components/AccountAuthForm";
import { useAccountCredentials } from "../useAccountCredentials";

type Props = {
  configured: boolean;
  initialMode: AuthMode;
  busy: boolean;
  onBack: () => void;
  onSwitchMode: (mode: AuthMode) => void;
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
};

export function AuthScreen({ configured, initialMode, busy, onBack, onSwitchMode, onAuthenticate }: Props) {
  const { t } = useI18n();
  const credentials = useAccountCredentials();
  const isRegister = initialMode === "sign-up";

  async function submit(mode: AuthMode) {
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
  }

  return (
    <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack} accessibilityRole="button" accessibilityLabel={t("common.backHome")}>
          <MaterialIcons name="arrow-back" size={size.iconLarge} color={colors.textStrong} />
        </Pressable>
        <Text style={styles.title}>{isRegister ? t("account.create") : t("account.signIn")}</Text>
      </View>

      <View style={styles.panel}>
        <View style={styles.iconWrap}>
          <MaterialIcons name={isRegister ? "person" : "login"} size={size.iconLarge} color={colors.primaryDeep} />
        </View>
        <Text style={styles.heading}>{isRegister ? t("account.backupHeading") : t("account.welcomeHeading")}</Text>
        <Text style={styles.copy}>
          {isRegister ? t("account.backupCopy") : t("account.restoreCopy")}
        </Text>
        {!configured && <Text style={styles.warning}>{t("account.supabaseMissing")}</Text>}

        <AccountAuthForm
          busy={busy}
          displayName={credentials.displayName}
          email={credentials.email}
          mode={initialMode}
          password={credentials.password}
          message={credentials.message}
          onChangeDisplayName={credentials.setDisplayName}
          onChangeEmail={credentials.setEmail}
          onChangePassword={credentials.setPassword}
          onSwitchMode={onSwitchMode}
          onSubmit={(mode) => void submit(mode)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingTop: typography.bodyLarge, paddingBottom: spacing.screenBottom },
  header: { minHeight: size.headerAction, flexDirection: "row", alignItems: "center", gap: spacing.lg },
  backButton: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center" },
  title: { color: colors.textStrong, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold },
  panel: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.panel },
  iconWrap: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primarySoft },
  heading: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightSemibold },
  copy: { color: colors.textMuted, fontSize: typography.body, lineHeight: typography.screenTitle },
  warning: { color: colors.dangerStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
