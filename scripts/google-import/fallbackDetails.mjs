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

const exampleStarters = {
  "Food and Drink": ["Mám moc rád čerstvý", "I really like fresh"],
  "Travel and Holidays": ["Během naší dovolené budeme určitě potřebovat", "During our vacation we will definitely need"],
  "Work and Business": ["Moje každodenní práce vyžaduje mít dobrý", "My daily work requires having a good"],
  "Home and Family": ["V našem útulném domově máme nový, praktický", "In our cozy home we have a new, practical"],
  "Education and Learning": ["Studenti se učí, co přesně", "Students learn what exactly"],
  "Shopping and Finance": ["Tento obchod nabízí skvělý", "This shop offers a great"],
  "Health and Lifestyle": ["Pro udržení pevného zdraví je", "To maintain strong health"],
  "Culture and Entertainment": ["Mám velký zájem o tuto kulturu a tento", "I am very interested in this culture and this"],
  "Environment and Nature": ["V přírodě můžeme vidět krásné, chráněné", "In nature we can see beautiful, protected"],
  "Technology & Media": ["Tento moderní", "This modern"],
  "Sports & Recreation": ["Aktivní", "Active"],
  "Daily Routines & Social": ["Tento", "This"]
};

export function pronunciation(value) {
  return value
    .replace(/ch/g, "h").replace(/š/g, "sh").replace(/č/g, "ch").replace(/ž/g, "zh")
    .replace(/ř/g, "rzh").replace(/ě/g, "ye").replace(/[ýí]/g, "ee").replace(/á/g, "aa")
    .replace(/ó/g, "oo").replace(/[úů]/g, "oo").replace(/ď/g, "dy").replace(/ť/g, "ty")
    .replace(/ň/g, "ny").toLowerCase();
}

export function fallbackSynonyms(czech, category) {
  const word = czech.toLowerCase().trim();
  if (word.includes(" se") || word.includes(" si")) return `provádět ${word.split(" ")[0]}, činit se, realizovat ${word.split(" ")[0]}`;
  if (word.endsWith("ovat")) {
    const stem = word.slice(0, -4);
    return `působit ${stem}, provádět ${stem}ování, konat ${word}`;
  }
  if (/(at|et|it|t)$/.test(word)) return `činit ${word}, provádět akci, dělat`;
  if (/[ýí]$/.test(word)) return `mírně ${word}, popsatelný jako ${word}, vykazující ${word}`;
  return synonymByCategory[category] || "příbuzný výraz, ekvivalent, synonymní slovo";
}

export function fallbackAntonyms(czech) {
  const word = czech.toLowerCase().trim();
  if (word.startsWith("ne") && word.length > 3) return `${word.slice(2)}, kladná forma`;
  if (/[ýí]$/.test(word)) return `ne${word}, opačný přívlastek`;
  if (/(at|et|it|t)$/.test(word)) return `ne${word.replace(/t$/, "")}t, zamezit konání`;
  return `opak slova ${word}, opačný pojem`;
}

export function fallbackExample(czech, english, category) {
  const verb = english.toLowerCase().replace(/^to\s+/, "");
  if (english.toLowerCase().startsWith("to ")) return { sentence: `Chci se naučit, jak správně ${czech} v této situaci.`, sentenceEn: `I want to learn how to correctly ${verb} in this situation.` };
  if (/[ýíéá]$/.test(czech) || /(ful|able|y|ing)/i.test(english)) return { sentence: `Tento ${czech} styl se mi opravdu velmi líbí.`, sentenceEn: `I really like this ${english} style very much.` };
  const [czStart, enStart] = exampleStarters[category] || ["Toto slovo", "This word"];
  return { sentence: `${czStart} ${czech}.`, sentenceEn: `${enStart} ${english}.` };
}

export function grammar(czech, english) {
  const isVerb = /^to\s+/i.test(english) || /(?:t)(?:\s+(?:se|si))?$/i.test(czech);
  const isAdjective = /[ýíéá]$/i.test(czech) || /(ful|able|y|ing)$/i.test(english);
  const partOfSpeech = isVerb ? "verb" : isAdjective ? "adjective" : "noun or expression";
  return {
    partOfSpeech,
    reflexive: /\s(?:se|si)$/i.test(czech),
    note: isVerb
      ? "Learn the infinitive with a subject phrase. Czech verb endings change with the person."
      : isAdjective
        ? "Czech adjectives agree with gender, number, and case. Learn this form with a noun."
        : "Learn the word with a short Czech phrase so its case and gender patterns become familiar."
  };
}
