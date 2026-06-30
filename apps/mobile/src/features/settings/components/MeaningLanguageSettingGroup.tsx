import React from "react";
import { useI18n } from "../../../i18n/I18nProvider";
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
  const value = meaningLanguage === "ur" ? t("language.urdu") : t("language.hindi");

  return (
    <SettingGroup>
      <PreferenceRow icon="translate" title={t("settings.meaningLanguage")} value={value} />
      <ChoiceSegment value={meaningLanguage} options={["hi", "ur"]} labels={{ hi: t("language.hindi"), ur: t("language.urdu") }} onChange={onChange} />
    </SettingGroup>
  );
}
