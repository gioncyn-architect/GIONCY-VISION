const CACHE_NAME = 'gioncyn-vision-v2';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './logo-vg.png'
];

// Tahap Instalasi: Menyimpan file ke Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets premium...');
      return cache.addAll(assets);
    })
  );
});

// Tahap Aktivasi: Menghapus cache lama jika ada update
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Tahap Fetch: Mengambil data dari cache untuk kecepatan maksimal
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
