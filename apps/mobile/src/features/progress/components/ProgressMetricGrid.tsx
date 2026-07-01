import React from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing } from "../../../theme/design";
import { ProgressMetricCard } from "./ProgressMetricCard";
import type { ProgressDashboardModel } from "../types/progressTypes";

type Props = { model: ProgressDashboardModel };

export function ProgressMetricGrid({ model }: Props) {
  const { t } = useI18n();
  return (
    <View style={styles.metrics}>
      <ProgressMetricCard icon="local-fire-department" label={t("progress.studyStreak")} value={String(model.currentStreak)} detail={t("progress.goalStreak", { count: model.goalStreak })} tone={colors.goldSoft} />
      <ProgressMetricCard icon="emoji-events" label={t("progress.masteredVocab")} value={String(model.masteredCount)} detail={t("progress.wordsMastered")} tone={colors.mintSoft} />
      <ProgressMetricCard icon="flag" label={t("progress.weeklyReviews")} value={String(model.weeklyTotal)} detail={t("progress.cardsThisWeek")} tone={colors.actionSoft} />
      <ProgressMetricCard icon="auto-stories" label={t("progress.studiedCards")} value={String(model.studiedCount)} detail={t("progress.cardsTouched")} tone={colors.dangerSoft} />
    </View>
  );
}

const styles = StyleSheet.create({
  metrics: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lg }
});
