import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Modal,
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
  compareDueReviewStates,
  filterDeck,
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
  deleteCustomCard,
  getDailyProgress,
  getReviewState,
  loadCards,
  loadReviewStates,
  loadSavedCardIds,
  loadSettings,
  openAppDatabase,
  saveReviewResult,
  saveCardCorrection,
  saveSettings,
  seedCards,
  setCardSaved,
  undoReviewResult,
  type AppDatabase,
  type CustomDeck,
  type StudySettings
} from "./src/database";
import { configureLocalNotifications } from "./src/notifications";
import { createSupabaseClient, flushSyncQueue, getFriendCode, loadFriendActivity, respondToFriendRequest, restoreSyncSnapshot, sendFriendRequest, signInWithPassword, signOut, signUpWithPassword, type FriendRequest, type FriendStreak, type SyncStatus } from "./src/sync";

type Panel = "search" | "add" | "edit" | "settings" | "account";
type RelearningEntry = { id: string; remaining: number };
type UndoReview = { card: Card; previousState: ReviewState; event: ReviewEvent; previousRelearningQueue: RelearningEntry[] };
const RELEARNING_MIN_CARDS = 10;
const RELEARNING_MAX_CARDS = 15;

const seedCardsNormalized = normalizeCards(seedPayload.cards as Parameters<typeof normalizeCards>[0]);

export default function App() {
  const supabase = useMemo(() => createSupabaseClient(), []);
  const [db, setDb] = useState<AppDatabase | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [savedCardIds, setSavedCardIds] = useState<Set<string>>(new Set());
  const [states, setStates] = useState<Record<string, ReviewState>>({});
  const [settings, setSettingsState] = useState<StudySettings | null>(null);
  const [current, setCurrent] = useState<Card | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [query, setQuery] = useState("");
  const [dailyProgress, setDailyProgress] = useState("0 / 30");
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("not-configured");
  const [accountEmail, setAccountEmail] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);
  const [lastReview, setLastReview] = useState<UndoReview | null>(null);
  const [grading, setGrading] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<"again" | "known" | null>(null);
  const dragX = useRef(0);
  const forcedCardId = useRef<string | null>(null);
  const revealForcedCard = useRef(false);
  const relearningQueue = useRef<RelearningEntry[]>([]);

  useEffect(() => {
    async function boot() {
      const database = await openAppDatabase();
      await seedCards(database, seedCardsNormalized);
      const nextSettings = await loadSettings(database);
      setDb(database);
      setSettingsState(nextSettings);
      setCards(await loadCards(database));
      setSavedCardIds(await loadSavedCardIds(database));
      setStates(await loadReviewStates(database));
      const progress = await getDailyProgress(database, undefined, nextSettings.dailyGoal);
      setDailyProgress(`${progress.reviewed} / ${progress.goal}`);
      await configureLocalNotifications(nextSettings.notifications);
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        setAccountEmail(data.session?.user.email || null);
      }
      const flushStatus = await flushSyncQueue(database, supabase);
      setSyncStatus(flushStatus === "error" ? flushStatus : await restoreSyncSnapshot(database, supabase));
    }
    boot();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccountEmail(session?.user.email || null);
      if (db && session?.user) void syncNow(db);
      if (!session?.user) setSyncStatus("guest");
    });
    return () => listener.subscription.unsubscribe();
  }, [db, supabase]);

  const deck = useMemo(() => {
    if (!settings) return [];
    return filterDeck(cards, settings.examLevel, settings.deckFilter, savedCardIds);
  }, [cards, savedCardIds, settings]);

  useEffect(() => {
    const now = Date.now();
    const queuedIds = new Set(relearningQueue.current.map((entry) => entry.id));
    const due = deck
      .filter((card) => (states[card.id]?.dueAt || 0) <= now && !queuedIds.has(card.id))
      .sort((a, b) => {
        const aState = states[a.id] || { cardId: a.id, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
        const bState = states[b.id] || { cardId: b.id, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
        return compareDueReviewStates(aState, bState, now);
      });
    const forced = forcedCardId.current ? deck.find((card) => card.id === forcedCardId.current) : null;
    const relearning = forced ? null : takeRelearningCard(deck);
    const fallbackRelearning = forced || relearning || due.length ? null : takeRelearningCard(deck, true);
    setCurrent(forced || relearning || due[0] || fallbackRelearning || null);
    setRevealed(Boolean(forced && revealForcedCard.current));
    forcedCardId.current = null;
    revealForcedCard.current = false;
  }, [deck, states]);

  function scheduleRelearning(cardId: string) {
    const remaining = RELEARNING_MIN_CARDS + Math.floor(Math.random() * (RELEARNING_MAX_CARDS - RELEARNING_MIN_CARDS + 1));
    relearningQueue.current = relearningQueue.current.filter((entry) => entry.id !== cardId);
    relearningQueue.current.push({ id: cardId, remaining });
  }

  function advanceRelearningQueue(reviewedCardId: string) {
    relearningQueue.current = relearningQueue.current.map((entry) =>
      entry.id === reviewedCardId ? entry : { ...entry, remaining: Math.max(0, entry.remaining - 1) }
    );
  }

  function takeRelearningCard(deckCards: Card[], allowEarlyReturn = false): Card | null {
    const cardsById = new Map(deckCards.map((card) => [card.id, card]));
    const eligible = relearningQueue.current.filter((entry) => cardsById.has(entry.id));
    const entry = eligible.find((item) => item.remaining <= 0) || (allowEarlyReturn ? eligible.sort((a, b) => a.remaining - b.remaining)[0] : null);
    if (!entry) return null;
    relearningQueue.current = relearningQueue.current.filter((item) => item.id !== entry.id);
    return cardsById.get(entry.id) || null;
  }

  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 18,
    onPanResponderMove: (_, gesture) => {
      dragX.current = gesture.dx;
      setSwipeDirection(gesture.dx > 24 ? "known" : gesture.dx < -24 ? "again" : null);
    },
    onPanResponderRelease: (_, gesture) => {
      setSwipeDirection(null);
      if (!grading && gesture.dx > 90) void grade("good");
      if (!grading && gesture.dx < -90) void grade("again");
      dragX.current = 0;
    },
    onPanResponderTerminate: () => setSwipeDirection(null)
  }), [current, db, grading, settings, states]);

  async function refresh(database = db) {
    if (!database) return;
    setCards(await loadCards(database));
    setSavedCardIds(await loadSavedCardIds(database));
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

  async function syncNow(database = db) {
    if (!database) return;
    const flushStatus = await flushSyncQueue(database, supabase);
    setSyncStatus(flushStatus === "error" ? flushStatus : await restoreSyncSnapshot(database, supabase));
    await refresh(database);
  }

  async function authenticate(mode: "sign-in" | "sign-up", email: string, password: string, displayName: string) {
    setAuthBusy(true);
    const error = mode === "sign-in"
      ? await signInWithPassword(supabase, email, password)
      : await signUpWithPassword(supabase, email, password, displayName);
    setAuthBusy(false);
    if (!error) await syncNow();
    return error;
  }

  async function signOutAccount() {
    setAuthBusy(true);
    const error = await signOut(supabase);
    setAuthBusy(false);
    if (!error) setPanel(null);
    return error;
  }

  async function grade(result: ReviewGrade) {
    if (!db || !settings || !current || grading) return;
    const reviewedCard = current;
    setGrading(true);
    try {
      const before = await getReviewState(db, reviewedCard.id);
      const next = applyReviewGrade(before, result, Date.now());
      const previousRelearningQueue = relearningQueue.current.map((entry) => ({ ...entry }));
      await saveReviewResult(db, next.state, next.event, settings.dailyGoal);
      advanceRelearningQueue(reviewedCard.id);
      if (result === "again") scheduleRelearning(reviewedCard.id);
      setLastReview({ card: reviewedCard, previousState: before, event: next.event, previousRelearningQueue });
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
      relearningQueue.current = lastReview.previousRelearningQueue.map((entry) => ({ ...entry }));
      await undoReviewResult(db, lastReview.previousState, lastReview.event, settings.dailyGoal);
      await refresh(db);
      setLastReview(null);
    } finally {
      setGrading(false);
    }
  }

  async function addWord(values: { cz: string; en: string; hi: string; ur: string; sentence: string; sentenceEn: string; tag: string }) {
    if (!db) return;
    if (!values.cz.trim() || !values.en.trim()) return;
    const card: Card = {
      id: `custom-${Date.now()}-${slug(values.cz)}`,
      cz: values.cz.trim(),
      en: values.en.trim(),
      hi: values.hi.trim() || "Hindi meaning pending",
      ur: values.ur.trim() || "اردو معنی باقی ہے",
      sentence: values.sentence.trim(),
      sentenceEn: values.sentenceEn.trim(),
      level: "a2",
      tags: Array.from(new Set(["custom", values.tag])),
      source: "custom"
    };
    await addCustomCard(db, card);
    setPanel(null);
    await refresh(db);
  }

  async function deleteWord(cardId: string) {
    if (!db) return;
    await deleteCustomCard(db, cardId);
    await refresh(db);
  }

  async function toggleSavedCard(cardId: string) {
    if (!db) return;
    const saved = !savedCardIds.has(cardId);
    await setCardSaved(db, cardId, saved);
    setSavedCardIds(await loadSavedCardIds(db));
  }

  async function saveCorrection(values: { cz: string; en: string; hi: string; ur: string; sentence: string; sentenceEn: string }) {
    if (!db || !editingCard) return;
    const card = {
      ...editingCard,
      cz: values.cz.trim(),
      en: values.en.trim(),
      hi: values.hi.trim(),
      ur: values.ur.trim() || values.hi.trim(),
      sentence: values.sentence.trim(),
      sentenceEn: values.sentenceEn.trim()
    };
    if (card.source === "custom") await addCustomCard(db, card);
    else await saveCardCorrection(db, card);
    forcedCardId.current = card.id;
    revealForcedCard.current = true;
    setEditingCard(null);
    setPanel(null);
    await refresh(db);
  }

  function openCardEditor() {
    if (!current) return;
    setEditingCard(current);
    setPanel("edit");
  }

  function studySearchResult(card: Card) {
    forcedCardId.current = card.id;
    revealForcedCard.current = true;
    setCurrent(card);
    setRevealed(true);
    setPanel(null);
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
  const knownCount = deck.filter((card) => (states[card.id]?.knownStreak || 0) >= 1).length;
  const learningCount = deck.filter((card) => {
    const state = states[card.id];
    return Boolean(state?.seen && state.knownStreak === 0);
  }).length;
  const customCards = cards.filter((card) => card.source === "custom");

  return (
    <SafeAreaView style={styles.shell}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Text style={styles.title}>Flashcards</Text>
          <HeaderIcon icon="search" label="Search words" onPress={() => setPanel("search")} />
        </View>
        <View style={styles.headerActions}>
          <HeaderIcon icon="add" label="Add custom word" primary onPress={() => setPanel("add")} />
          <HeaderIcon icon="settings" label="Open settings" onPress={() => setPanel("settings")} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.card} onPress={() => setRevealed(true)} {...panResponder.panHandlers}>
          {swipeDirection && (
            <Text style={[styles.swipeOverlay, swipeDirection === "known" ? styles.swipeKnown : styles.swipeAgain]}>
              {swipeDirection === "known" ? "Known" : "Again"}
            </Text>
          )}
          {current ? (
            <>
              <Pressable style={styles.cardSaveButton} onPress={() => void toggleSavedCard(current.id)} accessibilityRole="button" accessibilityLabel={savedCardIds.has(current.id) ? `Remove ${current.cz} from My list` : `Save ${current.cz} to My list`}>
                <Text style={styles.cardSaveIcon}>{savedCardIds.has(current.id) ? "★" : "☆"}</Text>
              </Pressable>
              <Pressable style={styles.cardEditButton} onPress={openCardEditor} accessibilityRole="button" accessibilityLabel={`Edit ${current.cz}`}>
                <Text style={styles.cardEditIcon}>✎</Text>
              </Pressable>
              <Text style={styles.word}>{current.cz}</Text>
              {revealed && (
                <View style={styles.answer}>
                  <Text style={styles.meaning}>English: {current.en}</Text>
                  <Text style={[styles.meaning, settings.meaningLanguage === "ur" && styles.rtl]}>
                    {settings.meaningLanguage === "ur" ? "Urdu" : "Hindi"}: {selectedMeaning(current, settings.meaningLanguage)}
                  </Text>
                  {Boolean(current.sentence) && <Text style={styles.example}>{current.sentence}</Text>}
                  {Boolean(current.sentenceEn) && <Text style={styles.muted}>{current.sentenceEn}</Text>}
                </View>
              )}
              <Text style={styles.hint}>{revealed ? "Swipe left to review again or right when it feels familiar" : "Tap to reveal meaning"}</Text>
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

        {lastReview && (
          <Pressable disabled={grading} style={[styles.undoButton, grading && styles.disabledButton]} onPress={undoLastReview} accessibilityRole="button" accessibilityLabel={`Undo review for ${lastReview.card.cz}`}>
            <Text style={styles.undoText}>Undo</Text>
          </Pressable>
        )}

        <View style={styles.progressGrid}>
          <Metric label="Known" value={String(knownCount)} />
          <Metric label="Learning" value={String(learningCount)} />
          <Metric label="Today" value={`${dailyProgress} reviewed`} />
          <Metric label="Due" value={String(dueCount)} />
          <Metric label="Deck size" value={String(deck.length)} />
        </View>

        <View style={styles.studyGuide}>
          <Text style={styles.guideLabel}>Study guide</Text>
          <Text style={styles.guideText}>Tap the card to reveal its meanings and example.</Text>
          <Text style={styles.guideText}>Swipe left to see a word again after 10-15 other cards; swipe right when it feels familiar.</Text>
          <Text style={styles.guideText}>Use the sound buttons to hear Czech pronunciation.</Text>
          <Text style={styles.guideText}>Use search to find a word, + to add one, and settings to choose your deck.</Text>
        </View>
      </ScrollView>

      <AppModal visible={panel === "search"} title="Search words" onClose={() => setPanel(null)}>
        <TextInput style={styles.input} value={query} onChangeText={setQuery} autoFocus placeholder="Search Czech, English, Hindi, or Urdu" />
        {deck
          .filter((card) => [card.cz, card.en, card.hi, card.ur, card.sentence].some((value) => value.toLowerCase().includes(query.toLowerCase())))
          .slice(0, 40)
          .map((card) => (
            <View key={card.id} style={styles.searchRow}>
              <Pressable style={styles.searchStudyRow} onPress={() => studySearchResult(card)}>
                <Text style={styles.rowTitle}>{card.cz}</Text>
                <View style={[styles.searchMeaningRow, settings.meaningLanguage === "ur" && styles.searchMeaningRtl]}>
                  <Text style={styles.muted}>{`${card.en}${settings.meaningLanguage === "hi" ? " ·" : ""}`}</Text>
                  <Text style={[styles.muted, settings.meaningLanguage === "ur" && styles.rtl]}>{selectedMeaning(card, settings.meaningLanguage)}</Text>
                </View>
              </Pressable>
              <Pressable style={styles.searchSaveButton} onPress={() => void toggleSavedCard(card.id)} accessibilityRole="button" accessibilityLabel={savedCardIds.has(card.id) ? `Remove ${card.cz} from My list` : `Save ${card.cz} to My list`}>
                <Text style={styles.searchSaveIcon}>{savedCardIds.has(card.id) ? "★" : "☆"}</Text>
              </Pressable>
            </View>
          ))}
      </AppModal>

      <AppModal visible={panel === "add"} title="Add your own word" onClose={() => setPanel(null)}>
        <AddWordForm onSubmit={addWord} cards={customCards} decks={settings.customDecks} onDelete={deleteWord} />
      </AppModal>

      <AppModal visible={panel === "edit"} title="Edit card" onClose={() => { setEditingCard(null); setPanel(null); }}>
        {editingCard && <EditCardForm key={editingCard.id} card={editingCard} onSubmit={saveCorrection} />}
      </AppModal>

      <AppModal visible={panel === "settings"} title="Settings" onClose={() => setPanel(null)}>
        <Text style={styles.fieldLabel}>Level</Text>
        <Segment
          value={settings.examLevel}
          options={["a2", "b1"]}
          onChange={(examLevel) => persistSettings({
            ...settings,
            examLevel,
            deckFilter: settings.deckFilter === "a2-focus" || settings.deckFilter === "b1-focus"
              ? `${examLevel}-focus`
              : settings.deckFilter
          })}
        />
        <Text style={styles.fieldLabel}>Meaning</Text>
        <Segment value={settings.meaningLanguage} options={["hi", "ur"]} onChange={(meaningLanguage) => persistSettings({ ...settings, meaningLanguage })} />
        <Text style={styles.fieldLabel}>Deck</Text>
        <DeckPicker value={settings.deckFilter} onChange={(deckFilter) => persistSettings({ ...settings, deckFilter })} decks={settings.customDecks} />
        <Text style={styles.fieldLabel}>My decks</Text>
        <CustomDeckManager decks={settings.customDecks} onCreate={(deck) => persistSettings({ ...settings, customDecks: [...settings.customDecks, deck], deckFilter: deck.id })} />
        <Text style={styles.fieldLabel}>Daily goal</Text>
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
          <Text style={styles.muted}>{accountEmail ? `Signed in as ${accountEmail}` : "Guest-first mode is active. Sign in to back up this device."}</Text>
          <Text style={styles.metric}>Status: {syncStatus}</Text>
          <View style={styles.syncActions}>
            <Pressable style={styles.secondaryAction} onPress={() => void syncNow()}><Text style={styles.secondaryActionText}>Sync now</Text></Pressable>
            <Pressable style={styles.secondaryAction} onPress={() => setPanel("account")}><Text style={styles.secondaryActionText}>{accountEmail ? "Account" : "Sign in"}</Text></Pressable>
          </View>
        </View>
      </AppModal>

      <AppModal visible={panel === "account"} title="Account and sync" onClose={() => setPanel(null)}>
        <AccountForm
          configured={Boolean(supabase)}
          supabase={supabase}
          accountEmail={accountEmail}
          busy={authBusy}
          onAuthenticate={authenticate}
          onSignOut={signOutAccount}
        />
      </AppModal>
    </SafeAreaView>
  );
}

function HeaderIcon({ icon, label, onPress, primary = false }: { icon: "search" | "add" | "settings"; label: string; onPress: () => void; primary?: boolean }) {
  const symbols = { search: "⌕", add: "+", settings: "⚙" };
  return (
    <Pressable style={[styles.headerIcon, primary && styles.headerIconPrimary]} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <Text style={[styles.headerIconText, primary && styles.headerIconPrimaryText]}>{symbols[icon]}</Text>
    </Pressable>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function AppModal({ visible, title, onClose, children }: { visible: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalSheet}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <Pressable style={styles.closeButton} onPress={onClose} accessibilityRole="button" accessibilityLabel={`Close ${title}`}>
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.modalContent} keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
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

function DeckPicker({ value, onChange, decks = [], options = ["a2-focus", "b1-focus", "saved", "core", "all", "daily", "extended", "work", "travel", "health", "verbs", "forms", "numbers", "custom"] }: { value: string; onChange: (value: string) => void; decks?: CustomDeck[]; options?: string[] }) {
  const allOptions = [...options, ...decks.map((deck) => deck.id)];
  const labelFor = (option: string) => decks.find((deck) => deck.id === option)?.name || ({ "a2-focus": "A2 Focus 1000", "b1-focus": "B1 Focus 1000", saved: "My list", core: "Core words", all: "All cards" }[option] || option);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.deckPicker}>
      {allOptions.map((option) => (
        <Pressable key={option} style={[styles.deckChip, value === option && styles.deckChipActive]} onPress={() => onChange(option)}>
          <Text style={[styles.deckChipText, value === option && styles.deckChipTextActive]}>{labelFor(option)}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

function CustomDeckManager({ decks, onCreate }: { decks: CustomDeck[]; onCreate: (deck: CustomDeck) => void }) {
  const [name, setName] = useState("");
  const create = () => {
    const clean = name.trim().replace(/\s+/g, " ");
    if (!clean || decks.some((deck) => deck.name.toLowerCase() === clean.toLowerCase())) return;
    onCreate({ id: `deck-${slug(clean)}-${Date.now()}`, name: clean });
    setName("");
  };
  return (
    <View style={styles.deckManager}>
      <View style={styles.deckCreateRow}>
        <TextInput style={[styles.input, styles.deckNameInput]} value={name} onChangeText={setName} placeholder="Deck name" />
        <Pressable style={styles.secondaryAction} onPress={create}><Text style={styles.secondaryActionText}>Create</Text></Pressable>
      </View>
      {decks.map((deck) => <Text key={deck.id} style={styles.muted}>{deck.name}</Text>)}
    </View>
  );
}

function AccountForm({ configured, supabase, accountEmail, busy, onAuthenticate, onSignOut }: {
  configured: boolean;
  supabase: ReturnType<typeof createSupabaseClient>;
  accountEmail: string | null;
  busy: boolean;
  onAuthenticate: (mode: "sign-in" | "sign-up", email: string, password: string, displayName: string) => Promise<string | null>;
  onSignOut: () => Promise<string | null>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [friendCode, setFriendCode] = useState("");
  const [myFriendCode, setMyFriendCode] = useState<string | null>(null);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<FriendStreak[]>([]);
  const [message, setMessage] = useState("");
  const submit = async (mode: "sign-in" | "sign-up") => {
    if (!email.trim() || !password) {
      setMessage("Enter your email and password.");
      return;
    }
    const error = await onAuthenticate(mode, email, password, displayName);
    setMessage(error || (mode === "sign-up" ? "Account created. Check email confirmation if your project requires it." : "Signed in and syncing this device."));
  };
  const refreshFriends = async () => {
    const activity = await loadFriendActivity(supabase);
    setFriendRequests(activity.requests);
    setFriends(activity.friends);
  };
  useEffect(() => {
    if (!accountEmail) return;
    void getFriendCode(supabase).then(setMyFriendCode);
    void refreshFriends();
  }, [accountEmail, supabase]);
  if (!configured) return <Text style={styles.muted}>This build has no Supabase URL or anonymous key. Offline study remains available.</Text>;
  if (accountEmail) return (
    <View style={styles.form}>
      <Text style={styles.rowTitle}>{accountEmail}</Text>
      <Text style={styles.muted}>Your offline reviews, custom words, corrections, settings, and saved words are queued for this account.</Text>
      <View style={styles.friendPanel}>
        <Text style={styles.fieldLabel}>Friend code</Text>
        <Text style={styles.friendCode}>{myFriendCode || "Preparing..."}</Text>
        <TextInput style={styles.input} value={friendCode} onChangeText={setFriendCode} autoCapitalize="none" placeholder="Enter a friend's code" />
        <Pressable style={styles.secondaryAction} onPress={async () => {
          setMessage((await sendFriendRequest(supabase, friendCode)) || "Friend request sent.");
          setFriendCode("");
          await refreshFriends();
        }}><Text style={styles.secondaryActionText}>Send friend request</Text></Pressable>
        {friendRequests.map((request) => (
          <View key={request.id} style={styles.friendRow}>
            <Text style={styles.muted}>{request.display_name || request.friend_code} wants to connect.</Text>
            <View style={styles.friendActions}>
              <Pressable style={styles.smallAction} onPress={async () => { setMessage((await respondToFriendRequest(supabase, request.id, true)) || "Friend added."); await refreshFriends(); }}><Text style={styles.secondaryActionText}>Accept</Text></Pressable>
              <Pressable style={styles.smallAction} onPress={async () => { setMessage((await respondToFriendRequest(supabase, request.id, false)) || "Request declined."); await refreshFriends(); }}><Text style={styles.secondaryActionText}>Decline</Text></Pressable>
            </View>
          </View>
        ))}
        {friends.map((friend) => <Text key={friend.friend_code} style={styles.muted}>{friend.display_name || friend.friend_code}: {friend.current_streak ?? 0}-day streak</Text>)}
      </View>
      {Boolean(message) && <Text style={styles.formError}>{message}</Text>}
      <Pressable disabled={busy} style={[styles.dangerButton, busy && styles.disabledButton]} onPress={async () => setMessage((await onSignOut()) || "Signed out. Your local study data remains on this device.")}><Text style={styles.dangerButtonText}>Sign out</Text></Pressable>
    </View>
  );
  return (
    <View style={styles.form}>
      <TextInput style={styles.input} value={displayName} onChangeText={setDisplayName} placeholder="Display name (for friends, optional)" />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="Email" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Password" />
      {Boolean(message) && <Text style={styles.formError}>{message}</Text>}
      <Pressable disabled={busy} style={[styles.primaryButton, busy && styles.disabledButton]} onPress={() => void submit("sign-in")}><Text style={styles.primaryButtonText}>Sign in</Text></Pressable>
      <Pressable disabled={busy} style={[styles.secondaryAction, busy && styles.disabledButton]} onPress={() => void submit("sign-up")}><Text style={styles.secondaryActionText}>Create account</Text></Pressable>
    </View>
  );
}

function AddWordForm({ onSubmit, cards, decks, onDelete }: {
  onSubmit: (values: { cz: string; en: string; hi: string; ur: string; sentence: string; sentenceEn: string; tag: string }) => void;
  cards: Card[];
  decks: CustomDeck[];
  onDelete: (cardId: string) => void;
}) {
  const [values, setValues] = useState({ cz: "", en: "", hi: "", ur: "", sentence: "", sentenceEn: "", tag: "custom" });
  const [error, setError] = useState("");
  const update = (key: keyof typeof values, value: string) => setValues((current) => ({ ...current, [key]: value }));
  const submit = () => {
    if (!values.cz.trim() || !values.en.trim()) {
      setError("Enter the Czech word and English meaning to save it.");
      return;
    }
    setError("");
    onSubmit(values);
  };
  return (
    <View style={styles.form}>
      {[
        ["cz", "Czech word"],
        ["en", "English"],
        ["hi", "Hindi (optional)"],
        ["ur", "Urdu (optional)"],
        ["sentence", "Czech example (optional)"],
        ["sentenceEn", "English example (optional)"]
      ].map(([key, label]) => (
        <TextInput key={key} style={styles.input} value={values[key as keyof typeof values]} onChangeText={(value) => update(key as keyof typeof values, value)} placeholder={label} />
      ))}
      <Text style={styles.fieldLabel}>Deck</Text>
      <DeckPicker value={values.tag} onChange={(tag) => update("tag", tag)} decks={decks} options={["custom", "daily", "work", "travel", "health", "verbs"]} />
      {Boolean(error) && <Text style={styles.formError}>{error}</Text>}
      <Pressable style={styles.primaryButton} onPress={submit}>
        <Text style={styles.primaryButtonText}>Add word</Text>
      </Pressable>
      {cards.length > 0 && (
        <View style={styles.customList}>
          <Text style={styles.fieldLabel}>Saved words</Text>
          {cards.slice(0, 12).map((card) => (
            <View key={card.id} style={styles.customRow}>
              <View style={styles.customCopy}>
                <Text style={styles.rowTitle}>{card.cz}</Text>
                <Text style={styles.muted}>{card.en}</Text>
              </View>
              <Pressable style={styles.deleteButton} onPress={() => onDelete(card.id)} accessibilityRole="button" accessibilityLabel={`Delete ${card.cz}`}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function EditCardForm({ card, onSubmit }: {
  card: Card;
  onSubmit: (values: { cz: string; en: string; hi: string; ur: string; sentence: string; sentenceEn: string }) => void;
}) {
  const [values, setValues] = useState({
    cz: card.cz,
    en: card.en,
    hi: card.hi,
    ur: card.ur,
    sentence: card.sentence,
    sentenceEn: card.sentenceEn
  });
  const update = (key: keyof typeof values, value: string) => setValues((current) => ({ ...current, [key]: value }));
  return (
    <View style={styles.form}>
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
        <Text style={styles.primaryButtonText}>Save correction</Text>
      </Pressable>
    </View>
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
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 16, paddingBottom: 16 },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { color: "#17231f", fontSize: 25, fontWeight: "800" },
  headerActions: { flexDirection: "row", gap: 8 },
  headerIcon: { width: 42, height: 42, alignItems: "center", justifyContent: "center", borderRadius: 8, borderWidth: 1, borderColor: "#d8e2d7", backgroundColor: "#ffffff" },
  headerIconPrimary: { borderColor: "#2f6f9f", backgroundColor: "#2f6f9f" },
  headerIconText: { color: "#17231f", fontSize: 24, fontWeight: "700", lineHeight: 27 },
  headerIconPrimaryText: { color: "#ffffff", fontSize: 30 },
  content: { gap: 14, paddingBottom: 32 },
  segment: { flex: 1, flexDirection: "row", backgroundColor: "#e4ebe3", borderRadius: 8, padding: 4 },
  segmentItem: { flex: 1, alignItems: "center", paddingVertical: 8, borderRadius: 6 },
  segmentActive: { backgroundColor: "#ffffff" },
  segmentText: { color: "#53665e", fontWeight: "800" },
  segmentActiveText: { color: "#17231f" },
  deckPicker: { gap: 8, paddingVertical: 2 },
  deckManager: { gap: 8, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e2d7", borderRadius: 8, padding: 12 },
  deckCreateRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  deckNameInput: { flex: 1 },
  deckChip: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#e4ebe3", borderRadius: 8 },
  deckChipActive: { backgroundColor: "#244d43" },
  deckChipText: { color: "#244d43", fontWeight: "700" },
  deckChipTextActive: { color: "#fff" },
  card: { position: "relative", minHeight: 370, justifyContent: "center", backgroundColor: "#ffffff", borderRadius: 8, padding: 22, borderWidth: 1, borderColor: "#d8e2d7" },
  cardSaveButton: { position: "absolute", top: 14, left: 14, zIndex: 4, width: 36, height: 36, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#d8e2d7", borderRadius: 8, backgroundColor: "#ffffff" },
  cardSaveIcon: { color: "#2f6f9f", fontSize: 22, fontWeight: "800", lineHeight: 24 },
  cardEditButton: { position: "absolute", top: 14, right: 14, zIndex: 4, width: 36, height: 36, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#d8e2d7", borderRadius: 8, backgroundColor: "#ffffff" },
  cardEditIcon: { color: "#53665e", fontSize: 21, fontWeight: "800", lineHeight: 23 },
  swipeOverlay: { position: "absolute", zIndex: 10, left: -10, right: -10, top: "50%", transform: [{ translateY: -42 }, { rotate: "-18deg" }], borderWidth: 4, borderRadius: 8, paddingVertical: 8, backgroundColor: "rgba(255, 255, 255, 0.92)", fontSize: 62, fontWeight: "900", lineHeight: 68, textAlign: "center", textTransform: "uppercase" },
  swipeKnown: { color: "#167b55", borderColor: "#167b55" },
  swipeAgain: { color: "#b33b32", borderColor: "#b33b32" },
  word: { fontSize: 48, lineHeight: 56, color: "#17231f", fontWeight: "900", textAlign: "center" },
  answer: { gap: 8, marginTop: 18 },
  meaning: { fontSize: 18, color: "#22352f", fontWeight: "700" },
  rtl: { writingDirection: "rtl", textAlign: "right" },
  example: { fontSize: 17, color: "#31463d", marginTop: 8 },
  hint: { color: "#6d7f75", marginTop: 22, textAlign: "center", fontWeight: "700" },
  muted: { color: "#6d7f75", lineHeight: 20 },
  soundRow: { flexDirection: "row", gap: 10 },
  secondaryButton: { flex: 1, alignItems: "center", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#d8e2d7", backgroundColor: "#ffffff" },
  secondaryButtonText: { color: "#244d43", fontWeight: "800" },
  undoButton: { alignSelf: "center", minWidth: 96, alignItems: "center", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, borderWidth: 1, borderColor: "#9aa9a1", backgroundColor: "#ffffff" },
  undoText: { color: "#244d43", fontWeight: "800" },
  disabledButton: { opacity: 0.45 },
  progressGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  metricCard: { width: "48%", minHeight: 78, justifyContent: "center", backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e2d7", borderRadius: 8, padding: 13 },
  metricLabel: { color: "#6d7f75", fontSize: 12, fontWeight: "800", textTransform: "uppercase" },
  metricValue: { color: "#20362f", fontSize: 19, fontWeight: "800", marginTop: 4 },
  studyGuide: { gap: 8, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e2d7", borderRadius: 8, padding: 14 },
  guideLabel: { color: "#6d7f75", fontSize: 12, fontWeight: "800", textTransform: "uppercase" },
  guideText: { color: "#51645b", lineHeight: 20, fontWeight: "600" },
  metric: { color: "#20362f", fontWeight: "700" },
  input: { backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e2d7", borderRadius: 8, padding: 14, fontSize: 16 },
  row: { backgroundColor: "#ffffff", borderRadius: 8, padding: 14, borderWidth: 1, borderColor: "#d8e2d7" },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#ffffff", borderRadius: 8, padding: 8, borderWidth: 1, borderColor: "#d8e2d7" },
  searchStudyRow: { flex: 1, padding: 6 },
  searchSaveButton: { width: 38, height: 38, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#2f6f9f", borderRadius: 8, backgroundColor: "#ffffff" },
  searchSaveIcon: { color: "#2f6f9f", fontSize: 20, fontWeight: "800" },
  rowTitle: { color: "#17231f", fontWeight: "800", fontSize: 16 },
  searchMeaningRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  searchMeaningRtl: { justifyContent: "space-between" },
  sectionTitle: { color: "#17231f", fontWeight: "900", fontSize: 18 },
  fieldLabel: { color: "#6d7f75", fontSize: 12, fontWeight: "800", textTransform: "uppercase", marginTop: 4 },
  form: { gap: 14 },
  formError: { color: "#b33b32", fontWeight: "700" },
  customList: { gap: 8, marginTop: 4 },
  customRow: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e2d7", borderRadius: 8, padding: 12 },
  customCopy: { flex: 1, gap: 2 },
  deleteButton: { minWidth: 72, alignItems: "center", borderWidth: 1, borderColor: "#e5b8b3", borderRadius: 8, paddingVertical: 9, paddingHorizontal: 10, backgroundColor: "#ffffff" },
  deleteButtonText: { color: "#b33b32", fontWeight: "800" },
  primaryButton: { alignItems: "center", backgroundColor: "#244d43", borderRadius: 8, padding: 14 },
  primaryButtonText: { color: "#fff", fontWeight: "900" },
  secondaryAction: { alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#2f6f9f", borderRadius: 8, paddingVertical: 11, paddingHorizontal: 14, backgroundColor: "#ffffff" },
  secondaryActionText: { color: "#2f6f9f", fontWeight: "800" },
  dangerButton: { alignItems: "center", backgroundColor: "#b33b32", borderRadius: 8, padding: 14 },
  dangerButtonText: { color: "#ffffff", fontWeight: "900" },
  friendPanel: { gap: 8, backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#d8e2d7", borderRadius: 8, padding: 14 },
  friendCode: { color: "#20362f", fontSize: 22, fontWeight: "900", letterSpacing: 1.5 },
  friendRow: { gap: 8, borderTopWidth: 1, borderTopColor: "#e4ebe3", paddingTop: 10 },
  friendActions: { flexDirection: "row", gap: 8 },
  smallAction: { flex: 1, alignItems: "center", borderWidth: 1, borderColor: "#2f6f9f", borderRadius: 8, paddingVertical: 8, backgroundColor: "#ffffff" },
  toggleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", borderRadius: 8, padding: 14 },
  syncPanel: { gap: 8, backgroundColor: "#ffffff", borderRadius: 8, padding: 14, borderWidth: 1, borderColor: "#d8e2d7" },
  syncActions: { flexDirection: "row", gap: 8 },
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(23, 33, 27, 0.42)" },
  modalSheet: { maxHeight: "90%", backgroundColor: "#f2f5ef", borderTopLeftRadius: 8, borderTopRightRadius: 8 },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 18, paddingTop: 18, paddingBottom: 12, backgroundColor: "#ffffff", borderBottomWidth: 1, borderBottomColor: "#d8e2d7" },
  modalTitle: { color: "#17231f", fontSize: 20, fontWeight: "900" },
  closeButton: { width: 36, height: 36, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#d8e2d7", borderRadius: 8, backgroundColor: "#ffffff" },
  closeButtonText: { color: "#17231f", fontSize: 28, lineHeight: 30 },
  modalContent: { gap: 14, padding: 18, paddingBottom: 32 }
});
