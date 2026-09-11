import type { FullStackTrack } from "../fullstackTrackTypes";

export const cachingTrack: FullStackTrack = {
  layoutTitle: "Caching & performance",
  layoutSubtitle: "HTTP/CDN edge caching, Redis patterns, distributed locks, and invalidation",
  accent: "orange",
  defaultSectionId: "edge",
  sections: [
    {
      id: "edge",
      title: "Edge & HTTP caching",
      icon: "⚡",
      heroTitle: "⚡ Edge, browser & HTTP caching",
      heroSubtitle: "Cache-Control, ETags, CDNs, and Stale-While-Revalidate",
      heroGradient: "from-orange-500 to-amber-600",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "Cache-Control directives & ETags",
          priority: "🔥",
          theory: {
            what: "The HTTP Cache-Control header dictates caching behavior across browsers (private) and CDNs (shared/public). Directives include max-age, s-maxage (CDN-only), no-cache (must revalidate before reuse), no-store (never cache), and immutable. ETags (Entity Tags) enable conditional 304 Not Modified validation.",
            why: "Improper cache headers either crash origins under heavy traffic or leak private user data across shared CDN caches.",
            how: "Use hashed filenames (bundle.a89f.js) with max-age=31536000, immutable. For HTML shells, use no-cache with ETag so browsers check for new builds before rendering.",
            keyPoints: [
              "no-store: completely disables caching (use for auth tokens, credit cards, banking APIs)",
              "no-cache: forces the browser to validate with the origin (ETag/If-None-Match) before serving cached content",
              "stale-while-revalidate: serves stale content instantly from cache while asynchronously fetching the fresh copy in background",
              "Vary: Accept-Encoding, Authorization: ensures cache keys account for compression and auth state",
            ],
            interviewQuestions: [
              {
                question: "What is the difference between Cache-Control: no-cache and no-store?",
                answer: "no-cache permits storing the response, but requires validating with the origin server (using ETag/If-None-Match) before serving it. no-store strictly forbids any storage on disk or memory, ensuring fresh network roundtrips every time.",
              },
            ],
          },
          codeExample: {
            title: "Production Cache-Control & Conditional ETag Middleware",
            code: `// Express.js Caching Middleware
import express from "express";

const app = express();

// 1. Static Assets (Vite/Webpack fingerprinted bundles)
app.use("/assets", express.static("dist/assets", {
  maxAge: "1y",
  immutable: true,
}));

// 2. Dynamic API with Conditional ETag & Stale-While-Revalidate
app.get("/api/products", (req, res) => {
  res.set({
    "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600",
    "ETag": '"prod-v4-hash"',
  });

  if (req.headers["if-none-match"] === '"prod-v4-hash"') {
    return res.status(304).end(); // 304 Not Modified (zero body payload)
  }

  res.json({ items: [{ id: 1, name: "Mechanical Keyboard" }] });
});`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "CDNs, Origin shields & Purging",
          theory: {
            what: "Content Delivery Networks (Cloudflare, Fastly, AWS CloudFront) distribute reverse proxy caches across hundreds of Points of Presence (PoPs) globally. Origin Shielding collapses global PoP misses into a centralized secondary cache layer to protect origins.",
            why: "Reduces latency from hundreds of milliseconds to sub-20ms and absorbs 90%+ of origin bandwidth.",
            how: "Tag cached responses with Surrogate-Keys / Cache-Tags (e.g. Cache-Tag: product-123). When a product is updated in CMS/DB, fire an API call to purge only that specific tag across the global CDN.",
            keyPoints: [
              "Surrogate-Keys / Cache-Tags: surgical invalidation without costly full CDN purge",
              "Origin Shielding prevents cache-miss stampedes from hundreds of edge locations simultaneously",
              "Edge Compute (Cloudflare Workers, Lambda@Edge) executes lightweight auth, rewrites, and A/B logic",
            ],
            interviewQuestions: [
              {
                question: "What is a Cache Tag (Surrogate Key) and why is it preferred over URL purging?",
                answer: "Cache Tags allow grouping multiple related pages or endpoints (e.g., product page, category list, recommendations) under one tag. Updating a product allows purging all associated cached responses globally in one API call.",
              },
            ],
          },
          codeExample: {
            title: "CDN Cache-Tag Invalidation Header",
            code: `// Response header sent by Origin to CDN (Fastly / Cloudflare Enterprise)
// CDN strips this header before sending response to user browser
res.set({
  "Cache-Control": "public, s-maxage=86400",
  "Surrogate-Key": "product-101 category-electronics brand-logitech",
});

// To Invalidate via CDN API upon update:
// POST https://api.cdn.com/purge-tags
// Body: { "tags": ["product-101"] }`,
          },
        },
      ],
    },
    {
      id: "distributed-cache",
      title: "Redis & application caching",
      icon: "🗄️",
      heroTitle: "🗄️ Redis, cache stampede & distributed locks",
      heroSubtitle: "Cache-Aside, Singleflight, Redlock, and Multi-Tier L1/L2 architectures",
      heroGradient: "from-amber-600 to-rose-700",
      concepts: [
        {
          id: "3",
          number: 3,
          title: "Cache-Aside & Cache stampede (Thundering herd)",
          priority: "🔥",
          theory: {
            what: "The Cache-Aside pattern checks cache first; on a miss, it queries the database, populates cache, and returns. Cache Stampede (Thundering Herd) occurs when a high-traffic key expires, causing thousands of concurrent requests to all hit the database simultaneously.",
            why: "A single expired hot key can take down an entire production database cluster under load.",
            how: "Mitigate stampede using: (1) Mutex / Singleflight (only one request queries DB and populates cache while others wait), (2) Probabilistic Early Expiration (XFetch algorithm), or (3) Background worker pre-warming.",
            keyPoints: [
              "Cache Penetration: queries for non-existent keys bypass cache to DB (solve with Bloom Filters or caching null)",
              "Cache Avalanche: thousands of keys expiring at the exact same second (solve with TTL Jitter: ttl + rand(0, 300))",
              "Cache Breakdown: hot key expires under load (solve with Mutex locks)",
            ],
            interviewQuestions: [
              {
                question: "How do you solve the Thundering Herd / Cache Stampede problem?",
                answer: "Use Mutex Locking (Singleflight) so only the first request fetching the expired key queries the database while others wait on the lock or receive stale-while-revalidate data, plus TTL jitter to prevent synchronized expiry.",
              },
            ],
          },
          codeExample: {
            title: "Cache-Aside with Mutex Stampede Lock & Jitter",
            code: `import Redis from "ioredis";
const redis = new Redis();

export async function getProductWithStampedeProtection(productId: string) {
  const cacheKey = \`product:\${productId}\`;
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Acquire Mutex Lock (only 1 thread goes to DB)
  const lockKey = \`lock:\${cacheKey}\`;
  const acquired = await redis.set(lockKey, "locked", "NX", "EX", 5);

  if (!acquired) {
    // Another request is fetching DB; sleep and retry from cache
    await new Promise((resolve) => setTimeout(resolve, 100));
    return getProductWithStampedeProtection(productId);
  }

  try {
    const data = await queryDatabaseForProduct(productId);
    // Add random TTL jitter (300s + 0-60s) to prevent Cache Avalanche
    const ttlSeconds = 300 + Math.floor(Math.random() * 60);
    await redis.set(cacheKey, JSON.stringify(data), "EX", ttlSeconds);
    return data;
  } finally {
    await redis.del(lockKey);
  }
}`,
          },
        },
        {
          id: "4",
          number: 4,
          title: "Distributed locking with Redis (Redlock)",
          priority: "🔥",
          theory: {
            what: "Distributed locks coordinate mutually exclusive operations across multiple independent node instances (e.g. running a cron job once, preventing double ticket booking). The Redlock algorithm provides safe distributed locking with fault tolerance across Redis nodes.",
            why: "Local process locks (Node mutex, Java synchronized) only protect a single process. In clustered container environments, distributed locks are required.",
            how: "Acquire lock with SET resource_name random_token NX PX 10000. Release lock ONLY using an atomic Lua script that verifies the random_token matches to prevent deleting another client's renewed lock.",
            keyPoints: [
              "SET NX PX: atomic acquire with lease expiration to avoid permanent deadlocks on node crash",
              "Always use an atomic Lua script for release to avoid deleting an expired/reassigned lock",
              "Watch out for GC pauses / network lag exceeding the lock TTL",
            ],
            interviewQuestions: [
              {
                question: "Why must Redis lock release be executed via an atomic Lua script?",
                answer: "If process A takes longer than the lock TTL, the lock auto-expires and process B acquires it. If process A then calls simple DEL lock_key, it accidentally deletes process B's valid lock. A Lua script atomically checks that the stored token matches before deleting.",
              },
            ],
          },
          codeExample: {
            title: "Safe Distributed Lock Acquisition & Atomic Lua Release",
            code: `import crypto from "crypto";
import Redis from "ioredis";
const redis = new Redis();

// Safe Atomic Release Lua Script
const RELEASE_LOCK_LUA = \`
  if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
  else
    return 0
  end
\`;

export async function withDistributedLock<T>(
  lockKey: string,
  ttlMs: number,
  task: () => Promise<T>
): Promise<T | null> {
  const lockToken = crypto.randomUUID();
  const acquired = await redis.set(lockKey, lockToken, "PX", ttlMs, "NX");

  if (!acquired) {
    return null; // Lock is held by another worker
  }

  try {
    return await task();
  } finally {
    // Atomic release
    await redis.eval(RELEASE_LOCK_LUA, 1, lockKey, lockToken);
  }
}`,
          },
        },
        {
          id: "5",
          number: 5,
          title: "Multi-Level caching (L1 In-Memory + L2 Redis)",
          theory: {
            what: "Multi-Level Caching combines ultra-fast L1 In-Memory LRU cache (Node.js memory, Java Caffeine/Guava, 0.01ms latency) with shared L2 Distributed Cache (Redis, 1-2ms latency).",
            why: "Hitting Redis over TCP for millions of operations per second creates network I/O bottlenecks. L1 cache absorbs 95% of reads entirely within process memory.",
            how: "Read pipeline: Check L1 -> Check L2 -> Read DB -> Populate L2 -> Populate L1. Invalidation: Use Redis Pub/Sub to broadcast cache eviction events to all instances to purge their local L1 caches upon mutation.",
            keyPoints: [
              "L1 Memory Cache: zero network latency, but localized to single container/instance",
              "L2 Redis Cache: shared across all instances, survives app pod restarts",
              "Redis Pub/Sub invalidation bus synchronizes L1 purges across container clusters",
            ],
            interviewQuestions: [
              {
                question: "How do you invalidate local L1 in-memory caches across 20 distributed microservice pods?",
                answer: "When an update occurs, the pod updating the database publishes an invalidation message to a Redis Pub/Sub channel. All 20 subscriber pods receive the message and evict the matching key from their local in-memory LRU cache.",
              },
            ],
          },
          codeExample: {
            title: "L1 (LRU) + L2 (Redis) Multi-Tier Cache with Pub/Sub Invalidation",
            code: `import { LRUCache } from "lru-cache";
import Redis from "ioredis";

const l1Local = new LRUCache<string, any>({ max: 5000, ttl: 1000 * 60 });
const l2Redis = new Redis();
const subClient = new Redis();

// Listen for cross-instance invalidations
subClient.subscribe("cache:invalidate");
subClient.on("message", (channel, key) => {
  if (channel === "cache:invalidate") {
    l1Local.delete(key);
  }
});

export async function getCachedData(key: string, fetchDb: () => Promise<any>) {
  // 1. Check L1 Memory
  if (l1Local.has(key)) return l1Local.get(key);

  // 2. Check L2 Redis
  const l2Val = await l2Redis.get(key);
  if (l2Val) {
    const parsed = JSON.parse(l2Val);
    l1Local.set(key, parsed);
    return parsed;
  }

  // 3. Fallback to DB
  const data = await fetchDb();
  await l2Redis.set(key, JSON.stringify(data), "EX", 3600);
  l1Local.set(key, data);
  return data;
}`,
          },
        },
        {
          id: "6",
          number: 6,
          title: "Cache write policies & Eviction strategies",
          theory: {
            what: "Cache write policies determine how writes synchronize between cache and permanent database: Cache-Aside (Lazy load), Write-Through (writes update cache and DB synchronously), and Write-Behind / Write-Back (writes update cache immediately, DB updated asynchronously).",
            why: "Choosing the right policy balances read performance, write latency, and data loss tolerance during system crashes.",
            how: "Use Cache-Aside for read-heavy general apps. Use Write-Behind for extreme write-throughput (e.g., IoT analytics, views counter) where occasional batch drops are tolerable.",
            keyPoints: [
              "LRU (Least Recently Used): evicts items not accessed for the longest time",
              "LFU (Least Frequently Used): evicts items with the lowest access frequency counter",
              "Write-Behind / Write-Back risk: if cache crashes before flushing async queue, unwritten data is lost",
            ],
            interviewQuestions: [
              {
                question: "Compare Write-Through vs Write-Back (Write-Behind) caching.",
                answer: "Write-Through writes to cache and database synchronously, guaranteeing strong consistency at the expense of higher write latency. Write-Back writes only to cache and flushes to database in background batches, offering extreme write throughput but risking data loss if the cache node crashes before flushing.",
              },
            ],
          },
          codeExample: {
            title: "Write-Through vs Write-Back Comparison",
            code: `// Write-Through: Strong consistency, higher latency
async function writeThrough(key: string, data: any) {
  await db.save(key, data);             // 1. Write to DB
  await redis.set(key, JSON.stringify(data)); // 2. Update Cache
}

// Write-Back / Write-Behind: High throughput, async batch persistence
async function writeBack(key: string, data: any) {
  await redis.set(key, JSON.stringify(data)); // 1. Immediate in-memory write
  await redis.lpush("write_queue", JSON.stringify({ key, data })); // 2. Background queue
  // Background worker consumes "write_queue" and batch-inserts into DB every 5 seconds
}`,
          },
        },
      ],
    },
  ],
};
