import React from "react";
import type { Card } from "@czech-flashcards/shared";
import type { SupabaseClient } from "@supabase/supabase-js";
import { AppModal } from "../components/AppModal";
import type { StudySettings } from "../database";
import { AccountPanel, type AccountStudySummary } from "../features/account/AccountPanel";
import { DeckMembershipPanel } from "../features/decks/DeckMembershipPanel";
import { GrammarEmptyState } from "../features/grammar/GrammarEmptyState";
import { GrammarGuide } from "../features/grammar/GrammarGuide";
import { SearchPanel } from "../features/search/SearchPanel";
import { SettingsPanel } from "../features/settings/SettingsPanel";
import { AddWordPanel } from "../features/words/AddWordPanel";
import { EditCardForm } from "../features/words/EditCardForm";
import type { SyncStatus } from "../sync";
import type { Panel } from "./appTypes";

type WordValues = { cz: string; en: string; hi: string; ur: string; sentence: string; sentenceEn: string; tag: string };
type CorrectionValues = Omit<WordValues, "tag">;
type AccountPanelProps = React.ComponentProps<typeof AccountPanel>;

type Props = {
  panel: Panel | null;
  cards: Card[];
  customCards: Card[];
  settings: StudySettings;
  savedCardIds: Set<string>;
  deckMemberships: Record<string, string[]>;
  current: Card | null;
  deckManagementCard: Card | null;
  editingCard: Card | null;
  query: string;
  syncStatus: SyncStatus;
  settingsNotice: string;
  accountEmail: string | null;
  authBusy: boolean;
  accountStudySummary: AccountStudySummary;
  supabase: SupabaseClient | null;
  onSetPanel: (panel: Panel | null) => void;
  onQueryChange: (value: string) => void;
  onStudySearchResult: (card: Card) => void;
  onToggleSaved: (cardId: string, showFeedback?: boolean) => void;
  onAddCardToDeck: (deckId: string, cardId: string) => void;
  onRemoveCardFromDeck: (deckId: string, cardId: string) => void;
  onSetDeckManagementCard: (card: Card | null) => void;
  onOpenCardEditor: (card?: Card | null) => void;
  onCloseCardEditor: () => void;
  onAddWord: (values: WordValues) => void;
  onDeleteWord: (cardId: string) => void;
  onSaveCorrection: (values: CorrectionValues) => void;
  onChangeSettings: (settings: StudySettings) => void;
  onSyncNow: () => void;
  onRestoreJson: () => void;
  onImportCsv: () => void;
  onShuffleDue: () => void;
  onReviewAllNow: () => void;
  onExportProgress: () => void;
  onExportDeck: () => void;
  onAuthenticate: AccountPanelProps["onAuthenticate"];
  onSignOut: AccountPanelProps["onSignOut"];
};

export function AppPanels(props: Props) {
  const { panel, cards, customCards, settings, savedCardIds, deckMemberships, current, deckManagementCard, editingCard, query, syncStatus, settingsNotice, accountEmail, authBusy, accountStudySummary, supabase, onSetPanel, onQueryChange, onStudySearchResult, onToggleSaved, onAddCardToDeck, onRemoveCardFromDeck, onSetDeckManagementCard, onOpenCardEditor, onCloseCardEditor, onAddWord, onDeleteWord, onSaveCorrection, onChangeSettings, onSyncNow, onRestoreJson, onImportCsv, onShuffleDue, onReviewAllNow, onExportProgress, onExportDeck, onAuthenticate, onSignOut } = props;

  return (
    <>
      <AppModal visible={panel === "search"} title="Search words" onClose={() => onSetPanel(null)}>
        <SearchPanel cards={cards} query={query} meaningLanguage={settings.meaningLanguage} savedCardIds={savedCardIds} onQueryChange={onQueryChange} onStudy={onStudySearchResult} onToggleSaved={(card) => onToggleSaved(card.id)} onManageDecks={onSetDeckManagementCard} onEdit={onOpenCardEditor} />
      </AppModal>

      <AppModal visible={panel === "add"} title="Add your own word" onClose={() => onSetPanel(null)}>
        <AddWordPanel onSubmit={onAddWord} cards={customCards} decks={settings.customDecks} onDelete={onDeleteWord} onEdit={onOpenCardEditor} />
      </AppModal>

      <AppModal visible={panel === "edit"} title="Edit card" onClose={onCloseCardEditor}>
        {editingCard && <EditCardForm key={editingCard.id} card={editingCard} onSubmit={onSaveCorrection} />}
      </AppModal>

      <AppModal visible={panel === "settings"} title="Settings" onClose={() => onSetPanel(null)}>
        <SettingsPanel
          settings={settings}
          cards={cards}
          deckMemberships={deckMemberships}
          accountEmail={accountEmail}
          syncStatus={syncStatus}
          notice={settingsNotice}
          onChange={onChangeSettings}
          onSyncNow={onSyncNow}
          onAccount={() => onSetPanel("account")}
          onRestoreJson={onRestoreJson}
          onImportCsv={onImportCsv}
          onShuffleDue={onShuffleDue}
          onReviewAllNow={onReviewAllNow}
          onExportProgress={onExportProgress}
          onExportDeck={onExportDeck}
        />
      </AppModal>

      <AppModal visible={panel === "account"} title="Account and sync" onClose={() => onSetPanel(null)}>
        <AccountPanel configured={Boolean(supabase)} supabase={supabase} accountEmail={accountEmail} studySummary={accountStudySummary} busy={authBusy} onAuthenticate={onAuthenticate} onSignOut={onSignOut} />
      </AppModal>

      <AppModal visible={panel === "grammar"} title="B1 grammar guide" onClose={() => onSetPanel(null)}>
        {current ? <GrammarGuide card={current} /> : <GrammarEmptyState />}
      </AppModal>

      <AppModal visible={panel === "deck"} title="Add to deck" onClose={() => onSetDeckManagementCard(null)}>
        <DeckMembershipPanel
          card={deckManagementCard}
          decks={settings.customDecks}
          deckMemberships={deckMemberships}
          onAddToDeck={onAddCardToDeck}
          onRemoveFromDeck={onRemoveCardFromDeck}
          onOpenSettings={() => onSetPanel("settings")}
        />
      </AppModal>
    </>
  );
}
