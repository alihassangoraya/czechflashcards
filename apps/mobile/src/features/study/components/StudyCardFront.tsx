import React from "react";
import { StyleSheet, Text } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, typography } from "../../../theme/design";
import { CardUndoButton } from "./CardUndoButton";
import { CardFrontFaceContainer } from "./CardFaceContainer";
import { PronunciationPill } from "./PronunciationPill";
import type { StudyCardFrontProps } from "./studyCardFrontTypes";
import { StudyCardHint } from "./StudyCardHint";
import { StudySwipeActions } from "./StudySwipeActions";

export function StudyCardFront({ current, flipProgress, grading, lastReviewCard, onFlipCard, onCompleteSwipe, onUndoLastReview }: StudyCardFrontProps) {
  const { t } = useI18n();

  return (
    <CardFrontFaceContainer flipProgress={flipProgress} onPress={onFlipCard}>
      <Text style={styles.word}>{current.cz}</Text>
      <PronunciationPill card={current} />
      <StudySwipeActions grading={grading} onCompleteSwipe={onCompleteSwipe} />
      <StudyCardHint>{t("study.tapReveal")}</StudyCardHint>
      {lastReviewCard && <CardUndoButton grading={grading} lastReviewCard={lastReviewCard} onUndoLastReview={onUndoLastReview} />}
    </CardFrontFaceContainer>
  );
}

const styles = StyleSheet.create({
  word: {
    fontSize: typography.word,
    lineHeight: typography.wordLine,
    color: colors.textStrong,
    fontWeight: typography.weightBold,
    textAlign: "center"
  }
});
