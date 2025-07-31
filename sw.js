// Service Worker for Umrah Dua Guide
// Provides offline functionality and caching

const CACHE_NAME = 'umrah-dua-guide-v1.0.0';
const STATIC_CACHE_NAME = 'umrah-static-v1.0.0';

// Files to cache for offline use
const STATIC_FILES = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    // External CDN resources
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Amiri:wght@400;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Install event - cache static resources
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        Promise.all([
            // Cache static files
            caches.open(STATIC_CACHE_NAME)
                .then(cache => {
                    console.log('Caching static files...');
                    return cache.addAll(STATIC_FILES);
                }),
            
            // Skip waiting to activate immediately
            self.skipWaiting()
        ])
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE_NAME && cacheName !== CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // Take control of all clients
            self.clients.claim()
        ])
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip requests to other origins
    if (!event.request.url.startsWith(self.location.origin) && 
        !event.request.url.startsWith('https://fonts.googleapis.com') &&
        !event.request.url.startsWith('https://cdnjs.cloudflare.com')) {
        return;
    }
    
    event.respondWith(
        handleFetchRequest(event.request)
    );
});

// Handle fetch requests with cache-first strategy for static files
async function handleFetchRequest(request) {
    const url = new URL(request.url);
    
    try {
        // For static files, try cache first
        if (isStaticFile(request.url)) {
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }
        }
        
        // Try network first for dynamic content
        const networkResponse = await fetch(request);
        
        // If successful, cache the response (except for very large files)
        if (networkResponse.ok && request.url.startsWith(self.location.origin)) {
            const responseClone = networkResponse.clone();
            const cache = await caches.open(CACHE_NAME);
            
            // Don't cache if response is too large (>5MB)
            const contentLength = networkResponse.headers.get('content-length');
            if (!contentLength || parseInt(contentLength) < 5 * 1024 * 1024) {
                cache.put(request, responseClone);
            }
        }
        
        return networkResponse;
        
    } catch (error) {
        console.log('Network failed, trying cache...', error);
        
        // Network failed, try cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // If it's the main page and we're offline, return a custom offline page
        if (request.mode === 'navigate') {
            return createOfflinePage();
        }
        
        // For other requests, return a network error
        throw error;
    }
}

// Check if a URL is for a static file
function isStaticFile(url) {
    return STATIC_FILES.some(staticUrl => {
        if (staticUrl === '/' || staticUrl === '/index.html') {
            return url.endsWith('/') || url.endsWith('/index.html');
        }
        return url.includes(staticUrl);
    });
}

// Create a basic offline page
function createOfflinePage() {
    const offlineHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Umrah Dua Guide - Offline</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0;
                    color: #333;
                }
                .offline-container {
                    background: white;
                    padding: 3rem;
                    border-radius: 12px;
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    max-width: 400px;
                    margin: 1rem;
                }
                .offline-icon {
                    font-size: 4rem;
                    margin-bottom: 1rem;
                    color: #4299e1;
                }
                .offline-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: #2d3748;
                }
                .offline-message {
                    color: #718096;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }
                .retry-btn {
                    background: #4299e1;
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }
                .retry-btn:hover {
                    background: #3182ce;
                    transform: translateY(-2px);
                }
            </style>
        </head>
        <body>
            <div class="offline-container">
                <div class="offline-icon">🌙</div>
                <h1 class="offline-title">Umrah Dua Guide</h1>
                <p class="offline-message">
                    You're currently offline, but your saved duas and bookmarks are still available.
                    The app will work normally once you're back online.
                </p>
                <button class="retry-btn" onclick="window.location.reload()">
                    Try Again
                </button>
                <p style="margin-top: 1rem; font-size: 0.9rem; color: #718096;">
                    May Allah accept your prayers 🤲
                </p>
            </div>
        </body>
        </html>
    `;
    
    return new Response(offlineHTML, {
        headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache'
        }
    });
}

// Handle background sync for future features
self.addEventListener('sync', event => {
    console.log('Background sync event:', event.tag);
    
    if (event.tag === 'backup-duas') {
        event.waitUntil(backupUserData());
    }
});

// Backup user data when online (future feature)
async function backupUserData() {
    try {
        // This would sync bookmarks and custom duas to a server
        // For now, it's just a placeholder
        console.log('Background sync: User data backed up');
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Handle push notifications (future feature)
self.addEventListener('push', event => {
    console.log('Push notification received:', event);
    
    const options = {
        body: event.data ? event.data.text() : 'New Islamic content available',
        icon: '/manifest-icon-192.png',
        badge: '/manifest-icon-96.png',
        tag: 'umrah-notification',
        data: {
            url: '/'
        },
        actions: [
            {
                action: 'open',
                title: 'Open App'
            },
            {
                action: 'close',
                title: 'Dismiss'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Umrah Dua Guide', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    console.log('Notification clicked:', event);
    
    event.notification.close();
    
    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.openWindow(event.notification.data.url || '/')
        );
    }
});

// Message handling for communication with main app
self.addEventListener('message', event => {
    console.log('Service Worker received message:', event.data);
    
    if (event.data && event.data.type) {
        switch (event.data.type) {
            case 'SKIP_WAITING':
                self.skipWaiting();
                break;
                
            case 'GET_CACHE_SIZE':
                getCacheSize().then(size => {
                    event.ports[0].postMessage({ size });
                });
                break;
                
            case 'CLEAR_CACHE':
                clearAllCaches().then(() => {
                    event.ports[0].postMessage({ success: true });
                });
                break;
                
            default:
                console.log('Unknown message type:', event.data.type);
        }
    }
});

// Get total cache size
async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const requests = await cache.keys();
        
        for (const request of requests) {
            const response = await cache.match(request);
            if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
            }
        }
    }
    
    return totalSize;
}

// Clear all caches
async function clearAllCaches() {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
}

// Log service worker lifecycle
console.log('Service Worker script loaded for Umrah Dua Guide');

// Handle unhandled errors
self.addEventListener('error', event => {
    console.error('Service Worker error:', event.error);
});

// Handle unhandled promise rejections
self.addEventListener('unhandledrejection', event => {
    console.error('Service Worker unhandled rejection:', event.reason);
});

// Periodic cleanup (runs when the browser decides)
self.addEventListener('periodicsync', event => {
    if (event.tag === 'cache-cleanup') {
        event.waitUntil(performCacheCleanup());
    }
});

// Clean up old cache entries
async function performCacheCleanup() {
    const cache = await caches.open(CACHE_NAME);
    const requests = await cache.keys();
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    
    for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
            const dateHeader = response.headers.get('date');
            if (dateHeader) {
                const responseDate = new Date(dateHeader).getTime();
                if (now - responseDate > maxAge) {
                    await cache.delete(request);
                    console.log('Cleaned up old cache entry:', request.url);
                }
            }
        }
    }
} 