export { signInWithPassword, signOut, signUpWithPassword } from "./authService";
export { deleteAccount, sendPasswordReset } from "./accountLifecycleService";
export { consumePasswordRecoverySession, updateRecoveredPassword } from "./passwordRecoveryService";
export { signInWithOAuthProvider } from "./oauthService";
export { loadFriendActivity, respondToFriendRequest, sendFriendRequest } from "./friendService";
export { formatFriendCode, normalizeFriendCode } from "./friendCode";
export { getFriendCode } from "./friendProfile";
export { flushSyncQueue } from "./queueSyncService";
export { restoreSyncSnapshot } from "./snapshotService";
export { createSupabaseClient } from "./supabaseClient";

export type { AppSupabaseClient, SupabaseClient } from "./supabaseClient";
export type { AuthMode, AuthProvider, FriendRequest, FriendStreak, SyncStatus } from "./syncTypes";
