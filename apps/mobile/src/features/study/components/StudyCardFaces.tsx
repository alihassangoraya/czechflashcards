import React from "react";
import { StudyCardActions } from "./StudyCardActions";
import { StudyCardBack } from "./StudyCardBack";
import { StudyCardFront } from "./StudyCardFront";
import type { StudyCardFacesProps } from "./studyCardFacesTypes";

export function StudyCardFaces({ current, currentSecondaryMeaning, flipProgress, flipping, grading, isSaved, lastReviewCard, meaningLanguage, revealed, onCompleteSwipe, onEditCard, onFlipCard, onManageDecks, onToggleSaved, onUndoLastReview }: StudyCardFacesProps) {
  return (
    <>
      <StudyCardActions
        current={current}
        isSaved={isSaved}
        showEdit={revealed && !flipping}
        onToggleSaved={onToggleSaved}
        onManageDecks={onManageDecks}
        onEditCard={onEditCard}
      />
      <StudyCardFront
        current={current}
        flipProgress={flipProgress}
        grading={grading}
        lastReviewCard={lastReviewCard}
        onFlipCard={onFlipCard}
        onCompleteSwipe={onCompleteSwipe}
        onUndoLastReview={onUndoLastReview}
      />
      <StudyCardBack
        current={current}
        currentSecondaryMeaning={currentSecondaryMeaning}
        flipProgress={flipProgress}
        meaningLanguage={meaningLanguage}
        onFlipCard={onFlipCard}
      />
    </>
  );
}
