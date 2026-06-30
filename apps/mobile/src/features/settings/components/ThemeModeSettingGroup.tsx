import React from "react";
import { useI18n } from "../../../i18n/I18nProvider";
import type { ThemeMode } from "../../../theme/design";
import { ChoiceSegment } from "./ChoiceSegment";
import { PreferenceRow } from "./PreferenceRow";
import { SettingGroup } from "./SettingGroup";

type Props = {
  themeMode: ThemeMode;
  onChange: (themeMode: ThemeMode) => void;
};

export function ThemeModeSettingGroup({ themeMode, onChange }: Props) {
  const { t } = useI18n();

  return (
    <SettingGroup>
      <PreferenceRow icon="auto-awesome" title={t("settings.themeMode")} value={themeMode === "dark" ? t("settings.themeDark") : t("settings.themeLight")} />
      <ChoiceSegment value={themeMode} options={["light", "dark"]} labels={{ light: t("settings.themeLight"), dark: t("settings.themeDark") }} onChange={onChange} />
    </SettingGroup>
  );
}
