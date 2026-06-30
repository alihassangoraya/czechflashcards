import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "./MaterialIcons";
import { colors, radius, shadow, size, spacing, typography } from "../theme/design";

export function AppToast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <View pointerEvents="none" style={styles.toast}>
      <MaterialIcons name="star" size={size.iconSmall} color={colors.onPrimary} />
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: { position: "absolute", left: spacing.page, right: spacing.page, bottom: spacing.hero, alignSelf: "center", minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.primaryDeep, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, ...shadow.soft },
  toastText: { flexShrink: 1, color: colors.onPrimary, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold, textAlign: "center" }
});
