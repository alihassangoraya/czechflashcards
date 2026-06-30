import { useCallback, type MutableRefObject } from "react";
import { Animated } from "react-native";
import type { ReviewGrade } from "@czech-flashcards/shared";
import type { SwipeDirection } from "./animationTypes";
import { animateSwipeAway } from "./swipeAnimations";
import { swipeConfig } from "./swipeConfig";
import { gradeFromSwipe } from "./swipeMath";

type Params = {
  dragX: Animated.Value;
  grading: boolean;
  onSwipeGrade: (grade: ReviewGrade) => void;
  swipeCompleting: MutableRefObject<boolean>;
  finishSwipeCompletion: () => void;
  releaseConsumedSwipe: () => void;
  startSwipeCompletion: (direction: SwipeDirection) => void;
};

export function useSwipeCompletion({ dragX, grading, onSwipeGrade, swipeCompleting, finishSwipeCompletion, releaseConsumedSwipe, startSwipeCompletion }: Params) {
  return useCallback((direction: SwipeDirection) => {
    if (grading || swipeCompleting.current) return;
    startSwipeCompletion(direction);
    animateSwipeAway(dragX, direction, (finished) => {
      finishSwipeCompletion();
      if (finished) onSwipeGrade(gradeFromSwipe(direction));
    });
    setTimeout(releaseConsumedSwipe, swipeConfig.releaseDelay);
  }, [dragX, finishSwipeCompletion, grading, onSwipeGrade, releaseConsumedSwipe, startSwipeCompletion, swipeCompleting]);
}
