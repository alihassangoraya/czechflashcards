(function addFocusDecks() {
  // The base vocabulary provides 700 A2 core words. The first practical
  // extended lemmas below bring that deck to 1,000. The remaining extended
  // lemmas form a distinct B1 deck after excluding 61 deliberately niche
  // items (fantasy, rare animals, specialist science, and similar low-value
  // vocabulary for a Czech learner's first focused B1 deck).
  const excludedFromFocus = new Set([
    "bůh", "ďábel", "satan", "peklo", "duše", "kouzlo", "zázrak", "magie", "čaroděj", "kouzelník",
    "drak", "zombie", "superman", "trpaslík", "král", "královna", "království", "rytíř", "meč", "válečník",
    "otrok", "otroctví", "kat", "papež", "mnich", "prorok", "vůl", "los", "medvěd", "orel",
    "lev", "tygr", "slon", "žirafa", "leopard", "skunk", "panda", "velryba", "chobotnice", "krocan",
    "zmije", "sob", "beran", "jelen", "liška", "žralok", "želva", "brouk", "motýl", "stádo",
    "hejno", "smečka", "nafta", "kořist", "vole", "ron", "halo", "koks", "krypton", "gray", "kelvin"
  ]);

  const extendedCards = (window.CZECH_B1_VOCAB || []).filter((card) => card.tags.includes("extended"));
  const practicalExtensions = extendedCards.filter((card) => !excludedFromFocus.has(card.cz));
  const a2Supplement = practicalExtensions.slice(0, 300);
  const a2Ids = new Set(a2Supplement.map((card) => card.id));
  const b1Focus = extendedCards.filter((card) => !a2Ids.has(card.id) && !excludedFromFocus.has(card.cz));
  const a2Core = (window.CZECH_B1_VOCAB || []).filter((card) =>
    !card.tags.includes("extended") && !card.tags.includes("numbers") && !card.tags.includes("forms")
  );

  if (a2Core.length !== 700 || a2Supplement.length !== 300 || b1Focus.length !== 1000) {
    throw new Error(`Focus deck curation must be 700 A2 core + 300 A2 extensions + 1000 B1 lemmas; found ${a2Core.length}, ${a2Supplement.length}, ${b1Focus.length}.`);
  }

  for (const card of [...a2Core, ...a2Supplement]) {
    if (!card.tags.includes("a2-focus")) card.tags.push("a2-focus");
  }
  for (const card of b1Focus) {
    if (!card.tags.includes("b1-focus")) card.tags.push("b1-focus");
  }

  window.CZECH_A2_FOCUS_IDS = [...a2Core, ...a2Supplement].map((card) => card.id);
  window.CZECH_B1_FOCUS_IDS = b1Focus.map((card) => card.id);
})();
