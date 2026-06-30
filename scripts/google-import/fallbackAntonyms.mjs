export function fallbackAntonyms(czech) {
  const word = czech.toLowerCase().trim();
  if (word.startsWith("ne") && word.length > 3) return `${word.slice(2)}, kladná forma`;
  if (/[ýí]$/.test(word)) return `ne${word}, opačný přívlastek`;
  if (/(at|et|it|t)$/.test(word)) return `ne${word.replace(/t$/, "")}t, zamezit konání`;
  return `opak slova ${word}, opačný pojem`;
}
