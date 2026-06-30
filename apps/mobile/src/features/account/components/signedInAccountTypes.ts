import type { FriendRequest, FriendStreak } from "../../../sync";

export type SignedInAccountProps = {
  accountEmail: string;
  busy: boolean;
  friendCode: string;
  myFriendCode: string | null;
  friendRequests: FriendRequest[];
  friends: FriendStreak[];
  message: string;
  onChangeFriendCode: (value: string) => void;
  onSendFriendRequest: () => void;
  onRespondToFriendRequest: (requestId: string, accepted: boolean) => void;
  onSignOut: () => void;
};
