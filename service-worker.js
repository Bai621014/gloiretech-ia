const CACHE_NAME = 'gloiretech-ia-static-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './assets/icons/icon-192.svg',
  './assets/icons/icon-512.svg',
  './config/modules.json',
  './modules/gloire-core.js',
  './modules/velox.js',
  './modules/mnemos.js',
  './modules/autonomia.js',
  './modules/gnosis.js',
  './modules/harmonia.js',
  './modules/lumen.js',
  './modules/aurelis.js',
  './modules/gloire-commerce.js',
  './modules/gloire-finance.js',
  './modules/gloire-engineering.js',
  './modules/gloire-studio.js',
  './modules/gloire-assistant.js',
  './utils/security.js',
  './utils/payments.js',
  './utils/abstraction.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch((error) => {
      console.warn('SW install failed:', error);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      }).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return new Response('Connexion indisponible', {
          status: 503,
          headers: { 'Content-Type': 'text/plain;charset=utf-8' }
        });
      });
    })
  );
});
