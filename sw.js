const VERSION = 'v3';
// event
self.addEventListener('install', event => {
    event.waitUntil(precache())
})

// event handlers
self.addEventListener('fetch', event => {
    const request = event.request;
    // solo get
    if(request.method !== 'GET') {
        return;
    }
    // serh of cache
    event.respondWith(cacheResponse(request));

    // apdata cacheResponse
    event.waitUntil(updateCache(request));
})

// file cache
async function precache() {
    const cache = await caches.open(VERSION)
    return cache.addAll([
        '/',
        '/index.html',
        '/css/style.css',
        '/js/index.js'
    ])
}

async function cacheResponse(request) {
    const cache = await caches.open(VERSION);
    const response = await cache.match(request);
    return response || fetch(request);
}

async function updateCache(request) {
    const cache = await caches.open(VERSION);
    const response = await fetch(request);
    return cache.put(request, response);
}