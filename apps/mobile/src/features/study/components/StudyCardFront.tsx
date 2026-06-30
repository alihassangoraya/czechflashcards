import React from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, spacing, typography } from "../../../theme/design";
import { CardUndoButton } from "./CardUndoButton";
import { PronunciationPill } from "./PronunciationPill";
import { StudySwipeActions } from "./StudySwipeActions";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type SwipeDirection = "again" | "known";

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
    <AnimatedPressable
      onPress={onFlipCard}
      accessibilityRole="button"
      accessibilityLabel={t("study.revealMeaning")}
      style={[
        styles.cardFace,
        {
          transform: [
            { perspective: 1200 },
            { rotateY: flipProgress.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] }) }
          ]
        }
      ]}
    >
      <Text style={styles.word}>{current.cz}</Text>
      <PronunciationPill card={current} />
      <StudySwipeActions grading={grading} onCompleteSwipe={onCompleteSwipe} />
      <Text style={[styles.hint, { textAlign }]}>{t("study.tapReveal")}</Text>
      {lastReviewCard && <CardUndoButton grading={grading} lastReviewCard={lastReviewCard} onUndoLastReview={onUndoLastReview} />}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  cardFace: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.card,
    borderWidth: spacing.hairline,
    borderColor: colors.borderSoft,
    backfaceVisibility: "hidden"
  },
  word: {
    fontSize: typography.word,
    lineHeight: 56,
    color: colors.textStrong,
    fontWeight: typography.weightBold,
    textAlign: "center"
  },
  hint: {
    color: colors.textMuted,
    marginTop: typography.bodyLarge,
    textAlign: "center",
    fontWeight: typography.weightRegular
  }
});
