import React from "react";
import type { Animated, GestureResponderHandlers } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import { StudyCard } from "./StudyCard";
import { displaySelectedMeaning } from "../studyMeaning";
import type { SwipeDirection } from "../animations/animationTypes";

type Props = {
  current: Card | null;
  settings: StudySettings;
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
  onFlipCard: () => void;
  onToggleSaved: (cardId: string) => void;
  onManageDecks: (card: Card) => void;
  onEditCard: () => void;
  onCompleteSwipe: (direction: SwipeDirection) => void;
  onUndoLastReview: () => void;
};

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
