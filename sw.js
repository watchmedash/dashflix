const CACHE = "dashflix-v6";
const OFFLINE = "./offline.html";
const STATIC = [
  "./offline.html",
  "./app.js", "./style.css",
  "./index.html", "./index.css", "./index.js",
  "./movies.html", "./movies.js", "./pages.css",
  "./shows.html", "./shows.js",
  "./watchlist.html", "./watchlist.css", "./watchlist.js",
  "./player.html", "./player.css", "./player.js",
  "./players.html", "./players.js",
  "./person.html", "./person.js",
];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC).catch(() => {})));
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
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(hit =>
        hit || fetch(e.request).catch(() =>
          e.request.mode === "navigate" ? caches.match(OFFLINE) : Response.error()
        )
      )
    );
    return;
  }
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).catch(() => caches.match(OFFLINE)));
  }
});
