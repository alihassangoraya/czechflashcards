import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../../theme/design";

type Props = {
  label: string;
};

export function GeminiTutorLoadingState({ label }: Props) {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color={colors.iconWarning} />
      <Text style={styles.muted}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: { alignItems: "center", gap: spacing.lgPlus, paddingVertical: spacing.panel },
  muted: { color: colors.muted, fontWeight: typography.weightRegular }
});
