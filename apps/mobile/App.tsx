import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppLoadingScreen } from "./src/components/AppLoadingScreen";
import { type Card, type ReviewState } from "@czech-flashcards/shared";
import { AppShell } from "./src/app/AppShell";
import type { Panel, Screen } from "./src/app/appTypes";
import { filterStudyDeck } from "./src/app/deckFiltering";
import { buildAccountStudySummary, parseDailyProgress } from "./src/app/studySummary";
import { useAppData } from "./src/app/useAppData";
import { useCardManagement } from "./src/app/useCardManagement";
import { useSettingsTools } from "./src/app/useSettingsTools";
import { useStudySession } from "./src/app/useStudySession";
import { useToast } from "./src/app/useToast";
import { getInitialScreenFromLocation, screenFromPath, syncScreenPath } from "./src/app/webRoutes";
import type { StudySettings } from "./src/database";
import { createSupabaseClient } from "./src/sync";

const EMPTY_SAVED_CARD_IDS = new Set<string>();

export default function App() {
  const supabase = useMemo(() => createSupabaseClient(), []);
  const {
    db,
    cards,
    savedCardIds,
    deckMemberships,
    states,
    settings,
    dailyProgress,
    syncStatus,
    accountEmail,
    authBusy,
    setSavedCardIds,
    setDeckMemberships,
    setStates,
    setSettingsState,
    refresh,
    persistSettings,
    syncNow,
    authenticate,
    signOutAccount
  } = useAppData(supabase);
  const { toastMessage, showToast } = useToast();
  const [screen, setScreen] = useState<Screen>(() => getInitialScreenFromLocation());
  const [panel, setPanel] = useState<Panel | null>(null);
  const [query, setQuery] = useState("");
  const [settingsNotice, setSettingsNotice] = useState("");

  useEffect(() => {
    syncScreenPath(screen, true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    function handlePopState() {
      setScreen(screenFromPath(window.location.pathname));
      setPanel(null);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateScreen = useCallback((nextScreen: Screen) => {
    setScreen(nextScreen);
    setPanel(null);
    syncScreenPath(nextScreen);
  }, []);

  useEffect(() => {
    if (accountEmail && (screen === "login" || screen === "register")) {
      navigateScreen("home");
    }
  }, [accountEmail, navigateScreen, screen]);

  const savedDeckIds = settings?.deckFilter === "saved" ? savedCardIds : null;
  const deck = useMemo(() => {
    if (!settings) return [];
    return filterStudyDeck(cards, settings, savedDeckIds || EMPTY_SAVED_CARD_IDS, deckMemberships);
  }, [cards, deckMemberships, savedDeckIds, settings]);
  const studySession = useStudySession({ db, settings, deck, states, refresh });
  const cardManagement = useCardManagement({
    db,
    cards,
    current: studySession.current,
    panel,
    savedCardIds,
    setSavedCardIds,
    setDeckMemberships,
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
    navigateScreen("study");
  }

  function startStudy() {
    studySession.resetSessionReviews();
    navigateScreen("study");
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
      deckMemberships={deckMemberships}
      current={studySession.current}
      deckManagementCard={cardManagement.deckManagementCard}
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
      onSetScreen={navigateScreen}
      onAuthenticate={authenticate}
      onStartStudy={startStudy}
      onSelectCategory={(category) => { void selectCategory(category); }}
      onQueryChange={setQuery}
      onStudySearchResult={(card) => {
        cardManagement.studySearchResult(card);
        navigateScreen("study");
      }}
      onToggleSaved={(cardId, showFeedback) => { void cardManagement.toggleSavedCard(cardId, showFeedback); }}
      onAddCardToDeck={(deckId, cardId) => { void cardManagement.addCardToDeck(deckId, cardId); }}
      onRemoveCardFromDeck={(deckId, cardId) => { void cardManagement.removeCardFromDeck(deckId, cardId); }}
      onSetDeckManagementCard={cardManagement.setDeckManagementCard}
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
      onSignOut={async () => {
        const error = await signOutAccount();
        if (!error) setPanel(null);
        return error;
      }}
    />
  );
}
