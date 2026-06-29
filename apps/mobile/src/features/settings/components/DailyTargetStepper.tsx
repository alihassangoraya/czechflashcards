import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, typography } from "../../../theme/design";
import { IconButton } from "./IconButton";
import { PreferenceRow } from "./PreferenceRow";
import { SettingGroup } from "./SettingGroup";

type Props = {
  dailyGoal: number;
  onChange: (dailyGoal: number) => void;
};

export function DailyTargetStepper({ dailyGoal, onChange }: Props) {
  return (
    <SettingGroup>
      <PreferenceRow icon="today" title="Daily target" value={`${dailyGoal} cards`} />
      <View style={styles.stepper}>
        <IconButton icon="remove" label="Reduce daily target" disabled={dailyGoal <= 5} onPress={() => onChange(Math.max(5, dailyGoal - 5))} />
        <View style={styles.stepperValue}>
          <Text style={styles.stepperNumber}>{dailyGoal}</Text>
          <Text style={styles.stepperLabel}>cards / day</Text>
        </View>
        <IconButton icon="add" label="Increase daily target" onPress={() => onChange(Math.min(200, dailyGoal + 5))} />
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
