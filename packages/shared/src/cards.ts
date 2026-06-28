import type { Card, CardLevel, MeaningLanguage } from "./types";

export type RawCard = Partial<Omit<Card, "level" | "source" | "tags">> & {
  level?: CardLevel | string | null;
  source?: Card["source"] | string;
  tags?: string[] | string;
  urdu?: string;
};

export function normalizeTags(tags: unknown): string[] {
  const values = Array.isArray(tags) ? tags : String(tags || "daily").split(/[,\s]+/);
  return Array.from(new Set(values.map((tag) => String(tag).trim()).filter(Boolean)));
}

export function slug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function inferLevel(card: Pick<Card, "id" | "tags">): CardLevel {
  if (card.tags.includes("extended") || card.tags.includes("forms")) return "b1";
  if (card.tags.includes("numbers")) {
    const value = Number(String(card.id || "").replace("number-", ""));
    return Number.isFinite(value) && value <= 100 ? "a2" : "b1";
  }
  return "a2";
}

export function normalizeCards(cards: RawCard[]): Card[] {
  const seen = new Set<string>();
  return cards
    .filter((card) => card && card.cz && card.en)
    .map((card, index) => {
      const tags = normalizeTags(card.tags);
      const id = card.id || `${slug(String(card.cz))}-${index}`;
      const normalized: Card = {
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
      return normalized;
    })
    .filter((card) => {
      if (seen.has(card.id)) return false;
      seen.add(card.id);
      return true;
    });
}

export function isCardForExam(card: Card, examLevel: CardLevel): boolean {
  if (examLevel === "b1") return true;
  if (card.tags.includes("custom")) return true;
  if (String(card.id || "").startsWith("import-")) return true;
  return card.level === "a2";
}

export function filterDeck(cards: Card[], examLevel: CardLevel, deckFilter: string): Card[] {
  const levelDeck = cards.filter((card) => isCardForExam(card, examLevel));
  if (deckFilter === "all") return levelDeck;
  if (deckFilter === "core") return levelDeck.filter((card) => !card.tags.includes("numbers") && !card.tags.includes("forms"));
  return levelDeck.filter((card) => card.tags.includes(deckFilter));
}

export function selectedMeaning(card: Card, language: MeaningLanguage): string {
  return language === "ur" ? card.ur : card.hi;
}
