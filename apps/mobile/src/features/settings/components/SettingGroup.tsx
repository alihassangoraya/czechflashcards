import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, radius, spacing } from "../../../theme/design";
import type { SettingGroupProps } from "./settingGroupTypes";

export function SettingGroup({ children }: SettingGroupProps) {
  return <View style={styles.settingGroup}>{children}</View>;
}

const styles = StyleSheet.create({
  settingGroup: { gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceSecondary, padding: spacing.lg }
});
