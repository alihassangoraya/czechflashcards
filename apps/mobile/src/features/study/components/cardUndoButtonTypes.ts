import type { Card } from "@czech-flashcards/shared";

export type CardUndoButtonProps = {
  grading: boolean;
  lastReviewCard: Card;
  onUndoLastReview: () => void;
};
