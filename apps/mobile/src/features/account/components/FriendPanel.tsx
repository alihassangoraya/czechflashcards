import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import type { FriendRequest, FriendStreak } from "../../../sync";
import { colors, radius, size, spacing, typography } from "../../../theme/design";

type Props = {
  friendCode: string;
  myFriendCode: string | null;
  friendRequests: FriendRequest[];
  friends: FriendStreak[];
  onChangeFriendCode: (value: string) => void;
  onSendFriendRequest: () => void;
  onRespondToFriendRequest: (requestId: string, accepted: boolean) => void;
};

export function FriendPanel({ friendCode, myFriendCode, friendRequests, friends, onChangeFriendCode, onSendFriendRequest, onRespondToFriendRequest }: Props) {
  const { t } = useI18n();

  return (
    <View style={styles.panel}>
      <Text style={styles.fieldLabel}>{t("account.friendCode")}</Text>
      <Text style={styles.friendCode}>{myFriendCode || t("account.preparing")}</Text>
      <TextInput style={styles.input} value={friendCode} onChangeText={onChangeFriendCode} autoCapitalize="none" placeholder={t("account.friendCodePlaceholder")} placeholderTextColor={colors.textMuted} />
      <Pressable style={styles.secondaryAction} onPress={onSendFriendRequest}><Text style={styles.secondaryActionText}>{t("account.sendFriend")}</Text></Pressable>
      {friendRequests.map((request) => (
        <View key={request.id} style={styles.friendRow}>
          <Text style={styles.muted}>{t("account.friendRequest", { name: request.display_name || request.friend_code })}</Text>
          <View style={styles.friendActions}>
            <Pressable style={styles.smallAction} onPress={() => onRespondToFriendRequest(request.id, true)}><Text style={styles.secondaryActionText}>{t("account.accept")}</Text></Pressable>
            <Pressable style={styles.smallAction} onPress={() => onRespondToFriendRequest(request.id, false)}><Text style={styles.secondaryActionText}>{t("account.decline")}</Text></Pressable>
          </View>
        </View>
      ))}
      {friends.map((friend) => <Text key={friend.friend_code} style={styles.muted}>{t("account.friendStreak", { name: friend.display_name || friend.friend_code, count: friend.current_streak ?? 0 })}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { gap: spacing.lg, backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, padding: spacing.xlPlus },
  fieldLabel: { color: colors.textMuted, fontSize: typography.label, fontWeight: typography.weightMedium, textTransform: "uppercase", marginTop: spacing.sm },
  friendCode: { color: colors.textDeep, fontSize: size.iconMedium, fontWeight: typography.weightBold, letterSpacing: 1.5 },
  input: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, color: colors.textStrong, padding: spacing.xlPlus, fontSize: typography.bodyLarge },
  secondaryAction: { alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, paddingVertical: spacing.lgPlus, paddingHorizontal: spacing.xlPlus, backgroundColor: colors.surface },
  secondaryActionText: { color: colors.action, fontWeight: typography.weightSemibold },
  friendRow: { gap: spacing.lg, borderTopWidth: spacing.hairline, borderTopColor: colors.surfaceMuted, paddingTop: spacing.lgPlus },
  friendActions: { flexDirection: "row", gap: spacing.lg },
  smallAction: { flex: 1, alignItems: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, paddingVertical: spacing.lg, backgroundColor: colors.surface },
  muted: { color: colors.textMuted, lineHeight: typography.bodyLarge + spacing.sm }
});
