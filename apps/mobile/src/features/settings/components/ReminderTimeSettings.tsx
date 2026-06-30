import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { StudySettings } from "../../../database";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, spacing, typography } from "../../../theme/design";
import { ChoiceSegment } from "./ChoiceSegment";
import { CustomReminderTimeInput } from "./CustomReminderTimeInput";

type Props = {
  notifications: StudySettings["notifications"];
  customReminderTime: string;
  onCustomReminderTimeChange: (value: string) => void;
  onCommitCustomReminderTime: () => void;
  onSetReminderTime: (value: string) => void;
};

export function ReminderTimeSettings({ notifications, customReminderTime, onCustomReminderTimeChange, onCommitCustomReminderTime, onSetReminderTime }: Props) {
  const { t, textAlign } = useI18n();

  return (
    <View style={styles.block}>
      <View style={styles.presetRow}>
        <Text style={[styles.label, { textAlign }]}>{t("settings.reminderTime")}</Text>
        <ChoiceSegment value={notifications.dailyReminderTime} options={["08:00", "12:00", "19:00"]} labels={{ "08:00": "08:00", "12:00": "12:00", "19:00": "19:00" }} onChange={onSetReminderTime} compact />
      </View>
      <CustomReminderTimeInput customReminderTime={customReminderTime} onChange={onCustomReminderTimeChange} onCommit={onCommitCustomReminderTime} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: spacing.lg, borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xl },
  presetRow: { flexDirection: "row", alignItems: "center", gap: spacing.xl },
  label: { flex: 1, color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightMedium }
});
