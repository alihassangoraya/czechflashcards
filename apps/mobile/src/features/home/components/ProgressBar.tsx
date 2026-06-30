import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, radius, size, spacing } from "../../../theme/design";

export function ProgressBar({ value, color, compact = false }: { value: number; color: string; compact?: boolean }) {
  return (
    <View style={[styles.progressTrack, compact && styles.progressCompact]}>
      <View style={[styles.progressFill, { width: `${Math.max(3, Math.min(100, value * 100))}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  progressTrack: { height: spacing.lg, overflow: "hidden", borderRadius: spacing.sm, backgroundColor: colors.progressTrack },
  progressCompact: { height: size.progressCompactHeight },
  progressFill: { height: "100%", borderRadius: radius.xs }
});
