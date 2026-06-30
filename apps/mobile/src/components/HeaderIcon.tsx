import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons, type MaterialIconName } from "./MaterialIcons";
import { colors, radius, size, spacing } from "../theme/design";

export function HeaderIcon({ icon, label, onPress, primary = false }: { icon: MaterialIconName; label: string; onPress: () => void; primary?: boolean }) {
  return (
    <Pressable style={[styles.headerIcon, primary && styles.headerIconPrimary]} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={icon} size={size.iconMedium} color={primary ? colors.onPrimary : colors.textStrong} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.border, backgroundColor: colors.surface },
  headerIconPrimary: { borderColor: colors.action, backgroundColor: colors.action }
});
