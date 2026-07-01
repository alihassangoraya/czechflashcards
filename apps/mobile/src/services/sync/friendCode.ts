export function normalizeFriendCode(friendCode: string) {
  return friendCode.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function formatFriendCode(friendCode: string) {
  const code = normalizeFriendCode(friendCode).toUpperCase();
  return code.replace(/(.{4})(?=.)/g, "$1-");
}
