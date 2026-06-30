import type { Card } from "./types";
import type { RawCard } from "./cardRawTypes";
import { inferLevel } from "./cardLevel";
import { slug } from "./cardSlug";
import { normalizeSource } from "./cardSource";
import { normalizeTags } from "./cardTags";

export function normalizeCard(card: RawCard, index: number): Card {
  const tags = normalizeTags(card.tags);
  const id = card.id || `${slug(String(card.cz))}-${index}`;
  return {
    id,
    cz: String(card.cz || "").trim(),
    en: String(card.en || "").trim(),
    hi: String(card.hi || "Hindi meaning pending").trim(),
    ur: String(card.ur || card.urdu || "اردو معنی باقی ہے").trim(),
    sentence: String(card.sentence || `Používám slovo "${card.cz}" ve větě.`).trim(),
    sentenceEn: String(card.sentenceEn || "").trim(),
    level: card.level === "a2" || card.level === "b1" ? card.level : inferLevel({ id, tags }),
    tags,
    source: normalizeSource(card.source),
    pronunciation: String(card.pronunciation || "").trim(),
    synonyms: String(card.synonyms || "").trim(),
    antonyms: String(card.antonyms || "").trim(),
    grammar: card.grammar && typeof card.grammar === "object" ? card.grammar : undefined,
    googleCategory: String(card.googleCategory || "").trim()
  };
}
