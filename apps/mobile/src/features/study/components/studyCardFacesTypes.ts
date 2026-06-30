import type { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import type { SwipeDirection } from "../animations/animationTypes";

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
