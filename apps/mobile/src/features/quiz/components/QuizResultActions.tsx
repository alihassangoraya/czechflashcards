import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  restartLabel: string;
  closeLabel: string;
  onRestart: () => void;
  onClose: () => void;
};

export function QuizResultActions({ restartLabel, closeLabel, onRestart, onClose }: Props) {
  return (
    <>
      <Pressable style={styles.primaryButton} onPress={onRestart} accessibilityRole="button">
        <MaterialIcons name="refresh" size={size.icon} color={colors.onPrimary} />
        <Text style={styles.primaryText}>{restartLabel}</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={onClose} accessibilityRole="button">
        <MaterialIcons name="home" size={size.icon} color={colors.primaryDeep} />
        <Text style={styles.secondaryText}>{closeLabel}</Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  primaryButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.lg, borderRadius: radius.md, backgroundColor: colors.primaryDeep, paddingHorizontal: spacing.hero },
  primaryText: { color: colors.onPrimary, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  secondaryButton: { minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.hero },
  secondaryText: { color: colors.primaryDeep, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold }
});
