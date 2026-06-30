import React from "react";
import { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import type { SwipeDirection } from "../animations/animationTypes";
import { StudyCardFaces } from "./StudyCardFaces";

type Props = {
  current: Card;
  currentSecondaryMeaning: string;
  savedCardIds: Set<string>;
  revealed: boolean;
  flipping: boolean;
  grading: boolean;
  lastReviewCard: Card | null;
  flipProgress: Animated.Value;
  meaningLanguage: StudySettings["meaningLanguage"];
  onFlipCard: () => void;
  onToggleSaved: (cardId: string) => void;
  onManageDecks: (card: Card) => void;
  onEditCard: () => void;
  onCompleteSwipe: (direction: SwipeDirection) => void;
  onUndoLastReview: () => void;
};

export function CurrentStudyCard({
  current,
  currentSecondaryMeaning,
  savedCardIds,
  revealed,
  flipping,
  grading,
  lastReviewCard,
  flipProgress,
  meaningLanguage,
  onFlipCard,
  onToggleSaved,
  onManageDecks,
  onEditCard,
  onCompleteSwipe,
  onUndoLastReview
}: Props) {
  return (
    <StudyCardFaces
      current={current}
      currentSecondaryMeaning={currentSecondaryMeaning}
      flipProgress={flipProgress}
      flipping={flipping}
      grading={grading}
      isSaved={savedCardIds.has(current.id)}
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
  );
}
