import { useCallback, useRef } from "react";

export function useSwipeFlags() {
  const consumedSwipe = useRef(false);
  const swipeCompleting = useRef(false);

  const resetSwipeFlags = useCallback(() => {
    consumedSwipe.current = false;
    swipeCompleting.current = false;
  }, []);

  const markSwipeCompleting = useCallback(() => {
    consumedSwipe.current = true;
    swipeCompleting.current = true;
  }, []);

  const clearSwipeCompleting = useCallback(() => {
    swipeCompleting.current = false;
  }, []);

  const releaseConsumedSwipe = useCallback(() => {
    consumedSwipe.current = false;
  }, []);

  return {
    clearSwipeCompleting,
    consumedSwipe,
    markSwipeCompleting,
    releaseConsumedSwipe,
    resetSwipeFlags,
    swipeCompleting
  };
}
