import { useEffect, useMemo, useRef, useState } from "react";
import { Animated } from "react-native";
import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import type { SwipeDirection } from "./animationTypes";
import { animateSwipeAway, springCardBack } from "./swipeAnimations";
import { swipeConfig } from "./swipeConfig";
import { gradeFromSwipe } from "./swipeMath";
import { createSwipePanResponder } from "./swipePanResponder";

type Params = {
  current: Card | null;
  grading: boolean;
  onSwipeGrade: (grade: ReviewGrade) => void;
};

export function useSwipeAnimation({ current, grading, onSwipeGrade }: Params) {
  const dragX = useRef(new Animated.Value(0)).current;
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

  const cardRotation = dragX.interpolate({ inputRange: [-swipeConfig.rotationRange, 0, swipeConfig.rotationRange], outputRange: ["-4deg", "0deg", "4deg"], extrapolate: "clamp" });

  function resetCancelledSwipe() {
    swipeCompleting.current = false;
    consumedSwipe.current = false;
    setSwipeDirection(null);
    springCardBack(dragX);
  }

  function completeSwipe(direction: SwipeDirection) {
    if (grading || swipeCompleting.current) return;
    consumedSwipe.current = true;
    swipeCompleting.current = true;
    setSwipeDirection(direction);
    animateSwipeAway(dragX, direction, (finished) => {
      dragX.setValue(0);
      setSwipeDirection(null);
      swipeCompleting.current = false;
      if (finished) onSwipeGrade(gradeFromSwipe(direction));
    });
    setTimeout(() => { consumedSwipe.current = false; }, swipeConfig.releaseDelay);
  }

  const panResponder = useMemo(() => createSwipePanResponder({
    completeSwipe,
    dragX,
    grading,
    resetCancelledSwipe,
    setSwipeDirection,
    swipeCompleting
  }), [current, grading]);

  return {
    cardRotation,
    completeSwipe,
    consumedSwipe,
    dragX,
    panHandlers: panResponder.panHandlers,
    swipeDirection
  };
}
