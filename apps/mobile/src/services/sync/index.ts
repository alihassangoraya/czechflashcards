export { signInWithPassword, signOut, signUpWithPassword } from "./authService";
export { signInWithOAuthProvider } from "./oauthService";
export { getFriendCode, loadFriendActivity, respondToFriendRequest, sendFriendRequest } from "./friendService";
export { flushSyncQueue } from "./queueSyncService";
export { restoreSyncSnapshot } from "./snapshotService";
export { createSupabaseClient } from "./supabaseClient";

export type { AppSupabaseClient, SupabaseClient } from "./supabaseClient";
export type { AuthMode, AuthProvider, FriendRequest, FriendStreak, SyncStatus } from "./syncTypes";
