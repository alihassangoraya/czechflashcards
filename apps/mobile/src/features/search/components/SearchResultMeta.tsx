import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";

export function SearchResultMeta({ count }: { count: number }) {
  const { t, textAlign } = useI18n();
  const label = count === 1 ? t("search.match") : t("search.matchesPlural");

  return (
    <View style={styles.meta}>
      <Text style={[styles.count, { textAlign }]}>{t("search.matches", { count, label })}</Text>
      <Text style={[styles.scope, { textAlign }]}>{t("search.scope")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  meta: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  count: { color: colors.textStrong, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  scope: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
