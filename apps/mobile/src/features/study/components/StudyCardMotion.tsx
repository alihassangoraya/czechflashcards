import React from "react";
import { Animated, GestureResponderHandlers, StyleSheet, View } from "react-native";
import { size } from "../../../theme/design";
import type { SwipeDirection } from "../animations/animationTypes";
import { SwipeStamp } from "./SwipeStamp";

type Props = {
  cardRotation: Animated.AnimatedInterpolation<string | number>;
  children: React.ReactNode;
  dragX: Animated.Value;
  panHandlers: GestureResponderHandlers;
  swipeDirection: SwipeDirection | null;
};

export function StudyCardMotion({ cardRotation, children, dragX, panHandlers, swipeDirection }: Props) {
  return (
    <View style={styles.cardFrame} {...panHandlers}>
      <Animated.View pointerEvents="box-none" style={[styles.cardMotion, { transform: [{ translateX: dragX }, { rotateZ: cardRotation }] }]}>
        {swipeDirection && <SwipeStamp direction={swipeDirection} />}
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardFrame: { position: "relative", height: size.cardHeight },
  cardMotion: { ...StyleSheet.absoluteFillObject }
});
