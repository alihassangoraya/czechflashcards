import { ukAccountAuthTranslations } from "./account/auth";
import { ukAccountBadgeTranslations } from "./account/badges";
import { ukAccountDeckMembershipTranslations } from "./account/deckMembership";
import { ukAccountFriendTranslations } from "./account/friends";
import { ukAccountNoticeTranslations } from "./account/notices";
import { ukAccountProfileTranslations } from "./account/profile";

export const ukAccountTranslations = {
  ...ukAccountAuthTranslations,
  ...ukAccountProfileTranslations,
  ...ukAccountBadgeTranslations,
  ...ukAccountFriendTranslations,
  ...ukAccountNoticeTranslations,
  ...ukAccountDeckMembershipTranslations
} as const;
