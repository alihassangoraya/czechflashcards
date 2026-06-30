import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { spacing } from "../../../theme/design";
import { StudyCard } from "./StudyCard";
import { StudyRevealedContent } from "./StudyRevealedContent";
import { displaySelectedMeaning } from "../studyMeaning";
import type { StudyScreenProps } from "../studyScreenTypes";

type Props = Omit<StudyScreenProps, "dailyGoal" | "onBack" | "onGrade" | "onOpenGrammar" | "reviewedToday" | "sessionProgress" | "sessionReviews" | "sessionTarget"> & Pick<StudyScreenProps, "onGrade">;

export function StudyContent({
  current,
  settings,
  savedCardIds,
  revealed,
  flipping,
  grading,
  swipeDirection,
  lastReviewCard,
  dragX,
  flipProgress,
  cardRotation,
  panHandlers,
  reviewInterval,
  onFlipCard,
  onToggleSaved,
  onManageDecks,
  onEditCard,
  onCompleteSwipe,
  onUndoLastReview,
  onGrade
}: Props) {
  const currentSecondaryMeaning = current ? displaySelectedMeaning(current, settings.meaningLanguage) : "";

  return (
    <ScrollView contentContainerStyle={styles.content} directionalLockEnabled>
      <StudyCard
        current={current}
        currentSecondaryMeaning={currentSecondaryMeaning}
        savedCardIds={savedCardIds}
        revealed={revealed}
        flipping={flipping}
        grading={grading}
        swipeDirection={swipeDirection}
        lastReviewCard={lastReviewCard}
        dragX={dragX}
        flipProgress={flipProgress}
        cardRotation={cardRotation}
        panHandlers={panHandlers}
        meaningLanguage={settings.meaningLanguage}
        onFlipCard={onFlipCard}
        onToggleSaved={onToggleSaved}
        onManageDecks={onManageDecks}
        onEditCard={onEditCard}
        onCompleteSwipe={onCompleteSwipe}
        onUndoLastReview={onUndoLastReview}
      />

      <StudyRevealedContent current={current} grading={grading} revealed={revealed} reviewInterval={reviewInterval} onGrade={onGrade} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom }
});
