export {
  createSupabaseClient,
  flushSyncQueue,
  getFriendCode,
  loadFriendActivity,
  respondToFriendRequest,
  restoreSyncSnapshot,
  sendFriendRequest,
  signInWithPassword,
  signOut,
  signUpWithPassword
} from "./services/sync";

export type { AppSupabaseClient, AuthMode, FriendRequest, FriendStreak, SupabaseClient, SyncStatus } from "./services/sync";
