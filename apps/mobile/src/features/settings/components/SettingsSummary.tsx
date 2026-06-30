import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  examLevel: string;
  activeDeckLabel: string;
  dailyGoal: number;
};

export function SettingsSummary({ examLevel, activeDeckLabel, dailyGoal }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.summary}>
      <View style={styles.summaryIcon}>
        <MaterialIcons name="tune" size={size.iconMedium} color={colors.primaryDeep} />
      </View>
      <View style={styles.summaryCopy}>
        <Text style={[styles.summaryTitle, { textAlign }]}>{t("settings.summaryTitle")}</Text>
        <Text style={[styles.summaryText, { textAlign }]}>{t("settings.summaryText", { level: examLevel.toUpperCase(), deck: activeDeckLabel, count: dailyGoal })}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  summary: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  summaryIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primarySoft },
  summaryCopy: { flex: 1, gap: spacing.xs },
  summaryTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  summaryText: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.titleSmall }
});
