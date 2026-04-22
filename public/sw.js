// Phase 15: Service Worker for PWA functionality
// Caching strategy and offline support for AURELION

const CACHE_NAME = 'aurelion-v1.0.0';
const STATIC_CACHE = 'aurelion-static-v1.0.0';
const DYNAMIC_CACHE = 'aurelion-dynamic-v1.0.0';
const RUNTIME_CACHE = 'aurelion-runtime-v1.0.0';

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/client/index.html',
  '/client/styles.css',
  '/client/app.js',
  '/components/AurelionWordmark.js',
  '/components/SolarCrest.js',
  '/components/IntroAnimation.js',
  '/components/LandingMotion.js',
  '/components/HouseSystem.js',
  '/components/ProfileSystem.js',
  '/components/RecognitionSystem.js',
  '/components/ActivitySystem.js',
  '/components/WorkSystem.js',
  '/components/AdminSystem.js',
  '/components/ContactSystem.js',
  '/public/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== RUNTIME_CACHE &&
                cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Old caches cleaned up');
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('[SW] Failed to clean up old caches:', error);
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (API calls, etc.)
  if (url.origin !== location.origin) {
    // Cache API responses with network-first strategy
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(networkFirst(request));
    }
    return;
  }
  
  // Route requests to appropriate caching strategy
  if (STATIC_ASSETS.some(asset => url.pathname === asset)) {
    // Static assets - cache first
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (url.pathname.startsWith('/components/') || 
             url.pathname.startsWith('/client/')) {
    // Application files - cache first with network fallback
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else if (url.pathname.startsWith('/icons/') || 
             url.pathname.startsWith('/images/')) {
    // Images - cache first
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
  } else if (url.pathname.startsWith('/api/')) {
    // API calls - network first
    event.respondWith(networkFirst(request, RUNTIME_CACHE));
  } else {
    // Other requests - network first with cache fallback
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Cache-first strategy
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving from cache:', request.url);
      // Update cache in background
      updateCache(request, cacheName);
      return cachedResponse;
    }
    
    // Not in cache, fetch from network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      console.log('[SW] Cached new resource:', request.url);
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Cache-first strategy failed:', error);
    
    // Try to serve from any cache as fallback
    const anyCacheResponse = await caches.match(request);
    if (anyCacheResponse) {
      return anyCacheResponse;
    }
    
    // Return offline page for HTML requests
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/offline.html') || 
             new Response('Offline - No cached version available', {
               status: 503,
               statusText: 'Service Unavailable'
             });
    }
    
    throw error;
  }
}

// Network-first strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      console.log('[SW] Network response cached:', request.url);
    }
    return networkResponse;
  } catch (error) {
    console.error('[SW] Network-first strategy failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Serving from cache fallback:', request.url);
      return cachedResponse;
    }
    
    // Return offline page for HTML requests
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/offline.html') || 
             new Response('Offline - No cached version available', {
               status: 503,
               statusText: 'Service Unavailable'
             });
    }
    
    throw error;
  }
}

// Update cache in background
async function updateCache(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse);
      console.log('[SW] Cache updated in background:', request.url);
    }
  } catch (error) {
    console.warn('[SW] Failed to update cache in background:', error);
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync event:', event.tag);
  
  if (event.tag === 'background-sync-recognitions') {
    event.waitUntil(syncRecognitions());
  } else if (event.tag === 'background-sync-works') {
    event.waitUntil(syncWorks());
  } else if (event.tag === 'background-sync-activities') {
    event.waitUntil(syncActivities());
  }
});

// Sync pending recognitions
async function syncRecognitions() {
  try {
    const pendingRecognitions = await getPendingItems('pending-recognitions');
    
    for (const recognition of pendingRecognitions) {
      try {
        const response = await fetch('/api/recognitions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${recognition.authToken}`
          },
          body: JSON.stringify(recognition.data)
        });
        
        if (response.ok) {
          await removePendingItem('pending-recognitions', recognition.id);
          console.log('[SW] Recognition synced successfully');
        }
      } catch (error) {
        console.error('[SW] Failed to sync recognition:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Recognition sync failed:', error);
  }
}

// Sync pending works
async function syncWorks() {
  try {
    const pendingWorks = await getPendingItems('pending-works');
    
    for (const work of pendingWorks) {
      try {
        const formData = work.data;
        const response = await fetch('/api/works', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${work.authToken}`
          },
          body: formData
        });
        
        if (response.ok) {
          await removePendingItem('pending-works', work.id);
          console.log('[SW] Work synced successfully');
        }
      } catch (error) {
        console.error('[SW] Failed to sync work:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Work sync failed:', error);
  }
}

// Sync pending activities
async function syncActivities() {
  try {
    const pendingActivities = await getPendingItems('pending-activities');
    
    for (const activity of pendingActivities) {
      try {
        const response = await fetch('/api/activities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${activity.authToken}`
          },
          body: JSON.stringify(activity.data)
        });
        
        if (response.ok) {
          await removePendingItem('pending-activities', activity.id);
          console.log('[SW] Activity synced successfully');
        }
      } catch (error) {
        console.error('[SW] Failed to sync activity:', error);
      }
    }
  } catch (error) {
    console.error('[SW] Activity sync failed:', error);
  }
}

// Helper functions for pending items storage
async function getPendingItems(storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('aurelion-offline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const getRequest = store.getAll();
      
      getRequest.onerror = () => reject(getRequest.error);
      getRequest.onsuccess = () => resolve(getRequest.result || []);
    };
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };
  });
}

async function removePendingItem(storeName, itemId) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('aurelion-offline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const deleteRequest = store.delete(itemId);
      
      deleteRequest.onerror = () => reject(deleteRequest.error);
      deleteRequest.onsuccess = () => resolve();
    };
  });
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: 'You have a new recognition notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Recognition',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/xmark.png'
      }
    ]
  };
  
  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.data = { ...options.data, ...data };
  }
  
  event.waitUntil(
    self.registration.showNotification('AURELION', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click received');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/recognitions')
    );
  } else if (event.action === 'close') {
    // Just close the notification
  } else {
    // Default action - open app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Performance monitoring
self.addEventListener('fetch', (event) => {
  const start = performance.now();
  
  event.respondWith(
    (async () => {
      const response = await fetch(event.request);
      const end = performance.now();
      const duration = end - start;
      
      // Log slow requests
      if (duration > 1000) {
        console.warn(`[SW] Slow request detected: ${event.request.url} took ${duration.toFixed(2)}ms`);
      }
      
      return response;
    })()
  );
});
