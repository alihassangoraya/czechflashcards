import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons, type MaterialIconName } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = { icon: MaterialIconName; label: string; displayLabel: string; onPress: () => void; saved?: boolean };

export function SearchActionButton({ icon, label, displayLabel, onPress, saved }: Props) {
  return (
    <Pressable style={[styles.action, saved && styles.savedAction]} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={icon} size={size.iconSmall} color={saved ? colors.onPrimary : colors.action} />
      <Text style={[styles.label, saved && styles.savedLabel]} numberOfLines={1}>{displayLabel}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  action: {
    minHeight: size.cardAction,
    maxWidth: size.searchActionMaxWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    borderWidth: spacing.hairline,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceWarm,
    paddingHorizontal: spacing.smd
  },
  label: { flexShrink: 1, color: colors.action, fontSize: typography.caption, fontWeight: typography.weightMedium },
  savedAction: { borderColor: colors.primaryDeep, backgroundColor: colors.primaryDeep },
  savedLabel: { color: colors.onPrimary }
});
