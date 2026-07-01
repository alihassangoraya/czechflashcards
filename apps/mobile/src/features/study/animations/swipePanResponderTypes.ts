import type { MutableRefObject } from "react";
import type { Animated } from "react-native";
import type { SwipeDirection } from "./animationTypes";

export type SwipePanResponderParams = {
  dragX: Animated.Value;
  grading: boolean;
  swipeCompleting: MutableRefObject<boolean>;
  completeSwipe: (direction: SwipeDirection) => void;
  resetCancelledSwipe: () => void;
};
