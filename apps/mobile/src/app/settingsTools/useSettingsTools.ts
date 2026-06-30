import type { Card } from "@czech-flashcards/shared";
import type { AppDatabase, StudySettings } from "../../database";
import { useSettingsExportActions } from "./useSettingsExportActions";
import { useSettingsImportActions } from "./useSettingsImportActions";
import { useSettingsReviewActions } from "./useSettingsReviewActions";

type Props = {
  db: AppDatabase | null;
  deck: Card[];
  settings: StudySettings | null;
  setSettingsState: (settings: StudySettings) => void;
  setSettingsNotice: (message: string) => void;
  refresh: (database?: AppDatabase | null) => Promise<void>;
  shuffleDueCards: (onNotice: (message: string) => void) => void;
  clearShuffledDueQueue: () => void;
  forceDeckRefresh: () => void;
};

export function useSettingsTools(props: Props) {
  const { db, deck, settings, setSettingsNotice, refresh, shuffleDueCards, clearShuffledDueQueue, forceDeckRefresh } = props;
  const reviewActions = useSettingsReviewActions({ db, deck, setSettingsNotice, refresh, shuffleDueCards, clearShuffledDueQueue, forceDeckRefresh });
  const exportActions = useSettingsExportActions({ db, deck, settings, setSettingsNotice, refresh });
  const importActions = useSettingsImportActions(props);

  return {
    ...reviewActions,
    ...exportActions,
    ...importActions
  };
}

export type SettingsTools = ReturnType<typeof useSettingsTools>;
