import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, size, spacing, typography } from "../../../theme/design";

export function SearchNoResults() {
  return (
    <View style={styles.noResults}>
      <MaterialIcons name="search-off" size={size.iconMedium} color={colors.textMuted} />
      <Text style={styles.title}>No matching words</Text>
      <Text style={styles.text}>Try a shorter spelling or another language.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noResults: { alignItems: "center", gap: spacing.smd, paddingVertical: spacing.hero },
  title: { color: colors.textStrong, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold },
  text: { color: colors.textMuted, fontSize: typography.bodySmall, textAlign: "center" }
});
