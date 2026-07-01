export type FriendStreak = {
  friend_code: string;
  display_name: string | null;
  current_streak: number | null;
  longest_streak: number | null;
  last_completed_on: string | null;
  privacy_level: string;
  status: "accepted" | "pending";
};
