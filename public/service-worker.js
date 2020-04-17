const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/db.js",
  "/index.js"
];


const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== PRECACHE && key !== RUNTIME) {
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
      caches.open(RUNTIME).then(cache => {
        console.log("daleth");
        return fetch(event.request).then(response => {
          console.log("he");
          if (response.status === 200) {
            cache.put(event.request.url, response.clone());
          }
          return response;
        });
      })
    );
  }
});