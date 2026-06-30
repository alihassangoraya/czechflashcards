import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons, { type MaterialIconName } from "../../../components/MaterialIcons";
import { colors, size, spacing, typography } from "../../../theme/design";

type Props = {
  icon: MaterialIconName;
  title: string;
  value: string;
};

export function PreferenceRow({ icon, title, value }: Props) {
  return (
    <View style={styles.preferenceRow}>
      <MaterialIcons name={icon} size={size.iconSmall} color={colors.textMuted} />
      <Text style={styles.preferenceTitle}>{title}</Text>
      <Text style={styles.preferenceValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  preferenceRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  preferenceTitle: { flex: 1, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  preferenceValue: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold }
});
