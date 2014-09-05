// Debugging tips:
// - Bump the self.debug version line to sanity check the script in Inspector.
// - Use polyfillCaches.delete('stuff') to trash the cache.

self.debug = {version: 8};

// FIXME: Make this order-insensitive by using ES6 modules when they
// are available.
importScripts(
    'bower_components/cache-polyfill/idbhelper.js',
    'bower_components/cache-polyfill/cachedb.js',
    'bower_components/cache-polyfill/cache.js',
    'bower_components/cache-polyfill/caches.js');

// Defines which paths are of interest and will be cached.
var cachedResourcePath =
    /^\/$|^\/index\.html$|^\/bower_components\/|^\/elements\//;

self.oninstall = function(event) {
  // Ignore failures from 'create', which probably means the cache
  // already exists.
  event.waitUntil(polyfillCaches.create('stuff')
    .then(function(){}, function(){}));
};

self.onfetch = function(event) {
  self.debug.lastEvent = event;

  var url = new URL(event.request.url);
  if (!cachedResourcePath.test(url.pathname)) {
    return;  // This isn't cached; use the network.
  }

  var cache;

  console.log(event.request.url);

  event.respondWith(
    polyfillCaches.get('stuff')
      .then(function(c) {
          cache = c;
          return cache.match(event.request);
        })
      .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request.url)
            .then(function(response) {
                cache.put(event.request, response);
                return response;
              });
        }));
};
