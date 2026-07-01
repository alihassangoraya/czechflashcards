import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";
import { AccountSyncButton } from "./AccountSyncButton";
import type { SignedInAccountContentProps } from "./signedInAccountTypes";

export function AccountOverviewCard({ accountEmail, syncStatus, onSyncNow }: Omit<SignedInAccountContentProps, "busy">) {
  const { t, textAlign } = useI18n();
  return (
    <View style={styles.card}>
      <Text style={[styles.label, { textAlign }]}>{t("account.signedInAs")}</Text>
      <Text style={[styles.email, { textAlign }]} numberOfLines={2}>{accountEmail}</Text>
      <Text style={[styles.meta, { textAlign }]}>{t("account.syncStatusValue", { status: t(`account.sync.${syncStatus}`) })}</Text>
      <Text style={[styles.meta, { textAlign }]}>{t("account.queueCopy")}</Text>
      <AccountSyncButton onSyncNow={onSyncNow} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xlPlus },
  label: { color: colors.textMuted, fontSize: typography.label, fontWeight: typography.weightMedium, textTransform: "uppercase" },
  email: { color: colors.textStrong, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold },
  meta: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
