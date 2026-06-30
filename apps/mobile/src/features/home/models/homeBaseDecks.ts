import { colors } from "../../../theme/design";
import type { Category } from "../types/homeCategoryTypes";

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
