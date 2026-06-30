import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const donorFile = path.resolve(root, "..", "czech-flash-cards-google", "app", "src", "main", "java", "com", "example", "data", "seeder", "B1VocabData.kt");
export const outputFile = path.join(root, "data", "google-vocabulary-details.json");
