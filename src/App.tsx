import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactModule from "./components/ReactModule";
import TypeScriptModule from "./components/TypeScriptModule";
import NodeJSModule from "./components/NodeJSModule";
import GitModule from "./components/GitModule";
import NextJSModule from "./components/NextJSModule";

type Module = "home" | "react" | "typescript" | "nodejs" | "git" | "nextjs";

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
];

export default function LearningApp() {
  const [activeModule, setActiveModule] = useState<Module>("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
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
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors z-50 relative"
              aria-label="Toggle sidebar"
            >
              <span className="text-2xl">☰</span>
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Learn React, TypeScript, Node.js, Git & Next.js
            </h1>
          </div>
          <div className="text-sm text-gray-600">
            Interactive Learning Platform
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto relative">
        {/* Mobile Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="bg-white border-r border-gray-200 shadow-sm overflow-y-auto w-70 min-w-[280px] h-[calc(100vh-80px)] fixed lg:relative z-50 lg:z-auto"
            >
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveModule(item.id);
                      // Close sidebar on mobile after selection
                      if (window.innerWidth < 1024) {
                        setSidebarOpen(false);
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      activeModule === item.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div
                          className={`text-xs ${
                            activeModule === item.id
                              ? "text-blue-100"
                              : "text-gray-500"
                          }`}
                        >
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 p-6 lg:p-8 transition-all duration-300 ${sidebarOpen ? 'lg:ml-0' : 'ml-0'} w-full max-w-full overflow-x-hidden`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Your Learning Journey! 🚀
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master React.js, TypeScript, Node.js, Git & GitHub, and Next.js through interactive
            examples and hands-on practice.
          </p>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {navItems
          .filter((item) => item.id !== "home")
          .map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="text-sm text-blue-600 font-semibold">
                Click on the sidebar to start learning →
              </div>
            </motion.div>
          ))}
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
        <h3 className="text-2xl font-bold mb-4">What You'll Learn</h3>
        <ul className="space-y-2 text-lg">
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
