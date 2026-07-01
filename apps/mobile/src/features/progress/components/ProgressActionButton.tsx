import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons, type MaterialIconName } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = { label: string; icon: MaterialIconName; primary?: boolean; onPress: () => void };

export function ProgressActionButton({ label, icon, primary, onPress }: Props) {
  return (
    <Pressable style={[styles.button, primary ? styles.primary : styles.secondary]} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={icon} size={size.iconSmall} color={primary ? colors.onPrimary : colors.iconPrimary} />
      <Text style={[styles.label, primary ? styles.primaryLabel : styles.secondaryLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { flex: 1, minHeight: size.actionMinHeight, minWidth: size.progressMetricMinWidth, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.md, borderRadius: radius.lg, paddingHorizontal: spacing.xl },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border },
  label: { fontSize: typography.body, fontWeight: typography.weightSemibold },
  primaryLabel: { color: colors.onPrimary },
  secondaryLabel: { color: colors.primary }
});
