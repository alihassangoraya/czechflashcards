import React from "react";
import { Text } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { swipeStampStyles as styles } from "./swipeStampStyles";
import type { SwipeStampProps } from "./swipeStampTypes";

export function SwipeStamp({ direction }: SwipeStampProps) {
  const { t } = useI18n();

  return (
    <Text style={[styles.stamp, direction === "known" ? styles.known : styles.again]}>
      {direction === "known" ? t("study.known") : t("review.again")}
    </Text>
  );
}
