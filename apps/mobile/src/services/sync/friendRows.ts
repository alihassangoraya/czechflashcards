import type { FriendRequest, FriendStreak } from "./syncTypes";

type Row = Record<string, unknown>;

export function toFriendRequest(row: Row): FriendRequest {
  return {
    id: String(row.id || ""),
    friend_code: String(row.friend_code || ""),
    display_name: typeof row.display_name === "string" ? row.display_name : null,
    created_at: typeof row.created_at === "string" ? row.created_at : null
  };
}

export function toFriendStreak(row: Row): FriendStreak {
  return {
    friend_code: String(row.friend_code || ""),
    display_name: typeof row.display_name === "string" ? row.display_name : null,
    current_streak: typeof row.current_streak === "number" ? row.current_streak : null,
    longest_streak: typeof row.longest_streak === "number" ? row.longest_streak : null,
    last_completed_on: typeof row.last_completed_on === "string" ? row.last_completed_on : null,
    privacy_level: typeof row.privacy_level === "string" ? row.privacy_level : "private",
    status: row.status === "pending" ? "pending" : "accepted"
  };
}
