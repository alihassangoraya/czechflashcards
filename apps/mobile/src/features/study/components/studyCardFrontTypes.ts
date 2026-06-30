import type { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { SwipeDirection } from "../animations/animationTypes";

export type StudyCardFrontProps = {
  current: Card;
  flipProgress: Animated.Value;
  grading: boolean;
  lastReviewCard: Card | null;
  onFlipCard: () => void;
  onCompleteSwipe: (direction: SwipeDirection) => void;
  onUndoLastReview: () => void;
};
