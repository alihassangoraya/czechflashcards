import React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from "react-native";
import { useI18n } from "../i18n/I18nProvider";
import { colors } from "../theme/design";

export function AppLoadingScreen() {
  const { t } = useI18n();

  return (
    <SafeAreaView style={styles.shell}>
      <ActivityIndicator />
      <Text style={styles.muted}>{t("app.loading")}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: colors.background },
  muted: { color: colors.textMuted, lineHeight: 20 }
});
