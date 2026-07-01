import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, size, spacing, typography } from "../../../theme/design";

export function SearchNoResults() {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.noResults}>
      <MaterialIcons name="search-off" size={size.iconMedium} color={colors.iconMuted} />
      <Text style={[styles.title, { textAlign }]}>{t("search.noResultsTitle")}</Text>
      <Text style={[styles.text, { textAlign }]}>{t("search.noResultsCopy")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noResults: { alignItems: "center", gap: spacing.smd, paddingVertical: spacing.hero },
  title: { color: colors.textStrong, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold },
  text: { color: colors.textMuted, fontSize: typography.bodySmall, textAlign: "center" }
});
