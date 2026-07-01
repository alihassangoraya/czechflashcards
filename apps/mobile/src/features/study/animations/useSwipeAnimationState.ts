import { useCallback } from "react";
import type { SwipeAnimationStateParams } from "./swipeAnimationTypes";
import { springCardBack } from "./swipeAnimations";
import { useResetSwipeOnCardChange } from "./useResetSwipeOnCardChange";
import { useSwipeFlags } from "./useSwipeFlags";

export function useSwipeAnimationState({ current, dragX }: SwipeAnimationStateParams) {
  const { clearSwipeCompleting, consumedSwipe, markSwipeCompleting, releaseConsumedSwipe, resetSwipeFlags, swipeCompleting } = useSwipeFlags();
  useResetSwipeOnCardChange({ current, dragX, resetFlags: resetSwipeFlags });

  const resetCancelledSwipe = useCallback(() => {
    resetSwipeFlags();
    springCardBack(dragX);
  }, [dragX, resetSwipeFlags]);
  const startSwipeCompletion = useCallback(() => {
    markSwipeCompleting();
  }, [markSwipeCompleting]);

  const finishSwipeCompletion = useCallback(() => {
    dragX.setValue(0);
    clearSwipeCompleting();
  }, [clearSwipeCompleting, dragX]);
  return {
    consumedSwipe,
    finishSwipeCompletion,
    releaseConsumedSwipe,
    resetCancelledSwipe,
    startSwipeCompletion,
    swipeCompleting
  };
}
