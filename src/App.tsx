import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactModule from "./components/ReactModule";
import TypeScriptModule from "./components/TypeScriptModule";
import NodeJSModule from "./components/NodeJSModule";
import GitModule from "./components/GitModule";
import NextJSModule from "./components/NextJSModule";
import TailwindModule from "./components/TailwindModule";

type Module = "home" | "react" | "typescript" | "nodejs" | "git" | "nextjs" | "tailwind";

interface NavItem {
  id: Module;
  title: string;
  icon: string;
  description: string;
}

const navItems: NavItem[] = [
  {
    id: "home",
    title: "Home",
    icon: "🏠",
    description: "Welcome to the learning platform",
  },
  {
    id: "react",
    title: "React.js",
    icon: "⚛️",
    description: "Learn React fundamentals and hooks",
  },
  {
    id: "typescript",
    title: "TypeScript",
    icon: "📘",
    description: "Master TypeScript types and interfaces",
  },
  {
    id: "nodejs",
    title: "Node.js",
    icon: "🟢",
    description: "Understand Node.js and npm commands",
  },
  {
    id: "git",
    title: "Git & GitHub",
    icon: "📚",
    description: "Master version control and collaboration",
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: "⚡",
    description: "The React framework for production",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    icon: "🎨",
    description: "Utility-first CSS framework",
  },
];

export default function LearningApp() {
  // Initialize from URL or default to home
  const getModuleFromURL = (): Module => {
    const hash = window.location.hash.slice(1); // Remove #
    if (hash.startsWith('/')) {
      const path = hash.slice(1).split('/')[0]; // Get first path segment
      const validModules: Module[] = ["home", "react", "typescript", "nodejs", "git", "nextjs", "tailwind"];
      if (validModules.includes(path as Module)) {
        return path as Module;
      }
    }
    return "home";
  };

  const [activeModule, setActiveModule] = useState<Module>(getModuleFromURL());
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  // Set initial URL if empty
  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#') {
      window.history.replaceState(null, "", "#/");
    }
  }, []);

  // Update URL when module changes
  useEffect(() => {
    const newHash = activeModule === "home" ? "#/" : `#/${activeModule}`;
    if (window.location.hash !== newHash && !window.location.hash.includes('?')) {
      window.history.replaceState(null, "", newHash);
    }
  }, [activeModule]);

  // Listen for browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const module = getModuleFromURL();
      setActiveModule(module);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleModuleChange = (moduleId: Module) => {
    setActiveModule(moduleId);
    // Update URL - clear query params when switching modules
    const newHash = moduleId === "home" ? "#/" : `#/${moduleId}`;
    window.history.pushState(null, "", newHash);
    
    // if (window.innerWidth < 1024) {
    //   setTimeout(() => setSidebarOpen(false), 0);
    // }
  };

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 w-full max-w-full overflow-x-hidden">
      {/* Header with Navigation Bar - Desktop Only */}
      <header className="hidden lg:block bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          {/* Horizontal Navigation Bar - Desktop Only */}
          <nav className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleModuleChange(item.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all font-medium text-sm whitespace-nowrap flex-shrink-0 ${
                  activeModule === item.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                }`}
                aria-label={item.title}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-semibold">{item.title}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto relative">

        {/* Main Content */}
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 transition-all duration-300 w-full max-w-full overflow-x-hidden overflow-y-auto pb-24 lg:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent(handleModuleChange)}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Bottom Navigation Bar - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-2 border-gray-300 shadow-2xl z-50 pb-safe">
        <div className="flex items-center justify-around px-1 py-2 max-w-full overflow-x-auto">
          {/* Home Button */}
          <button
            onClick={() => {
              handleModuleChange("tailwind");
            }}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all min-w-0 flex-1 ${
              activeModule === "tailwind"
                ? "bg-gradient-to-b from-blue-100 to-purple-100 text-blue-700 scale-105 font-semibold"
                : "text-gray-600 active:bg-gray-100"
            }`}
            aria-label="Tailwind"
          >
            <span className="text-xl sm:text-2xl mb-0.5">{navItems.find(i => i.id === "tailwind")?.icon || "🏠"}</span>
            <span className="text-[10px] sm:text-xs font-medium">Tailwind</span>
          </button>
          {navItems
            .filter((item) => item.id !== "tailwind")
            .slice(0, 5)
            .map((item) => (
              <button
                key={item.id}
            onClick={() => {
              handleModuleChange(item.id);
            }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all min-w-0 flex-1 ${
                  activeModule === item.id
                    ? "bg-gradient-to-b from-blue-100 to-purple-100 text-blue-700 scale-105 font-semibold"
                    : "text-gray-600 active:bg-gray-100"
                }`}
                aria-label={item.title}
              >
                <span className="text-xl sm:text-2xl mb-0.5">{item.icon}</span>
                <span className="text-[10px] sm:text-xs font-medium truncate w-full text-center px-0.5">
                  {item.title.replace(".js", "").replace(" & GitHub", "").replace(" & ", " & ")}
                </span>
              </button>
            ))}
        </div>
      </nav>

    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate?: (moduleId: Module) => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent px-4">
            Welcome to Your Learning Journey! 🚀
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Master React.js, TypeScript, Node.js, Git & GitHub, and Next.js through interactive
            examples and hands-on practice.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {navItems
          .filter((item) => item.id !== "home")
          .map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => {
                if (onNavigate) {
                  onNavigate(item.id);
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all text-left w-full cursor-pointer active:bg-gray-50"
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{item.description}</p>
              <div className="text-xs sm:text-sm text-blue-600 font-semibold flex items-center gap-1">
                <span>Tap to start learning</span>
                <span>→</span>
              </div>
            </motion.button>
          ))}
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white">
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">What You'll Learn</h3>
        <ul className="space-y-2 text-sm sm:text-base lg:text-lg">
          <li>✅ React components, hooks, and state management</li>
          <li>✅ TypeScript types, interfaces, and advanced features</li>
          <li>✅ Node.js fundamentals and npm package management</li>
          <li>✅ Git & GitHub version control and collaboration</li>
          <li>✅ Next.js framework for production React apps</li>
          <li>✅ Interactive code examples you can experiment with</li>
          <li>✅ Best practices and real-world patterns</li>
        </ul>
      </div>
    </div>
  );
}
