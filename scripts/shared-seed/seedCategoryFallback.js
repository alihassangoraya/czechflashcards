const synonymByCategory = {
  "Daily Routines & Social": "společenský výraz, obvyklý termín, hovorový ekvivalent",
  "Travel and Holidays": "turistický termín, pojem z cestování, výletní slovo",
  "Food and Drink": "gastronomický výraz, kulinářský termín, k jídlu a pití",
  "Home and Family": "rodinný pojem, domácí výraz, obytný termín",
  "Work and Business": "profesní termín, obchodní výraz, pracovní slovo",
  "Education and Learning": "akademický výraz, studijní pojem, školní slovo",
  "Shopping and Finance": "finanční výraz, peněžní termín, nákupní pojem",
  "Health and Lifestyle": "zdravotní pojem, medicínský termín, životní styl",
  "Culture and Entertainment": "umělecký pojem, kulturní výraz, zábavní termín",
  "Environment and Nature": "přírodní výraz, ekologický pojem, venkovní slovo",
  "Technology & Media": "digitální pojem, technický výraz, mediální slovo",
  "Sports & Recreation": "sportovní výraz, rekreační termín, pohybové slovo"
};

const categoryByTag = [
  ["travel", "Travel and Holidays"], ["food", "Food and Drink"],
  ["home", "Home and Family"], ["family", "Home and Family"],
  ["work", "Work and Business"], ["business", "Work and Business"],
  ["education", "Education and Learning"], ["school", "Education and Learning"],
  ["shopping", "Shopping and Finance"], ["finance", "Shopping and Finance"],
  ["health", "Health and Lifestyle"], ["culture", "Culture and Entertainment"],
  ["environment", "Environment and Nature"], ["nature", "Environment and Nature"],
  ["technology", "Technology & Media"], ["media", "Technology & Media"],
  ["sport", "Sports & Recreation"]
];

function fallbackCategory(card) {
  const tagText = (Array.isArray(card.tags) ? card.tags : []).join(" ").toLowerCase();
  const match = categoryByTag.find(([tag]) => tagText.includes(tag));
  if (match) return match[1];
  return String(card.en || "").toLowerCase().startsWith("to ") ? "Daily Routines & Social" : "Core Words";
}

module.exports = { fallbackCategory, synonymByCategory };
