export function normalizedCzech(value) {
  return String(value || "").normalize("NFC").trim().toLocaleLowerCase("cs-CZ");
}

export function missingUrduCards(cards, overrides, limit) {
  const overrideKeys = new Set(Object.keys(overrides).map(normalizedCzech));
  return cards
    .filter((card) => !String(card.ur || "").trim())
    .filter((card) => !overrideKeys.has(normalizedCzech(card.cz)))
    .slice(0, limit);
}
