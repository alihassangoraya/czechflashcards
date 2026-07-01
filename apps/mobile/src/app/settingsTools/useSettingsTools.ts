import type { SettingsToolsProps } from "./settingsToolTypes";
import { useSettingsExportActions } from "./useSettingsExportActions";
import { useSettingsImportActions } from "./useSettingsImportActions";
import { useSettingsReviewActions } from "./useSettingsReviewActions";

export function useSettingsTools(props: SettingsToolsProps) {
  const { db, deck, settings, setSettingsNotice, showActionNotice, refresh, shuffleDueCards, clearShuffledDueQueue, forceDeckRefresh } = props;
  const reviewActions = useSettingsReviewActions({ db, deck, showActionNotice, refresh, shuffleDueCards, clearShuffledDueQueue, forceDeckRefresh });
  const exportActions = useSettingsExportActions({ db, deck, settings, accountEmail: props.accountEmail, supabase: props.supabase, setSettingsNotice, refresh });
  const importActions = useSettingsImportActions(props);

  return {
    ...reviewActions,
    ...exportActions,
    ...importActions
  };
}

export type SettingsTools = ReturnType<typeof useSettingsTools>;
