const CACHE_NAME = "my-react-pwa-v1";

self.addEventListener("install", (event) => {
    console.log("Service Worker installing.");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Кэшируем только основные файлы
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json'
            ]).catch(error => {
                console.log('Cache error:', error);
            });
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cached) => {
                // Возвращаем кэш или загружаем из сети
                return cached || fetch(event.request);
            })
    );
});