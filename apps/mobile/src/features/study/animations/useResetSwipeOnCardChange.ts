import { useEffect } from "react";
import { Animated } from "react-native";
import type { Card } from "@czech-flashcards/shared";

type Params = {
  current: Card | null;
  dragX: Animated.Value;
  resetFlags: () => void;
};

export function useResetSwipeOnCardChange({ current, dragX, resetFlags }: Params) {
  useEffect(() => {
    dragX.stopAnimation();
    dragX.setValue(0);
    resetFlags();
  }, [current?.id, dragX, resetFlags]);
}
