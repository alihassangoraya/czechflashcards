import fs from "node:fs";

export function readSeedCards(seedFile) {
  return JSON.parse(fs.readFileSync(seedFile, "utf8")).cards || [];
}

export function readOverrides(overridesFile) {
  return fs.existsSync(overridesFile) ? JSON.parse(fs.readFileSync(overridesFile, "utf8")) : {};
}

export function writeOverrides(overridesFile, overrides) {
  const sorted = Object.fromEntries(Object.entries(overrides).sort(([left], [right]) => left.localeCompare(right, "cs")));
  fs.writeFileSync(overridesFile, `${JSON.stringify(sorted, null, 2)}\n`);
}
