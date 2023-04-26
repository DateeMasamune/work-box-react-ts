import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
// import { precacheAndRoute } from 'workbox-precaching';
// @ts-ignore
// precacheAndRoute(self?.__WB_MANIFEST);
// разобраться с ошибкой  Can't find self.__WB_MANIFEST in your SW source.

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

self.addEventListener('install', () => {
  console.log('==========>install');
});

self.addEventListener('activate', () => {
  console.log('==========>activate');
});

export {};
