// service-worker.js
const CACHE_NAME = 'blogger-offline-cache-v1';
const urlsToCache = [
  '/', // cache homepage
  // add other URLs/resources if needed
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});