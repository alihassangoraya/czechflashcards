import type { FriendRequest, FriendStreak } from "../../../sync";

export type FriendPanelProps = {
  friendCode: string;
  myFriendCode: string | null;
  friendRequests: FriendRequest[];
  friends: FriendStreak[];
  onChangeFriendCode: (value: string) => void;
  onSendFriendRequest: () => void;
  onRespondToFriendRequest: (requestId: string, accepted: boolean) => void;
};
