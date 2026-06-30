import type { Card, ReviewGrade } from "@czech-flashcards/shared";

export type MainStudyHandlers = {
  onToggleSaved: (cardId: string, showFeedback?: boolean) => void;
  onSetDeckManagementCard: (card: Card | null) => void;
  onOpenCardEditor: (card?: Card | null) => void;
  onUndoLastReview: () => void;
  onGrade: (grade: ReviewGrade) => void;
};
