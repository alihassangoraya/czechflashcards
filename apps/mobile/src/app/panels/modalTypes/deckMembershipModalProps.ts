import type { AppPanelProps } from "../panelTypes";

export type DeckMembershipModalProps = Pick<
  AppPanelProps,
  | "panel"
  | "settings"
  | "deckMemberships"
  | "deckManagementCard"
  | "onSetPanel"
  | "onSetDeckManagementCard"
  | "onAddCardToDeck"
  | "onRemoveCardFromDeck"
>;
