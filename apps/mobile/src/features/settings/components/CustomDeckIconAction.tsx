import React from "react";
import { Pressable } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { size } from "../../../theme/design";
import { customDeckRowStyles as styles } from "./customDeckRowStyles";

type Props = {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
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
