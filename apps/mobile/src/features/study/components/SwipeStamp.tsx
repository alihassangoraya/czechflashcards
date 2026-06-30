import React from "react";
import { StyleSheet, Text } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import type { SwipeDirection } from "../animations/animationTypes";

export function SwipeStamp({ direction }: { direction: SwipeDirection }) {
  const { t } = useI18n();

  return (
    <Text style={[styles.stamp, direction === "known" ? styles.known : styles.again]}>
      {direction === "known" ? t("study.known") : t("review.again")}
    </Text>
  );
}

const styles = StyleSheet.create({
  stamp: {
    position: "absolute",
    zIndex: spacing.lgPlus,
    left: -spacing.lgPlus,
    right: -spacing.lgPlus,
    top: "50%",
    borderWidth: spacing.sm,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.stampSurface,
    fontSize: typography.stamp,
    fontWeight: typography.weightBlack,
    lineHeight: typography.stampLine,
    textAlign: "center",
    textTransform: "uppercase"
  },
  known: {
    color: colors.successStrong,
    borderColor: colors.successStrong,
    transform: [{ translateY: -size.headerAction }, { rotate: "-18deg" }]
  },
  again: {
    color: colors.dangerStrong,
    borderColor: colors.dangerStrong,
    transform: [{ translateY: -size.headerAction }, { rotate: "18deg" }]
  }
});
