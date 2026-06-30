import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../database";
import type { SyncStatus } from "../../sync";

export type SettingsPanelProps = {
  settings: StudySettings;
  accountEmail: string | null;
  syncStatus: SyncStatus;
  notice?: string;
  cards: Card[];
  deckMemberships: Record<string, string[]>;
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
