import { synonymByCategory } from "./fallbackLexicon.mjs";

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
