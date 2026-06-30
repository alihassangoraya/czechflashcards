import React from "react";
import { CurrentStudyCard } from "./CurrentStudyCard";
import { EmptyStudyCard } from "./EmptyStudyCard";
import { StudyCardMotion } from "./StudyCardMotion";
import type { StudyCardProps } from "./studyCardTypes";

export function StudyCard({
  current,
  currentSecondaryMeaning,
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
  meaningLanguage,
  onFlipCard,
  onToggleSaved,
  onManageDecks,
  onEditCard,
  onCompleteSwipe,
  onUndoLastReview
}: StudyCardProps) {
  return (
    <StudyCardMotion cardRotation={cardRotation} dragX={dragX} panHandlers={panHandlers} swipeDirection={swipeDirection}>
      {current ? (
        <CurrentStudyCard
          current={current}
          currentSecondaryMeaning={currentSecondaryMeaning}
          flipProgress={flipProgress}
          flipping={flipping}
          grading={grading}
          savedCardIds={savedCardIds}
          lastReviewCard={lastReviewCard}
          meaningLanguage={meaningLanguage}
          revealed={revealed}
          onCompleteSwipe={onCompleteSwipe}
          onEditCard={onEditCard}
          onFlipCard={onFlipCard}
          onManageDecks={onManageDecks}
          onToggleSaved={onToggleSaved}
          onUndoLastReview={onUndoLastReview}
        />
      ) : (
        <EmptyStudyCard />
      )}
    </StudyCardMotion>
  );
}
