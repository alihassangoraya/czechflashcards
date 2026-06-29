import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import MaterialIcons from "../../components/MaterialIcons";
import type { CustomDeck, StudySettings } from "../../database";
import type { SyncStatus } from "../../sync";
import { colors, radius, size, spacing, typography } from "../../theme/design";

type Props = {
  settings: StudySettings;
  accountEmail: string | null;
  syncStatus: SyncStatus;
  onChange: (settings: StudySettings) => void;
  onSyncNow: () => void;
  onAccount: () => void;
};

const deckOptions = ["a2-focus", "b1-focus", "saved", "core", "all", "daily", "work", "travel", "health", "verbs", "forms", "numbers", "custom"];

export function SettingsPanel({ settings, accountEmail, syncStatus, onChange, onSyncNow, onAccount }: Props) {
  const [deckName, setDeckName] = useState("");
  const activeDeckLabel = deckLabel(settings.deckFilter, settings.customDecks);
  const syncReady = syncStatus === "synced" || syncStatus === "not-configured";

  function update(patch: Partial<StudySettings>) {
    onChange({ ...settings, ...patch });
  }

  function updateNotifications(patch: Partial<StudySettings["notifications"]>) {
    update({ notifications: { ...settings.notifications, ...patch } });
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

      <SettingsSection icon="bookmark" title="My decks" description="Keep your own words together.">
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
            <View style={styles.reminderTime}>
              <Text style={styles.reminderTimeLabel}>Reminder time</Text>
              <ChoiceSegment value={settings.notifications.dailyReminderTime} options={["08:00", "12:00", "19:00"]} labels={{ "08:00": "08:00", "12:00": "12:00", "19:00": "19:00" }} onChange={(dailyReminderTime) => updateNotifications({ dailyReminderTime })} compact />
            </View>
          )}
          <TogglePreference icon="local-fire-department" title="Streak protection" detail="A reminder before today's practice window closes." value={settings.notifications.streakRiskEnabled} onChange={(value) => updateNotifications({ streakRiskEnabled: value })} />
          <TogglePreference icon="schedule" title="Reviews due" detail="A nudge when scheduled cards are ready." value={settings.notifications.reviewDueEnabled} onChange={(value) => updateNotifications({ reviewDueEnabled: value })} />
        </SettingGroup>
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

function SettingsSection({ icon, title, description, children }: { icon: React.ComponentProps<typeof MaterialIcons>["name"]; title: string; description: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIcon}><MaterialIcons name={icon} size={size.iconSmall} color={colors.primaryDeep} /></View>
        <View style={styles.sectionCopy}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionDescription}>{description}</Text>
        </View>
      </View>
      {children}
    </View>
  );
}

function SettingGroup({ children }: { children: React.ReactNode }) {
  return <View style={styles.settingGroup}>{children}</View>;
}

function PreferenceRow({ icon, title, value }: { icon: React.ComponentProps<typeof MaterialIcons>["name"]; title: string; value: string }) {
  return (
    <View style={styles.preferenceRow}>
      <MaterialIcons name={icon} size={size.iconSmall} color={colors.textMuted} />
      <Text style={styles.preferenceTitle}>{title}</Text>
      <Text style={styles.preferenceValue}>{value}</Text>
    </View>
  );
}

function TogglePreference({ icon, title, detail, value, onChange }: { icon: React.ComponentProps<typeof MaterialIcons>["name"]; title: string; detail: string; value: boolean; onChange: (value: boolean) => void }) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleIcon}><MaterialIcons name={icon} size={size.iconSmall} color={colors.actionMuted} /></View>
      <View style={styles.toggleCopy}>
        <Text style={styles.toggleTitle}>{title}</Text>
        <Text style={styles.toggleDetail}>{detail}</Text>
      </View>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: colors.borderMuted, true: colors.primary }} thumbColor={colors.surface} />
    </View>
  );
}

function ChoiceSegment<T extends string>({ value, options, labels, onChange, compact = false }: { value: T; options: T[]; labels: Record<T, string>; onChange: (value: T) => void; compact?: boolean }) {
  return (
    <View style={[styles.choiceSegment, compact && styles.choiceSegmentCompact]}>
      {options.map((option) => (
        <Pressable key={option} style={[styles.choiceOption, value === option && styles.choiceOptionActive]} onPress={() => onChange(option)} accessibilityRole="radio" accessibilityState={{ selected: value === option }}>
          <Text style={[styles.choiceText, value === option && styles.choiceTextActive]}>{labels[option]}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function DeckPicker({ value, decks, onChange }: { value: string; decks: CustomDeck[]; onChange: (value: string) => void }) {
  const options = [...deckOptions, ...decks.map((deck) => deck.id)];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.deckPicker}>
      {options.map((option) => (
        <Pressable key={option} style={[styles.deckChip, value === option && styles.deckChipActive]} onPress={() => onChange(option)}>
          <Text style={[styles.deckChipText, value === option && styles.deckChipTextActive]}>{deckLabel(option, decks)}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function IconButton({ icon, label, disabled = false, onPress }: { icon: React.ComponentProps<typeof MaterialIcons>["name"]; label: string; disabled?: boolean; onPress: () => void }) {
  return (
    <Pressable disabled={disabled} style={[styles.iconButton, disabled && styles.iconButtonDisabled]} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={icon} size={size.icon} color={colors.primaryDeep} />
    </Pressable>
  );
}

function deckLabel(value: string, decks: CustomDeck[]) {
  return decks.find((deck) => deck.id === value)?.name || ({ "a2-focus": "A2 Focus", "b1-focus": "B1 Focus", saved: "My list", core: "Core words", all: "All cards" }[value] || titleCase(value));
}

function titleCase(value: string) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}

function slug(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const styles = StyleSheet.create({
  root: { gap: spacing.hero },
  summary: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  summaryIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primarySoft },
  summaryCopy: { flex: 1, gap: spacing.xs },
  summaryTitle: { color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  summaryText: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.titleSmall },
  section: { gap: spacing.xl },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  sectionIcon: { width: size.touchTarget, height: size.touchTarget, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: colors.primarySoft },
  sectionCopy: { flex: 1, gap: spacing.xxs },
  sectionTitle: { color: colors.textStrong, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold },
  sectionDescription: { color: colors.textMuted, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge },
  settingGroup: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  preferenceRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  preferenceTitle: { flex: 1, color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  preferenceValue: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightSemibold },
  choiceSegment: { flexDirection: "row", gap: spacing.xs, borderRadius: radius.md, backgroundColor: colors.surfaceMuted, padding: spacing.xs },
  choiceSegmentCompact: { flex: 1 },
  choiceOption: { flex: 1, minHeight: size.touchTarget, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, paddingHorizontal: spacing.md },
  choiceOptionActive: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border },
  choiceText: { color: colors.textMuted, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  choiceTextActive: { color: colors.primaryDeep, fontWeight: typography.weightSemibold },
  deckPicker: { gap: spacing.smd, paddingRight: spacing.xl },
  deckChip: { borderRadius: radius.md, backgroundColor: colors.surfaceMuted, paddingHorizontal: spacing.lg, paddingVertical: spacing.smd },
  deckChipActive: { backgroundColor: colors.primaryDeep },
  deckChipText: { color: colors.primaryDeep, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  deckChipTextActive: { color: colors.onPrimary, fontWeight: typography.weightSemibold },
  stepper: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.xl },
  iconButton: { width: size.touchTarget, height: size.touchTarget, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surfaceWarm },
  iconButtonDisabled: { opacity: 0.42 },
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
  toggleRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  toggleIcon: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.actionSoft },
  toggleCopy: { flex: 1, gap: spacing.xxs },
  toggleTitle: { color: colors.textStrong, fontSize: typography.body, fontWeight: typography.weightMedium },
  toggleDetail: { color: colors.textMuted, fontSize: typography.caption, lineHeight: typography.bodySmall + spacing.xs },
  reminderTime: { flexDirection: "row", alignItems: "center", gap: spacing.xl, borderTopWidth: spacing.hairline, borderTopColor: colors.borderSoft, paddingTop: spacing.xl },
  reminderTimeLabel: { flex: 1, color: colors.textSoft, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
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
