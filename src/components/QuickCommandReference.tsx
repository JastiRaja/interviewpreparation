import CodeExample from "./CodeExample";

export const COMMAND_REFERENCE_BLOCKS: { id: string; title: string; summary: string; code: string }[] = [
  {
    id: "node-npm",
    title: "Node.js & npm",
    summary: "Check versions, start a project folder, install packages, run scripts.",
    code: `# Node & npm versions
node -v
npm -v

# New folder + npm project (creates package.json)
mkdir my-app && cd my-app
npm init -y

# Install dependencies
npm install react react-dom
npm install -D vite typescript @types/react

# Install one package globally (CLI tools)
npm install -g typescript

# Run a script from package.json ("dev", "build", "start")
npm run dev

# One-off CLI without global install
npx create-vite@latest my-app -- --template react-ts`,
  },
  {
    id: "react-vite",
    title: "React (Vite)",
    summary: "Scaffold a React app and common dev commands.",
    code: `# New React + Vite + TypeScript project
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev

# Production build + preview
npm run build
npm run preview`,
  },
  {
    id: "next",
    title: "Next.js",
    summary: "Create a Next app and run dev / production locally.",
    code: `# New Next.js app (App Router, TypeScript)
npx create-next-app@latest

# Inside project
npm run dev      # http://localhost:3000
npm run build
npm run start    # production server after build`,
  },
  {
    id: "typescript",
    title: "TypeScript",
    summary: "Add TS to an existing project or compile once.",
    code: `# Add to existing Node project
npm install -D typescript
npx tsc --init

# Compile (uses tsconfig.json)
npx tsc

# Watch mode
npx tsc --watch`,
  },
  {
    id: "tailwind",
    title: "Tailwind CSS (Vite)",
    summary: "Typical setup steps after a Vite project exists.",
    code: `# Tailwind v4 + Vite (see official docs if your stack differs)
npm install tailwindcss @tailwindcss/postcss postcss

# Then add @import "tailwindcss" in your CSS and configure Vite PostCSS.

# Dev / build (same as Vite)
npm run dev
npm run build`,
  },
  {
    id: "git-mini",
    title: "Git (essentials)",
    summary: "Daily workflow; open the Git track for a full command recap.",
    code: `git clone <url>
git status
git add .
git commit -m "message"
git push
git pull

# New repo from existing folder
git init
git remote add origin <url>`,
  },
  {
    id: "sql-generic",
    title: "SQL (ANSI-style queries)",
    summary: "Portable SELECT, JOIN, aggregate, and insert/update patterns across relational engines.",
    code: `-- Tables assumed: users(id, email, created_at), orders(id, user_id, total_cents, status)

-- Filter & sort
SELECT id, email
FROM users
WHERE created_at >= DATE '2024-06-01'
ORDER BY created_at DESC
LIMIT 50;  -- SQL Server: use TOP (50) ... without trailing LIMIT

-- INNER JOIN + aggregate
SELECT u.email, COUNT(o.id) AS order_count, COALESCE(SUM(o.total_cents), 0) AS revenue_cents
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.email
HAVING COUNT(o.id) > 0;

-- Insert / update
INSERT INTO users (email) VALUES ('new@example.com');
UPDATE orders SET status = 'shipped' WHERE id = 123;  -- use a parameter in apps`,
  },
  {
    id: "postgresql",
    title: "PostgreSQL",
    summary: "psql shell, connection string, and handy PG-specific SQL.",
    code: `# Connect (local)
psql -h localhost -p 5432 -U myuser -d mydb

# One-shot query from shell
psql -U myuser -d mydb -c "SELECT version();"

# Common connection URI (apps / .env)
# postgresql://USER:PASSWORD@HOST:5432/DBNAME?sslmode=require

-- JSON column + index (PG)
SELECT id, data->>'sku' AS sku
FROM products
WHERE data @> '{"active": true}'::jsonb;

-- Return rows from an insert
INSERT INTO users (email)
VALUES ('a@example.com')
RETURNING id, email, created_at;

-- Explain plan
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders WHERE user_id = 42;`,
  },
  {
    id: "mssql",
    title: "Microsoft SQL Server (T-SQL)",
    summary: "sqlcmd, connection notes, and typical T-SQL query examples.",
    code: `# sqlcmd (Windows / SQL tools)
sqlcmd -S localhost,1433 -U sa -P "YourPassword" -d mydb

# Run a query
sqlcmd -S .\\SQLEXPRESS -E -Q "SELECT @@VERSION;"

-- TOP instead of LIMIT; bracket identifiers if needed
SELECT TOP (100) u.Email, o.TotalCents
FROM dbo.Users AS u
INNER JOIN dbo.Orders AS o ON o.UserId = u.Id
WHERE o.Status = N'paid'
ORDER BY o.CreatedAt DESC;

-- Identity insert + scope
INSERT INTO dbo.Users (Email)
OUTPUT INSERTED.Id, INSERTED.Email
VALUES (N'new@example.com');

-- Window function
SELECT Email,
       ROW_NUMBER() OVER (PARTITION BY Region ORDER BY CreatedAt DESC) AS rn
FROM dbo.Users;`,
  },
  {
    id: "mysql",
    title: "MySQL / MariaDB",
    summary: "mysql client, connection, and common SQL patterns.",
    code: `# Interactive shell
mysql -h 127.0.0.1 -P 3306 -u myuser -p mydb

# One-shot
mysql -u myuser -p -e "SELECT VERSION();"

# JDBC-style URL (apps)
# jdbc:mysql://HOST:3306/DBNAME?useSSL=true&serverTimezone=UTC

-- LIMIT + offset pagination
SELECT id, email FROM users
WHERE active = 1
ORDER BY created_at DESC
LIMIT 20 OFFSET 40;

-- Explain
EXPLAIN FORMAT=JSON
SELECT * FROM orders WHERE user_id = 42;

-- Upsert-style (MySQL 8+)
INSERT INTO users (email, name)
VALUES ('u@example.com', 'U')
ON DUPLICATE KEY UPDATE name = VALUES(name);`,
  },
  {
    id: "mongodb",
    title: "MongoDB (mongosh)",
    summary: "Connect, CRUD, indexes, and aggregation examples.",
    code: `# Connect
mongosh "mongodb://USER:PASS@localhost:27017/mydb?authSource=admin"

# Or Atlas
mongosh "mongodb+srv://USER:PASS@cluster.mongodb.net/mydb"

-- Insert
db.users.insertOne({ email: "a@example.com", createdAt: new Date() });

-- Find with filter + projection + sort/limit
db.orders.find(
  { status: "open", total: { $gte: 10 } },
  { userId: 1, total: 1, _id: 0 }
).sort({ createdAt: -1 }).limit(25);

-- Update / upsert
db.users.updateOne(
  { email: "a@example.com" },
  { $set: { lastLogin: new Date() }, $inc: { loginCount: 1 } },
  { upsert: true }
);

-- Index
db.orders.createIndex({ userId: 1, createdAt: -1 });

-- Aggregation (orders per user)
db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: "$userId", revenue: { $sum: "$total" }, n: { $sum: 1 } } },
  { $sort: { revenue: -1 } },
  { $limit: 20 }
]);`,
  },
];

export default function QuickCommandReference() {
  return (
    <section
      id="command-quick-ref"
      className="scroll-mt-4 rounded-3xl border-2 border-indigo-200/80 bg-white p-5 shadow-lg shadow-indigo-900/10 sm:p-7 md:p-8"
    >
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Reference</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">Project, CLI &amp; database commands</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
          Copy-ready commands for new projects, installs, and common tasks—including{" "}
          <strong className="font-semibold text-zinc-800">SQL</strong>,{" "}
          <strong className="font-semibold text-zinc-800">PostgreSQL</strong>,{" "}
          <strong className="font-semibold text-zinc-800">SQL Server</strong>,{" "}
          <strong className="font-semibold text-zinc-800">MySQL</strong>, and{" "}
          <strong className="font-semibold text-zinc-800">MongoDB</strong> query examples below. Each learning track (React, Node.js,
          Next.js, Tailwind, TypeScript, Git, and others) has a{" "}
          <strong className="font-semibold text-zinc-800">detailed command recap</strong> at the top of the main panel when
          available—use the <strong className="font-semibold text-zinc-800">global search</strong> in the header or the
          matching command recap in the left sidebar when a track provides one.
        </p>
      </div>

      <div className="space-y-6">
        {COMMAND_REFERENCE_BLOCKS.map((b) => (
          <div
            key={b.id}
            id={`command-ref-${b.id}`}
            className="scroll-mt-24 rounded-2xl border border-zinc-200/90 bg-zinc-50/80 p-4 sm:p-5"
          >
            <h3 className="text-lg font-semibold text-zinc-900 sm:text-xl">{b.title}</h3>
            <p className="mt-1 text-sm text-zinc-600">{b.summary}</p>
            <div className="mt-3">
              <CodeExample title={b.title} code={b.code} showTitle={false} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
