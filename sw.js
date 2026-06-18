// BW Room Service SW v1.4.6
// Strategy: Network First — always fetches fresh, falls back to cache offline.
// Uses versioned cache name so new deploys bust the old cache automatically.

const CACHE = "rs-v1.4.8";

const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png",
  "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.2/babel.min.js",
];

// ── Install: pre-cache shell, activate immediately ────────────────────────────
self.addEventListener("install", (e) => {
  self.skipWaiting(); // activate new SW right away, no tab-close needed
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE).catch(() => {}))
  );
});

// ── Activate: delete ALL old caches, claim tabs immediately ───────────────────
self.addEventListener("activate", (e) => {
  e.waitUntil(
    Promise.all([
      self.clients.claim(), // take control of all open tabs instantly
      caches.keys().then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => {
            console.log("[SW] Deleting old cache:", k);
            return caches.delete(k);
          })
        )
      ),
    ])
  );
});

// ── Fetch: Network First, cache fallback ──────────────────────────────────────
self.addEventListener("fetch", (e) => {
  // Skip non-GET and cross-origin API calls (Anthropic API)
  if (e.request.method !== "GET") return;
  if (e.request.url.includes("api.anthropic.com")) return;
  if (e.request.url.includes("cdnjs.cloudflare.com")) {
    // CDN assets: cache first (they're versioned/immutable)
    e.respondWith(cacheFirst(e.request));
    return;
  }
  // Everything else: network first
  e.respondWith(networkFirst(e.request));
});

async function networkFirst(req) {
  try {
    const res = await fetch(req);
    if (res.ok) {
      const cache = await caches.open(CACHE);
      cache.put(req, res.clone());
    }
    return res;
  } catch {
    const cached = await caches.match(req);
    if (cached) return cached;
    // SPA fallback — return index.html for navigation
    if (req.mode === "navigate") {
      const fallback = await caches.match("./index.html");
      if (fallback) return fallback;
    }
    return new Response("Offline", { status: 503 });
  }
}

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) {
      const cache = await caches.open(CACHE);
      cache.put(req, res.clone());
    }
    return res;
  } catch {
    return new Response("Offline", { status: 503 });
  }
}

// ── Handle SKIP_WAITING message from app (for manual update trigger) ──────────
self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
