import type { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import type { SwipeDirection } from "../animations/animationTypes";

export type CurrentStudyCardProps = {
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
