export {
  createSupabaseClient,
  flushSyncQueue,
  getFriendCode,
  loadFriendActivity,
  respondToFriendRequest,
  restoreSyncSnapshot,
  sendFriendRequest,
  signInWithOAuthProvider,
  signInWithPassword,
  signOut,
  signUpWithPassword
} from "./services/sync";

export type { AppSupabaseClient, AuthMode, AuthProvider, FriendRequest, FriendStreak, SupabaseClient, SyncStatus } from "./services/sync";
