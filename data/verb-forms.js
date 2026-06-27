(function addVerbForms() {
  const deck = window.CZECH_B1_VOCAB || [];
  const seen = new Set(deck.map((card) => String(card.cz || "").trim().toLocaleLowerCase("cs-CZ")));
  const persons = [
    { code: "ja", cs: "Já", en: "I" },
    { code: "ty", cs: "Ty", en: "you" },
    { code: "on", cs: "On/ona", en: "he/she" },
    { code: "my", cs: "My", en: "we" },
    { code: "vy", cs: "Vy", en: "you" },
    { code: "oni", cs: "Oni", en: "they" }
  ];

  function cleanVerb(value) {
    return String(value || "")
      .replace(/^to\s+/i, "")
      .replace(/[,;].*$/, "")
      .trim();
  }

  const presentOverrides = {
    "kašlat": ["kašlu", "kašleš", "kašle", "kašleme", "kašlete", "kašlou"],
    "plakat": ["pláču", "pláčeš", "pláče", "pláčeme", "pláčete", "pláčou"],
    "plavat": ["plavu", "plaveš", "plave", "plaveme", "plavete", "plavou"],
    "poslat": ["pošlu", "pošleš", "pošle", "pošleme", "pošlete", "pošlou"],
    "dostat": ["dostanu", "dostaneš", "dostane", "dostaneme", "dostanete", "dostanou"],
    "vybrat": ["vyberu", "vybereš", "vybere", "vybereme", "vyberete", "vyberou"],
    "zůstat": ["zůstanu", "zůstaneš", "zůstane", "zůstaneme", "zůstanete", "zůstanou"],
    "pozvat": ["pozvu", "pozveš", "pozve", "pozveme", "pozvete", "pozvou"],
    "podepsat": ["podepíšu", "podepíšeš", "podepíše", "podepíšeme", "podepíšete", "podepíšou"],
    "zakázat": ["zakážu", "zakážeš", "zakáže", "zakážeme", "zakážete", "zakážou"],
    "smazat": ["smažu", "smažeš", "smaže", "smažeme", "smažete", "smažou"]
  };

  const imperativeOverrides = {
    "kašlat": ["kašli", "kašlete"],
    "plakat": ["plač", "plačte"],
    "plavat": ["plav", "plavte"],
    "poslat": ["pošli", "pošlete"],
    "dostat": ["dostaň", "dostaňte"],
    "vybrat": ["vyber", "vyberte"],
    "zůstat": ["zůstaň", "zůstaňte"],
    "pozvat": ["pozvi", "pozvěte"],
    "podepsat": ["podepiš", "podepište"],
    "zakázat": ["zakaž", "zakažte"],
    "smazat": ["smaž", "smažte"]
  };

  const safeAtVerbs = new Set([
    "běhat",
    "dělat",
    "prodat",
    "hledat",
    "čekat",
    "poslouchat",
    "objednat",
    "trvat",
    "dýchat",
    "kýchat",
    "foukat",
    "porovnat",
    "zavolat",
    "doufat"
  ]);

  function makeForms(verb) {
    const reflexive = /\s+(se|si)$/.exec(verb);
    const reflexivePart = reflexive ? ` ${reflexive[1]}` : "";
    const infinitive = reflexive ? verb.replace(/\s+(se|si)$/, "") : verb;

    if (presentOverrides[infinitive]) {
      return presentOverrides[infinitive].map((form) => `${form}${reflexivePart}`);
    }

    if (infinitive.endsWith("ovat")) {
      const stem = infinitive.slice(0, -4);
      return ["uji", "uješ", "uje", "ujeme", "ujete", "ují"].map((ending) => `${stem}${ending}${reflexivePart}`);
    }

    if (infinitive.endsWith("at") && safeAtVerbs.has(infinitive)) {
      const stem = infinitive.slice(0, -2);
      return ["ám", "áš", "á", "áme", "áte", "ají"].map((ending) => `${stem}${ending}${reflexivePart}`);
    }

    if (infinitive.endsWith("it") || infinitive.endsWith("ět") || infinitive.endsWith("et")) {
      const stem = infinitive.slice(0, -2);
      return ["ím", "íš", "í", "íme", "íte", "í"].map((ending) => `${stem}${ending}${reflexivePart}`);
    }

    if (infinitive.endsWith("nout")) {
      const stem = infinitive.slice(0, -4);
      return ["nu", "neš", "ne", "neme", "nete", "nou"].map((ending) => `${stem}${ending}${reflexivePart}`);
    }

    return [];
  }

  function negativeForm(form) {
    if (form.startsWith("ne")) return "";
    const reflexive = /\s+(se|si)$/.exec(form);
    if (!reflexive) return `ne${form}`;
    return `ne${form.replace(/\s+(se|si)$/, "")} ${reflexive[1]}`;
  }

  function makeImperatives(verb) {
    const reflexive = /\s+(se|si)$/.exec(verb);
    const reflexivePart = reflexive ? ` ${reflexive[1]}` : "";
    const infinitive = reflexive ? verb.replace(/\s+(se|si)$/, "") : verb;
    let singular = "";
    let plural = "";

    if (imperativeOverrides[infinitive]) {
      return imperativeOverrides[infinitive].map((form) => `${form}${reflexivePart}`);
    }

    if (infinitive.endsWith("ovat")) {
      const stem = infinitive.slice(0, -4);
      singular = `${stem}uj`;
      plural = `${stem}ujte`;
    } else if (infinitive.endsWith("at") && safeAtVerbs.has(infinitive)) {
      const stem = infinitive.slice(0, -2);
      singular = `${stem}ej`;
      plural = `${stem}ejte`;
    } else if (infinitive.endsWith("it") || infinitive.endsWith("ět") || infinitive.endsWith("et")) {
      const stem = infinitive.slice(0, -2);
      singular = stem;
      plural = `${stem}te`;
    } else if (infinitive.endsWith("nout")) {
      const stem = infinitive.slice(0, -4);
      singular = `${stem}ni`;
      plural = `${stem}něte`;
    }

    return [singular && `${singular}${reflexivePart}`, plural && `${plural}${reflexivePart}`].filter(Boolean);
  }

  function pushCard(source, form, person, isNegative) {
    const key = form.toLocaleLowerCase("cs-CZ");
    if (!form || seen.has(key)) return;
    seen.add(key);

    const verbMeaning = cleanVerb(source.en);
    const sentence = `${person.cs} ${isNegative ? form : form}.`;
    const sentenceEn = `${person.en} ${isNegative ? "do not " : ""}${verbMeaning}.`;
    deck.push({
      id: `verb-form-${source.id || source.cz}-${person.code}-${isNegative ? "neg" : "pos"}-${key.replace(/\s+/g, "-")}`,
      cz: form,
      en: `${person.en} ${isNegative ? "do not " : ""}${verbMeaning}`,
      hi: `क्रिया रूप: ${person.en} ${isNegative ? "do not " : ""}${verbMeaning}`,
      ur: `فعل کی شکل: ${person.en} ${isNegative ? "do not " : ""}${verbMeaning}`,
      sentence,
      sentenceEn,
      tags: ["verbs", "forms"]
    });
  }

  function pushImperativeCard(source, form, isPlural, isNegative) {
    const key = form.toLocaleLowerCase("cs-CZ");
    if (!form || seen.has(key)) return;
    seen.add(key);

    const verbMeaning = cleanVerb(source.en);
    deck.push({
      id: `verb-form-${source.id || source.cz}-imp-${isPlural ? "pl" : "sg"}-${isNegative ? "neg" : "pos"}-${key.replace(/\s+/g, "-")}`,
      cz: form,
      en: `${isNegative ? "do not " : ""}${verbMeaning}${isPlural ? " (plural/formal command)" : " (command)"}`,
      hi: `आदेश रूप: ${isNegative ? "do not " : ""}${verbMeaning}`,
      ur: `حکم کی شکل: ${isNegative ? "do not " : ""}${verbMeaning}`,
      sentence: `${isNegative ? "Prosím, " : ""}${form}!`,
      sentenceEn: `${isNegative ? "Please do not " : "Please "}${verbMeaning}.`,
      tags: ["verbs", "forms"]
    });
  }

  const verbCards = deck.filter((card) => (card.tags || []).includes("verbs") && /^to\s+/i.test(card.en || ""));
  for (const card of verbCards) {
    const forms = makeForms(card.cz);
    forms.forEach((form, index) => {
      const person = persons[index];
      pushCard(card, form, person, false);
      pushCard(card, negativeForm(form), person, true);
    });

    makeImperatives(card.cz).forEach((form, index) => {
      pushImperativeCard(card, form, index === 1, false);
      pushImperativeCard(card, negativeForm(form), index === 1, true);
    });
  }
})();
