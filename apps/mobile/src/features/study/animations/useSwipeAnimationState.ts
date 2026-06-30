import { useCallback, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { SwipeDirection } from "./animationTypes";
import { springCardBack } from "./swipeAnimations";

type Params = {
  current: Card | null;
  dragX: Animated.Value;
};

export function useSwipeAnimationState({ current, dragX }: Params) {
  const consumedSwipe = useRef(false);
  const swipeCompleting = useRef(false);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection | null>(null);

  useEffect(() => {
    dragX.stopAnimation();
    dragX.setValue(0);
    consumedSwipe.current = false;
    swipeCompleting.current = false;
    setSwipeDirection(null);
  }, [current?.id]);

  const resetCancelledSwipe = useCallback(() => {
    swipeCompleting.current = false;
    consumedSwipe.current = false;
    setSwipeDirection(null);
    springCardBack(dragX);
  }, [dragX]);

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
