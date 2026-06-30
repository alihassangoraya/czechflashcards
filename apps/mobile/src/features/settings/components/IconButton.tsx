import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons, type MaterialIconName } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing } from "../../../theme/design";

type Props = {
  icon: MaterialIconName;
  label: string;
  disabled?: boolean;
  onPress: () => void;
};

export function IconButton({ icon, label, disabled = false, onPress }: Props) {
  return (
    <Pressable disabled={disabled} style={[styles.iconButton, disabled && styles.iconButtonDisabled]} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={icon} size={size.icon} color={colors.primaryDeep} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: { width: size.touchTarget, height: size.touchTarget, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm },
  iconButtonDisabled: { opacity: 0.42 }
});
