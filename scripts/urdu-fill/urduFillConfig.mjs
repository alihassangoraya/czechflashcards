import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

export const seedFile = path.join(root, "packages", "shared", "data", "vocabulary.seed.json");
export const overridesFile = path.join(root, "data", "legacy-urdu-overrides.json");
