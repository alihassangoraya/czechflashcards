const fs = require("fs");
const vm = require("vm");

const context = { window: {} };
context.globalThis = context;
vm.createContext(context);

for (const file of ["data/vocabulary.js", "data/extended-lemmas.js", "data/verb-forms.js"]) {
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
}

const cards = context.window.CZECH_B1_VOCAB || [];
const errors = [];
const warnings = [];
const fillerExample = /(Potřebuji si zapamatovat|Ve slovníku jsem našel|V textu jsem četl|V češtině často vidím|V nové větě používám|Dnes si zapíšu|Dnes trénuji použití|Dnes procvičuji|Dnes opakuji|The teacher explained the expression|I found the expression|I read the word|I need to remember the word|I use the word|Today I am practicing the use|Today I am reviewing)/i;
const mojibake = /[ÃÄÅÂ]|�/;
const hasDevanagari = /[\u0900-\u097F]/;
const hasArabic = /[\u0600-\u06FF]/;

function isNumberCard(card) {
  return (card.tags || []).includes("numbers");
}

function isFormCard(card) {
  return (card.tags || []).includes("forms");
}

function isExtended(card) {
  return (card.tags || []).includes("extended");
}

function inferredLevel(card) {
  if (isExtended(card) || isFormCard(card)) return "b1";
  if (isNumberCard(card)) {
    const value = Number(String(card.id || "").replace("number-", ""));
    return Number.isFinite(value) && value <= 100 ? "a2" : "b1";
  }
  return "a2";
}

const realSeen = new Map();
for (const card of cards) {
  const label = card.id || card.cz || "(missing id)";
  for (const field of ["cz", "en", "hi", "sentence"]) {
    if (!String(card[field] || "").trim()) errors.push(`${label}: missing ${field}`);
  }

  if (isExtended(card) && !String(card.ur || "").trim()) errors.push(`${label}: extended card missing Urdu`);
  if (isExtended(card) && !String(card.sentenceEn || "").trim()) errors.push(`${label}: extended card missing English example`);
  if (fillerExample.test(card.sentence || "") || fillerExample.test(card.sentenceEn || "")) errors.push(`${label}: filler/meta example sentence`);
  if (mojibake.test(card.sentence || "") || mojibake.test(card.sentenceEn || "")) errors.push(`${label}: mojibake in example sentence`);

  if (isExtended(card) && !hasDevanagari.test(card.hi || "")) warnings.push(`${label}: Hindi may not contain Devanagari`);
  if (isExtended(card) && !hasArabic.test(card.ur || "")) warnings.push(`${label}: Urdu may not contain Arabic script`);

  if (!isNumberCard(card) && !isFormCard(card)) {
    const key = String(card.cz || "").normalize("NFC").toLocaleLowerCase("cs-CZ");
    if (realSeen.has(key)) errors.push(`${label}: duplicate real word "${card.cz}" also in ${realSeen.get(key)}`);
    else realSeen.set(key, label);
  }
}

const counts = {
  total: cards.length,
  a2All: cards.filter((card) => inferredLevel(card) === "a2").length,
  a2Core: cards.filter((card) => inferredLevel(card) === "a2" && !isNumberCard(card) && !isFormCard(card)).length,
  b1Extended: cards.filter(isExtended).length,
  b1Forms: cards.filter(isFormCard).length,
  realUnique: realSeen.size
};

if (counts.a2Core < 650) errors.push(`A2 core count too low: ${counts.a2Core}`);
if (counts.realUnique < 2000) errors.push(`Unique real-word count too low: ${counts.realUnique}`);
if (counts.b1Extended < 1200) errors.push(`Extended lemma count too low: ${counts.b1Extended}`);
if (counts.b1Forms < 1000) errors.push(`Verb form count too low: ${counts.b1Forms}`);

if (warnings.length) {
  console.warn(`Data validation warnings (${warnings.length}):`);
  for (const warning of warnings.slice(0, 20)) console.warn(`- ${warning}`);
  if (warnings.length > 20) console.warn(`- ...${warnings.length - 20} more`);
}

if (errors.length) {
  console.error(`Data validation failed (${errors.length}):`);
  for (const error of errors.slice(0, 60)) console.error(`- ${error}`);
  if (errors.length > 60) console.error(`- ...${errors.length - 60} more`);
  process.exit(1);
}

console.log(`Data validation passed: ${JSON.stringify(counts)}`);
