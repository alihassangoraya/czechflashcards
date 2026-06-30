import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../database";
import type { AppData } from "./useAppData";
import type { AppNavigation } from "./useAppNavigation";
import type { CardManagement } from "./useCardManagement";
import type { SettingsTools } from "./useSettingsTools";
import type { StudySession } from "./useStudySession";

type Input = {
  data: AppData;
  settings: StudySettings;
  navigation: AppNavigation;
  studySession: StudySession;
  cardManagement: CardManagement;
  settingsTools: SettingsTools;
};

export function buildAppShellHandlers({ data, settings, navigation, studySession, cardManagement, settingsTools }: Input) {
  async function selectCategory(category: string) {
    await data.persistSettings({ ...settings, deckFilter: category });
    studySession.resetSessionReviews();
    navigation.navigateScreen("study");
  }

  function studySearchResult(card: Card) {
    cardManagement.studySearchResult(card);
    navigation.navigateScreen("study");
  }

  return {
    onSetPanel: navigation.setPanel,
    onSetScreen: navigation.navigateScreen,
    onAuthenticate: data.authenticate,
    onStartStudy: () => {
      studySession.resetSessionReviews();
      navigation.navigateScreen("study");
    },
    onSelectCategory: (category: string) => { void selectCategory(category); },
    onQueryChange: navigation.setQuery,
    onStudySearchResult: studySearchResult,
    onToggleSaved: (cardId: string, showFeedback?: boolean) => { void cardManagement.toggleSavedCard(cardId, showFeedback); },
    onAddCardToDeck: (deckId: string, cardId: string) => { void cardManagement.addCardToDeck(deckId, cardId); },
    onRemoveCardFromDeck: (deckId: string, cardId: string) => { void cardManagement.removeCardFromDeck(deckId, cardId); },
    onSetDeckManagementCard: cardManagement.setDeckManagementCard,
    onOpenCardEditor: cardManagement.openCardEditor,
    onCloseCardEditor: cardManagement.closeCardEditor,
    onUndoLastReview: () => { void studySession.undoLastReview(); },
    onGrade: (result: Parameters<StudySession["grade"]>[0]) => { void studySession.grade(result); },
    onAddWord: (values: Parameters<CardManagement["addWord"]>[0]) => { void cardManagement.addWord(values); },
    onDeleteWord: (cardId: string) => { void cardManagement.deleteWord(cardId); },
    onSaveCorrection: (values: Parameters<CardManagement["saveCorrection"]>[0]) => { void cardManagement.saveCorrection(values); },
    onChangeSettings: (nextSettings: StudySettings) => { void data.persistSettings(nextSettings); },
    onSyncNow: () => { void data.syncNow(); },
    onRestoreJson: settingsTools.restoreJson,
    onImportCsv: settingsTools.importCsv,
    onShuffleDue: settingsTools.shuffleDueCardsInDeck,
    onReviewAllNow: () => { void settingsTools.reviewAllNow(); },
    onExportProgress: () => { void settingsTools.exportProgress(); },
    onExportDeck: settingsTools.exportCurrentDeck,
    onSignOut: async () => {
      const error = await data.signOutAccount();
      if (!error) navigation.setPanel(null);
      return error;
    }
  };
}

export type AppShellHandlers = ReturnType<typeof buildAppShellHandlers>;
