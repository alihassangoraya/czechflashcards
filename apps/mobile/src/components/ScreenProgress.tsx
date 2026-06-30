import React from "react";
import { StyleSheet, Text, View, type DimensionValue } from "react-native";
import { colors, radius, size, spacing, typography } from "../theme/design";

type Props = {
  title: string;
  progress: number;
  meta?: string;
  centered?: boolean;
};

export function ScreenProgress({ title, progress, meta, centered }: Props) {
  const width = `${Math.min(100, Math.max(3, progress * 100))}%` as DimensionValue;

  return (
    <View style={[styles.section, centered && styles.centered]}>
      <View style={[styles.labels, centered && styles.centeredLabels]}>
        <Text style={[styles.title, centered && styles.centeredText]}>{title}</Text>
        {meta ? <Text style={[styles.meta, centered && styles.centeredText]}>{meta}</Text> : null}
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.smd },
  centered: { width: "100%", maxWidth: size.studyProgressMaxWidth, alignSelf: "center", marginTop: spacing.xs, marginBottom: spacing.xl },
  labels: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: spacing.lg },
  centeredLabels: { justifyContent: "center" },
  title: { color: colors.textStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  meta: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  centeredText: { color: colors.textSubtle, textAlign: "center" },
  track: { height: spacing.md, overflow: "hidden", borderRadius: radius.xs, backgroundColor: colors.progressTrackStrong },
  fill: { height: "100%", borderRadius: radius.xs, backgroundColor: colors.primary }
});
