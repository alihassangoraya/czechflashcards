import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";
import type { AccountStudySummary } from "../types/accountTypes";
import { AccountBadges } from "./AccountBadges";
import { AccountProfileRow } from "./AccountProfileRow";
import { AccountProgressSection } from "./AccountProgressSection";

export function AccountStudyPanel({ summary, accountEmail }: { summary: AccountStudySummary; accountEmail: string | null }) {
  const { t } = useI18n();

  return (
    <View style={styles.panel}>
      <AccountProfileRow accountEmail={accountEmail} summary={summary} />
      <AccountProgressSection summary={summary} />
      <AccountBadges summary={summary} />
      {!accountEmail && <Text style={styles.muted}>{t("account.localProgress", { status: summary.syncStatus })}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm }
});
