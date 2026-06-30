import React from "react";
import { StudyContent } from "../components/StudyContent";
import { StudyHeader } from "../components/StudyHeader";
import { StudyProgress } from "../components/StudyProgress";
import type { StudyScreenProps } from "../studyScreenTypes";

export function StudyScreen({
  current,
  settings,
  savedCardIds,
  revealed,
  flipping,
  grading,
  swipeDirection,
  lastReviewCard,
  sessionReviews,
  sessionTarget,
  reviewedToday,
  dailyGoal,
  sessionProgress,
  dragX,
  flipProgress,
  cardRotation,
  panHandlers,
  reviewInterval,
  onBack,
  onOpenGrammar,
  onFlipCard,
  onToggleSaved,
  onManageDecks,
  onEditCard,
  onCompleteSwipe,
  onUndoLastReview,
  onGrade
}: StudyScreenProps) {
  return (
    <>
      <StudyHeader onBack={onBack} onOpenGrammar={onOpenGrammar} />
      <StudyProgress sessionReviews={sessionReviews} sessionTarget={sessionTarget} reviewedToday={reviewedToday} dailyGoal={dailyGoal} sessionProgress={sessionProgress} />
      <StudyContent
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
        reviewInterval={reviewInterval}
        onFlipCard={onFlipCard}
        onToggleSaved={onToggleSaved}
        onManageDecks={onManageDecks}
        onEditCard={onEditCard}
        onCompleteSwipe={onCompleteSwipe}
        onUndoLastReview={onUndoLastReview}
        onGrade={onGrade}
      />
    </>
  );
}
