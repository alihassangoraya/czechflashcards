const appRoutePaths = new Set([
  "/",
  "/index.html",
  "/quiz",
  "/flashcards",
  "/login",
  "/register"
]);

export function isAppRoute(pathname) {
  return appRoutePaths.has(pathname);
}
