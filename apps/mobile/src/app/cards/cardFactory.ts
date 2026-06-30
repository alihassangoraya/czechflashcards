import { slug, type Card } from "@czech-flashcards/shared";
import type { AddWordValues, CorrectionValues } from "../appTypes";

export function createCustomCard(values: AddWordValues): Card {
  return {
    id: `custom-${Date.now()}-${slug(values.cz)}`,
    cz: values.cz.trim(),
    en: values.en.trim(),
    hi: values.hi.trim(),
    ur: values.ur.trim(),
    sentence: values.sentence.trim(),
    sentenceEn: values.sentenceEn.trim(),
    level: "a2",
    tags: Array.from(new Set(["custom", values.tag])),
    source: "custom"
  };
}

export function applyCardCorrection(card: Card, values: CorrectionValues): Card {
  return {
    ...card,
    cz: values.cz.trim(),
    en: values.en.trim(),
    hi: values.hi.trim(),
    ur: values.ur.trim(),
    sentence: values.sentence.trim(),
    sentenceEn: values.sentenceEn.trim()
  };
}
