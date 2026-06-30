import type { Card } from "@czech-flashcards/shared";
import type { MaterialIconName } from "../../components/MaterialIcons";
import type { TranslationKey } from "../../i18n/translations";
import { colors } from "../../theme/design";

export type Category = { id: string; title: string; icon: MaterialIconName; color: string; count?: number };
export type GuideItem = { icon: MaterialIconName; textKey: TranslationKey };

export const baseDecks: Category[] = [
  { id: "a2-focus", title: "A2 Focus", icon: "school", color: colors.bohemianBlue },
  { id: "b1-focus", title: "B1 Focus", icon: "emoji-events", color: colors.bohemianGold },
  { id: "saved", title: "My List", icon: "star", color: colors.bohemianGold },
  { id: "core", title: "Core Words", icon: "layers", color: colors.softMint },
  { id: "all", title: "All Cards", icon: "auto-stories", color: colors.bohemianBlue },
  { id: "daily", title: "Daily Life", icon: "home", color: colors.bohemianBlue },
  { id: "extended", title: "Extended", icon: "library-add", color: colors.softMint },
  { id: "travel", title: "Travel", icon: "flight", color: colors.bohemianGold },
  { id: "work", title: "Work", icon: "assignment", color: colors.softMint },
  { id: "health", title: "Health", icon: "favorite", color: colors.bohemianRed },
  { id: "verbs", title: "Verbs", icon: "menu-book", color: colors.bohemianBlue },
  { id: "forms", title: "Forms", icon: "swap-horiz", color: colors.softMint },
  { id: "custom", title: "Custom", icon: "folder", color: colors.bohemianRed },
  { id: "numbers", title: "Numbers", icon: "format-list-numbered", color: colors.bohemianGold }
];

export const guideItems: GuideItem[] = [
  { icon: "touch-app", textKey: "guide.tapCard" },
  { icon: "arrow-back", textKey: "guide.swipeLeft" },
  { icon: "arrow-forward", textKey: "guide.swipeRight" },
  { icon: "volume-up", textKey: "guide.audio" },
  { icon: "undo", textKey: "guide.undo" },
  { icon: "star", textKey: "guide.star" },
  { icon: "search", textKey: "guide.search" },
  { icon: "quiz", textKey: "guide.quiz" }
];

export function labelForDeck(deckFilter: string): string {
  return ({ "a2-focus": "A2 Focus", "b1-focus": "B1 Focus", saved: "My list", core: "Core words", all: "All cards" } as Record<string, string>)[deckFilter] || deckFilter;
}

export function countForDeck(deckId: string, cards: Card[], savedCount: number, customCount: number): number {
  if (deckId === "saved") return savedCount;
  if (deckId === "all") return cards.length;
  if (deckId === "core") return cards.filter((card) => !card.tags.includes("numbers") && !card.tags.includes("forms")).length;
  if (deckId === "custom") return customCount;
  return cards.filter((card) => card.tags.includes(deckId)).length;
}
