import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, PanResponder } from "react-native";
import type { Card, ReviewGrade } from "@czech-flashcards/shared";

export type SwipeDirection = "again" | "known";

type Params = {
  current: Card | null;
  revealed: boolean;
  grading: boolean;
  onRevealChange: (revealed: boolean) => void;
  onSwipeGrade: (grade: ReviewGrade) => void;
};

export function useStudyAnimations({ current, revealed, grading, onRevealChange, onSwipeGrade }: Params) {
  const dragX = useRef(new Animated.Value(0)).current;
  const flipProgress = useRef(new Animated.Value(0)).current;
  const consumedSwipe = useRef(false);
  const swipeCompleting = useRef(false);
  const [flipping, setFlipping] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection | null>(null);

  useEffect(() => {
    flipProgress.stopAnimation();
    flipProgress.setValue(revealed ? 1 : 0);
    setFlipping(false);
  }, [current?.id]);

  const cardRotation = dragX.interpolate({ inputRange: [-120, 0, 120], outputRange: ["-4deg", "0deg", "4deg"], extrapolate: "clamp" });

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
    onPanResponderGrant: () => dragX.stopAnimation(),
    onPanResponderTerminationRequest: () => false,
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
      setSwipeDirection(null);
      Animated.spring(dragX, { toValue: 0, useNativeDriver: true, speed: 22, bounciness: 5 }).start();
    },
    onPanResponderTerminate: () => {
      if (swipeCompleting.current) return;
      setSwipeDirection(null);
      Animated.spring(dragX, { toValue: 0, useNativeDriver: true, speed: 22, bounciness: 5 }).start();
    }
  }), [current, grading, revealed]);

  function flipCard() {
    if (consumedSwipe.current) {
      consumedSwipe.current = false;
      return;
    }
    if (!current || flipping) return;
    const nextRevealed = !revealed;
    setFlipping(true);
    Animated.timing(flipProgress, {
      toValue: nextRevealed ? 1 : 0,
      duration: 400,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished) onRevealChange(nextRevealed);
      setFlipping(false);
    });
  }

  return {
    cardRotation,
    completeSwipe,
    dragX,
    flipCard,
    flipping,
    flipProgress,
    panHandlers: panResponder.panHandlers,
    swipeDirection
  };
}
