import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  disabled: boolean;
  label: string;
  checked: boolean;
  onPress: () => void;
};

export function QuizPrimaryAction({ disabled, label, checked, onPress }: Props) {
  return (
    <Pressable disabled={disabled} style={[styles.button, disabled && styles.disabled]} onPress={onPress} accessibilityRole="button">
      <Text style={styles.text}>{label}</Text>
      <MaterialIcons name={checked ? "arrow-forward" : "check"} size={size.icon} color={colors.onPrimary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.lg, borderRadius: radius.md, backgroundColor: colors.primaryDeep, paddingHorizontal: spacing.hero },
  text: { color: colors.onPrimary, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  disabled: { opacity: 0.42 }
});
