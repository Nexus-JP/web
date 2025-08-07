// sw.js
self.addEventListener('install', event => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.pathname === '/api/status') {
    return event.respondWith(new Response(JSON.stringify({
      status: 'ok',
      time: new Date().toISOString()
    }), { headers: { 'Content-Type': 'application/json' } }));
  }

  if (url.pathname === '/api/version') {
    return event.respondWith(new Response(JSON.stringify({
      version: '1.0.0',
      api: 'mock'
    }), { headers: { 'Content-Type': 'application/json' } }));
  }

  return event.respondWith(fetch(event.request));
});
