import CodeExample from "./CodeExample";

const blocks: { id: string; title: string; summary: string; code: string }[] = [
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
];

export default function QuickCommandReference() {
  return (
    <section
      id="command-quick-ref"
      className="scroll-mt-4 rounded-3xl border-2 border-indigo-200/80 bg-white p-5 shadow-lg shadow-indigo-900/10 sm:p-7 md:p-8"
    >
      <div className="mb-6 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">Reference</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">Project &amp; CLI commands</h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
          Copy-ready commands for new projects, installs, and common tasks. Each learning track (React, Node.js, Next.js, Tailwind,
          TypeScript, Git) has a <strong className="font-semibold text-zinc-800">detailed command recap</strong> at the top of the
          main panel—use the matching <strong className="font-semibold text-zinc-800">command list</strong> button in the left
          sidebar to jump there.
        </p>
      </div>

      <div className="space-y-6">
        {blocks.map((b) => (
          <div key={b.id} className="rounded-2xl border border-zinc-200/90 bg-zinc-50/80 p-4 sm:p-5">
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
