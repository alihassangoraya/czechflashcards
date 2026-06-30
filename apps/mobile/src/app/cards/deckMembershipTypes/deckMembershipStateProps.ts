import type { Panel } from "../../appTypes";
import type { DeckMemberships } from "../deckMembershipState";

export type DeckMembershipStateProps = {
  setDeckMemberships: (deckMemberships: DeckMemberships | ((previous: DeckMemberships) => DeckMemberships)) => void;
  setPanel: (panel: Panel | null) => void;
};
