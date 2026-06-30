import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

export function AddWordIntro() {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.intro}>
      <View style={styles.icon}><MaterialIcons name="add-circle-outline" size={size.iconMedium} color={colors.primaryDeep} /></View>
      <View style={styles.copy}>
        <Text style={[styles.title, { textAlign }]}>{t("words.introTitle")}</Text>
        <Text style={[styles.text, { textAlign }]}>{t("words.introCopy")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  icon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primarySoft },
  copy: { flex: 1, gap: spacing.xxs },
  title: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  text: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge }
});
