import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export function SearchPrompt() {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.prompt}>
      <View style={styles.icon}><MaterialIcons name="manage-search" size={size.iconMedium} color={colors.action} /></View>
      <View style={styles.copy}>
        <Text style={[styles.title, { textAlign }]}>{t("search.findTitle")}</Text>
        <Text style={[styles.text, { textAlign }]}>{t("search.findCopy", { count: "7,000" })}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  prompt: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  icon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.actionSoft },
  copy: { flex: 1, gap: spacing.xxs },
  title: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  text: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
