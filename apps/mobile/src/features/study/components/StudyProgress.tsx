import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../../theme/design";

type Props = {
  sessionReviews: number;
  sessionTarget: number;
  reviewedToday: number;
  dailyGoal: number;
  sessionProgress: number;
};

export function StudyProgress({ sessionReviews, sessionTarget, reviewedToday, dailyGoal, sessionProgress }: Props) {
  return (
    <View style={styles.sessionProgressRow}>
      <Text style={styles.sessionProgressText}>Card {sessionReviews + 1} of {sessionTarget} · Today {reviewedToday} / {dailyGoal}</Text>
      <View style={styles.sessionProgressTrack}>
        <View style={[styles.sessionProgressFill, { width: `${Math.max(3, sessionProgress * 100)}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sessionProgressRow: { width: 250, alignSelf: "center", gap: 5, marginTop: 1, marginBottom: 12 },
  sessionProgressText: { color: colors.textSubtle, fontSize: typography.caption, fontWeight: typography.weightMedium, textAlign: "center" },
  sessionProgressTrack: { height: spacing.sm, overflow: "hidden", borderRadius: spacing.xs, backgroundColor: colors.progressTrackStrong },
  sessionProgressFill: { height: "100%", borderRadius: spacing.xs, backgroundColor: colors.primary }
});
