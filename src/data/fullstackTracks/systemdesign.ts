import type { FullStackTrack } from "../fullstackTrackTypes";

export const systemdesignTrack: FullStackTrack = {
  layoutTitle: "System Design & Distributed Systems",
  layoutSubtitle: "High-scale architecture, load balancing, message queues, Saga, and classic interview problems",
  accent: "indigo",
  defaultSectionId: "scalability",
  sections: [
    {
      id: "scalability",
      title: "Scalability & traffic",
      icon: "🏗️",
      heroTitle: "🏗️ Scalability, Load Balancing & Proxies",
      heroSubtitle: "Horizontal vs Vertical scaling, Consistent Hashing, and API Gateways",
      heroGradient: "from-indigo-600 via-blue-700 to-indigo-900",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "Horizontal vs Vertical Scaling & Bottlenecks",
          priority: "🔥",
          theory: {
            what: "Vertical Scaling (Scale-Up) adds more CPU, RAM, and NVMe disks to a single server instance. Horizontal Scaling (Scale-Out) adds more discrete stateless server nodes behind a load balancer. Scalability bottlenecks typically shift from compute (stateless apps) to database I/O, network bandwidth, and lock contention.",
            why: "Hardware has physical limits and vertical scaling introduces single points of failure (SPOF) with diminishing cost returns.",
            how: "Keep application servers completely stateless (sessions in Redis, files in S3/Cloud Storage) so instances can auto-scale dynamically based on CPU/traffic metrics.",
            keyPoints: [
              "Stateless App Tier: Any server can handle any user request at any time",
              "Amdahl's Law: System speedup is constrained by the non-parallelizable sequential parts of code",
              "Single Point of Failure (SPOF): Eliminate with redundancy at DNS, Load Balancer, App, and Database tiers",
            ],
            interviewQuestions: [
              {
                question: "How do you make an application horizontally scalable if it currently stores user sessions in server memory?",
                answer: "Decouple session state from application server RAM by moving session storage to an external centralized distributed in-memory cache (like Redis) or by adopting stateless cryptographically signed JWTs. This allows spinning up and destroying server instances without logging users out.",
              },
            ],
          },
          codeExample: {
            title: "Stateless Session Decoupling with Redis Store",
            code: `import express from "express";
import session from "express-session";
import { RedisStore } from "connect-redis";
import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL!);
const app = express();

// Decentralized session storage enables horizontal auto-scaling
app.use(
  session({
    store: new RedisStore({ client: redisClient, prefix: "sess:" }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly: true, maxAge: 86400000 },
  })
);`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "Load Balancing algorithms & Consistent Hashing",
          priority: "🔥",
          theory: {
            what: "Load Balancers (Layer 4 TCP vs Layer 7 HTTP) distribute incoming traffic across healthy backend servers. Algorithms include: Round Robin, Weighted Round Robin, Least Connections, IP Hash, and Consistent Hashing. Consistent Hashing maps both servers and data keys onto a virtual hash ring (0 to 2^32-1).",
            why: "In traditional hash(key) % N sharding, adding or removing a single node rehashes and invalidates ~99% of keys. Consistent Hashing relocates only K/N keys upon node membership changes.",
            how: "Use virtual nodes (vnodes) on the consistent hash ring to ensure uniform key distribution across servers and prevent hotspotting.",
            keyPoints: [
              "L4 Load Balancing: Operates at transport layer (fast, high throughput, routes by IP/Port)",
              "L7 Load Balancing: Operates at application layer (inspects HTTP path, headers, cookies, TLS termination)",
              "Consistent Hashing with Virtual Nodes: Essential for distributed caches (Redis/Memcached clusters, DynamoDB, Cassandra)",
            ],
            interviewQuestions: [
              {
                question: "What is Consistent Hashing and why are Virtual Nodes necessary?",
                answer: "Consistent Hashing arranges cache nodes on a circular hash ring (0 to 2^32-1) and assigns keys to the next closest node clockwise. When a node is added/removed, only adjacent keys move. Virtual nodes (multiple points on the ring per physical server) ensure uniform distribution and prevent load imbalances (hotspots).",
              },
            ],
          },
          codeExample: {
            title: "Consistent Hash Ring Concept Implementation (TypeScript)",
            code: `import crypto from "crypto";

export class ConsistentHashRing {
  private ring = new Map<number, string>();
  private sortedKeys: number[] = [];

  constructor(nodes: string[], private replicas = 100) {
    nodes.forEach((n) => this.addNode(n));
  }

  private hash(val: string): number {
    const hex = crypto.createHash("md5").update(val).digest("hex");
    return parseInt(hex.slice(0, 8), 16);
  }

  addNode(node: string) {
    for (let i = 0; i < this.replicas; i++) {
      const hashKey = this.hash(\`\${node}#\${i}\`);
      this.ring.set(hashKey, node);
      this.sortedKeys.push(hashKey);
    }
    this.sortedKeys.sort((a, b) => a - b);
  }

  getNode(key: string): string {
    const keyHash = this.hash(key);
    // Find next clockwise node
    const target = this.sortedKeys.find((k) => k >= keyHash);
    return this.ring.get(target ?? this.sortedKeys[0])!;
  }
}`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "API Gateways & Reverse Proxies",
          theory: {
            what: "An API Gateway (Kong, Envoy, AWS API Gateway) acts as the single entry point for all client requests in a microservices architecture. It handles Cross-Cutting Concerns: TLS Termination, Authentication & Token Validation, Rate Limiting, Request Routing, Load Shedding, and Analytics.",
            why: "Prevents duplicating auth, rate limiting, and SSL decryption logic across 50 independent microservices.",
            how: "Backend-for-Frontend (BFF) pattern: Tailor specific lightweight API Gateways for Web, Mobile, and Third-Party API integrations.",
            keyPoints: [
              "Reverse Proxy (NGINX, Envoy): Intermediary protecting internal servers and optimizing connection keep-alives",
              "BFF Pattern: Solves mobile network constraints by aggregating multiple microservice calls into one tailored payload",
              "Circuit Breaking at Gateway: Protects upstream services during downstream cascading failures",
            ],
            interviewQuestions: [
              {
                question: "What is the Backend-For-Frontend (BFF) pattern and what problem does it solve?",
                answer: "The BFF pattern creates dedicated API gateway layers tailored specifically for distinct client types (e.g. Mobile App BFF vs Web SPA BFF). Mobile clients need small aggregated payloads over high-latency cellular connections, while desktop web clients can consume broader datasets.",
              },
            ],
          },
          codeExample: {
            title: "API Gateway Reverse Proxy Route (NGINX)",
            code: `# NGINX API Gateway Configuration
upstream auth_service {
    server auth1.internal:4000;
    server auth2.internal:4000;
    keepalive 32;
}

upstream order_service {
    server order1.internal:5000;
    server order2.internal:5000;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;

    # Rate Limiting
    limit_req zone=api_limit burst=20 nodelay;

    location /v1/auth/ {
        proxy_pass http://auth_service/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Request-ID $request_id;
    }

    location /v1/orders/ {
        proxy_pass http://order_service/;
    }
}`,
          },
        },
      ],
    },
    {
      id: "async-resilience",
      title: "Async systems & resilience",
      icon: "⚡",
      heroTitle: "⚡ Message Queues, Sagas & Resilience",
      heroSubtitle: "Kafka vs RabbitMQ, Outbox Pattern, Saga Transactions, and Rate Limiting",
      heroGradient: "from-blue-700 via-indigo-800 to-purple-900",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Message Brokers: Kafka vs RabbitMQ vs SQS",
          priority: "🔥",
          theory: {
            what: "Message Brokers decouple services asynchronously. RabbitMQ is an AMQP message queue (smart broker, dumb consumer) where messages are removed once acknowledged. Apache Kafka is a distributed append-only commit log (dumb broker, smart consumer) with consumer group offsets that retains data for days/weeks.",
            why: "Synchronous HTTP calls between microservices create fragile chains where one slow service halts the entire request chain. Async queues buffer spikes and guarantee eventual execution.",
            how: "Use Kafka for event sourcing, high-throughput analytics, and pub/sub log streaming. Use RabbitMQ or SQS for complex routing, worker task queues, and point-to-point job processing.",
            keyPoints: [
              "Kafka Partitioning: Ordering is strictly guaranteed ONLY within the same partition",
              "Dead Letter Queue (DLQ): Isolates poisoned messages after retry attempts fail without blocking queue processing",
              "Backpressure: Prevents consumers from being overwhelmed by rate-limiting ingest",
            ],
            interviewQuestions: [
              {
                question: "How does Kafka guarantee message ordering in a topic with multiple partitions?",
                answer: "Kafka only guarantees total message ordering within an individual partition, not across the entire topic. To guarantee in-order processing for a specific entity (e.g. order-101), assign the entity ID as the message Key; Kafka hashes the key to route all events for that entity to the exact same partition.",
              },
            ],
          },
          codeExample: {
            title: "Transactional Outbox Pattern (Guaranteed At-Least-Once Delivery)",
            code: `// 1. Transactional Outbox Pattern: Save business entity + outbox event in ONE atomic DB transaction
BEGIN;

INSERT INTO orders (id, user_id, total, status)
VALUES ('ord_101', 'usr_42', 99.99, 'CREATED');

-- Event is written atomically to the same database (eliminates dual-write problem)
INSERT INTO outbox_events (id, aggregate_type, aggregate_id, payload, created_at)
VALUES (
  'evt_1', 
  'ORDER', 
  'ord_101', 
  '{"event":"OrderCreated","userId":"usr_42","total":99.99}', 
  NOW()
);

COMMIT;

// 2. Background CDC worker (e.g. Debezium) tails DB WAL and publishes outbox rows to Kafka reliably!`,
          },
        },
        {
          id: "5",
          number: 5,
          title: "Distributed transactions & Saga pattern",
          priority: "🔥",
          theory: {
            what: "Traditional ACID transactions (2PC - Two-Phase Commit) do not scale in microservices and hold blocking locks. The Saga Pattern manages distributed transactions as a sequence of local transactions across services. If a step fails, the Saga executes Compensating Transactions in reverse order to undo changes.",
            why: "Guarantees eventual consistency across independent microservices with separate databases (e.g. Order Service -> Payment Service -> Inventory Service -> Shipping Service).",
            how: "Two execution styles: (1) Choreography (event-driven: services publish and listen to events without a central coordinator), (2) Orchestration (a central state machine orchestrator tells each service when to execute and handles rollbacks).",
            keyPoints: [
              "Compensating Transaction: Reversible action (e.g., Refund Credit Card if Inventory reservation fails)",
              "Orchestration is preferred for complex multi-step workflows; easier to trace and debug",
              "Idempotent Consumers: Every saga step must be idempotent to handle network retries safely",
            ],
            interviewQuestions: [
              {
                question: "Explain the difference between Saga Choreography and Saga Orchestration.",
                answer: "In Choreography, services react to events from other services autonomously without central coordination (simple, but hard to trace in complex flows). In Orchestration, a dedicated coordinator service (e.g. Temporal, AWS Step Functions) explicitly commands each participant service what step to run next and coordinates compensating rollbacks on failure.",
              },
            ],
          },
          codeExample: {
            title: "Saga Orchestrator State Machine Flow",
            code: `/*
Saga Orchestration Flow for Checkout:
1. Create Pending Order (Order Service)
2. Authorize Payment (Payment Service) -> SUCCESS
3. Reserve Stock (Inventory Service)  -> FAILED (Out of Stock!)
--- ROLLBACK TRIGGERED ---
4. Compensating Action: Refund Payment (Payment Service)
5. Compensating Action: Cancel Order (Order Service)
6. Notify User: Checkout Failed
*/`,
          },
        },
        {
          id: "6",
          number: 6,
          title: "Rate Limiting algorithms & Circuit breakers",
          priority: "🔥",
          theory: {
            what: "Rate Limiting caps requests per user/IP over time to prevent abuse and DDoS. Algorithms include: Token Bucket (bursts allowed), Leaky Bucket (smooth output rate), and Sliding Window Counter. Circuit Breakers (Closed, Open, Half-Open) stop calling a failing downstream dependency to allow it to recover.",
            why: "Protects backend capacity from runaway loops, malicious scrapers, and cascading system failure.",
            how: "Use Redis with atomic Lua scripts for sliding window rate limiters. Implement Circuit Breakers (Opossum in Node, Resilience4j in Java) wrapping external API calls.",
            keyPoints: [
              "Token Bucket: Tokens added at constant rate; request consumes 1 token; handles bursts up to bucket capacity",
              "Sliding Window Counter: Combines previous window and current window weights to prevent boundary-burst attacks",
              "Circuit Breaker States: Closed (normal traffic) -> Open (all calls fail fast with fallback) -> Half-Open (test probe traffic)",
            ],
            interviewQuestions: [
              {
                question: "How does the Circuit Breaker pattern prevent cascading failures?",
                answer: "When downstream service failure rate exceeds a threshold (e.g. 50%), the breaker trips to 'OPEN'. Subsequent requests fail immediately or return cached fallbacks without consuming server threads or opening connections. After a timeout, it transitions to 'HALF-OPEN' to test if the downstream service has recovered.",
              },
            ],
          },
          codeExample: {
            title: "Sliding Window Rate Limiter using Redis Sorted Sets (ZADD)",
            code: `import Redis from "ioredis";
const redis = new Redis();

export async function isRateLimited(
  userId: string,
  limit = 100,
  windowSeconds = 60
): Promise<boolean> {
  const now = Date.now();
  const windowStart = now - windowSeconds * 1000;
  const key = \`ratelimit:\${userId}\`;

  const pipeline = redis.pipeline();
  // 1. Remove timestamps older than current sliding window
  pipeline.zremrangebyscore(key, 0, windowStart);
  // 2. Add current request timestamp
  pipeline.zadd(key, now, \`\${now}-\${Math.random()}\`);
  // 3. Count total requests in window
  pipeline.zcard(key);
  // 4. Auto-expire key
  pipeline.expire(key, windowSeconds);

  const results = await pipeline.exec();
  const requestCount = results?.[2][1] as number;

  return requestCount > limit; // True if rate limited
}`,
          },
        },
      ],
    },
    {
      id: "case-studies",
      title: "Classic interview problems",
      icon: "🎯",
      heroTitle: "🎯 Classic System Design Interview Problems",
      heroSubtitle: "End-to-end architecture breakdowns of top interview questions",
      heroGradient: "from-purple-700 via-violet-800 to-indigo-900",
      concepts: [
        {
          id: "7",
          number: 7,
          title: "Design a URL Shortener (TinyURL)",
          priority: "🔥",
          theory: {
            what: "Design a scalable service that converts long URLs (https://example.com/very/long/path) into short 7-character aliases (https://tiny.url/aB3x9Q) and redirects incoming clicks with sub-10ms latency.",
            why: "The archetypal system design interview question testing estimation, base62 encoding vs hashing, database choice, and cache strategy.",
            how: "High-level design: Client -> CDN/LB -> API Servers -> Redis Cache (90% read hit rate) -> NoSQL Store (DynamoDB/Cassandra) or PostgreSQL. Generate short codes using Base62 encoding (0-9, a-z, A-Z) over a distributed unique ID generator (Snowflake/Ticket Server).",
            keyPoints: [
              "Capacity Estimation: 100M new URLs/month = ~40 writes/sec, 4000 reads/sec (100:1 read-to-write ratio)",
              "Short URL length: 62^7 ≈ 3.5 trillion unique combinations (more than enough for decades)",
              "HTTP 301 (Permanent Redirect - cached by browser, lower server load) vs HTTP 302/307 (Temporary Redirect - hits server on every click for accurate analytics tracking)",
            ],
            interviewQuestions: [
              {
                question: "Why choose Base62 encoding over MD5/SHA256 hashing for URL shortening?",
                answer: "Hashing a long URL produces 128-256 bits. Truncating the hash to 7 characters causes hash collisions, requiring collision resolution logic. Base62-encoding a globally unique 64-bit integer (from a Snowflake ID generator) guarantees zero collisions without database lookup overhead.",
              },
            ],
          },
          codeExample: {
            title: "Base62 Encoding Algorithm Implementation",
            code: `const BASE62_CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function encodeBase62(num: bigint): string {
  let str = "";
  let n = num;
  while (n > 0n) {
    str = BASE62_CHARS[Number(n % 62n)] + str;
    n = n / 62n;
  }
  return str.padStart(7, "0");
}

export function decodeBase62(str: string): bigint {
  let num = 0n;
  for (const char of str) {
    num = num * 62n + BigInt(BASE62_CHARS.indexOf(char));
  }
  return num;
}`,
          },
        },
        {
          id: "8",
          number: 8,
          title: "Design a Distributed Notification System",
          priority: "🔥",
          theory: {
            what: "Design a system capable of sending millions of Push Notifications (APNs, FCM), SMS (Twilio), and Emails (SendGrid, SES) reliably with user preference filtering, rate limiting, and priority queues.",
            why: "Tests knowledge of multi-channel integration, async worker decoupling, idempotency, and high-throughput queuing.",
            how: "Architecture: API Gateway -> Notification Service -> Database (User preferences & device tokens) -> Priority Message Queues (Critical e.g. OTP vs Marketing) -> Worker Pool -> Third-Party Gateways (FCM/APNs/SES).",
            keyPoints: [
              "Deduplication & Idempotency: Prevent sending duplicate SMS/Push if a worker crashes mid-delivery",
              "User Preferences: Check DND (Do Not Disturb) hours and opt-out channels before queuing",
              "Rate Limiting per user: Prevent spamming a single user with 20 notifications in 10 minutes",
            ],
            interviewQuestions: [
              {
                question: "How do you handle third-party vendor rate limits and outages in a Notification System?",
                answer: "Isolate each delivery channel (SMS, Push, Email) into separate dedicated queues with configurable worker concurrency pools. Wrap vendor HTTP clients in Circuit Breakers with Exponential Backoff + Jitter retries, and route undeliverable messages to a Dead Letter Queue (DLQ).",
              },
            ],
          },
          codeExample: {
            title: "Notification System Pipeline Architecture",
            code: `/*
Notification Processing Pipeline:
[App Client] -> [Notification API]
                     │
         [User Preferences & DND Check]
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
 [High-Pri Queue] [Normal Queue] [Bulk Queue]
 (OTP, Security)  (Chat, Alerts) (Marketing)
      │              │              │
 [SMS Workers]  [Push Workers]  [Email Workers]
      │              │              │
 [Twilio/SNS]   [FCM / APNs]    [AWS SES]
*/`,
          },
        },
        {
          id: "9",
          number: 9,
          title: "Design a Real-Time Chat App (WhatsApp / Slack)",
          priority: "🔥",
          theory: {
            what: "Design a scalable 1-on-1 and group messaging platform supporting millions of concurrent connected users, real-time message delivery, presence status (Online/Offline), and message history sync.",
            why: "A flagship interview question evaluating stateful WebSocket cluster management, presence heartbeats, message ordering, and group fan-out strategies.",
            how: "Architecture: Clients establish persistent WebSocket connections with Chat Servers behind a Load Balancer. Redis Pub/Sub or Apache Kafka routes messages across server nodes. A Presence Service tracks active sessions with Redis TTL heartbeats (expired heartbeat = offline). Store messages in Cassandra/ScyllaDB (partitioned by (chat_id, bucket), clustered by message_id DESC).",
            keyPoints: [
              "WebSocket Connection Manager: Maps userId -> socketConnection across clustered servers via Redis Key-Value",
              "Small Group Chat (Fan-out on Write): Message is duplicated into each participant's inbox for fast reads",
              "Large Channel / Slack Room (Fan-out on Read): Single shared message stream to prevent write explosion",
              "End-to-End Encryption (Signal Protocol): Private keys stay strictly on mobile devices; servers only relay encrypted ciphertext",
            ],
            interviewQuestions: [
              {
                question: "How does the chat system know which WebSocket server a recipient user is connected to?",
                answer: "Maintain a User-Session Mapping in Redis. When a user connects to Chat Server #3, the server registers SET session:user_101 'chat-server-3' EX 60. When Sender sends a message to user_101, the gateway queries Redis, finds 'chat-server-3', and publishes the message to chat-server-3's internal message queue/channel.",
              },
            ],
          },
          codeExample: {
            title: "Chat Message Ingestion & Presence Heartbeat",
            code: `// WebSocket Message Router with Redis Pub/Sub
import Redis from "ioredis";
const redis = new Redis();
const pub = new Redis();

// 1. Register WebSocket connection location
export async function onUserConnect(userId: string, serverId: string) {
  await redis.set(\`user:session:\${userId}\`, serverId, "EX", 60);
  await redis.set(\`user:presence:\${userId}\`, "online", "EX", 60);
}

// 2. Route message to recipient's active server
export async function sendMessage(senderId: string, recipientId: string, text: string) {
  const targetServer = await redis.get(\`user:session:\${recipientId}\`);
  const messagePayload = JSON.stringify({
    id: crypto.randomUUID(),
    from: senderId,
    to: recipientId,
    text,
    timestamp: Date.now(),
  });

  if (targetServer) {
    // User is online: publish to target server channel
    await pub.publish(\`server:channel:\${targetServer}\`, messagePayload);
  }

  // Persist to distributed chat store (Cassandra / ScyllaDB)
  await saveMessageToDatabase(messagePayload);
}`,
          },
        },
        {
          id: "10",
          number: 10,
          title: "Design a Collaborative Editor (Google Docs / Figma)",
          priority: "🔥",
          theory: {
            what: "Design a real-time collaborative document or canvas editor allowing multiple users to edit the exact same document simultaneously without merge conflicts, data loss, or overwriting others' keystrokes.",
            why: "Tests advanced concurrency resolution algorithms: Operational Transformation (OT) and Conflict-free Replicated Data Types (CRDTs).",
            how: "Two primary approaches: (1) Operational Transformation (Google Docs): Central server acts as the single authority, transforming incoming operations against concurrent operations. (2) CRDTs (Figma, Yjs, Automerge): Peer-to-peer / decentralized data structures where operations commute mathematically (Order of arrival does not matter; all clients converge to the exact same state).",
            keyPoints: [
              "OT requires a central server to establish total operation order",
              "CRDTs (Logoot, YATA) assign unique fractional identifiers to characters, enabling offline editing and mesh synchronization",
              "WebSocket deltas: Send lightweight operation diffs ({ insert: 'a', pos: 4 }) rather than entire document snapshots",
            ],
            interviewQuestions: [
              {
                question: "What is the key difference between Operational Transformation (OT) and CRDTs?",
                answer: "OT transforms operation offsets (e.g. adjust position index if another user inserted text earlier) and requires a central server to coordinate sequence. CRDTs attach globally unique, ordered IDs to every character or object, making merge operations commutative and associative so any node can merge changes in any order without a central lock.",
              },
            ],
          },
          codeExample: {
            title: "CRDT Fractional Indexing Concept (TypeScript)",
            code: `// CRDT Character with Fractional Positional ID
interface CRDTChar {
  id: string;      // Unique Lamport timestamp: '1@clientA'
  pos: number[];   // Fractional index path: [0, 5, 2]
  char: string;
}

export function insertBetween(leftPos: number[], rightPos: number[], clientId: string, char: string): CRDTChar {
  // Generate a fractional position strictly between leftPos and rightPos
  const newPos = generateFractionalIndex(leftPos, rightPos);
  return {
    id: \`\${Date.now()}@\${clientId}\`,
    pos: newPos,
    char,
  };
}`,
          },
        },
        {
          id: "11",
          number: 11,
          title: "Design an E-Commerce Flash Sale System (Ticketmaster)",
          priority: "🔥",
          theory: {
            what: "Design a high-concurrency ticket/product flash sale system capable of handling 500,000 requests/second for 1,000 limited inventory seats without overselling, crashing, or database write lock contention.",
            why: "Evaluates handling extreme write concurrency, race condition prevention, waiting room queuing, and decoupled payment checkout.",
            how: "High-level flow: 1. Virtual Waiting Room (Cloudflare Waiting Room / Token Bucket queue) shields backend. 2. Redis In-Memory Atomic Decrement (DECRBY via Lua script) checks and reserves inventory in <1ms. 3. Temporary Inventory Hold (10-minute TTL in Redis). 4. Message Queue (Kafka/RabbitMQ) delivers order to async checkout workers. 5. If payment succeeds -> DB confirmed; if payment fails/times out -> Lua script increments Redis inventory back.",
            keyPoints: [
              "Never execute SELECT balance ... UPDATE balance in relational DB under 100k RPS (Deadlocks & row lock timeouts)",
              "Atomic Lua Script in Redis ensures checking stock and decrementing happens in a single indivisible step",
              "Virtual Waiting Room throttles incoming traffic to match backend processing capacity",
            ],
            interviewQuestions: [
              {
                question: "How do you prevent overselling when 100,000 users click 'Buy' simultaneously for 100 items?",
                answer: "Pre-warm inventory in Redis as a single key (e.g., SET stock:item_1 100). When users click Buy, execute an atomic Lua script: if redis.call('get', key) > 0 then redis.call('decr', key) return 1 else return 0. Only the 100 requests receiving '1' receive an order token; all others are rejected instantly at the cache layer without touching the database.",
              },
            ],
          },
          codeExample: {
            title: "Atomic Flash Sale Inventory Reservation (Redis Lua Script)",
            code: `import Redis from "ioredis";
const redis = new Redis();

// Atomic Check-and-Decrement Lua Script (Oversell Prevention)
const RESERVE_STOCK_LUA = \`
  local stock = tonumber(redis.call('get', KEYS[1]) or 0)
  if stock > 0 then
    redis.call('decr', KEYS[1])
    -- Create temporary reservation lock with 10-minute expiry
    redis.call('set', KEYS[2], ARGV[1], 'EX', 600)
    return 1
  else
    return 0
  end
\`;

export async function reserveTicket(eventId: string, userId: string): Promise<boolean> {
  const stockKey = \`inventory:event:\${eventId}\`;
  const reservationKey = \`reservation:event:\${eventId}:user:\${userId}\`;

  const result = await redis.eval(
    RESERVE_STOCK_LUA,
    2,
    stockKey,
    reservationKey,
    userId
  );

  return result === 1; // True if reserved, False if sold out
}`,
          },
        },
        {
          id: "12",
          number: 12,
          title: "Design a Distributed Unique ID Generator (Snowflake)",
          priority: "🔥",
          theory: {
            what: "Design a distributed unique ID generator capable of generating millions of globally unique, time-sortable 64-bit integer IDs per second across hundreds of independent server nodes without coordination locks.",
            why: "Relational auto-increment (BIGSERIAL) creates a single point of failure and bottleneck; UUIDv4 strings are 128-bit, non-sequential, and degrade B-Tree index insert performance.",
            how: "Twitter Snowflake 64-Bit Structure: (1) 1-bit unused sign bit, (2) 41-bit millisecond timestamp (gives 69 years from custom epoch), (3) 10-bit worker/datacenter ID (supports 1,024 nodes), (4) 12-bit sequence counter (generates 4,096 unique IDs per millisecond per node).",
            keyPoints: [
              "64-bit integers fit natively in BIGINT database columns and CPU registers",
              "Roughly time-ordered: Accelerates B-Tree index inserts (appends to right side of index tree)",
              "Clock Skew: If system clock drifts backwards (NTP sync), server must pause or reject requests until clock catches up",
            ],
            interviewQuestions: [
              {
                question: "Why is a Twitter Snowflake ID superior to a standard UUIDv4 for database primary keys?",
                answer: "UUIDv4 is completely random and 128 bits wide. Inserting random strings into B-Tree indexes causes heavy page splitting and random disk I/O. Snowflake IDs are 64-bit integers and strictly sequential by timestamp, allowing fast sequential append into B-Tree indexes with half the memory footprint.",
              },
            ],
          },
          codeExample: {
            title: "Twitter Snowflake 64-bit ID Generator Implementation",
            code: `export class SnowflakeIdGenerator {
  private epoch = 1704067200000n; // Custom Epoch (2024-01-01)
  private sequence = 0n;
  private lastTimestamp = -1n;

  constructor(private workerId: bigint, private datacenterId: bigint) {
    if (workerId > 31n || datacenterId > 31n) {
      throw new Error("Worker / Datacenter ID cannot exceed 31 (5 bits)");
    }
  }

  nextId(): bigint {
    let timestamp = BigInt(Date.now());

    if (timestamp < this.lastTimestamp) {
      throw new Error("Clock moved backwards! Refusing to generate ID.");
    }

    if (timestamp === this.lastTimestamp) {
      // Same millisecond: increment sequence counter (max 4095)
      this.sequence = (this.sequence + 1n) & 4095n;
      if (this.sequence === 0n) {
        // Millisecond overflow: wait for next millisecond
        while (timestamp <= this.lastTimestamp) {
          timestamp = BigInt(Date.now());
        }
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    // Bitwise packing: (Timestamp << 22) | (Datacenter << 17) | (Worker << 12) | Sequence
    return (
      ((timestamp - this.epoch) << 22n) |
      (this.datacenterId << 17n) |
      (this.workerId << 12n) |
      this.sequence
    );
  }
}`,
          },
        },
        {
          id: "13",
          number: 13,
          title: "Design a Video Streaming Platform (YouTube / Netflix)",
          priority: "🔥",
          theory: {
            what: "Design a large-scale video ingestion, transcoding, and streaming architecture capable of streaming high-definition video globally with adaptive quality based on user network conditions.",
            why: "Tests knowledge of blob storage, chunked async media pipelines, Adaptive Bitrate Streaming (HLS/DASH), and video edge caching.",
            how: "Architecture: 1. Ingestion: Client uploads raw video directly to S3 via Pre-Signed Multipart Uploads. 2. Transcoding: S3 event triggers worker pipeline (FFmpeg / AWS MediaConvert) splitting video into small 2-6 second chunks (.ts / .m4s) at multiple resolutions (1080p, 720p, 480p) + generating Master Playlist (.m3u8). 3. Delivery: CDN PoPs cache video chunks; client video player dynamically switches resolution streams.",
            keyPoints: [
              "HLS (HTTP Live Streaming) / MPEG-DASH: Industry standards for Adaptive Bitrate Streaming (ABR)",
              "Pre-Signed Multipart Upload: Enables resumable chunked video uploads directly from browser to object store",
              "CDN Edge caching: Video segments are static and immutable -> 99%+ cache hit ratio",
            ],
            interviewQuestions: [
              {
                question: "How does Adaptive Bitrate Streaming (HLS) adjust video quality during playback?",
                answer: "The video player downloads the Master .m3u8 playlist listing available bitrates. The player monitors buffer health and download speed per 4-second chunk. If bandwidth drops, the player requests the next 4-second chunk from the 480p playlist instead of 1080p without interrupting playback.",
              },
            ],
          },
          codeExample: {
            title: "HLS Master Playlist (.m3u8) Structure",
            code: `/*
#EXTM3U (HLS Master Playlist Example)

# 1080p High Quality Stream
#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080
1080p/index.m3u8

# 720p Medium Quality Stream
#EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720
720p/index.m3u8

# 480p Low Quality / Mobile Stream
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=854x480
480p/index.m3u8
*/`,
          },
        },
        {
          id: "14",
          number: 14,
          title: "Design Uber / Ride-Sharing Dispatch System",
          priority: "🔥",
          theory: {
            what: "Design a real-time ride-sharing dispatch system capable of processing millions of GPS location pings per second from active drivers, querying nearby available drivers in <50ms, and orchestrating ride requests, dynamic surge pricing, and trip matching.",
            why: "Tests geospatial indexing algorithms (Uber H3, Google S2, QuadTrees, Geohashes), high-throughput write streams, and distributed lock matchmaker engines.",
            how: "1. Driver Location Ingest: Driver app sends GPS ping (lat, lon) every 4s via WebSocket/gRPC to Location Ingest Service -> Buffer in Kafka. 2. Spatial Index: Location Service maps GPS to an H3 Hexagon Cell ID (Resolution 8 ≈ 460m) and updates Redis Geospatial (GEOADD / Redis Hashes). 3. Dispatch Matcher: When Rider requests a ride, query GEORADIUS or H3 k-ring neighbors -> filter active drivers -> send dispatch offer with 15s lock.",
            keyPoints: [
              "Uber H3 Hexagonal Grid: Hexagons have equal distance to all 6 adjacent neighbors (unlike squares with corners)",
              "Location Ping Ingestion: 1M active drivers * 1 ping/4s = 250,000 writes/sec (handled via in-memory Redis cluster + Kafka)",
              "Surge Pricing: Micro-regional supply/demand ratio calculated per H3 hex cell every 10 seconds",
            ],
            interviewQuestions: [
              {
                question: "Why does Uber use Hexagonal Hierarchical Spatial Indexing (H3) over square Geohash grids?",
                answer: "Square grid cells have irregular neighbor distances (orthogonal neighbors are distance 1, diagonal neighbors are distance √2). Hexagons have a single invariant distance between their center and all 6 adjacent neighbor centers, simplifying spatial smoothing, search radius traversal (k-rings), and surge pricing calculations.",
              },
            ],
          },
          codeExample: {
            title: "Redis Geospatial Driver Tracking & Dispatch Query",
            code: `import Redis from "ioredis";
const redis = new Redis();

// 1. Driver sends GPS Ping every 4 seconds
export async function updateDriverLocation(driverId: string, lat: number, lon: number) {
  // Store in Redis Geospatial Index (GEOADD key lon lat member)
  await redis.geoadd("drivers:active:locations", lon, lat, driverId);
  // Store driver metadata / status with 10s TTL
  await redis.set(\`driver:meta:\${driverId}\`, JSON.stringify({ status: "available", updated: Date.now() }), "EX", 10);
}

// 2. Rider requests ride -> Find 10 closest available drivers within 3km radius
export async function findNearbyDrivers(riderLat: number, riderLon: number, radiusKm = 3) {
  const nearby = await redis.georadius(
    "drivers:active:locations",
    riderLon,
    riderLat,
    radiusKm,
    "km",
    "WITHDIST",
    "WITHCOORD",
    "ASC",
    "COUNT",
    10
  );

  return nearby; // Returns closest drivers sorted by distance
}`,
          },
        },
        {
          id: "15",
          number: 15,
          title: "Design Twitter / Instagram Feed & Timeline",
          priority: "🔥",
          theory: {
            what: "Design a social media news feed system capable of generating personalized home timelines for 500M+ users with sub-100ms latency, handling both standard users and viral celebrity accounts with 100M+ followers.",
            why: "The classic system design interview question demonstrating the trade-offs between Fanout-on-Write (Push) and Fanout-on-Read (Pull) hybrid architectures.",
            how: "Hybrid Fanout Model: (1) Standard Users: Fanout-on-Write (Push). When a user posts a tweet, background workers push the tweetId to all followers' Redis timeline lists (LPUSH timeline:user_id tweetId). (2) Celebrity / High-Follower Users (>25k followers): Do NOT fan out to 50M followers! Instead, Fanout-on-Read (Pull). When a follower opens their app, merge their pre-computed Redis timeline with recent tweets pulled from celebrities they follow.",
            keyPoints: [
              "Fanout-on-Write (Push): Fast O(1) timeline reads, but massive write amplification for celebrities (1 post = 50M writes!)",
              "Fanout-on-Read (Pull): Fast writes, but slow timeline load times if following hundreds of accounts",
              "Hybrid Model combines the best of both: Push for 99% of regular users + Pull for celebrity accounts",
            ],
            interviewQuestions: [
              {
                question: "How does the Hybrid Fanout model solve the Celebrity Problem in Twitter's feed architecture?",
                answer: "When a celebrity (e.g. Elon Musk with 150M followers) tweets, pushing to 150M inboxes takes minutes and overwhelms queues. In the hybrid model, celebrity tweets are written only once to their user timeline. When a follower loads their feed, the system fetches their pre-computed push timeline and dynamically merges celebrity tweets into the stream.",
              },
            ],
          },
          codeExample: {
            title: "Hybrid Feed Fanout & Timeline Fetch Implementation",
            code: `import Redis from "ioredis";
const redis = new Redis();

// Fanout-on-Write for Normal Users
export async function publishTweet(authorId: string, tweetId: string, isCelebrity: boolean) {
  if (isCelebrity) {
    // Celebrity: write only to author's user timeline (No fanout!)
    await redis.lpush(\`user:tweets:\${authorId}\`, tweetId);
    return;
  }

  // Normal User: fanout to all followers' home timelines
  const followers = await getFollowerIds(authorId);
  const pipeline = redis.pipeline();

  for (const followerId of followers) {
    pipeline.lpush(\`timeline:home:\${followerId}\`, tweetId);
    pipeline.ltrim(\`timeline:home:\${followerId}\`, 0, 799); // Keep latest 800
  }

  await pipeline.exec();
}`,
          },
        },
        {
          id: "16",
          number: 16,
          title: "Design a Distributed Web Crawler & Indexer",
          priority: "🔥",
          theory: {
            what: "Design a distributed web crawler (like Googlebot) capable of crawling billions of web pages per month, respecting domain politeness, handling duplicate content, and producing an inverted index for search queries.",
            why: "Evaluates scalable queue management (URL Frontier), DNS caching, HTML stream parsing, duplicate detection (SimHash / Fingerprinting), and inverted index structures.",
            how: "Architecture: 1. URL Frontier: Priority Queue (Freshness / PageRank importance) -> Politeness Queue (FIFO queue per domain host with rate limiter, e.g. 1 request per second per domain). 2. Fetcher & DNS: Custom high-speed DNS resolver cache. 3. Content Extractor: Parse HTML, extract links -> push to URL Frontier. 4. Dedup: Calculate 64-bit SimHash of page text; check Hamming distance in Redis. 5. Inverted Indexer: Map terms -> [doc_id, term_frequency, positions].",
            keyPoints: [
              "URL Frontier Politeness: Never overwhelm a single domain host with 1,000 concurrent bot connections",
              "Robots.txt & Sitemap: Cache robots.txt permissions per domain host",
              "Spider Traps & Cycles: Cap maximum crawl depth and filter infinite calendar/query loop URLs",
            ],
            interviewQuestions: [
              {
                question: "How does the URL Frontier enforce domain politeness during crawling?",
                answer: "The URL Frontier maintains two layers: Priority Queues (ranks URLs by PageRank/importance) and Politeness Queues (one separate FIFO queue per hostname). A mapping table assigns each worker thread to a single domain queue with a timer enforcing a delay (e.g. 1000ms) between consecutive requests to the same host.",
              },
            ],
          },
          codeExample: {
            title: "Inverted Index Data Structure & Search Query",
            code: `/*
================================================================================
INVERTED INDEX DATA STRUCTURE
================================================================================
Term        | Posting List [DocID : Frequency : [Positions]]
------------+-------------------------------------------------------------------
"distributed" -> [Doc_1: 3: [2, 18, 45]], [Doc_4: 1: [12]], [Doc_9: 2: [5, 30]]
"database"    -> [Doc_1: 2: [3, 46]],     [Doc_2: 5: [1, 4, 8, 15, 22]]
"consistency" -> [Doc_1: 1: [19]],        [Doc_7: 2: [10, 14]]

Search Query: "distributed AND database"
Intersection: Intersect Doc_1 and Doc_4 posting lists -> Returns Doc_1 (Ranked by TF-IDF / BM25)
*/`,
          },
        },
      ],
    },
  ],
};
