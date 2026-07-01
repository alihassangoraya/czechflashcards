import type { Card } from "@czech-flashcards/shared";

export type CustomCardSnapshotRow = {
  id: string;
  cz: string;
  en: string;
  cs?: string | null;
  hi?: string | null;
  ur?: string | null;
  uk?: string | null;
  sentence?: string | null;
  sentence_en?: string | null;
  level: Card["level"];
  tags: string[];
};
