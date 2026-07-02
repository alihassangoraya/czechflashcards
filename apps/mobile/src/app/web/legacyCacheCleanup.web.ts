const legacyCachePrefix = "czech-b1-flashcards";

function clearLegacyCaches() {
  if (!("caches" in window)) return Promise.resolve();
  return caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith(legacyCachePrefix)).map((key) => caches.delete(key)))).then(() => undefined);
}

function unregisterServiceWorkers() {
  if (!("serviceWorker" in navigator)) return Promise.resolve();
  return navigator.serviceWorker.getRegistrations().then((registrations) => Promise.all(registrations.map((registration) => registration.unregister()))).then(() => undefined);
}

export function cleanupLegacyWebCache() {
  void Promise.all([clearLegacyCaches(), unregisterServiceWorkers()]).catch(() => undefined);
}
