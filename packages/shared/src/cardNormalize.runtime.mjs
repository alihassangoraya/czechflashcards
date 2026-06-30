import { inferLevel } from "./cardLevel.runtime.mjs";
import { slug } from "./cardSlug.runtime.mjs";
import { normalizeTags } from "./cardTags.runtime.mjs";

export function normalizeCards(cards) {
  const seen = new Set();
  return cards
    .filter((card) => card && card.cz && card.en)
    .map(normalizeCard)
    .filter((card) => {
      if (seen.has(card.id)) return false;
      seen.add(card.id);
      return true;
    });
}

function normalizeCard(card, index) {
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

function normalizeSource(source) {
  return source === "custom" || source === "import" || source === "seed" ? source : "legacy-web";
}
