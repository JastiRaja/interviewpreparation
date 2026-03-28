import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactModule from "./components/ReactModule";
import TypeScriptModule from "./components/TypeScriptModule";
import NodeJSModule from "./components/NodeJSModule";
import GitModule from "./components/GitModule";
import NextJSModule from "./components/NextJSModule";
import TailwindModule from "./components/TailwindModule";
import QuickCommandReference from "./components/QuickCommandReference";

type Module = "home" | "react" | "typescript" | "nodejs" | "git" | "nextjs" | "tailwind";

interface NavItem {
  id: Module;
  title: string;
  short: string;
  icon: string;
  description: string;
}

const navItems: NavItem[] = [
  {
    id: "home",
    title: "Home",
    short: "Home",
    icon: "🏠",
    description: "Welcome to the learning platform",
  },
  {
    id: "react",
    title: "React.js",
    short: "React",
    icon: "⚛️",
    description: "Learn React fundamentals and hooks",
  },
  {
    id: "typescript",
    title: "TypeScript",
    short: "TS",
    icon: "📘",
    description: "Master TypeScript types and interfaces",
  },
  {
    id: "nodejs",
    title: "Node.js",
    short: "Node",
    icon: "🟢",
    description: "Understand Node.js and npm commands",
  },
  {
    id: "git",
    title: "Git & GitHub",
    short: "Git",
    icon: "📚",
    description: "Master version control and collaboration",
  },
  {
    id: "nextjs",
    title: "Next.js",
    short: "Next",
    icon: "⚡",
    description: "The React framework for production",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    short: "TW",
    icon: "🎨",
    description: "Utility-first CSS framework",
  },
];

const learnItems = navItems.filter((item) => item.id !== "home");

export default function LearningApp() {
  const getModuleFromURL = (): Module => {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith("/")) {
      const path = hash.slice(1).split("/")[0];
      const validModules: Module[] = ["home", "react", "typescript", "nodejs", "git", "nextjs", "tailwind"];
      if (validModules.includes(path as Module)) {
        return path as Module;
      }
    }
    return "home";
  };

  const [activeModule, setActiveModule] = useState<Module>(getModuleFromURL());

  useEffect(() => {
    if (!window.location.hash || window.location.hash === "#") {
      window.history.replaceState(null, "", "#/");
    }
  }, []);

  useEffect(() => {
    const newHash = activeModule === "home" ? "#/" : `#/${activeModule}`;
    if (window.location.hash !== newHash && !window.location.hash.includes("?")) {
      window.history.replaceState(null, "", newHash);
    }
  }, [activeModule]);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveModule(getModuleFromURL());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleModuleChange = (moduleId: Module) => {
    setActiveModule(moduleId);
    const newHash = moduleId === "home" ? "#/" : `#/${moduleId}`;
    window.history.pushState(null, "", newHash);
  };

  const goToCommandReference = () => {
    handleModuleChange("home");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById("command-quick-ref")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  const isTopicModule = activeModule !== "home";

  const renderContent = (onNavigate?: (moduleId: Module) => void) => {
    switch (activeModule) {
      case "react":
        return <ReactModule />;
      case "typescript":
        return <TypeScriptModule />;
      case "nodejs":
        return <NodeJSModule />;
      case "git":
        return <GitModule />;
      case "nextjs":
        return <NextJSModule />;
      case "tailwind":
        return <TailwindModule />;
      default:
        return <HomePage onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="flex min-h-0 w-full max-w-full flex-1 flex-col overflow-hidden bg-zinc-100 text-zinc-900 antialiased">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_90%_60%_at_50%_-15%,rgba(99,102,241,0.12),transparent)]"
        aria-hidden
      />

      <header className="z-30 shrink-0 border-b border-zinc-200/80 bg-white/75 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-3 py-3 sm:px-4 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleModuleChange("home")}
              className="min-w-0 flex-1 text-left transition-opacity hover:opacity-80"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">Interview prep</p>
              <h1 className="text-lg font-bold tracking-tight text-zinc-900 sm:text-xl">Learn by topic</h1>
            </button>
            <button
              type="button"
              onClick={goToCommandReference}
              className="shrink-0 rounded-full border-2 border-indigo-300 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-900 shadow-sm hover:bg-indigo-100 sm:px-4 sm:text-sm"
            >
              Command lists
            </button>
          </div>

          <nav className="scrollbar-hide hidden items-center gap-1.5 overflow-x-auto pb-0.5 lg:flex" aria-label="Topics">
            {navItems.map((item) => {
              const active = activeModule === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleModuleChange(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/90 hover:text-zinc-900"
                  }`}
                  aria-current={active ? "page" : undefined}
                  aria-label={item.title}
                >
                  <span className="text-base leading-none">{item.icon}</span>
                  <span>{item.title}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="relative mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col">
        <main
          className={`flex w-full max-w-full min-h-0 flex-1 flex-col overflow-x-hidden px-3 py-4 pb-28 transition-all duration-300 sm:px-4 md:py-6 md:pb-6 lg:px-8 lg:pb-8 ${
            isTopicModule ? "overflow-hidden" : "overflow-y-auto overscroll-y-contain"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className={isTopicModule ? "flex min-h-0 flex-1 flex-col" : "w-full min-h-0"}
            >
              {renderContent(handleModuleChange)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-200/90 bg-white/90 pb-safe backdrop-blur-lg lg:hidden"
        aria-label="Mobile topics"
      >
        <div className="scrollbar-hide flex gap-0.5 overflow-x-auto px-2 py-2">
          {navItems.map((item) => {
            const active = activeModule === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleModuleChange(item.id)}
                className={`flex min-w-[4.25rem] shrink-0 flex-col items-center justify-center rounded-xl px-2 py-1.5 transition-all ${
                  active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-zinc-600 active:bg-zinc-100"
                }`}
                aria-current={active ? "page" : undefined}
                aria-label={item.title}
              >
                <span className="text-xl leading-none">{item.icon}</span>
                <span className="mt-0.5 max-w-[4.5rem] truncate text-center text-[10px] font-semibold">
                  {item.short}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate?: (moduleId: Module) => void }) {
  return (
    <div className="w-full space-y-10 sm:space-y-12">
      <QuickCommandReference />

      <section className="rounded-3xl border border-zinc-200/80 bg-white/80 p-8 shadow-lg shadow-zinc-900/5 backdrop-blur-sm sm:p-10 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 text-sm font-semibold text-indigo-600">Structured paths · Theory · Examples</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            Ship better interviews
          </h2>
          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">
            Practice React, TypeScript, Node.js, Git, Next.js, and Tailwind with clear explanations, code you can copy,
            and questions interviewers actually ask.
          </p>
        </motion.div>
      </section>

      <section>
        <h3 className="mb-4 text-lg font-semibold text-zinc-900 sm:mb-6 sm:text-xl">Choose a track</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learnItems.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onNavigate?.(item.id)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group flex w-full flex-col rounded-2xl border border-zinc-200/90 bg-white p-5 text-left shadow-sm transition-all hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-500/10 sm:p-6"
            >
              <span className="mb-3 text-3xl sm:text-4xl">{item.icon}</span>
              <h4 className="mb-2 text-lg font-bold text-zinc-900 sm:text-xl">{item.title}</h4>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-600 sm:text-base">{item.description}</p>
              <span className="text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                Open track →
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 p-6 text-white shadow-xl shadow-indigo-900/20 sm:p-8 md:p-10">
        <h3 className="mb-4 text-xl font-bold sm:text-2xl">What you&apos;ll cover</h3>
        <ul className="grid gap-2 text-sm leading-relaxed text-indigo-50 sm:grid-cols-2 sm:gap-3 sm:text-base">
          <li className="flex gap-2">
            <span aria-hidden>✓</span> React components, hooks, and patterns
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> TypeScript types, generics, and tooling
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> Node.js runtime, modules, and APIs
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> Git workflows and collaboration
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> Next.js routing and data fetching
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> Tailwind layout and design tokens
          </li>
        </ul>
      </section>
    </div>
  );
}
