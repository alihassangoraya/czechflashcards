import React from "react";
import { Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors } from "../../../theme/design";
import type { AccountStudySummary } from "../types/accountTypes";
import { accountProgressStyles as styles } from "./accountProgressStyles";
import { AccountStat } from "./AccountStat";

type Props = {
  summary: AccountStudySummary;
};

export function AccountProgressSection({ summary }: Props) {
  const { t } = useI18n();
  const progress = summary.deckTotal ? summary.masteredCount / summary.deckTotal : 0;

  return (
    <>
      <View style={styles.progressHeader}>
        <Text style={styles.sectionTitle}>{t("account.learningProgress")}</Text>
        <Text style={styles.sectionMeta}>{t("account.mastered", { count: summary.masteredCount })}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.max(3, Math.min(100, progress * 100))}%` }]} />
      </View>
      <View style={styles.statsRow}>
        <AccountStat count={summary.deckTotal} label={t("account.total")} color={colors.bohemianBlue} />
        <AccountStat count={summary.masteredCount} label={t("account.masteredLabel")} color={colors.success} />
        <AccountStat count={summary.learningCount} label={t("account.learning")} color={colors.bohemianGold} />
        <AccountStat count={summary.dueCount} label={t("account.due")} color={colors.bohemianRed} />
      </View>
    </>
  );
}
