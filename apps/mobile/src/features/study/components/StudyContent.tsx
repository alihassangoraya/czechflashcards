import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { spacing } from "../../../theme/design";
import { StudyContentCard } from "./StudyContentCard";
import { StudyRevealedContent } from "./StudyRevealedContent";
import type { StudyContentProps } from "../studyScreenTypes";

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
}: StudyContentProps) {
  return (
    <ScrollView contentContainerStyle={styles.content} directionalLockEnabled>
      <StudyContentCard
        current={current}
        settings={settings}
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
