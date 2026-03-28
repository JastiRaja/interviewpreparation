import type { FullStackTrack } from "../fullstackTrackTypes";

export const cachingTrack: FullStackTrack = {
  layoutTitle: "Caching & performance",
  layoutSubtitle: "HTTP caches, CDNs, Redis, and invalidation",
  accent: "orange",
  defaultSectionId: "edge",
  sections: [
    {
      id: "edge",
      title: "HTTP & CDN",
      icon: "⚡",
      heroTitle: "⚡ Edge & browser caching",
      heroSubtitle: "Latency and bandwidth at the protocol layer",
      heroGradient: "from-orange-500 to-amber-600",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "Cache-Control & freshness",
          priority: "🔥",
          theory: {
            what: "Cache-Control directives (max-age, s-maxage, public/private, no-store, immutable) tell browsers and proxies whether and how long to reuse a response. ETag and Last-Modified enable revalidation.",
            why: "Correct caching cuts load and TTFB; wrong caching leaks private data or serves stale UI.",
            how: "Immutable hashed static assets can cache forever; HTML and authenticated JSON often private/no-store. Use stale-while-revalidate for resilient UX.",
            keyPoints: ["s-maxage targets shared caches (CDN)", "Vary header affects cache key", "CDN cache key includes query string unless normalized"],
            interviewQuestions: [
              {
                question: "What does Cache-Control: no-store mean?",
                answer: "Caches must not store the response or use it to satisfy future requests—appropriate for sensitive or highly dynamic data where any caching is unacceptable.",
              },
            ],
          },
          codeExample: {
            title: "Static asset headers",
            code: `Cache-Control: public, max-age=31536000, immutable
# HTML for SPA shell — short or no cache
Cache-Control: no-cache`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "CDNs & edge logic",
          theory: {
            what: "Content delivery networks cache at PoPs near users. Some support edge functions (Workers, Lambda@Edge) for auth, A/B, or personalization at the edge.",
            why: "Global users see lower latency; origins survive traffic spikes.",
            how: "Purge by URL or tag on deploy. Respect origin headers or override with CDN rules. Use origin shield to collapse fan-in.",
            keyPoints: ["Cache poisoning: watch Host header and cache keys", "HTTPS everywhere at edge", "Geographic routing and failover"],
            interviewQuestions: [
              {
                question: "Why purge CDN cache on deploy?",
                answer: "Users might receive old HTML or JS referencing deleted assets. Purging or versioned filenames (content hash) ensures clients load the new build.",
              },
            ],
          },
        },
        {
          id: "3",
          number: 3,
          title: "Browser storage & offline",
          theory: {
            what: "localStorage/sessionStorage hold key-value strings synchronously (same-origin). IndexedDB stores structured data. Service workers intercept network for PWA caches.",
            why: "Client caches reduce repeat downloads but are visible to XSS if you store secrets.",
            how: "Prefer HTTP cache for static assets; use IndexedDB for larger app state; never store tokens in localStorage if XSS is in your threat model.",
            keyPoints: ["Storage quotas and eviction are browser-dependent", "sessionStorage dies with tab", "Workbox patterns for SW caching"],
            interviewQuestions: [
              {
                question: "localStorage vs cookies for tokens?",
                answer: "HttpOnly cookies are not readable by JS, reducing XSS token theft. localStorage is accessible to any script on the page—avoid for sensitive tokens unless mitigations are strong.",
              },
            ],
          },
        },
      ],
    },
    {
      id: "app",
      title: "Application cache",
      icon: "🧠",
      heroTitle: "🧠 Redis & patterns",
      heroSubtitle: "Server-side speed and consistency",
      heroGradient: "from-amber-600 to-orange-700",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Cache-aside & read-through",
          theory: {
            what: "Cache-aside: app reads cache first, on miss loads DB and populates cache. Read-through: cache library loads missing keys via a loader callback. Write-through writes cache and DB together.",
            why: "Choosing a pattern affects staleness, thundering herds, and complexity.",
            how: "Set TTLs; use probabilistic early expiration or singleflight to prevent stampedes on hot keys.",
            keyPoints: ["Eventual consistency between cache and DB", "Negative caching for missing keys (short TTL)", "Serialization format size matters"],
            interviewQuestions: [
              {
                question: "What is a cache stampede?",
                answer: "Many concurrent requests miss the same expired key and all hit the database at once. Mitigate with locks, singleflight, request coalescing, or staggered TTL jitter.",
              },
            ],
          },
        },
        {
          id: "5",
          number: 5,
          title: "Redis data structures & TTL",
          theory: {
            what: "Redis is an in-memory data store with strings, hashes, lists, sets, sorted sets, streams. TTL can be set per key; eviction policies apply under memory pressure.",
            why: "Session store, rate limiting, leaderboards, and pub/sub patterns are common full-stack uses.",
            how: "Use appropriate types (ZSET for time-series windows); pipeline commands; Redis Cluster for scale. Persist if you need durability (AOF/RDB) understanding trade-offs.",
            keyPoints: ["Hot keys: shard or local LRU in app", "Large values hurt latency—compress or split", "Lua scripts for atomic multi-key ops"],
            interviewQuestions: [
              {
                question: "When is Redis a bad fit?",
                answer: "When you need complex querying across large datasets, strong durability without extra design, or when memory cost exceeds budget—relational or search engines may fit better.",
              },
            ],
          },
          codeExample: {
            title: "SET with TTL",
            code: `SET user:42:profile "{...}" EX 300 NX`,
          },
        },
        {
          id: "6",
          number: 6,
          title: "Invalidation & memoization",
          theory: {
            what: "Invalidation updates or deletes cache entries when source data changes—event-driven, TTL-only, or versioned keys. Memoization caches pure function results in-process (React useMemo, LRU modules).",
            why: "‘There are only two hard problems…’—stale caches cause subtle bugs.",
            how: "Version keys with content hash or updated_at. Publish invalidation messages on writes. For GraphQL, normalized caches need field-level updates.",
            keyPoints: ["Write-invalidate vs write-update", "CDN surrogate keys for tag purge", "Measure hit ratio and p99 latency"],
            interviewQuestions: [
              {
                question: "Why is TTL-only invalidation risky?",
                answer: "Data can be wrong until TTL expires—users see stale state for that window. For rapidly changing or authoritative data, explicit invalidation or shorter TTLs with jitter are safer.",
              },
            ],
          },
        },
      ],
    },
  ],
};
