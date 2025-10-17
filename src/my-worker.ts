/// <reference lib="webworker" />
export default null; // Ensures it's treated as a module

declare let self: ServiceWorkerGlobalScope;

import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

// ✅ Installation phase
self.addEventListener("install", () => {
  self.skipWaiting();
});

// ✅ Activation phase
self.addEventListener("activate", (event) => {
  console.log("Hi Vaios service worker");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(cacheNames.map((cache) => caches.delete(cache)))
      )
  );
});

// ✅ Message listener (for manual skipWaiting requests)
self.addEventListener("message", (event: ExtendableMessageEvent) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// ✅ Precache (disabled in your case — but kept for reference)
precacheAndRoute(self.__WB_MANIFEST.filter(() => false));

// ✅ Clean outdated caches
cleanupOutdatedCaches();

// ✅ Offline navigation (if you want SPA fallback)
// registerRoute(new NavigationRoute(createHandlerBoundToURL("index.html")));
