import type { FullStackTrack } from "../fullstackTrackTypes";

export const httpTrack: FullStackTrack = {
  layoutTitle: "HTTP, REST & modern APIs",
  layoutSubtitle: "Protocol evolution (HTTP/2/3), real-time (WebSockets/SSE), GraphQL, gRPC, and REST design",
  accent: "indigo",
  defaultSectionId: "protocol",
  sections: [
    {
      id: "protocol",
      title: "HTTP protocol & semantics",
      icon: "🌐",
      heroTitle: "🌐 HTTP protocol evolution & semantics",
      heroSubtitle: "HTTP/1.1 vs 2 vs 3, Idempotency keys, status codes, and RFC Problem Details",
      heroGradient: "from-indigo-600 to-violet-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC)",
          priority: "🔥",
          theory: {
            what: "HTTP/1.1 suffered from Head-of-Line (HOL) blocking (one slow request blocked the TCP socket). HTTP/2 introduced binary framing and stream multiplexing over a single TCP connection with HPACK header compression. HTTP/3 moves from TCP to QUIC (over UDP) to solve TCP-level packet loss HOL blocking and provide 0-RTT handshakes.",
            why: "Understanding transport protocols explains why domain sharding and sprite sheets are anti-patterns in modern web performance.",
            how: "Modern browsers negotiate HTTP/2 and HTTP/3 automatically via ALPN (Application-Layer Protocol Negotiation) during TLS handshake.",
            keyPoints: [
              "HTTP/2: Stream Multiplexing eliminates browser 6-connection-per-domain limit",
              "HTTP/3 (QUIC): Migrating between Wi-Fi and Cellular does not drop connections (Connection ID instead of IP/Port tuple)",
              "HPACK / QPACK: Compresses redundant headers across streams",
            ],
            interviewQuestions: [
              {
                question: "What problem does HTTP/3 (QUIC) solve that HTTP/2 could not?",
                answer: "HTTP/2 multiplexes multiple streams over a single TCP connection. When a single TCP packet is dropped on a lossy network, TCP halts all streams until the lost packet is retransmitted (TCP-level HOL blocking). HTTP/3 uses QUIC over UDP, ensuring packet loss on one stream does not pause or block unrelated streams.",
              },
            ],
          },
          codeExample: {
            title: "Protocol Comparison Summary",
            code: `/*
HTTP/1.1: Text-based, 1 request-response per TCP connection (or pipelined), HOL blocking.
HTTP/2:   Binary framing, Multiplexed streams on single TCP connection, HPACK compression.
HTTP/3:   QUIC over UDP, Independent multiplexed streams (no TCP HOL blocking), 0-RTT TLS 1.3.
*/`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "Methods, safety & Idempotency keys",
          priority: "🔥",
          theory: {
            what: "Safe methods (GET, HEAD, OPTIONS) produce no side effects. Idempotent methods (GET, PUT, DELETE, HEAD, OPTIONS) produce the exact same server resource state whether executed 1 time or 10 times. POST and PATCH are not idempotent by default. Idempotency Keys guarantee safe retries for mutating operations (e.g. Stripe charge).",
            why: "Network timeouts often leave clients uncertain if a POST request succeeded. Retrying without an idempotency key results in double charges or duplicate order placements.",
            how: "The client generates a unique UUID (Idempotency-Key: uuid) in the header. The server records the key in Redis with a lock; if the same key arrives again, the cached previous response is returned immediately.",
            keyPoints: [
              "PUT: full replacement (idempotent); PATCH: partial update (may or may not be idempotent)",
              "Idempotency keys must have a TTL (e.g., 24 hours) and atomic state management (IN_PROGRESS vs COMPLETED)",
              "Never charge a credit card without idempotency key protection",
            ],
            interviewQuestions: [
              {
                question: "How do you implement an Idempotency-Key handler in an API?",
                answer: "Store the key in Redis with status 'PROCESSING' (using SET NX). If another request with the same key arrives while processing, return 409 Conflict or wait. Once completed, store the status code and response body in Redis. Subsequent requests with the same key return the stored response directly without re-executing logic.",
              },
            ],
          },
          codeExample: {
            title: "Idempotency Key Middleware Implementation",
            code: `import Redis from "ioredis";
import { Request, Response, NextFunction } from "express";
const redis = new Redis();

export function idempotencyMiddleware() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = req.headers["idempotency-key"] as string;
    if (!key) return next();

    const cacheKey = \`idempotency:\${key}\`;
    const cached = await redis.get(cacheKey);

    if (cached) {
      const { status, body } = JSON.parse(cached);
      return res.status(status).json(body);
    }

    // Capture response to cache
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      redis.set(cacheKey, JSON.stringify({ status: res.statusCode, body }), "EX", 86400);
      return originalJson(body);
    };

    next();
  };
}`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "Status codes & RFC 9457 Problem details",
          theory: {
            what: "HTTP status codes communicate outcome categories (2xx Success, 3xx Redirect, 4xx Client Error, 5xx Server Error). RFC 7807 / RFC 9457 establishes a standard machine-readable JSON structure (application/problem+json) for API errors: type, title, status, detail, instance.",
            why: "Returning arbitrary error formats ({ error: 'bad' }, { msg: 'fail' }, or 200 OK with success: false) breaks API consumers and automated client SDKs.",
            how: "Use specific codes: 201 Created + Location header; 204 No Content for empty DELETEs; 422 Unprocessable Entity for schema validation failures; 429 Too Many Requests + Retry-After.",
            keyPoints: [
              "200 vs 201 vs 204: match response body expectations",
              "401 (missing credentials) vs 403 (insufficient permissions) vs 404 (resource not found or hidden for security)",
              "Standardize errors with Problem Details (RFC 9457)",
            ],
            interviewQuestions: [
              {
                question: "Why should REST APIs adopt RFC 9457 Problem Details?",
                answer: "It provides a standardized, industry-wide JSON schema for error responses, allowing client SDKs and API gateways to predictably parse validation errors, trace IDs, and error URIs without custom per-endpoint error handling.",
              },
            ],
          },
          codeExample: {
            title: "Standard RFC 9457 Problem Details Error Response",
            code: `// Content-Type: application/problem+json
// HTTP 422 Unprocessable Entity
{
  "type": "https://api.example.com/errors/invalid-parameters",
  "title": "Validation Failed",
  "status": 422,
  "detail": "The 'email' and 'age' fields contain invalid values.",
  "instance": "/orders/checkout",
  "invalidParams": [
    { "name": "email", "reason": "Must be a valid email address" },
    { "name": "age", "reason": "Must be 18 or older" }
  ]
}`,
          },
        },
      ],
    },
    {
      id: "api-paradigms",
      title: "Real-time & API paradigms",
      icon: "⚡",
      heroTitle: "⚡ Real-time protocols, GraphQL & gRPC",
      heroSubtitle: "WebSockets, Server-Sent Events, REST, GraphQL, and gRPC compared",
      heroGradient: "from-violet-600 to-indigo-800",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Real-time: WebSockets vs SSE vs Long Polling",
          priority: "🔥",
          theory: {
            what: "Long Polling repeatedly opens HTTP requests waiting for updates. Server-Sent Events (SSE) provide unidirectional, text-based server-to-client streaming over standard HTTP/2 with automatic reconnection. WebSockets provide full-duplex, bidirectional binary/text communication over a single TCP connection initialized via an HTTP 101 Switching Protocols upgrade.",
            why: "Choosing the wrong transport wastes server resources (e.g. using heavy WebSockets when lightweight SSE suffices for notifications/LLM chat streams).",
            how: "Use SSE for AI streaming (ChatGPT-style), live dashboards, and stock tickers. Use WebSockets for multi-player games, collaborative document editing, and real-time chat.",
            keyPoints: [
              "SSE: HTTP/2 friendly, built-in reconnection, works through standard corporate proxies and firewalls",
              "WebSockets: Bidirectional, requires custom load balancer sticky sessions or Redis Pub/Sub backplane",
              "WebRTC: Peer-to-peer UDP streaming for audio, video, and ultra-low-latency data channels",
            ],
            interviewQuestions: [
              {
                question: "When should you choose Server-Sent Events (SSE) over WebSockets?",
                answer: "Choose SSE when communication is strictly one-way (server to client, like AI token streaming or live score updates). SSE works over standard HTTP/2, supports automatic reconnection out of the box, and bypasses proxy/firewall websocket blockers without extra overhead.",
              },
            ],
          },
          codeExample: {
            title: "Server-Sent Events (SSE) Node.js Server Implementation",
            code: `import express from "express";
const app = express();

app.get("/api/stream", (req, res) => {
  // Set SSE Headers
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });

  // Push event to client
  res.write(\`data: \${JSON.stringify({ message: "Connected" })}\\n\\n\`);

  const interval = setInterval(() => {
    res.write(\`event: metric\\ndata: \${JSON.stringify({ cpu: Math.random() * 100 })}\\n\\n\`);
  }, 1000);

  req.on("close", () => {
    clearInterval(interval);
    res.end();
  });
});`,
          },
        },
        {
          id: "5",
          number: 5,
          title: "REST vs GraphQL vs gRPC",
          priority: "🔥",
          theory: {
            what: "REST uses resource URIs and standard HTTP verbs with JSON payloads. GraphQL is a query language allowing clients to declare the exact data shape requested, resolving the Over-fetching and Under-fetching issues. gRPC uses Protocol Buffers (Protobuf) binary serialization over HTTP/2 for high-performance RPCs.",
            why: "Frontend-to-backend communication often benefits from GraphQL or REST, while internal microservice-to-microservice high-throughput communication standardizes on gRPC.",
            how: "Solve GraphQL's N+1 query problem with DataLoader (batching and per-request memoization). Use Protobuf .proto contracts for compile-time generated client/server stubs in gRPC.",
            keyPoints: [
              "GraphQL N+1 Problem: nested resolvers executing 1 query per parent row (solve with DataLoader)",
              "gRPC: up to 7-10x faster serialization than JSON with strict type safety across polyglot backends",
              "REST: excellent HTTP-native CDN caching (harder in GraphQL because queries are POSTs)",
            ],
            interviewQuestions: [
              {
                question: "What is the GraphQL N+1 problem and how does DataLoader solve it?",
                answer: "When querying a list of 100 users and their posts, naive resolvers execute 1 query for the users + 100 individual queries for each user's posts (101 queries total). DataLoader batches all 100 author IDs into a single WHERE author_id IN (...) query and distributes the results.",
              },
            ],
          },
          codeExample: {
            title: "gRPC Protocol Buffer (.proto) Definition",
            code: `syntax = "proto3";

package payment;

service PaymentService {
  rpc ProcessPayment (PaymentRequest) returns (PaymentResponse);
  rpc StreamTransactions (AccountRequest) returns (stream Transaction);
}

message PaymentRequest {
  string user_id = 1;
  int64 amount_cents = 2;
  string currency = 3;
}

message PaymentResponse {
  string transaction_id = 1;
  bool success = 2;
  string error_message = 3;
}`,
          },
        },
      ],
    },
  ],
};
