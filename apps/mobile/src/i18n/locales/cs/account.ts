import { csAccountAuthTranslations } from "./account/auth";
import { csAccountBadgeTranslations } from "./account/badges";
import { csAccountDeckMembershipTranslations } from "./account/deckMembership";
import { csAccountFriendTranslations } from "./account/friends";
import { csAccountNoticeTranslations } from "./account/notices";
import { csAccountProfileTranslations } from "./account/profile";

export const csAccountTranslations = {
  ...csAccountAuthTranslations,
  ...csAccountProfileTranslations,
  ...csAccountBadgeTranslations,
  ...csAccountFriendTranslations,
  ...csAccountNoticeTranslations,
  ...csAccountDeckMembershipTranslations
} as const;
