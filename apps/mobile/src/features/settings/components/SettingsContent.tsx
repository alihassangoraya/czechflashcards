import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../theme/design";
import { CustomDeckSection } from "./CustomDeckSection";
import { DataToolsSection } from "./DataToolsSection";
import { ReminderSettingsSection } from "./ReminderSettingsSection";
import { SettingsSummary } from "./SettingsSummary";
import { StudyPlanSection } from "./StudyPlanSection";
import { SyncSettingsSection } from "./SyncSettingsSection";
import type { SettingsPanelProps } from "../settingsPanelTypes";
import type { useSettingsDraft } from "../hooks/useSettingsDraft";

type SettingsDraft = ReturnType<typeof useSettingsDraft>;

type Props = SettingsPanelProps & {
  activeDeckLabel: string;
  draft: SettingsDraft;
};

export function SettingsContent({ settings, accountEmail, syncStatus, notice, cards, deckMemberships, activeDeckLabel, draft, onSyncNow, onAccount, onRestoreJson, onImportCsv, onShuffleDue, onReviewAllNow, onExportProgress, onExportDeck }: Props) {
  return (
    <View style={styles.root}>
      <SettingsSummary examLevel={settings.examLevel} activeDeckLabel={activeDeckLabel} dailyGoal={settings.dailyGoal} />
      <StudyPlanSection settings={settings} activeDeckLabel={activeDeckLabel} onUpdate={draft.update} onExamLevelChange={draft.updateExamLevel} />
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
