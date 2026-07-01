import React from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "./MaterialIcons";
import { colors, size } from "../theme/design";
import { appToastStyles as styles } from "./appToastStyles";
import type { AppToastProps } from "./appToastTypes";

export function AppToast({ message }: AppToastProps) {
  if (!message) return null;
  return (
    <View style={styles.toast}>
      <MaterialIcons name="star" size={size.iconSmall} color={colors.onPrimary} />
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
}
