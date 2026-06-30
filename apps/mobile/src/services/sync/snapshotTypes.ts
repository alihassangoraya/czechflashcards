import type { Card } from "@czech-flashcards/shared";
import type { StudySettings } from "../../database";

export type UserCardSnapshotRow = {
  card_id: string;
  known_streak: number;
  again_count: number;
  due_at: string;
  seen: number | boolean;
};

export type CustomCardSnapshotRow = {
  id: string;
  cz: string;
  en: string;
  hi?: string | null;
  ur?: string | null;
  sentence?: string | null;
  sentence_en?: string | null;
  level: Card["level"];
  tags: string[];
};

export type SavedCardSnapshotRow = { card_id: string };
export type UserDeckSnapshotRow = { id: string; name: string };
export type UserDeckCardSnapshotRow = { deck_id: string; card_id: string };
export type CardOverrideSnapshotRow = { card_id: string; payload: Card };

export type SyncSnapshot = {
  user_cards: UserCardSnapshotRow[];
  custom_cards: CustomCardSnapshotRow[];
  saved_cards: SavedCardSnapshotRow[];
  user_decks: UserDeckSnapshotRow[];
  user_deck_cards: UserDeckCardSnapshotRow[];
  card_overrides: CardOverrideSnapshotRow[];
  settings: Partial<StudySettings>;
};
