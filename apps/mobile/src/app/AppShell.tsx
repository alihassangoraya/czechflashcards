import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { AppToast } from "../components/AppToast";
import { colors } from "../theme/design";
import { AppPanels } from "./AppPanels";
import type { AppShellProps } from "./appShellTypes";
import { MainScreens } from "./MainScreens";

export function AppShell(props: AppShellProps) {
  const {
    screen,
    panel,
    deck,
    cards,
    customCards,
    states,
    settings,
    savedCardIds,
    current,
    revealed,
    grading,
    lastReviewCard,
    sessionReviews,
    sessionTarget,
    reviewedToday,
    dailyGoal,
    sessionProgress,
    studyAnimations,
    query,
    syncStatus,
    settingsNotice,
    toastMessage,
    accountEmail,
    authBusy,
    accountStudySummary,
    supabase,
    editingCard,
    dailyProgress,
    reviewInterval,
    onSetPanel,
    onSetScreen,
    onStartStudy,
    onSelectCategory,
    onQueryChange,
    onStudySearchResult,
    onToggleSaved,
    onOpenCardEditor,
    onCloseCardEditor,
    onUndoLastReview,
    onGrade,
    onAddWord,
    onDeleteWord,
    onSaveCorrection,
    onChangeSettings,
    onSyncNow,
    onRestoreJson,
    onImportCsv,
    onShuffleDue,
    onReviewAllNow,
    onExportProgress,
    onExportDeck,
    onAuthenticate,
    onSignOut
  } = props;

  return (
    <SafeAreaView style={styles.shell}>
      <StatusBar barStyle="dark-content" />
      <MainScreens
        screen={screen}
        deck={deck}
        cards={cards}
        customCards={customCards}
        states={states}
        settings={settings}
        savedCardIds={savedCardIds}
        current={current}
        revealed={revealed}
        grading={grading}
        lastReviewCard={lastReviewCard}
        sessionReviews={sessionReviews}
        sessionTarget={sessionTarget}
        reviewedToday={reviewedToday}
        dailyGoal={dailyGoal}
        sessionProgress={sessionProgress}
        studyAnimations={studyAnimations}
        accountEmail={accountEmail}
        syncStatus={syncStatus}
        dailyProgress={dailyProgress}
        reviewInterval={reviewInterval}
        onSetPanel={onSetPanel}
        onSetScreen={onSetScreen}
        onStartStudy={onStartStudy}
        onSelectCategory={onSelectCategory}
        onToggleSaved={onToggleSaved}
        onOpenCardEditor={onOpenCardEditor}
        onUndoLastReview={onUndoLastReview}
        onGrade={onGrade}
      />
      <AppPanels
        panel={panel}
        cards={cards}
        customCards={customCards}
        settings={settings}
        savedCardIds={savedCardIds}
        current={current}
        editingCard={editingCard}
        query={query}
        syncStatus={syncStatus}
        settingsNotice={settingsNotice}
        accountEmail={accountEmail}
        authBusy={authBusy}
        accountStudySummary={accountStudySummary}
        supabase={supabase}
        onSetPanel={onSetPanel}
        onQueryChange={onQueryChange}
        onStudySearchResult={onStudySearchResult}
        onToggleSaved={onToggleSaved}
        onOpenCardEditor={onOpenCardEditor}
        onCloseCardEditor={onCloseCardEditor}
        onAddWord={onAddWord}
        onDeleteWord={onDeleteWord}
        onSaveCorrection={onSaveCorrection}
        onChangeSettings={onChangeSettings}
        onSyncNow={onSyncNow}
        onRestoreJson={onRestoreJson}
        onImportCsv={onImportCsv}
        onShuffleDue={onShuffleDue}
        onReviewAllNow={onReviewAllNow}
        onExportProgress={onExportProgress}
        onExportDeck={onExportDeck}
        onAuthenticate={onAuthenticate}
        onSignOut={onSignOut}
      />
      <AppToast message={toastMessage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shell: { flex: 1, backgroundColor: colors.background }
});
