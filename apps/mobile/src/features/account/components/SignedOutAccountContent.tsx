import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";
import { AccountSyncButton } from "./AccountSyncButton";

type Props = {
  onSignInToSync: () => void;
};

export function SignedOutAccountContent({ onSignInToSync }: Props) {
  const { t, textAlign } = useI18n();
  return (
    <View style={styles.card}>
      <Text style={[styles.title, { textAlign }]}>{t("account.syncSignedOutTitle")}</Text>
      <Text style={[styles.copy, { textAlign }]}>{t("account.syncSignedOutCopy")}</Text>
      <AccountSyncButton label={t("account.signInToSync")} onSyncNow={onSignInToSync} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xlPlus },
  title: { color: colors.textStrong, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold },
  copy: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
