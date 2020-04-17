const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/db.js",
  "/index.js"
];


const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            return caches.delete(key);
          }
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  console.log("aleph");
  if (event.request.url.includes("/api/")) {
    console.log("beth");
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        console.log("daleth");
        return fetch(event.request).then(response => {
          console.log("he");
          if (response.status === 200) {
            cache.put(evt.request.url, response.clone());
          }
          return response;
        });
      })
    );
  }
});