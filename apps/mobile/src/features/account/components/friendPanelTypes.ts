import type { FriendRequest, FriendStreak } from "../../../sync";

export type FriendPanelProps = {
  friendCode: string;
  myFriendCode: string | null;
  friendRequests: FriendRequest[];
  friends: FriendStreak[];
  friendBusy: boolean;
  loadingFriends: boolean;
  onChangeFriendCode: (value: string) => void;
  onSendFriendRequest: () => void;
  onRespondToFriendRequest: (requestId: string, accepted: boolean) => void;
};
