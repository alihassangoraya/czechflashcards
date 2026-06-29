export type SyncStatus = "guest" | "not-configured" | "idle" | "synced" | "error";

export type FriendRequest = {
  id: string;
  friend_code: string;
  display_name: string | null;
};

export type FriendStreak = {
  friend_code: string;
  display_name: string | null;
  current_streak: number | null;
  privacy_level: string;
};
