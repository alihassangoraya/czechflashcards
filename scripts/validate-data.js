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
const generatedExample = /(^Dnes potřebuju|pracuje dnes dlouho|^Nebudu .* pozdě večer\.$|^Umím .* jen trochu\.$|^Udělám to (furt|mile|polo|blaze|nato|minus|tama)\.$|^Ten (plán|byt) je |^Ten (onen|aji) je |I need .* today|works for a long time today|The flat is (thick|naked|French|quick|thin|ripe|obedient))/i;
const rejectedPlaceholderExample = /se používá v každodenní praxi|used in everyday practice|used in healthcare|používá ve zdravotnictví|appears in the text|objevuje slovo|part of a meal|součást jídla|can affect the final result|ovlivnit konečný výsledek|contains useful information|obsahuje užitečné informace|is located near the city|nachází nedaleko města|works in their field|pracuje ve svém oboru|requires regular practice|vyžaduje pravidelný trénink|transports people or cargo|přepravuje lidi nebo náklad|appears in stories and films|objevuje se v příbězích a filmech|requires a medical examination|potřebuje lékařské vyšetření|is used to make various products|používá při výrobě různých produktů|is served in a glass|podává ve sklenici|žije ve volné přírodě|lives in the wild|patří do kulturního programu|is part of the cultural program|se v přírodě objevuje za určitých podmínek|occurs in nature under certain conditions|vyžaduje opatrné zacházení|requires careful handling|používá při odborném měření|used in technical measurement|sdružuje více lidí|brings several people together|je na stole|is on the table|začíná podle programu|begins according to the schedule|roste v přírodě|grows in nature|je pro mě důležitý den|is an important day for me|je pro mě důležitý měsíc|is an important month for me|patří do kalendáře|is part of the calendar|leží na stole|is lying on the table|je písmeno řecké abecedy|is a letter of the greek alphabet/i;
const requiredCorrections = {
  "lemma-29-bez": { en: /without/i, hi: /बिना/, ur: /بغیر/, tags: /preposition/ },
  "lemma-47-stesti": { en: /luck/i, hi: /किस्मत/, ur: /قسمت/ },
  "lemma-60-prijit": { en: /come|arrive/i, hi: /आना|पहुँचना/, ur: /آنا|پہنچنا/ },
  "lemma-62-zeme": { en: /country/i, hi: /देश/, ur: /ملک/ },
  "lemma-74-druhy": { en: /second/i, hi: /दूसरा/, ur: /دوسرا/ },
  "lemma-88-film": { en: /movie|film/i, hi: /फ़िल्म|फिल्म/, ur: /فلم/ },
  "lemma-97-zadek": { en: /bottom|backside/i, hi: /नितंब|पिछला भाग/, ur: /کولہے|پچھلا حصہ/ },
  "lemma-98-sedet": { en: /fit|suit/i, hi: /फिट/, ur: /موزوں/ },
  "lemma-99-vole": { en: /crop/i, hi: /अन्न-थैली/, ur: /خوراک کی تھیلی/ },
  "lemma-112-mily": { en: /kind/i, hi: /दयालु/, ur: /مہربان/ },
  "lemma-120-stop": { en: /ban|suspension/i, hi: /प्रतिबंध/, ur: /پابندی/ },
  "lemma-123-doba": { en: /time|period|era/i, hi: /समय|अवधि|युग/, ur: /وقت|مدت|دور/ },
  "lemma-124-dokazat": { en: /manage|able|prove/i, hi: /कर पाना|साबित/, ur: /کر سکنا|ثابت/ },
  "lemma-125-zly": { en: /bad|mean|evil/i, hi: /^बुरा$/, ur: /^برا$/ },
  "lemma-145-bal": { en: /formal dance/i, hi: /नृत्य समारोह/, ur: /رقص کی محفل/ },
  "lemma-146-drink": { en: /drink/i, hi: /ड्रिंक|कॉकटेल/, ur: /ڈرنک|کاک/ },
  "lemma-163-kouzlo": { en: /magic|spell/i, hi: /जादू|मंत्र/, ur: /جادو|منتر/ },
  "lemma-177-talent": { en: /talent|ability/i, hi: /प्रतिभा|योग्यता/, ur: /صلاحیت|ہنر/ },
  "lemma-190-rozum": { en: /reason|common sense/i, hi: /बुद्धि|समझ/, ur: /عقل|سمجھ/ },
  "lemma-316-bastard": { en: /insult|illegitimate/i, hi: /नाजायज़/, ur: /ناجائز/ },
  "lemma-371-znacka": { en: /brand/i, hi: /ब्रांड/, ur: /برانڈ/ },
  "lemma-233-stopa": { en: /trace|footprint/i, hi: /निशान|पदचिह्न/, ur: /نشان/ },
  "lemma-257-lezet": { hi: /लेटना/, ur: /لیٹنا/ },
  "lemma-299-lov": { hi: /^शिकार$/, ur: /^شکار$/ },
  "lemma-506-spor": { hi: /विवाद|झगड़ा/, ur: /تنازع|جھگڑا/ },
  "lemma-536-horet": { hi: /जलना/, ur: /جلنا/ },
  "lemma-550-euro": { en: /currency/i, hi: /यूरो \(मुद्रा\)/, ur: /یورو \(کرنسی\)/ },
  "lemma-224-sladky": { hi: /मीठा/, ur: /میٹھا/ },
  "lemma-236-body": { en: /points/i, hi: /अंक|पॉइंट/, ur: /پوائنٹ|نمبر/ },
  "lemma-276-vstoupit": { en: /^to enter$/i, hi: /प्रवेश करना/, ur: /داخل ہونا/ },
  "lemma-399-kriz": { en: /cross/i, hi: /क्रॉस|सलीब/, ur: /صلیب/ },
  "lemma-428-akcie": { en: /shares?|stocks?/i, hi: /शेयर/, ur: /حصہ|شیئرز/ },
  "lemma-582-karma": { en: /karma/i, hi: /कर्म/, ur: /کرما/ },
  "lemma-617-kachna": { en: /duck/i, hi: /^बत्तख$/, ur: /^بطخ$/ },
  "lemma-649-pismeno": { en: /letter/i, hi: /अक्षर/, ur: /حرف/ },
  "lemma-635-panic": { en: /male virgin/i, hi: /कुंवारा/, ur: /کنوارا/ },
  "lemma-767-sach": { en: /check/i, hi: /शह/, ur: /شہ/ },
  "lemma-806-moucha": { en: /fly/i, hi: /मक्खी/, ur: /مکھی/ },
  "lemma-791-jasan": { en: /ash tree/i, hi: /ऐश वृक्ष/, ur: /ایش کا درخت/ },
  "lemma-856-onen": { en: /literary/i, hi: /साहित्यिक/, ur: /ادبی/ },
  "lemma-902-peceni": { en: /baking/i, hi: /बेकिंग/, ur: /بیکنگ/ },
  "lemma-943-neb": { en: /because/i, hi: /क्योंकि|चूँकि/, ur: /کیونکہ|چونکہ/ },
  "lemma-1112-zanedbani": { en: /neglect/i, hi: /^उपेक्षा$/, ur: /غفلت/ },
  "lemma-1126-propaganda": { en: /propaganda/i, hi: /^प्रचार$/, ur: /پروپیگنڈا/ },
  "lemma-1062-senza": { en: /great/i, hi: /शानदार/, ur: /شاندار/ },
  "lemma-1085-narkoman": { en: /drug addict/i, hi: /नशे का आदी/, ur: /منشیات کا عادی/ },
  "lemma-1122-rozkrok": { en: /crotch|groin/i, hi: /जाँघों/, ur: /رانوں/ },
  "lemma-1147-aji": { en: /dialect/i, hi: /बोली/, ur: /بولی/ },
  "lemma-1172-lis": { en: /press/i, hi: /प्रेस मशीन/, ur: /پریس مشین/ },
  "lemma-1232-lup": { en: /loot|plunder/i, hi: /लूट का माल/, ur: /لوٹ کا مال/ },
  "lemma-1235-holy": { en: /bare|bald/i, hi: /गंजा/, ur: /گنجا/ },
  "lemma-1238-pres": { en: /press \(machine\)/i, hi: /प्रेस मशीन/, ur: /پریس مشین/ },
  "lemma-1245-salsa": { en: /dance/i, hi: /नृत्य/, ur: /رقص/ },
  "lemma-1252-klarinet": { en: /clarinet/i, hi: /क्लैरिनेट/, ur: /کلیرنیٹ/ },
  "lemma-1260-sekunda": { en: /second/i, hi: /^सेकंड$/, ur: /^سیکنڈ$/ },
  "lemma-1306-squash": { en: /racket sport/i, hi: /रैकेट/, ur: /ریکیٹ/ },
  "lemma-1314-salto": { en: /somersault/i, hi: /कलाबाज़ी/, ur: /قلابازی/ },
  "lemma-1318-plachta": { en: /sail/i, hi: /^पाल$/, ur: /^بادبان$/ },
  "lemma-1368-swing": { en: /dance/i, hi: /नृत्य/, ur: /رقص/ },
  "lemma-1384-slavik": { en: /nightingale/i, hi: /बुलबुल/, ur: /^بلبل$/ },
  "lemma-1386-racek": { en: /gull/i, hi: /समुद्री पक्षी/, ur: /سمندری پرندہ/ },
  "lemma-1396-bridz": { en: /card game/i, hi: /ताश का खेल/, ur: /تاش کا کھیل/ },
  "lemma-1397-negativ": { en: /photography/i, hi: /फोटोग्राफी/, ur: /فوٹوگرافی/ }
};

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

function hasBalancedParentheses(value) {
  const text = String(value || "");
  return (text.match(/\(/g) || []).length === (text.match(/\)/g) || []).length;
}

function hasDuplicateEquivalent(value) {
  const parts = String(value || "")
    .split(/[,،;؛]/)
    .map((part) => part.trim().replace(/[.!।۔]+$/g, ""))
    .filter(Boolean);
  return parts.length > 1 && new Set(parts).size !== parts.length;
}

const realSeen = new Map();
for (const card of cards) {
  const label = card.id || card.cz || "(missing id)";
  for (const field of ["cz", "en", "hi", "sentence", "sentenceEn"]) {
    if (!String(card[field] || "").trim()) errors.push(`${label}: missing ${field}`);
  }

  if (isExtended(card) && !String(card.ur || "").trim()) errors.push(`${label}: extended card missing Urdu`);
  if (fillerExample.test(card.sentence || "") || fillerExample.test(card.sentenceEn || "")) errors.push(`${label}: filler/meta example sentence`);
  if (generatedExample.test(card.sentence || "") || generatedExample.test(card.sentenceEn || "")) errors.push(`${label}: low-quality generated example sentence`);
  if (rejectedPlaceholderExample.test(card.sentence || "") || rejectedPlaceholderExample.test(card.sentenceEn || "")) errors.push(`${label}: rejected placeholder example sentence`);
  if (mojibake.test(card.sentence || "") || mojibake.test(card.sentenceEn || "")) errors.push(`${label}: mojibake in example sentence`);
  for (const field of ["en", "hi", "ur", "sentence", "sentenceEn"]) {
    if (!hasBalancedParentheses(card[field])) errors.push(`${label}: unbalanced parentheses in ${field}`);
  }
  if (hasDuplicateEquivalent(card.hi)) errors.push(`${label}: duplicate Hindi equivalents`);
  if (hasDuplicateEquivalent(card.ur)) errors.push(`${label}: duplicate Urdu equivalents`);

  if (isExtended(card) && !hasDevanagari.test(card.hi || "")) warnings.push(`${label}: Hindi may not contain Devanagari`);
  if (isExtended(card) && !hasArabic.test(card.ur || "")) warnings.push(`${label}: Urdu may not contain Arabic script`);

  if (requiredCorrections[label]) {
    const checks = requiredCorrections[label];
    for (const [field, pattern] of Object.entries(checks)) {
      const value = field === "tags" ? (card.tags || []).join(" ") : String(card[field] || "");
      if (!pattern.test(value)) errors.push(`${label}: corrected ${field} regressed (${value})`);
    }
  }

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
