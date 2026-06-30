import { overridesFile, seedFile } from "./urdu-fill/urduFillConfig.mjs";
import { readLimit } from "./urdu-fill/urduFillArgs.mjs";
import { readOverrides, readSeedCards, writeOverrides } from "./urdu-fill/urduFillFiles.mjs";
import { fillMissingUrdu } from "./urdu-fill/urduFillWorkflow.mjs";

const limit = readLimit(process.argv);
const overrides = readOverrides(overridesFile);
const translated = await fillMissingUrdu(readSeedCards(seedFile), overrides, limit);

if (!translated.length) {
  console.log("No missing Urdu overrides to fill.");
  process.exit(0);
}

writeOverrides(overridesFile, overrides);
console.log(`Wrote ${translated.length} Urdu overrides to ${overridesFile}`);
