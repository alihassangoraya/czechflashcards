export function isFriendRpcSchemaError(error: unknown) {
  return error instanceof Error && /friend_requests|friend_streaks|schema cache|PGRST202|function public/i.test(error.message);
}

export function rpcErrorMessage(error: { code?: string; message: string }) {
  return `${error.code || ""} ${error.message}`;
}
