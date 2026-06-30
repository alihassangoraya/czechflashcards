import React from "react";
import { StyleSheet, Text } from "react-native";
import { useI18n } from "../../i18n/I18nProvider";
import { colors } from "../../theme/design";

export function GrammarEmptyState() {
  const { t } = useI18n();
  return <Text style={styles.muted}>{t("grammar.empty")}</Text>;
}

const styles = StyleSheet.create({
  muted: { color: colors.textMuted, lineHeight: 20 }
});
