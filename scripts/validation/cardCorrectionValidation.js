const { requiredCorrections } = require("./requiredCorrections");

function validateRequiredCorrections(card, label, errors) {
  const checks = requiredCorrections[label];
  if (!checks) return;
  for (const [field, pattern] of Object.entries(checks)) {
    const value = field === "tags" ? (card.tags || []).join(" ") : String(card[field] || "");
    if (!pattern.test(value)) errors.push(`${label}: corrected ${field} regressed (${value})`);
  }
}

module.exports = { validateRequiredCorrections };
