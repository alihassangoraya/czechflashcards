import React from "react";
import { useI18n } from "../../../i18n/I18nProvider";
import type { ThemePreference } from "../../../theme/design";
import { ChoiceSegment } from "./ChoiceSegment";
import { PreferenceRow } from "./PreferenceRow";
import { SettingGroup } from "./SettingGroup";

type Props = {
  themeMode: ThemePreference;
  onChange: (themeMode: ThemePreference) => void;
};

export function ThemeModeSettingGroup({ themeMode, onChange }: Props) {
  const { t } = useI18n();
  const labels = { system: t("settings.themeSystem"), light: t("settings.themeLight"), dark: t("settings.themeDark") };

  return (
    <SettingGroup>
      <PreferenceRow icon="auto-awesome" title={t("settings.themeMode")} value={labels[themeMode]} />
      <ChoiceSegment value={themeMode} options={["system", "light", "dark"]} labels={labels} onChange={onChange} />
    </SettingGroup>
  );
}
