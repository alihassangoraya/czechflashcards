function fallbackGrammar(czech, english) {
  const cz = String(czech || "").trim();
  const en = String(english || "").trim();
  const isVerb = /^to\s+/i.test(en) || /(?:t)(?:\s+(?:se|si))?$/i.test(cz);
  const isAdjective = /[ýíéá]$/i.test(cz) || /(ful|able|y|ing)$/i.test(en);
  return {
    partOfSpeech: isVerb ? "verb" : isAdjective ? "adjective" : "noun or expression",
    reflexive: /\s(?:se|si)$/i.test(cz),
    note: fallbackGrammarNote(isVerb, isAdjective)
  };
}

function fallbackGrammarNote(isVerb, isAdjective) {
  if (isVerb) {
    return "Learn the infinitive with a subject phrase. Czech verb endings change with the person.";
  }
  if (isAdjective) {
    return "Czech adjectives agree with gender, number, and case. Learn this form with a noun.";
  }
  return "Learn the word with a short Czech phrase so its case and gender patterns become familiar.";
}

module.exports = { fallbackGrammar };
