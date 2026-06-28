import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  PanResponder,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Speech from "expo-speech";
import {
  applyReviewGrade,
  filterDeck,
  formatInterval,
  normalizeCards,
  selectedMeaning,
  slug,
  type Card,
  type ReviewEvent,
  type ReviewGrade,
  type ReviewState
} from "@czech-flashcards/shared";
import seedPayload from "@czech-flashcards/shared/seed";
import {
  addCustomCard,
  getDailyProgress,
  getReviewState,
  loadCards,
  loadReviewStates,
  loadSettings,
  openAppDatabase,
  saveReviewResult,
  saveSettings,
  seedCards,
  undoReviewResult,
  type AppDatabase,
  type StudySettings
} from "./src/database";
import { configureLocalNotifications } from "./src/notifications";
import { createSupabaseClient, flushSyncQueue, type SyncStatus } from "./src/sync";

type Tab = "study" | "search" | "add" | "settings";
type UndoReview = { card: Card; previousState: ReviewState; event: ReviewEvent };

const seedCardsNormalized = normalizeCards(seedPayload.cards as Parameters<typeof normalizeCards>[0]);

export default function App() {
  const [db, setDb] = useState<AppDatabase | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [states, setStates] = useState<Record<string, ReviewState>>({});
  const [settings, setSettingsState] = useState<StudySettings | null>(null);
  const [current, setCurrent] = useState<Card | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [tab, setTab] = useState<Tab>("study");
  const [query, setQuery] = useState("");
  const [dailyProgress, setDailyProgress] = useState("0 / 30");
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("not-configured");
  const [lastReview, setLastReview] = useState<UndoReview | null>(null);
  const [grading, setGrading] = useState(false);
  const dragX = useRef(0);
  const forcedCardId = useRef<string | null>(null);
  const revealForcedCard = useRef(false);

  useEffect(() => {
    async function boot() {
      const database = await openAppDatabase();
      await seedCards(database, seedCardsNormalized);
      const nextSettings = await loadSettings(database);
      setDb(database);
      setSettingsState(nextSettings);
      setCards(await loadCards(database));
      setStates(await loadReviewStates(database));
      const progress = await getDailyProgress(database, undefined, nextSettings.dailyGoal);
      setDailyProgress(`${progress.reviewed} / ${progress.goal}`);
      await configureLocalNotifications(nextSettings.notifications);
      setSyncStatus(await flushSyncQueue(database, createSupabaseClient()));
    }
    boot();
  }, []);

  const deck = useMemo(() => {
    if (!settings) return [];
    return filterDeck(cards, settings.examLevel, settings.deckFilter);
  }, [cards, settings]);

  useEffect(() => {
    const now = Date.now();
    const due = deck
      .filter((card) => (states[card.id]?.dueAt || 0) <= now)
      .sort((a, b) => {
        const aState = states[a.id];
        const bState = states[b.id];
        const aScore = now - (aState?.dueAt || 0) + (aState?.seen ? 0 : 10 * 24 * 60 * 60 * 1000);
        const bScore = now - (bState?.dueAt || 0) + (bState?.seen ? 0 : 10 * 24 * 60 * 60 * 1000);
        return bScore - aScore;
      });
    const forced = forcedCardId.current ? due.find((card) => card.id === forcedCardId.current) : null;
    setCurrent(forced || due[0] || null);
    setRevealed(Boolean(forced && revealForcedCard.current));
    forcedCardId.current = null;
    revealForcedCard.current = false;
  }, [deck, states]);

  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 18,
    onPanResponderMove: (_, gesture) => {
      dragX.current = gesture.dx;
    },
    onPanResponderRelease: (_, gesture) => {
      if (!grading && gesture.dx > 90) void grade("good");
      if (!grading && gesture.dx < -90) void grade("again");
      dragX.current = 0;
    }
  }), [current, db, grading, settings, states]);

  async function refresh(database = db) {
    if (!database) return;
    setCards(await loadCards(database));
    setStates(await loadReviewStates(database));
    const progress = await getDailyProgress(database, undefined, settings?.dailyGoal || 30);
    setDailyProgress(`${progress.reviewed} / ${progress.goal}`);
  }

  async function persistSettings(next: StudySettings) {
    if (!db) return;
    setSettingsState(next);
    await saveSettings(db, next);
    await configureLocalNotifications(next.notifications);
  }

  async function grade(result: ReviewGrade) {
    if (!db || !settings || !current || grading) return;
    const reviewedCard = current;
    setGrading(true);
    try {
      const before = await getReviewState(db, reviewedCard.id);
      const next = applyReviewGrade(before, result, Date.now());
      await saveReviewResult(db, next.state, next.event, settings.dailyGoal);
      setLastReview({ card: reviewedCard, previousState: before, event: next.event });
      await refresh(db);
    } finally {
      setGrading(false);
    }
  }

  async function undoLastReview() {
    if (!db || !settings || !lastReview || grading) return;
    setGrading(true);
    try {
      forcedCardId.current = lastReview.card.id;
      revealForcedCard.current = true;
      await undoReviewResult(db, lastReview.previousState, lastReview.event, settings.dailyGoal);
      await refresh(db);
      setLastReview(null);
    } finally {
      setGrading(false);
    }
  }

  async function addWord(values: { cz: string; en: string; hi: string; ur: string; sentence: string; sentenceEn: string }) {
    if (!db) return;
    const card: Card = {
      id: `custom-${Date.now()}-${slug(values.cz)}`,
      cz: values.cz.trim(),
      en: values.en.trim(),
      hi: values.hi.trim(),
      ur: values.ur.trim() || values.hi.trim(),
      sentence: values.sentence.trim(),
      sentenceEn: values.sentenceEn.trim() || `English example with "${values.en.trim()}".`,
      level: "a2",
      tags: ["custom"],
      source: "custom"
    };
    await addCustomCard(db, card);
    setTab("study");
    await refresh(db);
  }

  if (!db || !settings) {
    return (
      <SafeAreaView style={styles.shell}>
        <ActivityIndicator />
        <Text style={styles.muted}>Preparing offline study mode...</Text>
      </SafeAreaView>
    );
  }

  const dueCount = deck.filter((card) => (states[card.id]?.dueAt || 0) <= Date.now()).length;
  const currentState = current ? states[current.id] : null;

  return (
    <SafeAreaView style={styles.shell}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>{settings.examLevel.toUpperCase()} Czech vocabulary</Text>
          <Text style={styles.title}>Czech Flashcards</Text>
        </View>
        <View style={styles.statPill}>
          <Text style={styles.statNumber}>{dueCount}</Text>
          <Text style={styles.statLabel}>due</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        {(["study", "search", "add", "settings"] as Tab[]).map((item) => (
          <Pressable key={item} style={[styles.tab, tab === item && styles.activeTab]} onPress={() => setTab(item)}>
            <Text style={[styles.tabText, tab === item && styles.activeTabText]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      {tab === "study" && (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.selectors}>
            <Segment value={settings.examLevel} options={["a2", "b1"]} onChange={(examLevel) => persistSettings({ ...settings, examLevel })} />
            <Segment value={settings.meaningLanguage} options={["hi", "ur"]} onChange={(meaningLanguage) => persistSettings({ ...settings, meaningLanguage })} />
          </View>
          <DeckPicker value={settings.deckFilter} onChange={(deckFilter) => persistSettings({ ...settings, deckFilter })} />

          <Pressable style={styles.card} onPress={() => setRevealed(true)} {...panResponder.panHandlers}>
            {current ? (
              <>
                <Text style={styles.cardMode}>{current.tags.join(" · ")}</Text>
                <Text style={styles.word}>{current.cz}</Text>
                {revealed && (
                  <View style={styles.answer}>
                    <Text style={styles.meaning}>English: {current.en}</Text>
                    <Text style={[styles.meaning, settings.meaningLanguage === "ur" && styles.rtl]}>
                      {settings.meaningLanguage === "ur" ? "Urdu" : "Hindi"}: {selectedMeaning(current, settings.meaningLanguage)}
                    </Text>
                    <Text style={styles.example}>{current.sentence}</Text>
                    <Text style={styles.muted}>{current.sentenceEn}</Text>
                  </View>
                )}
                <Text style={styles.hint}>{revealed ? "Swipe or choose a result" : "Tap to reveal meaning"}</Text>
              </>
            ) : (
              <>
                <Text style={styles.word}>Done</Text>
                <Text style={styles.hint}>No cards are due in this deck.</Text>
              </>
            )}
          </Pressable>

          <View style={styles.soundRow}>
            <Pressable style={styles.secondaryButton} onPress={() => current && Speech.speak(current.cz, { language: "cs-CZ", rate: 0.86 })}>
              <Text style={styles.secondaryButtonText}>Play word</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => current && Speech.speak(current.sentence, { language: "cs-CZ", rate: 0.86 })}>
              <Text style={styles.secondaryButtonText}>Play example</Text>
            </Pressable>
          </View>

          <View style={styles.gradeRow}>
            {(["again", "hard", "good", "easy"] as ReviewGrade[]).map((item) => (
              <Pressable key={item} disabled={grading || !current} style={[styles.gradeButton, (grading || !current) && styles.disabledButton]} onPress={() => grade(item)}>
                <Text style={styles.gradeText}>{item}</Text>
              </Pressable>
            ))}
          </View>

          {lastReview && (
            <Pressable disabled={grading} style={[styles.undoButton, grading && styles.disabledButton]} onPress={undoLastReview} accessibilityRole="button" accessibilityLabel={`Undo review for ${lastReview.card.cz}`}>
              <Text style={styles.undoText}>Undo last review</Text>
            </Pressable>
          )}

          <View style={styles.progressBand}>
            <Text style={styles.metric}>Today: {dailyProgress}</Text>
            <Text style={styles.metric}>Deck: {deck.length}</Text>
            <Text style={styles.metric}>Interval: {currentState ? formatInterval(Math.max(0, currentState.dueAt - Date.now())) : "New word"}</Text>
          </View>
        </ScrollView>
      )}

      {tab === "search" && (
        <ScrollView contentContainerStyle={styles.content}>
          <TextInput style={styles.input} value={query} onChangeText={setQuery} placeholder="Search Czech, English, Hindi, or Urdu" />
          {deck
            .filter((card) => [card.cz, card.en, card.hi, card.ur, card.sentence].some((value) => value.toLowerCase().includes(query.toLowerCase())))
            .slice(0, 40)
            .map((card) => (
              <Pressable key={card.id} style={styles.row} onPress={() => setTab("study")}>
                <Text style={styles.rowTitle}>{card.cz}</Text>
                <Text style={styles.muted}>{card.en} · {selectedMeaning(card, settings.meaningLanguage)}</Text>
              </Pressable>
            ))}
        </ScrollView>
      )}

      {tab === "add" && <AddWordForm onSubmit={addWord} />}

      {tab === "settings" && (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>Daily goal</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            value={String(settings.dailyGoal)}
            onChangeText={(value) => persistSettings({ ...settings, dailyGoal: Math.max(1, Number(value) || 30) })}
          />
          <ToggleRow label="Daily reminder" value={settings.notifications.dailyReminderEnabled} onValueChange={(value) => persistSettings({ ...settings, notifications: { ...settings.notifications, dailyReminderEnabled: value } })} />
          <ToggleRow label="Streak risk reminder" value={settings.notifications.streakRiskEnabled} onValueChange={(value) => persistSettings({ ...settings, notifications: { ...settings.notifications, streakRiskEnabled: value } })} />
          <ToggleRow label="Review due reminder" value={settings.notifications.reviewDueEnabled} onValueChange={(value) => persistSettings({ ...settings, notifications: { ...settings.notifications, reviewDueEnabled: value } })} />
          <View style={styles.syncPanel}>
            <Text style={styles.sectionTitle}>Sync</Text>
            <Text style={styles.muted}>Guest-first mode is active. Add Supabase env values and sign in to flush the offline queue.</Text>
            <Text style={styles.metric}>Status: {syncStatus}</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function Segment<T extends string>({ value, options, onChange }: { value: T; options: T[]; onChange: (value: T) => void }) {
  return (
    <View style={styles.segment}>
      {options.map((option) => (
        <Pressable key={option} style={[styles.segmentItem, value === option && styles.segmentActive]} onPress={() => onChange(option)}>
          <Text style={[styles.segmentText, value === option && styles.segmentActiveText]}>{option.toUpperCase()}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function DeckPicker({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const options = ["core", "all", "daily", "extended", "work", "travel", "health", "verbs", "forms", "numbers", "custom"];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.deckPicker}>
      {options.map((option) => (
        <Pressable key={option} style={[styles.deckChip, value === option && styles.deckChipActive]} onPress={() => onChange(option)}>
          <Text style={[styles.deckChipText, value === option && styles.deckChipTextActive]}>{option}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function AddWordForm({ onSubmit }: { onSubmit: (values: { cz: string; en: string; hi: string; ur: string; sentence: string; sentenceEn: string }) => void }) {
  const [values, setValues] = useState({ cz: "", en: "", hi: "", ur: "", sentence: "", sentenceEn: "" });
  const update = (key: keyof typeof values, value: string) => setValues((current) => ({ ...current, [key]: value }));
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {[
        ["cz", "Czech word"],
        ["en", "English"],
        ["hi", "Hindi"],
        ["ur", "Urdu"],
        ["sentence", "Czech example"],
        ["sentenceEn", "English example"]
      ].map(([key, label]) => (
        <TextInput key={key} style={styles.input} value={values[key as keyof typeof values]} onChangeText={(value) => update(key as keyof typeof values, value)} placeholder={label} />
      ))}
      <Pressable style={styles.primaryButton} onPress={() => onSubmit(values)}>
        <Text style={styles.primaryButtonText}>Add word</Text>
      </Pressable>
    </ScrollView>
  );
}

function ToggleRow({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (value: boolean) => void }) {
  return (
    <View style={styles.toggleRow}>
      <Text style={styles.rowTitle}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: "#f2f5ef", paddingHorizontal: 18 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 16, paddingBottom: 12 },
  eyebrow: { color: "#587064", fontSize: 12, fontWeight: "700", textTransform: "uppercase" },
  title: { color: "#17231f", fontSize: 28, fontWeight: "800" },
  statPill: { minWidth: 72, alignItems: "center", backgroundColor: "#dfe9df", padding: 10, borderRadius: 8 },
  statNumber: { fontSize: 22, fontWeight: "800", color: "#20362f" },
  statLabel: { fontSize: 12, color: "#587064" },
  tabs: { flexDirection: "row", gap: 8, marginBottom: 12 },
  tab: { flex: 1, alignItems: "center", paddingVertical: 9, borderRadius: 8, backgroundColor: "#e6ece5" },
  activeTab: { backgroundColor: "#244d43" },
  tabText: { color: "#244d43", fontWeight: "700", textTransform: "capitalize" },
  activeTabText: { color: "#ffffff" },
  content: { gap: 14, paddingBottom: 32 },
  selectors: { flexDirection: "row", gap: 10 },
  segment: { flex: 1, flexDirection: "row", backgroundColor: "#e4ebe3", borderRadius: 8, padding: 4 },
  segmentItem: { flex: 1, alignItems: "center", paddingVertical: 8, borderRadius: 6 },
  segmentActive: { backgroundColor: "#ffffff" },
  segmentText: { color: "#53665e", fontWeight: "800" },
  segmentActiveText: { color: "#17231f" },
  deckPicker: { gap: 8, paddingVertical: 2 },
  deckChip: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#e4ebe3", borderRadius: 8 },
  deckChipActive: { backgroundColor: "#244d43" },
  deckChipText: { color: "#244d43", fontWeight: "700" },
  deckChipTextActive: { color: "#fff" },
  card: { minHeight: 310, justifyContent: "center", backgroundColor: "#ffffff", borderRadius: 8, padding: 22, borderWidth: 1, borderColor: "#d8e2d7" },
  cardMode: { color: "#6d7f75", fontWeight: "700", textTransform: "uppercase", marginBottom: 10 },
  word: { fontSize: 40, lineHeight: 48, color: "#17231f", fontWeight: "900" },
  answer: { gap: 8, marginTop: 18 },
  meaning: { fontSize: 18, color: "#22352f", fontWeight: "700" },
  rtl: { writingDirection: "rtl", textAlign: "right" },
  example: { fontSize: 17, color: "#31463d", marginTop: 8 },
  hint: { color: "#6d7f75", marginTop: 18 },
  muted: { color: "#6d7f75", lineHeight: 20 },
  soundRow: { flexDirection: "row", gap: 10 },
  secondaryButton: { flex: 1, alignItems: "center", padding: 12, borderRadius: 8, backgroundColor: "#e4ebe3" },
  secondaryButtonText: { color: "#244d43", fontWeight: "800" },
  gradeRow: { flexDirection: "row", gap: 8 },
  gradeButton: { flex: 1, alignItems: "center", backgroundColor: "#244d43", paddingVertical: 12, borderRadius: 8 },
  gradeText: { color: "#fff", fontWeight: "800", textTransform: "capitalize" },
  undoButton: { alignSelf: "center", minWidth: 170, alignItems: "center", paddingVertical: 11, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1, borderColor: "#9aa9a1", backgroundColor: "#ffffff" },
  undoText: { color: "#244d43", fontWeight: "800" },
  disabledButton: { opacity: 0.45 },
  progressBand: { gap: 6, backgroundColor: "#dfe9df", padding: 14, borderRadius: 8 },
  metric: { color: "#20362f", fontWeight: "700" },
  input: { backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e2d7", borderRadius: 8, padding: 14, fontSize: 16 },
  row: { backgroundColor: "#ffffff", borderRadius: 8, padding: 14, borderWidth: 1, borderColor: "#d8e2d7" },
  rowTitle: { color: "#17231f", fontWeight: "800", fontSize: 16 },
  sectionTitle: { color: "#17231f", fontWeight: "900", fontSize: 18 },
  primaryButton: { alignItems: "center", backgroundColor: "#244d43", borderRadius: 8, padding: 14 },
  primaryButtonText: { color: "#fff", fontWeight: "900" },
  toggleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", borderRadius: 8, padding: 14 },
  syncPanel: { gap: 8, backgroundColor: "#ffffff", borderRadius: 8, padding: 14, borderWidth: 1, borderColor: "#d8e2d7" }
});
