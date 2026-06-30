import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { colors } from "../../../theme/design";
import { friendPanelStyles as styles } from "./friendPanelStyles";
import type { FriendPanelProps } from "./friendPanelTypes";
import { FriendRequestRow } from "./FriendRequestRow";
import { FriendStreakRow } from "./FriendStreakRow";

export function FriendPanel({ friendCode, myFriendCode, friendRequests, friends, onChangeFriendCode, onSendFriendRequest, onRespondToFriendRequest }: FriendPanelProps) {
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
