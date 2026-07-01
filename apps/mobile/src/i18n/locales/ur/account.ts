import { urAccountAuthTranslations } from "./account/auth";
import { urAccountBadgeTranslations } from "./account/badges";
import { urAccountDeckMembershipTranslations } from "./account/deckMembership";
import { urAccountFriendTranslations } from "./account/friends";
import { urAccountNoticeTranslations } from "./account/notices";
import { urAccountProfileTranslations } from "./account/profile";

export const urAccountTranslations = {
  ...urAccountAuthTranslations,
  ...urAccountProfileTranslations,
  ...urAccountBadgeTranslations,
  ...urAccountFriendTranslations,
  ...urAccountNoticeTranslations,
  ...urAccountDeckMembershipTranslations
} as const;
