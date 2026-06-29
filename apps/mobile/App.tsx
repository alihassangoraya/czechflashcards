import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Modal,
  PanResponder,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Switch,
  Text,
  TextInput,
  View
} from "react-native";
import * as Speech from "./src/speech";
import MaterialIcons from "./src/components/MaterialIcons";
import {
  applyReviewGrade,
  compareDueReviewStates,
  formatInterval,
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
import { HomeScreen } from "./src/features/home/HomeScreen";
import { QuizScreen } from "./src/features/quiz/QuizScreen";
import { SettingsPanel } from "./src/features/settings/SettingsPanel";
import { SearchPanel } from "./src/features/search/SearchPanel";
import { AddWordPanel } from "./src/features/words/AddWordPanel";
import { GeminiTutorPanel } from "./src/features/tutor/GeminiTutorPanel";
import { colors, radius, shadow, size, spacing, typography } from "./src/theme/design";

type Panel = "search" | "add" | "edit" | "settings" | "account" | "grammar";
type Screen = "home" | "study" | "quiz";
type RelearningEntry = { id: string; remaining: number };
type UndoReview = { card: Card; previousState: ReviewState; event: ReviewEvent; previousRelearningQueue: RelearningEntry[] };
const RELEARNING_MIN_CARDS = 10;
const RELEARNING_MAX_CARDS = 15;
const RECENT_CARD_LIMIT = 18;
const EMPTY_SAVED_CARD_IDS = new Set<string>();

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
  const [screen, setScreen] = useState<Screen>("home");
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
  const [sessionReviews, setSessionReviews] = useState(0);
  const dragX = useRef(new Animated.Value(0)).current;
  const consumedSwipe = useRef(false);
  const swipeCompleting = useRef(false);
  const forcedCardId = useRef<string | null>(null);
  const revealForcedCard = useRef(false);
  const relearningQueue = useRef<RelearningEntry[]>([]);
  const recentCardIds = useRef<string[]>([]);
  const savingCardIds = useRef(new Set<string>());
  const flipProgress = useRef(new Animated.Value(0)).current;
  const [flipping, setFlipping] = useState(false);

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

  const savedDeckIds = settings?.deckFilter === "saved" ? savedCardIds : null;
  const deck = useMemo(() => {
    if (!settings) return [];
    return filterDeck(cards, settings.examLevel, settings.deckFilter, savedDeckIds || EMPTY_SAVED_CARD_IDS);
  }, [cards, savedDeckIds, settings]);

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
    const nextCard = forced || relearning || chooseVariedDueCard(due, now) || fallbackRelearning || null;
    rememberShownCard(nextCard);
    setCurrent(nextCard);
    setRevealed(Boolean(forced && revealForcedCard.current));
    forcedCardId.current = null;
    revealForcedCard.current = false;
  }, [deck, states]);

  useEffect(() => {
    flipProgress.stopAnimation();
    flipProgress.setValue(revealed ? 1 : 0);
    setFlipping(false);
  }, [current?.id]);

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
    const ready = eligible.filter((item) => item.remaining <= 0);
    const candidates = ready.length ? ready : allowEarlyReturn ? eligible.filter((item) => item.remaining === Math.min(...eligible.map((item) => item.remaining))) : [];
    const freshCandidates = candidates.filter((item) => !recentCardIds.current.includes(item.id));
    const pool = freshCandidates.length ? freshCandidates : candidates;
    const entry = pool.length ? pool[Math.floor(Math.random() * pool.length)] : null;
    if (!entry) return null;
    relearningQueue.current = relearningQueue.current.filter((item) => item.id !== entry.id);
    return cardsById.get(entry.id) || null;
  }

  function chooseVariedDueCard(dueCards: Card[], now: number): Card | null {
    const ranked = dueCards.slice().sort((a, b) => {
      const aState = states[a.id] || { cardId: a.id, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
      const bState = states[b.id] || { cardId: b.id, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
      return compareDueReviewStates(aState, bState, now);
    });
    if (!ranked.length) return null;
    const first = ranked[0];
    const firstState = states[first.id] || { cardId: first.id, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
    const equallyUrgent = ranked.filter((card) => {
      const state = states[card.id] || { cardId: card.id, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
      return compareDueReviewStates(state, firstState, now) === 0;
    });
    const freshCandidates = equallyUrgent.filter((card) => !recentCardIds.current.includes(card.id));
    const pool = freshCandidates.length ? freshCandidates : equallyUrgent;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function rememberShownCard(card: Card | null) {
    if (!card || recentCardIds.current[recentCardIds.current.length - 1] === card.id) return;
    recentCardIds.current = [...recentCardIds.current.filter((id) => id !== card.id), card.id].slice(-RECENT_CARD_LIMIT);
  }

  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 12 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
    onMoveShouldSetPanResponderCapture: (_, gesture) => Math.abs(gesture.dx) > 12 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
    onPanResponderGrant: () => dragX.stopAnimation(),
    onPanResponderTerminationRequest: () => false,
    onPanResponderMove: (_, gesture) => {
      if (swipeCompleting.current) return;
      dragX.setValue(gesture.dx);
      setSwipeDirection(gesture.dx > 24 ? "known" : gesture.dx < -24 ? "again" : null);
    },
    onPanResponderRelease: (_, gesture) => {
      const direction = gesture.dx > 90 ? "known" : gesture.dx < -90 ? "again" : null;
      if (!grading && direction) {
        consumedSwipe.current = true;
        swipeCompleting.current = true;
        setSwipeDirection(direction);
        Animated.timing(dragX, {
          toValue: direction === "known" ? 460 : -460,
          duration: 230,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        }).start(({ finished }) => {
          dragX.setValue(0);
          setSwipeDirection(null);
          swipeCompleting.current = false;
          if (finished) void grade(direction === "known" ? "good" : "again");
        });
        setTimeout(() => { consumedSwipe.current = false; }, 360);
        return;
      }
      setSwipeDirection(null);
      Animated.spring(dragX, { toValue: 0, useNativeDriver: true, speed: 22, bounciness: 5 }).start();
    },
    onPanResponderTerminate: () => {
      if (swipeCompleting.current) return;
      setSwipeDirection(null);
      Animated.spring(dragX, { toValue: 0, useNativeDriver: true, speed: 22, bounciness: 5 }).start();
    }
  }), [current, db, grading, settings, states]);

  function flipCard() {
    if (consumedSwipe.current) {
      consumedSwipe.current = false;
      return;
    }
    if (!current || flipping) return;
    const nextRevealed = !revealed;
    setFlipping(true);
    Animated.timing(flipProgress, {
      toValue: nextRevealed ? 1 : 0,
      duration: 400,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished) setRevealed(nextRevealed);
      setFlipping(false);
    });
  }

  function reviewInterval(grade: ReviewGrade): string {
    if (!current) return "";
    const state = states[current.id] || { cardId: current.id, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
    const now = Date.now();
    const next = applyReviewGrade(state, grade, now);
    return formatInterval(next.event.nextDueAt - now);
  }

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

  async function selectCategory(category: string) {
    if (!settings) return;
    await persistSettings({ ...settings, deckFilter: category });
    setSessionReviews(0);
    setScreen("study");
  }

  function startStudy() {
    setSessionReviews(0);
    setScreen("study");
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
      setSessionReviews((value) => value + 1);
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
      setSessionReviews((value) => Math.max(0, value - 1));
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
    if (!db || savingCardIds.current.has(cardId)) return;

    savingCardIds.current.add(cardId);
    const nextSaved = !savedCardIds.has(cardId);
    setSavedCardIds((previous) => {
      const next = new Set(previous);
      if (nextSaved) next.add(cardId);
      else next.delete(cardId);
      return next;
    });

    try {
      await setCardSaved(db, cardId, nextSaved);
    } catch {
      setSavedCardIds(await loadSavedCardIds(db));
    } finally {
      savingCardIds.current.delete(cardId);
    }
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
    setSessionReviews(0);
    setScreen("study");
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
  const [reviewedToday, dailyGoal] = dailyProgress.split(" / ").map((value) => Number.parseInt(value, 10) || 0);
  const sessionProgress = dailyGoal ? Math.min(1, reviewedToday / dailyGoal) : 0;
  const sessionTarget = Math.min(deck.length, Math.max(1, dailyGoal - reviewedToday + sessionReviews));
  const cardRotation = dragX.interpolate({ inputRange: [-120, 0, 120], outputRange: ["-4deg", "0deg", "4deg"], extrapolate: "clamp" });

  return (
    <SafeAreaView style={styles.shell}>
      <StatusBar barStyle="dark-content" />
      {screen === "home" && (
        <HomeScreen
          deck={deck}
          allCards={cards}
          states={states}
          settings={settings}
          savedCount={savedCardIds.size}
          customCount={customCards.length}
          dailyProgress={dailyProgress}
          accountEmail={accountEmail}
          syncStatus={syncStatus}
          onStartStudy={startStudy}
          onStartQuiz={() => setScreen("quiz")}
          onSelectCategory={selectCategory}
          onSearch={() => setPanel("search")}
          onAdd={() => setPanel("add")}
          onSettings={() => setPanel("settings")}
          onAccount={() => setPanel("account")}
        />
      )}

      {screen === "quiz" && <QuizScreen deck={deck} onClose={() => setScreen("home")} />}

      {screen === "study" && (
        <>
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <Pressable style={styles.backIcon} onPress={() => setScreen("home")} accessibilityRole="button" accessibilityLabel="Back home">
                <MaterialIcons name="arrow-back" size={size.iconLarge} color={colors.textStrong} />
              </Pressable>
              <View>
                <Text style={styles.title}>Czech Flashcards</Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <HeaderIcon icon="school" label="Open grammar guide" onPress={() => setPanel("grammar")} />
            </View>
          </View>

          <View style={styles.sessionProgressRow}>
            <Text style={styles.sessionProgressText}>Card {sessionReviews + 1} of {sessionTarget} · Today {reviewedToday} / {dailyGoal}</Text>
            <View style={styles.sessionProgressTrack}>
              <View style={[styles.sessionProgressFill, { width: `${Math.max(3, sessionProgress * 100)}%` }]} />
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.content} directionalLockEnabled>
            <View style={styles.cardFrame} {...panResponder.panHandlers}>
              <Pressable style={styles.cardTapSurface} onPress={flipCard} accessibilityRole="button" accessibilityLabel={revealed ? "Show Czech word" : "Reveal meaning"} />
              <Animated.View pointerEvents="box-none" style={[styles.cardMotion, { transform: [{ translateX: dragX }, { rotateZ: cardRotation }] }]}>
                {swipeDirection && (
                  <Text style={[styles.swipeOverlay, swipeDirection === "known" ? styles.swipeKnown : styles.swipeAgain]}>
                    {swipeDirection === "known" ? "Known" : "Again"}
                  </Text>
                )}
                {current ? (
                  <>
                    <Pressable
                      style={styles.cardSaveButton}
                      onPressIn={(event) => event.stopPropagation()}
                      onPress={(event) => { event.stopPropagation(); void toggleSavedCard(current.id); }}
                      accessibilityRole="button"
                      accessibilityState={{ selected: savedCardIds.has(current.id) }}
                      accessibilityLabel={savedCardIds.has(current.id) ? `Remove ${current.cz} from My list` : `Add ${current.cz} to My list`}
                    >
                      <MaterialIcons name={savedCardIds.has(current.id) ? "star" : "star-border"} size={size.icon} color={colors.action} />
                    </Pressable>
                    {revealed && !flipping && (
                      <Pressable style={styles.cardEditButton} onPress={(event) => { event.stopPropagation(); openCardEditor(); }} accessibilityRole="button" accessibilityLabel={`Edit ${current.cz}`}>
                        <MaterialIcons name="edit" size={size.iconMedium} color={colors.actionMuted} />
                      </Pressable>
                    )}
                    <Animated.View
                      pointerEvents="box-none"
                      style={[
                        styles.cardFace,
                        {
                          transform: [
                            { perspective: 1200 },
                            { rotateY: flipProgress.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] }) }
                          ]
                        }
                      ]}
                    >
                      <Text style={styles.word}>{current.cz}</Text>
                      <Pressable
                        style={styles.pronunciationPill}
                        onPress={(event) => { event.stopPropagation(); Speech.speak(current.cz, { language: "cs-CZ", rate: 0.86 }); }}
                        accessibilityRole="button"
                        accessibilityLabel={`Play ${current.cz}`}
                      >
                        <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.action} />
                        <Text style={styles.pronunciationText}>{current.pronunciation || pronunciationHint(current.cz)}</Text>
                      </Pressable>
                      <View style={styles.swipeAffordance}>
                        <MaterialIcons name="arrow-back" size={size.icon} color={colors.danger} />
                        <MaterialIcons name="arrow-forward" size={size.icon} color={colors.success} />
                      </View>
                      <Text style={styles.hint}>Tap to reveal meaning</Text>
                    </Animated.View>
                    <Animated.View
                      pointerEvents="box-none"
                      style={[
                        styles.cardFace,
                        styles.cardBack,
                        {
                          transform: [
                            { perspective: 1200 },
                            { rotateY: flipProgress.interpolate({ inputRange: [0, 1], outputRange: ["180deg", "360deg"] }) }
                          ]
                        }
                      ]}
                    >
                      <Text style={styles.backWord}>{current.cz}</Text>
                      <View style={styles.answer}>
                        <Text style={styles.contentLabel}>Translation</Text>
                        <View style={styles.meaningRow}>
                          <Text style={styles.meaning}>{current.en}</Text>
                          <Text style={[styles.meaning, settings.meaningLanguage === "ur" && styles.rtl]}>
                            {selectedMeaning(current, settings.meaningLanguage)}
                          </Text>
                        </View>
                        {Boolean(current.sentence) && (
                          <View style={styles.exampleBlock}>
                            <Text style={styles.contentLabel}>In context</Text>
                            <Pressable
                              style={styles.exampleSpeech}
                              onPress={(event) => { event.stopPropagation(); Speech.speak(current.sentence, { language: "cs-CZ", rate: 0.86 }); }}
                              accessibilityRole="button"
                              accessibilityLabel="Play Czech example"
                            >
                              <MaterialIcons name="volume-up" size={size.iconSmall} color={colors.action} />
                              <Text style={styles.example} numberOfLines={2}>{current.sentence}</Text>
                            </Pressable>
                            {Boolean(current.sentenceEn) && <Text style={styles.muted} numberOfLines={2}>{current.sentenceEn}</Text>}
                          </View>
                        )}
                      </View>
                      <Text style={styles.hint}>Tap to see Czech</Text>
                    </Animated.View>
                  </>
                ) : (
                  <View style={styles.cardFace}>
                    <Text style={styles.word}>Done</Text>
                    <Text style={styles.hint}>No cards are due in this deck.</Text>
                  </View>
                )}
              </Animated.View>
            </View>

            {revealed && current && (
              <View style={styles.reviewRow}>
                <Pressable disabled={grading} style={[styles.reviewButton, styles.reviewAgain, grading && styles.disabledButton]} onPress={() => void grade("again")}>
                  <Text style={styles.reviewButtonText}>Again</Text>
                  <Text style={styles.reviewIntervalText}>{reviewInterval("again")}</Text>
                </Pressable>
                <Pressable disabled={grading} style={[styles.reviewButton, styles.reviewHard, grading && styles.disabledButton]} onPress={() => void grade("hard")}>
                  <Text style={styles.reviewButtonText}>Hard</Text>
                  <Text style={styles.reviewIntervalText}>{reviewInterval("hard")}</Text>
                </Pressable>
                <Pressable disabled={grading} style={[styles.reviewButton, styles.reviewGood, grading && styles.disabledButton]} onPress={() => void grade("good")}>
                  <Text style={styles.reviewButtonText}>Good</Text>
                  <Text style={styles.reviewIntervalText}>{reviewInterval("good")}</Text>
                </Pressable>
                <Pressable disabled={grading} style={[styles.reviewButton, styles.reviewEasy, grading && styles.disabledButton]} onPress={() => void grade("easy")}>
                  <Text style={styles.reviewEasyText}>Easy</Text>
                  <Text style={styles.reviewIntervalText}>{reviewInterval("easy")}</Text>
                </Pressable>
              </View>
            )}

            {revealed && current && <WordDetailsPanel card={current} />}

            {revealed && <GeminiTutorPanel card={current} />}

            {lastReview && (
              <Pressable disabled={grading} style={[styles.undoButton, grading && styles.disabledButton]} onPress={undoLastReview} accessibilityRole="button" accessibilityLabel={`Undo review for ${lastReview.card.cz}`}>
                <Text style={styles.undoText}>Undo</Text>
              </Pressable>
            )}

          </ScrollView>
        </>
      )}

      <AppModal visible={panel === "search"} title="Search words" onClose={() => setPanel(null)}>
        <SearchPanel
          cards={cards}
          query={query}
          meaningLanguage={settings.meaningLanguage}
          savedCardIds={savedCardIds}
          onQueryChange={setQuery}
          onStudy={studySearchResult}
          onToggleSaved={(card) => { void toggleSavedCard(card.id); }}
        />
      </AppModal>

      <AppModal visible={panel === "add"} title="Add your own word" onClose={() => setPanel(null)}>
        <AddWordPanel onSubmit={addWord} cards={customCards} decks={settings.customDecks} onDelete={deleteWord} />
      </AppModal>

      <AppModal visible={panel === "edit"} title="Edit card" onClose={() => { setEditingCard(null); setPanel(null); }}>
        {editingCard && <EditCardForm key={editingCard.id} card={editingCard} onSubmit={saveCorrection} />}
      </AppModal>

      <AppModal visible={panel === "settings"} title="Settings" onClose={() => setPanel(null)}>
        <SettingsPanel
          settings={settings}
          accountEmail={accountEmail}
          syncStatus={syncStatus}
          onChange={(nextSettings) => { void persistSettings(nextSettings); }}
          onSyncNow={() => { void syncNow(); }}
          onAccount={() => setPanel("account")}
        />
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

      <AppModal visible={panel === "grammar"} title="B1 grammar guide" onClose={() => setPanel(null)}>
        {current ? <GrammarGuide card={current} /> : <Text style={styles.muted}>Choose a card to see its grammar notes.</Text>}
      </AppModal>
    </SafeAreaView>
  );
}

function HeaderIcon({ icon, label, onPress, primary = false }: { icon: "search" | "add" | "settings" | "school"; label: string; onPress: () => void; primary?: boolean }) {
  const symbols = { search: "search", add: "add", settings: "settings", school: "school" } as const;
  return (
    <Pressable style={[styles.headerIcon, primary && styles.headerIconPrimary]} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <MaterialIcons name={symbols[icon]} size={size.iconMedium} color={primary ? colors.onPrimary : colors.textStrong} />
    </Pressable>
  );
}

function GrammarGuide({ card }: { card: Card }) {
  const verb = card.en.toLowerCase().startsWith("to ") || card.tags.includes("verbs") || card.cz.split(" ")[0].endsWith("t");
  const word = card.cz.toLowerCase().trim();
  const gender = word.endsWith("a") || word.endsWith("ost")
    ? "Likely feminine"
    : word.endsWith("o") || word.endsWith("e") || word.endsWith("ě")
      ? "Likely neuter"
      : "Likely masculine";

  return (
    <View style={styles.grammarGuide}>
      <View style={styles.grammarBanner}>
        <Text style={styles.grammarWord}>{card.cz}</Text>
        <Text style={styles.grammarMeta}>{verb ? "Verb (sloveso)" : `Noun or adjective · ${gender}`}</Text>
      </View>
      {verb ? (
        <>
          <Text style={styles.grammarHeading}>Present tense</Text>
          <Text style={styles.grammarCopy}>Czech verbs change with the subject. Learn this word with its full infinitive and listen for the ending in the example.</Text>
          <View style={styles.grammarTable}>
            <Text style={styles.grammarTableText}>já · ty · on/ona</Text>
            <Text style={styles.grammarTableText}>my · vy · oni</Text>
          </View>
          <Text style={styles.grammarCopy}>Aspect matters at B1: imperfective verbs describe an action or habit; perfective verbs focus on a completed result.</Text>
        </>
      ) : (
        <>
          <Text style={styles.grammarHeading}>Cases and gender</Text>
          <Text style={styles.grammarCopy}>{gender}. Czech endings change by case, so remember the word with a short phrase, not only on its own.</Text>
          <View style={styles.grammarTable}>
            <Text style={styles.grammarTableText}>1. nominative: basic form</Text>
            <Text style={styles.grammarTableText}>4. accusative: direct object</Text>
            <Text style={styles.grammarTableText}>6. locative: after v, na, o</Text>
            <Text style={styles.grammarTableText}>7. instrumental: after s</Text>
          </View>
        </>
      )}
      {card.sentence ? <Text style={styles.grammarExample}>Example: {card.sentence}</Text> : null}
    </View>
  );
}

function WordDetailsPanel({ card }: { card: Card }) {
  const hasRelatedWords = Boolean(card.synonyms || card.antonyms);
  if (!hasRelatedWords && !card.grammar && !card.googleCategory) return null;

  return (
    <View style={styles.wordDetails}>
      <View style={styles.wordDetailsHeader}>
        <MaterialIcons name="auto-stories" size={size.iconSmall} color={colors.primaryDeep} />
        <Text style={styles.wordDetailsTitle}>Word details</Text>
        {card.googleCategory && <Text style={styles.wordDetailsCategory}>{card.googleCategory}</Text>}
      </View>
      {card.grammar && (
        <View style={styles.grammarDetail}>
          <Text style={styles.detailLabel}>Grammar</Text>
          <Text style={styles.grammarDetailTitle}>{card.grammar.partOfSpeech}{card.grammar.reflexive ? " · reflexive" : ""}</Text>
          <Text style={styles.grammarDetailText}>{card.grammar.note}</Text>
        </View>
      )}
      {card.synonyms && <RelatedWords label="Related words" icon="compare-arrows" value={card.synonyms} color={colors.success} />}
      {card.antonyms && <RelatedWords label="Opposites" icon="swap-horiz" value={card.antonyms} color={colors.danger} />}
    </View>
  );
}

function RelatedWords({ label, icon, value, color }: { label: string; icon: React.ComponentProps<typeof MaterialIcons>["name"]; value: string; color: string }) {
  const words = value.split(",").map((word) => word.trim()).filter(Boolean);
  if (!words.length) return null;
  return (
    <View style={styles.relatedWords}>
      <View style={styles.relatedWordsHeader}>
        <MaterialIcons name={icon} size={size.iconSmall} color={color} />
        <Text style={[styles.detailLabel, { color }]}>{label}</Text>
      </View>
      <View style={styles.relatedWordChips}>
        {words.map((word) => <Text key={word} style={styles.relatedWordChip}>{word}</Text>)}
      </View>
    </View>
  );
}

function pronunciationHint(word: string) {
  return `[ ${word} ] · stress the first syllable`;
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
      <Text style={styles.muted}>Your offline reviews, custom words, corrections, settings, and starred words are queued for this account.</Text>
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
  shell: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.page, paddingTop: typography.bodyLarge, paddingBottom: typography.bodyLarge },
  brandRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  title: { color: colors.textStrong, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold },
  sessionProgressRow: { width: 250, alignSelf: "center", gap: 5, marginTop: 1, marginBottom: 12 },
  sessionProgressText: { color: colors.textSubtle, fontSize: typography.caption, fontWeight: typography.weightMedium, textAlign: "center" },
  sessionProgressTrack: { height: spacing.sm, overflow: "hidden", borderRadius: spacing.xs, backgroundColor: colors.progressTrackStrong },
  sessionProgressFill: { height: "100%", borderRadius: spacing.xs, backgroundColor: colors.primary },
  headerActions: { flexDirection: "row", gap: spacing.lg },
  backIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center" },
  headerIcon: { width: size.headerAction, height: size.headerAction, alignItems: "center", justifyContent: "center", borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.border, backgroundColor: colors.surface },
  headerIconPrimary: { borderColor: colors.action, backgroundColor: colors.action },
  headerIconText: { color: colors.textStrong, fontSize: size.iconLarge, fontWeight: typography.weightBold, lineHeight: 27 },
  headerIconPrimaryText: { color: colors.onPrimary, fontSize: 30 },
  content: { gap: spacing.xlPlus, paddingHorizontal: spacing.page, paddingBottom: spacing.screenBottom },
  segment: { flex: 1, flexDirection: "row", backgroundColor: colors.surfaceMuted, borderRadius: radius.md, padding: spacing.xs },
  segmentItem: { flex: 1, alignItems: "center", paddingVertical: spacing.smd, borderRadius: radius.sm },
  segmentActive: { backgroundColor: colors.surface },
  segmentText: { color: colors.actionMuted, fontWeight: typography.weightSemibold },
  segmentActiveText: { color: colors.textStrong },
  deckPicker: { gap: 8, paddingVertical: 2 },
  deckManager: { gap: spacing.lg, backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, padding: spacing.xl },
  deckCreateRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  deckNameInput: { flex: 1 },
  deckChip: { paddingVertical: spacing.md, paddingHorizontal: spacing.lgPlus, backgroundColor: colors.surfaceMuted, borderRadius: radius.md },
  deckChipActive: { backgroundColor: colors.primaryDeep },
  deckChipText: { color: colors.primaryDeep, fontWeight: typography.weightBold },
  deckChipTextActive: { color: colors.onPrimary },
  cardFrame: { position: "relative", height: size.cardHeight },
  cardTapSurface: { ...StyleSheet.absoluteFillObject },
  cardMotion: { ...StyleSheet.absoluteFillObject },
  cardFace: { position: "absolute", inset: 0, justifyContent: "center", backgroundColor: colors.surface, borderRadius: radius.card, padding: spacing.card, borderWidth: spacing.hairline, borderColor: colors.borderSoft, backfaceVisibility: "hidden" },
  cardBack: { backgroundColor: colors.surfaceSecondary },
  cardSaveButton: { position: "absolute", top: spacing.xlPlus, left: spacing.xlPlus, zIndex: spacing.sm, width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface },
  cardSaveIcon: { color: colors.action, fontSize: size.iconMedium, fontWeight: typography.weightSemibold, lineHeight: size.iconLarge },
  cardEditButton: { position: "absolute", top: spacing.xlPlus, right: spacing.xlPlus, zIndex: spacing.sm, width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface },
  cardEditIcon: { color: colors.actionMuted, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold, lineHeight: 23 },
  swipeOverlay: { position: "absolute", zIndex: spacing.lgPlus, left: -spacing.lgPlus, right: -spacing.lgPlus, top: "50%", transform: [{ translateY: -size.headerAction }, { rotate: "-18deg" }], borderWidth: spacing.sm, borderRadius: radius.md, paddingVertical: spacing.lg, backgroundColor: colors.stampSurface, fontSize: 62, fontWeight: "900", lineHeight: 68, textAlign: "center", textTransform: "uppercase" },
  swipeKnown: { color: colors.successStrong, borderColor: colors.successStrong },
  swipeAgain: { color: colors.dangerStrong, borderColor: colors.dangerStrong },
  word: { fontSize: typography.word, lineHeight: 56, color: colors.textStrong, fontWeight: typography.weightBold, textAlign: "center" },
  pronunciationPill: { alignSelf: "center", flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.xlPlus, borderRadius: radius.md, backgroundColor: colors.actionSoft, paddingHorizontal: spacing.lg, paddingVertical: spacing.smd },
  pronunciationText: { color: colors.action, fontSize: typography.bodySmall, fontWeight: typography.weightMedium },
  backWord: { color: colors.primary, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold, textAlign: "center", marginBottom: spacing.sm },
  swipeAffordance: { flexDirection: "row", justifyContent: "space-between", marginTop: 20, paddingHorizontal: 8 },
  answer: { gap: 7, marginTop: 12 },
  contentLabel: { color: colors.action, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  meaningRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  meaning: { flex: 1, flexShrink: 1, minWidth: 0, fontSize: typography.bodyLarge, lineHeight: 21, color: colors.textBody, fontWeight: typography.weightMedium },
  rtl: { writingDirection: "rtl", textAlign: "right" },
  exampleBlock: { gap: 5, marginTop: 5 },
  exampleSpeech: { flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radius.md, backgroundColor: colors.actionSoft, paddingHorizontal: spacing.mdPlus, paddingVertical: spacing.smd },
  example: { flex: 1, fontSize: typography.bodyLarge, lineHeight: 21, color: colors.textExample },
  hint: { color: colors.textMuted, marginTop: typography.bodyLarge, textAlign: "center", fontWeight: typography.weightRegular },
  wordDetails: { gap: spacing.xl, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceWarm, padding: spacing.xlPlus },
  wordDetailsHeader: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  wordDetailsTitle: { flex: 1, color: colors.textStrong, fontSize: typography.bodyLarge, fontWeight: typography.weightSemibold },
  wordDetailsCategory: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightMedium, textAlign: "right" },
  grammarDetail: { gap: spacing.xs, borderLeftWidth: spacing.xxs, borderLeftColor: colors.primary, paddingLeft: spacing.lg },
  detailLabel: { color: colors.textMuted, fontSize: typography.caption, fontWeight: typography.weightSemibold, textTransform: "uppercase" },
  grammarDetailTitle: { color: colors.primaryDeep, fontSize: typography.body, fontWeight: typography.weightSemibold },
  grammarDetailText: { color: colors.textSoft, fontSize: typography.bodySmall, lineHeight: typography.bodyLarge + spacing.xs },
  relatedWords: { gap: spacing.smd },
  relatedWordsHeader: { flexDirection: "row", alignItems: "center", gap: spacing.smd },
  relatedWordChips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.smd },
  relatedWordChip: { overflow: "hidden", borderRadius: radius.sm, backgroundColor: colors.surfaceMuted, color: colors.textExample, fontSize: typography.bodySmall, fontWeight: typography.weightMedium, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  muted: { color: colors.textMuted, lineHeight: 20 },
  grammarGuide: { gap: 12 },
  grammarBanner: { gap: spacing.xs, borderRadius: radius.md, backgroundColor: colors.actionSoft, padding: spacing.xlPlus },
  grammarWord: { color: colors.primaryDeep, fontSize: typography.screenTitle, fontWeight: typography.weightSemibold },
  grammarMeta: { color: colors.actionMuted, fontSize: typography.bodySmall, fontWeight: typography.weightRegular },
  grammarHeading: { color: colors.primaryDeep, fontSize: typography.titleSmall, fontWeight: typography.weightSemibold, marginTop: spacing.xxs },
  grammarCopy: { color: colors.textSoft, fontSize: typography.body, lineHeight: 21, fontWeight: typography.weightRegular },
  grammarTable: { gap: spacing.md, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface, padding: spacing.xl },
  grammarTableText: { color: colors.textExample, fontSize: typography.bodySmall, lineHeight: 19, fontWeight: typography.weightRegular },
  grammarExample: { color: colors.primary, fontSize: typography.body, lineHeight: 20, fontStyle: "italic", fontWeight: typography.weightRegular },
  soundRow: { flexDirection: "row", gap: 10 },
  secondaryButton: { flex: 1, alignItems: "center", padding: spacing.xl, borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.border, backgroundColor: colors.surface },
  secondaryButtonText: { color: colors.primaryDeep, fontWeight: typography.weightSemibold },
  reviewRow: { flexDirection: "row", gap: 6 },
  reviewButton: { flex: 1, minHeight: size.reviewButton, alignItems: "center", justifyContent: "center", gap: spacing.xxs, borderRadius: radius.xl, paddingHorizontal: spacing.sm },
  reviewAgain: { backgroundColor: colors.danger },
  reviewHard: { backgroundColor: colors.warning },
  reviewGood: { backgroundColor: colors.primary },
  reviewEasy: { backgroundColor: colors.success },
  reviewButtonText: { color: colors.onPrimary, fontSize: typography.bodySmall, fontWeight: typography.weightBold },
  reviewEasyText: { color: colors.onPrimary, fontSize: typography.bodySmall, fontWeight: typography.weightBold },
  reviewIntervalText: { color: colors.onPrimaryMuted, fontSize: typography.micro, fontWeight: typography.weightMedium },
  undoButton: { alignSelf: "center", minWidth: 96, alignItems: "center", paddingVertical: spacing.lgPlus, paddingHorizontal: typography.bodyLarge, borderRadius: radius.md, borderWidth: spacing.hairline, borderColor: colors.borderMuted, backgroundColor: colors.surface },
  undoText: { color: colors.primaryDeep, fontWeight: typography.weightSemibold },
  disabledButton: { opacity: 0.45 },
  progressGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  metricCard: { width: "48%", minHeight: 78, justifyContent: "center", backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, padding: typography.bodySmall },
  metricLabel: { color: colors.textMuted, fontSize: typography.label, fontWeight: typography.weightMedium, textTransform: "uppercase" },
  metricValue: { color: colors.textDeep, fontSize: 19, fontWeight: typography.weightSemibold, marginTop: spacing.sm },
  studyGuide: { gap: spacing.lg, backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, padding: spacing.xlPlus },
  guideLabel: { color: colors.textMuted, fontSize: typography.label, fontWeight: typography.weightMedium, textTransform: "uppercase" },
  guideText: { color: colors.textSoft, lineHeight: 20, fontWeight: typography.weightSemibold },
  metric: { color: colors.textDeep, fontWeight: typography.weightBold },
  input: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, padding: spacing.xlPlus, fontSize: typography.bodyLarge },
  row: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.xlPlus, borderWidth: spacing.hairline, borderColor: colors.border },
  searchRow: { flexDirection: "row", alignItems: "center", gap: spacing.lg, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, borderWidth: spacing.hairline, borderColor: colors.border },
  searchStudyRow: { flex: 1, padding: 6 },
  searchSaveButton: { width: 38, height: 38, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, backgroundColor: colors.surface },
  searchSaveIcon: { color: colors.action, fontSize: size.icon, fontWeight: typography.weightSemibold },
  rowTitle: { color: colors.textStrong, fontWeight: typography.weightSemibold, fontSize: typography.bodyLarge },
  searchMeaningRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  searchMeaningRtl: { justifyContent: "space-between" },
  sectionTitle: { color: colors.textStrong, fontWeight: typography.weightBold, fontSize: typography.title },
  fieldLabel: { color: colors.textMuted, fontSize: typography.label, fontWeight: typography.weightMedium, textTransform: "uppercase", marginTop: spacing.sm },
  form: { gap: 14 },
  formError: { color: colors.dangerStrong, fontWeight: typography.weightBold },
  customList: { gap: 8, marginTop: 4 },
  customRow: { flexDirection: "row", alignItems: "center", gap: spacing.xl, backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, padding: spacing.xl },
  customCopy: { flex: 1, gap: 2 },
  deleteButton: { minWidth: 72, alignItems: "center", borderWidth: spacing.hairline, borderColor: colors.dangerBorder, borderRadius: radius.md, paddingVertical: 9, paddingHorizontal: spacing.lgPlus, backgroundColor: colors.surface },
  deleteButtonText: { color: colors.dangerStrong, fontWeight: typography.weightSemibold },
  primaryButton: { alignItems: "center", backgroundColor: colors.primaryDeep, borderRadius: radius.md, padding: spacing.xlPlus },
  primaryButtonText: { color: colors.onPrimary, fontWeight: typography.weightSemibold },
  secondaryAction: { alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, paddingVertical: 11, paddingHorizontal: spacing.xlPlus, backgroundColor: colors.surface },
  secondaryActionText: { color: colors.action, fontWeight: typography.weightSemibold },
  dangerButton: { alignItems: "center", backgroundColor: colors.dangerStrong, borderRadius: radius.md, padding: spacing.xlPlus },
  dangerButtonText: { color: colors.onPrimary, fontWeight: typography.weightSemibold },
  friendPanel: { gap: spacing.lg, backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, padding: spacing.xlPlus },
  friendCode: { color: colors.textDeep, fontSize: size.iconMedium, fontWeight: typography.weightBold, letterSpacing: 1.5 },
  friendRow: { gap: spacing.lg, borderTopWidth: spacing.hairline, borderTopColor: colors.surfaceMuted, paddingTop: spacing.lgPlus },
  friendActions: { flexDirection: "row", gap: spacing.lg },
  smallAction: { flex: 1, alignItems: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, paddingVertical: spacing.lg, backgroundColor: colors.surface },
  toggleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.xlPlus },
  syncPanel: { gap: spacing.lg, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.xlPlus, borderWidth: spacing.hairline, borderColor: colors.border },
  syncActions: { flexDirection: "row", gap: spacing.lg },
  modalOverlay: { flex: 1, justifyContent: "flex-end", backgroundColor: colors.modalOverlay },
  modalSheet: { maxHeight: "90%", backgroundColor: colors.sheet, borderTopLeftRadius: radius.md, borderTopRightRadius: radius.md },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.page, paddingTop: spacing.panel, paddingBottom: spacing.xl, backgroundColor: colors.surface, borderBottomWidth: spacing.hairline, borderBottomColor: colors.border },
  modalTitle: { color: colors.textStrong, fontSize: size.icon, fontWeight: typography.weightBold },
  closeButton: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, backgroundColor: colors.surface },
  closeButtonText: { color: colors.textStrong, fontSize: typography.display, lineHeight: 30 },
  modalContent: { gap: 14, padding: 15, paddingBottom: 28 }
});
