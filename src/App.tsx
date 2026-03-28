import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactModule from "./components/ReactModule";
import TypeScriptModule from "./components/TypeScriptModule";
import NodeJSModule from "./components/NodeJSModule";
import GitModule from "./components/GitModule";
import NextJSModule from "./components/NextJSModule";
import TailwindModule from "./components/TailwindModule";
import JavaModule from "./components/JavaModule";
import SqlModule from "./components/SqlModule";
import HttpApisModule from "./components/HttpApisModule";
import AuthModule from "./components/AuthModule";
import ContainersModule from "./components/ContainersModule";
import CachingModule from "./components/CachingModule";
import SecurityMindsetModule from "./components/SecurityMindsetModule";
import NosqlModule from "./components/NosqlModule";
import ObservabilityModule from "./components/ObservabilityModule";
import QuickCommandReference from "./components/QuickCommandReference";
import GlobalSearch from "./components/GlobalSearch";

type Module =
  | "home"
  | "react"
  | "typescript"
  | "nodejs"
  | "git"
  | "nextjs"
  | "tailwind"
  | "java"
  | "sql"
  | "http"
  | "auth"
  | "containers"
  | "caching"
  | "security"
  | "nosql"
  | "observability";

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
  {
    id: "java",
    title: "Java",
    short: "Java",
    icon: "☕",
    description: "JVM, OOP, collections, Spring Boot, and APIs",
  },
  {
    id: "sql",
    title: "SQL & databases",
    short: "SQL",
    icon: "🗄️",
    description: "Relational modeling, queries, transactions, migrations",
  },
  {
    id: "http",
    title: "HTTP & APIs",
    short: "HTTP",
    icon: "🌐",
    description: "Protocol semantics, REST, errors, and OpenAPI",
  },
  {
    id: "auth",
    title: "AuthN & AuthZ",
    short: "Auth",
    icon: "🔐",
    description: "Sessions, JWT, OAuth2/OIDC, RBAC, and API keys",
  },
  {
    id: "containers",
    title: "Containers & deploy",
    short: "Deploy",
    icon: "🐳",
    description: "Docker, Kubernetes, CI/CD, and twelve-factor config",
  },
  {
    id: "caching",
    title: "Caching & perf",
    short: "Cache",
    icon: "⚡",
    description: "HTTP caches, CDNs, Redis, and invalidation",
  },
  {
    id: "security",
    title: "Security mindset",
    short: "Sec",
    icon: "🛡️",
    description: "OWASP, XSS/CSRF/injection, headers, and supply chain",
  },
  {
    id: "nosql",
    title: "NoSQL",
    short: "NoSQL",
    icon: "🍃",
    description: "Document, KV, wide-column, graph, and scale-out ops",
  },
  {
    id: "observability",
    title: "Observability",
    short: "Observe",
    icon: "📈",
    description: "Logs, metrics, traces, SLOs, and correlation IDs",
  },
];

const learnItems = navItems.filter((item) => item.id !== "home");

function getModulePathFromHash(): string | null {
  const raw = window.location.hash.slice(1);
  if (!raw.startsWith("/")) {
    return null;
  }
  const afterSlash = raw.slice(1);
  const pathOnly = afterSlash.split("?")[0];
  const segment = pathOnly.split("/").filter(Boolean)[0];
  return segment ?? null;
}

export default function LearningApp() {
  const getModuleFromURL = (): Module => {
    const segment = getModulePathFromHash();
    if (!segment) {
      return "home";
    }
    const validModules: Module[] = [
      "home",
      "react",
      "typescript",
      "nodejs",
      "git",
      "nextjs",
      "tailwind",
      "java",
      "sql",
      "http",
      "auth",
      "containers",
      "caching",
      "security",
      "nosql",
      "observability",
    ];
    if (validModules.includes(segment as Module)) {
      return segment as Module;
    }
    return "home";
  };

  const [activeModule, setActiveModule] = useState<Module>(() => getModuleFromURL());

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
    const syncFromLocation = () => {
      setActiveModule(getModuleFromURL());
    };

    window.addEventListener("hashchange", syncFromLocation);
    window.addEventListener("popstate", syncFromLocation);
    return () => {
      window.removeEventListener("hashchange", syncFromLocation);
      window.removeEventListener("popstate", syncFromLocation);
    };
  }, []);

  const handleModuleChange = (moduleId: Module) => {
    setActiveModule(moduleId);
    const newHash = moduleId === "home" ? "#/" : `#/${moduleId}`;
    window.history.pushState(null, "", newHash);
  };

  const jumpToCommandBlock = (blockId: string) => {
    handleModuleChange("home");
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById(`command-ref-${blockId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      case "java":
        return <JavaModule />;
      case "sql":
        return <SqlModule />;
      case "http":
        return <HttpApisModule />;
      case "auth":
        return <AuthModule />;
      case "containers":
        return <ContainersModule />;
      case "caching":
        return <CachingModule />;
      case "security":
        return <SecurityMindsetModule />;
      case "nosql":
        return <NosqlModule />;
      case "observability":
        return <ObservabilityModule />;
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
        <div
          className={`mx-auto flex flex-col px-3 sm:px-4 ${
            isTopicModule
              ? "max-w-[1920px] gap-2 py-2.5 lg:px-5 lg:py-2.5"
              : "max-w-7xl gap-3 py-3 lg:px-8 lg:py-4"
          }`}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleModuleChange("home")}
              className="min-w-0 flex-1 text-left transition-opacity hover:opacity-80"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-600 sm:text-xs">
                Interview prep
              </p>
              <h1
                className={`font-bold tracking-tight text-zinc-900 ${
                  isTopicModule ? "text-base sm:text-lg" : "text-lg sm:text-xl"
                }`}
              >
                Learn by topic
              </h1>
            </button>
            <GlobalSearch
              topics={learnItems}
              onSelectTopic={(id) => handleModuleChange(id as Module)}
              onJumpToCommandBlock={jumpToCommandBlock}
              compact={isTopicModule}
            />
          </div>

          <nav
            className={`scrollbar-hide hidden items-center overflow-x-auto lg:flex ${
              isTopicModule ? "gap-1 pb-0" : "gap-1.5 pb-0.5"
            }`}
            aria-label="Topics"
          >
            {navItems.map((item) => {
              const active = activeModule === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => handleModuleChange(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex shrink-0 items-center rounded-full font-medium transition-colors ${
                    isTopicModule
                      ? "gap-1 px-2.5 py-1.5 text-xs lg:gap-1.5 lg:px-3 lg:py-1.5 lg:text-[13px]"
                      : "gap-2 px-3.5 py-2 text-sm"
                  } ${
                    active
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/90 hover:text-zinc-900"
                  }`}
                  aria-current={active ? "page" : undefined}
                  aria-label={item.title}
                >
                  <span className={`leading-none ${isTopicModule ? "text-sm lg:text-base" : "text-base"}`}>
                    {item.icon}
                  </span>
                  <span className="max-w-[10rem] truncate sm:max-w-none">{item.title}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </header>

      <div
        className={`relative mx-auto flex min-h-0 w-full flex-1 flex-col ${
          isTopicModule ? "max-w-[1920px] xl:px-1 2xl:px-2" : "max-w-7xl"
        }`}
      >
        <main
          className={`flex w-full max-w-full min-h-0 flex-1 flex-col overflow-x-hidden transition-all duration-300 ${
            isTopicModule
              ? "overflow-hidden px-2 py-3 pb-28 sm:px-3 md:py-4 md:pb-6 lg:px-4 lg:pb-8 xl:px-5"
              : "overflow-y-auto overscroll-y-contain px-3 py-4 pb-28 sm:px-4 md:py-6 md:pb-6 lg:px-8 lg:pb-8"
          }`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={isTopicModule ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={isTopicModule ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={isTopicModule ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className={isTopicModule ? "flex min-h-0 flex-1 flex-col" : "w-full min-h-0"}
            >
              {renderContent(handleModuleChange)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200/90 bg-white/90 pb-safe backdrop-blur-lg lg:hidden"
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
            Practice frontend frameworks, backend runtimes, Java/Spring, SQL, HTTP/APIs, auth, containers, caching,
            security, NoSQL, observability, and more—with clear explanations, copy-ready examples, and interview-style
            Q&A.
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
          <li className="flex gap-2">
            <span aria-hidden>✓</span> Java, JVM basics, OOP, collections, and Spring Boot
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> SQL, joins, transactions, indexes, and migrations
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> HTTP, REST, status codes, caching headers, and OpenAPI
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> AuthN/AuthZ, sessions, JWT, OAuth2/OIDC, RBAC
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> Docker, Kubernetes basics, CI/CD, and prod config
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> CDN/browser caching, Redis patterns, invalidation
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> OWASP-style risks, secure headers, supply chain
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> NoSQL models, CAP, sharding, SQL vs document trade-offs
          </li>
          <li className="flex gap-2">
            <span aria-hidden>✓</span> Logs, metrics, traces, correlation IDs, and SLOs
          </li>
        </ul>
      </section>
    </div>
  );
}
