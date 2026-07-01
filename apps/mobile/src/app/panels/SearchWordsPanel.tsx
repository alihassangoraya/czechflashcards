import React from "react";
import { AppModal } from "../../components/AppModal";
import { SearchPanel } from "../../features/search";
import { useI18n } from "../../i18n/I18nProvider";
import type { SearchWordsPanelProps } from "./modalTypes";

export function SearchWordsPanel({ panel, cards, query, settings, savedCardIds, onSetPanel, onQueryChange, onStudySearchResult, onToggleSaved, onSetDeckManagementCard, onOpenCardEditor }: SearchWordsPanelProps) {
  const { t } = useI18n();
  return (
    <AppModal visible={panel === "search"} title={t("modal.search")} onClose={() => onSetPanel(null)}>
      <SearchPanel cards={cards} query={query} meaningLanguage={settings.appLanguage} savedCardIds={savedCardIds} onQueryChange={onQueryChange} onStudy={onStudySearchResult} onToggleSaved={(card) => onToggleSaved(card.id)} onManageDecks={onSetDeckManagementCard} onEdit={onOpenCardEditor} />
    </AppModal>
  );
}
