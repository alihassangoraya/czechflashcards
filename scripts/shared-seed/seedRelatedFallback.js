const { synonymByCategory } = require("./seedCategoryFallback");

function fallbackSynonyms(czech, category) {
  const word = String(czech || "").toLowerCase().trim();
  if (!word) return "";
  if (word.includes(" se") || word.includes(" si")) return `provádět ${word.split(" ")[0]}, činit se, realizovat ${word.split(" ")[0]}`;
  if (word.endsWith("ovat")) return verbOvatSynonyms(word);
  if (/(at|et|it|t)$/.test(word)) return `činit ${word}, provádět akci, dělat`;
  if (/[ýí]$/.test(word)) return `mírně ${word}, popsatelný jako ${word}, vykazující ${word}`;
  return synonymByCategory[category] || "příbuzný výraz, ekvivalent, synonymní slovo";
}

function verbOvatSynonyms(word) {
  const stem = word.slice(0, -4);
  return `působit ${stem}, provádět ${stem}ování, konat ${word}`;
}

function fallbackAntonyms(czech) {
  const word = String(czech || "").toLowerCase().trim();
  if (!word) return "";
  if (word.startsWith("ne") && word.length > 3) return `${word.slice(2)}, kladná forma`;
  if (/[ýí]$/.test(word)) return `ne${word}, opačný přívlastek`;
  if (/(at|et|it|t)$/.test(word)) return `ne${word.replace(/t$/, "")}t, zamezit konání`;
  return `opak slova ${word}, opačný pojem`;
}

module.exports = { fallbackAntonyms, fallbackSynonyms };
