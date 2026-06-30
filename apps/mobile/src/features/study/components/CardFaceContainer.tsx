import React from "react";
import { Animated } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { CardFacePressable } from "./CardFacePressable";

type Props = {
  children: React.ReactNode;
  flipProgress: Animated.Value;
  onPress: () => void;
};

export function CardFrontFaceContainer({ children, flipProgress, onPress }: Props) {
  const { t } = useI18n();

  return (
    <CardFacePressable accessibilityLabel={t("study.revealMeaning")} flipProgress={flipProgress} onPress={onPress} outputRange={["0deg", "180deg"]}>
      {children}
    </CardFacePressable>
  );
}

export function CardBackFaceContainer({ children, flipProgress, onPress }: Props) {
  const { t } = useI18n();

  return (
    <CardFacePressable accessibilityLabel={t("study.showCzech")} back flipProgress={flipProgress} onPress={onPress} outputRange={["180deg", "360deg"]}>
      {children}
    </CardFacePressable>
  );
}
