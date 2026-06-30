import React from "react";
import { ScreenProgress } from "../../../components/ScreenProgress";
import { useI18n } from "../../../i18n/I18nProvider";

type Props = {
  current: number;
  total: number;
  accuracy: number;
};

export function QuizProgress({ current, total, accuracy }: Props) {
  const { t } = useI18n();

  return (
    <ScreenProgress
      title={t("quiz.questionProgress", { current, total })}
      meta={t("quiz.accurate", { accuracy })}
      progress={current / total}
    />
  );
}
