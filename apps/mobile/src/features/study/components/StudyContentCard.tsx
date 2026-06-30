import React from "react";
import { StudyCard } from "./StudyCard";
import { displaySelectedMeaning } from "../studyMeaning";
import type { StudyContentProps } from "../studyScreenTypes";

type Props = Omit<StudyContentProps, "onGrade" | "reviewInterval">;

export function StudyContentCard({
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
  onFlipCard,
  onToggleSaved,
  onManageDecks,
  onEditCard,
  onCompleteSwipe,
  onUndoLastReview
}: Props) {
  const currentSecondaryMeaning = current ? displaySelectedMeaning(current, settings.meaningLanguage) : "";

  return (
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
  );
}
