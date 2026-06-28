(function () {
  const STORAGE_KEY = "czech-b1-flashcards-progress-v1";
  const EXTRA_KEY = "czech-b1-flashcards-imports-v1";
  const CUSTOM_KEY = "czech-b1-flashcards-custom-v1";
  const EDITED_KEY = "czech-b1-flashcards-edits-v1";
  const LANGUAGE_KEY = "czech-b1-flashcards-meaning-language-v1";
  const LEVEL_KEY = "czech-b1-flashcards-exam-level-v1";
  const DAILY_KEY = "czech-b1-flashcards-daily-v1";
  const GOAL_KEY = "czech-b1-flashcards-daily-goal-v1";
  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const AGAIN_INTERVALS = [2 * MINUTE, 10 * MINUTE, 30 * MINUTE, 2 * HOUR];
  const HARD_INTERVALS = [30 * MINUTE, 2 * HOUR, 8 * HOUR, DAY, 2 * DAY, 4 * DAY];
  const KNOWN_INTERVALS = [8 * HOUR, DAY, 3 * DAY, 7 * DAY, 16 * DAY, 35 * DAY, 75 * DAY];
  const EASY_INTERVALS = [DAY, 4 * DAY, 10 * DAY, 24 * DAY, 55 * DAY, 120 * DAY];
  const RELEARNING_MIN_CARDS = 10;
  const RELEARNING_MAX_CARDS = 15;

  const el = {
    card: document.getElementById("card"),
    word: document.getElementById("word"),
    english: document.getElementById("english"),
    indicLabel: document.getElementById("indicLabel"),
    indicMeaning: document.getElementById("indicMeaning"),
    sentence: document.getElementById("sentence"),
    sentenceEn: document.getElementById("sentenceEn"),
    answer: document.getElementById("answer"),
    tapHint: document.getElementById("tapHint"),
    dueCount: document.getElementById("dueCount"),
    knownCount: document.getElementById("knownCount"),
    learningCount: document.getElementById("learningCount"),
    deckSize: document.getElementById("deckSize"),
    speakWordButton: document.getElementById("speakWordButton"),
    speakSentenceButton: document.getElementById("speakSentenceButton"),
    shuffleButton: document.getElementById("shuffleButton"),
    resetDueButton: document.getElementById("resetDueButton"),
    exportButton: document.getElementById("exportButton"),
    exportDeckButton: document.getElementById("exportDeckButton"),
    importInput: document.getElementById("importInput"),
    restoreInput: document.getElementById("restoreInput"),
    examLevel: document.getElementById("examLevel"),
    deckFilter: document.getElementById("deckFilter"),
    meaningLanguage: document.getElementById("meaningLanguage"),
    undoButton: document.getElementById("undoButton"),
    searchTrigger: document.getElementById("searchTrigger"),
    searchDialog: document.getElementById("searchDialog"),
    closeSearchDialog: document.getElementById("closeSearchDialog"),
    settingsTrigger: document.getElementById("settingsTrigger"),
    settingsDialog: document.getElementById("settingsDialog"),
    closeSettingsDialog: document.getElementById("closeSettingsDialog"),
    addWordTrigger: document.getElementById("addWordTrigger"),
    addWordDialog: document.getElementById("addWordDialog"),
    closeAddWordDialog: document.getElementById("closeAddWordDialog"),
    editCardTrigger: document.getElementById("editCardTrigger"),
    editCardDialog: document.getElementById("editCardDialog"),
    closeEditCardDialog: document.getElementById("closeEditCardDialog"),
    editCardForm: document.getElementById("editCardForm"),
    editCz: document.getElementById("editCz"),
    editEn: document.getElementById("editEn"),
    editHi: document.getElementById("editHi"),
    editUr: document.getElementById("editUr"),
    editSentence: document.getElementById("editSentence"),
    editSentenceEn: document.getElementById("editSentenceEn"),
    addWordForm: document.getElementById("addWordForm"),
    customCz: document.getElementById("customCz"),
    customEn: document.getElementById("customEn"),
    customHi: document.getElementById("customHi"),
    customUr: document.getElementById("customUr"),
    customSentence: document.getElementById("customSentence"),
    customSentenceEn: document.getElementById("customSentenceEn"),
    customTag: document.getElementById("customTag"),
    customCount: document.getElementById("customCount"),
    customList: document.getElementById("customList"),
    dailyGoalInput: document.getElementById("dailyGoalInput"),
    dailyProgress: document.getElementById("dailyProgress"),
    searchInput: document.getElementById("searchInput"),
    searchResults: document.getElementById("searchResults"),
    searchCount: document.getElementById("searchCount")
  };

  let progress = readJson(STORAGE_KEY, {});
  let importedCards = readJson(EXTRA_KEY, []);
  let customCards = readJson(CUSTOM_KEY, []);
  let editedCards = readJson(EDITED_KEY, {});
  let meaningLanguage = localStorage.getItem(LANGUAGE_KEY) || "ur";
  let examLevel = localStorage.getItem(LEVEL_KEY) || "b1";
  let dailyLog = readJson(DAILY_KEY, todayLog());
  let dailyGoal = Number(localStorage.getItem(GOAL_KEY)) || 30;
  let deck = buildDeck();
  let current = null;
  let revealed = false;
  let drag = null;
  let shuffledQueue = [];
  let relearningQueue = [];
  let forcedCardId = null;
  let lastReview = null;
  let renderTimer = null;
  let reviewLocked = false;

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function saveCustomCards() {
    localStorage.setItem(CUSTOM_KEY, JSON.stringify(customCards));
  }

  function saveEditedCards() {
    localStorage.setItem(EDITED_KEY, JSON.stringify(editedCards));
  }

  function todayKey() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function todayLog() {
    return { date: todayKey(), reviewed: 0, newCards: 0 };
  }

  function currentDailyLog() {
    if (!dailyLog || dailyLog.date !== todayKey()) {
      dailyLog = todayLog();
      localStorage.setItem(DAILY_KEY, JSON.stringify(dailyLog));
    }
    return dailyLog;
  }

  function saveDailyLog() {
    localStorage.setItem(DAILY_KEY, JSON.stringify(dailyLog));
  }

  function buildDeck() {
    return normalizeDeck([...(window.CZECH_B1_VOCAB || []), ...importedCards, ...customCards]).map((card) => ({
      ...card,
      ...(editedCards[card.id] || {})
    }));
  }

  function setStatus(message) {
    void message;
  }

  function normalizeDeck(cards) {
    const seen = new Set();
    return cards
      .filter((card) => card && card.cz && card.en)
      .map((card, index) => ({
        id: card.id || slug(card.cz) + "-" + index,
        cz: card.cz.trim(),
        en: card.en.trim(),
        hi: (card.hi || "Hindi meaning pending").trim(),
        ur: (card.ur || card.urdu || toUrdu(card.hi || "") || "اردو معنی باقی ہے").trim(),
        sentence: (card.sentence || `Používám slovo "${card.cz}" ve větě.`).trim(),
        sentenceEn: (card.sentenceEn || card.exampleEn || inferSentenceEn(card)).trim(),
        level: card.level || inferLevel(card),
        tags: normalizeTags(card.tags)
      }))
      .filter((card) => {
        if (seen.has(card.id)) return false;
        seen.add(card.id);
        return true;
      });
  }

  function normalizeTags(tags) {
    const values = Array.isArray(tags) ? tags : String(tags || "daily").split(/[,\s]+/);
    return Array.from(new Set(values.map((tag) => tag.trim()).filter(Boolean)));
  }

  function inferLevel(card) {
    const tags = normalizeTags(card.tags);
    if (tags.includes("extended") || tags.includes("forms")) return "b1";
    if (tags.includes("numbers")) {
      const value = Number(String(card.id || "").replace("number-", ""));
      return Number.isFinite(value) && value <= 100 ? "a2" : "b1";
    }
    return "a2";
  }

  function inferSentenceEn(card) {
    const sentence = String(card.sentence || "").trim();
    if (card.id && String(card.id).startsWith("number-")) {
      const number = String(card.id).replace("number-", "");
      return `The number ${number} is ${card.cz}.`;
    }

    const map = {
      "Ahoj, jak se dnes máš?": "Hi, how are you today?",
      "Děkuji za pomoc.": "Thank you for the help.",
      "Prosím, mluvte pomalu.": "Please speak slowly.",
      "Promiňte, kde je nádraží?": "Excuse me, where is the train station?",
      "Ano, rozumím.": "Yes, I understand.",
      "Ne, dnes nemám čas.": "No, I do not have time today.",
      "Možná přijdu později.": "Maybe I will come later.",
      "Dnes se učím česky.": "Today I am learning Czech.",
      "Zítra mám zkoušku.": "Tomorrow I have an exam.",
      "Včera jsem byl doma.": "Yesterday I was at home.",
      "Ráno piju kávu.": "In the morning I drink coffee.",
      "Večer čtu knihu.": "In the evening I read a book.",
      "V noci spím.": "At night I sleep.",
      "Tento týden mám hodně práce.": "This week I have a lot of work.",
      "Příští měsíc pojedu do Brna.": "Next month I will go to Brno.",
      "Minulý rok jsem začal studovat češtinu.": "Last year I started studying Czech.",
      "Nemám moc času.": "I do not have much time.",
      "Hodina češtiny začíná v šest.": "The Czech lesson starts at six.",
      "Počkejte jednu minutu.": "Wait one minute.",
      "Tohle místo je klidné.": "This place is calm.",
      "Praha je krásné město.": "Prague is a beautiful city.",
      "Moje babička žije ve vesnici.": "My grandmother lives in a village.",
      "Bydlím v malé ulici.": "I live on a small street.",
      "Sejdeme se na náměstí.": "We will meet at the square.",
      "Nádraží je blízko centra.": "The train station is near the center.",
      "Autobusová zastávka je za rohem.": "The bus stop is around the corner.",
      "Koupil jsem levnou letenku.": "I bought a cheap flight ticket.",
      "Potřebuji jízdenku do Plzně.": "I need a ticket to Plzen.",
      "Vlak odjíždí v osm hodin.": "The train leaves at eight o'clock.",
      "Autobus přijel pozdě.": "The bus arrived late.",
      "Do práce jezdím tramvají.": "I go to work by tram.",
      "Metro je rychlé.": "The metro is fast.",
      "Nemám vlastní auto.": "I do not have my own car.",
      "V létě jezdím na kole.": "In summer I ride a bicycle.",
      "Cesta do školy trvá půl hodiny.": "The trip to school takes half an hour.",
      "Na dovolenou pojedeme k moři.": "We will go to the sea for vacation.",
      "Hotel je levný a čistý.": "The hotel is cheap and clean.",
      "Máme pokoj ve třetím patře.": "We have a room on the third floor.",
      "Zapomněl jsem klíč doma.": "I forgot the key at home.",
      "Podívám se do mapy.": "I will look at the map.",
      "Jdete špatným směrem.": "You are going in the wrong direction.",
      "Obchod je vlevo.": "The shop is on the left.",
      "Knihovna je vpravo.": "The library is on the right.",
      "Jděte rovně a potom doprava.": "Go straight and then to the right.",
      "Bydlím blízko parku.": "I live near the park.",
      "Letiště je daleko.": "The airport is far away.",
      "Mám bolest hlavy.": "I have a headache.",
      "Mám hlad.": "I am hungry.",
      "Mám žízeň, dám si vodu.": "I am thirsty, I will have water.",
      "Mluvím trochu česky.": "I speak a little Czech.",
      "Můžete mi pomoci?": "Can you help me?",
      "Chci zlepšit svou češtinu.": "I want to improve my Czech.",
      "Česká výslovnost chce trénink.": "Czech pronunciation takes practice."
    };

    if (map[sentence]) return map[sentence];
    return `English example with "${card.en}".`;
  }

  function toUrdu(value) {
    const text = String(value || "").trim();
    if (!text) return "";

    const phraseMap = {
      "नमस्ते": "سلام",
      "धन्यवाद": "شکریہ",
      "कृपया": "براہ کرم",
      "माफ कीजिए": "معاف کیجیے",
      "हाँ": "ہاں",
      "नहीं": "نہیں",
      "शायद": "شاید",
      "आज": "آج",
      "कल": "کل",
      "सुबह": "صبح",
      "शाम": "شام",
      "रात": "رات",
      "सप्ताह": "ہفتہ",
      "महीना": "مہینہ",
      "साल": "سال",
      "समय": "وقت",
      "जगह": "جگہ",
      "शहर": "شہر",
      "गाँव": "گاؤں",
      "सड़क": "سڑک",
      "रेलवे स्टेशन": "ریلوے اسٹیشن",
      "स्टॉप": "اسٹاپ",
      "ट्रेन": "ٹرین",
      "बस": "بس",
      "ट्राम": "ٹرام",
      "मेट्रो": "میٹرو",
      "कार": "کار",
      "साइकिल": "سائیکل",
      "यात्रा": "سفر",
      "छुट्टी": "چھٹی",
      "होटल": "ہوٹل",
      "कमरा": "کمرہ",
      "चाबी": "چابی",
      "नक्शा": "نقشہ",
      "दिशा": "سمت",
      "बाएँ": "بائیں",
      "दाएँ": "دائیں",
      "सीधे": "سیدھا",
      "पास": "قریب",
      "दूर": "دور",
      "घर": "گھر",
      "अपार्टमेंट": "اپارٹمنٹ",
      "रसोई": "باورچی خانہ",
      "बाथरूम": "باتھ روم",
      "खिड़की": "کھڑکی",
      "दरवाज़ा": "دروازہ",
      "मेज़": "میز",
      "कुर्सी": "کرسی",
      "बिस्तर": "بستر",
      "अलमारी": "الماری",
      "रोशनी": "روشنی",
      "पानी": "پانی",
      "खाना": "کھانا",
      "नाश्ता": "ناشتہ",
      "ब्रेड": "بریڈ",
      "चीज़": "چیز",
      "मांस": "گوشت",
      "चिकन": "چکن",
      "मछली": "مچھلی",
      "अंडा": "انڈا",
      "दूध": "دودھ",
      "कॉफी": "کافی",
      "चाय": "چائے",
      "चीनी": "چینی",
      "नमक": "نمک",
      "फल": "پھل",
      "सब्ज़ियाँ": "سبزیاں",
      "सेब": "سیب",
      "आलू": "آلو",
      "चावल": "چاول",
      "सूप": "سوپ",
      "बिल": "بل",
      "पैसे": "پیسے",
      "कार्ड": "کارڈ",
      "नकद": "نقد",
      "दुकान": "دکان",
      "सुपरमार्केट": "سپر مارکیٹ",
      "फार्मेसी": "فارمیسی",
      "डाकघर": "ڈاک خانہ",
      "बैंक": "بینک",
      "स्कूल": "اسکول",
      "विश्वविद्यालय": "یونیورسٹی",
      "कोर्स": "کورس",
      "परीक्षा": "امتحان",
      "सवाल": "سوال",
      "जवाब": "جواب",
      "गलती": "غلطی",
      "शब्द": "لفظ",
      "वाक्य": "جملہ",
      "भाषा": "زبان",
      "किताब": "کتاب",
      "काम": "کام",
      "नौकरी": "نوکری",
      "ऑफिस": "دفتر",
      "मीटिंग": "میٹنگ",
      "सहकर्मी": "ساتھی",
      "बॉस": "باس",
      "वेतन": "تنخواہ",
      "अनुबंध": "معاہدہ",
      "दस्तावेज़": "دستاویز",
      "कंप्यूटर": "کمپیوٹر",
      "फोन": "فون",
      "ईमेल": "ای میل",
      "पासवर्ड": "پاس ورڈ",
      "इंटरनेट": "انٹرنیٹ",
      "परिवार": "خاندان",
      "माता-पिता": "والدین",
      "माँ": "ماں",
      "पिता": "والد",
      "बेटा": "بیٹا",
      "बेटी": "بیٹی",
      "भाई": "بھائی",
      "बहन": "بہن",
      "दोस्त": "دوست",
      "पड़ोसी": "پڑوسی",
      "व्यक्ति": "شخص",
      "महिला": "عورت",
      "पुरुष": "مرد",
      "बच्चा": "بچہ",
      "स्वास्थ्य": "صحت",
      "बीमारी": "بیماری",
      "डॉक्टर": "ڈاکٹر",
      "अस्पताल": "ہسپتال",
      "दवा": "دوا",
      "दर्द": "درد",
      "सिर": "سر",
      "हाथ": "ہاتھ",
      "पैर": "پاؤں",
      "पेट": "پیٹ",
      "दाँत": "دانت",
      "बुखार": "بخار",
      "थकान": "تھکن",
      "नींद": "نیند",
      "खेल": "کھیل",
      "दौड़ना": "دوڑنا",
      "जाना": "جانا",
      "होना": "ہونا",
      "रखना": "رکھنا",
      "करना": "کرنا",
      "पढ़ाई करना": "پڑھائی کرنا",
      "सीखना": "سیکھنا",
      "पढ़ना": "پڑھنا",
      "लिखना": "لکھنا",
      "बोलना": "بولنا",
      "कहना": "کہنا",
      "पूछना": "پوچھنا",
      "समझना": "سمجھنا",
      "जानना": "جاننا",
      "सोचना": "سوچنا",
      "चाहना": "چاہنا",
      "ज़रूरत होना": "ضرورت ہونا",
      "देना": "دینا",
      "लेना": "لینا",
      "खरीदना": "خریدنا",
      "बेचना": "بیچنا",
      "भुगतान करना": "ادائیگی کرنا",
      "ढूँढना": "ڈھونڈنا",
      "खोलना": "کھولنا",
      "बंद करना": "بند کرنا",
      "शुरू करना": "شروع کرنا",
      "खत्म करना": "ختم کرنا",
      "इंतज़ार करना": "انتظار کرنا",
      "मदद करना": "مدد کرنا",
      "पकाना": "پکانا",
      "पीना": "پینا",
      "सोना": "سونا",
      "रहना": "رہنا",
      "देखना": "دیکھنا",
      "सुनना": "سننا",
      "सुंदर": "خوبصورت",
      "अच्छा": "اچھا",
      "बुरा": "برا",
      "नया": "نیا",
      "पुराना": "پرانا",
      "बड़ा": "بڑا",
      "छोटा": "چھوٹا",
      "लंबा": "لمبا",
      "तेज़": "تیز",
      "धीमा": "آہستہ",
      "सस्ता": "سستا",
      "महँगा": "مہنگا",
      "गर्म": "گرم",
      "ठंडा": "ٹھنڈا",
      "साफ़": "صاف",
      "गंदा": "گندا",
      "खुला": "کھلا",
      "महत्वपूर्ण": "اہم",
      "आसान": "آسان",
      "मुश्किल": "مشکل",
      "खाली": "خالی",
      "खुश": "خوش",
      "उदास": "اداس",
      "थका हुआ": "تھکا ہوا",
      "बीमार": "بیمار",
      "स्वस्थ": "صحت مند",
      "मौसम": "موسم",
      "सूरज": "سورج",
      "बारिश": "بارش",
      "बर्फ़": "برف",
      "हवा": "ہوا",
      "समस्या": "مسئلہ",
      "समाधान": "حل",
      "विचार": "خیال",
      "राय": "رائے",
      "कारण": "وجہ",
      "परिणाम": "نتیجہ",
      "बदलाव": "تبدیلی",
      "योजना": "منصوبہ",
      "लक्ष्य": "ہدف",
      "विकल्प": "اختیار",
      "सच": "سچ",
      "झूठ": "جھوٹ",
      "खुशी": "خوشی",
      "डर": "ڈر",
      "शांति": "سکون",
      "शोर": "شور",
      "मदद": "مدد",
      "सलाह": "مشورہ",
      "निमंत्रण": "دعوت",
      "उपहार": "تحفہ",
      "जन्मदिन": "سالگرہ",
      "उच्चारण": "تلفظ",
      "अनुवाद": "ترجمہ"
    };

    const normalized = text.replace(/\s+/g, " ");
    if (phraseMap[normalized]) return phraseMap[normalized];

    return normalized
      .replace(/क्ष/g, "کش")
      .replace(/ज्ञ/g, "گیہ")
      .replace(/त्र/g, "تر")
      .replace(/श्र/g, "شر")
      .replace(/[ाआ]/g, "ا")
      .replace(/[िीई]/g, "ی")
      .replace(/[ुूऊ]/g, "و")
      .replace(/[ेैए]/g, "ے")
      .replace(/[ोौओऔ]/g, "و")
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
      .replace(/ड/g, "ڈ")
      .replace(/ढ/g, "ڈھ")
      .replace(/त/g, "ت")
      .replace(/थ/g, "تھ")
      .replace(/द/g, "د")
      .replace(/ध/g, "دھ")
      .replace(/न/g, "ن")
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
      .replace(/ड़/g, "ڑ")
      .replace(/ढ़/g, "ڑھ")
      .replace(/ं/g, "ں")
      .replace(/ँ/g, "ں")
      .replace(/ः/g, "")
      .replace(/्/g, "")
      .replace(/[।]/g, ".");
  }

  function slug(value) {
    return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function filteredDeck() {
    const levelDeck = deck.filter((card) => isCardForExam(card));
    const filter = el.deckFilter.value;
    if (filter === "all") return levelDeck;
    if (filter === "core") return levelDeck.filter((card) => !card.tags.includes("numbers") && !card.tags.includes("forms"));
    return levelDeck.filter((card) => card.tags.includes(filter));
  }

  function isCardForExam(card) {
    if (examLevel === "b1") return true;
    if (card.tags.includes("custom")) return true;
    if (String(card.id || "").startsWith("import-")) return true;
    return card.level === "a2";
  }

  function examLabel() {
    return examLevel === "a2" ? "A2" : "B1";
  }

  function clearShuffleQueue() {
    shuffledQueue = [];
  }

  function scheduleRelearning(cardId) {
    const remaining = RELEARNING_MIN_CARDS + Math.floor(Math.random() * (RELEARNING_MAX_CARDS - RELEARNING_MIN_CARDS + 1));
    relearningQueue = relearningQueue.filter((entry) => entry.id !== cardId);
    relearningQueue.push({ id: cardId, remaining });
  }

  function advanceRelearningQueue(reviewedCardId) {
    relearningQueue = relearningQueue.map((entry) =>
      entry.id === reviewedCardId ? entry : { ...entry, remaining: Math.max(0, entry.remaining - 1) }
    );
  }

  function takeRelearningCard(cards, allowEarlyReturn = false) {
    const cardsById = new Map(cards.map((card) => [card.id, card]));
    const eligible = relearningQueue.filter((entry) => cardsById.has(entry.id));
    const entry = eligible.find((item) => item.remaining <= 0) || (allowEarlyReturn ? eligible.sort((a, b) => a.remaining - b.remaining)[0] : null);
    if (!entry) return null;
    relearningQueue = relearningQueue.filter((item) => item.id !== entry.id);
    return cardsById.get(entry.id);
  }

  function selectedMeaning(card) {
    return meaningLanguage === "ur" ? card.ur : card.hi;
  }

  function meaningLabel() {
    return meaningLanguage === "ur" ? "Urdu" : "Hindi";
  }

  function getState(card) {
    if (!progress[card.id]) {
      progress[card.id] = { knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
    }
    return progress[card.id];
  }

  function dueCards(now = Date.now()) {
    return filteredDeck().filter((card) => (getState(card).dueAt || 0) <= now);
  }

  function shuffleValues(values) {
    const shuffled = values.slice();
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  }

  function shuffleDueQueue() {
    const due = dueCards();
    const currentId = current && due.some((card) => card.id === current.id) ? current.id : null;
    const otherIds = due.map((card) => card.id).filter((id) => id !== currentId);
    shuffledQueue = shuffleValues(otherIds);
    if (currentId) shuffledQueue.push(currentId);
    return due.length;
  }

  function reviewPriority(state) {
    if (!state.seen) return 1;
    if ((state.againCount || 0) > 0) return 3;
    return 2;
  }

  function compareDueCards(a, b, now) {
    const aState = getState(a);
    const bState = getState(b);
    const priorityDifference = reviewPriority(bState) - reviewPriority(aState);
    if (priorityDifference) return priorityDifference;

    const overdueDifference = (bState.dueAt || 0) - (aState.dueAt || 0);
    if (overdueDifference) return overdueDifference;

    return (bState.againCount || 0) - (aState.againCount || 0) || (aState.knownStreak || 0) - (bState.knownStreak || 0);
  }

  function pickNextCard() {
    const now = Date.now();
    const deckCards = filteredDeck();
    const relearningIds = new Set(relearningQueue.map((entry) => entry.id));
    const cards = dueCards(now).filter((card) => !relearningIds.has(card.id));
    const dueById = new Map(cards.map((card) => [card.id, card]));
    if (forcedCardId && dueById.has(forcedCardId)) {
      const forced = dueById.get(forcedCardId);
      forcedCardId = null;
      return forced;
    }
    forcedCardId = null;

    const scheduledRelearning = takeRelearningCard(deckCards);
    if (scheduledRelearning) return scheduledRelearning;

    if (!cards.length) return takeRelearningCard(deckCards, true);

    while (shuffledQueue.length) {
      const queued = dueById.get(shuffledQueue.shift());
      if (queued) return queued;
    }

    cards.sort((a, b) => compareDueCards(a, b, now));
    return cards[0];
  }

  function render() {
    reviewLocked = false;
    current = pickNextCard();
    revealed = false;
    el.answer.hidden = true;
    el.card.className = "deck-card";
    el.card.style.transform = "";
    el.card.style.opacity = "";
    el.editCardTrigger.disabled = !current;

    if (!current) {
      const hasCards = filteredDeck().length > 0;
      el.word.textContent = hasCards ? "Done" : "No cards";
      el.english.textContent = "";
      el.indicMeaning.textContent = "";
      el.sentence.textContent = "";
      el.sentenceEn.textContent = "";
      el.tapHint.textContent = hasCards ? "No cards are due right now" : "Import CSV cards or choose another deck";
      setStatus(hasCards ? "All caught up. Known cards will return later." : "No cards available in this deck.");
      updateStats();
      return;
    }

    const state = getState(current);
    el.word.textContent = current.cz;
    el.english.textContent = current.en;
    el.indicLabel.textContent = meaningLabel();
    el.indicMeaning.textContent = selectedMeaning(current);
    el.indicMeaning.dir = meaningLanguage === "ur" ? "rtl" : "ltr";
    el.indicMeaning.lang = meaningLanguage === "ur" ? "ur" : "hi";
    el.sentence.textContent = current.sentence;
    el.sentenceEn.textContent = current.sentenceEn;
    el.tapHint.textContent = "Tap to reveal meaning";
    updateStats();
  }

  function updateStats() {
    const now = Date.now();
    const cards = filteredDeck();
    let due = 0;
    let known = 0;
    let learning = 0;

    for (const card of cards) {
      const state = getState(card);
      if ((state.dueAt || 0) <= now) due += 1;
      if ((state.knownStreak || 0) >= 1) known += 1;
      if (state.seen && (state.knownStreak || 0) === 0) learning += 1;
    }

    const log = currentDailyLog();
    el.dueCount.textContent = due;
    el.knownCount.textContent = known;
    el.learningCount.textContent = learning;
    el.deckSize.textContent = cards.length;
    el.customCount.textContent = customCards.length;
    el.dailyProgress.textContent = `${log.reviewed} / ${dailyGoal} reviewed`;
    el.dailyGoalInput.value = dailyGoal;
    renderCustomList();
    renderSearchResults();
  }

  function renderSearchResults() {
    const query = el.searchInput.value.trim().toLocaleLowerCase("cs-CZ");
    if (!query) {
      el.searchCount.textContent = "0";
      el.searchResults.replaceChildren();
      return;
    }

    const matches = filteredDeck()
      .filter((card) => [card.cz, card.en, card.hi, card.ur, card.sentence].some((value) =>
        String(value || "").toLocaleLowerCase("cs-CZ").includes(query)
      ))
      .slice(0, 30);

    el.searchCount.textContent = matches.length;
    el.searchResults.replaceChildren();
    for (const card of matches) {
      const state = getState(card);
      const item = document.createElement("div");
      item.className = "search-item";

      const copy = document.createElement("div");
      const word = document.createElement("strong");
      word.textContent = card.cz;
      const meanings = document.createElement("div");
      meanings.className = `search-meanings${meaningLanguage === "ur" ? " is-rtl" : ""}`;
      const english = document.createElement("span");
      english.className = "search-english";
      english.textContent = card.en;
      const indic = document.createElement("span");
      indic.className = "search-indic";
      indic.textContent = meaningLanguage === "ur" ? card.ur : card.hi;
      if (meaningLanguage === "ur") {
        indic.dir = "rtl";
        indic.lang = "ur";
      }
      meanings.append(english, indic);
      copy.append(word, meanings);

      const meta = document.createElement("span");
      meta.className = "search-meta";
      meta.textContent = `${card.level.toUpperCase()} · ${state.seen ? formatInterval(Math.max(0, (state.dueAt || 0) - Date.now())) : "new"}`;

      const study = document.createElement("button");
      study.type = "button";
      study.dataset.studyId = card.id;
      study.textContent = "Study";

      item.append(copy, meta, study);
      el.searchResults.append(item);
    }
  }

  function studySearchResult(id) {
    const card = filteredDeck().find((item) => item.id === id);
    if (!card) return;
    getState(card).dueAt = 0;
    forcedCardId = card.id;
    clearShuffleQueue();
    save();
    closeSearchDialog();
    render();
    setStatus(`Loaded ${card.cz} for review.`);
  }

  function isTypingTarget(target) {
    return ["INPUT", "SELECT", "TEXTAREA"].includes(target && target.tagName);
  }

  function renderCustomList() {
    el.customList.replaceChildren();

    for (const card of customCards.slice(0, 6)) {
      const item = document.createElement("div");
      item.className = "custom-item";

      const copy = document.createElement("div");
      const word = document.createElement("strong");
      word.textContent = card.cz;
      const meaning = document.createElement("span");
      meaning.textContent = `${card.en} · ${meaningLanguage === "ur" ? (card.ur || toUrdu(card.hi)) : card.hi}`;
      meaning.dir = meaningLanguage === "ur" ? "rtl" : "ltr";
      copy.append(word, meaning);

      const button = document.createElement("button");
      button.className = "delete-word";
      button.type = "button";
      button.dataset.id = card.id;
      button.textContent = "Delete";

      item.append(copy, button);
      el.customList.append(item);
    }
  }

  function reveal() {
    if (!current) return;
    revealed = true;
    el.answer.hidden = false;
    el.tapHint.textContent = "Now swipe left or right";
    setStatus(`${current.cz}: ${current.en} · ${selectedMeaning(current)}`);
  }

  function speak(text) {
    if (!text || !("speechSynthesis" in window)) {
      setStatus("Speech is not available in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "cs-CZ";
    utterance.rate = 0.86;
    window.speechSynthesis.speak(utterance);
  }

  function grade(result) {
    if (!current || reviewLocked) return;
    reviewLocked = true;
    const reviewedCard = current;
    const state = getState(reviewedCard);
    const previousState = { ...state };
    const previousDailyLog = { ...currentDailyLog() };
    const previousQueue = shuffledQueue.slice();
    const previousRelearningQueue = relearningQueue.map((entry) => ({ ...entry }));
    const wasRevealed = revealed;
    const now = Date.now();
    const wasNew = !state.seen;
    state.seen = (state.seen || 0) + 1;

    if (result === "again") {
      state.knownStreak = 0;
      state.againCount = (state.againCount || 0) + 1;
      state.dueAt = now + AGAIN_INTERVALS[Math.min(state.againCount - 1, AGAIN_INTERVALS.length - 1)];
    } else if (result === "hard") {
      state.knownStreak = Math.max(0, state.knownStreak || 0);
      state.againCount = Math.max(0, state.againCount || 0);
      state.dueAt = now + HARD_INTERVALS[Math.min(state.seen - 1, HARD_INTERVALS.length - 1)];
    } else if (result === "easy") {
      state.knownStreak = (state.knownStreak || 0) + 2;
      state.againCount = 0;
      state.dueAt = now + EASY_INTERVALS[Math.min(state.knownStreak - 1, EASY_INTERVALS.length - 1)];
    } else {
      state.knownStreak = (state.knownStreak || 0) + 1;
      state.againCount = Math.max(0, (state.againCount || 0) - 1);
      state.dueAt = now + KNOWN_INTERVALS[Math.min(state.knownStreak - 1, KNOWN_INTERVALS.length - 1)];
    }

    advanceRelearningQueue(reviewedCard.id);
    if (result === "again") scheduleRelearning(reviewedCard.id);
    recordReview(wasNew);
    save();
    shuffledQueue = shuffledQueue.filter((id) => id !== reviewedCard.id);
    lastReview = { card: reviewedCard, previousState, previousDailyLog, previousQueue, previousRelearningQueue, wasRevealed };
    el.undoButton.hidden = false;
    setStatus(statusForGrade(result, reviewedCard));
    flyOut(result !== "again");
  }

  function undoLastReview() {
    if (!lastReview) return;
    if (renderTimer) {
      window.clearTimeout(renderTimer);
      renderTimer = null;
    }
    const undo = lastReview;
    progress[undo.card.id] = { ...undo.previousState };
    dailyLog = { ...undo.previousDailyLog };
    shuffledQueue = undo.previousQueue.slice();
    relearningQueue = undo.previousRelearningQueue.map((entry) => ({ ...entry }));
    forcedCardId = undo.card.id;
    lastReview = null;
    reviewLocked = false;
    el.undoButton.hidden = true;
    save();
    saveDailyLog();
    render();
    if (undo.wasRevealed) reveal();
    setStatus(`Undid the last review for ${undo.card.cz}.`);
  }

  function statusForGrade(result, card) {
    if (result === "again") return `Marked again. ${card.cz} will return after 10-15 other cards.`;
    if (result === "hard") return `Marked hard. ${card.cz} will return after a short interval.`;
    if (result === "easy") return `Marked easy. ${card.cz} will return much later.`;
    return `Marked good. ${card.cz} will return later.`;
  }

  function recordReview(wasNew) {
    const log = currentDailyLog();
    log.reviewed += 1;
    if (wasNew) log.newCards += 1;
    saveDailyLog();
  }

  function flyOut(known) {
    el.card.style.transform = `translateX(${known ? 120 : -120}vw) rotate(${known ? 18 : -18}deg)`;
    el.card.style.opacity = "0";
    renderTimer = window.setTimeout(() => {
      renderTimer = null;
      render();
    }, 180);
  }

  function formatInterval(ms) {
    if (ms <= 0) return "Due now";
    if (ms < HOUR) return `${Math.ceil(ms / MINUTE)} min`;
    if (ms < DAY) return `${Math.ceil(ms / HOUR)} hr`;
    return `${Math.ceil(ms / DAY)} days`;
  }

  function parseCsv(text) {
    const rows = parseCsvRows(text)
      .filter((row) => row.some(Boolean))
      .map((row) => row.map((part) => (part || "").trim()));

    if (!rows.length) return [];

    const headers = rows[0].map((cell) => cell.toLowerCase().replace(/[\s_-]+/g, ""));
    const hasHeader = headers.includes("czech") || headers.includes("cz");
    const body = hasHeader ? rows.slice(1) : rows;
    const indexOf = (...names) => names.map((name) => headers.indexOf(name)).find((index) => index >= 0);

    return body
      .map((values, index) => {
        if (hasHeader) {
          const czIndex = indexOf("czech", "cz");
          const enIndex = indexOf("english", "en");
          const hiIndex = indexOf("hindi", "hi");
          const urIndex = indexOf("urdu", "ur");
          const sentenceIndex = indexOf("sentence", "example", "czechsentence");
          const sentenceEnIndex = indexOf("sentenceen", "exampleen", "englishsentence", "exampleenglish");
          const tagsIndex = indexOf("tags", "tag");
          return {
            id: `import-${Date.now()}-${index}`,
            cz: values[czIndex] || "",
            en: values[enIndex] || "",
            hi: values[hiIndex] || "",
            ur: urIndex >= 0 ? values[urIndex] : "",
            sentence: values[sentenceIndex] || "",
            sentenceEn: sentenceEnIndex >= 0 ? values[sentenceEnIndex] : "",
            tags: tagsIndex >= 0 ? values[tagsIndex] : "daily"
          };
        }

        const [cz, en, hi] = values;
        const hasUrduColumn = values.length >= 6;
        const ur = hasUrduColumn ? values[3] : "";
        const sentence = hasUrduColumn ? values[4] : values[3];
        const sentenceEn = values.length >= 7 ? values[5] : "";
        const tags = values.length >= 7 ? values[6] : hasUrduColumn ? values[5] : values[4];
        return { id: `import-${Date.now()}-${index}`, cz, en, hi, ur, sentence, sentenceEn, tags: tags || "daily" };
      })
      .filter((card) => card.cz && card.en);
  }

  function parseCsvRows(text) {
    const rows = [];
    let row = [];
    let cell = "";
    let quoted = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const next = text[index + 1];

      if (char === '"' && quoted && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === "," && !quoted) {
        row.push(cell);
        cell = "";
      } else if ((char === "\n" || char === "\r") && !quoted) {
        if (char === "\r" && next === "\n") index += 1;
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += char;
      }
    }

    row.push(cell);
    rows.push(row);
    return rows;
  }

  function exportProgress() {
    const payload = JSON.stringify({ exportedAt: new Date().toISOString(), progress, importedCards, customCards, editedCards, dailyLog, dailyGoal, examLevel, meaningLanguage }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "czech-flashcards-progress.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportDeck() {
    const rows = filteredDeck().map((card) => ({
      id: card.id,
      level: card.level,
      cz: card.cz,
      en: card.en,
      hi: card.hi,
      ur: card.ur,
      sentence: card.sentence,
      sentenceEn: card.sentenceEn,
      tags: card.tags
    }));
    const payload = JSON.stringify({ exportedAt: new Date().toISOString(), exam: examLevel, deck: el.deckFilter.value, cards: rows }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `czech-${examLevel}-${el.deckFilter.value}-deck.json`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus(`Exported ${rows.length} cards from the current deck.`);
  }

  function restoreBackup(payload) {
    if (!payload || typeof payload !== "object") {
      throw new Error("Backup file is not valid JSON.");
    }

    progress = payload.progress && typeof payload.progress === "object" ? payload.progress : {};
    importedCards = Array.isArray(payload.importedCards) ? payload.importedCards : [];
    customCards = Array.isArray(payload.customCards) ? payload.customCards : [];
    editedCards = payload.editedCards && typeof payload.editedCards === "object" ? payload.editedCards : {};
    dailyLog = payload.dailyLog && typeof payload.dailyLog === "object" ? payload.dailyLog : todayLog();
    dailyGoal = Number(payload.dailyGoal) || dailyGoal;
    examLevel = payload.examLevel === "a2" ? "a2" : payload.examLevel === "b1" ? "b1" : examLevel;
    meaningLanguage = payload.meaningLanguage === "ur" ? "ur" : payload.meaningLanguage === "hi" ? "hi" : meaningLanguage;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    localStorage.setItem(EXTRA_KEY, JSON.stringify(importedCards));
    localStorage.setItem(DAILY_KEY, JSON.stringify(dailyLog));
    localStorage.setItem(GOAL_KEY, String(dailyGoal));
    localStorage.setItem(LEVEL_KEY, examLevel);
    localStorage.setItem(LANGUAGE_KEY, meaningLanguage);
    saveCustomCards();
    saveEditedCards();
    deck = buildDeck();
    clearShuffleQueue();
  }

  function deleteCustomWord(id) {
    const deleted = customCards.find((card) => card.id === id);
    customCards = customCards.filter((card) => card.id !== id);
    delete progress[id];
    saveCustomCards();
    save();
    deck = buildDeck();
    clearShuffleQueue();
    setStatus(deleted ? `Deleted ${deleted.cz}.` : "Custom word deleted.");
    render();
  }

  function openAddWordDialog() {
    el.addWordDialog.showModal();
    el.customCz.focus();
  }

  function openSearchDialog() {
    el.searchDialog.showModal();
    renderSearchResults();
    el.searchInput.focus();
  }

  function closeSearchDialog() {
    if (el.searchDialog.open) el.searchDialog.close();
  }

  function openSettingsDialog() {
    el.settingsDialog.showModal();
    el.examLevel.focus();
  }

  function closeSettingsDialog() {
    if (el.settingsDialog.open) el.settingsDialog.close();
  }

  function closeAddWordDialog() {
    if (el.addWordDialog.open) el.addWordDialog.close();
  }

  function openEditCardDialog() {
    if (!current) return;
    el.editCz.value = current.cz;
    el.editEn.value = current.en;
    el.editHi.value = current.hi;
    el.editUr.value = current.ur;
    el.editSentence.value = current.sentence;
    el.editSentenceEn.value = current.sentenceEn;
    el.editCardDialog.showModal();
    el.editCz.focus();
  }

  function closeEditCardDialog() {
    if (el.editCardDialog.open) el.editCardDialog.close();
  }

  el.card.addEventListener("click", reveal);
  el.card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      reveal();
    }
  });
  el.undoButton.addEventListener("click", (event) => {
    event.stopPropagation();
    undoLastReview();
  });
  el.undoButton.addEventListener("pointerdown", (event) => event.stopPropagation());
  el.searchTrigger.addEventListener("click", openSearchDialog);
  el.closeSearchDialog.addEventListener("click", closeSearchDialog);
  el.searchDialog.addEventListener("click", (event) => {
    if (event.target === el.searchDialog) closeSearchDialog();
  });
  el.searchDialog.addEventListener("close", () => el.searchTrigger.focus());
  el.settingsTrigger.addEventListener("click", openSettingsDialog);
  el.closeSettingsDialog.addEventListener("click", closeSettingsDialog);
  el.settingsDialog.addEventListener("click", (event) => {
    if (event.target === el.settingsDialog) closeSettingsDialog();
  });
  el.settingsDialog.addEventListener("close", () => el.settingsTrigger.focus());
  el.addWordTrigger.addEventListener("click", openAddWordDialog);
  el.closeAddWordDialog.addEventListener("click", closeAddWordDialog);
  el.addWordDialog.addEventListener("click", (event) => {
    if (event.target === el.addWordDialog) closeAddWordDialog();
  });
  el.addWordDialog.addEventListener("close", () => el.addWordTrigger.focus());
  el.editCardTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    openEditCardDialog();
  });
  el.editCardTrigger.addEventListener("pointerdown", (event) => event.stopPropagation());
  el.closeEditCardDialog.addEventListener("click", closeEditCardDialog);
  el.editCardDialog.addEventListener("click", (event) => {
    if (event.target === el.editCardDialog) closeEditCardDialog();
  });
  el.editCardDialog.addEventListener("close", () => el.editCardTrigger.focus());
  el.speakWordButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (current) speak(current.cz);
  });
  el.speakWordButton.addEventListener("pointerdown", (event) => event.stopPropagation());
  el.speakSentenceButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (current) speak(current.sentence);
  });
  el.speakSentenceButton.addEventListener("pointerdown", (event) => event.stopPropagation());
  el.examLevel.value = examLevel;
  el.examLevel.addEventListener("change", () => {
    examLevel = el.examLevel.value;
    localStorage.setItem(LEVEL_KEY, examLevel);
    clearShuffleQueue();
    render();
    setStatus(`Switched to ${examLabel()} exam vocabulary.`);
  });
  el.deckFilter.addEventListener("change", () => {
    clearShuffleQueue();
    render();
  });
  el.meaningLanguage.value = meaningLanguage;
  el.meaningLanguage.addEventListener("change", () => {
    meaningLanguage = el.meaningLanguage.value;
    localStorage.setItem(LANGUAGE_KEY, meaningLanguage);
    setStatus(`Showing ${meaningLabel()} meanings.`);
    render();
  });
  el.exportButton.addEventListener("click", exportProgress);
  el.exportDeckButton.addEventListener("click", exportDeck);
  el.dailyGoalInput.value = dailyGoal;
  el.dailyGoalInput.addEventListener("change", () => {
    const nextGoal = Math.max(1, Math.min(500, Number(el.dailyGoalInput.value) || 30));
    dailyGoal = nextGoal;
    localStorage.setItem(GOAL_KEY, String(dailyGoal));
    updateStats();
    setStatus(`Daily goal set to ${dailyGoal} reviews.`);
  });
  el.searchInput.addEventListener("input", renderSearchResults);
  el.searchResults.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-study-id]");
    if (button) studySearchResult(button.dataset.studyId);
  });
  el.shuffleButton.addEventListener("click", () => {
    const count = shuffleDueQueue();
    render();
    if (!count) {
      setStatus("No due cards to shuffle in this deck.");
    } else if (count === 1) {
      setStatus("Only one due card is available right now.");
    } else {
      setStatus(`Shuffled ${count} due cards.`);
    }
  });
  el.resetDueButton.addEventListener("click", () => {
    for (const card of filteredDeck()) getState(card).dueAt = 0;
    save();
    clearShuffleQueue();
    render();
  });
  el.importInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const rows = parseCsv(await file.text());
    if (!rows.length) {
      setStatus("No valid CSV cards found. Use columns: Czech, English, Hindi, sentence, tags.");
      event.target.value = "";
      return;
    }
    importedCards = [...importedCards, ...rows];
    localStorage.setItem(EXTRA_KEY, JSON.stringify(importedCards));
    deck = buildDeck();
    clearShuffleQueue();
    event.target.value = "";
    setStatus(`Imported ${rows.length} cards.`);
    render();
  });
  el.restoreInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      restoreBackup(JSON.parse(await file.text()));
      clearShuffleQueue();
      el.examLevel.value = examLevel;
      el.meaningLanguage.value = meaningLanguage;
      if (customCards.length) {
        el.deckFilter.value = "custom";
      }
      setStatus("Progress backup restored.");
      render();
    } catch {
      setStatus("Could not restore backup. Choose a JSON export from this app.");
    } finally {
      event.target.value = "";
    }
  });
  el.addWordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const cz = el.customCz.value.trim();
    const en = el.customEn.value.trim();
    const hi = el.customHi.value.trim();
    const ur = el.customUr.value.trim() || toUrdu(hi);
    const sentence = el.customSentence.value.trim();
    const sentenceEn = el.customSentenceEn.value.trim() || `English example with "${en}".`;
    const tag = el.customTag.value;

    if (!cz || !en || !hi || !sentence) {
      setStatus("Please fill Czech, English, Hindi, and an example sentence.");
      return;
    }

    const duplicate = deck.some((card) => card.cz.toLocaleLowerCase("cs-CZ") === cz.toLocaleLowerCase("cs-CZ"));
    if (duplicate) {
      setStatus(`${cz} is already in your deck.`);
      return;
    }

    const customCard = {
      id: `custom-${Date.now()}-${slug(cz)}`,
      cz,
      en,
      hi,
      ur,
      sentence,
      sentenceEn,
      tags: Array.from(new Set(["custom", tag].filter(Boolean)))
    };

    customCards = [customCard, ...customCards];
    saveCustomCards();
    deck = buildDeck();
    clearShuffleQueue();
    progress[customCard.id] = { knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
    save();
    el.addWordForm.reset();
    el.customTag.value = "custom";
    el.deckFilter.value = "custom";
    closeAddWordDialog();
    setStatus(`Added ${cz}. It is ready in My words.`);
    render();
  });
  el.editCardForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!current) return;
    const correction = {
      cz: el.editCz.value.trim(),
      en: el.editEn.value.trim(),
      hi: el.editHi.value.trim(),
      ur: el.editUr.value.trim() || toUrdu(el.editHi.value.trim()),
      sentence: el.editSentence.value.trim(),
      sentenceEn: el.editSentenceEn.value.trim()
    };
    if (!correction.cz || !correction.en || !correction.hi || !correction.sentence || !correction.sentenceEn) return;

    const cardId = current.id;
    editedCards[cardId] = correction;
    const customIndex = customCards.findIndex((card) => card.id === cardId);
    if (customIndex >= 0) {
      customCards[customIndex] = { ...customCards[customIndex], ...correction };
      saveCustomCards();
    }
    saveEditedCards();
    deck = buildDeck();
    forcedCardId = cardId;
    clearShuffleQueue();
    closeEditCardDialog();
    render();
  });
  el.customList.addEventListener("click", (event) => {
    const button = event.target.closest(".delete-word");
    if (!button) return;
    deleteCustomWord(button.dataset.id);
  });

  window.addEventListener("keydown", (event) => {
    if (el.addWordDialog.open || el.editCardDialog.open || el.searchDialog.open || el.settingsDialog.open) return;
    if (isTypingTarget(event.target)) return;
    if (event.key === "ArrowLeft") grade("again");
    if (event.key === "ArrowRight") grade("good");
    if (event.key.toLowerCase() === "r") reveal();
    if (event.key.toLowerCase() === "u") undoLastReview();
  });

  el.card.addEventListener("pointerdown", (event) => {
    drag = { startX: event.clientX, startY: event.clientY };
    el.card.setPointerCapture(event.pointerId);
    el.card.classList.add("dragging");
  });

  el.card.addEventListener("pointermove", (event) => {
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const rotation = dx / 18;
    el.card.style.transform = `translate(${dx}px, ${dy * 0.25}px) rotate(${rotation}deg)`;
    el.card.classList.toggle("known-swipe", dx > 60);
    el.card.classList.toggle("again-swipe", dx < -60);
  });

  el.card.addEventListener("pointerup", (event) => {
    if (!drag) return;
    const dx = event.clientX - drag.startX;
    drag = null;
    el.card.classList.remove("dragging", "known-swipe", "again-swipe");
    if (Math.abs(dx) > 110) {
      grade(dx > 0 ? "good" : "again");
    } else {
      el.card.style.transform = "";
    }
  });

  el.card.addEventListener("pointercancel", () => {
    drag = null;
    el.card.classList.remove("dragging", "known-swipe", "again-swipe");
    el.card.style.transform = "";
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {
        setStatus("Offline cache is unavailable in this browser session.");
      });
    });
  }

  render();
})();
