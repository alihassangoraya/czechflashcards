const fs = require("fs");
const path = require("path");
const { normalizedCzech } = require("./text/czechText");

const overridesPath = path.resolve(__dirname, "..", "data", "legacy-urdu-overrides.json");

function loadLegacyUrduOverrides() {
  if (!fs.existsSync(overridesPath)) return new Map();
  const payload = JSON.parse(fs.readFileSync(overridesPath, "utf8"));
  return new Map(Object.entries(payload).map(([cz, ur]) => [normalizedCzech(cz), String(ur || "").trim()]));
}

function applyLegacyUrduOverrides(cards) {
  const overrides = loadLegacyUrduOverrides();
  if (!overrides.size) return cards;

  for (const card of cards) {
    if (String(card.ur || card.urdu || "").trim()) continue;
    const override = overrides.get(normalizedCzech(card.cz));
    if (override) card.ur = override;
  }
  return cards;
}

module.exports = { applyLegacyUrduOverrides, loadLegacyUrduOverrides, normalizedCzech };
