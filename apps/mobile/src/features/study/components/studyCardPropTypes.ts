import type { Animated, GestureResponderHandlers } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { SavedCardIds, StudySettings } from "../../../database";
import type { SwipeDirection } from "../animations/animationTypes";

export type StudyCardStateProps = {
  savedCardIds: SavedCardIds;
  revealed: boolean;
  flipping: boolean;
  grading: boolean;
  lastReviewCard: Card | null;
};

export type StudyCardMotionProps = {
  dragX: Animated.Value;
  flipProgress: Animated.Value;
  cardRotation: Animated.AnimatedInterpolation<string | number>;
  panHandlers: GestureResponderHandlers;
  swipeDirection: SwipeDirection | null;
};

export type StudyCardMeaningProps = {
  currentSecondaryMeaning: string;
  meaningLanguage: StudySettings["meaningLanguage"];
};

export type StudyCardActionProps = {
  onFlipCard: () => void;
  onToggleSaved: (cardId: string) => void;
  onManageDecks: (card: Card) => void;
  onEditCard: () => void;
  onCompleteSwipe: (direction: SwipeDirection) => void;
  onUndoLastReview: () => void;
};
