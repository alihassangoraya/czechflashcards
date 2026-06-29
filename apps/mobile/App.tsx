import React, { useEffect, useMemo, useRef, useState } from "react";
import { AppLoadingScreen } from "./src/components/AppLoadingScreen";
import {
  applyReviewGrade,
  formatInterval,
  filterDeck,
  normalizeCards,
  parseCsvCards,
  slug,
  type Card,
  type ReviewGrade,
  type ReviewState
} from "@czech-flashcards/shared";
import seedPayload from "@czech-flashcards/shared/seed";
import { AppShell } from "./src/app/AppShell";
import type { Panel, Screen, UndoReview } from "./src/app/appTypes";
import { buildAccountStudySummary, parseDailyProgress } from "./src/app/studySummary";
import {
  addCustomCard,
  deleteCustomCard,
  exportBackup,
  getDailyProgress,
  getReviewState,
  importCards,
  loadCards,
  loadReviewStates,
  loadSavedCardIds,
  loadSettings,
  openAppDatabase,
  saveReviewResult,
  markCardsDueNow,
  restoreBackup,
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
import { createSupabaseClient, flushSyncQueue, restoreSyncSnapshot, signInWithPassword, signOut, signUpWithPassword, type SyncStatus } from "./src/sync";
import { useStudyAnimations } from "./src/features/study/useStudyAnimations";
import {
  advanceRelearningQueue as advanceRelearningEntries,
  chooseVariedDueCard,
  rememberShownCardId,
  scheduleRelearningEntry,
  shuffleValues,
  sortDueCardsByUrgency,
  takeRelearningCardFromQueue,
  type RelearningEntry
} from "./src/features/study/studyQueue";
import { downloadJson, pickTextFile } from "./src/services/fileTransfer";
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
  const [editReturnPanel, setEditReturnPanel] = useState<Panel | null>(null);
  const [query, setQuery] = useState("");
  const [dailyProgress, setDailyProgress] = useState("0 / 30");
  const [syncStatus, setSyncStatus] = useState<SyncStatus>("not-configured");
  const [settingsNotice, setSettingsNotice] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [accountEmail, setAccountEmail] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);
  const [lastReview, setLastReview] = useState<UndoReview | null>(null);
  const [grading, setGrading] = useState(false);
  const [sessionReviews, setSessionReviews] = useState(0);
  const forcedCardId = useRef<string | null>(null);
  const revealForcedCard = useRef(false);
  const shuffledDueQueue = useRef<string[]>([]);
  const relearningQueue = useRef<RelearningEntry[]>([]);
  const recentCardIds = useRef<string[]>([]);
  const savingCardIds = useRef(new Set<string>());
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const studyAnimations = useStudyAnimations({
    current,
    revealed,
    grading,
    onRevealChange: setRevealed,
    onSwipeGrade: (result) => { void grade(result); }
  });

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
    const due = sortDueCardsByUrgency(
      deck.filter((card) => (states[card.id]?.dueAt || 0) <= now && !queuedIds.has(card.id)),
      states,
      now
    );
    const forced = forcedCardId.current ? deck.find((card) => card.id === forcedCardId.current) : null;
    const relearning = forced ? null : takeRelearningCard(deck);
    const fallbackRelearning = forced || relearning || due.length ? null : takeRelearningCard(deck, true);
    shuffledDueQueue.current = shuffledDueQueue.current.filter((id) => due.some((card) => card.id === id));
    const queued = shuffledDueQueue.current.length ? due.find((card) => card.id === shuffledDueQueue.current[0]) || null : null;
    const nextCard = forced || relearning || queued || chooseVariedDueCard(due, states, recentCardIds.current, now) || fallbackRelearning || null;
    rememberShownCard(nextCard);
    setCurrent(nextCard);
    setRevealed(Boolean(forced && revealForcedCard.current));
    forcedCardId.current = null;
    revealForcedCard.current = false;
  }, [deck, states]);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  function scheduleRelearning(cardId: string) {
    relearningQueue.current = scheduleRelearningEntry(relearningQueue.current, cardId, RELEARNING_MIN_CARDS, RELEARNING_MAX_CARDS);
  }

  function advanceRelearningQueue(reviewedCardId: string) {
    relearningQueue.current = advanceRelearningEntries(relearningQueue.current, reviewedCardId);
  }

  function takeRelearningCard(deckCards: Card[], allowEarlyReturn = false): Card | null {
    const next = takeRelearningCardFromQueue(relearningQueue.current, deckCards, recentCardIds.current, allowEarlyReturn);
    relearningQueue.current = next.queue;
    return next.card;
  }

  function rememberShownCard(card: Card | null) {
    recentCardIds.current = rememberShownCardId(recentCardIds.current, card, RECENT_CARD_LIMIT);
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
      shuffledDueQueue.current = shuffledDueQueue.current.filter((id) => id !== reviewedCard.id);
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
      hi: values.hi.trim(),
      ur: values.ur.trim(),
      sentence: values.sentence.trim(),
      sentenceEn: values.sentenceEn.trim(),
      level: "a2",
      tags: Array.from(new Set(["custom", values.tag])),
      source: "custom"
    };
    await addCustomCard(db, card);
    await refresh(db);
  }

  async function deleteWord(cardId: string) {
    if (!db) return;
    await deleteCustomCard(db, cardId);
    await refresh(db);
  }

  function showToast(message: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMessage(message);
    toastTimer.current = setTimeout(() => {
      setToastMessage("");
      toastTimer.current = null;
    }, 1800);
  }

  async function toggleSavedCard(cardId: string, showFeedback = false) {
    if (!db || savingCardIds.current.has(cardId)) return;

    savingCardIds.current.add(cardId);
    const nextSaved = !savedCardIds.has(cardId);
    const card = cards.find((item) => item.id === cardId);
    setSavedCardIds((previous) => {
      const next = new Set(previous);
      if (nextSaved) next.add(cardId);
      else next.delete(cardId);
      return next;
    });
    if (showFeedback) showToast(nextSaved ? `${card?.cz || "Card"} added to starred.` : `${card?.cz || "Card"} removed from starred.`);

    try {
      await setCardSaved(db, cardId, nextSaved);
    } catch {
      setSavedCardIds(await loadSavedCardIds(db));
      if (showFeedback) showToast("Could not update starred card.");
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
      ur: values.ur.trim(),
      sentence: values.sentence.trim(),
      sentenceEn: values.sentenceEn.trim()
    };
    if (card.source === "custom") await addCustomCard(db, card);
    else await saveCardCorrection(db, card);
    forcedCardId.current = card.id;
    revealForcedCard.current = true;
    const returnPanel = editReturnPanel;
    setEditingCard(null);
    setEditReturnPanel(null);
    setPanel(returnPanel);
    await refresh(db);
  }

  function openCardEditor(card = current) {
    if (!card) return;
    setEditingCard(card);
    setEditReturnPanel(panel === "add" ? "add" : null);
    setPanel("edit");
  }

  function closeCardEditor() {
    const returnPanel = editReturnPanel;
    setEditingCard(null);
    setEditReturnPanel(null);
    setPanel(returnPanel);
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

  function shuffleDueCards() {
    const due = deck.filter((card) => (states[card.id]?.dueAt || 0) <= Date.now());
    const currentId = current && due.some((card) => card.id === current.id) ? current.id : null;
    const otherIds = due.map((card) => card.id).filter((id) => id !== currentId);
    shuffledDueQueue.current = currentId ? [...shuffleValues(otherIds), currentId] : shuffleValues(otherIds);
    forcedCardId.current = null;
    setSettingsNotice(due.length ? `Shuffled ${due.length} due cards.` : "No due cards to shuffle in this deck.");
    setStates((value) => ({ ...value }));
  }

  async function reviewAllNow() {
    if (!db) return;
    const count = await markCardsDueNow(db, deck.map((card) => card.id));
    shuffledDueQueue.current = [];
    setSettingsNotice(count ? `${count} cards in this deck are due now.` : "There are no cards in this deck.");
    await refresh(db);
  }

  async function exportProgress() {
    if (!db) return;
    const ok = downloadJson("czech-flashcards-progress.json", exportBackup(db));
    setSettingsNotice(ok ? "Progress backup exported." : "Export is available in the web app. Native sharing needs a document/share module.");
  }

  function exportCurrentDeck() {
    if (!settings) return;
    const payload = {
      exportedAt: new Date().toISOString(),
      exam: settings.examLevel,
      deck: settings.deckFilter,
      cards: deck.map((card) => ({
        id: card.id,
        level: card.level,
        cz: card.cz,
        en: card.en,
        hi: card.hi,
        ur: card.ur,
        sentence: card.sentence,
        sentenceEn: card.sentenceEn,
        pronunciation: card.pronunciation,
        synonyms: card.synonyms,
        antonyms: card.antonyms,
        grammar: card.grammar,
        googleCategory: card.googleCategory,
        tags: card.tags
      }))
    };
    const ok = downloadJson(`czech-${settings.examLevel}-${settings.deckFilter}-deck.json`, payload);
    setSettingsNotice(ok ? `Exported ${deck.length} cards from the current deck.` : "Deck export is available in the web app. Native sharing needs a document/share module.");
  }

  function importCsv() {
    pickTextFile(".csv,text/csv", async (text) => {
      if (!db) return;
      const imported = normalizeCards(parseCsvCards(text));
      if (!imported.length) {
        setSettingsNotice("No valid CSV cards found. Use Czech, English, Hindi, Urdu, sentence, sentenceEn, tags.");
        return;
      }
      const count = await importCards(db, imported);
      setSettingsNotice(`Imported ${count} cards.`);
      await refresh(db);
    }, () => setSettingsNotice("CSV import is available in the web app. Native file picking needs a document picker module."));
  }

  function restoreJson() {
    pickTextFile(".json,application/json", async (text) => {
      if (!db) return;
      try {
        const nextSettings = await restoreBackup(db, JSON.parse(text));
        await seedCards(db, seedCardsNormalized);
        setSettingsState(nextSettings);
        setSettingsNotice("Progress backup restored.");
        await refresh(db);
      } catch {
        setSettingsNotice("Could not restore backup. Choose a JSON export from this app.");
      }
    }, () => setSettingsNotice("Restore JSON is available in the web app. Native file picking needs a document picker module."));
  }

  if (!db || !settings) {
    return <AppLoadingScreen />;
  }

  const customCards = cards.filter((card) => card.source === "custom");
  const accountStudySummary = buildAccountStudySummary(deck, cards, states, savedCardIds.size, settings, syncStatus);
  const { reviewedToday, dailyGoal, sessionProgress } = parseDailyProgress(dailyProgress);
  const sessionTarget = Math.min(deck.length, Math.max(1, dailyGoal - reviewedToday + sessionReviews));

  return (
    <AppShell
      screen={screen}
      panel={panel}
      deck={deck}
      cards={cards}
      customCards={customCards}
      states={states}
      settings={settings}
      savedCardIds={savedCardIds}
      current={current}
      revealed={revealed}
      grading={grading}
      lastReviewCard={lastReview?.card || null}
      sessionReviews={sessionReviews}
      sessionTarget={sessionTarget}
      reviewedToday={reviewedToday}
      dailyGoal={dailyGoal}
      sessionProgress={sessionProgress}
      studyAnimations={studyAnimations}
      query={query}
      syncStatus={syncStatus}
      settingsNotice={settingsNotice}
      toastMessage={toastMessage}
      accountEmail={accountEmail}
      authBusy={authBusy}
      accountStudySummary={accountStudySummary}
      supabase={supabase}
      editingCard={editingCard}
      dailyProgress={dailyProgress}
      reviewInterval={reviewInterval}
      onSetPanel={setPanel}
      onSetScreen={setScreen}
      onStartStudy={startStudy}
      onSelectCategory={(category) => { void selectCategory(category); }}
      onQueryChange={setQuery}
      onStudySearchResult={studySearchResult}
      onToggleSaved={(cardId, showFeedback) => { void toggleSavedCard(cardId, showFeedback); }}
      onOpenCardEditor={openCardEditor}
      onCloseCardEditor={closeCardEditor}
      onUndoLastReview={() => { void undoLastReview(); }}
      onGrade={(result) => { void grade(result); }}
      onAddWord={(values) => { void addWord(values); }}
      onDeleteWord={(cardId) => { void deleteWord(cardId); }}
      onSaveCorrection={(values) => { void saveCorrection(values); }}
      onChangeSettings={(nextSettings) => { void persistSettings(nextSettings); }}
      onSyncNow={() => { void syncNow(); }}
      onRestoreJson={restoreJson}
      onImportCsv={importCsv}
      onShuffleDue={shuffleDueCards}
      onReviewAllNow={() => { void reviewAllNow(); }}
      onExportProgress={() => { void exportProgress(); }}
      onExportDeck={exportCurrentDeck}
      onAuthenticate={authenticate}
      onSignOut={signOutAccount}
    />
  );
}
