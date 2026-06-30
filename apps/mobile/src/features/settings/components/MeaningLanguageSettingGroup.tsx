import React from "react";
import { useI18n } from "../../../i18n/I18nProvider";
import { languageDisplayNames } from "../../../i18n/languageDisplayNames";
import type { StudySettings } from "../../../database";
import { ChoiceSegment } from "./ChoiceSegment";
import { PreferenceRow } from "./PreferenceRow";
import { SettingGroup } from "./SettingGroup";

type Props = {
  meaningLanguage: StudySettings["meaningLanguage"];
  onChange: (meaningLanguage: StudySettings["meaningLanguage"]) => void;
};

export function MeaningLanguageSettingGroup({ meaningLanguage, onChange }: Props) {
  const { t } = useI18n();
  const value = languageDisplayNames[meaningLanguage];

  return (
    <SettingGroup>
      <PreferenceRow icon="translate" title={t("settings.meaningLanguage")} value={value} />
      <ChoiceSegment value={meaningLanguage} options={["hi", "ur"]} labels={{ hi: languageDisplayNames.hi, ur: languageDisplayNames.ur }} onChange={onChange} />
    </SettingGroup>
  );
}
