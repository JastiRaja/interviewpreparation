import type { FullStackTrack } from "../fullstackTrackTypes";

export const nosqlTrack: FullStackTrack = {
  layoutTitle: "NoSQL & distributed databases",
  layoutSubtitle: "CAP/PACELC, DynamoDB Single-Table Design, MongoDB, Cassandra, and Redis data models",
  accent: "teal",
  defaultSectionId: "models",
  sections: [
    {
      id: "models",
      title: "Distributed theorems & data models",
      icon: "🍃",
      heroTitle: "🍃 CAP, PACELC, DynamoDB & NoSQL models",
      heroSubtitle: "Document, Key-Value, Wide-Column, Graph, and Single-Table design",
      heroGradient: "from-teal-600 to-emerald-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "CAP Theorem vs PACELC Theorem",
          priority: "🔥",
          theory: {
            what: "CAP states that in the presence of a network Partition (P), a distributed system must choose between Consistency (C - all nodes see the same data simultaneously) and Availability (A - every non-failing node returns a response). PACELC extends CAP: if Partition (P), choose Availability (A) or Consistency (C); Else (E), choose Latency (L) or Consistency (C).",
            why: "No database is simply 'fast and consistent'. PACELC explains why systems like DynamoDB and MongoDB trade latency for consistency even when there is no network partition.",
            how: "Configure Quorum reads and writes: N = replica factor, W = write quorum, R = read quorum. When W + R > N, strong consistency is guaranteed (Overlap Quorum).",
            keyPoints: [
              "CP Systems (HBase, MongoDB primary, ZooKeeper): sacrifices availability during partition to prevent split-brain",
              "AP Systems (Cassandra, DynamoDB, CouchDB): returns potentially stale data during partition to stay available",
              "PACELC: DynamoDB is PA/EL (favors Latency in normal operations; Availability during partitions)",
            ],
            interviewQuestions: [
              {
                question: "What is the PACELC theorem and how does it extend CAP?",
                answer: "CAP only describes system behavior during rare network partitions. PACELC adds what happens during normal operations (Else): systems must trade off between Latency (L) and Consistency (C). For example, Cassandra chooses PC/EC or PA/EL depending on quorum consistency settings.",
              },
            ],
          },
          codeExample: {
            title: "Configuring Quorum Consistency (Cassandra / DynamoDB)",
            code: `/*
Quorum Formula for Strong Consistency: (W + R > N)
Example with Replication Factor N = 3:
- Write Quorum (W) = 2 (Local Quorum)
- Read Quorum (R) = 2 (Local Quorum)
Because W + R (4) > N (3), at least 1 replica is guaranteed to have the latest write.
*/`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "DynamoDB Single-Table Design",
          priority: "🔥",
          theory: {
            what: "DynamoDB Single-Table Design models multiple distinct entity types (Users, Orders, Products, Comments) inside a single DynamoDB table using generic Partition Keys (PK) and Sort Keys (SK). Global Secondary Indexes (GSIs) enable diverse query patterns without relational joins.",
            why: "Joining multiple tables at massive scale is computationally prohibitive. Pre-joining and colocating related items into single item collections allows fetching parent and child records in a single sub-10ms query.",
            how: "Use hierarchical prefixes: PK = 'USER#101', SK = 'METADATA' (user profile) and SK = 'ORDER#2026-09-01' (orders belonging to that user). Query WHERE PK = 'USER#101' fetches the user and all their orders in one call.",
            keyPoints: [
              "Query (fast O(1) partition lookup) vs Scan (anti-pattern full table scan across all nodes)",
              "Item Collections: items sharing the exact same PK are stored together on the same physical storage partition",
              "Sparse Indexes: GSIs only index items containing the index attribute, saving huge costs",
            ],
            interviewQuestions: [
              {
                question: "Why is Single-Table Design preferred in DynamoDB over multi-table relational modeling?",
                answer: "DynamoDB has no relational JOIN operation. In a multi-table model, fetching a user and their 10 orders requires 11 network roundtrips. Single-table design groups related entities into the same partition, fetching all necessary data in a single, predictable O(1) query.",
              },
            ],
          },
          codeExample: {
            title: "DynamoDB Single-Table Item Collection Query",
            code: `import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

// Fetch User Profile AND all recent orders in a SINGLE Query operation
export async function getUserAndOrders(userId: string) {
  const command = new QueryCommand({
    TableName: "ECommerceTable",
    KeyConditionExpression: "PK = :pk AND SK BEGINS_WITH(:skPrefix)",
    ExpressionAttributeValues: {
      ":pk": \`USER#\${userId}\`,
      ":skPrefix": "ORDER#", // Or omit SK condition to get user profile + orders
    },
  });

  const response = await docClient.send(command);
  return response.Items;
}`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "MongoDB Modeling & Aggregation Pipeline",
          theory: {
            what: "MongoDB stores schema-flexible BSON documents in collections. Data modeling balances Embedding (denormalization for 1-to-few, fast single-document reads) vs Referencing (normalization for 1-to-many/many-to-many, using $lookup for joins).",
            why: "The 16MB document size limit and unbounded array growth anti-pattern require structured modeling.",
            how: "Construct Multi-stage Aggregation Pipelines ($match -> $project -> $unwind -> $group -> $lookup -> $sort) processed sequentially inside the database engine.",
            keyPoints: [
              "Unbounded Arrays Anti-Pattern: Never embed continuously growing lists (e.g. log entries or comments) inside a single document",
              "Compound Indexes: Index prefix rule (Equality, Sort, Range - ESR rule)",
              "Change Streams: Real-time change data capture (CDC) streaming DB events to consumers",
            ],
            interviewQuestions: [
              {
                question: "What is the ESR (Equality, Sort, Range) rule for MongoDB indexing?",
                answer: "When creating compound indexes to support queries with filters and sorting: place Equality fields first, followed by Sort fields, and finally Range filter fields (e.g., { status: 1, created_at: -1, price: 1 }).",
              },
            ],
          },
          codeExample: {
            title: "MongoDB Aggregation Pipeline with $lookup and $group",
            code: `// Aggregate total revenue per customer category
db.orders.aggregate([
  // 1. Filter completed orders (Equality)
  { $match: { status: "completed", createdAt: { $gte: ISODate("2026-01-01") } } },

  // 2. Join with users collection
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "customer"
    }
  },
  { $unwind: "$customer" },

  // 3. Group by customer segment and calculate sums
  {
    $group: {
      _id: "$customer.tier",
      totalRevenue: { $sum: "$totalAmount" },
      orderCount: { $sum: 1 }
    }
  },

  // 4. Sort descending
  { $sort: { totalRevenue: -1 } }
]);`,
          },
        },
        {
          id: "4",
          number: 4,
          title: "Wide-Column stores (Cassandra) & Sharding",
          theory: {
            what: "Wide-Column stores (Apache Cassandra, ScyllaDB) use a Masterless Peer-to-Peer architecture with Consistent Hashing ring topology and LSM-Tree (Log-Structured Merge-tree) write engines for massive write throughput.",
            why: "Ideal for massive write-heavy time-series, IoT telemetry, and global multi-region deployments with zero single point of failure.",
            how: "Partition Key determines which node in the token ring stores the row; Clustering Key dictates physical on-disk sort order within the partition SSTable files.",
            keyPoints: [
              "LSM Trees (Log-Structured Merge-tree): Append-only Memtable + CommitLog -> flushed to immutable SSTables (extremely fast sequential writes)",
              "Tombstones: Deletes write a tombstone marker; requires periodic compaction",
              "Hotspotting: Occurs when poor partition keys send all traffic to a single node",
            ],
            interviewQuestions: [
              {
                question: "Why are writes in Cassandra/LSM-Tree databases significantly faster than B-Tree relational databases?",
                answer: "B-Tree databases perform random disk I/O to update in-place pages. Cassandra writes sequentially to an append-only commit log and in-memory Memtable, deferring disk writes to asynchronous background SSTable flushes and compactions.",
              },
            ],
          },
          codeExample: {
            title: "Cassandra CQL Table with Composite Partition & Clustering Keys",
            code: `CREATE TABLE sensor_readings (
  sensor_id UUID,
  reading_date DATE,
  recorded_at TIMESTAMP,
  temperature DOUBLE,
  humidity DOUBLE,
  -- Partition Key: (sensor_id, reading_date) -> distributed across nodes
  -- Clustering Key: (recorded_at DESC) -> sorted on-disk per partition
  PRIMARY KEY ((sensor_id, reading_date), recorded_at)
) WITH CLUSTERING ORDER BY (recorded_at DESC);`,
          },
        },
      ],
    },
  ],
};
