import type { SwipeDirection } from "../animations/animationTypes";
import type { Animated, StyleProp, TextStyle } from "react-native";

export type SwipeStampProps = {
  animatedStyle?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
  direction: SwipeDirection;
};
