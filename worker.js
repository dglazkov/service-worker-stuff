self.debug = {version: 3};

// FIXME: Make this order-insensitive by using ES6 modules when they
// are available.
importScripts(
    'bower_components/cache-polyfill/idbhelper.js',
    'bower_components/cache-polyfill/cachedb.js',
    'bower_components/cache-polyfill/cache.js',
    'bower_components/cache-polyfill/caches.js');

// Defines which paths are of interest and will be cached.
var cachedResourcePath = /^\/$|^\/index\.html$|^\/bower_components\//;

self.onfetch = function(event) {
  self.debug.lastEvent = event;

  var url = new URL(event.request.url);
  if (!cachedResourcePath.test(url.pathname)) {
    return;  // This isn't cached; use the network.
  }

  // Use the network anyway for now.
};
