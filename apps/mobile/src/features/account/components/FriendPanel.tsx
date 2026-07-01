import { Pressable, Text, TextInput, View } from "react-native";
import { useI18n } from "../../../i18n/I18nProvider";
import { formatFriendCode } from "../../../sync";
import { colors } from "../../../theme/design";
import { friendPanelStyles as styles } from "./friendPanelStyles";
import type { FriendPanelProps } from "./friendPanelTypes";
import { FriendRequestRow } from "./FriendRequestRow";
import { FriendStreakRow } from "./FriendStreakRow";
import { splitFriendRows } from "./friendPanelModel";

export function FriendPanel({ friendCode, myFriendCode, friendRequests, friends, friendBusy, loadingFriends, onChangeFriendCode, onSendFriendRequest, onRespondToFriendRequest }: FriendPanelProps) {
  const { t } = useI18n();
  const disabled = friendBusy || !friendCode.trim();
  const displayCode = myFriendCode ? formatFriendCode(myFriendCode) : t("account.preparing");
  const rows = splitFriendRows(friends);

  return (
    <View style={styles.panel}>
      <Text style={styles.fieldLabel}>{t("account.friendCode")}</Text>
      <Text selectable style={styles.friendCode}>{displayCode}</Text>
      <TextInput style={styles.input} value={formatFriendCode(friendCode)} onChangeText={onChangeFriendCode} autoCapitalize="characters" placeholder={t("account.friendCodePlaceholder")} placeholderTextColor={colors.textMuted} />
      <Pressable disabled={disabled} style={[styles.secondaryAction, disabled && styles.disabled]} onPress={onSendFriendRequest}><Text style={styles.secondaryActionText}>{friendBusy ? t("account.sendingFriend") : t("account.sendFriend")}</Text></Pressable>
      {loadingFriends && <Text style={styles.muted}>{t("account.loadingFriends")}</Text>}
      {!loadingFriends && !friendRequests.length && !friends.length && <Text style={styles.muted}>{t("account.noFriends")}</Text>}
      {Boolean(friendRequests.length) && <Text style={styles.sectionTitle}>{t("account.incomingRequests")}</Text>}
      {friendRequests.map((request) => <FriendRequestRow key={request.id} request={request} busy={friendBusy} onRespond={onRespondToFriendRequest} />)}
      {Boolean(rows.pending.length) && <Text style={styles.sectionTitle}>{t("account.pendingRequests")}</Text>}
      {rows.pending.map((friend) => <FriendStreakRow key={friend.friend_code} friend={friend} />)}
      {Boolean(rows.accepted.length) && <Text style={styles.sectionTitle}>{t("account.yourFriends")}</Text>}
      {rows.accepted.map((friend) => <FriendStreakRow key={friend.friend_code} friend={friend} />)}
    </View>
  );
}
