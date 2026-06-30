import { useMemo, useRef } from "react";
import { Animated } from "react-native";
import { createSwipePanResponder } from "./swipePanResponder";
import { createSwipeRotation } from "./swipeRotation";
import type { SwipeAnimationParams } from "./swipeAnimationTypes";
import { useSwipeCompletion } from "./useSwipeCompletion";
import { useSwipeAnimationState } from "./useSwipeAnimationState";

export function useSwipeAnimation({ current, grading, onSwipeGrade }: SwipeAnimationParams) {
  const dragX = useRef(new Animated.Value(0)).current;
  const swipeState = useSwipeAnimationState({ current, dragX });
  const cardRotation = createSwipeRotation(dragX);

  const completeSwipe = useSwipeCompletion({
    dragX,
    grading,
    onSwipeGrade,
    finishSwipeCompletion: swipeState.finishSwipeCompletion,
    releaseConsumedSwipe: swipeState.releaseConsumedSwipe,
    startSwipeCompletion: swipeState.startSwipeCompletion,
    swipeCompleting: swipeState.swipeCompleting
  });
  const panResponder = useMemo(() => createSwipePanResponder({
    completeSwipe,
    dragX,
    grading,
    resetCancelledSwipe: swipeState.resetCancelledSwipe,
    setSwipeDirection: swipeState.setSwipeDirection,
    swipeCompleting: swipeState.swipeCompleting
  }), [completeSwipe, dragX, grading, swipeState.resetCancelledSwipe, swipeState.setSwipeDirection, swipeState.swipeCompleting]);
  return {
    cardRotation,
    completeSwipe,
    consumedSwipe: swipeState.consumedSwipe,
    dragX,
    panHandlers: panResponder.panHandlers,
    swipeDirection: swipeState.swipeDirection
  };
}
