import type { FriendRequest, FriendStreak, SyncStatus } from "../../../sync";

export type SignedInAccountContentProps = {
  accountEmail: string;
  busy: boolean;
  syncStatus: SyncStatus;
  onSyncNow: () => void;
};

export type SignedInAccountProps = Pick<SignedInAccountContentProps, "accountEmail" | "busy"> & {
  accountEmail: string;
  busy: boolean;
  friendCode: string;
  myFriendCode: string | null;
  friendRequests: FriendRequest[];
  friends: FriendStreak[];
  friendBusy: boolean;
  loadingFriends: boolean;
  message: string;
  onChangeFriendCode: (value: string) => void;
  onSendFriendRequest: () => void;
  onRespondToFriendRequest: (requestId: string, accepted: boolean) => void;
  onSignOut: () => void;
};
