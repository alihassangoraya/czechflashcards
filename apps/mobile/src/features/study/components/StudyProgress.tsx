import React from "react";
import { ScreenProgress } from "../../../components/ScreenProgress";
import { useI18n } from "../../../i18n/I18nProvider";

export type StudyProgressProps = {
  sessionReviews: number;
  sessionTarget: number;
  reviewedToday: number;
  dailyGoal: number;
  sessionProgress: number;
};

export function StudyProgress({ sessionReviews, sessionTarget, reviewedToday, dailyGoal, sessionProgress }: StudyProgressProps) {
  const { t } = useI18n();

  return (
    <ScreenProgress
      centered
      title={t("study.sessionProgress", { current: sessionReviews + 1, total: sessionTarget, reviewedToday, dailyGoal })}
      progress={sessionProgress}
    />
  );
}
