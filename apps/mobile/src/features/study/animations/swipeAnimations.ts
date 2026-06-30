import { Animated, Easing } from "react-native";
import type { SwipeDirection } from "./animationTypes";
import { swipeConfig } from "./swipeConfig";
import { swipeCompletionOffset } from "./swipeMath";

export function springCardBack(dragX: Animated.Value) {
  dragX.stopAnimation(() => {
    Animated.spring(dragX, {
      toValue: 0,
      useNativeDriver: true,
      speed: swipeConfig.springSpeed,
      bounciness: swipeConfig.springBounciness
    }).start(({ finished }) => {
      if (finished) dragX.setValue(0);
    });
  });
}

export function animateSwipeAway(dragX: Animated.Value, direction: SwipeDirection, onComplete: (finished: boolean) => void) {
  Animated.timing(dragX, {
    toValue: swipeCompletionOffset(direction),
    duration: swipeConfig.completionDuration,
    easing: Easing.out(Easing.cubic),
    useNativeDriver: true
  }).start(({ finished }) => onComplete(finished));
}
