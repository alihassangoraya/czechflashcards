const legacyCachePrefix = "czech-b1-flashcards";
const cleanupReloadKey = "czechFlashcards.legacyCacheCleanupReloaded";

function clearLegacyCaches(): Promise<boolean> {
  if (!("caches" in window)) return Promise.resolve(false);
  return caches.keys().then((keys) => {
    const legacyKeys = keys.filter((key) => key.startsWith(legacyCachePrefix));
    if (!legacyKeys.length) return false;
    return Promise.all(legacyKeys.map((key) => caches.delete(key))).then(() => true);
  });
}

function unregisterServiceWorkers(): Promise<boolean> {
  if (!("serviceWorker" in navigator)) return Promise.resolve(false);
  return navigator.serviceWorker.getRegistrations().then((registrations) => {
    if (!registrations.length) return false;
    return Promise.all(registrations.map((registration) => registration.unregister())).then(() => true);
  });
}

function reloadOnceAfterCleanup(cleaned: boolean) {
  if (!cleaned) return;
  if (sessionStorage.getItem(cleanupReloadKey) === "1") return;
  sessionStorage.setItem(cleanupReloadKey, "1");
  window.location.reload();
}

export function cleanupLegacyWebCache() {
  void Promise.all([clearLegacyCaches(), unregisterServiceWorkers()])
    .then((results) => reloadOnceAfterCleanup(results.some(Boolean)))
    .catch(() => undefined);
}
