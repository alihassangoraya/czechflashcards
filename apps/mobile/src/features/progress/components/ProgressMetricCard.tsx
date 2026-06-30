import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons, type MaterialIconName } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = { icon: MaterialIconName; label: string; value: string; detail: string; tone: string };

export function ProgressMetricCard({ icon, label, value, detail, tone }: Props) {
  return (
    <View style={styles.card}>
      <View style={[styles.icon, { backgroundColor: tone }]}><MaterialIcons name={icon} size={size.icon} color={colors.textStrong} /></View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: size.progressMetricMinWidth, borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.border, backgroundColor: colors.surface, padding: spacing.lg, gap: spacing.xs },
  icon: { width: size.headerAction, height: size.headerAction, borderRadius: radius.md, alignItems: "center", justifyContent: "center", marginBottom: spacing.xs },
  label: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  value: { color: colors.textStrong, fontSize: typography.display, fontWeight: typography.weightSemibold },
  detail: { color: colors.textBody, fontSize: typography.bodySmall, fontWeight: typography.weightMedium }
});
