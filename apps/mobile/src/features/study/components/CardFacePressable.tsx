import React from "react";
import { Animated, Pressable } from "react-native";
import { motion } from "../../../theme/design";
import { cardFacePressableStyles } from "./cardFacePressableStyles";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  accessibilityLabel: string;
  back?: boolean;
  children: React.ReactNode;
  flipProgress: Animated.Value;
  onPress: () => void;
  outputRange: [string, string];
};

export function CardFacePressable({ accessibilityLabel, back, children, flipProgress, onPress, outputRange }: Props) {
  return (
    <AnimatedPressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={[
        cardFacePressableStyles.cardFace,
        back && cardFacePressableStyles.cardBack,
        {
          transform: [
            { perspective: motion.cardPerspective },
            { rotateY: flipProgress.interpolate({ inputRange: [0, 1], outputRange }) }
          ]
        }
      ]}
    >
      {children}
    </AnimatedPressable>
  );
}
