// Sempre que alterar ficheiros, mude a versão (v1 → v2…) e volte a publicar.
const CACHE = 'fisio-ipad-v2';
const FICHEIROS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './fichas/joelho.html', './fichas/anca.html', './fichas/ombro.html', './fichas/tornozelo-pe.html'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHEIROS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request).then(res => { const c = res.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); return res; }).catch(() => caches.match('./index.html'))));
});
