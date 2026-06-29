import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props<T extends string> = {
  value: T;
  options: T[];
  labels: Record<T, string>;
  onChange: (value: T) => void;
  compact?: boolean;
};

export function ChoiceSegment<T extends string>({ value, options, labels, onChange, compact = false }: Props<T>) {
  return (
    <View style={[styles.choiceSegment, compact && styles.choiceSegmentCompact]}>
      {options.map((option) => (
        <Pressable key={option} style={[styles.choiceOption, value === option && styles.choiceOptionActive]} onPress={() => onChange(option)} accessibilityRole="radio" accessibilityState={{ selected: value === option }}>
          <Text style={[styles.choiceText, value === option && styles.choiceTextActive]}>{labels[option]}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  choiceSegment: { flexDirection: "row", gap: spacing.xs, borderRadius: radius.md, backgroundColor: colors.surfaceMuted, padding: spacing.xs },
  choiceSegmentCompact: { flex: 1 },
  choiceOption: { flex: 1, minHeight: size.touchTarget, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, paddingHorizontal: spacing.md },
  choiceOptionActive: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border },
  choiceText: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  choiceTextActive: { color: colors.primaryDeep, fontWeight: typography.weightSemibold }
});
