const CACHE = "dashflix-v2";
const PRECACHE = [
  "./",
  "./index.html",
  "./movies.html",
  "./shows.html",
  "./watchlist.html",
  "./about.html",
  "./contact.html",
  "./offline.html",
  "./app.js",
  "./index.js",
  "./movies.js",
  "./shows.js",
  "./watchlist.js",
  "./style.css",
  "./index.css",
  "./logo.png",
  "./manifest.json",
];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE).catch(() => {}))
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        if (e.request.destination === "document") return caches.match("./offline.html");
        return Response.error();
      });
    })
  );
});
