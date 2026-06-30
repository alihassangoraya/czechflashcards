import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons, type MaterialIconName } from "../../../components/MaterialIcons";
import { colors, radius, size, spacing } from "../../../theme/design";

type Props = {
  icon: MaterialIconName;
  label: string;
  onPress: () => void;
  saved?: boolean;
};

export function SearchActionButton({ icon, label, onPress, saved }: Props) {
  return (
    <Pressable style={[styles.action, saved && styles.savedAction]} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={icon} size={size.iconSmall} color={saved ? colors.onPrimary : colors.action} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  action: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm },
  savedAction: { borderColor: colors.primaryDeep, backgroundColor: colors.primaryDeep }
});
