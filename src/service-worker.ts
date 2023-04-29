import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { setCacheNameDetails } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import {
  OFFLINE,
  INDEX_DB,
  BACKGROUND_SYNC,
  WORK_BOX_PRECACHE_IMAGE,
  WORK_BOX_PRECACHE_REQUESTS,
} from './Router/paths';
// @ts-ignore
// self.__WB_MANIFEST

setCacheNameDetails({
  prefix: 'justice',
  suffix: 'v1',
  precache: 'justice-precache',
});

const preCacheUrls = [
  {
    url: INDEX_DB,
    revision: '1',
  },
  {
    url: BACKGROUND_SYNC,
    revision: '2',
  },
  {
    url: WORK_BOX_PRECACHE_IMAGE,
    revision: '3',
  },
  {
    url: WORK_BOX_PRECACHE_REQUESTS,
    revision: '4',
  },
  {
    url: OFFLINE,
    revision: '5',
  },
];

precacheAndRoute(preCacheUrls);

registerRoute(
  ({ request }) => request.destination === 'image', // кешируем все изображения
  new CacheFirst({
    cacheName: 'images',
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

registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style', // кушируем скрипты и стили
  new StaleWhileRevalidate({
    cacheName: 'sripts-styles',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

registerRoute(
  // проверяем, что запрос - это переход на новую страницу
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    // помещаем все файлы в кэш с названием 'pages'
    cacheName: 'pages',
    plugins: [
      // кэшируем только результаты со статусом 200
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

// self.addEventListener('install', () => {
//   console.log('==========>install');
// });

// self.addEventListener('activate', () => {
//   console.log('==========>activate');
// });

export {};
