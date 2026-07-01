import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";

export function OfflineAccountPanel() {
  const { t } = useI18n();

  return (
    <View style={styles.form}>
      <Text style={styles.muted}>{t("account.offlineAvailable")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: spacing.xlPlus },
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm }
});
