import fs from "node:fs";

export function loadSeed(seedPath) {
  const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
  return {
    cards: seed.cards || [],
    seedVersion: String(seed.seedVersion || "legacy-seed")
  };
}
