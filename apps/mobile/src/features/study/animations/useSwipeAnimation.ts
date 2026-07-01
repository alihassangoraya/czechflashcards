import { useRef } from "react";
import { Animated } from "react-native";
import { createSwipeRotation } from "./swipeRotation";
import type { SwipeAnimationParams } from "./swipeAnimationTypes";
import { useSwipeCompletion } from "./useSwipeCompletion";
import { useSwipeAnimationState } from "./useSwipeAnimationState";
import { useSwipePanHandlers } from "./useSwipePanHandlers";

export function useSwipeAnimation({ current, grading, onSwipeGrade }: SwipeAnimationParams) {
  const dragX = useRef(new Animated.Value(0)).current;
  const swipeState = useSwipeAnimationState({ current, dragX });
  const { consumedSwipe, finishSwipeCompletion, releaseConsumedSwipe, resetCancelledSwipe, startSwipeCompletion, swipeCompleting } = swipeState;
  const cardRotation = createSwipeRotation(dragX);
  const completeSwipe = useSwipeCompletion({
    dragX,
    grading,
    onSwipeGrade,
    finishSwipeCompletion,
    releaseConsumedSwipe,
    startSwipeCompletion,
    swipeCompleting
  });
  const panHandlers = useSwipePanHandlers({
    completeSwipe,
    dragX,
    grading,
    resetCancelledSwipe,
    swipeCompleting
  });
  return {
    cardRotation,
    completeSwipe,
    consumedSwipe,
    dragX,
    panHandlers
  };
}
