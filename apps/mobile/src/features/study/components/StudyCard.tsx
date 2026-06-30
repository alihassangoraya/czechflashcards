import React from "react";
import { Animated, GestureResponderHandlers } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import type { SwipeDirection } from "../animations/animationTypes";
import { EmptyStudyCard } from "./EmptyStudyCard";
import { StudyCardFaces } from "./StudyCardFaces";
import { StudyCardMotion } from "./StudyCardMotion";

type Props = {
  current: Card | null;
  currentSecondaryMeaning: string;
  savedCardIds: Set<string>;
  revealed: boolean;
  flipping: boolean;
  grading: boolean;
  swipeDirection: SwipeDirection | null;
  lastReviewCard: Card | null;
  dragX: Animated.Value;
  flipProgress: Animated.Value;
  cardRotation: Animated.AnimatedInterpolation<string | number>;
  panHandlers: GestureResponderHandlers;
  meaningLanguage: StudySettings["meaningLanguage"];
  onFlipCard: () => void;
  onToggleSaved: (cardId: string) => void;
  onManageDecks: (card: Card) => void;
  onEditCard: () => void;
  onCompleteSwipe: (direction: SwipeDirection) => void;
  onUndoLastReview: () => void;
};

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
}: Props) {
  return (
    <StudyCardMotion cardRotation={cardRotation} dragX={dragX} panHandlers={panHandlers} swipeDirection={swipeDirection}>
      {current ? (
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
      ) : (
        <EmptyStudyCard />
      )}
    </StudyCardMotion>
  );
}
