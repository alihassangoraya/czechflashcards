import type { AppPanelProps } from "../panelTypes/index";

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
