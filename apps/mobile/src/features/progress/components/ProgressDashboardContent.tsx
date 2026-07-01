import { StyleSheet, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { spacing } from "../../../theme/design";
import { MasteryChart } from "./MasteryChart";
import { ProgressActivityList } from "./ProgressActivityList";
import { ProgressActionPanel } from "./ProgressActionPanel";
import { ProgressFocusAreas } from "./ProgressFocusAreas";
import { ProgressHeroSummary } from "./ProgressHeroSummary";
import { ProgressInsightStrip } from "./ProgressInsightStrip";
import { ProgressMetricGrid } from "./ProgressMetricGrid";
import { ProgressQueuePanel } from "./ProgressQueuePanel";
import { ProgressStudyPlanSummary } from "./ProgressStudyPlanSummary";
import { WeeklyStudyChart } from "./WeeklyStudyChart";
import { progressDeckLabel } from "./progressDeckLabel";
import type { ProgressDashboardModel } from "../types/progressTypes";
type Props = { model: ProgressDashboardModel; onStartStudy: () => void; onOpenSettings: () => void; onShuffleDue: () => void; onReviewAllNow: () => void };
export function ProgressDashboardContent({ model, onStartStudy, onOpenSettings, onShuffleDue, onReviewAllNow }: Props) {
  const { t } = useI18n();
  const deckLabel = progressDeckLabel(model.activeDeckLabel, t);
  const nextAction = model.remainingToday ? t("progress.nextReview", { count: model.remainingToday }) : t("progress.nextRefresh");
  const status = model.remainingToday ? t("progress.leftToday", { count: model.remainingToday }) : t("progress.complete");
  return (
    <View style={styles.content}>
      <ProgressStudyPlanSummary examLevel={model.examLevel} activeDeckLabel={deckLabel} dailyGoal={model.dailyGoal} />
      <ProgressHeroSummary title={t("progress.today")} reviewed={model.reviewedToday} goal={model.dailyGoal} status={status} nextAction={nextAction} streakText={t("progress.studyStreakDays", { count: model.currentStreak })} />
      <ProgressActionPanel onStartStudy={onStartStudy} onOpenSettings={onOpenSettings} onShuffleDue={onShuffleDue} onReviewAllNow={onReviewAllNow} />
      <ProgressInsightStrip insights={model.insights.map((item) => item.labelKey === "progress.activeDeck" ? { ...item, value: deckLabel } : item)} />
      <ProgressQueuePanel queue={model.queueHealth} />
      <ProgressMetricGrid model={model} />
      <WeeklyStudyChart points={model.dailyPoints} title={t("progress.sevenDayActivity")} />
      <MasteryChart mastered={model.masteredCount} learning={model.learningCount} unseen={model.unseenCount} />
      <ProgressFocusAreas title={t("progress.focusAreas")} detail={t("progress.lowestMastery")} areas={model.focusAreas} areaDetail={(area) => t("progress.focusAreaDetail", { mastered: area.mastered, total: area.total, learning: area.learning })} />
      <ProgressActivityList title={t("progress.recentActivity")} detail={t("progress.lastSevenDays")} points={model.dailyPoints} doneLabel={t("progress.done")} openLabel={t("progress.open")} />
    </View>
  );
}
const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom, gap: spacing.xl }
});
