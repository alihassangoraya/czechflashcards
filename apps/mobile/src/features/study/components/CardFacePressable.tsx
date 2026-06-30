import React from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { colors, radius, spacing } from "../../../theme/design";

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
        styles.cardFace,
        back && styles.cardBack,
        {
          transform: [
            { perspective: 1200 },
            { rotateY: flipProgress.interpolate({ inputRange: [0, 1], outputRange }) }
          ]
        }
      ]}
    >
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  cardFace: {
    position: "absolute",
    inset: 0,
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.card,
    borderWidth: spacing.hairline,
    borderColor: colors.borderSoft,
    backfaceVisibility: "hidden"
  },
  cardBack: { backgroundColor: colors.surfaceSecondary }
});
