export type CommandRecapRow = { command: string; purpose: string; note?: string };
export type CommandRecapGroup = { title: string; rows: CommandRecapRow[] };

export const gitCommandGroups: CommandRecapGroup[] = [
  {
    title: "Setup & identity",
    rows: [
      { command: "git --version", purpose: "Check Git is installed." },
      { command: "git config --global user.name \"Your Name\"", purpose: "Set name on commits." },
      { command: "git config --global user.email you@example.com", purpose: "Set email on commits." },
      { command: "git config --list", purpose: "Show all config (local + global)." },
      { command: "git help <command>", purpose: "Open help for a subcommand (e.g. git help commit)." },
    ],
  },
  {
    title: "Create & clone",
    rows: [
      { command: "git init", purpose: "Turn current folder into a new Git repository." },
      { command: "git clone <url>", purpose: "Copy a remote repo (with history) into a new folder." },
      { command: "git clone <url> my-folder", purpose: "Clone into a specific directory name." },
      { command: "git remote -v", purpose: "List remotes (fetch/push URLs)." },
      { command: "git remote add origin <url>", purpose: "Link local repo to a remote named origin." },
    ],
  },
  {
    title: "Status, diff & history",
    rows: [
      { command: "git status", purpose: "See staged/untracked files and branch name." },
      { command: "git diff", purpose: "Unstaged changes (working tree vs index)." },
      { command: "git diff --staged", purpose: "Staged changes (index vs last commit)." },
      { command: "git log", purpose: "Commit history (newest first)." },
      { command: "git log --oneline --graph --all", purpose: "Compact graph of all branches." },
      { command: "git show <commit>", purpose: "Show one commit: message + patch." },
    ],
  },
  {
    title: "Staging & commits",
    rows: [
      { command: "git add <file>", purpose: "Stage specific file(s)." },
      { command: "git add .", purpose: "Stage all changes in current directory (respects .gitignore)." },
      { command: "git add -p", purpose: "Interactively stage hunks." },
      { command: "git restore <file>", purpose: "Discard unstaged changes in file (Git 2.23+)." },
      { command: "git restore --staged <file>", purpose: "Unstage file, keep working copy changes." },
      { command: "git commit -m \"msg\"", purpose: "Create a commit with a message." },
      { command: "git commit --amend", purpose: "Change last commit message or add forgotten files.", note: "Rewrites history; avoid on shared branches." },
    ],
  },
  {
    title: "Branches",
    rows: [
      { command: "git branch", purpose: "List local branches (* = current)." },
      { command: "git branch <name>", purpose: "Create branch (stay on current branch)." },
      { command: "git switch <branch>", purpose: "Switch branch." },
      { command: "git switch -c <name>", purpose: "Create and switch to new branch." },
      { command: "git merge <branch>", purpose: "Merge branch into current branch." },
      { command: "git branch -d <name>", purpose: "Delete merged local branch." },
    ],
  },
  {
    title: "Remote: fetch, pull, push",
    rows: [
      { command: "git fetch", purpose: "Download remote updates without merging." },
      { command: "git pull", purpose: "Fetch + merge (or rebase if configured) current branch." },
      { command: "git pull --rebase", purpose: "Rebase local commits on top of remote." },
      { command: "git push", purpose: "Push current branch to its upstream." },
      { command: "git push -u origin <branch>", purpose: "Push branch and set upstream (first push)." },
    ],
  },
  {
    title: "Stash & undo",
    rows: [
      { command: "git stash", purpose: "Save uncommitted changes temporarily." },
      { command: "git stash pop", purpose: "Apply newest stash and remove it from list." },
      { command: "git revert <commit>", purpose: "New commit that undoes a past commit (safe for shared history)." },
      { command: "git reset --hard HEAD~1", purpose: "Remove last commit and discard changes.", note: "Destructive." },
    ],
  },
];

export const reactCommandGroups: CommandRecapGroup[] = [
  {
    title: "Create a React project",
    rows: [
      {
        command: "npm create vite@latest my-app -- --template react-ts",
        purpose: "New Vite + React + TypeScript app (modern default).",
      },
      { command: "npm create vite@latest my-app -- --template react", purpose: "Same stack using JavaScript instead of TS." },
      {
        command: "npx create-react-app my-app",
        purpose: "Legacy CRA scaffold; still seen in older tutorials.",
        note: "Prefer Vite or a framework (Next.js) for new projects.",
      },
      { command: "cd my-app && npm install", purpose: "Install dependencies after scaffold." },
    ],
  },
  {
    title: "Dev & build",
    rows: [
      { command: "npm run dev", purpose: "Start Vite dev server with HMR (usually http://localhost:5173)." },
      { command: "npm run build", purpose: "Production build to dist/." },
      { command: "npm run preview", purpose: "Locally preview the production build." },
      { command: "npm start", purpose: "In CRA, runs development server (not the same as Vite’s dev script name)." },
    ],
  },
  {
    title: "Lint & test (common)",
    rows: [
      { command: "npx eslint .", purpose: "Run ESLint on the project." },
      { command: "npm test", purpose: "Run test script if defined (e.g. Vitest/Jest)." },
      { command: "npx vitest", purpose: "Run Vitest directly when configured." },
    ],
  },
  {
    title: "Concepts → what you type",
    rows: [
      { command: "import { useState } from \"react\"", purpose: "Import a hook from the react package." },
      { command: "export default function App()", purpose: "Default export of a component (common in Vite entry)." },
      { command: "export function Button()", purpose: "Named export; import with { Button }." },
      { command: "<StrictMode>", purpose: "Dev-only extra checks; wrap root in main.tsx." },
    ],
  },
];

export const nodeCommandGroups: CommandRecapGroup[] = [
  {
    title: "Run JavaScript",
    rows: [
      { command: "node app.js", purpose: "Execute a file with Node." },
      { command: "node --version", purpose: "Print Node.js version." },
      { command: "node --inspect app.js", purpose: "Start with Chrome DevTools debugger attached." },
      { command: "node -e \"console.log(1+1)\"", purpose: "Run a one-line script without a file." },
    ],
  },
  {
    title: "npm project lifecycle",
    rows: [
      { command: "npm init -y", purpose: "Create package.json with defaults in current folder." },
      { command: "npm install", purpose: "Install all dependencies from package.json (creates node_modules)." },
      { command: "npm install express", purpose: "Add a runtime dependency and update package.json." },
      { command: "npm install -D nodemon", purpose: "Add a devDependency (-D)." },
      { command: "npm uninstall <pkg>", purpose: "Remove a package from the project." },
      { command: "npm run <script>", purpose: "Run a script from the \"scripts\" section of package.json." },
      { command: "npx <pkg>", purpose: "Run a package binary without global install (e.g. npx tsx file.ts)." },
    ],
  },
  {
    title: "Useful npm commands",
    rows: [
      { command: "npm outdated", purpose: "List dependencies that have newer versions." },
      { command: "npm update", purpose: "Update packages within semver ranges in package.json." },
      { command: "npm ls", purpose: "Show dependency tree." },
      { command: "npm cache clean --force", purpose: "Clear npm cache if installs act weird.", note: "Use sparingly." },
    ],
  },
  {
    title: "Modules (CommonJS vs ESM)",
    rows: [
      { command: "const fs = require(\"fs\")", purpose: "CommonJS require (typical in older Node or .cjs files)." },
      { command: "import fs from \"node:fs\"", purpose: "ESM import (type: module or .mjs)." },
      { command: "\"type\": \"module\" in package.json", purpose: "Treat .js files as ES modules." },
    ],
  },
];

export const nextCommandGroups: CommandRecapGroup[] = [
  {
    title: "Create a Next.js app",
    rows: [
      { command: "npx create-next-app@latest", purpose: "Interactive wizard: App Router, TS, ESLint, Tailwind, etc." },
      {
        command: "npx create-next-app@latest my-app --ts --tailwind --eslint --app --src-dir --import-alias \"@/*\"",
        purpose: "Non-interactive example with common flags.",
      },
    ],
  },
  {
    title: "Dev & production",
    rows: [
      { command: "npm run dev", purpose: "Start dev server (default http://localhost:3000)." },
      { command: "npm run build", purpose: "Production build (.next output)." },
      { command: "npm run start", purpose: "Run production server after build." },
      { command: "npx next info", purpose: "Print environment info for bug reports." },
    ],
  },
  {
    title: "Next CLI (npx next …)",
    rows: [
      { command: "npx next lint", purpose: "Run Next.js ESLint setup." },
      { command: "npx next build", purpose: "Same as npm run build if script delegates to next build." },
      { command: "npx next dev -p 4000", purpose: "Dev server on another port." },
    ],
  },
  {
    title: "Where things live (mental model)",
    rows: [
      { command: "app/", purpose: "App Router routes, layouts, page.tsx, route handlers." },
      { command: "pages/", purpose: "Pages Router (legacy); still supported if you chose it." },
      { command: "public/", purpose: "Static files served at /filename." },
      { command: "next.config.js / .mjs / .ts", purpose: "Framework configuration." },
    ],
  },
];

export const tailwindCommandGroups: CommandRecapGroup[] = [
  {
    title: "Install (Vite + Tailwind v4 style)",
    rows: [
      { command: "npm install tailwindcss @tailwindcss/postcss postcss", purpose: "Core packages for Tailwind v4 with PostCSS." },
      {
        command: "@import \"tailwindcss\"; in CSS",
        purpose: "Single import in your global CSS entry (per current Tailwind + Vite docs).",
      },
      {
        command: "postcss.config + Vite",
        purpose: "Wire @tailwindcss/postcss in PostCSS so Vite processes utility classes.",
        note: "Follow tailwindcss.com/docs for your bundler.",
      },
    ],
  },
  {
    title: "Dev & build",
    rows: [
      { command: "npm run dev", purpose: "Dev server; Tailwind classes are generated from scanned files." },
      { command: "npm run build", purpose: "Production build; unused styles stripped (content detection)." },
    ],
  },
  {
    title: "CLI (when used)",
    rows: [
      { command: "npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch", purpose: "Standalone CLI build/watch (older or custom pipelines)." },
    ],
  },
  {
    title: "Patterns you’ll use in className",
    rows: [
      { command: "flex items-center justify-between gap-4", purpose: "Flex row, vertical center, space-between, gap." },
      { command: "md:grid md:grid-cols-2", purpose: "Responsive: 2 columns from md breakpoint up." },
      { command: "hover:bg-zinc-100 dark:bg-zinc-900", purpose: "State + dark variant examples." },
      { command: "className={cn(base, condition && \"text-red-500\")}", purpose: "Conditional classes (often with clsx or tailwind-merge)." },
    ],
  },
];

export const typescriptCommandGroups: CommandRecapGroup[] = [
  {
    title: "Compiler (tsc)",
    rows: [
      { command: "npm install -D typescript", purpose: "Add TypeScript to a project." },
      { command: "npx tsc --init", purpose: "Create tsconfig.json with defaults." },
      { command: "npx tsc", purpose: "Typecheck and emit JS per tsconfig (if noEmit: false)." },
      { command: "npx tsc --noEmit", purpose: "Typecheck only; no output files." },
      { command: "npx tsc --watch", purpose: "Recompile on file changes." },
    ],
  },
  {
    title: "Run TS files directly",
    rows: [
      { command: "npx tsx src/script.ts", purpose: "Execute TypeScript with esbuild-powered tsx (fast)." },
      { command: "npx ts-node src/script.ts", purpose: "Run TS via ts-node (classic; often needs tsconfig paths)." },
    ],
  },
  {
    title: "tsconfig ideas",
    rows: [
      { command: "\"strict\": true", purpose: "Enable strict type-checking (recommended)." },
      { command: "\"noUncheckedIndexedAccess\": true", purpose: "Array/object index access may be undefined." },
      { command: "\"paths\": { \"@/*\": [\"./src/*\"] }", purpose: "Path aliases; pair with bundler resolver." },
    ],
  },
  {
    title: "Types you’ll mention in interviews",
    rows: [
      { command: "type ID = string", purpose: "Type alias." },
      { command: "interface User { id: string }", purpose: "Object shape; open to declaration merging." },
      { command: "function fn<T>(x: T): T", purpose: "Generic function." },
      { command: "as const", purpose: "Infer narrowest literal types." },
      { command: "satisfies", purpose: "Check value matches type without widening." },
    ],
  },
];

export const dockerCommandGroups: CommandRecapGroup[] = [
  {
    title: "Images & build",
    rows: [
      { command: "docker build -t app:v1 .", purpose: "Build an image from a Dockerfile in current directory." },
      { command: "docker build --no-cache -t app:v1 .", purpose: "Force clean build without cached layers." },
      { command: "docker images", purpose: "List all local images." },
      { command: "docker rmi <image_id>", purpose: "Remove local image." },
      { command: "docker tag app:v1 registry/app:v1", purpose: "Tag image for remote registry." },
      { command: "docker push registry/app:v1", purpose: "Push image to container registry." },
    ],
  },
  {
    title: "Containers & lifecycle",
    rows: [
      { command: "docker run -d -p 3000:3000 --name web app:v1", purpose: "Run container in background with port forwarding." },
      { command: "docker run -it --rm ubuntu bash", purpose: "Run interactive container, remove on exit." },
      { command: "docker ps", purpose: "List running containers." },
      { command: "docker ps -a", purpose: "List all containers (running and stopped)." },
      { command: "docker logs -f --tail 100 web", purpose: "Stream container logs (last 100 lines)." },
      { command: "docker exec -it web /bin/sh", purpose: "Open shell inside running container." },
      { command: "docker stop web && docker rm web", purpose: "Stop and delete container." },
    ],
  },
  {
    title: "Docker Compose",
    rows: [
      { command: "docker compose up -d --build", purpose: "Build and start all services in detached mode." },
      { command: "docker compose down -v", purpose: "Stop services and delete named volumes." },
      { command: "docker compose logs -f <service>", purpose: "Tail logs for a specific compose service." },
      { command: "docker compose exec <service> sh", purpose: "Execute shell in a compose service." },
    ],
  },
  {
    title: "Cleanup & disk management",
    rows: [
      { command: "docker system df", purpose: "Show Docker disk usage." },
      { command: "docker system prune -a --volumes", purpose: "Prune all unused containers, networks, images, and volumes." },
    ],
  },
];

export const k8sCommandGroups: CommandRecapGroup[] = [
  {
    title: "Cluster status & resources",
    rows: [
      { command: "kubectl get pods,svc,deploy -o wide", purpose: "List pods, services, and deployments with node IPs." },
      { command: "kubectl get all -n <namespace>", purpose: "List all resources in a given namespace." },
      { command: "kubectl describe pod <pod-name>", purpose: "Inspect pod events, crash loops, and resource limits." },
      { command: "kubectl top pods / kubectl top nodes", purpose: "View CPU & memory utilization (Metrics Server required)." },
    ],
  },
  {
    title: "Logs & debugging",
    rows: [
      { command: "kubectl logs -f <pod-name> -c <container>", purpose: "Stream container logs." },
      { command: "kubectl logs --previous <pod-name>", purpose: "Print logs for previous failed container instance." },
      { command: "kubectl exec -it <pod-name> -- /bin/sh", purpose: "Open interactive shell inside pod." },
      { command: "kubectl port-forward svc/<service> 8080:80", purpose: "Forward local port 8080 to cluster service port 80." },
    ],
  },
  {
    title: "Deployments & rollouts",
    rows: [
      { command: "kubectl apply -f ./k8s/", purpose: "Apply all declarative YAML manifests in directory." },
      { command: "kubectl rollout status deployment/<name>", purpose: "Watch deployment rollout progress." },
      { command: "kubectl rollout restart deployment/<name>", purpose: "Trigger rolling restart without config change." },
      { command: "kubectl rollout undo deployment/<name>", purpose: "Rollback deployment to previous revision." },
      { command: "kubectl scale deployment/<name> --replicas=5", purpose: "Imperatively scale pod replica count." },
    ],
  },
];

export const redisCommandGroups: CommandRecapGroup[] = [
  {
    title: "Key-Value & Strings",
    rows: [
      { command: "SET user:1 '{\"name\":\"Alex\"}' EX 3600", purpose: "Set key with TTL expiration in seconds." },
      { command: "GET user:1", purpose: "Get value by key." },
      { command: "INCR rate:user:1", purpose: "Atomic integer increment (great for rate limiting)." },
      { command: "EXPIRE user:1 60", purpose: "Set expiration timeout on existing key." },
      { command: "TTL user:1", purpose: "Check remaining time to live in seconds (-1: none, -2: expired)." },
    ],
  },
  {
    title: "Hashes & Data Structures",
    rows: [
      { command: "HSET user:100 name \"Alice\" role \"admin\"", purpose: "Store field-value pairs inside a Redis Hash." },
      { command: "HGETALL user:100", purpose: "Retrieve all fields and values from a hash." },
      { command: "LPUSH queue:jobs \"job_123\" && RPOP queue:jobs", purpose: "List-based FIFO job queue push & pop." },
      { command: "SADD session:active \"sess_1\" && SISMEMBER session:active \"sess_1\"", purpose: "Set add and membership check O(1)." },
      { command: "ZADD leaderboard 1500 \"user_a\" && ZREVRANGE leaderboard 0 9 WITHSCORES", purpose: "Sorted Set add & top 10 rank query." },
    ],
  },
  {
    title: "Server & diagnostics",
    rows: [
      { command: "redis-cli -h localhost -p 6379 ping", purpose: "Health-check Redis instance (returns PONG)." },
      { command: "INFO memory", purpose: "Inspect allocated memory and fragmentation ratio." },
      { command: "MONITOR", purpose: "Stream all live queries received by Redis in real-time (dev only)." },
    ],
  },
];

export const linuxCommandGroups: CommandRecapGroup[] = [
  {
    title: "Process & port inspection",
    rows: [
      { command: "lsof -i :3000 || netstat -tulnp | grep 3000", purpose: "Find PID listening on specific port." },
      { command: "ps aux | grep node", purpose: "List all running Node.js processes with PID and memory." },
      { command: "kill -9 <PID>", purpose: "Force kill process by PID." },
      { command: "htop / top", purpose: "Interactive real-time CPU & memory monitor." },
    ],
  },
  {
    title: "Network & HTTP testing",
    rows: [
      { command: "curl -iv -X POST http://api.com/v1 -H \"Content-Type: application/json\" -d '{\"k\":\"v\"}'", purpose: "Verbose HTTP POST request inspection." },
      { command: "curl -s http://api.com/data | jq '.items[0]'", purpose: "Pipe JSON API response into jq for parsing." },
      { command: "ping -c 4 google.com", purpose: "Send 4 ICMP echo packets to test network latency." },
      { command: "nc -zv 127.0.0.1 5432", purpose: "Netcat port connectivity test." },
    ],
  },
  {
    title: "File search & log analysis",
    rows: [
      { command: "tail -f -n 100 /var/log/app.log", purpose: "Follow live log file output." },
      { command: "grep -rn \"ERROR\" ./src", purpose: "Recursive search for string across files with line numbers." },
      { command: "find . -name \"*.log\" -mtime +7 -delete", purpose: "Find and delete log files older than 7 days." },
      { command: "df -h && free -m", purpose: "Show disk space and available RAM in human-readable units." },
    ],
  },
];

export const sqlCommandGroups: CommandRecapGroup[] = [
  {
    title: "PostgreSQL administration",
    rows: [
      { command: "psql -U postgres -d mydb -h localhost", purpose: "Connect to Postgres interactive shell." },
      { command: "\\dt+ / \\d+ table_name", purpose: "List tables with sizes / describe table columns & indexes." },
      { command: "EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM users WHERE email = 'a@b.com';", purpose: "Show actual query execution plan, timings, and cache hits." },
      { command: "pg_dump -U postgres -d mydb -F c -b -v -f mydb.dump", purpose: "Create compressed custom binary database backup." },
      { command: "pg_restore -U postgres -d mydb -v mydb.dump", purpose: "Restore custom format database backup." },
    ],
  },
  {
    title: "MySQL & General SQL",
    rows: [
      { command: "mysql -u root -p -e \"SHOW PROCESSLIST;\"", purpose: "List active client connections and slow queries." },
      { command: "CREATE INDEX CONCURRENTLY idx_users_email ON users(email);", purpose: "Build index without locking table writes (Postgres)." },
      { command: "VACUUM ANALYZE table_name;", purpose: "Reclaim dead tuples and update query planner statistics." },
    ],
  },
];
