// نسخه سرویس ورکر
const CACHE_NAME = 'professional-app-v1-2025';

// فایل‌های استاتیک برای کش کردن
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/main.css',
    '/css/responsive.css',
    '/js/main.js',
    '/assets/images/logo.png'
];

// نصب سرویس ورکر و کش کردن منابع استاتیک
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(STATIC_ASSETS))
    );
});

// مدیریت درخواست‌ها
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // اگر در کش موجود بود برگردان
                if (response) return response;

                // درخواست شبکه
                return fetch(event.request)
                    .then((fetchResponse) => {
                        // کش پویا برای منابع جدید
                        return caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, fetchResponse.clone());
                                return fetchResponse;
                            });
                    });
            })
    );
});

// حذف کش‌های قدیمی
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
