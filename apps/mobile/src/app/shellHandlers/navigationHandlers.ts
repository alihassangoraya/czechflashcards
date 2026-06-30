import type { Card } from "@czech-flashcards/shared";
import type { AppShellHandlerInput } from "./handlerInput";

type Input = Pick<AppShellHandlerInput, "data" | "settings" | "navigation" | "studySession" | "cardManagement">;

export function buildNavigationHandlers({ data, settings, navigation, studySession, cardManagement }: Input) {
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
    onStartStudy: () => {
      studySession.resetSessionReviews();
      navigation.navigateScreen("study");
    },
    onSelectCategory: (category: string) => { void selectCategory(category); },
    onQueryChange: navigation.setQuery,
    onStudySearchResult: studySearchResult
  };
}
