import type { Card } from "@czech-flashcards/shared";
import type { MaterialIconName } from "../../components/MaterialIcons";
import type { StudySettings } from "../../database";
import { colors } from "../../theme/design";
import { baseDecks, countForDeck, type Category } from "./homeContent";

export function filterVisibleHomeCards(cards: Card[], examLevel: StudySettings["examLevel"]) {
  return cards.filter((card) => examLevel === "b1" || card.level === "a2" || card.tags.includes("custom") || String(card.id).startsWith("import-"));
}

export function buildHomeCategories(cards: Card[], settings: StudySettings, savedCount: number, customCount: number): Category[] {
  return [
    ...baseDecks.map((category) => ({ ...category, count: countForDeck(category.id, cards, savedCount, customCount) })),
    ...settings.customDecks.map((customDeck, index) => ({
      id: customDeck.id,
      title: customDeck.name,
      icon: "folder" as MaterialIconName,
      color: index % 2 ? colors.bohemianBlue : colors.softMint,
      count: cards.filter((card) => card.tags.includes(customDeck.id)).length
    }))
  ];
}
