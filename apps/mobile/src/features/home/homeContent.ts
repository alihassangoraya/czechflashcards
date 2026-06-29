import type { Card } from "@czech-flashcards/shared";
import type { MaterialIconName } from "../../components/MaterialIcons";
import { colors } from "../../theme/design";

export type Category = { id: string; title: string; icon: MaterialIconName; color: string; count?: number };
export type GuideItem = { icon: MaterialIconName; text: string };

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
  { icon: "touch-app", text: "Tap the card to reveal meanings, examples, and word details." },
  { icon: "arrow-back", text: "Swipe left or press Again to see a word again after 10-15 other cards." },
  { icon: "arrow-forward", text: "Swipe right or press Known when a word feels familiar." },
  { icon: "volume-up", text: "Use the audio buttons to hear the Czech word and example." },
  { icon: "undo", text: "Use Undo on the Czech side if you reviewed the previous card by mistake." },
  { icon: "star", text: "Star important cards to keep them in My List." },
  { icon: "search", text: "Use search to find a word, + to add one, and settings to choose your deck." },
  { icon: "quiz", text: "Use Quiz for quick recall practice after reviewing your due cards." }
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
