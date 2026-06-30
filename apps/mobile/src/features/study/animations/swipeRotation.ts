import { Animated } from "react-native";
import { swipeConfig } from "./swipeConfig";

export function createSwipeRotation(dragX: Animated.Value) {
  return dragX.interpolate({
    inputRange: [-swipeConfig.rotationRange, 0, swipeConfig.rotationRange],
    outputRange: ["-4deg", "0deg", "4deg"],
    extrapolate: "clamp"
  });
}
