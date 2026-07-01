import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";

export function AuthDivider() {
  const { t } = useI18n();

  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.text}>{t("account.orEmail")}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  line: { flex: 1, height: spacing.hairline, backgroundColor: colors.border },
  text: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
