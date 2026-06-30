import { useCallback, useState } from "react";
import type { SwipeDirection } from "./animationTypes";

export function useSwipeDirectionState() {
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection | null>(null);

  const resetSwipeDirection = useCallback(() => {
    setSwipeDirection(null);
  }, []);

  return {
    resetSwipeDirection,
    setSwipeDirection,
    swipeDirection
  };
}
