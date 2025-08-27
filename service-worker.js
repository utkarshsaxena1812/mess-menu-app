self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("mess-menu-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// push event (basic)
self.addEventListener("push", event => {
  const data = event.data ? event.data.text() : "New update in Mess Menu!";
  event.waitUntil(
    self.registration.showNotification("Mess Menu", {
      body: data,
      icon: "icons/icon-192.png"
    })
  );
});
