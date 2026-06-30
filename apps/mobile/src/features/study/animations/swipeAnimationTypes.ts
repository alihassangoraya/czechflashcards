import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import type { Animated } from "react-native";

export type SwipeAnimationParams = {
  current: Card | null;
  grading: boolean;
  onSwipeGrade: (grade: ReviewGrade) => void;
};

export type SwipeAnimationStateParams = {
  current: Card | null;
  dragX: Animated.Value;
};
