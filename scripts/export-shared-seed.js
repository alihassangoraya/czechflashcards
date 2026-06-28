const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const outFile = path.join(root, "packages", "shared", "data", "vocabulary.seed.json");
const sourceFiles = ["data/vocabulary.js", "data/extended-lemmas.js", "data/focus-decks.js", "data/verb-forms.js"];

function loadCards() {
  const context = { window: {} };
  context.globalThis = context;
  vm.createContext(context);

  for (const file of sourceFiles) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }

  return context.window.CZECH_B1_VOCAB || [];
}

function normalizeForSeed(card, index) {
  return {
    id: card.id || `${String(card.cz || "card").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${index}`,
    cz: String(card.cz || "").trim(),
    en: String(card.en || "").trim(),
    hi: String(card.hi || "").trim(),
    ur: String(card.ur || card.urdu || "").trim(),
    sentence: String(card.sentence || "").trim(),
    sentenceEn: String(card.sentenceEn || card.exampleEn || "").trim(),
    level: card.level || null,
    tags: Array.isArray(card.tags) ? card.tags : String(card.tags || "daily").split(/[,\s]+/).filter(Boolean),
    source: card.source || "legacy-web"
  };
}

function buildPayload() {
  return JSON.stringify({
    generatedFrom: sourceFiles,
    generatedAt: "deterministic",
    cards: loadCards().map(normalizeForSeed)
  }, null, 2) + "\n";
}

const payload = buildPayload();
if (process.argv.includes("--check")) {
  const current = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : "";
  if (current !== payload) {
    console.error("Shared seed data is out of date. Run `npm run seed:shared`.");
    process.exit(1);
  }
  console.log("Shared seed data is current.");
} else {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, payload);
  console.log(`Wrote ${outFile}`);
}
