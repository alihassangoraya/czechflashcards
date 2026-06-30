import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import type { StudySettings } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { ChoiceSegment } from "./ChoiceSegment";
import { SettingGroup } from "./SettingGroup";
import { SettingsSection } from "./SettingsSection";
import { TogglePreference } from "./TogglePreference";

type Props = {
  notifications: StudySettings["notifications"];
  customReminderTime: string;
  onChange: (patch: Partial<StudySettings["notifications"]>) => void;
  onCustomReminderTimeChange: (value: string) => void;
  onCommitCustomReminderTime: () => void;
  onSetReminderTime: (value: string) => void;
};

export function ReminderSettingsSection({ notifications, customReminderTime, onChange, onCustomReminderTimeChange, onCommitCustomReminderTime, onSetReminderTime }: Props) {
  const { t, textAlign, direction } = useI18n();

  return (
    <SettingsSection icon="notifications" title={t("settings.reminders")} description={t("settings.remindersDescription")}>
      <SettingGroup>
        <TogglePreference icon="notifications" title={t("settings.dailyReminder")} detail={t("settings.dailyReminderDetail")} value={notifications.dailyReminderEnabled} onChange={(value) => onChange({ dailyReminderEnabled: value })} />
        {notifications.dailyReminderEnabled && (
          <View style={styles.reminderTimeBlock}>
            <View style={styles.reminderTime}>
              <Text style={[styles.reminderTimeLabel, { textAlign }]}>{t("settings.reminderTime")}</Text>
              <ChoiceSegment value={notifications.dailyReminderTime} options={["08:00", "12:00", "19:00"]} labels={{ "08:00": "08:00", "12:00": "12:00", "19:00": "19:00" }} onChange={onSetReminderTime} compact />
            </View>
            <View style={styles.customTimeRow}>
              <MaterialIcons name="schedule" size={size.iconSmall} color={colors.textMuted} />
              <TextInput
                style={[styles.timeInput, { textAlign, writingDirection: direction }]}
                value={customReminderTime}
                onChangeText={onCustomReminderTimeChange}
                onBlur={onCommitCustomReminderTime}
                onSubmitEditing={onCommitCustomReminderTime}
                placeholder="HH:mm"
                placeholderTextColor={colors.textMuted}
                keyboardType="numbers-and-punctuation"
                maxLength={5}
                returnKeyType="done"
                accessibilityLabel={t("settings.customReminderTime")}
              />
              <Text style={[styles.timeHint, { textAlign }]}>{t("settings.timeHint")}</Text>
            </View>
          </View>
        )}
        <TogglePreference icon="local-fire-department" title={t("settings.streakProtection")} detail={t("settings.streakProtectionDetail")} value={notifications.streakRiskEnabled} onChange={(value) => onChange({ streakRiskEnabled: value })} />
        <TogglePreference icon="schedule" title={t("settings.reviewsDue")} detail={t("settings.reviewsDueDetail")} value={notifications.reviewDueEnabled} onChange={(value) => onChange({ reviewDueEnabled: value })} />
      </SettingGroup>
    </SettingsSection>
  );
}

const styles = StyleSheet.create({
  reminderTimeBlock: { gap: spacing.lg, borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xl },
  reminderTime: { flexDirection: "row", alignItems: "center", gap: spacing.xl },
  reminderTimeLabel: { flex: 1, color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  customTimeRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, paddingHorizontal: spacing.lg },
  timeInput: { minWidth: size.timeInputMinWidth, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold, paddingVertical: spacing.smd },
  timeHint: { flex: 1, color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
