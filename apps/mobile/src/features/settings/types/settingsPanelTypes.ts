import type { Card } from "@czech-flashcards/shared";
import type { DeckMemberships, StudySettings } from "../../../database";
import type { SyncStatus } from "../../../sync";

export type SettingsPanelProps = {
  settings: StudySettings;
  accountEmail: string | null;
  syncStatus: SyncStatus;
  notice?: string;
  cards: Card[];
  deckMemberships: DeckMemberships;
  onChange: (settings: StudySettings) => void;
  onSyncNow: () => void;
  onAccount: () => void;
  onRestoreJson: () => void;
  onImportCsv: () => void;
  onShuffleDue: () => void;
  onReviewAllNow: () => void;
  onExportProgress: () => void;
  onExportDeck: () => void;
};
