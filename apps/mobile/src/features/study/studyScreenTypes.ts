import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import type { Animated, GestureResponderHandlers } from "react-native";
import type { StudySettings } from "../../database";
import type { SwipeDirection } from "./animations/animationTypes";
import type { StudyProgressProps } from "./components/StudyProgress";

type StudyHeaderProps = {
  onBack: () => void;
  onOpenGrammar: () => void;
};

export type StudyContentProps = {
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
  reviewInterval: (grade: ReviewGrade) => string;
  onFlipCard: () => void;
  onToggleSaved: (cardId: string) => void;
  onManageDecks: (card: Card) => void;
  onEditCard: () => void;
  onCompleteSwipe: (direction: SwipeDirection) => void;
  onUndoLastReview: () => void;
  onGrade: (grade: ReviewGrade) => void;
};

export type StudyScreenProps = StudyHeaderProps & StudyProgressProps & StudyContentProps;
