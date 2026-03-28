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
