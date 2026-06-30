import { useEffect } from "react";
import { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";

type Params = {
  current: Card | null;
  dragX: Animated.Value;
  resetFlags: () => void;
  resetSwipeDirection: () => void;
};

export function useResetSwipeOnCardChange({ current, dragX, resetFlags, resetSwipeDirection }: Params) {
  useEffect(() => {
    dragX.stopAnimation();
    dragX.setValue(0);
    resetFlags();
    resetSwipeDirection();
  }, [current?.id, dragX, resetFlags, resetSwipeDirection]);
}
