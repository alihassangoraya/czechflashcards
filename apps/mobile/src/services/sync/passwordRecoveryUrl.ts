type RecoveryTokens = {
  accessToken?: string | null;
  refreshToken?: string | null;
  code?: string | null;
};

function browserUrl(): URL | null {
  if (typeof window === "undefined" || !window.location?.href) return null;
  return new URL(window.location.href);
}

export function passwordRecoveryTokens(): RecoveryTokens {
  const url = browserUrl();
  if (!url) return {};
  const hash = new URLSearchParams(url.hash.startsWith("#") ? url.hash.slice(1) : url.hash);
  return {
    code: url.searchParams.get("code") || hash.get("code"),
    accessToken: hash.get("access_token"),
    refreshToken: hash.get("refresh_token")
  };
}

export function isPasswordRecoveryUrl() {
  const url = browserUrl();
  if (!url) return false;
  const hash = new URLSearchParams(url.hash.startsWith("#") ? url.hash.slice(1) : url.hash);
  return url.searchParams.get("type") === "recovery" || hash.get("type") === "recovery" || Boolean(passwordRecoveryTokens().code || passwordRecoveryTokens().accessToken);
}

export function clearPasswordRecoveryUrl() {
  const url = browserUrl();
  if (!url || typeof window === "undefined") return;
  ["code", "type"].forEach((key) => url.searchParams.delete(key));
  url.hash = "";
  window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}`);
}
