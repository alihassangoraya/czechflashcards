import React from "react";
import type { StudySettings } from "../../../database";
import { useI18n } from "../../../i18n/I18nProvider";
import { ReminderTimeSettings } from "./ReminderTimeSettings";
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
  const { t } = useI18n();

  return (
    <SettingsSection icon="notifications" title={t("settings.reminders")} description={t("settings.remindersDescription")}>
      <SettingGroup>
        <TogglePreference icon="notifications" title={t("settings.dailyReminder")} detail={t("settings.dailyReminderDetail")} value={notifications.dailyReminderEnabled} onChange={(value) => onChange({ dailyReminderEnabled: value })} />
        {notifications.dailyReminderEnabled && <ReminderTimeSettings notifications={notifications} customReminderTime={customReminderTime} onCustomReminderTimeChange={onCustomReminderTimeChange} onCommitCustomReminderTime={onCommitCustomReminderTime} onSetReminderTime={onSetReminderTime} />}
        <TogglePreference icon="local-fire-department" title={t("settings.streakProtection")} detail={t("settings.streakProtectionDetail")} value={notifications.streakRiskEnabled} onChange={(value) => onChange({ streakRiskEnabled: value })} />
        <TogglePreference icon="schedule" title={t("settings.reviewsDue")} detail={t("settings.reviewsDueDetail")} value={notifications.reviewDueEnabled} onChange={(value) => onChange({ reviewDueEnabled: value })} />
      </SettingGroup>
    </SettingsSection>
  );
}
