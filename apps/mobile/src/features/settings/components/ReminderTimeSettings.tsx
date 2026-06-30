import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import type { StudySettings } from "../../../database";
import MaterialIcons from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { ChoiceSegment } from "./ChoiceSegment";

type Props = {
  notifications: StudySettings["notifications"];
  customReminderTime: string;
  onCustomReminderTimeChange: (value: string) => void;
  onCommitCustomReminderTime: () => void;
  onSetReminderTime: (value: string) => void;
};

export function ReminderTimeSettings({ notifications, customReminderTime, onCustomReminderTimeChange, onCommitCustomReminderTime, onSetReminderTime }: Props) {
  const { t, textAlign, direction } = useI18n();

  return (
    <View style={styles.block}>
      <View style={styles.presetRow}>
        <Text style={[styles.label, { textAlign }]}>{t("settings.reminderTime")}</Text>
        <ChoiceSegment value={notifications.dailyReminderTime} options={["08:00", "12:00", "19:00"]} labels={{ "08:00": "08:00", "12:00": "12:00", "19:00": "19:00" }} onChange={onSetReminderTime} compact />
      </View>
      <View style={styles.customRow}>
        <MaterialIcons name="schedule" size={size.iconSmall} color={colors.textMuted} />
        <TextInput
          style={[styles.input, { textAlign, writingDirection: direction }]}
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
        <Text style={[styles.hint, { textAlign }]}>{t("settings.timeHint")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: spacing.lg, borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xl },
  presetRow: { flexDirection: "row", alignItems: "center", gap: spacing.xl },
  label: { flex: 1, color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  customRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, paddingHorizontal: spacing.lg },
  input: { minWidth: size.timeInputMinWidth, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold, paddingVertical: spacing.smd },
  hint: { flex: 1, color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium }
});
