import React from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import { useI18n } from "../i18n/I18nProvider";
import { colors, size } from "../theme/design";
import { MaterialIcons } from "./MaterialIcons";
import { appLoadingScreenStyles as styles } from "./appLoadingScreenStyles";

export function AppLoadingScreen() {
  const { t } = useI18n();

  return (
    <SafeAreaView style={styles.shell}>
      <View style={styles.card}>
        <View style={styles.mark}>
          <MaterialIcons name="school" size={size.iconLarge} color={colors.primaryDeep} />
        </View>
        <View style={styles.copy}>
          <Text style={styles.title}>{t("app.name")}</Text>
          <Text style={styles.muted}>{t("app.loading")}</Text>
        </View>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </SafeAreaView>
  );
}
