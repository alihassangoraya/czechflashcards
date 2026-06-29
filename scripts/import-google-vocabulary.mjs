import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const donorFile = path.resolve(root, "..", "czech-flash-cards-google", "app", "src", "main", "java", "com", "example", "data", "seeder", "B1VocabData.kt");
const outputFile = path.join(root, "data", "google-vocabulary-details.json");
const translate = process.argv.includes("--translate");
const batchOffset = Math.max(0, Number(process.argv.find((argument) => argument.startsWith("--offset="))?.split("=")[1]) || 0);
const batchLimit = Math.max(1, Number(process.argv.find((argument) => argument.startsWith("--limit="))?.split("=")[1]) || Number.POSITIVE_INFINITY);
const categories = [
  "Daily Routines & Social", "Travel and Holidays", "Food and Drink", "Home and Family",
  "Work and Business", "Education and Learning", "Shopping and Finance", "Health and Lifestyle",
  "Culture and Entertainment", "Environment and Nature", "Technology & Media", "Sports & Recreation"
];
const translationOverrides = {
  hranice: { hi: "सीमा", ur: "سرحد" },
  přísada: { hi: "सामग्री", ur: "جزو" },
  matrace: { hi: "गद्दा", ur: "گدا" },
  premiéra: { hi: "प्रथम प्रदर्शन", ur: "پہلا مظاہرہ" },
  vernisáž: { hi: "कला प्रदर्शनी का उद्घाटन", ur: "نمائش کی افتتاحی تقریب" },
  kontejner: { hi: "कंटेनर", ur: "کنٹینر" },
  "mořský orel": { hi: "मछली खाने वाला गरुड़", ur: "ماہی خور عقاب" },
  panelák: { hi: "पूर्वनिर्मित अपार्टमेंट इमारत", ur: "پری فیب اپارٹمنٹ عمارت" },
  DPH: { hi: "मूल्य वर्धित कर", ur: "ویلیو ایڈڈ ٹیکس" },
  "cena s dph": { hi: "मूल्य वर्धित कर सहित कीमत", ur: "ویلیو ایڈڈ ٹیکس سمیت قیمت" }
};

if (!fs.existsSync(donorFile)) throw new Error(`Google-project seed data was not found: ${donorFile}`);
const source = fs.readFileSync(donorFile, "utf8");
const existing = fs.existsSync(outputFile) ? JSON.parse(fs.readFileSync(outputFile, "utf8")) : [];
const translations = new Map(existing.map((entry) => [entry.cz, { hi: entry.hi, ur: entry.ur }]));

function section(name, nextName) {
  const start = source.indexOf(`private fun ${name}`);
  const end = nextName ? source.indexOf(`private fun ${nextName}`, start) : source.length;
  return source.slice(start, end);
}

function staticMap(block) {
  return new Map([...block.matchAll(/"([^"]+)"\s+to\s+"([^"]+)"/g)].map(([, key, value]) => [key, value]));
}

function staticExamples() {
  return new Map([...section("generateSimpleExample", "getDailyRoutinesSocialWords").matchAll(/"([^"]+)"\s*->\s*Pair\("([^"]*)",\s*"([^"]*)"\)/g)].map(([, key, sentence, sentenceEn]) => [key, { sentence, sentenceEn }]));
}

const synonyms = staticMap(section("generateSynonyms", "generateSimplePronunciation"));
const antonyms = staticMap(section("generateAntonyms"));
const examples = staticExamples();

function pronunciation(value) {
  return value
    .replace(/ch/g, "h").replace(/š/g, "sh").replace(/č/g, "ch").replace(/ž/g, "zh")
    .replace(/ř/g, "rzh").replace(/ě/g, "ye").replace(/[ýí]/g, "ee").replace(/á/g, "aa")
    .replace(/ó/g, "oo").replace(/[úů]/g, "oo").replace(/ď/g, "dy").replace(/ť/g, "ty")
    .replace(/ň/g, "ny").toLowerCase();
}

function fallbackSynonyms(czech, category) {
  const word = czech.toLowerCase().trim();
  if (word.includes(" se") || word.includes(" si")) return `provádět ${word.split(" ")[0]}, činit se, realizovat ${word.split(" ")[0]}`;
  if (word.endsWith("ovat")) {
    const stem = word.slice(0, -4);
    return `působit ${stem}, provádět ${stem}ování, konat ${word}`;
  }
  if (/(at|et|it|t)$/.test(word)) return `činit ${word}, provádět akci, dělat`;
  if (/[ýí]$/.test(word)) return `mírně ${word}, popsatelný jako ${word}, vykazující ${word}`;
  const byCategory = {
    "Daily Routines & Social": "společenský výraz, obvyklý termín, hovorový ekvivalent",
    "Travel and Holidays": "turistický termín, pojem z cestování, výletní slovo",
    "Food and Drink": "gastronomický výraz, kulinářský termín, k jídlu a pití",
    "Home and Family": "rodinný pojem, domácí výraz, obytný termín",
    "Work and Business": "profesní termín, obchodní výraz, pracovní slovo",
    "Education and Learning": "akademický výraz, studijní pojem, školní slovo",
    "Shopping and Finance": "finanční výraz, peněžní termín, nákupní pojem",
    "Health and Lifestyle": "zdravotní pojem, medicínský termín, životní styl",
    "Culture and Entertainment": "umělecký pojem, kulturní výraz, zábavní termín",
    "Environment and Nature": "přírodní výraz, ekologický pojem, venkovní slovo",
    "Technology & Media": "digitální pojem, technický výraz, mediální slovo",
    "Sports & Recreation": "sportovní výraz, rekreační termín, pohybové slovo"
  };
  return byCategory[category] || "příbuzný výraz, ekvivalent, synonymní slovo";
}

function fallbackAntonyms(czech) {
  const word = czech.toLowerCase().trim();
  if (word.startsWith("ne") && word.length > 3) return `${word.slice(2)}, kladná forma`;
  if (/[ýí]$/.test(word)) return `ne${word}, opačný přívlastek`;
  if (/(at|et|it|t)$/.test(word)) return `ne${word.replace(/t$/, "")}t, zamezit konání`;
  return `opak slova ${word}, opačný pojem`;
}

function fallbackExample(czech, english, category) {
  const verb = english.toLowerCase().replace(/^to\s+/, "");
  if (english.toLowerCase().startsWith("to ")) return { sentence: `Chci se naučit, jak správně ${czech} v této situaci.`, sentenceEn: `I want to learn how to correctly ${verb} in this situation.` };
  if (/[ýíéá]$/.test(czech) || /(ful|able|y|ing)/i.test(english)) return { sentence: `Tento ${czech} styl se mi opravdu velmi líbí.`, sentenceEn: `I really like this ${english} style very much.` };
  const starters = {
    "Food and Drink": ["Mám moc rád čerstvý", "I really like fresh"],
    "Travel and Holidays": ["Během naší dovolené budeme určitě potřebovat", "During our vacation we will definitely need"],
    "Work and Business": ["Moje každodenní práce vyžaduje mít dobrý", "My daily work requires having a good"],
    "Home and Family": ["V našem útulném domově máme nový, praktický", "In our cozy home we have a new, practical"],
    "Education and Learning": ["Studenti se učí, co přesně", "Students learn what exactly"],
    "Shopping and Finance": ["Tento obchod nabízí skvělý", "This shop offers a great"],
    "Health and Lifestyle": ["Pro udržení pevného zdraví je", "To maintain strong health"],
    "Culture and Entertainment": ["Mám velký zájem o tuto kulturu a tento", "I am very interested in this culture and this"],
    "Environment and Nature": ["V přírodě můžeme vidět krásné, chráněné", "In nature we can see beautiful, protected"],
    "Technology & Media": ["Tento moderní", "This modern"],
    "Sports & Recreation": ["Aktivní", "Active"],
    "Daily Routines & Social": ["Tento", "This"]
  };
  const [czStart, enStart] = starters[category] || ["Toto slovo", "This word"];
  return { sentence: `${czStart} ${czech}.`, sentenceEn: `${enStart} ${english}.` };
}

function grammar(czech, english) {
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

function donorWords() {
  const functions = [...source.matchAll(/private fun get\w+Words\(\): String \{\s*return "([^"]*)"/g)];
  if (functions.length !== categories.length) throw new Error(`Expected ${categories.length} donor categories, found ${functions.length}`);
  const seen = new Set();
  const words = [];
  functions.forEach((match, categoryIndex) => {
    for (const pair of match[1].split(";")) {
      const separator = pair.indexOf(":");
      if (separator < 1) continue;
      const cz = pair.slice(0, separator).trim();
      const en = pair.slice(separator + 1).trim();
      const key = cz.normalize("NFC").toLocaleLowerCase("cs-CZ");
      if (!cz || !en || seen.has(key)) continue;
      seen.add(key);
      const category = categories[categoryIndex];
      words.push({
        cz,
        en,
        category,
        pronunciation: pronunciation(cz),
        synonyms: synonyms.get(key) || fallbackSynonyms(cz, category),
        antonyms: antonyms.get(key) || fallbackAntonyms(cz),
        ...(examples.get(key) || fallbackExample(cz, en, category)),
        grammar: grammar(cz, en)
      });
    }
  });
  return words;
}

async function translateText(text, target) {
  const params = new URLSearchParams({ client: "gtx", sl: "cs", tl: target, dt: "t", q: text });
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
  if (!response.ok) throw new Error(`Translation failed (${response.status}) for ${text}`);
  const payload = await response.json();
  const translated = payload?.[0]?.map((part) => part?.[0] || "").join("").trim();
  if (!translated) throw new Error(`Translation returned no result for ${text}`);
  return translated;
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: limit }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index], index);
      if ((index + 1) % 100 === 0) console.log(`Translated ${index + 1}/${items.length}`);
    }
  }));
  return results;
}

const words = donorWords();
if (translate) {
  const missing = words.filter((word) => !translations.get(word.cz)?.hi || !translations.get(word.cz)?.ur);
  const batch = missing.slice(batchOffset, batchOffset + batchLimit);
  const completed = await mapWithConcurrency(batch, 2, async (word) => ({
    cz: word.cz,
    hi: await translateText(word.cz, "hi"),
    ur: await translateText(word.cz, "ur")
  }));
  for (const entry of completed) translations.set(entry.cz, entry);
  console.log(`Completed translation batch ${batchOffset + 1}-${batchOffset + batch.length} of ${missing.length}`);
}

const output = words.map((word) => ({
  ...word,
  hi: translationOverrides[word.cz]?.hi || translations.get(word.cz)?.hi || "",
  ur: translationOverrides[word.cz]?.ur || translations.get(word.cz)?.ur || ""
}));
fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${output.length} Google-project vocabulary details to ${outputFile}`);
