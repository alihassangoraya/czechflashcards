const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { enrichWithGoogleVocabulary } = require("../google-vocabulary");
const { applyLegacyUrduOverrides } = require("../legacy-urdu-overrides");
const { baseSourceFiles, root } = require("./seedConfig");

function loadCards() {
  const context = { window: {} };
  context.globalThis = context;
  vm.createContext(context);

  for (const file of baseSourceFiles) {
    vm.runInContext(fs.readFileSync(path.join(root, file), "utf8"), context, { filename: file });
  }

  context.window.CZECH_B1_VOCAB = enrichWithGoogleVocabulary(context.window.CZECH_B1_VOCAB || []);
  context.window.CZECH_B1_VOCAB = applyLegacyUrduOverrides(context.window.CZECH_B1_VOCAB);
  vm.runInContext(fs.readFileSync(path.join(root, "data", "verb-forms.js"), "utf8"), context, { filename: "data/verb-forms.js" });

  return context.window.CZECH_B1_VOCAB || [];
}

module.exports = { loadCards };
