import { useMemo } from "react";
import { createSwipePanResponder } from "./swipePanResponder";
import type { SwipePanResponderParams } from "./swipePanResponderTypes";

export function useSwipePanHandlers(params: SwipePanResponderParams) {
  const panResponder = useMemo(
    () => createSwipePanResponder(params),
    [
      params.completeSwipe,
      params.dragX,
      params.grading,
      params.resetCancelledSwipe,
      params.swipeCompleting
    ]
  );

  return panResponder.panHandlers;
}
