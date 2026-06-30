import fs from "node:fs";
import { donorWords } from "./google-import/donorParser.mjs";
import { parseImportArgs } from "./google-import/importArgs.mjs";
import { translationOverrides } from "./google-import/importConfig.mjs";
import { donorFile, outputFile } from "./google-import/importPaths.mjs";
import { fillMissingTranslations, loadTranslationMap } from "./google-import/translationBatch.mjs";

if (!fs.existsSync(donorFile)) throw new Error(`Google-project seed data was not found: ${donorFile}`);

const options = parseImportArgs(process.argv);
const source = fs.readFileSync(donorFile, "utf8");
const existing = fs.existsSync(outputFile) ? JSON.parse(fs.readFileSync(outputFile, "utf8")) : [];
const translations = loadTranslationMap(existing);
const words = donorWords(source);

if (options.translate) {
  await fillMissingTranslations({ words, translations, batchOffset: options.batchOffset, batchLimit: options.batchLimit });
}

const output = words.map((word) => ({
  ...word,
  hi: translationOverrides[word.cz]?.hi || translations.get(word.cz)?.hi || "",
  ur: translationOverrides[word.cz]?.ur || translations.get(word.cz)?.ur || ""
}));

fs.writeFileSync(outputFile, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${output.length} Google-project vocabulary details to ${outputFile}`);
