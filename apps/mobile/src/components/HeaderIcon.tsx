import React from "react";
import { Pressable } from "react-native";
import { MaterialIcons } from "./MaterialIcons";
import { colors, size } from "../theme/design";
import { headerIconStyles as styles } from "./headerIconStyles";
import type { HeaderIconProps } from "./headerIconTypes";

export function HeaderIcon({ icon, label, onPress, primary = false }: HeaderIconProps) {
  return (
    <Pressable style={[styles.headerIcon, primary && styles.headerIconPrimary]} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={icon} size={size.iconMedium} color={primary ? colors.onPrimary : colors.iconDefault} />
    </Pressable>
  );
}
