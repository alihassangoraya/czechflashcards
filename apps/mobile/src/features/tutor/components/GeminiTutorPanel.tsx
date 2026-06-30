import React from "react";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { useGeminiTutor } from "../useGeminiTutor";
import { GeminiTutorButton } from "./GeminiTutorButton";
import { GeminiTutorResultPanel } from "./GeminiTutorResultPanel";

type Props = {
  card: Card | null;
};

export function GeminiTutorPanel({ card }: Props) {
  const { t } = useI18n();
  const tutor = useGeminiTutor(card);

  if (!card) return null;

  if (!tutor.isOpen) return <GeminiTutorButton label={t("tutor.button")} accessibilityLabel={t("tutor.ask", { word: card.cz })} onPress={tutor.openTutor} />;

  return (
    <GeminiTutorResultPanel
      closeLabel={t("tutor.close")}
      eyebrow={t("tutor.eyebrow")}
      lessonLabel={t("tutor.lesson")}
      loading={tutor.loading}
      loadingLabel={t("tutor.loading")}
      onClose={tutor.closeTutor}
      pronunciationLabel={t("tutor.pronunciation")}
      result={tutor.result}
      title={t("tutor.title", { word: card.cz })}
    />
  );
}
