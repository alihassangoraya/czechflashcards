import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons, { type MaterialIconName } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export function RelatedWords({ label, icon, value, color }: { label: string; icon: MaterialIconName; value: string; color: string }) {
  const words = value.split(",").map((word) => word.trim()).filter(Boolean);
  if (!words.length) return null;
  return (
    <View style={styles.relatedWords}>
      <View style={styles.header}>
        <MaterialIcons name={icon} size={size.iconSmall} color={color} />
        <Text style={[styles.label, { color }]}>{label}</Text>
      </View>
      <View style={styles.chips}>
        {words.map((word) => <Text key={word} style={styles.chip}>{word}</Text>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  relatedWords: { gap: spacing.smd },
  header: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  label: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.smd },
  chip: { overflow: "hidden", borderRadius: radius.sm, backgroundColor: colors.surfaceMuted, color: colors.textExample, fontSize: typography.bodySmall, fontWeight: typography.weightMedium, paddingHorizontal: spacing.md, paddingVertical: spacing.xs }
});
