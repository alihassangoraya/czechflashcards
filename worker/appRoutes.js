const appRoutePaths = new Set([
  "/",
  "/account",
  "/settings",
  "/index.html",
  "/quiz",
  "/flashcards",
  "/progress",
  "/login",
  "/register",
  "/reset-password"
]);

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function hasFileExtension(pathname) {
  return /\/[^/]+\.[^/]+$/.test(pathname);
}

export function isAppRoute(pathname, method = "GET") {
  if (method !== "GET" && method !== "HEAD") {
    return false;
  }

  const normalizedPath = normalizePath(pathname);
  return appRoutePaths.has(normalizedPath) || !hasFileExtension(normalizedPath);
}
