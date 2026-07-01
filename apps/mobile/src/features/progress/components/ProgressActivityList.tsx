import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "../../../theme/design";
import { ProgressActivityRow } from "./ProgressActivityRow";
import { ProgressSectionHeader } from "./ProgressSectionHeader";
import type { ProgressDailyPoint } from "../types/progressTypes";

type Props = { title: string; detail: string; points: ProgressDailyPoint[]; doneLabel: string; openLabel: string };

export function ProgressActivityList({ title, detail, points, doneLabel, openLabel }: Props) {
  return (
    <View style={styles.card}>
      <ProgressSectionHeader title={title} detail={detail} />
      {points.slice().reverse().map((point) => <ProgressActivityRow key={point.key} point={point} doneLabel={doneLabel} openLabel={openLabel} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.lg, gap: spacing.md }
});
