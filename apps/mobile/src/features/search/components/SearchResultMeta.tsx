import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../../theme/design";

export function SearchResultMeta({ count }: { count: number }) {
  return (
    <View style={styles.meta}>
      <Text style={styles.count}>{count} {count === 1 ? "match" : "matches"}</Text>
      <Text style={styles.scope}>Across all vocabulary</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  meta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  count: { color: colors.textStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  scope: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
