self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.pathname === '/api/status') {
    event.respondWith(new Response(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    }));
    return;
  }

  // それ以外は通常通りネットワークに流す
  event.respondWith(fetch(event.request));
});
