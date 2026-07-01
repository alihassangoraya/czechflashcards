export function isFriendRpcSchemaError(error: unknown) {
  return error instanceof Error && /friend_requests|friend_streaks|ensure_profile|profiles|friendships|schema cache|PGRST202|PGRST205|404|function public|relation .* does not exist/i.test(error.message);
}

export function rpcErrorMessage(error: { code?: string; message: string }) {
  return `${error.code || ""} ${error.message}`;
}
