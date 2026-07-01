import type { AppSupabaseClient } from "./supabaseClient";
import type { FriendRequest, FriendStreak } from "./syncTypes";
import { isFriendRpcSchemaError, rpcErrorMessage } from "./friendErrors";
import { normalizeFriendCode } from "./friendCode";
import { loadFriendActivityFallback } from "./friendFallback";
import { respondToFriendRequestFallback, sendFriendRequestFallback } from "./friendMutationFallback";
import { loadFriendActivityRpc } from "./friendRpc";
const missingConfigMessage = "Supabase is not configured for this build.";

export async function sendFriendRequest(supabase: AppSupabaseClient, friendCode: string): Promise<string | null> {
  if (!supabase) return missingConfigMessage;
  const code = normalizeFriendCode(friendCode);
  if (!code) return "Enter a friend code.";
  const { error } = await supabase.rpc("send_friend_request", { target_friend_code: code });
  if (error && isFriendRpcSchemaError(new Error(rpcErrorMessage(error)))) return sendFriendRequestFallback(supabase, code);
  return error?.message || null;
}

export async function loadFriendActivity(supabase: AppSupabaseClient): Promise<{ requests: FriendRequest[]; friends: FriendStreak[] }> {
  if (!supabase) return { requests: [], friends: [] };
  try {
    return await loadFriendActivityRpc(supabase);
  } catch (error) {
    if (!isFriendRpcSchemaError(error)) throw error;
    return loadFriendActivityFallback(supabase);
  }
}

export async function respondToFriendRequest(supabase: AppSupabaseClient, requestId: string, accept: boolean): Promise<string | null> {
  if (!supabase) return missingConfigMessage;
  const { error } = await supabase.rpc("respond_to_friend_request", { request_id: requestId, accept_request: accept });
  if (error && isFriendRpcSchemaError(new Error(rpcErrorMessage(error)))) return respondToFriendRequestFallback(supabase, requestId, accept);
  return error?.message || null;
}
