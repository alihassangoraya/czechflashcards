import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors, radius, size, spacing } from "../../../theme/design";

type SwipeDirection = "again" | "known";

export function SwipeStamp({ direction }: { direction: SwipeDirection }) {
  return (
    <Text style={[styles.stamp, direction === "known" ? styles.known : styles.again]}>
      {direction === "known" ? "Known" : "Again"}
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
    fontSize: 62,
    fontWeight: "900",
    lineHeight: 68,
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
