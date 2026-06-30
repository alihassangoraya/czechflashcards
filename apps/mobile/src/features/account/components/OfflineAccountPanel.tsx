import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";
import type { AccountStudySummary } from "../accountTypes";
import { AccountStudyPanel } from "./AccountStudyPanel";

type Props = {
  accountEmail: string | null;
  studySummary: AccountStudySummary;
};

export function OfflineAccountPanel({ accountEmail, studySummary }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.form}>
      <AccountStudyPanel summary={studySummary} accountEmail={accountEmail} />
      <Text style={styles.muted}>{t("account.offlineAvailable")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.xlPlus },
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm }
});
