import { useMemo, useRef } from "react";
import { Animated } from "react-native";
import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import type { SwipeDirection } from "./animationTypes";
import { animateSwipeAway } from "./swipeAnimations";
import { swipeConfig } from "./swipeConfig";
import { gradeFromSwipe } from "./swipeMath";
import { createSwipePanResponder } from "./swipePanResponder";
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

  function completeSwipe(direction: SwipeDirection) {
    if (grading || swipeState.swipeCompleting.current) return;
    swipeState.startSwipeCompletion(direction);
    animateSwipeAway(dragX, direction, (finished) => {
      swipeState.finishSwipeCompletion();
      if (finished) onSwipeGrade(gradeFromSwipe(direction));
    });
    setTimeout(swipeState.releaseConsumedSwipe, swipeConfig.releaseDelay);
  }

  const panResponder = useMemo(() => createSwipePanResponder({
    completeSwipe,
    dragX,
    grading,
    resetCancelledSwipe: swipeState.resetCancelledSwipe,
    setSwipeDirection: swipeState.setSwipeDirection,
    swipeCompleting: swipeState.swipeCompleting
  }), [current, grading]);

  return {
    cardRotation,
    completeSwipe,
    consumedSwipe: swipeState.consumedSwipe,
    dragX,
    panHandlers: panResponder.panHandlers,
    swipeDirection: swipeState.swipeDirection
  };
}
