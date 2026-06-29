import React from "react";
import { StyleSheet, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
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
import { deckLabel } from "./settingsFormat";
import { useSettingsDraft } from "./useSettingsDraft";
import { spacing } from "../../theme/design";

type Props = {
  settings: StudySettings;
  accountEmail: string | null;
  syncStatus: SyncStatus;
  notice?: string;
  cards: Card[];
  deckMemberships: Record<string, string[]>;
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
  cards,
  deckMemberships,
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
  const activeDeckLabel = deckLabel(settings.deckFilter, settings.customDecks);
  const draft = useSettingsDraft(settings, onChange);

  return (
    <View style={styles.root}>
      <SettingsSummary examLevel={settings.examLevel} activeDeckLabel={activeDeckLabel} dailyGoal={settings.dailyGoal} />

      <SettingsSection icon="school" title="Study plan" description="Choose what you want to practice.">
        <SettingGroup>
          <PreferenceRow icon="flag" title="Exam level" value={settings.examLevel.toUpperCase()} />
          <ChoiceSegment value={settings.examLevel} options={["a2", "b1"]} labels={{ a2: "A2", b1: "B1" }} onChange={draft.updateExamLevel} />
        </SettingGroup>

        <SettingGroup>
          <PreferenceRow icon="layers" title="Active deck" value={activeDeckLabel} />
          <DeckPicker value={settings.deckFilter} decks={settings.customDecks} onChange={(deckFilter) => draft.update({ deckFilter })} />
        </SettingGroup>

        <SettingGroup>
          <PreferenceRow icon="translate" title="Meaning language" value={settings.meaningLanguage === "ur" ? "Urdu" : "Hindi"} />
          <ChoiceSegment value={settings.meaningLanguage} options={["hi", "ur"]} labels={{ hi: "Hindi", ur: "Urdu" }} onChange={(meaningLanguage) => draft.update({ meaningLanguage })} />
        </SettingGroup>

        <DailyTargetStepper dailyGoal={settings.dailyGoal} onChange={(dailyGoal) => draft.update({ dailyGoal })} />
      </SettingsSection>

      <CustomDeckSection
        deckName={draft.deckName}
        decks={settings.customDecks}
        cards={cards}
        deckMemberships={deckMemberships}
        activeDeckId={settings.deckFilter}
        editingDeckId={draft.editingDeckId}
        editingDeckName={draft.editingDeckName}
        deleteDeckId={draft.deleteDeckId}
        onDeckNameChange={draft.setDeckName}
        onCreateDeck={draft.createDeck}
        onSelectDeck={(deckFilter) => draft.update({ deckFilter })}
        onStartEditDeck={draft.startEditingDeck}
        onEditingDeckNameChange={draft.setEditingDeckName}
        onCancelEditDeck={draft.cancelEditingDeck}
        onSaveEditDeck={draft.saveEditingDeck}
        onRequestDeleteDeck={draft.setDeleteDeckId}
        onCancelDeleteDeck={() => draft.setDeleteDeckId(null)}
        onConfirmDeleteDeck={draft.deleteDeck}
      />
      <ReminderSettingsSection notifications={settings.notifications} customReminderTime={draft.customReminderTime} onChange={draft.updateNotifications} onCustomReminderTimeChange={draft.setCustomReminderTime} onCommitCustomReminderTime={draft.commitCustomReminderTime} onSetReminderTime={draft.setReminderTime} />
      <DataToolsSection activeDeckLabel={activeDeckLabel} notice={notice} onRestoreJson={onRestoreJson} onImportCsv={onImportCsv} onShuffleDue={onShuffleDue} onReviewAllNow={onReviewAllNow} onExportProgress={onExportProgress} onExportDeck={onExportDeck} />
      <SyncSettingsSection accountEmail={accountEmail} syncStatus={syncStatus} onSyncNow={onSyncNow} onAccount={onAccount} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.hero }
});
