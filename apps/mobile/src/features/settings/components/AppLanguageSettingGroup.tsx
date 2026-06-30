import React from "react";
import type { StudySettings } from "../../../database";
import { useI18n } from "../../../i18n/I18nProvider";
import { languageDisplayNames } from "../../../i18n/languageDisplayNames";
import { languageOptions, type LanguageCode } from "../../../i18n/translations";
import { ChoiceSegment } from "./ChoiceSegment";
import { PreferenceRow } from "./PreferenceRow";
import { SettingGroup } from "./SettingGroup";

type Props = {
  appLanguage: StudySettings["appLanguage"];
  onChange: (appLanguage: StudySettings["appLanguage"]) => void;
};

export function AppLanguageSettingGroup({ appLanguage, onChange }: Props) {
  const { t } = useI18n();
  const languageLabels: Record<LanguageCode, string> = languageDisplayNames;

  return (
    <SettingGroup>
      <PreferenceRow icon="translate" title={t("settings.appLanguage")} value={languageLabels[appLanguage]} />
      <ChoiceSegment value={appLanguage} options={languageOptions} labels={languageLabels} onChange={onChange} />
    </SettingGroup>
  );
}
