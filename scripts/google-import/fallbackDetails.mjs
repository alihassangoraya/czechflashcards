import { exampleStarters, synonymByCategory } from "./fallbackLexicon.mjs";

export function pronunciation(value) {
  return value
    .replace(/ch/g, "h").replace(/š/g, "sh").replace(/č/g, "ch").replace(/ž/g, "zh")
    .replace(/ř/g, "rzh").replace(/ě/g, "ye").replace(/[ýí]/g, "ee").replace(/á/g, "aa")
    .replace(/ó/g, "oo").replace(/[úů]/g, "oo").replace(/ď/g, "dy").replace(/ť/g, "ty")
    .replace(/ň/g, "ny").toLowerCase();
}

export function fallbackSynonyms(czech, category) {
  const word = czech.toLowerCase().trim();
  if (word.includes(" se") || word.includes(" si")) return `provádět ${word.split(" ")[0]}, činit se, realizovat ${word.split(" ")[0]}`;
  if (word.endsWith("ovat")) {
    const stem = word.slice(0, -4);
    return `působit ${stem}, provádět ${stem}ování, konat ${word}`;
  }
  if (/(at|et|it|t)$/.test(word)) return `činit ${word}, provádět akci, dělat`;
  if (/[ýí]$/.test(word)) return `mírně ${word}, popsatelný jako ${word}, vykazující ${word}`;
  return synonymByCategory[category] || "příbuzný výraz, ekvivalent, synonymní slovo";
}

export function fallbackAntonyms(czech) {
  const word = czech.toLowerCase().trim();
  if (word.startsWith("ne") && word.length > 3) return `${word.slice(2)}, kladná forma`;
  if (/[ýí]$/.test(word)) return `ne${word}, opačný přívlastek`;
  if (/(at|et|it|t)$/.test(word)) return `ne${word.replace(/t$/, "")}t, zamezit konání`;
  return `opak slova ${word}, opačný pojem`;
}

export function fallbackExample(czech, english, category) {
  const verb = english.toLowerCase().replace(/^to\s+/, "");
  if (english.toLowerCase().startsWith("to ")) return { sentence: `Chci se naučit, jak správně ${czech} v této situaci.`, sentenceEn: `I want to learn how to correctly ${verb} in this situation.` };
  if (/[ýíéá]$/.test(czech) || /(ful|able|y|ing)/i.test(english)) return { sentence: `Tento ${czech} styl se mi opravdu velmi líbí.`, sentenceEn: `I really like this ${english} style very much.` };
  const [czStart, enStart] = exampleStarters[category] || ["Toto slovo", "This word"];
  return { sentence: `${czStart} ${czech}.`, sentenceEn: `${enStart} ${english}.` };
}

export function grammar(czech, english) {
  const isVerb = /^to\s+/i.test(english) || /(?:t)(?:\s+(?:se|si))?$/i.test(czech);
  const isAdjective = /[ýíéá]$/i.test(czech) || /(ful|able|y|ing)$/i.test(english);
  const partOfSpeech = isVerb ? "verb" : isAdjective ? "adjective" : "noun or expression";
  return {
    partOfSpeech,
    reflexive: /\s(?:se|si)$/i.test(czech),
    note: isVerb
      ? "Learn the infinitive with a subject phrase. Czech verb endings change with the person."
      : isAdjective
        ? "Czech adjectives agree with gender, number, and case. Learn this form with a noun."
        : "Learn the word with a short Czech phrase so its case and gender patterns become familiar."
  };
}
