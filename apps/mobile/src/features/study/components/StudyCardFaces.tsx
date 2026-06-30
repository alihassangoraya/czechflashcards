import React from "react";
import { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import type { SwipeDirection } from "../animations/animationTypes";
import { StudyCardActions } from "./StudyCardActions";
import { StudyCardBack } from "./StudyCardBack";
import { StudyCardFront } from "./StudyCardFront";

export type StudyCardFacesProps = {
  current: Card;
  currentSecondaryMeaning: string;
  flipProgress: Animated.Value;
  flipping: boolean;
  grading: boolean;
  isSaved: boolean;
  lastReviewCard: Card | null;
  meaningLanguage: StudySettings["meaningLanguage"];
  revealed: boolean;
  onCompleteSwipe: (direction: SwipeDirection) => void;
  onEditCard: () => void;
  onFlipCard: () => void;
  onManageDecks: (card: Card) => void;
  onToggleSaved: (cardId: string) => void;
  onUndoLastReview: () => void;
};

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
