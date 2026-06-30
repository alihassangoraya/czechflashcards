import type { MutableRefObject } from "react";
import { Animated, PanResponder } from "react-native";
import type { SwipeDirection } from "./animationTypes";
import { swipeConfig } from "./swipeConfig";
import { directionFromDrag, shouldCaptureHorizontalSwipe } from "./swipeMath";

type Params = {
  dragX: Animated.Value;
  grading: boolean;
  swipeCompleting: MutableRefObject<boolean>;
  completeSwipe: (direction: SwipeDirection) => void;
  resetCancelledSwipe: () => void;
  setSwipeDirection: (direction: SwipeDirection | null) => void;
};

export function createSwipePanResponder({ dragX, grading, swipeCompleting, completeSwipe, resetCancelledSwipe, setSwipeDirection }: Params) {
  return PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => shouldCaptureHorizontalSwipe(gesture.dx, gesture.dy),
    onMoveShouldSetPanResponderCapture: (_, gesture) => shouldCaptureHorizontalSwipe(gesture.dx, gesture.dy),
    onPanResponderGrant: () => {
      if (swipeCompleting.current) return;
      dragX.stopAnimation();
    },
    onPanResponderTerminationRequest: () => true,
    onPanResponderMove: (_, gesture) => {
      if (swipeCompleting.current) return;
      dragX.setValue(gesture.dx);
      setSwipeDirection(directionFromDrag(gesture.dx, swipeConfig.directionPreviewDistance));
    },
    onPanResponderRelease: (_, gesture) => {
      const direction = directionFromDrag(gesture.dx, swipeConfig.completionDistance);
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
  });
}
