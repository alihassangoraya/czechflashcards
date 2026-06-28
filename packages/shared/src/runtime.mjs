export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const AGAIN_INTERVALS = [2 * MINUTE, 10 * MINUTE, 30 * MINUTE, 2 * HOUR];
export const HARD_INTERVALS = [30 * MINUTE, 2 * HOUR, 8 * HOUR, DAY, 2 * DAY, 4 * DAY];
export const KNOWN_INTERVALS = [8 * HOUR, DAY, 3 * DAY, 7 * DAY, 16 * DAY, 35 * DAY, 75 * DAY];
export const EASY_INTERVALS = [DAY, 4 * DAY, 10 * DAY, 24 * DAY, 55 * DAY, 120 * DAY];

export function createReviewState(cardId) {
  return { cardId, knownStreak: 0, againCount: 0, dueAt: 0, seen: 0 };
}

export function reviewPriority(state) {
  if (!state.seen) return 1;
  if (state.againCount > 0) return 3;
  return 2;
}

export function compareDueReviewStates(a, b, now = Date.now()) {
  const priorityDifference = reviewPriority(b) - reviewPriority(a);
  if (priorityDifference) return priorityDifference;

  const overdueDifference = (b.dueAt || 0) - (a.dueAt || 0);
  if (overdueDifference) return overdueDifference;

  return (b.againCount || 0) - (a.againCount || 0) || (a.knownStreak || 0) - (b.knownStreak || 0);
}

export function applyReviewGrade(state, grade, reviewedAt = Date.now()) {
  const next = { ...state, seen: (state.seen || 0) + 1 };
  const wasNew = !state.seen;

  if (grade === "again") {
    next.knownStreak = 0;
    next.againCount = (state.againCount || 0) + 1;
    next.dueAt = reviewedAt + AGAIN_INTERVALS[Math.min(next.againCount - 1, AGAIN_INTERVALS.length - 1)];
  } else if (grade === "hard") {
    next.knownStreak = Math.max(0, state.knownStreak || 0);
    next.againCount = Math.max(0, state.againCount || 0);
    next.dueAt = reviewedAt + HARD_INTERVALS[Math.min(next.seen - 1, HARD_INTERVALS.length - 1)];
  } else if (grade === "easy") {
    next.knownStreak = (state.knownStreak || 0) + 2;
    next.againCount = 0;
    next.dueAt = reviewedAt + EASY_INTERVALS[Math.min(next.knownStreak - 1, EASY_INTERVALS.length - 1)];
  } else {
    next.knownStreak = (state.knownStreak || 0) + 1;
    next.againCount = Math.max(0, (state.againCount || 0) - 1);
    next.dueAt = reviewedAt + KNOWN_INTERVALS[Math.min(next.knownStreak - 1, KNOWN_INTERVALS.length - 1)];
  }

  return {
    state: next,
    event: { cardId: state.cardId, grade, reviewedAt, wasNew, nextDueAt: next.dueAt }
  };
}

export function formatInterval(ms) {
  if (ms <= 0) return "Due now";
  if (ms < HOUR) return `${Math.ceil(ms / MINUTE)} min`;
  if (ms < DAY) return `${Math.ceil(ms / HOUR)} hr`;
  return `${Math.ceil(ms / DAY)} days`;
}

export function normalizeTags(tags) {
  const values = Array.isArray(tags) ? tags : String(tags || "daily").split(/[,\s]+/);
  return Array.from(new Set(values.map((tag) => String(tag).trim()).filter(Boolean)));
}

export function slug(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function inferLevel(card) {
  if (card.tags.includes("extended") || card.tags.includes("forms")) return "b1";
  if (card.tags.includes("numbers")) {
    const value = Number(String(card.id || "").replace("number-", ""));
    return Number.isFinite(value) && value <= 100 ? "a2" : "b1";
  }
  return "a2";
}

export function normalizeCards(cards) {
  const seen = new Set();
  return cards
    .filter((card) => card && card.cz && card.en)
    .map((card, index) => {
      const tags = normalizeTags(card.tags);
      const id = card.id || `${slug(String(card.cz))}-${index}`;
      return {
        id,
        cz: String(card.cz || "").trim(),
        en: String(card.en || "").trim(),
        hi: String(card.hi || "Hindi meaning pending").trim(),
        ur: String(card.ur || card.urdu || "اردو معنی باقی ہے").trim(),
        sentence: String(card.sentence || `Používám slovo "${card.cz}" ve větě.`).trim(),
        sentenceEn: String(card.sentenceEn || "").trim(),
        level: card.level === "a2" || card.level === "b1" ? card.level : inferLevel({ id, tags }),
        tags,
        source: card.source === "custom" || card.source === "import" || card.source === "seed" ? card.source : "legacy-web"
      };
    })
    .filter((card) => {
      if (seen.has(card.id)) return false;
      seen.add(card.id);
      return true;
    });
}

export function isCardForExam(card, examLevel) {
  if (examLevel === "b1") return true;
  if (card.tags.includes("custom")) return true;
  if (String(card.id || "").startsWith("import-")) return true;
  return card.level === "a2";
}

export function filterDeck(cards, examLevel, deckFilter) {
  const levelDeck = cards.filter((card) => isCardForExam(card, examLevel));
  if (deckFilter === "all") return levelDeck;
  if (deckFilter === "core") return levelDeck.filter((card) => !card.tags.includes("numbers") && !card.tags.includes("forms"));
  return levelDeck.filter((card) => card.tags.includes(deckFilter));
}

export function selectedMeaning(card, language) {
  return language === "ur" ? card.ur : card.hi;
}

export function parseCsvRows(text) {
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

export function parseCsvCards(text, now = Date.now()) {
  const rows = parseCsvRows(text).filter((row) => row.some(Boolean)).map((row) => row.map((part) => (part || "").trim()));
  if (!rows.length) return [];

  const headers = rows[0].map((cell) => cell.toLowerCase().replace(/[\s_-]+/g, ""));
  const hasHeader = headers.includes("czech") || headers.includes("cz");
  const body = hasHeader ? rows.slice(1) : rows;
  const indexOf = (...names) => names.map((name) => headers.indexOf(name)).find((index) => index >= 0) ?? -1;

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
          id: `import-${now}-${index}`,
          cz: values[czIndex] || "",
          en: values[enIndex] || "",
          hi: values[hiIndex] || "",
          ur: urIndex >= 0 ? values[urIndex] : "",
          sentence: values[sentenceIndex] || "",
          sentenceEn: sentenceEnIndex >= 0 ? values[sentenceEnIndex] : "",
          tags: tagsIndex >= 0 ? values[tagsIndex] : "daily",
          source: "import"
        };
      }

      const [cz, en, hi] = values;
      const hasUrduColumn = values.length >= 6;
      const ur = hasUrduColumn ? values[3] : "";
      const sentence = hasUrduColumn ? values[4] : values[3];
      const sentenceEn = values.length >= 7 ? values[5] : "";
      const tags = values.length >= 7 ? values[6] : hasUrduColumn ? values[5] : values[4];
      return { id: `import-${now}-${index}-${slug(cz || "card")}`, cz, en, hi, ur, sentence, sentenceEn, tags: tags || "daily", source: "import" };
    })
    .filter((card) => card.cz && card.en);
}
