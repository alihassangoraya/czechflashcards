import React from "react";
import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing } from "../../../theme/design";
import { DailyGoalChart } from "./DailyGoalChart";
import { MasteryChart } from "./MasteryChart";
import { ProgressMetricCard } from "./ProgressMetricCard";
import { WeeklyStudyChart } from "./WeeklyStudyChart";
import type { ProgressDashboardModel } from "../types/progressTypes";

type Props = { model: ProgressDashboardModel };

export function ProgressDashboardContent({ model }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.content}>
      <View style={styles.metrics}>
        <ProgressMetricCard icon="local-fire-department" label={t("progress.studyStreak")} value={String(model.currentStreak)} detail={t("progress.goalStreak", { count: model.goalStreak })} tone={colors.goldSoft} />
        <ProgressMetricCard icon="emoji-events" label={t("progress.masteredVocab")} value={String(model.masteredCount)} detail={t("progress.wordsMastered")} tone={colors.mintSoft} />
        <ProgressMetricCard icon="flag" label={t("progress.weeklyReviews")} value={String(model.weeklyTotal)} detail={t("progress.cardsThisWeek")} tone={colors.actionSoft} />
      </View>
      <DailyGoalChart reviewed={model.reviewedToday} goal={model.dailyGoal} ratio={model.goalRatio} />
      <WeeklyStudyChart points={model.dailyPoints} title={t("progress.sevenDayActivity")} />
      <MasteryChart mastered={model.masteredCount} learning={model.learningCount} unseen={model.unseenCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom, gap: spacing.lg, backgroundColor: colors.background },
  metrics: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lg }
});
