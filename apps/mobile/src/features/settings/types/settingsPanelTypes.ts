import type { Card } from "@czech-flashcards/shared";
import type { DeckMemberships, StudySettings } from "../../../database";

export type SettingsPanelProps = {
  settings: StudySettings;
  cards: Card[];
  deckMemberships: DeckMemberships;
  settingsNotice: string;
  onChange: (settings: StudySettings) => void;
  onRestoreJson: () => void;
  onImportCsv: () => void;
  onExportProgress: () => void;
  onExportDeck: () => void;
  onExportAccountData: () => void;
};
