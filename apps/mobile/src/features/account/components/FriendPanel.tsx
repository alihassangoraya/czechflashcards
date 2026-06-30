import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import type { FriendRequest, FriendStreak } from "../../../sync";
import { colors, radius, size, spacing, typography } from "../../../theme/design";
import { FriendRequestRow } from "./FriendRequestRow";
import { FriendStreakRow } from "./FriendStreakRow";

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
      {friendRequests.map((request) => <FriendRequestRow key={request.id} request={request} onRespond={onRespondToFriendRequest} />)}
      {friends.map((friend) => <FriendStreakRow key={friend.friend_code} friend={friend} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { gap: spacing.lg, backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, padding: spacing.xlPlus },
  fieldLabel: { color: colors.textMuted, fontSize: typography.label, fontWeight: typography.weightMedium, textTransform: "uppercase", marginTop: spacing.sm },
  friendCode: { color: colors.textDeep, fontSize: size.iconMedium, fontWeight: typography.weightBold },
  input: { backgroundColor: colors.surface, borderWidth: spacing.hairline, borderColor: colors.border, borderRadius: radius.md, color: colors.textStrong, padding: spacing.xlPlus, fontSize: typography.bodyLarge },
  secondaryAction: { alignItems: "center", justifyContent: "center", borderWidth: spacing.hairline, borderColor: colors.action, borderRadius: radius.md, paddingVertical: spacing.lgPlus, paddingHorizontal: spacing.xlPlus, backgroundColor: colors.surface },
  secondaryActionText: { color: colors.action, fontWeight: typography.weightSemibold }
});
