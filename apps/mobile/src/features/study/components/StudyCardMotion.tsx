import React from "react";
import { Animated, GestureResponderHandlers, StyleSheet, View } from "react-native";
import { size } from "../../../theme/design";
import { swipeConfig } from "../animations/swipeConfig";
import { SwipeStamp } from "./SwipeStamp";

type Props = {
  cardRotation: Animated.AnimatedInterpolation<string | number>;
  children: React.ReactNode;
  dragX: Animated.Value;
  panHandlers: GestureResponderHandlers;
};
export function StudyCardMotion({ cardRotation, children, dragX, panHandlers }: Props) {
  const knownOpacity = dragX.interpolate({
    inputRange: [swipeConfig.directionPreviewDistance, swipeConfig.completionDistance],
    outputRange: [0, 1],
    extrapolate: "clamp"
  });
  const againOpacity = dragX.interpolate({
    inputRange: [-swipeConfig.completionDistance, -swipeConfig.directionPreviewDistance],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  return (
    <View style={styles.cardFrame} {...panHandlers}>
      <Animated.View pointerEvents="box-none" style={[styles.cardMotion, { transform: [{ translateX: dragX }, { rotateZ: cardRotation }] }]}>
        <SwipeStamp animatedStyle={{ opacity: againOpacity }} direction="again" />
        <SwipeStamp animatedStyle={{ opacity: knownOpacity }} direction="known" />
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardFrame: { position: "relative", height: size.cardHeight },
  cardMotion: { ...StyleSheet.absoluteFillObject }
});
