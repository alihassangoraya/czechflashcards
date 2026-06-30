import { useCallback } from "react";
import type { SwipeDirection } from "./animationTypes";
import type { SwipeAnimationStateParams } from "./swipeAnimationTypes";
import { springCardBack } from "./swipeAnimations";
import { useResetSwipeOnCardChange } from "./useResetSwipeOnCardChange";
import { useSwipeDirectionState } from "./useSwipeDirectionState";
import { useSwipeFlags } from "./useSwipeFlags";

export function useSwipeAnimationState({ current, dragX }: SwipeAnimationStateParams) {
  const { clearSwipeCompleting, consumedSwipe, markSwipeCompleting, releaseConsumedSwipe, resetSwipeFlags, swipeCompleting } = useSwipeFlags();
  const { resetSwipeDirection, setSwipeDirection, swipeDirection } = useSwipeDirectionState();

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
