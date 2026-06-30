import { enAccountAuthTranslations } from "./account/auth";
import { enAccountBadgeTranslations } from "./account/badges";
import { enAccountDeckMembershipTranslations } from "./account/deckMembership";
import { enAccountFriendTranslations } from "./account/friends";
import { enAccountNoticeTranslations } from "./account/notices";
import { enAccountProfileTranslations } from "./account/profile";

export const enAccountTranslations = {
  ...enAccountAuthTranslations,
  ...enAccountProfileTranslations,
  ...enAccountBadgeTranslations,
  ...enAccountFriendTranslations,
  ...enAccountNoticeTranslations,
  ...enAccountDeckMembershipTranslations
} as const;
