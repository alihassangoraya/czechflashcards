import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons, type MaterialIconName } from "../../../components/MaterialIcons";
import { colors, radius, size } from "../../../theme/design";

export function HeroIcon({ icon, label, onPress }: { icon: MaterialIconName; label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.icon} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={icon} size={size.iconSmall} color={colors.heroText} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: { width: size.cardAction, height: size.cardAction, borderRadius: radius.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.heroControl }
});
