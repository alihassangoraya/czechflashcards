import React, { useMemo, useState } from "react";
import { AppLoadingScreen } from "./src/components/AppLoadingScreen";
import {
  filterDeck,
  type Card,
  type ReviewState
} from "@czech-flashcards/shared";
import { AppShell } from "./src/app/AppShell";
import type { Panel, Screen } from "./src/app/appTypes";
import { buildAccountStudySummary, parseDailyProgress } from "./src/app/studySummary";
import { useAppData } from "./src/app/useAppData";
import { useCardManagement } from "./src/app/useCardManagement";
import { useSettingsTools } from "./src/app/useSettingsTools";
import { useStudySession } from "./src/app/useStudySession";
import { useToast } from "./src/app/useToast";
import type { StudySettings } from "./src/database";
import { createSupabaseClient } from "./src/sync";

const EMPTY_SAVED_CARD_IDS = new Set<string>();

export default function App() {
  const supabase = useMemo(() => createSupabaseClient(), []);
  const {
    db,
    cards,
    savedCardIds,
    states,
    settings,
    dailyProgress,
    syncStatus,
    accountEmail,
    authBusy,
    setSavedCardIds,
    setStates,
    setSettingsState,
    refresh,
    persistSettings,
    syncNow,
    authenticate,
    signOutAccount
  } = useAppData(supabase);
  const { toastMessage, showToast } = useToast();
  const [screen, setScreen] = useState<Screen>("home");
  const [panel, setPanel] = useState<Panel | null>(null);
  const [query, setQuery] = useState("");
  const [settingsNotice, setSettingsNotice] = useState("");

  const savedDeckIds = settings?.deckFilter === "saved" ? savedCardIds : null;
  const deck = useMemo(() => {
    if (!settings) return [];
    return filterDeck(cards, settings.examLevel, settings.deckFilter, savedDeckIds || EMPTY_SAVED_CARD_IDS);
  }, [cards, savedDeckIds, settings]);
  const studySession = useStudySession({ db, settings, deck, states, refresh });
  const cardManagement = useCardManagement({
    db,
    cards,
    current: studySession.current,
    panel,
    savedCardIds,
    setSavedCardIds,
    setCurrent: studySession.setCurrent,
    setRevealed: studySession.setRevealed,
    setPanel,
    setSessionReviews: studySession.setSessionReviews,
    refresh,
    forceCard: studySession.forceCard,
    showToast
  });
  const settingsTools = useSettingsTools({
    db,
    deck,
    settings,
    setSettingsState,
    setSettingsNotice,
    refresh,
    shuffleDueCards: studySession.shuffleDueCards,
    clearShuffledDueQueue: studySession.clearShuffledDueQueue,
    forceDeckRefresh: () => setStates((value) => ({ ...value }))
  });

  async function selectCategory(category: string) {
    if (!settings) return;
    await persistSettings({ ...settings, deckFilter: category });
    studySession.resetSessionReviews();
    setScreen("study");
  }

  function startStudy() {
    studySession.resetSessionReviews();
    setScreen("study");
  }

  if (!db || !settings) {
    return <AppLoadingScreen />;
  }

  const customCards = cards.filter((card) => card.source === "custom");
  const accountStudySummary = buildAccountStudySummary(deck, cards, states, savedCardIds.size, settings, syncStatus);
  const { reviewedToday, dailyGoal, sessionProgress } = parseDailyProgress(dailyProgress);
  const sessionTarget = Math.min(deck.length, Math.max(1, dailyGoal - reviewedToday + studySession.sessionReviews));

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
      current={studySession.current}
      revealed={studySession.revealed}
      grading={studySession.grading}
      lastReviewCard={studySession.lastReview?.card || null}
      sessionReviews={studySession.sessionReviews}
      sessionTarget={sessionTarget}
      reviewedToday={reviewedToday}
      dailyGoal={dailyGoal}
      sessionProgress={sessionProgress}
      studyAnimations={studySession.studyAnimations}
      query={query}
      syncStatus={syncStatus}
      settingsNotice={settingsNotice}
      toastMessage={toastMessage}
      accountEmail={accountEmail}
      authBusy={authBusy}
      accountStudySummary={accountStudySummary}
      supabase={supabase}
      editingCard={cardManagement.editingCard}
      dailyProgress={dailyProgress}
      reviewInterval={studySession.reviewInterval}
      onSetPanel={setPanel}
      onSetScreen={setScreen}
      onStartStudy={startStudy}
      onSelectCategory={(category) => { void selectCategory(category); }}
      onQueryChange={setQuery}
      onStudySearchResult={(card) => {
        cardManagement.studySearchResult(card);
        setScreen("study");
      }}
      onToggleSaved={(cardId, showFeedback) => { void cardManagement.toggleSavedCard(cardId, showFeedback); }}
      onOpenCardEditor={cardManagement.openCardEditor}
      onCloseCardEditor={cardManagement.closeCardEditor}
      onUndoLastReview={() => { void studySession.undoLastReview(); }}
      onGrade={(result) => { void studySession.grade(result); }}
      onAddWord={(values) => { void cardManagement.addWord(values); }}
      onDeleteWord={(cardId) => { void cardManagement.deleteWord(cardId); }}
      onSaveCorrection={(values) => { void cardManagement.saveCorrection(values); }}
      onChangeSettings={(nextSettings) => { void persistSettings(nextSettings); }}
      onSyncNow={() => { void syncNow(); }}
      onRestoreJson={settingsTools.restoreJson}
      onImportCsv={settingsTools.importCsv}
      onShuffleDue={settingsTools.shuffleDueCardsInDeck}
      onReviewAllNow={() => { void settingsTools.reviewAllNow(); }}
      onExportProgress={() => { void settingsTools.exportProgress(); }}
      onExportDeck={settingsTools.exportCurrentDeck}
      onAuthenticate={authenticate}
      onSignOut={async () => {
        const error = await signOutAccount();
        if (!error) setPanel(null);
        return error;
      }}
    />
  );
}
