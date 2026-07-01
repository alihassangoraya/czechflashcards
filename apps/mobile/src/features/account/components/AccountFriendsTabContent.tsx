import React from "react";
import type { AccountPanelState } from "../hooks/accountPanelStateTypes";
import { FriendPanel } from "./FriendPanel";

type Props = {
  account: AccountPanelState;
};

export function AccountFriendsTabContent({ account }: Props) {
  return (
    <FriendPanel
      friendCode={account.friendCode}
      myFriendCode={account.myFriendCode}
      friendSetupUnavailable={account.friendSetupUnavailable}
      friendRequests={account.friendRequests}
      friends={account.friends}
      friendBusy={account.friendBusy}
      loadingFriends={account.loadingFriends}
      onChangeFriendCode={account.setFriendCode}
      onSendFriendRequest={() => void account.sendFriend()}
      onRespondToFriendRequest={(requestId, accepted) => void account.respondToRequest(requestId, accepted)}
    />
  );
}
