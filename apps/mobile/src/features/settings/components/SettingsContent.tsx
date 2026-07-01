import React from "react";
import { StyleSheet, View } from "react-native";
import { spacing } from "../../../theme/design";
import { AppearanceSection } from "./AppearanceSection";
import { ReminderSettingsSection } from "./ReminderSettingsSection";
import { SettingsCustomDecksSection } from "./SettingsCustomDecksSection";
import { SettingsDataToolsSection } from "./SettingsDataToolsSection";
import { StudyPlanSection } from "./StudyPlanSection";
import type { SettingsPanelProps } from "../types/settingsPanelTypes";
import type { SettingsDraft } from "../hooks/useSettingsDraft";

type Props = SettingsPanelProps & {
  activeDeckLabel: string;
  draft: SettingsDraft;
};

export function SettingsContent({ settings, cards, deckMemberships, settingsNotice, activeDeckLabel, draft, onRestoreJson, onImportCsv, onExportProgress, onExportDeck, onExportAccountData }: Props) {
  return (
    <View style={styles.root}>
      <AppearanceSection appLanguage={settings.appLanguage} themeMode={settings.themeMode} onAppLanguageChange={draft.updateAppLanguage} onThemeModeChange={(themeMode) => draft.update({ themeMode })} />
      <StudyPlanSection settings={settings} activeDeckLabel={activeDeckLabel} onUpdate={draft.update} onExamLevelChange={draft.updateExamLevel} />
      <SettingsCustomDecksSection cards={cards} deckMemberships={deckMemberships} draft={draft} settings={settings} />
      <ReminderSettingsSection notifications={settings.notifications} customReminderTime={draft.customReminderTime} onChange={draft.updateNotifications} onCustomReminderTimeChange={draft.setCustomReminderTime} onCommitCustomReminderTime={draft.commitCustomReminderTime} onSetReminderTime={draft.setReminderTime} />
      <SettingsDataToolsSection notice={settingsNotice} onRestoreJson={onRestoreJson} onImportCsv={onImportCsv} onExportProgress={onExportProgress} onExportDeck={onExportDeck} onExportAccountData={onExportAccountData} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.panel, paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom }
});
