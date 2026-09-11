import type { FullStackTrack } from "../fullstackTrackTypes";

export const sqlTrack: FullStackTrack = {
  layoutTitle: "SQL & relational databases",
  layoutSubtitle: "Schema, advanced queries, execution plans, transactions, and scaling",
  accent: "blue",
  defaultSectionId: "modeling",
  sections: [
    {
      id: "modeling",
      title: "Modeling & queries",
      icon: "🗃️",
      heroTitle: "🗃️ Modeling & queries",
      heroSubtitle: "Tables, relationships, CTEs, window functions, and set logic",
      heroGradient: "from-blue-600 to-indigo-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "What is SQL?",
          priority: "🔥",
          theory: {
            what: "SQL (Structured Query Language) is a declarative language for defining schemas (DDL), querying/modifying data (DML), and access control (DCL). The relational engine transforms declarative queries into optimized physical execution plans.",
            why: "Almost every full-stack and backend role touches relational stores (PostgreSQL, MySQL, SQL Server). Interviewers expect you to read, debug, and optimize raw SQL rather than relying blindly on ORMs.",
            how: "You model normalized entities with typed columns and keys, then express queries via SELECT, JOIN, WHERE, GROUP BY, and aggregations. Migrations track schema versions alongside application code.",
            keyPoints: [
              "Declarative: specify what data you need, the query planner decides how to scan and join",
              "ANSI standard with database-specific dialects and optimizations",
              "ORMs generate SQL; senior engineers debug and optimize generated queries",
            ],
            interviewQuestions: [
              {
                question: "What is the difference between DDL and DML?",
                answer: "DDL (Data Definition Language) defines structure: CREATE, ALTER, DROP tables, indexes, constraints. DML (Data Manipulation Language) queries or alters data: SELECT, INSERT, UPDATE, DELETE.",
              },
            ],
          },
          codeExample: {
            title: "Basic DML with aggregation & filtering",
            code: `SELECT u.email, COUNT(o.id) AS orders, SUM(o.total_cents) AS total_spent
FROM users u
LEFT JOIN orders o ON o.user_id = u.id AND o.status = 'completed'
WHERE u.active = TRUE
GROUP BY u.id, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 20;`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "Keys, constraints & normalization",
          theory: {
            what: "Primary keys (PK) uniquely identify rows. Foreign keys (FK) enforce referential integrity across tables. UNIQUE, NOT NULL, and CHECK constraints guarantee validity at the storage boundary. Normalization (1NF to 3NF/BCNF) removes redundancy and update anomalies.",
            why: "Application code can have bugs; the relational database is the single source of truth and ultimate defense against data corruption and orphan records.",
            how: "Model 1-to-many relationships via FK on the child table; many-to-many via a join/junction table. Use ON DELETE CASCADE or ON DELETE RESTRICT based on domain ownership lifecycle.",
            keyPoints: [
              "Surrogate keys (UUIDv7, BIGSERIAL) vs Natural keys (Email, SSN)",
              "Indexes should generally accompany foreign key columns for fast join lookups",
              "Denormalization is a deliberate read-performance optimization, done after identifying bottlenecks",
            ],
            interviewQuestions: [
              {
                question: "Why use foreign keys over application-level checks?",
                answer: "Foreign keys enforce referential integrity at the database engine level across all concurrent transactions, background jobs, and direct DB modifications, preventing orphan rows that application checks might miss during race conditions.",
              },
            ],
          },
          codeExample: {
            title: "Constraints, foreign keys & check clauses",
            code: `CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  total_cents INT NOT NULL CHECK (total_cents >= 0),
  currency VARCHAR(3) DEFAULT 'USD' NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index foreign key column for fast joins
CREATE INDEX idx_orders_user_id ON orders(user_id);`,
          },
        },
        {
          id: "3",
          number: 3,
          title: "JOINs & set logic",
          theory: {
            what: "JOIN operations combine rows from two or more tables based on matching conditions. INNER JOIN returns only matching rows; LEFT/RIGHT OUTER JOIN preserves unmatched rows from one side; FULL OUTER JOIN preserves both; CROSS JOIN computes the Cartesian product.",
            why: "Relational modeling separates data into normalized tables; queries assemble these entities back together. Misunderstanding joins causes duplicate rows, inflated aggregations, and Cartesian explosion.",
            how: "Join on indexed foreign keys. Use ANTI-JOIN patterns (LEFT JOIN WHERE right.id IS NULL or NOT EXISTS) to find non-associated records.",
            keyPoints: [
              "N+1 query anti-pattern: looping queries in code instead of batching via JOIN or WHERE IN",
              "EXISTS vs IN: EXISTS short-circuits on the first matching subquery row",
              "UNION ALL is faster than UNION because it skips expensive duplicate elimination",
            ],
            interviewQuestions: [
              {
                question: "When would you choose LEFT JOIN over INNER JOIN?",
                answer: "Use LEFT JOIN when you want all rows from the primary table even if there are zero matching records in the secondary table (e.g., listing all users and their order counts, including users who have never ordered).",
              },
            ],
          },
          codeExample: {
            title: "INNER, LEFT, and Anti-Join patterns",
            code: `-- Anti-join: Find users who have NEVER placed an order
SELECT u.id, u.email
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE o.id IS NULL;

-- Equivalent and often faster with subquery short-circuiting:
SELECT u.id, u.email
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.user_id = u.id
);`,
          },
        },
        {
          id: "4",
          number: 4,
          title: "Window functions",
          priority: "🔥",
          theory: {
            what: "Window functions perform calculations across a set of table rows related to the current row without collapsing the rows into a single output group like GROUP BY does. Common functions include ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD(), and SUM() OVER().",
            why: "Interviewers frequently test window functions for ranking problems (e.g., 'find top 3 salaries per department'), running totals, and time-series delta comparisons.",
            how: "Use OVER (PARTITION BY ... ORDER BY ... [ROWS/RANGE BETWEEN ...]). PARTITION BY divides rows into groups; ORDER BY sets ranking or sequence within the partition.",
            keyPoints: [
              "ROW_NUMBER(): unique sequential integer (1, 2, 3, 4)",
              "RANK(): ties share rank, next rank skips (1, 2, 2, 4)",
              "DENSE_RANK(): ties share rank, next rank does not skip (1, 2, 2, 3)",
              "LAG() and LEAD() access previous and next row values without a self-join",
            ],
            interviewQuestions: [
              {
                question: "How do you find the highest-paid employee in each department?",
                answer: "Use DENSE_RANK() or ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) in a CTE or subquery, then filter WHERE rank = 1.",
              },
            ],
          },
          codeExample: {
            title: "Top N per group & Running Total",
            code: `WITH ranked_employees AS (
  SELECT 
    id, 
    name, 
    department_id, 
    salary,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank_num,
    SUM(salary) OVER (PARTITION BY department_id ORDER BY hire_date) as running_dept_payroll
  FROM employees
)
SELECT id, name, department_id, salary, running_dept_payroll
FROM ranked_employees
WHERE rank_num <= 3;`,
          },
        },
        {
          id: "5",
          number: 5,
          title: "CTEs & Recursive queries",
          theory: {
            what: "Common Table Expressions (CTEs) define temporary named result sets using the WITH clause. Recursive CTEs reference themselves to traverse hierarchical, graph, or tree structures (e.g., org charts, category taxonomies).",
            why: "CTEs improve query readability and modularity. Recursive CTEs solve tree navigation that would otherwise require multiple round-trip queries in application code.",
            how: "A recursive CTE consists of an Anchor Member (base case), UNION ALL, and a Recursive Member (induction step) that joins with the CTE itself.",
            keyPoints: [
              "WITH RECURSIVE for hierarchical parent-child relationships",
              "PostgreSQL 12+ optimizes CTEs like subqueries (inlining) unless WITH ... MATERIALIZED is specified",
              "Always ensure a termination condition in recursive queries to prevent infinite loops",
            ],
            interviewQuestions: [
              {
                question: "How do you query a full managerial hierarchy in SQL?",
                answer: "Using a recursive CTE starting with the root manager (anchor) and joining employees whose manager_id matches the prior CTE row (recursive step).",
              },
            ],
          },
          codeExample: {
            title: "Recursive CTE for Employee Hierarchy",
            code: `WITH RECURSIVE OrgChart AS (
  -- Anchor member: top-level executives (no manager)
  SELECT id, name, manager_id, 1 AS level, CAST(name AS VARCHAR(255)) as path
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive member: direct reports
  SELECT e.id, e.name, e.manager_id, o.level + 1, CAST(o.path || ' -> ' || e.name AS VARCHAR(255))
  FROM employees e
  INNER JOIN OrgChart o ON e.manager_id = o.id
)
SELECT id, name, level, path
FROM OrgChart
ORDER BY level, path;`,
          },
        },
      ],
    },
    {
      id: "engine",
      title: "Engine, performance & scale",
      icon: "⚡",
      heroTitle: "⚡ Indexes, concurrency, transactions & scale",
      heroSubtitle: "Query execution plans, ACID isolation, lock management, and scaling",
      heroGradient: "from-sky-600 to-blue-800",
      concepts: [
        {
          id: "6",
          number: 6,
          title: "Indexes, B-Trees & Query execution plans",
          priority: "🔥",
          theory: {
            what: "Indexes are auxiliary data structures (predominantly B-Trees) that allow logarithmic O(log N) lookup times. The database query planner evaluates table statistics to decide between Index Scan, Index Only Scan, Bitmap Index Scan, and Sequential Scan.",
            why: "Database query latency is the #1 bottleneck in backend systems. Proper indexing turns multi-second full table scans into millisecond lookups.",
            how: "Index columns appearing in WHERE, JOIN, and ORDER BY clauses. Order composite index columns from highest equality selectivity to range filters. Use EXPLAIN (ANALYZE, BUFFERS) in PostgreSQL to diagnose bottlenecks.",
            keyPoints: [
              "Composite Index column order matters: (status, created_at) is different from (created_at, status)",
              "Covering Indexes (INCLUDE clause): satisfies queries entirely from the index tree without table heap lookup",
              "GIN / GiST indexes for full-text search, arrays, and JSONB columns",
              "Excessive indexing slows down INSERT, UPDATE, and DELETE operations",
            ],
            interviewQuestions: [
              {
                question: "Why would a query ignore an existing index on a column?",
                answer: "The planner may choose a sequential scan if the table is small, if the query selects a large percentage of total rows (low selectivity), if a function is applied to the column in the WHERE clause (e.g. WHERE LOWER(email) = 'x'), or if table statistics are outdated.",
              },
            ],
          },
          codeExample: {
            title: "EXPLAIN ANALYZE & Composite Indexes",
            code: `-- Create composite index matching query equality + range sort
CREATE INDEX CONCURRENTLY idx_orders_user_status_created 
ON orders(user_id, status, created_at DESC);

-- Analyze execution plan and buffer cache hits
EXPLAIN (ANALYZE, BUFFERS, COSTS)
SELECT id, total_cents, created_at
FROM orders
WHERE user_id = 42 AND status = 'paid'
ORDER BY created_at DESC
LIMIT 10;`,
          },
        },
        {
          id: "7",
          number: 7,
          title: "Transactions, ACID & Isolation levels",
          priority: "🔥",
          theory: {
            what: "ACID guarantees reliability: Atomicity (all-or-nothing), Consistency (integrity constraints), Isolation (concurrent executions don't conflict), and Durability (committed writes persist to disk WAL).",
            why: "Understanding isolation levels is essential to prevent financial race conditions, double booking, and inventory corruption in multi-threaded applications.",
            how: "SQL defines 4 standard ANSI isolation levels: Read Uncommitted, Read Committed (default in Postgres/Oracle), Repeatable Read (default in MySQL InnoDB), and Serializable.",
            keyPoints: [
              "Dirty Read: Reading uncommitted changes made by another concurrent transaction",
              "Non-Repeatable Read: Reading the same row twice gets different values because another transaction updated and committed it",
              "Phantom Read: Running a range query twice returns new rows inserted by another committed transaction",
              "MVCC (Multi-Version Concurrency Control): Readers don't block writers, and writers don't block readers",
            ],
            interviewQuestions: [
              {
                question: "What is the difference between Pessimistic and Optimistic Locking?",
                answer: "Pessimistic locking uses database locks (SELECT ... FOR UPDATE) to block other transactions from reading/writing until commit. Optimistic locking uses a version column (@Version); updates check WHERE version = expected_version and fail/retry if the version has changed.",
              },
            ],
          },
          codeExample: {
            title: "Pessimistic Lock & Atomic Transfer",
            code: `BEGIN;

-- Lock the specific row for update (prevents concurrent double-spend)
SELECT balance_cents 
FROM accounts 
WHERE id = 101 
FOR UPDATE;

-- Deduct from account 101
UPDATE accounts 
SET balance_cents = balance_cents - 5000 
WHERE id = 101 AND balance_cents >= 5000;

-- Credit account 102
UPDATE accounts 
SET balance_cents = balance_cents + 5000 
WHERE id = 102;

COMMIT;`,
          },
        },
        {
          id: "8",
          number: 8,
          title: "Connection pooling, Partitioning & Scaling",
          theory: {
            what: "As traffic grows, relational databases scale through Connection Pooling (PgBouncer), Read Replicas (primary-replica replication), Table Partitioning (splitting huge tables by range/list/hash), and Sharding (horizontal distribution across database nodes).",
            why: "Each database connection consumes 2-10 MB of RAM and OS thread overhead. Without pooling, a traffic spike will crash the database due to connection exhaustion.",
            how: "Place a connection pooler like PgBouncer between microservices and the primary database. Route read-heavy analytical queries to read replicas. Use declarative table partitioning on large time-series tables.",
            keyPoints: [
              "PgBouncer Transaction Pooling: reuses DB connections as soon as a transaction commits",
              "Replication Lag: reading immediately after writing to a replica might yield stale data (Read-Your-Own-Writes consistency issue)",
              "Table Partitioning keeps index sizes smaller than RAM, accelerating queries",
            ],
            interviewQuestions: [
              {
                question: "How do you handle the Read-Your-Own-Writes problem when using Read Replicas?",
                answer: "Route reads immediately following a mutation to the Primary (Master) database for a short window (or check replication LSN/timestamp token), while routing general read traffic to Replicas.",
              },
            ],
          },
          codeExample: {
            title: "Declarative Table Partitioning by Date Range (PostgreSQL)",
            code: `-- Parent partitioned table
CREATE TABLE audit_logs (
  id BIGSERIAL,
  event_name VARCHAR(100) NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Child monthly partitions
CREATE TABLE audit_logs_2026_01 PARTITION OF audit_logs
  FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');

CREATE TABLE audit_logs_2026_02 PARTITION OF audit_logs
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');`,
          },
        },
        {
          id: "9",
          number: 9,
          title: "Migrations & Zero-Downtime schema changes",
          theory: {
            what: "Schema migrations are versioned DDL scripts managed by tools like Flyway, Liquibase, Prisma, or Rails migrations. Zero-downtime deployments require backwards-compatible database changes so existing and new application versions run concurrently without failure.",
            why: "Locking a 50-million-row production table for 20 minutes to add or rename a column causes total service outage.",
            how: "Follow the Expand-and-Contract pattern: (1) Expand: Add new column nullable; (2) Dual Write: App writes to both columns; (3) Backfill historical data; (4) Contract: Switch reads to new column, then drop old column in a subsequent release.",
            keyPoints: [
              "Never perform breaking schema changes in a single deploy",
              "Use CREATE INDEX CONCURRENTLY in PostgreSQL to avoid write locks",
              "Set lock timeouts before running DDL: SET lock_timeout = '2s';",
            ],
            interviewQuestions: [
              {
                question: "How do you safely rename a production database column with zero downtime?",
                answer: "Do not use ALTER TABLE RENAME. Instead: (1) Add new column, (2) Deploy code writing to both columns, (3) Backfill old data to new column, (4) Deploy code reading from new column, (5) Drop old column in the next deployment cycle.",
              },
            ],
          },
          codeExample: {
            title: "Expand and Contract Migration Workflow",
            code: `-- Step 1: Add new column without default table locks
ALTER TABLE users ADD COLUMN full_name VARCHAR(255);

-- Step 2: Create index concurrently (no table lock)
CREATE INDEX CONCURRENTLY idx_users_full_name ON users(full_name);

-- Step 3: Backfill in batched transactions to prevent long table locks
UPDATE users 
SET full_name = first_name || ' ' || last_name 
WHERE full_name IS NULL AND id BETWEEN 1 AND 10000;`,
          },
        },
      ],
    },
  ],
};
