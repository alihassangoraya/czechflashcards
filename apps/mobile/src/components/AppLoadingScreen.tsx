import React from "react";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import { useI18n } from "../i18n/I18nProvider";
import { appLoadingScreenStyles as styles } from "./appLoadingScreenStyles";

export function AppLoadingScreen() {
  const { t } = useI18n();

  return (
    <SafeAreaView style={styles.shell}>
      <ActivityIndicator />
      <Text style={styles.muted}>{t("app.loading")}</Text>
    </SafeAreaView>
  );
}
