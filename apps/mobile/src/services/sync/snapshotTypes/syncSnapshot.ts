import type { StudySettings } from "../../../database";
import type { CardOverrideSnapshotRow } from "./cardOverrideSnapshotRow";
import type { CustomCardSnapshotRow } from "./customCardSnapshotRow";
import type { SavedCardSnapshotRow } from "./savedCardSnapshotRow";
import type { UserCardSnapshotRow } from "./userCardSnapshotRow";
import type { UserDeckCardSnapshotRow } from "./userDeckCardSnapshotRow";
import type { UserDeckSnapshotRow } from "./userDeckSnapshotRow";

export type SyncSnapshot = {
  user_cards: UserCardSnapshotRow[];
  custom_cards: CustomCardSnapshotRow[];
  saved_cards: SavedCardSnapshotRow[];
  user_decks: UserDeckSnapshotRow[];
  user_deck_cards: UserDeckCardSnapshotRow[];
  card_overrides: CardOverrideSnapshotRow[];
  settings: Partial<StudySettings>;
};
