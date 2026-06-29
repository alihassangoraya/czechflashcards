import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MaterialIcons from "../../components/MaterialIcons";
import type { StudySettings } from "../../database";
import type { SyncStatus } from "../../sync";
import { colors, radius, size, spacing, typography } from "../../theme/design";
import { ChoiceSegment } from "./components/ChoiceSegment";
import { DeckPicker } from "./components/DeckPicker";
import { IconButton } from "./components/IconButton";
import { PreferenceRow } from "./components/PreferenceRow";
import { SettingGroup } from "./components/SettingGroup";
import { SettingsSection } from "./components/SettingsSection";
import { TogglePreference } from "./components/TogglePreference";
import { UtilityButton } from "./components/UtilityButton";
import { deckLabel, normalizeReminderTime, slug } from "./settingsFormat";

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
  const syncReady = syncStatus === "synced" || syncStatus === "not-configured";

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
      <View style={styles.summary}>
        <View style={styles.summaryIcon}>
          <MaterialIcons name="tune" size={size.iconMedium} color={colors.primaryDeep} />
        </View>
        <View style={styles.summaryCopy}>
          <Text style={styles.summaryTitle}>Your study plan</Text>
          <Text style={styles.summaryText}>{settings.examLevel.toUpperCase()} level · {activeDeckLabel} · {settings.dailyGoal} cards a day</Text>
        </View>
      </View>

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

        <SettingGroup>
          <PreferenceRow icon="today" title="Daily target" value={`${settings.dailyGoal} cards`} />
          <View style={styles.stepper}>
            <IconButton icon="remove" label="Reduce daily target" disabled={settings.dailyGoal <= 5} onPress={() => update({ dailyGoal: Math.max(5, settings.dailyGoal - 5) })} />
            <View style={styles.stepperValue}>
              <Text style={styles.stepperNumber}>{settings.dailyGoal}</Text>
              <Text style={styles.stepperLabel}>cards / day</Text>
            </View>
            <IconButton icon="add" label="Increase daily target" onPress={() => update({ dailyGoal: Math.min(200, settings.dailyGoal + 5) })} />
          </View>
        </SettingGroup>
      </SettingsSection>

      <SettingsSection icon="folder" title="My decks" description="Keep your own words together.">
        <View style={styles.deckCreateRow}>
          <TextInput style={styles.deckInput} value={deckName} onChangeText={setDeckName} placeholder="Deck name" placeholderTextColor={colors.textMuted} returnKeyType="done" onSubmitEditing={createDeck} />
          <Pressable style={styles.addDeckButton} onPress={createDeck} accessibilityRole="button" accessibilityLabel="Create deck">
            <MaterialIcons name="add" size={size.icon} color={colors.onPrimary} />
          </Pressable>
        </View>
        {settings.customDecks.length > 0 && (
          <View style={styles.customDeckList}>
            {settings.customDecks.map((deck) => (
              <Pressable key={deck.id} style={[styles.customDeckRow, settings.deckFilter === deck.id && styles.customDeckRowActive]} onPress={() => update({ deckFilter: deck.id })}>
                <MaterialIcons name="folder" size={size.iconSmall} color={settings.deckFilter === deck.id ? colors.primaryDeep : colors.textMuted} />
                <Text style={styles.customDeckName}>{deck.name}</Text>
                {settings.deckFilter === deck.id && <MaterialIcons name="check" size={size.iconSmall} color={colors.success} />}
              </Pressable>
            ))}
          </View>
        )}
      </SettingsSection>

      <SettingsSection icon="notifications" title="Reminders" description="Choose which study nudges you receive.">
        <SettingGroup>
          <TogglePreference icon="notifications" title="Daily reminder" detail="A prompt to keep your study habit moving." value={settings.notifications.dailyReminderEnabled} onChange={(value) => updateNotifications({ dailyReminderEnabled: value })} />
          {settings.notifications.dailyReminderEnabled && (
            <View style={styles.reminderTimeBlock}>
              <View style={styles.reminderTime}>
                <Text style={styles.reminderTimeLabel}>Reminder time</Text>
                <ChoiceSegment value={settings.notifications.dailyReminderTime} options={["08:00", "12:00", "19:00"]} labels={{ "08:00": "08:00", "12:00": "12:00", "19:00": "19:00" }} onChange={setReminderTime} compact />
              </View>
              <View style={styles.customTimeRow}>
                <MaterialIcons name="schedule" size={size.iconSmall} color={colors.textMuted} />
                <TextInput
                  style={styles.timeInput}
                  value={customReminderTime}
                  onChangeText={setCustomReminderTime}
                  onBlur={commitCustomReminderTime}
                  onSubmitEditing={commitCustomReminderTime}
                  placeholder="HH:mm"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numbers-and-punctuation"
                  maxLength={5}
                  returnKeyType="done"
                  accessibilityLabel="Custom daily reminder time"
                />
                <Text style={styles.timeHint}>24-hour time</Text>
              </View>
            </View>
          )}
          <TogglePreference icon="local-fire-department" title="Streak protection" detail="A reminder before today's practice window closes." value={settings.notifications.streakRiskEnabled} onChange={(value) => updateNotifications({ streakRiskEnabled: value })} />
          <TogglePreference icon="schedule" title="Reviews due" detail="A nudge when scheduled cards are ready." value={settings.notifications.reviewDueEnabled} onChange={(value) => updateNotifications({ reviewDueEnabled: value })} />
        </SettingGroup>
      </SettingsSection>

      <SettingsSection icon="assignment" title="Data tools" description="Move your deck and progress in or out of this app.">
        <View style={styles.utilityGrid}>
          <UtilityButton icon="refresh" title="Restore JSON" detail="Load a progress backup" onPress={onRestoreJson} />
          <UtilityButton icon="library-add" title="Import CSV" detail="Add words from a file" onPress={onImportCsv} />
          <UtilityButton icon="swap-horiz" title="Shuffle due" detail="Mix ready cards" onPress={onShuffleDue} />
          <UtilityButton icon="today" title="Review all now" detail="Make this deck due" onPress={onReviewAllNow} />
          <UtilityButton icon="trending-up" title="Export progress" detail="Save a JSON backup" onPress={onExportProgress} />
          <UtilityButton icon="folder" title="Export deck" detail="Save current deck" onPress={onExportDeck} />
        </View>
        {Boolean(notice) && (
          <View style={styles.notice}>
            <MaterialIcons name="info" size={size.iconSmall} color={colors.action} />
            <Text style={styles.noticeText}>{notice}</Text>
          </View>
        )}
      </SettingsSection>

      <SettingsSection icon="cloud-sync" title="Backup and sync" description="Your study data stays local until you connect an account.">
        <View style={styles.syncStatus}>
          <View style={[styles.syncStatusIcon, syncReady ? styles.syncStatusGood : styles.syncStatusPending]}>
            <MaterialIcons name={syncReady ? "cloud-done" : "sync-problem"} size={size.iconMedium} color={syncReady ? colors.success : colors.warning} />
          </View>
          <View style={styles.syncStatusCopy}>
            <Text style={styles.syncStatusTitle}>{accountEmail || "Guest mode"}</Text>
            <Text style={styles.syncStatusText}>{accountEmail ? `Sync status: ${syncStatus}` : "Sign in to back up and restore this device."}</Text>
          </View>
        </View>
        <View style={styles.syncActions}>
          <Pressable style={styles.syncButton} onPress={onSyncNow} accessibilityRole="button">
            <MaterialIcons name="sync" size={size.icon} color={colors.action} />
            <Text style={styles.syncButtonText}>Sync now</Text>
          </Pressable>
          <Pressable style={styles.accountButton} onPress={onAccount} accessibilityRole="button">
            <MaterialIcons name={accountEmail ? "person" : "login"} size={size.icon} color={colors.onPrimary} />
            <Text style={styles.accountButtonText}>{accountEmail ? "Account" : "Sign in"}</Text>
          </Pressable>
        </View>
      </SettingsSection>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.hero },
  summary: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  summaryIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primarySoft },
  summaryCopy: { flex: 1, gap: spacing.xs },
  summaryTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  summaryText: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.titleSmall },
  stepper: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.xl },
  stepperValue: { alignItems: "center", gap: spacing.xxs },
  stepperNumber: { color: colors.textStrong, fontSize: typography.screenTitle, fontWeight: typography.weightBold },
  stepperLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  deckCreateRow: { flexDirection: "row", gap: spacing.lg },
  deckInput: { flex: 1, minHeight: size.touchTarget, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, color: colors.textStrong, fontSize: typography.body, paddingHorizontal: spacing.xl },
  addDeckButton: { width: size.touchTarget, height: size.touchTarget, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primaryDeep },
  customDeckList: { gap: spacing.smd },
  customDeckRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, paddingHorizontal: spacing.xl },
  customDeckRowActive: { borderColor: colors.success },
  customDeckName: { flex: 1, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  reminderTimeBlock: { gap: spacing.lg, borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xl },
  reminderTime: { flexDirection: "row", alignItems: "center", gap: spacing.xl },
  reminderTimeLabel: { flex: 1, color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  customTimeRow: { minHeight: size.touchTarget, flexDirection: "row", alignItems: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, paddingHorizontal: spacing.lg },
  timeInput: { minWidth: 74, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold, paddingVertical: spacing.smd },
  timeHint: { flex: 1, color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium },
  utilityGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.lg },
  notice: { flexDirection: "row", alignItems: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.actionSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.lg },
  noticeText: { flex: 1, color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  syncStatus: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  syncStatusIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md },
  syncStatusGood: { backgroundColor: colors.mintSoft },
  syncStatusPending: { backgroundColor: colors.goldSoft },
  syncStatusCopy: { flex: 1, gap: spacing.xxs },
  syncStatusTitle: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightSemibold },
  syncStatusText: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  syncActions: { flexDirection: "row", gap: spacing.lg },
  syncButton: { flex: 1, minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, backgroundColor: colors.surface },
  syncButtonText: { color: colors.action, fontSize: typography.body, fontWeight: typography.weightSemibold },
  accountButton: { flex: 1, minHeight: size.reviewButton, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.smd, borderRadius: radius.md, backgroundColor: colors.primaryDeep },
  accountButtonText: { color: colors.onPrimary, fontSize: typography.body, fontWeight: typography.weightSemibold }
});
