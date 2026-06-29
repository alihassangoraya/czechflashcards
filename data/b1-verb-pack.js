(function addB1VerbPack() {
  const deck = window.CZECH_B1_VOCAB || [];
  const seen = new Set(deck.map((card) => String(card.cz || "").trim().toLocaleLowerCase("cs-CZ")));
  const sharedTags = ["verbs", "b1-focus"];

  function add(card) {
    const key = String(card.cz || "").trim().toLocaleLowerCase("cs-CZ");
    if (!key || seen.has(key)) return;
    seen.add(key);
    deck.push({
      ...card,
      level: "b1",
      source: "curated-b1-verbs",
      pronunciation: card.cz,
      tags: sharedTags.concat(card.tags || []),
      grammar: Object.assign({ partOfSpeech: "verb" }, card.grammar || {})
    });
  }

  [
    {
      id: "b1-verb-zucastnit-se",
      cz: "zúčastnit se",
      en: "to participate",
      hi: "भाग लेना",
      ur: "حصہ لینا",
      sentence: "Chci se zúčastnit jazykového kurzu.",
      sentenceEn: "I want to participate in a language course.",
      tags: ["work", "daily"],
      grammar: { reflexive: true, aspect: "perfective", note: "Uses se with the person doing the action." }
    },
    {
      id: "b1-verb-predstavit-si",
      cz: "představit si",
      en: "to imagine",
      hi: "कल्पना करना",
      ur: "تصور کرنا",
      sentence: "Umím si představit život v menším městě.",
      sentenceEn: "I can imagine life in a smaller town.",
      tags: ["daily"],
      grammar: { reflexive: true, aspect: "perfective", note: "Uses si when imagining something for oneself." }
    },
    {
      id: "b1-verb-vsimnout-si",
      cz: "všimnout si",
      en: "to notice",
      hi: "ध्यान देना",
      ur: "نوٹس کرنا",
      sentence: "Všiml jsem si nové cedule u vchodu.",
      sentenceEn: "I noticed a new sign by the entrance.",
      tags: ["daily"],
      grammar: { reflexive: true, aspect: "perfective", note: "Often followed by genitive: všimnout si něčeho." }
    },
    {
      id: "b1-verb-podporit",
      cz: "podpořit",
      en: "to support",
      hi: "समर्थन करना",
      ur: "حمایت کرنا",
      sentence: "Rodina mě podpořila při studiu.",
      sentenceEn: "My family supported me during my studies.",
      tags: ["daily", "work"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-vyresit",
      cz: "vyřešit",
      en: "to solve",
      hi: "हल करना",
      ur: "حل کرنا",
      sentence: "Potřebujeme vyřešit tento problém dnes.",
      sentenceEn: "We need to solve this problem today.",
      tags: ["work"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-dokoncit",
      cz: "dokončit",
      en: "to complete",
      hi: "पूरा करना",
      ur: "مکمل کرنا",
      sentence: "Musím dokončit domácí úkol.",
      sentenceEn: "I have to complete the homework.",
      tags: ["work", "daily"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-pokracovat",
      cz: "pokračovat",
      en: "to continue",
      hi: "जारी रखना",
      ur: "جاری رکھنا",
      sentence: "Po pauze budeme pokračovat v lekci.",
      sentenceEn: "After the break we will continue the lesson.",
      tags: ["work", "daily"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-potvrdit",
      cz: "potvrdit",
      en: "to confirm",
      hi: "पुष्टि करना",
      ur: "تصدیق کرنا",
      sentence: "Můžete potvrdit rezervaci e-mailem?",
      sentenceEn: "Can you confirm the reservation by email?",
      tags: ["work", "travel"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-overit",
      cz: "ověřit",
      en: "to verify",
      hi: "सत्यापित करना",
      ur: "تصدیق کرنا",
      sentence: "Musím ověřit správnou adresu.",
      sentenceEn: "I have to verify the correct address.",
      tags: ["work"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-nahradit",
      cz: "nahradit",
      en: "to replace",
      hi: "बदलना",
      ur: "بدل دینا",
      sentence: "Starou kartu musím nahradit novou.",
      sentenceEn: "I have to replace the old card with a new one.",
      tags: ["work", "daily"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-zaridit",
      cz: "zařídit",
      en: "to arrange",
      hi: "व्यवस्था करना",
      ur: "انتظام کرنا",
      sentence: "Zařídím schůzku na příští týden.",
      sentenceEn: "I will arrange a meeting for next week.",
      tags: ["work", "daily"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-dorucit",
      cz: "doručit",
      en: "to deliver",
      hi: "पहुँचाना",
      ur: "پہنچانا",
      sentence: "Balík doručí zítra dopoledne.",
      sentenceEn: "They will deliver the package tomorrow morning.",
      tags: ["daily", "work"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-prekvapit",
      cz: "překvapit",
      en: "to surprise",
      hi: "हैरान करना",
      ur: "حیران کرنا",
      sentence: "Výsledek mě příjemně překvapil.",
      sentenceEn: "The result pleasantly surprised me.",
      tags: ["daily"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-zalezet",
      cz: "záležet",
      en: "to matter",
      hi: "मायने रखना",
      ur: "اہم ہونا",
      sentence: "Záleží mi na dobré výslovnosti.",
      sentenceEn: "Good pronunciation matters to me.",
      tags: ["daily"],
      grammar: { aspect: "imperfective", note: "Common phrase: záleží mi na tom." }
    },
    {
      id: "b1-verb-patrit",
      cz: "patřit",
      en: "to belong",
      hi: "संबंधित होना",
      ur: "تعلق رکھنا",
      sentence: "Tento sešit patří mojí dceři.",
      sentenceEn: "This notebook belongs to my daughter.",
      tags: ["daily"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-obsahovat",
      cz: "obsahovat",
      en: "to contain",
      hi: "शामिल होना",
      ur: "شامل ہونا",
      sentence: "Smlouva obsahuje důležité informace.",
      sentenceEn: "The contract contains important information.",
      tags: ["work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-pozadovat",
      cz: "požadovat",
      en: "to require",
      hi: "आवश्यक होना",
      ur: "ضرورت ہونا",
      sentence: "Kurz požaduje pravidelnou docházku.",
      sentenceEn: "The course requires regular attendance.",
      tags: ["work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-nabizet",
      cz: "nabízet",
      en: "to offer",
      hi: "पेशकश करना",
      ur: "پیشکش کرنا",
      sentence: "Škola nabízí večerní kurzy češtiny.",
      sentenceEn: "The school offers evening Czech courses.",
      tags: ["work", "daily"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-planovat",
      cz: "plánovat",
      en: "to plan",
      hi: "योजना बनाना",
      ur: "منصوبہ بنانا",
      sentence: "Plánujeme výlet do Brna.",
      sentenceEn: "We are planning a trip to Brno.",
      tags: ["daily", "travel"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-organizovat",
      cz: "organizovat",
      en: "to organize",
      hi: "आयोजन करना",
      ur: "منظم کرنا",
      sentence: "Kolega organizuje týmovou schůzku.",
      sentenceEn: "A colleague is organizing a team meeting.",
      tags: ["work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-informovat",
      cz: "informovat",
      en: "to inform",
      hi: "सूचित करना",
      ur: "اطلاع دینا",
      sentence: "Prosím informujte mě o změně termínu.",
      sentenceEn: "Please inform me about the change of date.",
      tags: ["work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-parkovat",
      cz: "parkovat",
      en: "to park",
      hi: "पार्क करना",
      ur: "پارک کرنا",
      sentence: "Tady nesmíte parkovat.",
      sentenceEn: "You must not park here.",
      tags: ["travel", "daily"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-fungovat",
      cz: "fungovat",
      en: "to work",
      hi: "काम करना",
      ur: "کام کرنا",
      sentence: "Internet dnes nefunguje dobře.",
      sentenceEn: "The internet is not working well today.",
      tags: ["daily", "work"],
      grammar: { aspect: "imperfective", note: "Means function/work, not work at a job." }
    },
    {
      id: "b1-verb-financovat",
      cz: "financovat",
      en: "to finance",
      hi: "वित्त देना",
      ur: "مالی مدد دینا",
      sentence: "Projekt financuje město.",
      sentenceEn: "The city finances the project.",
      tags: ["work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-dorucovat",
      cz: "doručovat",
      en: "to deliver regularly",
      hi: "नियमित रूप से पहुँचाना",
      ur: "باقاعدگی سے پہنچانا",
      sentence: "Pošta doručuje balíky každý pracovní den.",
      sentenceEn: "The post delivers packages every working day.",
      tags: ["work", "daily"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-vlastnit",
      cz: "vlastnit",
      en: "to own",
      hi: "मालिक होना",
      ur: "مالک ہونا",
      sentence: "Firma vlastní několik aut.",
      sentenceEn: "The company owns several cars.",
      tags: ["work", "daily"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-pripojit-se",
      cz: "připojit se",
      en: "to connect",
      hi: "जुड़ना",
      ur: "جڑنا",
      sentence: "Nemůžu se připojit k Wi-Fi.",
      sentenceEn: "I cannot connect to the Wi-Fi.",
      tags: ["work", "daily"],
      grammar: { reflexive: true, aspect: "perfective" }
    },
    {
      id: "b1-verb-odpojit-se",
      cz: "odpojit se",
      en: "to disconnect",
      hi: "अलग होना",
      ur: "منقطع ہونا",
      sentence: "Po hovoru se odpojím.",
      sentenceEn: "After the call I will disconnect.",
      tags: ["work", "daily"],
      grammar: { reflexive: true, aspect: "perfective" }
    },
    {
      id: "b1-verb-sdelit",
      cz: "sdělit",
      en: "to tell",
      hi: "बताना",
      ur: "بتانا",
      sentence: "Můžete mi sdělit číslo objednávky?",
      sentenceEn: "Can you tell me the order number?",
      tags: ["work"],
      grammar: { aspect: "perfective", note: "More formal than říct." }
    },
    {
      id: "b1-verb-varovat",
      cz: "varovat",
      en: "to warn",
      hi: "चेतावनी देना",
      ur: "خبردار کرنا",
      sentence: "Lékař mě varoval před stresem.",
      sentenceEn: "The doctor warned me about stress.",
      tags: ["health", "daily"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-chranit",
      cz: "chránit",
      en: "to protect",
      hi: "सुरक्षा करना",
      ur: "حفاظت کرنا",
      sentence: "Heslo chrání váš účet.",
      sentenceEn: "The password protects your account.",
      tags: ["work", "daily"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-porusit",
      cz: "porušit",
      en: "to break a rule",
      hi: "नियम तोड़ना",
      ur: "قاعدہ توڑنا",
      sentence: "Řidič porušil dopravní pravidlo.",
      sentenceEn: "The driver broke a traffic rule.",
      tags: ["travel", "work"],
      grammar: { aspect: "perfective", note: "Usually used for rules, contracts, or promises." }
    },
    {
      id: "b1-verb-vyhnout-se",
      cz: "vyhnout se",
      en: "to avoid",
      hi: "बचना",
      ur: "بچنا",
      sentence: "Chci se vyhnout dopravní špičce.",
      sentenceEn: "I want to avoid rush hour.",
      tags: ["daily", "travel"],
      grammar: { reflexive: true, aspect: "perfective" }
    },
    {
      id: "b1-verb-dosahnout",
      cz: "dosáhnout",
      en: "to achieve",
      hi: "हासिल करना",
      ur: "حاصل کرنا",
      sentence: "Chci dosáhnout úrovně B1.",
      sentenceEn: "I want to achieve level B1.",
      tags: ["work", "daily"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-vzniknout",
      cz: "vzniknout",
      en: "to arise",
      hi: "उत्पन्न होना",
      ur: "پیدا ہونا",
      sentence: "Vznikl nový problém s platbou.",
      sentenceEn: "A new problem with the payment arose.",
      tags: ["work"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-zmizet",
      cz: "zmizet",
      en: "to disappear",
      hi: "गायब होना",
      ur: "غائب ہونا",
      sentence: "Dokument najednou zmizel z obrazovky.",
      sentenceEn: "The document suddenly disappeared from the screen.",
      tags: ["daily", "work"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-zaviset",
      cz: "záviset",
      en: "to depend",
      hi: "निर्भर होना",
      ur: "منحصر ہونا",
      sentence: "Výsledek závisí na pravidelném tréninku.",
      sentenceEn: "The result depends on regular practice.",
      tags: ["work", "daily"],
      grammar: { aspect: "imperfective", note: "Often used with na: záviset na něčem." }
    },
    {
      id: "b1-verb-ztratit",
      cz: "ztratit",
      en: "to lose",
      hi: "खो देना",
      ur: "کھو دینا",
      sentence: "Ztratil jsem peněženku v tramvaji.",
      sentenceEn: "I lost my wallet on the tram.",
      tags: ["daily", "travel"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-vyuzit",
      cz: "využít",
      en: "to use",
      hi: "उपयोग करना",
      ur: "استعمال کرنا",
      sentence: "Můžeme využít volný čas k opakování.",
      sentenceEn: "We can use the free time for revision.",
      tags: ["work", "daily"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-tvrdit",
      cz: "tvrdit",
      en: "to claim",
      hi: "दावा करना",
      ur: "دعویٰ کرنا",
      sentence: "Tvrdí, že poslal formulář včas.",
      sentenceEn: "He claims that he sent the form on time.",
      tags: ["work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-zkouset",
      cz: "zkoušet",
      en: "to try",
      hi: "कोशिश करना",
      ur: "کوشش کرنا",
      sentence: "Zkouším mluvit česky každý den.",
      sentenceEn: "I try to speak Czech every day.",
      tags: ["daily", "work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-resit",
      cz: "řešit",
      en: "to deal with",
      hi: "निपटना",
      ur: "نمٹنا",
      sentence: "Teď řešíme otázku bydlení.",
      sentenceEn: "We are dealing with the housing issue now.",
      tags: ["daily", "work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-tisknout",
      cz: "tisknout",
      en: "to print",
      hi: "प्रिंट करना",
      ur: "پرنٹ کرنا",
      sentence: "Potřebuji tisknout formulář.",
      sentenceEn: "I need to print the form.",
      tags: ["work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-riskovat",
      cz: "riskovat",
      en: "to risk",
      hi: "जोखिम लेना",
      ur: "خطرہ مول لینا",
      sentence: "Nechci riskovat pozdní příchod.",
      sentenceEn: "I do not want to risk arriving late.",
      tags: ["daily", "work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-vymenit",
      cz: "vyměnit",
      en: "to exchange",
      hi: "बदलना",
      ur: "تبدیل کرنا",
      sentence: "Potřebuji vyměnit jízdenku.",
      sentenceEn: "I need to exchange the ticket.",
      tags: ["travel", "daily"],
      grammar: { aspect: "perfective" }
    },
    {
      id: "b1-verb-ziskavat",
      cz: "získávat",
      en: "to gain",
      hi: "प्राप्त करना",
      ur: "حاصل کرنا",
      sentence: "Pravidelným čtením získávám novou slovní zásobu.",
      sentenceEn: "By reading regularly I gain new vocabulary.",
      tags: ["daily", "work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-vyzadovat",
      cz: "vyžadovat",
      en: "to require",
      hi: "मांग करना",
      ur: "تقاضا کرنا",
      sentence: "Tato práce vyžaduje dobrou komunikaci.",
      sentenceEn: "This job requires good communication.",
      tags: ["work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-rozvijet",
      cz: "rozvíjet",
      en: "to develop",
      hi: "विकसित करना",
      ur: "ترقی دینا",
      sentence: "Chci rozvíjet svoje jazykové dovednosti.",
      sentenceEn: "I want to develop my language skills.",
      tags: ["work", "daily"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-spolupracovat",
      cz: "spolupracovat",
      en: "to cooperate",
      hi: "सहयोग करना",
      ur: "تعاون کرنا",
      sentence: "Na projektu spolupracujeme s novým týmem.",
      sentenceEn: "We cooperate with a new team on the project.",
      tags: ["work"],
      grammar: { aspect: "imperfective" }
    },
    {
      id: "b1-verb-prestehovat-se",
      cz: "přestěhovat se",
      en: "to move house",
      hi: "घर बदलना",
      ur: "گھر منتقل ہونا",
      sentence: "Příští měsíc se chceme přestěhovat.",
      sentenceEn: "Next month we want to move house.",
      tags: ["daily"],
      grammar: { reflexive: true, aspect: "perfective" }
    }
  ].forEach(add);

  window.CZECH_B1_VOCAB = deck;
})();
