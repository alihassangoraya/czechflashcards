import type { MaterialIconName } from "../../../components/MaterialIcons";
import type { TranslationKey } from "../../../i18n/translations";
import type { AccountStudySummary } from "../accountTypes";

export type AccountBadge = {
  icon: MaterialIconName;
  title: TranslationKey;
  label: TranslationKey;
  unlocked: boolean;
};

export const buildAccountBadges = (summary: AccountStudySummary): AccountBadge[] => [
  { icon: "trending-up", title: "account.badgeFirst", label: "account.badgeFirstCopy", unlocked: summary.studiedCount >= 1 },
  { icon: "star", title: "account.badgeStarred", label: "account.badgeStarredCopy", unlocked: summary.savedCount >= 5 },
  { icon: "check-circle", title: "account.badgeDueClear", label: "account.badgeDueClearCopy", unlocked: summary.deckTotal > 0 && summary.dueCount === 0 },
  { icon: "star", title: "account.badgeMastery", label: "account.badgeMasteryCopy", unlocked: summary.masteredCount >= 10 }
];
