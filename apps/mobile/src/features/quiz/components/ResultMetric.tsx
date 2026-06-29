import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, size, spacing, typography } from "../../../theme/design";

type Props = {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  value: string;
  label: string;
  color: string;
};

export function ResultMetric({ icon, value, label, color }: Props) {
  return (
    <View style={styles.resultMetric}>
      <MaterialIcons name={icon} size={size.iconSmall} color={color} />
      <Text style={styles.resultMetricValue}>{value}</Text>
      <Text style={styles.resultMetricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  resultMetric: { flex: 1, alignItems: "center", gap: spacing.xs },
  resultMetricValue: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightBold },
  resultMetricLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
