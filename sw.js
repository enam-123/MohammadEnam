const CACHE='mohammad-enam-site-v2';
const FILES=['./','./index.html','./manifest.webmanifest','./assets/icon.svg','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))));
self.addEventListener('fetch',event=>{if(event.request.method==='GET')event.respondWith(caches.match(event.request).then(response=>response||fetch(event.request).then(network=>{if(network.ok){const copy=network.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return network;}).catch(()=>caches.match('./index.html'))));});
