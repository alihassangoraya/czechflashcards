import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import type { StudySettings } from "../../database";
import type { SyncStatus } from "../../sync";
import { ChoiceSegment } from "./components/ChoiceSegment";
import { CustomDeckSection } from "./components/CustomDeckSection";
import { DailyTargetStepper } from "./components/DailyTargetStepper";
import { DataToolsSection } from "./components/DataToolsSection";
import { DeckPicker } from "./components/DeckPicker";
import { PreferenceRow } from "./components/PreferenceRow";
import { ReminderSettingsSection } from "./components/ReminderSettingsSection";
import { SettingGroup } from "./components/SettingGroup";
import { SettingsSection } from "./components/SettingsSection";
import { SettingsSummary } from "./components/SettingsSummary";
import { SyncSettingsSection } from "./components/SyncSettingsSection";
import { deckLabel, normalizeReminderTime, slug } from "./settingsFormat";
import { spacing } from "../../theme/design";

type Props = {
  settings: StudySettings;
  accountEmail: string | null;
  syncStatus: SyncStatus;
  notice?: string;
  onChange: (settings: StudySettings) => void;
  onSyncNow: () => void;
  onAccount: () => void;
  onRestoreJson: () => void;
  onImportCsv: () => void;
  onShuffleDue: () => void;
  onReviewAllNow: () => void;
  onExportProgress: () => void;
  onExportDeck: () => void;
};

export function SettingsPanel({
  settings,
  accountEmail,
  syncStatus,
  notice,
  onChange,
  onSyncNow,
  onAccount,
  onRestoreJson,
  onImportCsv,
  onShuffleDue,
  onReviewAllNow,
  onExportProgress,
  onExportDeck
}: Props) {
  const [deckName, setDeckName] = useState("");
  const [customReminderTime, setCustomReminderTime] = useState(settings.notifications.dailyReminderTime);
  const activeDeckLabel = deckLabel(settings.deckFilter, settings.customDecks);

  useEffect(() => {
    setCustomReminderTime(settings.notifications.dailyReminderTime);
  }, [settings.notifications.dailyReminderTime]);

  function update(patch: Partial<StudySettings>) {
    onChange({ ...settings, ...patch });
  }

  function updateNotifications(patch: Partial<StudySettings["notifications"]>) {
    update({ notifications: { ...settings.notifications, ...patch } });
  }

  function setReminderTime(value: string) {
    setCustomReminderTime(value);
    updateNotifications({ dailyReminderTime: value });
  }

  function commitCustomReminderTime() {
    const normalized = normalizeReminderTime(customReminderTime);
    if (normalized) setReminderTime(normalized);
    else setCustomReminderTime(settings.notifications.dailyReminderTime);
  }

  function createDeck() {
    const name = deckName.trim().replace(/\s+/g, " ");
    if (!name || settings.customDecks.some((deck) => deck.name.toLowerCase() === name.toLowerCase())) return;
    const deck = { id: `deck-${slug(name)}-${Date.now()}`, name };
    update({ customDecks: [...settings.customDecks, deck], deckFilter: deck.id });
    setDeckName("");
  }

  return (
    <View style={styles.root}>
      <SettingsSummary examLevel={settings.examLevel} activeDeckLabel={activeDeckLabel} dailyGoal={settings.dailyGoal} />

      <SettingsSection icon="school" title="Study plan" description="Choose what you want to practice.">
        <SettingGroup>
          <PreferenceRow icon="flag" title="Exam level" value={settings.examLevel.toUpperCase()} />
          <ChoiceSegment value={settings.examLevel} options={["a2", "b1"]} labels={{ a2: "A2", b1: "B1" }} onChange={(examLevel) => update({
            examLevel,
            deckFilter: settings.deckFilter === "a2-focus" || settings.deckFilter === "b1-focus" ? `${examLevel}-focus` : settings.deckFilter
          })} />
        </SettingGroup>

        <SettingGroup>
          <PreferenceRow icon="layers" title="Active deck" value={activeDeckLabel} />
          <DeckPicker value={settings.deckFilter} decks={settings.customDecks} onChange={(deckFilter) => update({ deckFilter })} />
        </SettingGroup>

        <SettingGroup>
          <PreferenceRow icon="translate" title="Meaning language" value={settings.meaningLanguage === "ur" ? "Urdu" : "Hindi"} />
          <ChoiceSegment value={settings.meaningLanguage} options={["hi", "ur"]} labels={{ hi: "Hindi", ur: "Urdu" }} onChange={(meaningLanguage) => update({ meaningLanguage })} />
        </SettingGroup>

        <DailyTargetStepper dailyGoal={settings.dailyGoal} onChange={(dailyGoal) => update({ dailyGoal })} />
      </SettingsSection>

      <CustomDeckSection deckName={deckName} decks={settings.customDecks} activeDeckId={settings.deckFilter} onDeckNameChange={setDeckName} onCreateDeck={createDeck} onSelectDeck={(deckFilter) => update({ deckFilter })} />
      <ReminderSettingsSection notifications={settings.notifications} customReminderTime={customReminderTime} onChange={updateNotifications} onCustomReminderTimeChange={setCustomReminderTime} onCommitCustomReminderTime={commitCustomReminderTime} onSetReminderTime={setReminderTime} />
      <DataToolsSection notice={notice} onRestoreJson={onRestoreJson} onImportCsv={onImportCsv} onShuffleDue={onShuffleDue} onReviewAllNow={onReviewAllNow} onExportProgress={onExportProgress} onExportDeck={onExportDeck} />
      <SyncSettingsSection accountEmail={accountEmail} syncStatus={syncStatus} onSyncNow={onSyncNow} onAccount={onAccount} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.hero }
});
