import React from "react";
import { Animated } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { swipeStampStyles as styles } from "./swipeStampStyles";
import type { SwipeStampProps } from "./swipeStampTypes";

export function SwipeStamp({ animatedStyle, direction }: SwipeStampProps) {
  const { t } = useI18n();

  return (
    <Animated.Text style={[styles.stamp, direction === "known" ? styles.known : styles.again, animatedStyle]}>
      {direction === "known" ? t("study.known") : t("review.again")}
    </Animated.Text>
  );
}
