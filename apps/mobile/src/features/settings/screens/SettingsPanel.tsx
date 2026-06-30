import React from "react";
import { StyleSheet, View } from "react-native";
import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../../database";
import type { SyncStatus } from "../../../sync";
import { CustomDeckSection } from "../components/CustomDeckSection";
import { DataToolsSection } from "../components/DataToolsSection";
import { ReminderSettingsSection } from "../components/ReminderSettingsSection";
import { SettingsSummary } from "../components/SettingsSummary";
import { StudyPlanSection } from "../components/StudyPlanSection";
import { SyncSettingsSection } from "../components/SyncSettingsSection";
import { useI18n } from "../../../i18n/I18nProvider";
import type { TranslationKey } from "../../../i18n/translations";
import { deckLabel } from "../settingsFormat";
import { useSettingsDraft } from "../useSettingsDraft";
import { spacing } from "../../../theme/design";

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
  const { t } = useI18n();
  const activeDeckLabel = settings.customDecks.some((deck) => deck.id === settings.deckFilter)
    ? deckLabel(settings.deckFilter, settings.customDecks)
    : t(`deck.${settings.deckFilter}` as TranslationKey);
  const draft = useSettingsDraft(settings, onChange);

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
