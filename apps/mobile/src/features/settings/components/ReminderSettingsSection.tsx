import React from "react";
import type { StudySettings } from "../../../database";
import { useI18n } from "../../../i18n/I18nProvider";
import { notificationCapability } from "../../../services/notifications";
import { ReminderCapabilityNotice } from "./ReminderCapabilityNotice";
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
  const capability = notificationCapability();
  const unsupported = capability === "unsupported";

  return (
    <SettingsSection icon="notifications" title={t("settings.reminders")} description={t("settings.remindersDescription")}>
      <SettingGroup>
        <ReminderCapabilityNotice capability={capability} />
        <TogglePreference disabled={unsupported} icon="notifications" title={t("settings.dailyReminder")} detail={t("settings.dailyReminderDetail")} value={notifications.dailyReminderEnabled} onChange={(value) => onChange({ dailyReminderEnabled: value })} />
        {notifications.dailyReminderEnabled && <ReminderTimeSettings notifications={notifications} customReminderTime={customReminderTime} onCustomReminderTimeChange={onCustomReminderTimeChange} onCommitCustomReminderTime={onCommitCustomReminderTime} onSetReminderTime={onSetReminderTime} />}
        <TogglePreference disabled={unsupported} icon="local-fire-department" title={t("settings.streakProtection")} detail={t("settings.streakRiskQueued")} value={notifications.streakRiskEnabled} onChange={(value) => onChange({ streakRiskEnabled: value })} />
        <TogglePreference disabled={unsupported} icon="schedule" title={t("settings.reviewsDue")} detail={t("settings.reviewDueQueued")} value={notifications.reviewDueEnabled} onChange={(value) => onChange({ reviewDueEnabled: value })} />
      </SettingGroup>
    </SettingsSection>
  );
}
