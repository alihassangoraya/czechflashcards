import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";
import { IconButton } from "./IconButton";
import { PreferenceRow } from "./PreferenceRow";
import { SettingGroup } from "./SettingGroup";

type Props = {
  dailyGoal: number;
  onChange: (dailyGoal: number) => void;
};

export function DailyTargetStepper({ dailyGoal, onChange }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <SettingGroup>
      <PreferenceRow icon="today" title={t("settings.dailyTarget")} value={t("settings.cardsValue", { count: dailyGoal })} />
      <View style={styles.stepper}>
        <IconButton icon="remove" label={t("settings.reduceDailyTarget")} disabled={dailyGoal <= 5} onPress={() => onChange(Math.max(5, dailyGoal - 5))} />
        <View style={styles.stepperValue}>
          <Text style={[styles.stepperNumber, { textAlign }]}>{dailyGoal}</Text>
          <Text style={[styles.stepperLabel, { textAlign }]}>{t("settings.cardsPerDay")}</Text>
        </View>
        <IconButton icon="add" label={t("settings.increaseDailyTarget")} onPress={() => onChange(Math.min(200, dailyGoal + 5))} />
      </View>
    </SettingGroup>
  );
}

const styles = StyleSheet.create({
  stepper: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.xl },
  stepperValue: { alignItems: "center", gap: spacing.xxs },
  stepperNumber: { color: colors.textStrong, fontSize: typography.screenTitle, fontWeight: typography.weightBold },
  stepperLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
