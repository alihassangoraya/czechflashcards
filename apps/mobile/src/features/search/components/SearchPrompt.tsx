import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export function SearchPrompt() {
  return (
    <View style={styles.prompt}>
      <View style={styles.icon}><MaterialIcons name="manage-search" size={size.iconMedium} color={colors.action} /></View>
      <View style={styles.copy}>
        <Text style={styles.title}>Find a word</Text>
        <Text style={styles.text}>Search all 6,000+ cards in Czech, English, Hindi, or Urdu.</Text>
      </View>
    </View>
  );
}

export function SearchNoResults() {
  return (
    <View style={styles.noResults}>
      <MaterialIcons name="search-off" size={size.iconMedium} color={colors.textMuted} />
      <Text style={styles.noResultsTitle}>No matching words</Text>
      <Text style={styles.noResultsText}>Try a shorter spelling or another language.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  prompt: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  icon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.actionSoft },
  copy: { flex: 1, gap: spacing.xxs },
  title: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  text: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  noResults: { alignItems: "center", gap: spacing.smd, paddingVertical: spacing.hero },
  noResultsTitle: { color: colors.textStrong, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold },
  noResultsText: { color: colors.textMuted, fontSize: typography.bodySmall, textAlign: "center" }
});
