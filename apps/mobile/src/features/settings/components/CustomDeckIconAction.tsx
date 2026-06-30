import React from "react";
import { Pressable } from "react-native";
import { MaterialIcons, type MaterialIconName } from "../../../components/MaterialIcons";
import { size } from "../../../theme/design";
import { customDeckRowStyles as styles } from "./customDeckRowStyles";

type Props = {
  icon: MaterialIconName;
  color: string;
  label: string;
  onPress: () => void;
};

export function CustomDeckIconAction({ icon, color, label, onPress }: Props) {
  return (
    <Pressable style={styles.iconAction} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={icon} size={size.iconSmall} color={color} />
    </Pressable>
  );
}
