import type { FullStackTrack } from "../fullstackTrackTypes";

export const nosqlTrack: FullStackTrack = {
  layoutTitle: "NoSQL",
  layoutSubtitle: "Models, trade-offs, and operations at scale",
  accent: "teal",
  defaultSectionId: "models",
  sections: [
    {
      id: "models",
      title: "Data models",
      icon: "🍃",
      heroTitle: "🍃 Document, key-value, wide-column, graph",
      heroSubtitle: "Choose the shape of your data store",
      heroGradient: "from-teal-600 to-emerald-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "CAP, consistency & BASE",
          priority: "🔥",
          theory: {
            what: "CAP states that during a partition you cannot have both full availability and strong linearizability. In practice, distributed systems pick per-operation consistency models. BASE (Basically Available, Soft state, Eventual consistency) contrasts with ACID.",
            why: "Interviewers check you don’t claim NoSQL is ‘faster’ without context—you must discuss consistency and access patterns.",
            how: "Read vendor docs for default consistency (e.g. Dynamo eventual vs strong reads). Design idempotent writes and version vectors where needed.",
            keyPoints: ["Partitions happen—design for them", "PACELC refines CAP with latency vs consistency", "Strong consistency costs latency and throughput"],
            interviewQuestions: [
              {
                question: "What is eventual consistency?",
                answer: "Replicas converge to the same state given enough time without new writes—reads may temporarily return stale data. Apps must tolerate or explicitly request stronger reads where needed.",
              },
            ],
          },
        },
        {
          id: "2",
          number: 2,
          title: "Document, key-value, wide-column, graph",
          theory: {
            what: "Document stores (MongoDB, CouchDB) nest JSON-like documents. Key-value (Redis, DynamoDB as KV) is simplest lookup. Wide-column (Cassandra, Bigtable) partitions wide sparse rows by column family. Graph DBs (Neo4j) optimize traversals.",
            why: "Model choice follows query patterns, not hype.",
            how: "Embed one-to-few, reference one-to-many across documents. KV for sessions and caches. Wide-column for time-series and huge scale-out writes. Graph for relationship-heavy queries.",
            keyPoints: ["Avoid document models that require cross-shard joins everywhere", "Secondary indexes have cost in each system", "Schema flexibility ≠ no design"],
            interviewQuestions: [
              {
                question: "When is a graph database appropriate?",
                answer: "When queries are dominated by multi-hop relationship traversals (social nets, fraud rings, recommendations) and relational joins become unwieldy at scale.",
              },
            ],
          },
        },
        {
          id: "3",
          number: 3,
          title: "MongoDB-style modeling",
          theory: {
            what: "Collections hold BSON documents with flexible schema. Embedding duplicates data but avoids joins; referencing normalizes like FKs but needs application joins or $lookup.",
            why: "The 16MB document limit and write amplification on large arrays constrain design.",
            how: "Shard key choice affects hotspotting—hash or compound keys for even spread. Indexes support queries you actually run.",
            keyPoints: ["Atomicity is document-scoped", "Change streams for CDC-style patterns", "Transactions exist but have overhead"],
            interviewQuestions: [
              {
                question: "Embed vs reference in MongoDB?",
                answer: "Embed when data is read together and bounded in size; reference when documents grow unbounded or the same subdocument is shared and must update in one place.",
              },
            ],
          },
          codeExample: {
            title: "Embedded vs reference",
            code: `// Embedded address (read with user)
{ _id: 1, name: "Ada", address: { city: "London" } }

// Reference orders
{ _id: "o1", userId: 1, total: 42 }`,
          },
        },
      ],
    },
    {
      id: "ops",
      title: "Scale & SQL vs NoSQL",
      icon: "📈",
      heroTitle: "📈 Sharding & choosing stores",
      heroSubtitle: "Operations and decision criteria",
      heroGradient: "from-emerald-600 to-teal-800",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Sharding, replication & tunable quorum",
          theory: {
            what: "Sharding partitions data across nodes by key range or hash. Replication copies shards for availability—leader/follower or leaderless. Tunable R/W quorum (Dynamo-style) trades consistency for availability.",
            why: "Full-stack engineers debug hot shards and replica lag in prod.",
            how: "Monitor lag, repair entropy, and rebalance when nodes join. Choose replication factor for AZ failure tolerance.",
            keyPoints: ["Hot keys need application-level splitting", "Cross-shard transactions are expensive", "Read from followers may be stale"],
            interviewQuestions: [
              {
                question: "What is a hot shard?",
                answer: "A partition that receives disproportionate traffic or writes, becoming a bottleneck while other shards are idle—often from a poorly chosen shard key like monotonic IDs or a celebrity key.",
              },
            ],
          },
        },
        {
          id: "5",
          number: 5,
          title: "When SQL vs NoSQL",
          theory: {
            what: "SQL shines for complex ad hoc queries, strong constraints, and mature tooling. NoSQL fits flexible schema, extreme scale-out, or specialized access patterns (KV, document, time-series).",
            why: "Polyglot persistence is normal—different services pick different stores.",
            how: "Start with requirements: consistency, query shapes, growth, ops skills. Many teams still use Postgres first.",
            keyPoints: ["JSON columns blur SQL/document lines", "Not every app needs Cassandra", "Migrations still matter in document stores"],
            interviewQuestions: [
              {
                question: "Is NoSQL always more scalable than SQL?",
                answer: "No. Managed SQL can scale very far vertically and with read replicas; some NewSQL systems shard transparently. NoSQL often trades features (joins, transactions) for horizontal scale under specific workloads.",
              },
            ],
          },
        },
        {
          id: "6",
          number: 6,
          title: "Search & analytics alongside NoSQL",
          theory: {
            what: "Elasticsearch/OpenSearch, Solr, and cloud search power full-text and faceted search. Data lakes/warehouses (BigQuery, Snowflake) handle analytics. CDC streams sync OLTP to OLAP.",
            why: "Primary NoSQL/ SQL DBs are poor at fuzzy search and heavy aggregations across TBs.",
            how: "Dual-write vs log-based CDC; idempotent consumers; schema registry for events.",
            keyPoints: ["Operational burden of running search clusters", "PII in indexes needs governance", "Batch vs stream for freshness"],
            interviewQuestions: [
              {
                question: "Why not run all analytics on the production OLTP database?",
                answer: "Heavy scans and aggregations contend with transactional traffic, risk stability, and may need different schema (star/snowflake). Analytical stores optimize cost and performance for large scans.",
              },
            ],
          },
        },
      ],
    },
  ],
};
