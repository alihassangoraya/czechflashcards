import type { FriendStreak } from "../../../sync";

export function splitFriendRows(friends: FriendStreak[]) {
  return {
    pending: friends.filter((friend) => friend.status === "pending"),
    accepted: friends.filter((friend) => friend.status === "accepted")
  };
}
