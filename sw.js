importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

// const CACHE_NAME = "kabarbola-v2";
// var urlsToCache = [
//     "/",
//     "/nav.html",
//     "/index.html",
//     "/pages/home.html",
//     "/pages/daftartim.html",
//     "/pages/klasmenall.html",
//     "/pages/timfavorit.html",
//     "/pages/topskor.html",
//     "/tim.html",
//     "css/materialize.min.css",
//     "js/materialize.min.js",
//     "js/nav.js",
//     "js/api.js",
//     "js/db.js",
//     "js/idb.js",
//     "https://fonts.googleapis.com/icon?family=Material+Icons",
//     "/manifest.json",
//     "/icon.png",
//     "/apple-touch-icon.png",
//     "/icon-512x512.png",
// ]

if (workbox) {
  console.log("Workbox berhasil dimuat");
} else {
  console.log("Workbox gagal dimuat");
}

workbox.precaching.precacheAndRoute([
  {url: '/nav.html', revision: '1'},
  {url: '/index.html', revision: '1'},
  {url: '/tim.html', revision: '1'},
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/index.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/index.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/tim.js', revision: '1' },
  { url: '/js/register_tim.js', revision: '1' },
  { url: '/js/register_index.js', revision: '1' },
  {url: '/manifest.json', revision: '1'},
]);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|ico)$/,
  workbox.strategies.cacheFirst()
);


workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      }),
    ],
  })
)

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

// self.addEventListener("install", function(event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function(cache) {
//             return cache.addAll(urlsToCache);
//         })
//     )
// })

// self.addEventListener("fetch", function(event) {
//     var base_url = "https://api.football-data.org/v2/";
  
//     if (event.request.url.indexOf(base_url) > -1) {
//       event.respondWith(
//         caches.open(CACHE_NAME).then(function(cache) {
//           return fetch(event.request).then(function(response) {
//             cache.put(event.request.url, response.clone());
//             return response;
//           })
//         })
//       );
//     } else {
//       event.respondWith(
//         caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//           return response || fetch (event.request);
//         })
//       )
//     }
//   });

// self.addEventListener("activate", function(event) {
//     event.waitUntil(
//         caches.keys()
//         .then(function(cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function(cacheName) {
//                     if (cacheName != CACHE_NAME) {
//                         console.log("ServiceWorker: cache " + cacheName + " dihapus");
//                         return caches.delete(cacheName);
//                     }
//                 })
//             )
//         }
//     ))
// })

// self.addEventListener('push', function(event) {
//   var body;
//   if (event.data) {
//     body = event.data.text();
//   } else {
//     body = 'Push message no payload';
//   }
//   var options = {
//     body: body,
//     icon: 'img/notification.png',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1
//     }
//   };
//   event.waitUntil(
//     self.registration.showNotification('Push Notification', options)
//   );
// });