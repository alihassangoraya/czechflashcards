import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../../theme/design";

type Props = { title: string; detail?: string };

export function ProgressSectionHeader({ title, detail }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { gap: spacing.xs },
  title: { color: colors.textStrong, fontSize: typography.title, fontWeight: typography.weightSemibold },
  detail: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightMedium }
});
