import React from "react";
import { StyleSheet, Text } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import type { FriendStreak } from "../../../sync";
import { colors, spacing, typography } from "../../../theme/design";

type Props = {
  friend: FriendStreak;
};

export function FriendStreakRow({ friend }: Props) {
  const { t } = useI18n();

  return <Text style={styles.muted}>{t("account.friendStreak", { name: friend.display_name || friend.friend_code, count: friend.current_streak ?? 0 })}</Text>;
}

const styles = StyleSheet.create({
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm }
});
