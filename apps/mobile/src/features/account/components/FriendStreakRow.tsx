import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "../../../components/MaterialIcons";
import { useI18n } from "../../../i18n/I18nProvider";
import type { FriendStreak } from "../../../sync";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  friend: FriendStreak;
};

export function FriendStreakRow({ friend }: Props) {
  const { t } = useI18n();
  const name = friend.display_name || friend.friend_code;
  const text = friend.status === "pending" ? t("account.friendPending", { name }) : friend.current_streak === null ? t("account.friendPrivate", { name }) : t("account.friendStreak", { name, count: friend.current_streak ?? 0 });

  return (
    <View style={styles.row}>
      <View style={styles.avatar}><MaterialIcons name={friend.status === "pending" ? "schedule" : "local-fire-department"} size={size.iconSmall} color={colors.iconPrimary} /></View>
      <Text style={styles.muted}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md, borderWidth: spacing.hairline, borderColor: colors.borderSoft, borderRadius: radius.md, backgroundColor: colors.surfaceSecondary, padding: spacing.lg },
  avatar: { width: size.cardAction, height: size.cardAction, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, backgroundColor: colors.primarySoft },
  muted: { flex: 1, color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm }
});
