/// <reference lib="webworker" />
export default null;

declare let self: ServiceWorkerGlobalScope;

import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

// Clean outdated caches
cleanupOutdatedCaches();

// Skip precaching
precacheAndRoute(self.__WB_MANIFEST.filter(() => false));

// Απλός installation
self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  self.skipWaiting(); // Αμέσως activate
});

// Απλός activation
self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
  event.waitUntil(self.clients.claim());
});

// Μόνο για skip waiting από το prompt
self.addEventListener("message", (event: ExtendableMessageEvent) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
