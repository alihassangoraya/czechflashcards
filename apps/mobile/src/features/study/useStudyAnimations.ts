import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import { useFlipAnimation } from "./animations/useFlipAnimation";
import { useSwipeAnimation } from "./animations/useSwipeAnimation";

type Params = {
  current: Card | null;
  revealed: boolean;
  grading: boolean;
  onRevealChange: (revealed: boolean) => void;
  onSwipeGrade: (grade: ReviewGrade) => void;
};

export function useStudyAnimations({ current, revealed, grading, onRevealChange, onSwipeGrade }: Params) {
  const swipe = useSwipeAnimation({ current, grading, onSwipeGrade });
  const flip = useFlipAnimation({ consumedSwipe: swipe.consumedSwipe, current, revealed, onRevealChange });

  return {
    cardRotation: swipe.cardRotation,
    completeSwipe: swipe.completeSwipe,
    dragX: swipe.dragX,
    flipCard: flip.flipCard,
    flipping: flip.flipping,
    flipProgress: flip.flipProgress,
    panHandlers: swipe.panHandlers,
    swipeDirection: swipe.swipeDirection
  };
}
