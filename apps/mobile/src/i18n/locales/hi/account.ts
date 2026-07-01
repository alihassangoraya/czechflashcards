import { hiAccountAuthTranslations } from "./account/auth";
import { hiAccountBadgeTranslations } from "./account/badges";
import { hiAccountDeckMembershipTranslations } from "./account/deckMembership";
import { hiAccountFriendTranslations } from "./account/friends";
import { hiAccountNoticeTranslations } from "./account/notices";
import { hiAccountProfileTranslations } from "./account/profile";

export const hiAccountTranslations = {
  ...hiAccountAuthTranslations,
  ...hiAccountProfileTranslations,
  ...hiAccountBadgeTranslations,
  ...hiAccountFriendTranslations,
  ...hiAccountNoticeTranslations,
  ...hiAccountDeckMembershipTranslations
} as const;
