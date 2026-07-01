import React from "react";
import type { StudySettings } from "../../../database";
import { useI18n } from "../../../i18n/I18nProvider";
import { AppLanguageSettingGroup } from "./AppLanguageSettingGroup";
import { SettingsSection } from "./SettingsSection";
import { ThemeModeSettingGroup } from "./ThemeModeSettingGroup";

type Props = {
  appLanguage: StudySettings["appLanguage"];
  themeMode: StudySettings["themeMode"];
  onAppLanguageChange: (appLanguage: StudySettings["appLanguage"]) => void;
  onThemeModeChange: (themeMode: StudySettings["themeMode"]) => void;
};

export function AppearanceSection({ appLanguage, themeMode, onAppLanguageChange, onThemeModeChange }: Props) {
  const { t } = useI18n();
  return (
    <SettingsSection icon="auto-awesome" title={t("settings.appearance")} description={t("settings.appearanceDescription")}>
      <AppLanguageSettingGroup appLanguage={appLanguage} onChange={onAppLanguageChange} />
      <ThemeModeSettingGroup themeMode={themeMode} onChange={onThemeModeChange} />
    </SettingsSection>
  );
}
