import type { Card } from "@czech-flashcards/shared";
import type { TranslationKey } from "../../i18n/translations";

export type GrammarModel = {
  genderKey: TranslationKey;
  isVerb: boolean;
};

export function getGrammarModel(card: Card): GrammarModel {
  const word = card.cz.toLowerCase().trim();
  const isVerb = card.en.toLowerCase().startsWith("to ") || card.tags.includes("verbs") || card.cz.split(" ")[0].endsWith("t");

  if (word.endsWith("a") || word.endsWith("ost")) {
    return { genderKey: "grammar.likelyFeminine", isVerb };
  }

  if (word.endsWith("o") || word.endsWith("e") || word.endsWith("ě")) {
    return { genderKey: "grammar.likelyNeuter", isVerb };
  }

  return { genderKey: "grammar.likelyMasculine", isVerb };
}
