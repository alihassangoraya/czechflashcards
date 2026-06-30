import { useMemo, useRef } from "react";
import { Animated } from "react-native";
import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import { swipeConfig } from "./swipeConfig";
import { createSwipePanResponder } from "./swipePanResponder";
import { useSwipeCompletion } from "./useSwipeCompletion";
import { useSwipeAnimationState } from "./useSwipeAnimationState";

type Params = {
  current: Card | null;
  grading: boolean;
  onSwipeGrade: (grade: ReviewGrade) => void;
};

export function useSwipeAnimation({ current, grading, onSwipeGrade }: Params) {
  const dragX = useRef(new Animated.Value(0)).current;
  const swipeState = useSwipeAnimationState({ current, dragX });

  const cardRotation = dragX.interpolate({ inputRange: [-swipeConfig.rotationRange, 0, swipeConfig.rotationRange], outputRange: ["-4deg", "0deg", "4deg"], extrapolate: "clamp" });

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
