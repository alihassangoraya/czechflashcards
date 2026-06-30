import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
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
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const isRegister = initialMode === "sign-up";

  async function submit(mode: AuthMode) {
    if (!configured) {
      setMessage("Account sync is not configured for this build yet.");
      return;
    }
    if (!isValidEmail(email)) {
      setMessage("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters.");
      return;
    }

    const error = await onAuthenticate(mode, email, password, displayName);
    setMessage(error || (mode === "sign-up" ? "Account created. Check your email if confirmation is enabled." : "Signed in and syncing this device."));
  }

  return (
    <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={onBack} accessibilityRole="button" accessibilityLabel="Back home">
          <MaterialIcons name="arrow-back" size={size.iconLarge} color={colors.textStrong} />
        </Pressable>
        <Text style={styles.title}>{isRegister ? "Create account" : "Sign in"}</Text>
      </View>

      <View style={styles.panel}>
        <View style={styles.iconWrap}>
          <MaterialIcons name={isRegister ? "person" : "login"} size={size.iconLarge} color={colors.primaryDeep} />
        </View>
        <Text style={styles.heading}>{isRegister ? "Back up your Czech decks" : "Welcome back"}</Text>
        <Text style={styles.copy}>
          {isRegister ? "Save your progress, custom decks, imported words, and starred cards across devices." : "Sign in to restore your progress, custom decks, and imported words."}
        </Text>
        {!configured && <Text style={styles.warning}>Supabase URL and anonymous key are missing in this build.</Text>}

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
