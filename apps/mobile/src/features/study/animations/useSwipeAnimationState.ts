import { useCallback, useRef, useState } from "react";
import { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { SwipeDirection } from "./animationTypes";
import { springCardBack } from "./swipeAnimations";
import { useResetSwipeOnCardChange } from "./useResetSwipeOnCardChange";

type Params = {
  current: Card | null;
  dragX: Animated.Value;
};

export function useSwipeAnimationState({ current, dragX }: Params) {
  const consumedSwipe = useRef(false);
  const swipeCompleting = useRef(false);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection | null>(null);

  const resetFlags = useCallback(() => {
    consumedSwipe.current = false;
    swipeCompleting.current = false;
  }, []);

  const resetSwipeDirection = useCallback(() => {
    setSwipeDirection(null);
  }, []);

  useResetSwipeOnCardChange({ current, dragX, resetFlags, resetSwipeDirection });

  const resetCancelledSwipe = useCallback(() => {
    resetFlags();
    resetSwipeDirection();
    springCardBack(dragX);
  }, [dragX, resetFlags, resetSwipeDirection]);

  const startSwipeCompletion = useCallback((direction: SwipeDirection) => {
    consumedSwipe.current = true;
    swipeCompleting.current = true;
    setSwipeDirection(direction);
  }, []);

  const finishSwipeCompletion = useCallback(() => {
    dragX.setValue(0);
    setSwipeDirection(null);
    swipeCompleting.current = false;
  }, [dragX]);

  const releaseConsumedSwipe = useCallback(() => {
    consumedSwipe.current = false;
  }, []);

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
