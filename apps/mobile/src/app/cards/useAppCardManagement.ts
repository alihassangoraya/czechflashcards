import type { AppData } from "../data/useAppData";
import type { AppNavigation } from "../navigation/useAppNavigation";
import type { StudySession } from "../study/useStudySession";
import { useCardManagement } from "./useCardManagement";

type Params = {
  data: AppData;
  navigation: AppNavigation;
  showToast: (message: string) => void;
  studySession: StudySession;
};

export function useAppCardManagement({ data, navigation, showToast, studySession }: Params) {
  return useCardManagement({
    db: data.db,
    cards: data.cards,
    current: studySession.current,
    panel: navigation.panel,
    savedCardIds: data.savedCardIds,
    setSavedCardIds: data.setSavedCardIds,
    setDeckMemberships: data.setDeckMemberships,
    setCurrent: studySession.setCurrent,
    setRevealed: studySession.setRevealed,
    setPanel: navigation.setPanel,
    setSessionReviews: studySession.setSessionReviews,
    refresh: data.refresh,
    forceCard: studySession.forceCard,
    showToast
  });
}
