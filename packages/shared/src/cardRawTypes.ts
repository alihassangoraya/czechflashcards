import type { Card, CardLevel } from "./types";

export type RawCard = Partial<Omit<Card, "level" | "source" | "tags">> & {
  level?: CardLevel | string | null;
  source?: Card["source"] | string;
  tags?: string[] | string;
  urdu?: string;
};
