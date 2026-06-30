import type { Animated, GestureResponderHandlers } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { SavedCardIds, StudySettings } from "../../../database";
import type { SwipeDirection } from "../animations/animationTypes";

export type StudyCardProps = {
  current: Card | null;
  currentSecondaryMeaning: string;
  savedCardIds: SavedCardIds;
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
