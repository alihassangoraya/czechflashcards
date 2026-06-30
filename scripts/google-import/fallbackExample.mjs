import { exampleStarters } from "./fallbackLexicon.mjs";

export function fallbackExample(czech, english, category) {
  const verb = english.toLowerCase().replace(/^to\s+/, "");
  if (english.toLowerCase().startsWith("to ")) return { sentence: `Chci se naučit, jak správně ${czech} v této situaci.`, sentenceEn: `I want to learn how to correctly ${verb} in this situation.` };
  if (/[ýíéá]$/.test(czech) || /(ful|able|y|ing)/i.test(english)) return { sentence: `Tento ${czech} styl se mi opravdu velmi líbí.`, sentenceEn: `I really like this ${english} style very much.` };
  const [czStart, enStart] = exampleStarters[category] || ["Toto slovo", "This word"];
  return { sentence: `${czStart} ${czech}.`, sentenceEn: `${enStart} ${english}.` };
}
