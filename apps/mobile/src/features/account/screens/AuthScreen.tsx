import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { AccountAuthForm } from "../components/AccountAuthForm";

type AuthMode = "sign-in" | "sign-up";

type Props = {
  configured: boolean;
  initialMode: AuthMode;
  busy: boolean;
  onBack: () => void;
  onSwitchMode: (mode: AuthMode) => void;
  onAuthenticate: (mode: AuthMode, email: string, password: string, displayName: string) => Promise<string | null>;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function AuthScreen({ configured, initialMode, busy, onBack, onSwitchMode, onAuthenticate }: Props) {
  const { t } = useI18n();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const isRegister = initialMode === "sign-up";

  async function submit(mode: AuthMode) {
    if (!configured) {
      setMessage(t("account.syncNotConfigured"));
      return;
    }
    if (!isValidEmail(email)) {
      setMessage(t("account.invalidEmail"));
      return;
    }
    if (password.length < 6) {
      setMessage(t("account.shortPassword"));
      return;
    }

    const error = await onAuthenticate(mode, email, password, displayName);
    setMessage(error || (mode === "sign-up" ? t("account.created") : t("account.signedIn")));
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
          displayName={displayName}
          email={email}
          mode={initialMode}
          password={password}
          message={message}
          onChangeDisplayName={setDisplayName}
          onChangeEmail={setEmail}
          onChangePassword={setPassword}
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
