const fs = require("fs");
const { detailsPath } = require("./googleVocabularyConfig");

function loadGoogleVocabularyDetails() {
  if (!fs.existsSync(detailsPath)) throw new Error(`Google vocabulary data is missing: ${detailsPath}`);
  return JSON.parse(fs.readFileSync(detailsPath, "utf8"));
}

module.exports = { loadGoogleVocabularyDetails };
