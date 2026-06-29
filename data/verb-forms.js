(function addVerbForms() {
  const deck = window.CZECH_B1_VOCAB || [];
  const seen = new Set(deck.map((card) => String(card.cz || "").trim().toLocaleLowerCase("cs-CZ")));
  const persons = [
    { code: "ja", cs: "Já", en: "I", hi: "मैं", ur: "میں" },
    { code: "ty", cs: "Ty", en: "you", hi: "तुम", ur: "تم" },
    { code: "on", cs: "On/ona", en: "he/she", hi: "वह", ur: "وہ" },
    { code: "my", cs: "My", en: "we", hi: "हम", ur: "ہم" },
    { code: "vy", cs: "Vy", en: "you", hi: "आप", ur: "آپ" },
    { code: "oni", cs: "Oni", en: "they", hi: "वे", ur: "وہ" }
  ];

  function cleanVerb(value) {
    return String(value || "")
      .replace(/^to\s+/i, "")
      .replace(/[,;].*$/, "")
      .trim();
  }

  // Source cards predate dedicated Urdu fields. This keeps generated form
  // meanings in Urdu script until each base verb gains a curated translation.
  function toUrdu(value) {
    return String(value || "")
      .replace(/क्ष/g, "کش")
      .replace(/ज्ञ/g, "گیہ")
      .replace(/त्र/g, "تر")
      .replace(/श्र/g, "شر")
      .replace(/[ाआ]/g, "ا")
      .replace(/[िीई]/g, "ی")
      .replace(/[इ]/g, "ی")
      .replace(/[ुूऊ]/g, "و")
      .replace(/[उ]/g, "و")
      .replace(/[ेैए]/g, "ے")
      .replace(/[ोौओऔ]/g, "و")
      .replace(/ऑ/g, "آ")
      .replace(/अ/g, "ا")
      .replace(/क/g, "ک")
      .replace(/ख/g, "کھ")
      .replace(/ग/g, "گ")
      .replace(/घ/g, "گھ")
      .replace(/च/g, "چ")
      .replace(/छ/g, "چھ")
      .replace(/ज/g, "ج")
      .replace(/झ/g, "جھ")
      .replace(/ट/g, "ٹ")
      .replace(/ठ/g, "ٹھ")
      .replace(/ड़/g, "ڑ")
      .replace(/ढ़/g, "ڑھ")
      .replace(/ड/g, "ڈ")
      .replace(/ढ/g, "ڈھ")
      .replace(/त/g, "ت")
      .replace(/थ/g, "تھ")
      .replace(/द/g, "د")
      .replace(/ध/g, "دھ")
      .replace(/न/g, "ن")
      .replace(/ण/g, "ن")
      .replace(/प/g, "پ")
      .replace(/फ/g, "ف")
      .replace(/ब/g, "ب")
      .replace(/भ/g, "بھ")
      .replace(/म/g, "م")
      .replace(/य/g, "ی")
      .replace(/र/g, "ر")
      .replace(/ल/g, "ل")
      .replace(/व/g, "و")
      .replace(/श/g, "ش")
      .replace(/ष/g, "ش")
      .replace(/स/g, "س")
      .replace(/ह/g, "ہ")
      .replace(/ं|ँ/g, "ں")
      .replace(/ः|्|़|ॉ/gi, "")
      .replace(/[।]/g, ".");
  }

  const presentOverrides = {
    "jet": ["jedu", "jedeš", "jede", "jedeme", "jedete", "jedou"],
    "přijet": ["přijedu", "přijedeš", "přijede", "přijedeme", "přijedete", "přijedou"],
    "odjet": ["odjedu", "odjedeš", "odjede", "odjedeme", "odjedete", "odjedou"],
    "vědět": ["vím", "víš", "ví", "víme", "víte", "vědí"],
    "chtít": ["chci", "chceš", "chce", "chceme", "chcete", "chtějí"],
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

  const excludedPersonalVerbs = new Set([
    "podařit se",
    "trvat",
    "pršet",
    "sněžit",
    "foukat",
    "mrznout"
  ]);

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
    if (excludedPersonalVerbs.has(verb)) return [];
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

  function englishForm(verbMeaning, person, isNegative) {
    const subject = person.en.charAt(0).toUpperCase() + person.en.slice(1);
    const [verb, ...restParts] = verbMeaning.split(" ");
    const rest = restParts.length ? ` ${restParts.join(" ")}` : "";

    if (verb === "be") {
      const conjugated = person.code === "ja" ? "am" : person.code === "on" ? "is" : "are";
      return `${subject} ${conjugated}${isNegative ? " not" : ""}${rest}`;
    }

    if (isNegative) {
      return `${subject} ${person.code === "on" ? "does not" : "do not"} ${verbMeaning}`;
    }

    if (person.code !== "on") return `${subject} ${verbMeaning}`;
    if (verb === "have") return `${subject} has${rest}`;

    let conjugated = verb;
    if (/[^aeiou]y$/i.test(verb)) conjugated = `${verb.slice(0, -1)}ies`;
    else if (/(?:s|x|z|ch|sh|o)$/i.test(verb)) conjugated = `${verb}es`;
    else conjugated = `${verb}s`;
    return `${subject} ${conjugated}${rest}`;
  }

  function makeImperatives(verb) {
    const reflexive = /\s+(se|si)$/.exec(verb);
    const reflexivePart = reflexive ? ` ${reflexive[1]}` : "";
    const infinitive = reflexive ? verb.replace(/\s+(se|si)$/, "") : verb;

    if (imperativeOverrides[infinitive]) {
      return imperativeOverrides[infinitive].map((form) => `${form}${reflexivePart}`);
    }
    return [];
  }

  function pushCard(source, form, person, isNegative) {
    const key = form.toLocaleLowerCase("cs-CZ");
    if (!form || seen.has(key)) return;
    seen.add(key);

    const verbMeaning = cleanVerb(source.en);
    const hindiMeaning = String(source.hi || "").trim();
    const urduMeaning = String(source.ur || source.urdu || toUrdu(hindiMeaning)).trim();
    const sentence = `${person.cs} ${isNegative ? form : form}.`;
    const sentenceEn = `${englishForm(verbMeaning, person, isNegative)}.`;
    deck.push({
      id: `verb-form-${source.id || source.cz}-${person.code}-${isNegative ? "neg" : "pos"}-${key.replace(/\s+/g, "-")}`,
      cz: form,
      en: englishForm(verbMeaning, person, isNegative),
      hi: `क्रिया रूप: ${person.hi} ${isNegative ? "नहीं " : ""}${hindiMeaning}`,
      ur: `فعل کی شکل: ${person.ur} ${isNegative ? "نہیں " : ""}${urduMeaning}`,
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
    const hindiMeaning = String(source.hi || "").trim();
    const urduMeaning = String(source.ur || source.urdu || toUrdu(hindiMeaning)).trim();
    deck.push({
      id: `verb-form-${source.id || source.cz}-imp-${isPlural ? "pl" : "sg"}-${isNegative ? "neg" : "pos"}-${key.replace(/\s+/g, "-")}`,
      cz: form,
      en: `${isNegative ? "do not " : ""}${verbMeaning}${isPlural ? " (plural/formal command)" : " (command)"}`,
      hi: `आदेश रूप: ${isNegative ? "मत " : ""}${hindiMeaning}`,
      ur: `حکم کی شکل: ${isNegative ? "نہ " : ""}${urduMeaning}`,
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
