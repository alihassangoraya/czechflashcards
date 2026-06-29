import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../../../theme/design";

type Props = {
  current: number;
  total: number;
  accuracy: number;
};

export function QuizProgress({ current, total, accuracy }: Props) {
  return (
    <View style={styles.progressSection}>
      <View style={styles.progressLabels}>
        <Text style={styles.progressTitle}>Question {current} of {total}</Text>
        <Text style={styles.progressMeta}>{accuracy}% accurate</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${(current / total) * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressSection: { gap: spacing.smd },
  progressLabels: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressTitle: { color: colors.textStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  progressMeta: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  progressTrack: { height: spacing.md, overflow: "hidden", borderRadius: radius.xs, backgroundColor: colors.progressTrackStrong },
  progressFill: { height: "100%", borderRadius: radius.xs, backgroundColor: colors.primary }
});
