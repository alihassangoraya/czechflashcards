import React from "react";
import { Animated, StyleSheet, Text } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, typography } from "../../../theme/design";
import type { SwipeDirection } from "../animations/animationTypes";
import { CardUndoButton } from "./CardUndoButton";
import { CardFrontFaceContainer } from "./CardFaceContainer";
import { PronunciationPill } from "./PronunciationPill";
import { StudyCardHint } from "./StudyCardHint";
import { StudySwipeActions } from "./StudySwipeActions";

type Props = {
  current: Card;
  flipProgress: Animated.Value;
  grading: boolean;
  lastReviewCard: Card | null;
  onFlipCard: () => void;
  onCompleteSwipe: (direction: SwipeDirection) => void;
  onUndoLastReview: () => void;
};

export function StudyCardFront({ current, flipProgress, grading, lastReviewCard, onFlipCard, onCompleteSwipe, onUndoLastReview }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <CardFrontFaceContainer flipProgress={flipProgress} onPress={onFlipCard}>
      <Text style={styles.word}>{current.cz}</Text>
      <PronunciationPill card={current} />
      <StudySwipeActions grading={grading} onCompleteSwipe={onCompleteSwipe} />
      <StudyCardHint textAlign={textAlign}>{t("study.tapReveal")}</StudyCardHint>
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
