export {
  createSupabaseClient,
  consumePasswordRecoverySession,
  deleteAccount,
  flushSyncQueue,
  formatFriendCode,
  getFriendCode,
  loadFriendActivity,
  normalizeFriendCode,
  respondToFriendRequest,
  restoreSyncSnapshot,
  sendFriendRequest,
  sendPasswordReset,
  signInWithOAuthProvider,
  signInWithPassword,
  signOut,
  signUpWithPassword,
  updateRecoveredPassword
} from "./services/sync";

export type { AppSupabaseClient, AuthMode, AuthProvider, FriendRequest, FriendStreak, SupabaseClient, SyncStatus } from "./services/sync";
