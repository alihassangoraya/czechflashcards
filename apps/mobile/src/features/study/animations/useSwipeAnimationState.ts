import { useCallback, useState } from "react";
import { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { SwipeDirection } from "./animationTypes";
import { springCardBack } from "./swipeAnimations";
import { useResetSwipeOnCardChange } from "./useResetSwipeOnCardChange";
import { useSwipeFlags } from "./useSwipeFlags";

type Params = {
  current: Card | null;
  dragX: Animated.Value;
};

export function useSwipeAnimationState({ current, dragX }: Params) {
  const { clearSwipeCompleting, consumedSwipe, markSwipeCompleting, releaseConsumedSwipe, resetSwipeFlags, swipeCompleting } = useSwipeFlags();
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection | null>(null);

  const resetSwipeDirection = useCallback(() => {
    setSwipeDirection(null);
  }, []);

  useResetSwipeOnCardChange({ current, dragX, resetFlags: resetSwipeFlags, resetSwipeDirection });

  const resetCancelledSwipe = useCallback(() => {
    resetSwipeFlags();
    resetSwipeDirection();
    springCardBack(dragX);
  }, [dragX, resetSwipeFlags, resetSwipeDirection]);

  const startSwipeCompletion = useCallback((direction: SwipeDirection) => {
    markSwipeCompleting();
    setSwipeDirection(direction);
  }, [markSwipeCompleting]);

  const finishSwipeCompletion = useCallback(() => {
    dragX.setValue(0);
    setSwipeDirection(null);
    clearSwipeCompleting();
  }, [clearSwipeCompleting, dragX]);

  return {
    consumedSwipe,
    finishSwipeCompletion,
    releaseConsumedSwipe,
    resetCancelledSwipe,
    setSwipeDirection,
    startSwipeCompletion,
    swipeCompleting,
    swipeDirection
  };
}
