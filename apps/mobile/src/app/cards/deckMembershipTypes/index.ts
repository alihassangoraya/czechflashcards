import type { DeckMembershipDataProps } from "./deckMembershipDataProps";
import type { DeckMembershipFeedbackProps } from "./deckMembershipFeedbackProps";
import type { DeckMembershipStateProps } from "./deckMembershipStateProps";

export type DeckMembershipActionProps =
  DeckMembershipDataProps &
  DeckMembershipStateProps &
  DeckMembershipFeedbackProps;
