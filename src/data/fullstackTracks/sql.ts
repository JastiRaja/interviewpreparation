import type { FullStackTrack } from "../fullstackTrackTypes";

export const sqlTrack: FullStackTrack = {
  layoutTitle: "SQL & relational databases",
  layoutSubtitle: "Schema, queries, transactions, and evolution",
  accent: "blue",
  defaultSectionId: "modeling",
  sections: [
    {
      id: "modeling",
      title: "Modeling & queries",
      icon: "🗃️",
      heroTitle: "🗃️ Modeling & queries",
      heroSubtitle: "Tables, relationships, and the language of relational data",
      heroGradient: "from-blue-600 to-indigo-700",
      concepts: [
        {
          id: "1",
          number: 1,
          title: "What is SQL?",
          priority: "🔥",
          theory: {
            what: "SQL (Structured Query Language) is a declarative language for defining and querying relational data: schemas (DDL), data changes (DML), and access control. Rows live in tables with typed columns; the engine optimizes execution plans.",
            why: "Almost every full-stack role touches a relational store (Postgres, MySQL, SQL Server). Interviewers expect you to read and reason about SQL, not only use an ORM.",
            how: "You model entities as tables, relate them with keys, then use SELECT/JOIN/WHERE/GROUP BY to answer questions. Migrations version the schema alongside application code.",
            keyPoints: ["Declarative: you describe what, not how to scan", "ANSI SQL + dialect-specific extras", "ORMs generate SQL—you still debug it"],
            interviewQuestions: [
              {
                question: "What is the difference between DDL and DML?",
                answer: "DDL (Data Definition Language) defines structure: CREATE/ALTER/DROP tables, indexes, constraints. DML manipulates rows: SELECT, INSERT, UPDATE, DELETE.",
              },
            ],
          },
          codeExample: {
            title: "Basic DML",
            code: `SELECT u.email, COUNT(o.id) AS orders
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
WHERE u.active = TRUE
GROUP BY u.id, u.email
HAVING COUNT(o.id) > 0
ORDER BY orders DESC
LIMIT 20;`,
          },
        },
        {
          id: "2",
          number: 2,
          title: "Keys, constraints & relationships",
          theory: {
            what: "Primary keys uniquely identify a row (often surrogate IDs). Foreign keys enforce referential integrity between tables. UNIQUE, NOT NULL, and CHECK constraints keep data valid at the database boundary.",
            why: "The database is the last line of defense against inconsistent data when multiple apps or batches write the same tables.",
            how: "Model one-to-many with FK on the many side; many-to-many via a join table. ON DELETE CASCADE/RESTRICT defines lifecycle rules.",
            keyPoints: ["Surrogate keys vs natural keys trade-offs", "Indexes often follow FK columns for join performance", "Defer validation in transactions when needed"],
            interviewQuestions: [
              {
                question: "Why use foreign keys?",
                answer: "They enforce that child rows reference existing parent rows, preventing orphans. The database rejects invalid inserts/updates, which is stronger than only checking in application code.",
              },
            ],
          },
        },
        {
          id: "3",
          number: 3,
          title: "JOINs & set logic",
          theory: {
            what: "JOIN combines rows from two or more tables on a predicate. INNER keeps matches only; LEFT/RIGHT keep non-matching rows from one side with NULLs; FULL keeps both. UNION stacks result sets; EXISTS tests subqueries.",
            why: "Most reporting and API aggregation paths go through joins; misunderstanding them causes wrong counts and duplicate rows.",
            how: "Watch Cartesian products from missing join conditions. Use DISTINCT or subqueries when duplicates appear from one-to-many joins.",
            keyPoints: ["N+1 queries: fetch lists in loops—batch with JOIN or IN", "Anti-join patterns with NOT EXISTS", "Venn diagram intuition for join types"],
            interviewQuestions: [
              {
                question: "When would you use LEFT JOIN instead of INNER JOIN?",
                answer: "When you need all rows from the left table regardless of matches on the right—e.g. all users and their order count, including users with zero orders.",
              },
            ],
          },
          codeExample: {
            title: "LEFT JOIN",
            code: `SELECT c.name, o.id AS order_id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;`,
          },
        },
      ],
    },
    {
      id: "engine",
      title: "Engine & operations",
      icon: "⚡",
      heroTitle: "⚡ Indexes, transactions, migrations",
      heroSubtitle: "Performance, correctness, and safe schema change",
      heroGradient: "from-sky-600 to-blue-800",
      concepts: [
        {
          id: "4",
          number: 4,
          title: "Indexes & query plans",
          theory: {
            what: "Indexes (B-tree is common) speed lookups and joins at the cost of storage and write overhead. The planner chooses index vs sequential scan based on statistics and predicates.",
            why: "Slow queries dominate production incidents; indexes are the first lever after fixing obvious SQL mistakes.",
            how: "Index columns used in WHERE/JOIN/ORDER BY. Covering indexes include all selected columns. EXPLAIN (ANALYZE) shows the real plan in Postgres.",
            keyPoints: ["Too many indexes hurt INSERT/UPDATE", "Selectivity matters—index on gender alone may not help", "Partial indexes for filtered hot paths"],
            interviewQuestions: [
              {
                question: "Why might adding an index slow writes?",
                answer: "Each INSERT/UPDATE/DELETE must maintain the index structure, so more indexes mean more work per write and more storage. The planner may also choose worse plans if statistics go stale.",
              },
            ],
          },
        },
        {
          id: "5",
          number: 5,
          title: "Transactions, ACID & isolation",
          priority: "🔥",
          theory: {
            what: "A transaction bundles operations into an atomic unit: All-or-nothing (Atomicity), consistent constraints (Consistency), isolated from others (Isolation), durable after commit (Durability).",
            why: "Race conditions and partial updates corrupt money, inventory, and accounts—interviews love isolation level questions.",
            how: "Use BEGIN/COMMIT/ROLLBACK. Isolation levels (READ COMMITTED, REPEATABLE READ, SERIALIZABLE) trade concurrency vs anomalies (dirty read, non-repeatable read, phantom).",
            keyPoints: ["Locks vs MVCC (common in Postgres)", "Deadlocks: consistent lock ordering helps", "Keep transactions short"],
            interviewQuestions: [
              {
                question: "What is a phantom read?",
                answer: "In one transaction, running the same range query twice returns different rows because another transaction inserted matching rows in between—possible under some isolation levels unless prevented (e.g. SERIALIZABLE or locking).",
              },
            ],
          },
        },
        {
          id: "6",
          number: 6,
          title: "Migrations & schema evolution",
          theory: {
            what: "Migrations are versioned scripts (Flyway, Liquibase, Rails, Prisma) that change schema in order across environments. They pair with backward-compatible deploy strategies.",
            why: "Manual SQL in prod is error-prone; migrations give reviewable, repeatable history.",
            how: "Expand/contract pattern: add new column nullable, dual-write, backfill, switch reads, remove old. Long operations may use online schema tools or phased cuts.",
            keyPoints: ["Never break running code: additive first", "Large table ALTERs can lock—plan maintenance windows or online DDL", "Seed data separately from schema when possible"],
            interviewQuestions: [
              {
                question: "How do you rename a column used in production?",
                answer: "Often add the new column, copy data in batches, deploy code that writes both, switch reads, then drop the old column—rather than a blocking rename that breaks old app versions.",
              },
            ],
          },
          codeExample: {
            title: "Flyway-style naming",
            code: `V1__create_users.sql
V2__add_orders_table.sql
V3__index_orders_user_id.sql`,
          },
        },
      ],
    },
  ],
};
