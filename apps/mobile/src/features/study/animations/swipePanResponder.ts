import { Animated, PanResponder } from "react-native";
import { swipeConfig } from "./swipeConfig";
import { directionFromDrag, shouldCaptureHorizontalSwipe } from "./swipeMath";
import type { SwipePanResponderParams } from "./swipePanResponderTypes";

export function createSwipePanResponder({ dragX, grading, swipeCompleting, completeSwipe, resetCancelledSwipe }: SwipePanResponderParams) {
  const canCapture = (dx: number, dy: number) => !grading && !swipeCompleting.current && shouldCaptureHorizontalSwipe(dx, dy);

  return PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => canCapture(gesture.dx, gesture.dy),
    onMoveShouldSetPanResponderCapture: (_, gesture) => canCapture(gesture.dx, gesture.dy),
    onPanResponderGrant: () => {
      if (swipeCompleting.current) return;
      dragX.stopAnimation();
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderMove: (_, gesture) => {
      if (swipeCompleting.current) return;
      dragX.setValue(gesture.dx);
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
    },
    onShouldBlockNativeResponder: () => true
  });
}
