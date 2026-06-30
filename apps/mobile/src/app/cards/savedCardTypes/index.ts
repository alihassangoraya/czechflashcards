import type { SavedCardDataProps } from "./savedCardDataProps";
import type { SavedCardFeedbackProps } from "./savedCardFeedbackProps";
import type { SavedCardStateProps } from "./savedCardStateProps";

export type SavedCardActionProps =
  SavedCardDataProps &
  SavedCardStateProps &
  SavedCardFeedbackProps;
