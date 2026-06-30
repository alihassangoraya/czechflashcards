export function grammar(czech, english) {
  const isVerb = /^to\s+/i.test(english) || /(?:t)(?:\s+(?:se|si))?$/i.test(czech);
  const isAdjective = /[ýíéá]$/i.test(czech) || /(ful|able|y|ing)$/i.test(english);
  const partOfSpeech = isVerb ? "verb" : isAdjective ? "adjective" : "noun or expression";
  return {
    partOfSpeech,
    reflexive: /\s(?:se|si)$/i.test(czech),
    note: grammarNote(isVerb, isAdjective)
  };
}

function grammarNote(isVerb, isAdjective) {
  if (isVerb) return "Learn the infinitive with a subject phrase. Czech verb endings change with the person.";
  if (isAdjective) return "Czech adjectives agree with gender, number, and case. Learn this form with a noun.";
  return "Learn the word with a short Czech phrase so its case and gender patterns become familiar.";
}
