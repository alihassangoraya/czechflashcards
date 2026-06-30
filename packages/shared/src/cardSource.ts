import type { Card } from "./types";
import type { RawCard } from "./cardRawTypes";

export function normalizeSource(source: RawCard["source"]): Card["source"] {
  return source === "custom" || source === "import" || source === "seed" ? source : "legacy-web";
}
