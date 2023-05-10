import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { setCacheNameDetails } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { Queue } from 'workbox-background-sync';
import {
  OFFLINE,
  INDEX_DB,
  BACKGROUND_SYNC,
  WORK_BOX_PRECACHE_IMAGE,
  THREAD,
} from './Router/paths';
// @ts-ignore
// self.__WB_MANIFEST

const queue = new Queue('justiceQueue');

setCacheNameDetails({
  prefix: 'justice',
  suffix: 'v1',
  precache: 'precache',
});

const preCacheUrls = [
  {
    url: INDEX_DB,
    revision: '1', // Версионирование позволяет рассматриваемому модулю определять необходимость обновления кешированного ресурса.
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
    url: THREAD,
    revision: '4',
  },
  {
    url: OFFLINE,
    revision: '5',
  },
];

const resolveUrls = ['https://jsonplaceholder.typicode.com/posts?_limit=3'];

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
        maxAgeSeconds: 1 * 60 * 60, // 1час
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style', // кешируем скрипты и стили
  new StaleWhileRevalidate({
    cacheName: 'sripts-styles',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        // ограничиваем время хранения ресурсов в кеше
        maxAgeSeconds: 1 * 60 * 60, // 1час
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
      new ExpirationPlugin({
        // ограничиваем время хранения ресурсов в кеше
        maxAgeSeconds: 1 * 60 * 60, // 1час
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => resolveUrls.some((resolve) => resolve.includes(url.href)), // кешируем запросы
  new StaleWhileRevalidate({
    cacheName: 'resolve-requests',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        // ограничиваем время хранения ресурсов в кеше
        maxAgeSeconds: 1 * 60 * 60, // 1час
      }),
    ],
  }),
);

self.addEventListener('fetch', async (event) => {
  // Клонируем запрос для безопасного чтения
  // при добавлении в очередь
  // @ts-ignore
  const promiseChain = fetch(event.request.clone())
  // @ts-ignore
    .catch(async () => queue.pushRequest({ request: event.request }));
  // @ts-ignore
  // сообщает браузеру, что работа продолжается до тех пор, пока обещание не будет выполнено
  event.waitUntil(promiseChain);
});

// Логика для обмена сообщениями между сервис воркером и фронтом

// async function postSuccessMessage(response) {
//   // @ts-ignore
//   const clients = await self.clients.matchAll();
//   // @ts-ignore
//   for (const client of clients) {
//     // Customize this message format as you see fit.
//     client.postMessage({
//       type: 'REPLAY_SUCCESS',
//       url: response,
//     });
//   }
// }

// async function onSync() {
//   let entry;
//   // @ts-ignore
//   while (entry = await this.shiftRequest()) {
//     try {
//       // @ts-ignore
//       const response = await fetch(entry.request);
//       const clone = JSON.parse(JSON.stringify(response));
//       // Do custom *INNER* processing (eg decrease my applicative counter by one)
//       postSuccessMessage(clone);
//       console.log('Extra feature for request', entry.request.url);
//     } catch (error) {
//       // @ts-ignore
//       await this.unshiftRequest(entry);
//       throw error;
//     }
//   }
//   console.log('Replay complete!');
// }

// Логика для обмена сообщениями между сервис воркером и фронтом

export {};
