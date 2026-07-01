import React from "react";
import { useI18n } from "../../../i18n/I18nProvider";
import { ChoiceSegment } from "./ChoiceSegment";
import { DailyTargetStepper } from "./DailyTargetStepper";
import { DeckPicker } from "./DeckPicker";
import { PreferenceRow } from "./PreferenceRow";
import { SettingGroup } from "./SettingGroup";
import { SettingsSection } from "./SettingsSection";
import type { StudyPlanSectionProps } from "./studyPlanSectionTypes";

export function StudyPlanSection({ settings, activeDeckLabel, onUpdate, onExamLevelChange }: StudyPlanSectionProps) {
  const { t } = useI18n();

  return (
    <SettingsSection icon="school" title={t("settings.studyPlan")} description={t("settings.studyPlanDescription")}>
      <SettingGroup>
        <PreferenceRow icon="flag" title={t("settings.examLevel")} value={settings.examLevel.toUpperCase()} />
        <ChoiceSegment value={settings.examLevel} options={["a2", "b1"]} labels={{ a2: "A2", b1: "B1" }} onChange={onExamLevelChange} />
      </SettingGroup>

      <SettingGroup>
        <PreferenceRow icon="layers" title={t("settings.activeDeck")} value={activeDeckLabel} />
        <DeckPicker value={settings.deckFilter} decks={settings.customDecks} onChange={(deckFilter) => onUpdate({ deckFilter })} />
      </SettingGroup>

      <DailyTargetStepper dailyGoal={settings.dailyGoal} onChange={(dailyGoal) => onUpdate({ dailyGoal })} />
    </SettingsSection>
  );
}
