const CACHE = 'oblique-v20';
const ASSETS = ['/', '/index.html', '/manifest.json',
                '/favicon.svg', '/favicon.ico', '/favicon-96x96.png',
                '/apple-touch-icon.png',
                '/icons/icon-192.png', '/icons/icon-512.png',
                '/social-card.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e =>
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  )
);

self.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
);
