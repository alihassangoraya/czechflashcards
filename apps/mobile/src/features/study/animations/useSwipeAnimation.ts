import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, PanResponder } from "react-native";
import type { Card, ReviewGrade } from "@czech-flashcards/shared";
import type { SwipeDirection } from "./animationTypes";

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

  const cardRotation = dragX.interpolate({ inputRange: [-120, 0, 120], outputRange: ["-4deg", "0deg", "4deg"], extrapolate: "clamp" });

  function resetCancelledSwipe() {
    swipeCompleting.current = false;
    consumedSwipe.current = false;
    setSwipeDirection(null);
    dragX.stopAnimation(() => {
      Animated.spring(dragX, { toValue: 0, useNativeDriver: true, speed: 22, bounciness: 5 }).start(({ finished }) => {
        if (finished) dragX.setValue(0);
      });
    });
  }

  function completeSwipe(direction: SwipeDirection) {
    if (grading || swipeCompleting.current) return;
    consumedSwipe.current = true;
    swipeCompleting.current = true;
    setSwipeDirection(direction);
    Animated.timing(dragX, {
      toValue: direction === "known" ? 460 : -460,
      duration: 230,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start(({ finished }) => {
      dragX.setValue(0);
      setSwipeDirection(null);
      swipeCompleting.current = false;
      if (finished) onSwipeGrade(direction === "known" ? "good" : "again");
    });
    setTimeout(() => { consumedSwipe.current = false; }, 360);
  }

  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 12 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
    onMoveShouldSetPanResponderCapture: (_, gesture) => Math.abs(gesture.dx) > 12 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
    onPanResponderGrant: () => {
      if (swipeCompleting.current) return;
      dragX.stopAnimation();
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderMove: (_, gesture) => {
      if (swipeCompleting.current) return;
      dragX.setValue(gesture.dx);
      setSwipeDirection(gesture.dx > 24 ? "known" : gesture.dx < -24 ? "again" : null);
    },
    onPanResponderRelease: (_, gesture) => {
      const direction = gesture.dx > 90 ? "known" : gesture.dx < -90 ? "again" : null;
      if (!grading && direction) {
        completeSwipe(direction);
        return;
      }
      resetCancelledSwipe();
    },
    onPanResponderTerminate: () => {
      if (swipeCompleting.current) return;
      resetCancelledSwipe();
    }
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
