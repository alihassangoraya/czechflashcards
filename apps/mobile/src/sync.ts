export { signInWithPassword, signOut, signUpWithPassword } from "./services/sync/authService";
export { getFriendCode, loadFriendActivity, respondToFriendRequest, sendFriendRequest } from "./services/sync/friendService";
export { flushSyncQueue } from "./services/sync/queueSyncService";
export { restoreSyncSnapshot } from "./services/sync/snapshotService";
export { createSupabaseClient } from "./services/sync/supabaseClient";

export type { AppSupabaseClient, SupabaseClient } from "./services/sync/supabaseClient";
export type { AuthMode, FriendRequest, FriendStreak, SyncStatus } from "./services/sync/syncTypes";
