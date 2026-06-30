import { Animated, PanResponder } from "react-native";
import { swipeConfig } from "./swipeConfig";
import { directionFromDrag, shouldCaptureHorizontalSwipe } from "./swipeMath";
import type { SwipePanResponderParams } from "./swipePanResponderTypes";

export function createSwipePanResponder({ dragX, grading, swipeCompleting, completeSwipe, resetCancelledSwipe, setSwipeDirection }: SwipePanResponderParams) {
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
