import React from "react";
import type { StudySettings } from "../../../database";
import { useI18n } from "../../../i18n/I18nProvider";
import { AppLanguageSettingGroup } from "./AppLanguageSettingGroup";
import { ChoiceSegment } from "./ChoiceSegment";
import { DailyTargetStepper } from "./DailyTargetStepper";
import { DeckPicker } from "./DeckPicker";
import { PreferenceRow } from "./PreferenceRow";
import { SettingGroup } from "./SettingGroup";
import { SettingsSection } from "./SettingsSection";

type Props = {
  settings: StudySettings;
  activeDeckLabel: string;
  onUpdate: (settings: Partial<StudySettings>) => void;
  onExamLevelChange: (examLevel: StudySettings["examLevel"]) => void;
};

export function StudyPlanSection({ settings, activeDeckLabel, onUpdate, onExamLevelChange }: Props) {
  const { t } = useI18n();

  return (
    <SettingsSection icon="school" title={t("settings.studyPlan")} description={t("settings.studyPlanDescription")}>
      <AppLanguageSettingGroup appLanguage={settings.appLanguage} onChange={(appLanguage) => onUpdate({ appLanguage })} />

      <SettingGroup>
        <PreferenceRow icon="flag" title={t("settings.examLevel")} value={settings.examLevel.toUpperCase()} />
        <ChoiceSegment value={settings.examLevel} options={["a2", "b1"]} labels={{ a2: "A2", b1: "B1" }} onChange={onExamLevelChange} />
      </SettingGroup>

      <SettingGroup>
        <PreferenceRow icon="layers" title={t("settings.activeDeck")} value={activeDeckLabel} />
        <DeckPicker value={settings.deckFilter} decks={settings.customDecks} onChange={(deckFilter) => onUpdate({ deckFilter })} />
      </SettingGroup>

      <SettingGroup>
        <PreferenceRow icon="translate" title={t("settings.meaningLanguage")} value={settings.meaningLanguage === "ur" ? t("language.urdu") : t("language.hindi")} />
        <ChoiceSegment value={settings.meaningLanguage} options={["hi", "ur"]} labels={{ hi: t("language.hindi"), ur: t("language.urdu") }} onChange={(meaningLanguage) => onUpdate({ meaningLanguage })} />
      </SettingGroup>

      <DailyTargetStepper dailyGoal={settings.dailyGoal} onChange={(dailyGoal) => onUpdate({ dailyGoal })} />
    </SettingsSection>
  );
}
