import { useState } from "react";
import CodeExample from "./CodeExample";
import TheorySection from "./TheorySection";

export default function NodeJSModule() {
  const [activeSection, setActiveSection] = useState("core");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["core"]));
  const [activeConcept, setActiveConcept] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    { 
      id: "core", 
      title: "Core Fundamentals", 
      icon: "🔰", 
      count: "1-7",
      concepts: Array.from({ length: 7 }, (_, i) => ({ id: String(i + 1), title: `Concept ${i + 1}`, number: i + 1 }))
    },
    { 
      id: "modules", 
      title: "Modules & Packages", 
      icon: "📦", 
      count: "8-16",
      concepts: Array.from({ length: 9 }, (_, i) => ({ id: String(i + 8), title: `Concept ${i + 8}`, number: i + 8 }))
    },
    { 
      id: "web", 
      title: "Web & Networking", 
      icon: "🌐", 
      count: "17-23",
      concepts: Array.from({ length: 7 }, (_, i) => ({ id: String(i + 17), title: `Concept ${i + 17}`, number: i + 17 }))
    },
    { 
      id: "async", 
      title: "Async Programming", 
      icon: "⚡", 
      count: "24-29",
      concepts: Array.from({ length: 6 }, (_, i) => ({ id: String(i + 24), title: `Concept ${i + 24}`, number: i + 24 }))
    },
    { 
      id: "filesystem", 
      title: "File System & Streams", 
      icon: "📁", 
      count: "30-36",
      concepts: Array.from({ length: 7 }, (_, i) => ({ id: String(i + 30), title: `Concept ${i + 30}`, number: i + 30 }))
    },
    { 
      id: "events", 
      title: "Event-Driven Architecture", 
      icon: "🧠", 
      count: "37-39",
      concepts: Array.from({ length: 3 }, (_, i) => ({ id: String(i + 37), title: `Concept ${i + 37}`, number: i + 37 }))
    },
    { 
      id: "express", 
      title: "Express.js", 
      icon: "🚀", 
      count: "40-45",
      concepts: Array.from({ length: 6 }, (_, i) => ({ id: String(i + 40), title: `Concept ${i + 40}`, number: i + 40 }))
    },
    { 
      id: "databases", 
      title: "Databases", 
      icon: "🗄️", 
      count: "46-52",
      concepts: Array.from({ length: 7 }, (_, i) => ({ id: String(i + 46), title: `Concept ${i + 46}`, number: i + 46 }))
    },
    { 
      id: "security", 
      title: "Authentication & Security", 
      icon: "🔐", 
      count: "53-59",
      concepts: Array.from({ length: 7 }, (_, i) => ({ id: String(i + 53), title: `Concept ${i + 53}`, number: i + 53 }))
    },
    { 
      id: "testing", 
      title: "Testing & Debugging", 
      icon: "🧪", 
      count: "60-65",
      concepts: Array.from({ length: 6 }, (_, i) => ({ id: String(i + 60), title: `Concept ${i + 60}`, number: i + 60 }))
    },
    { 
      id: "performance", 
      title: "Performance & Scalability", 
      icon: "⚙️", 
      count: "66-72",
      concepts: Array.from({ length: 7 }, (_, i) => ({ id: String(i + 66), title: `Concept ${i + 66}`, number: i + 66 }))
    },
    { 
      id: "devops", 
      title: "DevOps & Deployment", 
      icon: "🐳", 
      count: "73-77",
      concepts: Array.from({ length: 5 }, (_, i) => ({ id: String(i + 73), title: `Concept ${i + 73}`, number: i + 73 }))
    },
    { 
      id: "architecture", 
      title: "Architecture & Best Practices", 
      icon: "🧱", 
      count: "78-82",
      concepts: Array.from({ length: 5 }, (_, i) => ({ id: String(i + 78), title: `Concept ${i + 78}`, number: i + 78 }))
    },
    { 
      id: "advanced", 
      title: "Advanced Node.js Concepts", 
      icon: "🌍", 
      count: "83-88",
      concepts: Array.from({ length: 6 }, (_, i) => ({ id: String(i + 83), title: `Concept ${i + 83}`, number: i + 83 }))
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
        setActiveSection(sectionId);
      }
      return newSet;
    });
  };

  const handleConceptClick = (sectionId: string, conceptId: string) => {
    setActiveSection(sectionId);
    setActiveConcept(conceptId);
    setExpandedSections((prev) => new Set(prev).add(sectionId));
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setTimeout(() => setSidebarOpen(false), 0);
    }
    
    setTimeout(() => {
      const element = document.getElementById(`concept-${conceptId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 h-full w-full relative">
      {/* Mobile Menu Button - Only show on larger mobile/tablet */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="hidden sm:flex md:hidden fixed top-[72px] left-3 z-50 bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Floating Button for Small Screens */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="sm:hidden fixed bottom-20 right-4 z-40 bg-blue-500 text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 active:scale-95"
        aria-label="Toggle module menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 top-[64px] sm:top-[72px]"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar - Vertical Navigation - Responsive */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:sticky top-[64px] sm:top-[72px] md:top-0 left-0 z-40
        w-[280px] sm:w-64 md:w-64 flex-shrink-0 
        bg-white rounded-xl shadow-md p-2 sm:p-3 
        overflow-y-auto h-[calc(100vh-64px)] sm:h-[calc(100vh-72px)] md:max-h-[calc(100vh-120px)] 
        transition-transform duration-300 ease-in-out
      `}>
        <div className="mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Node.js</h2>
          <p className="text-xs text-gray-600 mt-0.5">
            JavaScript runtime
          </p>
        </div>

        <div className="space-y-1.5">
          {sections.map((section) => {
            const isExpanded = expandedSections.has(section.id);
            const isActive = activeSection === section.id;

            return (
              <div key={section.id} className="border border-gray-200 rounded-md overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full px-3 py-2 text-left font-medium transition-colors flex items-center justify-between text-sm ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <span className="text-base flex-shrink-0">{section.icon}</span>
                    <span className="truncate">{section.title}</span>
                    <span className="text-xs opacity-75 flex-shrink-0">({section.count})</span>
                  </div>
                  <span className={`transition-transform text-xs flex-shrink-0 ml-1 ${isExpanded ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>

                {isExpanded && (
                  <div className="bg-gray-50 border-t border-gray-200">
                    {section.concepts.map((concept) => (
                      <button
                        key={concept.id}
                        onClick={() => handleConceptClick(section.id, concept.id)}
                        className={`w-full px-4 py-1.5 text-left text-xs transition-colors flex items-center gap-1.5 ${
                          activeConcept === concept.id
                            ? "bg-blue-100 text-blue-700 font-semibold border-l-4 border-blue-500"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <span className="text-blue-500 font-semibold text-xs flex-shrink-0">#{concept.number}</span>
                        <span className="flex-1 text-left truncate">{concept.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 min-w-0 max-w-full mt-0 md:mt-0">
        <div className="w-full max-w-full overflow-x-hidden px-0">
          {activeSection === "core" && <CoreFundamentals activeConcept={activeConcept} />}
          {activeSection === "modules" && <ModulesPackages activeConcept={activeConcept} />}
          {activeSection === "web" && <WebNetworking activeConcept={activeConcept} />}
          {activeSection === "async" && <AsyncProgramming activeConcept={activeConcept} />}
          {activeSection === "filesystem" && <FileSystemStreams activeConcept={activeConcept} />}
          {activeSection === "events" && <EventDrivenArchitecture activeConcept={activeConcept} />}
          {activeSection === "express" && <ExpressJS activeConcept={activeConcept} />}
          {activeSection === "databases" && <Databases activeConcept={activeConcept} />}
          {activeSection === "security" && <AuthenticationSecurity activeConcept={activeConcept} />}
          {activeSection === "testing" && <TestingDebugging activeConcept={activeConcept} />}
          {activeSection === "performance" && <PerformanceScalability activeConcept={activeConcept} />}
          {activeSection === "devops" && <DevOpsDeployment activeConcept={activeConcept} />}
          {activeSection === "architecture" && <ArchitectureBestPractices activeConcept={activeConcept} />}
          {activeSection === "advanced" && <AdvancedConcepts activeConcept={activeConcept} />}
        </div>
      </div>
    </div>
  );
}

// ========== CORE FUNDAMENTALS (1-7) ==========
function CoreFundamentals({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 sm:p-5 md:p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🔰 Core Node.js Fundamentals</h3>
        <p className="text-blue-100 break-words">Understanding Node.js architecture and core concepts</p>
      </div>

      <ConceptCard
        id="1"
        number={1}
        title="What is Node.js"
        priority="🔥"
        theory={{
          what: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server-side, outside of web browsers.",
          why: "Node.js enables JavaScript to be used for backend development, creating a unified language (JavaScript) for both frontend and backend. It's fast, efficient, and has a huge ecosystem of packages.",
          how: "Node.js uses the V8 engine to compile JavaScript to machine code. It provides APIs for file system, networking, and other server-side operations that aren't available in browsers.",
          keyPoints: [
            "JavaScript runtime (not a framework or library)",
            "Built on Chrome's V8 engine",
            "Runs JavaScript outside the browser",
            "Single-threaded, event-driven architecture",
            "Huge ecosystem (npm packages)"
          ],
          interviewQuestions: [
            {
              question: "What is Node.js and how does it differ from JavaScript in the browser?",
              answer: "Node.js is a JavaScript runtime built on V8 that allows JavaScript to run on the server-side. Unlike browser JavaScript, Node.js provides APIs for file system, networking, and other server operations. It's single-threaded and event-driven, making it efficient for I/O-intensive applications."
            }
          ]
        }}
      >
        <CodeExample
          title="Simple Node.js Example"
          description="Creating a basic Node.js application"
          code={`// index.js
console.log('Hello from Node.js!');

// Run with: node index.js

// Using Node.js built-in modules
const fs = require('fs');
const path = require('path');

// Read a file
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('File content:', data);
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="2"
        number={2}
        title="Node.js Architecture"
        theory={{
          what: "Node.js architecture consists of several layers: V8 JavaScript engine, Node.js bindings (C++), libuv (event loop library), and core modules. It uses a single-threaded event loop model.",
          why: "Understanding the architecture helps you write efficient Node.js code and understand performance characteristics. The layered architecture allows Node.js to be fast and handle many concurrent connections.",
          how: "V8 executes JavaScript, Node.js bindings provide JavaScript APIs, libuv handles the event loop and async I/O operations, and core modules provide built-in functionality.",
          keyPoints: [
            "V8 engine: executes JavaScript",
            "Node.js bindings: JavaScript to C++ bridge",
            "libuv: event loop and async I/O",
            "Core modules: built-in Node.js modules",
            "Single-threaded event loop model"
          ],
          interviewQuestions: [
            {
              question: "Explain Node.js architecture.",
              answer: "Node.js has a layered architecture: V8 engine executes JavaScript, Node.js bindings provide JavaScript APIs that bridge to C++ code, libuv handles the event loop and asynchronous I/O operations, and core modules provide built-in functionality. This architecture enables efficient handling of many concurrent connections with a single-threaded event loop."
            }
          ]
        }}
      >
        <CodeExample
          title="Architecture Layers"
          description="Understanding Node.js layers"
          code={`// JavaScript Layer (Your Code)
const http = require('http'); // Core Module

// Node.js Core Module Layer
// Provides APIs like http, fs, path, etc.

// Node.js Bindings Layer (C++)
// Bridges JavaScript to native code

// V8 Engine Layer
// Executes JavaScript code

// libuv Layer
// Event loop and async I/O operations`}
        />
      </ConceptCard>

      <ConceptCard
        id="3"
        number={3}
        title="Single-threaded Model"
        priority="🔥"
        theory={{
          what: "Node.js uses a single-threaded model with an event loop. The main thread handles all JavaScript execution, while I/O operations are handled asynchronously by libuv's thread pool.",
          why: "Single-threaded model simplifies programming (no thread synchronization issues) and is efficient for I/O-intensive applications. The event loop allows handling many concurrent operations without blocking.",
          how: "Node.js runs JavaScript on a single main thread. When I/O operations are needed, they're delegated to libuv's thread pool. The event loop continuously checks for completed operations and executes callbacks.",
          keyPoints: [
            "Single main thread for JavaScript",
            "No thread synchronization needed",
            "Efficient for I/O-intensive tasks",
            "CPU-intensive tasks can block the thread",
            "Uses thread pool for I/O operations"
          ],
          interviewQuestions: [
            {
              question: "How does Node.js handle concurrency with a single thread?",
              answer: "Node.js uses an event-driven, non-blocking I/O model. While JavaScript runs on a single thread, I/O operations are handled asynchronously by libuv's thread pool. The event loop continuously checks for completed operations and executes their callbacks, allowing Node.js to handle many concurrent connections efficiently without creating threads for each connection."
            }
          ]
        }}
      >
        <CodeExample
          title="Single-threaded Execution"
          description="Understanding single-threaded behavior"
          code={`// All JavaScript runs on one thread
console.log('Start');

// This blocks the thread (bad!)
for (let i = 0; i < 1000000000; i++) {
  // CPU-intensive task blocks everything
}

console.log('End'); // Won't execute until loop finishes

// Non-blocking I/O (good!)
const fs = require('fs');
fs.readFile('file.txt', (err, data) => {
  // Callback runs when file is read
  // Doesn't block other operations
  console.log('File read');
});

console.log('After readFile'); // Executes immediately`}
        />
      </ConceptCard>

      <ConceptCard
        id="4"
        number={4}
        title="Event Loop"
        priority="🔥"
        theory={{
          what: "The event loop is Node.js's mechanism for handling asynchronous operations. It continuously checks for completed operations and executes their callbacks in a specific order.",
          why: "The event loop enables Node.js to handle many concurrent operations efficiently without blocking. It's the core of Node.js's asynchronous, non-blocking I/O model.",
          how: "The event loop has multiple phases: timers (setTimeout/setInterval), pending callbacks, idle/prepare, poll (I/O), check (setImmediate), and close callbacks. It processes callbacks in each phase before moving to the next.",
          keyPoints: [
            "Continuously checks for completed operations",
            "Executes callbacks in phases",
            "Non-blocking I/O operations",
            "Enables handling many concurrent connections",
            "Phases: timers, I/O, check, close"
          ],
          interviewQuestions: [
            {
              question: "Explain the Node.js event loop.",
              answer: "The event loop is Node.js's mechanism for handling asynchronous operations. It continuously cycles through phases: timers (setTimeout/setInterval callbacks), pending callbacks, poll (I/O operations), check (setImmediate callbacks), and close callbacks. It processes all callbacks in a phase before moving to the next, enabling non-blocking I/O and efficient handling of many concurrent operations."
            }
          ]
        }}
      >
        <CodeExample
          title="Event Loop Phases"
          description="Understanding event loop execution order"
          code={`// Event Loop Phases (in order):
// 1. Timers: setTimeout, setInterval
// 2. Pending callbacks: deferred I/O callbacks
// 3. Idle, prepare: internal use
// 4. Poll: fetch new I/O events
// 5. Check: setImmediate callbacks
// 6. Close: close event callbacks

console.log('Start');

setTimeout(() => {
  console.log('Timer');
}, 0);

setImmediate(() => {
  console.log('Immediate');
});

fs.readFile('file.txt', () => {
  console.log('I/O');
  
  setTimeout(() => {
    console.log('Timer in I/O');
  }, 0);
  
  setImmediate(() => {
    console.log('Immediate in I/O');
  });
});

console.log('End');`}
        />
      </ConceptCard>

      <ConceptCard
        id="5"
        number={5}
        title="Non-blocking I/O"
        priority="🔥"
        theory={{
          what: "Non-blocking I/O means that I/O operations don't block the execution of other code. When an I/O operation starts, Node.js continues executing other code and calls a callback when the I/O completes.",
          why: "Non-blocking I/O is crucial for Node.js's performance. It allows handling many concurrent connections efficiently. A single Node.js process can handle thousands of concurrent connections.",
          how: "When you call an async I/O function (like fs.readFile), Node.js starts the operation and immediately returns. The operation happens in the background (using libuv's thread pool), and when it completes, the callback is queued in the event loop.",
          keyPoints: [
            "I/O operations don't block execution",
            "Enables handling many concurrent operations",
            "Uses callbacks, promises, or async/await",
            "Operations happen in background",
            "Callbacks execute when operations complete"
          ],
          interviewQuestions: [
            {
              question: "What is non-blocking I/O in Node.js?",
              answer: "Non-blocking I/O means I/O operations don't block the execution of other code. When you start an I/O operation (like reading a file), Node.js immediately returns and continues executing other code. The I/O operation happens in the background, and when it completes, a callback is executed. This allows Node.js to handle many concurrent operations efficiently."
            }
          ]
        }}
      >
        <CodeExample
          title="Non-blocking I/O"
          description="Comparing blocking vs non-blocking"
          code={`const fs = require('fs');

// BLOCKING (synchronous) - BAD!
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);
console.log('After read'); // Waits for file read

// NON-BLOCKING (asynchronous) - GOOD!
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log('After readFile'); // Executes immediately!

// Multiple concurrent operations
fs.readFile('file1.txt', () => console.log('File 1'));
fs.readFile('file2.txt', () => console.log('File 2'));
fs.readFile('file3.txt', () => console.log('File 3'));
// All start simultaneously, callbacks execute when ready`}
        />
      </ConceptCard>

      <ConceptCard
        id="6"
        number={6}
        title="V8 JavaScript Engine"
        theory={{
          what: "V8 is Google's open-source JavaScript engine that powers Chrome and Node.js. It compiles JavaScript to native machine code for fast execution.",
          why: "V8 is highly optimized and provides fast JavaScript execution. It uses just-in-time (JIT) compilation, garbage collection, and various optimization techniques to make JavaScript run efficiently.",
          how: "V8 compiles JavaScript to machine code using JIT compilation. It optimizes frequently executed code (hot code) and uses efficient garbage collection to manage memory.",
          keyPoints: [
            "Google's JavaScript engine",
            "Compiles JavaScript to machine code",
            "Uses JIT (Just-In-Time) compilation",
            "Optimizes frequently executed code",
            "Efficient garbage collection"
          ],
          interviewQuestions: [
            {
              question: "What is V8 and how does it work?",
              answer: "V8 is Google's open-source JavaScript engine that compiles JavaScript to native machine code. It uses JIT compilation, optimizing frequently executed code for better performance. V8 also includes efficient garbage collection for memory management. It powers both Chrome browser and Node.js."
            }
          ]
        }}
      >
        <CodeExample
          title="V8 Features"
          description="Understanding V8 capabilities"
          code={`// V8 executes JavaScript efficiently
// It optimizes your code automatically

// Example: V8 optimizes this loop
function sum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

// After running multiple times, V8 optimizes it
// to run faster (JIT compilation)

// V8 also handles:
// - Garbage collection (memory management)
// - Inline caching
// - Hidden classes
// - Compilation to machine code`}
        />
      </ConceptCard>

      <ConceptCard
        id="7"
        number={7}
        title="REPL"
        theory={{
          what: "REPL stands for Read-Eval-Print Loop. It's an interactive shell where you can type JavaScript code and see results immediately. Node.js includes a built-in REPL.",
          why: "REPL is useful for testing code snippets, experimenting with Node.js APIs, and debugging. It's a quick way to try out JavaScript code without creating files.",
          how: "Start REPL by typing 'node' in terminal (without a file). Type JavaScript code and press Enter to execute. Use special commands like .help, .exit, .save, .load.",
          keyPoints: [
            "Read-Eval-Print Loop",
            "Interactive JavaScript shell",
            "Start with: node (no file)",
            "Quick testing and experimentation",
            "Special commands: .help, .exit, .save, .load"
          ],
          interviewQuestions: [
            {
              question: "What is REPL in Node.js?",
              answer: "REPL (Read-Eval-Print Loop) is Node.js's interactive JavaScript shell. You start it by typing 'node' without a filename. It allows you to type JavaScript code and see results immediately, making it useful for testing code snippets, experimenting with Node.js APIs, and debugging. It includes special commands like .help, .exit, .save, and .load."
            }
          ]
        }}
      >
        <CodeExample
          title="Using REPL"
          description="Interactive Node.js shell"
          code={`# Start REPL
$ node

> const fs = require('fs');
undefined
> fs.readFileSync('package.json', 'utf8');
'{"name":"my-project",...}'

> const add = (a, b) => a + b;
undefined
> add(5, 3);
8

> .help
.break    Exit multiline expression
.clear    Clear REPL context
.exit     Exit REPL
.help     Show this help
.load     Load JS file
.save     Save session to file

> .exit
# Or press Ctrl+C twice`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== MODULES & PACKAGES (8-16) ==========
function ModulesPackages({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">📦 Modules & Packages</h3>
        <p className="text-green-100 break-words">Understanding Node.js module system and package management</p>
      </div>

      <ConceptCard
        id="8"
        number={8}
        title="CommonJS (require, module.exports)"
        priority="🔥"
        theory={{
          what: "CommonJS is Node.js's original module system. It uses require() to import modules and module.exports to export functionality. It's synchronous and loads modules at runtime.",
          why: "CommonJS was the standard for Node.js for many years. Many existing Node.js packages use CommonJS. It's still widely used, though ES modules are now preferred for new projects.",
          how: "Use require() to import: const module = require('./module'). Use module.exports to export: module.exports = { function, variable }. Or module.exports.function = function.",
          keyPoints: [
            "Original Node.js module system",
            "Synchronous module loading",
            "require() to import",
            "module.exports to export",
            "Still widely used in Node.js"
          ],
          interviewQuestions: [
            {
              question: "What is CommonJS and how does it differ from ES modules?",
              answer: "CommonJS is Node.js's original module system using require() and module.exports. It's synchronous (modules load at runtime) and was the standard for many years. ES modules use import/export, are asynchronous, and are now preferred for new projects. CommonJS is still widely used in existing Node.js codebases."
            }
          ]
        }}
      >
        <CodeExample
          title="CommonJS Syntax"
          description="Using require and module.exports"
          code={`// Exporting (module.js)
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// Or
module.exports.add = (a, b) => a + b;
module.exports.subtract = (a, b) => a - b;

// Single export
module.exports = function add(a, b) {
  return a + b;
};

// Importing (app.js)
const math = require('./module');
const add = require('./module').add;
const { add, subtract } = require('./module');

// Built-in modules
const fs = require('fs');
const http = require('http');
const path = require('path');`}
        />
      </ConceptCard>

      <ConceptCard
        id="9"
        number={9}
        title="ES Modules (import, export)"
        priority="🔥"
        theory={{
          what: "ES Modules are the modern JavaScript module system. They use import and export statements. ES modules are asynchronous and support static analysis.",
          why: "ES modules are the JavaScript standard and work in both browsers and Node.js. They support static analysis, tree-shaking, and are the future of JavaScript modules.",
          how: "Use export to export: export function add() {} or export default function. Use import to import: import { add } from './module' or import add from './module'.",
          keyPoints: [
            "Modern JavaScript module system",
            "Asynchronous module loading",
            "import/export syntax",
            "Works in browsers and Node.js",
            "Supports static analysis and tree-shaking"
          ],
          interviewQuestions: [
            {
              question: "How do ES modules work in Node.js?",
              answer: "ES modules use import/export syntax. In Node.js, you need to either use .mjs extension or set 'type: module' in package.json. ES modules are asynchronous, support static analysis, and enable tree-shaking. They're the modern standard and work in both browsers and Node.js."
            }
          ]
        }}
      >
        <CodeExample
          title="ES Modules Syntax"
          description="Using import and export"
          code={`// Exporting (module.js)
export function add(a, b) {
  return a + b;
}

export const subtract = (a, b) => a - b;

// Default export
export default function multiply(a, b) {
  return a * b;
}

// Importing (app.js)
import { add, subtract } from './module.js';
import multiply from './module.js'; // default import
import * as math from './module.js'; // namespace import

// Mixed
import multiply, { add, subtract } from './module.js';

// Enable in Node.js:
// Option 1: Use .mjs extension
// Option 2: Add "type": "module" to package.json`}
        />
      </ConceptCard>

      <ConceptCard
        id="10"
        number={10}
        title="Built-in Modules - fs"
        priority="🔥"
        theory={{
          what: "The fs (file system) module provides APIs for interacting with the file system. It includes both synchronous and asynchronous methods for reading, writing, and manipulating files.",
          why: "File system operations are essential for server-side applications. The fs module allows you to read configuration files, write logs, handle file uploads, and manage application data.",
          how: "Require fs: const fs = require('fs'). Use async methods (fs.readFile, fs.writeFile) or sync methods (fs.readFileSync, fs.writeFileSync). Always prefer async methods.",
          keyPoints: [
            "File system operations",
            "Both sync and async methods",
            "Read, write, delete files",
            "Directory operations",
            "Always prefer async methods"
          ],
          interviewQuestions: [
            {
              question: "What is the fs module and when would you use it?",
              answer: "The fs module provides file system operations in Node.js. It includes methods for reading, writing, deleting files and directories. Use it for reading configuration files, writing logs, handling file uploads, or managing application data. Always prefer asynchronous methods (fs.readFile) over synchronous ones (fs.readFileSync) to avoid blocking the event loop."
            }
          ]
        }}
      >
        <CodeExample
          title="File System Module"
          description="Reading and writing files"
          code={`const fs = require('fs');

// Async read (non-blocking)
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(data);
});

// Async write
fs.writeFile('output.txt', 'Hello World', (err) => {
  if (err) throw err;
  console.log('File written');
});

// Sync read (blocking - avoid!)
const data = fs.readFileSync('data.txt', 'utf8');

// Check if file exists
fs.access('file.txt', fs.constants.F_OK, (err) => {
  console.log(err ? 'File does not exist' : 'File exists');
});

// Read directory
fs.readdir('./', (err, files) => {
  if (err) throw err;
  console.log(files);
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="11"
        number={11}
        title="Built-in Modules - path"
        theory={{
          what: "The path module provides utilities for working with file and directory paths. It handles path manipulation, normalization, and cross-platform path differences.",
          why: "Path handling is complex due to different path separators on different operating systems (Windows uses \\, Unix uses /). The path module abstracts these differences.",
          how: "Use path.join() to join path segments, path.resolve() to resolve absolute paths, path.dirname() to get directory, path.basename() to get filename, path.extname() to get extension.",
          keyPoints: [
            "Path manipulation utilities",
            "Cross-platform path handling",
            "Normalizes path separators",
            "Resolves relative to absolute paths",
            "Extracts path components"
          ],
          interviewQuestions: [
            {
              question: "What is the path module used for?",
              answer: "The path module provides utilities for working with file and directory paths. It handles cross-platform path differences (Windows vs Unix), joins path segments with path.join(), resolves absolute paths with path.resolve(), and extracts path components like directory, filename, and extension. It's essential for building file paths correctly across different operating systems."
            }
          ]
        }}
      >
        <CodeExample
          title="Path Module"
          description="Working with file paths"
          code={`const path = require('path');

// Join path segments
const filePath = path.join(__dirname, 'data', 'file.txt');
// Works on all platforms

// Resolve to absolute path
const absolute = path.resolve('data', 'file.txt');

// Get directory name
const dir = path.dirname('/users/john/file.txt');
// Returns: /users/john

// Get filename
const file = path.basename('/users/john/file.txt');
// Returns: file.txt

// Get extension
const ext = path.extname('file.txt');
// Returns: .txt

// Get filename without extension
const name = path.basename('file.txt', '.txt');
// Returns: file

// Normalize path
const normalized = path.normalize('/users//john/./file.txt');
// Returns: /users/john/file.txt`}
        />
      </ConceptCard>

      <ConceptCard
        id="12"
        number={12}
        title="Built-in Modules - os"
        theory={{
          what: "The os module provides operating system-related utility methods. It provides information about the operating system, CPU, memory, and network interfaces.",
          why: "The os module is useful for system monitoring, getting system information, and writing cross-platform code that adapts to different operating systems.",
          how: "Use os.platform() to get OS platform, os.arch() for CPU architecture, os.totalmem() and os.freemem() for memory, os.cpus() for CPU info, os.hostname() for hostname.",
          keyPoints: [
            "Operating system information",
            "CPU and memory details",
            "Network interface information",
            "Platform detection",
            "System monitoring utilities"
          ],
          interviewQuestions: [
            {
              question: "What is the os module used for?",
              answer: "The os module provides operating system-related utilities. It gives information about the OS platform, CPU architecture, total and free memory, CPU details, hostname, and network interfaces. It's useful for system monitoring, getting system information, and writing cross-platform code."
            }
          ]
        }}
      >
        <CodeExample
          title="OS Module"
          description="Getting system information"
          code={`const os = require('os');

// Platform
console.log(os.platform()); // 'win32', 'darwin', 'linux'

// Architecture
console.log(os.arch()); // 'x64', 'arm64'

// CPU information
console.log(os.cpus());
console.log(os.cpus().length); // Number of CPU cores

// Memory
console.log(os.totalmem()); // Total memory in bytes
console.log(os.freemem()); // Free memory in bytes

// Hostname
console.log(os.hostname());

// Home directory
console.log(os.homedir());

// Network interfaces
console.log(os.networkInterfaces());

// Operating system type
console.log(os.type()); // 'Windows_NT', 'Darwin', 'Linux'`}
        />
      </ConceptCard>

      <ConceptCard
        id="13"
        number={13}
        title="Built-in Modules - http"
        priority="🔥"
        theory={{
          what: "The http module provides functionality for creating HTTP servers and making HTTP requests. It's the foundation for building web servers and APIs in Node.js.",
          why: "The http module is essential for building web servers, REST APIs, and making HTTP requests. It's low-level but gives you full control over HTTP communication.",
          how: "Use http.createServer() to create a server, http.request() or http.get() to make requests. Handle request and response objects to process HTTP messages.",
          keyPoints: [
            "Create HTTP servers",
            "Make HTTP requests",
            "Handle request/response",
            "Low-level HTTP functionality",
            "Foundation for web frameworks"
          ],
          interviewQuestions: [
            {
              question: "How do you create an HTTP server in Node.js?",
              answer: "Use http.createServer() which takes a callback function with request and response parameters. The callback handles each incoming request. Call server.listen() with a port number to start listening. The http module is low-level but gives full control. Higher-level frameworks like Express build on top of it."
            }
          ]
        }}
      >
        <CodeExample
          title="HTTP Module"
          description="Creating a web server"
          code={`const http = require('http');

// Create server
const server = http.createServer((req, res) => {
  // Set response headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Send response
  res.end('Hello World');
});

// Start server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// Make HTTP request
http.get('http://example.com', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="14"
        number={14}
        title="Built-in Modules - events"
        theory={{
          what: "The events module provides the EventEmitter class, which is the foundation for Node.js's event-driven architecture. Many Node.js objects inherit from EventEmitter.",
          why: "EventEmitter enables the event-driven, asynchronous programming model that Node.js is built on. It allows objects to emit events and register listeners for those events.",
          how: "Create an EventEmitter: const EventEmitter = require('events'); const emitter = new EventEmitter(). Use emitter.on() to listen, emitter.emit() to emit events, emitter.once() for one-time listeners.",
          keyPoints: [
            "Event-driven architecture",
            "EventEmitter class",
            "on() to listen to events",
            "emit() to trigger events",
            "Foundation of Node.js async model"
          ],
          interviewQuestions: [
            {
              question: "What is EventEmitter and how is it used?",
              answer: "EventEmitter is a class from the events module that enables event-driven programming. Objects can emit events using emit() and other code can listen to those events using on(). Many Node.js objects (like streams, http servers) inherit from EventEmitter. It's the foundation of Node.js's asynchronous, event-driven architecture."
            }
          ]
        }}
      >
        <CodeExample
          title="Events Module"
          description="Using EventEmitter"
          code={`const EventEmitter = require('events');

// Create emitter
const emitter = new EventEmitter();

// Listen to event
emitter.on('data', (data) => {
  console.log('Received:', data);
});

// Emit event
emitter.emit('data', 'Hello World');

// One-time listener
emitter.once('connect', () => {
  console.log('Connected once');
});

// Remove listener
const handler = () => console.log('Handler');
emitter.on('event', handler);
emitter.removeListener('event', handler);

// Custom EventEmitter class
class MyEmitter extends EventEmitter {
  doSomething() {
    this.emit('done', 'Task completed');
  }
}

const myEmitter = new MyEmitter();
myEmitter.on('done', (message) => {
  console.log(message);
});
myEmitter.doSomething();`}
        />
      </ConceptCard>

      <ConceptCard
        id="15"
        number={15}
        title="Third-party Modules & Package Managers"
        priority="🔥"
        theory={{
          what: "Third-party modules are packages created by the community and published to npm. Package managers (npm, yarn, pnpm) install and manage these dependencies.",
          why: "Third-party modules provide reusable functionality, saving development time. Package managers handle installation, version management, and dependency resolution.",
          how: "Install packages: npm install package-name. Use in code: require('package-name') or import from 'package-name'. Manage in package.json. Use package-lock.json for exact versions.",
          keyPoints: [
            "Community-created packages",
            "npm, yarn, pnpm are package managers",
            "Install with npm install",
            "Manage dependencies in package.json",
            "package-lock.json locks versions"
          ],
          interviewQuestions: [
            {
              question: "What are the differences between npm, yarn, and pnpm?",
              answer: "All three are Node.js package managers. npm is the default that comes with Node.js. yarn was created by Facebook and is faster with better dependency resolution. pnpm uses a content-addressable store and is more disk-efficient. They all use package.json and have similar commands, but pnpm and yarn have some additional features and better performance."
            }
          ]
        }}
      >
        <CodeExample
          title="Package Managers"
          description="Installing and using packages"
          code={`# npm (default)
npm install express
npm install -D typescript  # dev dependency
npm install -g nodemon    # global

# yarn
yarn add express
yarn add -D typescript
yarn global add nodemon

# pnpm
pnpm add express
pnpm add -D typescript
pnpm add -g nodemon

// Using installed packages
const express = require('express');
// or
import express from 'express';

// package.json tracks dependencies
{
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="16"
        number={16}
        title="package.json & package-lock.json"
        priority="🔥"
        theory={{
          what: "package.json is the manifest file for Node.js projects. It defines project metadata, dependencies, scripts, and configuration. package-lock.json locks exact dependency versions.",
          why: "package.json is essential for project configuration and dependency management. package-lock.json ensures consistent installs across different environments by locking exact versions.",
          how: "Create package.json with npm init. Add dependencies: npm install package-name. package-lock.json is auto-generated and should be committed to version control.",
          keyPoints: [
            "package.json: project manifest",
            "Defines dependencies and scripts",
            "package-lock.json: locks versions",
            "Should commit both to git",
            "npm install reads package.json"
          ],
          interviewQuestions: [
            {
              question: "What is the difference between package.json and package-lock.json?",
              answer: "package.json is the project manifest that defines metadata, dependencies (with version ranges), scripts, and configuration. package-lock.json is auto-generated and locks the exact versions of all dependencies (including transitive dependencies). package-lock.json ensures consistent installs across different environments and should be committed to version control."
            }
          ]
        }}
      >
        <CodeExample
          title="package.json Structure"
          description="Project configuration"
          code={`{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My Node.js project",
  "main": "index.js",
  "type": "module",  // Enable ES modules
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"  // ^ allows minor updates
  },
  "devDependencies": {
    "nodemon": "^2.0.0",
    "typescript": "^5.0.0"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}

// package-lock.json (auto-generated)
// Locks exact versions for consistency`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== WEB & NETWORKING (17-23) ==========
function WebNetworking({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🌐 Web & Networking</h3>
        <p className="text-purple-100 break-words">Building web servers and APIs</p>
      </div>

      <ConceptCard
        id="17"
        number={17}
        title="HTTP Module"
        priority="🔥"
        theory={{
          what: "The http module is Node.js's core module for creating HTTP servers and making HTTP requests. It provides low-level functionality for HTTP communication.",
          why: "The http module is the foundation for all web frameworks in Node.js. Understanding it helps you understand how web servers work and gives you full control over HTTP communication.",
          how: "Use http.createServer() to create a server that listens for HTTP requests. The callback receives request and response objects. Use http.request() or http.get() to make HTTP requests.",
          keyPoints: [
            "Core HTTP functionality",
            "Create HTTP servers",
            "Make HTTP requests",
            "Low-level but powerful",
            "Foundation for Express and other frameworks"
          ],
          interviewQuestions: [
            {
              question: "How does the http module work in Node.js?",
              answer: "The http module provides low-level HTTP functionality. Use http.createServer() to create a server - it takes a callback with request and response objects. The server listens on a port and handles incoming HTTP requests. Use http.request() or http.get() to make HTTP requests. It's the foundation that frameworks like Express build upon."
            }
          ]
        }}
      >
        <CodeExample
          title="HTTP Server"
          description="Creating a basic HTTP server"
          code={`const http = require('http');

const server = http.createServer((req, res) => {
  // req: incoming request
  // res: outgoing response
  
  // Set status and headers
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'X-Custom-Header': 'MyValue'
  });
  
  // Send response
  res.end('<h1>Hello World</h1>');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="18"
        number={18}
        title="Creating Web Servers"
        priority="🔥"
        theory={{
          what: "Web servers listen for HTTP requests and send responses. In Node.js, you create servers using http.createServer() or higher-level frameworks like Express.",
          why: "Web servers are the foundation of web applications. They handle incoming requests, process them, and send responses back to clients.",
          how: "Create a server with http.createServer(), handle different routes by checking req.url, set appropriate headers and status codes, send responses with res.end(). Or use Express for easier routing.",
          keyPoints: [
            "Listen for HTTP requests",
            "Handle different routes",
            "Set response headers and status",
            "Send responses to clients",
            "Can use http module or frameworks like Express"
          ],
          interviewQuestions: [
            {
              question: "How do you create a web server in Node.js?",
              answer: "Use http.createServer() which takes a callback function with request and response objects. Inside the callback, check req.url for routing, set response headers with res.writeHead(), and send the response with res.end(). Call server.listen() with a port number to start listening. For easier routing, use frameworks like Express."
            }
          ]
        }}
      >
        <CodeExample
          title="Basic Web Server"
          description="Server with routing"
          code={`const http = require('http');

const server = http.createServer((req, res) => {
  // Simple routing
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page</h1>');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>About Page</h1>');
  } else if (req.url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Hello API' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="19"
        number={19}
        title="Request & Response Objects"
        priority="🔥"
        theory={{
          what: "Request (req) and Response (res) objects represent the incoming HTTP request and outgoing HTTP response. They provide methods and properties to interact with HTTP messages.",
          why: "Understanding req and res objects is essential for handling HTTP requests and sending responses. They give you access to headers, body, method, URL, and more.",
          how: "req contains request data: req.url, req.method, req.headers, req.body (needs parsing). res is used to send responses: res.writeHead(), res.write(), res.end(), res.statusCode.",
          keyPoints: [
            "req: incoming request object",
            "res: outgoing response object",
            "req.url, req.method, req.headers",
            "res.writeHead(), res.write(), res.end()",
            "Essential for HTTP handling"
          ],
          interviewQuestions: [
            {
              question: "What are the request and response objects in Node.js?",
              answer: "The request (req) object represents the incoming HTTP request and contains properties like req.url (requested URL), req.method (HTTP method), req.headers (request headers), and req.body (request body, needs parsing). The response (res) object is used to send responses with methods like res.writeHead() (set status and headers), res.write() (write data), and res.end() (end response)."
            }
          ]
        }}
      >
        <CodeExample
          title="Request & Response"
          description="Working with req and res"
          code={`const http = require('http');

const server = http.createServer((req, res) => {
  // Request object properties
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);
  
  // Read request body
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  
  req.on('end', () => {
    // Response methods
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    
    res.write(JSON.stringify({ received: body }));
    res.end();
  });
});

// Response object methods:
// res.writeHead(statusCode, headers)
// res.write(data)
// res.end(data)
// res.statusCode = 200`}
        />
      </ConceptCard>

      <ConceptCard
        id="20"
        number={20}
        title="REST APIs"
        priority="🔥"
        theory={{
          what: "REST (Representational State Transfer) is an architectural style for designing web APIs. REST APIs use HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources.",
          why: "REST APIs provide a standard way to build web services. They're stateless, cacheable, and work well with HTTP. Most modern web APIs follow REST principles.",
          how: "Use HTTP methods: GET (read), POST (create), PUT (update), DELETE (delete). Use meaningful URLs (/api/users, /api/users/:id). Return appropriate status codes. Use JSON for data exchange.",
          keyPoints: [
            "RESTful API design",
            "HTTP methods: GET, POST, PUT, DELETE",
            "Resource-based URLs",
            "Stateless communication",
            "JSON for data exchange"
          ],
          interviewQuestions: [
            {
              question: "What is a REST API and how do you build one in Node.js?",
              answer: "REST (Representational State Transfer) is an architectural style for web APIs. REST APIs use HTTP methods: GET (read), POST (create), PUT (update), DELETE (delete). Resources are identified by URLs (/api/users, /api/users/:id). APIs are stateless and typically use JSON. In Node.js, you can build REST APIs with the http module or frameworks like Express, which provide easier routing and middleware."
            }
          ]
        }}
      >
        <CodeExample
          title="REST API Example"
          description="Building a RESTful API"
          code={`const http = require('http');
const url = require('url');

let users = [{ id: 1, name: 'John' }];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;
  
  // GET /api/users
  if (method === 'GET' && path === '/api/users') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }
  // POST /api/users
  else if (method === 'POST' && path === '/api/users') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const user = JSON.parse(body);
      user.id = users.length + 1;
      users.push(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    });
  }
  // DELETE /api/users/:id
  else if (method === 'DELETE' && path.startsWith('/api/users/')) {
    const id = parseInt(path.split('/')[3]);
    users = users.filter(u => u.id !== id);
    res.writeHead(204);
    res.end();
  }
  else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000);`}
        />
      </ConceptCard>

      <ConceptCard
        id="21"
        number={21}
        title="Status Codes"
        theory={{
          what: "HTTP status codes indicate the result of an HTTP request. They're three-digit numbers that tell the client whether the request succeeded, failed, or needs further action.",
          why: "Status codes provide clear communication about request outcomes. They help clients understand what happened and how to handle the response.",
          how: "Set status codes with res.writeHead(statusCode) or res.statusCode. Common codes: 200 (OK), 201 (Created), 404 (Not Found), 500 (Server Error), etc.",
          keyPoints: [
            "2xx: Success (200, 201, 204)",
            "3xx: Redirection (301, 302)",
            "4xx: Client Error (400, 404, 401)",
            "5xx: Server Error (500, 502)",
            "Set with res.writeHead() or res.statusCode"
          ],
          interviewQuestions: [
            {
              question: "What are HTTP status codes and which ones are commonly used?",
              answer: "HTTP status codes are three-digit numbers indicating request results. Common codes: 200 (OK - success), 201 (Created - resource created), 204 (No Content - success with no body), 400 (Bad Request - client error), 401 (Unauthorized), 404 (Not Found), 500 (Internal Server Error). Set them with res.writeHead(statusCode) or res.statusCode in Node.js."
            }
          ]
        }}
      >
        <CodeExample
          title="HTTP Status Codes"
          description="Using status codes"
          code={`const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/success') {
    res.writeHead(200); // OK
    res.end('Success');
  } else if (req.url === '/created') {
    res.writeHead(201); // Created
    res.end('Resource created');
  } else if (req.url === '/notfound') {
    res.writeHead(404); // Not Found
    res.end('Not Found');
  } else if (req.url === '/error') {
    res.writeHead(500); // Server Error
    res.end('Server Error');
  } else if (req.url === '/redirect') {
    res.writeHead(302, { 'Location': '/success' }); // Redirect
    res.end();
  }
  
  // Or set statusCode property
  res.statusCode = 200;
  res.end('OK');
});

// Common status codes:
// 200 - OK
// 201 - Created
// 204 - No Content
// 400 - Bad Request
// 401 - Unauthorized
// 404 - Not Found
// 500 - Internal Server Error`}
        />
      </ConceptCard>

      <ConceptCard
        id="22"
        number={22}
        title="Headers"
        theory={{
          what: "HTTP headers provide metadata about requests and responses. They contain information like content type, authentication, caching, CORS settings, and more.",
          why: "Headers are essential for HTTP communication. They control caching, content type, authentication, CORS, and many other aspects of HTTP requests and responses.",
          how: "Set response headers with res.writeHead(statusCode, headers) or res.setHeader(name, value). Read request headers from req.headers object.",
          keyPoints: [
            "Metadata for requests/responses",
            "Set with res.writeHead() or res.setHeader()",
            "Read from req.headers",
            "Common: Content-Type, Authorization, CORS",
            "Control caching, authentication, etc."
          ],
          interviewQuestions: [
            {
              question: "How do you work with HTTP headers in Node.js?",
              answer: "Set response headers with res.writeHead(statusCode, { 'Header-Name': 'value' }) or res.setHeader('Header-Name', 'value'). Read request headers from req.headers object (lowercase keys). Common headers include Content-Type (application/json, text/html), Authorization (for auth tokens), and CORS headers (Access-Control-Allow-Origin)."
            }
          ]
        }}
      >
        <CodeExample
          title="HTTP Headers"
          description="Setting and reading headers"
          code={`const http = require('http');

const server = http.createServer((req, res) => {
  // Read request headers
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Authorization:', req.headers['authorization']);
  console.log('User-Agent:', req.headers['user-agent']);
  
  // Set response headers
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'X-Custom-Header': 'MyValue'
  });
  
  // Or set individually
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.end(JSON.stringify({ message: 'Hello' }));
});

// Common headers:
// Content-Type: application/json, text/html
// Authorization: Bearer token
// Access-Control-Allow-Origin: *
// Cache-Control: no-cache, max-age=3600`}
        />
      </ConceptCard>

      <ConceptCard
        id="23"
        number={23}
        title="CORS"
        priority="🔥"
        theory={{
          what: "CORS (Cross-Origin Resource Sharing) is a security mechanism that allows web pages to make requests to a different domain than the one serving the page. Browsers enforce CORS policies.",
          why: "CORS is essential for web APIs that need to be accessed from browsers. Without proper CORS headers, browsers block cross-origin requests for security reasons.",
          how: "Set CORS headers in responses: Access-Control-Allow-Origin (which origins can access), Access-Control-Allow-Methods (allowed HTTP methods), Access-Control-Allow-Headers (allowed headers). Handle preflight OPTIONS requests.",
          keyPoints: [
            "Cross-Origin Resource Sharing",
            "Browser security mechanism",
            "Set Access-Control-Allow-Origin header",
            "Handle OPTIONS preflight requests",
            "Required for browser-based API access"
          ],
          interviewQuestions: [
            {
              question: "What is CORS and how do you handle it in Node.js?",
              answer: "CORS (Cross-Origin Resource Sharing) allows web pages to make requests to different domains. Browsers enforce CORS for security. To enable CORS, set Access-Control-Allow-Origin header (use '*' for all origins or specific domain). Also set Access-Control-Allow-Methods and Access-Control-Allow-Headers. Handle OPTIONS preflight requests by responding with appropriate CORS headers before the actual request."
            }
          ]
        }}
      >
        <CodeExample
          title="CORS Headers"
          description="Enabling CORS"
          code={`const http = require('http');

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  // Handle actual request
  if (req.method === 'GET' && req.url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ data: 'Hello CORS' }));
  }
});

// For production, use specific origin:
// res.setHeader('Access-Control-Allow-Origin', 'https://example.com');

// Or use CORS middleware in Express:
// const cors = require('cors');
// app.use(cors());`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== ASYNC PROGRAMMING (24-29) ==========
function AsyncProgramming({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">⚡ Asynchronous Programming</h3>
        <p className="text-yellow-100 break-words">Mastering async patterns in Node.js - VERY IMPORTANT</p>
      </div>

      <ConceptCard
        id="24"
        number={24}
        title="Callbacks"
        priority="🔥"
        theory={{
          what: "Callbacks are functions passed as arguments to other functions that are executed when an asynchronous operation completes. They're the original way to handle async operations in Node.js.",
          why: "Callbacks enable asynchronous programming. They allow code to continue executing while waiting for I/O operations to complete. However, they can lead to callback hell with nested callbacks.",
          how: "Pass a function as the last argument to async functions. The callback typically receives (error, result) as parameters. Handle errors first, then process the result.",
          keyPoints: [
            "Functions passed as arguments",
            "Executed when async operation completes",
            "First parameter is usually error",
            "Can lead to callback hell",
            "Foundation of Node.js async model"
          ],
          interviewQuestions: [
            {
              question: "What are callbacks and what is callback hell?",
              answer: "Callbacks are functions passed to async operations that execute when the operation completes. They typically receive (error, result) parameters. Callback hell occurs when you have deeply nested callbacks, making code hard to read and maintain. It's solved by using Promises or async/await."
            }
          ]
        }}
      >
        <CodeExample
          title="Callbacks"
          description="Using callbacks for async operations"
          code={`const fs = require('fs');

// Basic callback
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(data);
});

// Callback hell (nested callbacks)
fs.readFile('file1.txt', 'utf8', (err1, data1) => {
  if (err1) throw err1;
  fs.readFile('file2.txt', 'utf8', (err2, data2) => {
    if (err2) throw err2;
    fs.writeFile('output.txt', data1 + data2, (err3) => {
      if (err3) throw err3;
      console.log('Done');
    });
  });
});

// Better: Use Promises or async/await`}
        />
      </ConceptCard>

      <ConceptCard
        id="25"
        number={25}
        title="Promises"
        priority="🔥"
        theory={{
          what: "Promises represent the eventual completion (or failure) of an asynchronous operation. They provide a cleaner way to handle async code than callbacks.",
          why: "Promises solve callback hell by allowing chaining with .then() and .catch(). They make async code more readable and easier to handle errors. They're the foundation for async/await.",
          how: "Promises have three states: pending, fulfilled, rejected. Use .then() for success, .catch() for errors, .finally() for cleanup. Chain multiple promises. Create with new Promise((resolve, reject) => {}).",
          keyPoints: [
            "Represents async operation result",
            "States: pending, fulfilled, rejected",
            ".then() for success, .catch() for errors",
            "Can chain multiple promises",
            "Foundation for async/await"
          ],
          interviewQuestions: [
            {
              question: "What are Promises and how do they work?",
              answer: "Promises represent the eventual result of an async operation. They have three states: pending (not yet completed), fulfilled (success), and rejected (error). Use .then() to handle success, .catch() for errors, and .finally() for cleanup. Promises can be chained, making async code more readable than callbacks. They're the foundation for async/await syntax."
            }
          ]
        }}
      >
        <CodeExample
          title="Promises"
          description="Using Promises for async operations"
          code={`const fs = require('fs').promises;

// Promise-based file read
fs.readFile('file.txt', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error('Error:', err);
  });

// Chaining promises
fs.readFile('file1.txt', 'utf8')
  .then(data1 => fs.readFile('file2.txt', 'utf8'))
  .then(data2 => {
    console.log(data2);
  })
  .catch(err => {
    console.error('Error:', err);
  });

// Creating a Promise
function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Promise.all - wait for all
Promise.all([
  fs.readFile('file1.txt', 'utf8'),
  fs.readFile('file2.txt', 'utf8')
])
  .then(([data1, data2]) => {
    console.log(data1, data2);
  });`}
        />
      </ConceptCard>

      <ConceptCard
        id="26"
        number={26}
        title="Async / Await"
        priority="🔥"
        theory={{
          what: "async/await is syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code. It's the modern, preferred way to handle async operations.",
          why: "async/await makes async code much more readable and easier to understand. It eliminates callback hell and makes error handling straightforward with try/catch. It's the recommended approach for async code.",
          how: "Mark functions with async keyword. Use await before Promise-returning functions. await pauses execution until the Promise resolves. Use try/catch for error handling.",
          keyPoints: [
            "Syntactic sugar over Promises",
            "Makes async code look synchronous",
            "Use async keyword on functions",
            "Use await before Promises",
            "Error handling with try/catch"
          ],
          interviewQuestions: [
            {
              question: "What is async/await and how does it work?",
              answer: "async/await is syntactic sugar that makes asynchronous code look synchronous. Mark functions with the async keyword, then use await before Promise-returning functions. await pauses execution until the Promise resolves. Use try/catch for error handling. It's the modern, preferred way to write async code in Node.js."
            }
          ]
        }}
      >
        <CodeExample
          title="Async / Await"
          description="Modern async code"
          code={`const fs = require('fs').promises;

// Async function
async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error:', err);
  }
}

// Multiple async operations
async function processFiles() {
  try {
    const data1 = await fs.readFile('file1.txt', 'utf8');
    const data2 = await fs.readFile('file2.txt', 'utf8');
    await fs.writeFile('output.txt', data1 + data2);
    console.log('Done');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Parallel execution
async function readParallel() {
  try {
    const [data1, data2] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8')
    ]);
    console.log(data1, data2);
  } catch (err) {
    console.error('Error:', err);
  }
}

readFile();`}
        />
      </ConceptCard>

      <ConceptCard
        id="27"
        number={27}
        title="Error Handling (try/catch)"
        priority="🔥"
        theory={{
          what: "Error handling in async code uses try/catch blocks. Errors from async operations (rejected Promises, thrown errors) are caught in catch blocks.",
          why: "Proper error handling is crucial for robust applications. It prevents crashes and allows graceful error recovery. In async code, errors must be handled in catch blocks or with .catch() on Promises.",
          how: "Wrap async code in try/catch blocks. Catch errors in catch block. Handle errors appropriately (log, return error response, retry, etc.). Always handle errors in async functions.",
          keyPoints: [
            "Use try/catch for async/await",
            "Use .catch() for Promises",
            "Handle errors appropriately",
            "Prevent application crashes",
            "Essential for production code"
          ],
          interviewQuestions: [
            {
              question: "How do you handle errors in async Node.js code?",
              answer: "For async/await, wrap code in try/catch blocks. The catch block handles any errors (rejected Promises or thrown errors). For Promises, use .catch() method. Always handle errors - log them, return appropriate error responses, or implement retry logic. Unhandled errors can crash Node.js applications."
            }
          ]
        }}
      >
        <CodeExample
          title="Error Handling"
          description="Handling errors in async code"
          code={`const fs = require('fs').promises;

// Error handling with async/await
async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    return data;
  } catch (err) {
    // Handle different error types
    if (err.code === 'ENOENT') {
      console.error('File not found');
    } else {
      console.error('Error reading file:', err.message);
    }
    throw err; // Re-throw if needed
  }
}

// Error handling with Promises
fs.readFile('file.txt', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error('Error:', err);
  });

// Multiple error handling
async function processData() {
  try {
    const data = await readFile();
    const processed = process(data);
    return processed;
  } catch (err) {
    console.error('Processing failed:', err);
    return null; // Return default value
  }
}

// Always handle errors!
processData().catch(err => {
  console.error('Unhandled error:', err);
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="28"
        number={28}
        title="Async Patterns"
        theory={{
          what: "Common async patterns include sequential execution, parallel execution, race conditions, and error handling strategies. Understanding these patterns helps write efficient async code.",
          why: "Different async patterns serve different purposes. Sequential execution processes one after another. Parallel execution processes simultaneously for better performance. Choosing the right pattern is important.",
          how: "Sequential: await each operation. Parallel: use Promise.all() or Promise.allSettled(). Race: use Promise.race(). Handle errors appropriately for each pattern.",
          keyPoints: [
            "Sequential: one after another",
            "Parallel: Promise.all() for simultaneous",
            "Race: Promise.race() for first to complete",
            "Error handling varies by pattern",
            "Choose pattern based on requirements"
          ],
          interviewQuestions: [
            {
              question: "What are common async patterns in Node.js?",
              answer: "Common patterns: Sequential (await each operation one after another), Parallel (Promise.all() to run operations simultaneously), Race (Promise.race() for first to complete), and Error handling (try/catch or .catch()). Sequential is simpler but slower. Parallel is faster but uses more resources. Choose based on whether operations depend on each other."
            }
          ]
        }}
      >
        <CodeExample
          title="Async Patterns"
          description="Different async execution patterns"
          code={`const fs = require('fs').promises;

// Sequential execution (one after another)
async function sequential() {
  const data1 = await fs.readFile('file1.txt', 'utf8');
  const data2 = await fs.readFile('file2.txt', 'utf8');
  // Slower but simpler
}

// Parallel execution (simultaneous)
async function parallel() {
  const [data1, data2] = await Promise.all([
    fs.readFile('file1.txt', 'utf8'),
    fs.readFile('file2.txt', 'utf8')
  ]);
  // Faster - both read at same time
}

// Race (first to complete)
async function race() {
  const result = await Promise.race([
    fs.readFile('file1.txt', 'utf8'),
    fs.readFile('file2.txt', 'utf8')
  ]);
  // Gets first file that completes
}

// All settled (don't fail on first error)
async function allSettled() {
  const results = await Promise.allSettled([
    fs.readFile('file1.txt', 'utf8'),
    fs.readFile('file2.txt', 'utf8')
  ]);
  // Gets all results, even if some fail
}

// Sequential with error handling
async function sequentialSafe() {
  try {
    const data1 = await fs.readFile('file1.txt', 'utf8');
    const data2 = await fs.readFile('file2.txt', 'utf8');
  } catch (err) {
    console.error('Error:', err);
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="29"
        number={29}
        title="Async Best Practices"
        theory={{
          what: "Best practices for async code include always handling errors, using async/await for readability, avoiding blocking operations, using Promise.all() for parallel operations, and avoiding callback hell.",
          why: "Following best practices makes code more maintainable, performant, and less error-prone. It helps prevent common async pitfalls and makes debugging easier.",
          how: "Always use try/catch or .catch(). Prefer async/await over callbacks. Use Promise.all() for independent parallel operations. Avoid blocking the event loop. Handle errors at appropriate levels.",
          keyPoints: [
            "Always handle errors",
            "Prefer async/await over callbacks",
            "Use Promise.all() for parallel ops",
            "Avoid blocking the event loop",
            "Handle errors at appropriate levels"
          ],
          interviewQuestions: [
            {
              question: "What are best practices for async code in Node.js?",
              answer: "Best practices: Always handle errors with try/catch or .catch(), prefer async/await for readability, use Promise.all() for independent parallel operations, avoid blocking the event loop with synchronous operations, handle errors at appropriate levels, and avoid callback hell by using Promises or async/await. Also, don't forget to await async functions when calling them."
            }
          ]
        }}
      >
        <CodeExample
          title="Best Practices"
          description="Writing good async code"
          code={`// ✅ GOOD: Error handling
async function goodExample() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    return data;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}

// ✅ GOOD: Parallel execution
async function parallelGood() {
  const [users, posts] = await Promise.all([
    fetchUsers(),
    fetchPosts()
  ]);
  return { users, posts };
}

// ❌ BAD: Missing error handling
async function badExample() {
  const data = await fs.readFile('file.txt', 'utf8');
  // No error handling!
  return data;
}

// ❌ BAD: Sequential when parallel possible
async function sequentialBad() {
  const users = await fetchUsers();
  const posts = await fetchPosts();
  // Could be parallel!
}

// ✅ GOOD: Proper async/await usage
async function main() {
  try {
    const result = await goodExample();
    console.log(result);
  } catch (err) {
    console.error('Failed:', err);
  }
}

main(); // Don't forget to call!`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== FILE SYSTEM & STREAMS (30-36) ==========
function FileSystemStreams({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">📁 File System & Streams</h3>
        <p className="text-cyan-100 break-words">Working with files and data streams</p>
      </div>

      <ConceptCard
        id="30"
        number={30}
        title="File System (fs) - Synchronous vs Asynchronous"
        priority="🔥"
        theory={{
          what: "The fs module provides both synchronous (blocking) and asynchronous (non-blocking) methods. Synchronous methods block the event loop, while async methods don't.",
          why: "Understanding the difference is crucial. Synchronous methods are simpler but block the entire Node.js process. Asynchronous methods are preferred for production code as they don't block.",
          how: "Async methods: fs.readFile(), fs.writeFile(), fs.readdir(). Sync methods: fs.readFileSync(), fs.writeFileSync(), fs.readdirSync(). Always prefer async methods. Use sync only in scripts or initialization.",
          keyPoints: [
            "Sync methods: block event loop",
            "Async methods: non-blocking",
            "Always prefer async in production",
            "Sync methods end with 'Sync'",
            "Use sync only in scripts/init"
          ],
          interviewQuestions: [
            {
              question: "What's the difference between synchronous and asynchronous fs methods?",
              answer: "Synchronous methods (fs.readFileSync) block the event loop until the operation completes, freezing the entire Node.js process. Asynchronous methods (fs.readFile) are non-blocking and use callbacks/Promises. Always prefer async methods in production to avoid blocking. Use sync methods only in scripts or during initialization when blocking is acceptable."
            }
          ]
        }}
      >
        <CodeExample
          title="Sync vs Async FS"
          description="Comparing synchronous and asynchronous file operations"
          code={`const fs = require('fs');

// ❌ SYNCHRONOUS (blocking) - Avoid in production!
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data); // Blocks until file is read
console.log('After read'); // Waits for read to complete

// ✅ ASYNCHRONOUS (non-blocking) - Preferred!
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log('After readFile'); // Executes immediately!

// Async with Promises
const fsPromises = require('fs').promises;
async function readFile() {
  const data = await fsPromises.readFile('file.txt', 'utf8');
  console.log(data);
}

// When to use sync:
// - Scripts that run once
// - Initialization code
// - When you need the result immediately

// When to use async:
// - Production code
// - Web servers
// - Any code that needs to be responsive`}
        />
      </ConceptCard>

      <ConceptCard
        id="31"
        number={31}
        title="Streams - Readable"
        priority="🔥"
        theory={{
          what: "Readable streams are streams from which data can be read. They're used for reading data in chunks rather than loading everything into memory at once.",
          why: "Streams are memory-efficient. Instead of loading entire files into memory, streams process data in chunks. This is essential for large files or real-time data processing.",
          how: "Readable streams emit 'data' events for each chunk. Listen with stream.on('data', chunk => {}). Handle 'end' event when done, 'error' for errors. Use stream.pipe() to pipe to writable streams.",
          keyPoints: [
            "Read data in chunks",
            "Memory-efficient for large files",
            "Emit 'data' events",
            "Use .on('data') to listen",
            "Can pipe to writable streams"
          ],
          interviewQuestions: [
            {
              question: "What are readable streams and when would you use them?",
              answer: "Readable streams allow reading data in chunks rather than loading everything into memory. They emit 'data' events for each chunk. Use them for large files, real-time data processing, or when memory efficiency is important. Listen with .on('data') for chunks, .on('end') when done, and .on('error') for errors. You can pipe readable streams to writable streams."
            }
          ]
        }}
      >
        <CodeExample
          title="Readable Streams"
          description="Reading data in chunks"
          code={`const fs = require('fs');

// Create readable stream
const readable = fs.createReadStream('large-file.txt', 'utf8');

// Read data in chunks
readable.on('data', (chunk) => {
  console.log('Chunk received:', chunk.length, 'bytes');
  // Process chunk
});

// Handle end
readable.on('end', () => {
  console.log('Finished reading');
});

// Handle errors
readable.on('error', (err) => {
  console.error('Error:', err);
});

// Pipe to writable stream
const writable = fs.createWriteStream('output.txt');
readable.pipe(writable);

// HTTP response is a readable stream
const http = require('http');
const server = http.createServer((req, res) => {
  const fileStream = fs.createReadStream('file.txt');
  fileStream.pipe(res); // Pipe file to response
});

// Custom readable stream
const { Readable } = require('stream');
const myReadable = new Readable({
  read() {
    this.push('chunk of data');
    this.push(null); // End stream
  }
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="32"
        number={32}
        title="Streams - Writable"
        theory={{
          what: "Writable streams are streams to which data can be written. They're used for writing data in chunks, making them memory-efficient for large outputs.",
          why: "Writable streams allow writing data without loading everything into memory first. They're essential for writing large files, HTTP responses, and any large data output.",
          how: "Write data with stream.write(chunk). End stream with stream.end(). Listen to 'drain' event when buffer is empty. Use stream.pipe() to pipe from readable streams.",
          keyPoints: [
            "Write data in chunks",
            "Memory-efficient for large outputs",
            "Use .write() to write chunks",
            "Use .end() to finish",
            "Listen to 'drain' event"
          ],
          interviewQuestions: [
            {
              question: "What are writable streams and how do you use them?",
              answer: "Writable streams allow writing data in chunks. Use .write(chunk) to write data, .end() to finish writing. Listen to 'drain' event when the buffer is empty and ready for more data. Writable streams are memory-efficient for large outputs. You can pipe readable streams to writable streams using .pipe()."
            }
          ]
        }}
      >
        <CodeExample
          title="Writable Streams"
          description="Writing data in chunks"
          code={`const fs = require('fs');

// Create writable stream
const writable = fs.createWriteStream('output.txt');

// Write data
writable.write('Hello ');
writable.write('World');
writable.end(); // Finish writing

// Handle drain event (buffer empty)
writable.on('drain', () => {
  console.log('Buffer drained, ready for more');
});

// Handle finish
writable.on('finish', () => {
  console.log('Finished writing');
});

// Handle errors
writable.on('error', (err) => {
  console.error('Error:', err);
});

// HTTP response is a writable stream
const http = require('http');
const server = http.createServer((req, res) => {
  res.write('Hello');
  res.write(' World');
  res.end();
});

// Custom writable stream
const { Writable } = require('stream');
const myWritable = new Writable({
  write(chunk, encoding, callback) {
    console.log('Writing:', chunk.toString());
    callback(); // Signal write complete
  }
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="33"
        number={33}
        title="Streams - Duplex"
        theory={{
          what: "Duplex streams are streams that are both readable and writable. They can read and write data, like TCP sockets or Transform streams.",
          why: "Duplex streams are useful when you need bidirectional communication, such as network sockets, or when transforming data as it flows through.",
          how: "Duplex streams implement both readable and writable interfaces. You can read from them and write to them. They're used in networking and data transformation scenarios.",
          keyPoints: [
            "Both readable and writable",
            "Bidirectional data flow",
            "Used in networking (TCP sockets)",
            "Can read and write",
            "Used for data transformation"
          ],
          interviewQuestions: [
            {
              question: "What are duplex streams?",
              answer: "Duplex streams are streams that are both readable and writable. They implement both interfaces, allowing bidirectional data flow. They're commonly used in networking (like TCP sockets) where you need to both send and receive data, or in data transformation scenarios where data flows in both directions."
            }
          ]
        }}
      >
        <CodeExample
          title="Duplex Streams"
          description="Bidirectional streams"
          code={`const { Duplex } = require('stream');

// Custom duplex stream
const myDuplex = new Duplex({
  write(chunk, encoding, callback) {
    // Write side
    console.log('Writing:', chunk.toString());
    callback();
  },
  read(size) {
    // Read side
    this.push('data from read side');
    this.push(null); // End
  }
});

// Duplex streams can be both read and written
myDuplex.write('Hello');
myDuplex.on('data', (chunk) => {
  console.log('Read:', chunk.toString());
});

// TCP sockets are duplex streams
const net = require('net');
const socket = net.createConnection(3000, 'localhost');

socket.write('Hello Server'); // Write
socket.on('data', (data) => {
  console.log('Received:', data.toString()); // Read
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="34"
        number={34}
        title="Streams - Transform"
        theory={{
          what: "Transform streams are a type of duplex stream where the output is computed from the input. They're used for data transformation as data flows through.",
          why: "Transform streams are perfect for processing data on-the-fly, such as compression, encryption, parsing, or any data transformation. They're memory-efficient and can handle large datasets.",
          how: "Transform streams extend Duplex. Implement _transform(chunk, encoding, callback) method. Process the chunk, then call callback(null, transformedChunk) to push transformed data.",
          keyPoints: [
            "Type of duplex stream",
            "Transforms data as it flows",
            "Input → Transform → Output",
            "Used for compression, encryption, parsing",
            "Memory-efficient processing"
          ],
          interviewQuestions: [
            {
              question: "What are transform streams and when would you use them?",
              answer: "Transform streams are duplex streams that transform data as it flows through. They're used for on-the-fly data processing like compression, encryption, parsing, or format conversion. Implement _transform() method to process chunks. They're memory-efficient and perfect for processing large datasets without loading everything into memory."
            }
          ]
        }}
      >
        <CodeExample
          title="Transform Streams"
          description="Transforming data on-the-fly"
          code={`const { Transform } = require('stream');

// Uppercase transform
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    // Transform chunk
    const transformed = chunk.toString().toUpperCase();
    // Push transformed data
    this.push(transformed);
    callback();
  }
});

// Use transform stream
const fs = require('fs');
fs.createReadStream('input.txt')
  .pipe(upperCase)
  .pipe(fs.createWriteStream('output.txt'));

// JSON parser transform
const jsonParser = new Transform({
  transform(chunk, encoding, callback) {
    try {
      const parsed = JSON.parse(chunk.toString());
      this.push(JSON.stringify(parsed, null, 2));
    } catch (err) {
      callback(err);
    }
    callback();
  }
});

// Built-in transform streams
const zlib = require('zlib');
fs.createReadStream('file.txt')
  .pipe(zlib.createGzip()) // Compress
  .pipe(fs.createWriteStream('file.txt.gz'));`}
        />
      </ConceptCard>

      <ConceptCard
        id="35"
        number={35}
        title="Buffers"
        theory={{
          what: "Buffers are Node.js's way of handling binary data. They're fixed-size chunks of memory that can store raw binary data. Buffers are essential for working with files, network protocols, and binary data.",
          why: "JavaScript doesn't have a native binary data type. Buffers fill this gap, allowing Node.js to work with binary data efficiently. They're used extensively in file I/O, networking, and crypto operations.",
          how: "Create buffers with Buffer.from(), Buffer.alloc(), or Buffer.allocUnsafe(). Access bytes with buffer[index]. Convert to strings with buffer.toString(). Work with buffer methods like slice(), copy(), etc.",
          keyPoints: [
            "Fixed-size binary data storage",
            "Essential for binary data",
            "Create with Buffer.from(), Buffer.alloc()",
            "Convert to/from strings",
            "Used in file I/O and networking"
          ],
          interviewQuestions: [
            {
              question: "What are Buffers in Node.js?",
              answer: "Buffers are Node.js's way of handling binary data. They're fixed-size chunks of memory that store raw binary data. Create them with Buffer.from() (from string/array), Buffer.alloc() (zero-filled), or Buffer.allocUnsafe() (faster but uninitialized). Buffers are essential for file I/O, networking, crypto operations, and any binary data handling. Convert to strings with .toString()."
            }
          ]
        }}
      >
        <CodeExample
          title="Buffers"
          description="Working with binary data"
          code={`// Create buffers
const buf1 = Buffer.from('Hello', 'utf8');
const buf2 = Buffer.alloc(10); // 10 bytes, zero-filled
const buf3 = Buffer.allocUnsafe(10); // Faster, but uninitialized

// Buffer operations
console.log(buf1.toString()); // 'Hello'
console.log(buf1.length); // 5
console.log(buf1[0]); // 72 (ASCII for 'H')

// Convert between formats
const str = 'Hello';
const buf = Buffer.from(str, 'utf8');
const backToString = buf.toString('utf8');

// Buffer methods
const buf4 = Buffer.from('Hello World');
buf4.slice(0, 5); // 'Hello'
buf4.copy(buf2, 0); // Copy to another buffer

// Working with file buffers
const fs = require('fs');
fs.readFile('image.png', (err, buffer) => {
  // buffer is a Buffer object
  console.log(buffer.length); // File size in bytes
});

// Buffer concatenation
const buf5 = Buffer.concat([buf1, buf2]);

// Buffer comparison
buf1.equals(buf2); // Compare buffers`}
        />
      </ConceptCard>

      <ConceptCard
        id="36"
        number={36}
        title="Pipes"
        priority="🔥"
        theory={{
          what: "Pipes connect readable streams to writable streams, allowing data to flow automatically from source to destination. They're a powerful way to chain stream operations.",
          why: "Pipes make stream operations simple and elegant. They handle backpressure automatically (pausing when destination is full) and make code readable. They're the preferred way to connect streams.",
          how: "Use readableStream.pipe(writableStream) to connect streams. Chain multiple pipes: stream1.pipe(stream2).pipe(stream3). Handle errors on the destination stream. Use stream.unpipe() to disconnect.",
          keyPoints: [
            "Connect readable to writable streams",
            "Automatic data flow",
            "Handles backpressure automatically",
            "Can chain multiple pipes",
            "Preferred way to connect streams"
          ],
          interviewQuestions: [
            {
              question: "What are pipes in Node.js streams?",
              answer: "Pipes connect readable streams to writable streams, allowing data to flow automatically. Use readableStream.pipe(writableStream). Pipes handle backpressure automatically (pausing when the destination buffer is full). You can chain multiple pipes. Pipes are the preferred way to connect streams, making code readable and efficient. Handle errors on the destination stream."
            }
          ]
        }}
      >
        <CodeExample
          title="Pipes"
          description="Connecting streams with pipes"
          code={`const fs = require('fs');
const zlib = require('zlib');

// Basic pipe
fs.createReadStream('input.txt')
  .pipe(fs.createWriteStream('output.txt'));

// Chained pipes
fs.createReadStream('file.txt')
  .pipe(zlib.createGzip()) // Compress
  .pipe(fs.createWriteStream('file.txt.gz'));

// Decompress
fs.createReadStream('file.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('file.txt'));

// HTTP response piping
const http = require('http');
const server = http.createServer((req, res) => {
  fs.createReadStream('large-file.txt')
    .pipe(res); // Pipe file directly to response
});

// Transform in pipe chain
const { Transform } = require('stream');
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

fs.createReadStream('input.txt')
  .pipe(upperCase)
  .pipe(fs.createWriteStream('output.txt'));

// Error handling with pipes
fs.createReadStream('input.txt')
  .on('error', (err) => {
    console.error('Read error:', err);
  })
  .pipe(fs.createWriteStream('output.txt'))
  .on('error', (err) => {
    console.error('Write error:', err);
  });`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== EVENT-DRIVEN ARCHITECTURE (37-39) ==========
function EventDrivenArchitecture({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🧠 Event-Driven Architecture</h3>
        <p className="text-indigo-100 break-words">Understanding Node.js event-driven programming model</p>
      </div>

      <ConceptCard
        id="37"
        number={37}
        title="Events Module"
        priority="🔥"
        theory={{
          what: "The events module provides the EventEmitter class, which is the foundation of Node.js's event-driven architecture. Many Node.js objects inherit from EventEmitter.",
          why: "EventEmitter enables asynchronous, event-driven programming. It allows objects to emit events and other code to listen to those events, making Node.js applications responsive and efficient.",
          how: "Require events module: const EventEmitter = require('events'). Create emitter: const emitter = new EventEmitter(). Use emitter.on() to listen, emitter.emit() to trigger events, emitter.once() for one-time listeners.",
          keyPoints: [
            "EventEmitter class from events module",
            "Foundation of Node.js async model",
            "on() to listen to events",
            "emit() to trigger events",
            "Many Node.js objects inherit from EventEmitter"
          ],
          interviewQuestions: [
            {
              question: "What is the events module and how does EventEmitter work?",
              answer: "The events module provides the EventEmitter class, which is the foundation of Node.js's event-driven architecture. Use emitter.on(event, callback) to listen to events, emitter.emit(event, data) to trigger events, and emitter.once() for one-time listeners. Many Node.js objects (streams, http servers) inherit from EventEmitter, enabling asynchronous, event-driven programming."
            }
          ]
        }}
      >
        <CodeExample
          title="Events Module"
          description="Using EventEmitter"
          code={`const EventEmitter = require('events');

// Create emitter instance
const emitter = new EventEmitter();

// Listen to event
emitter.on('data', (data) => {
  console.log('Received:', data);
});

// Emit event
emitter.emit('data', 'Hello World');

// One-time listener
emitter.once('connect', () => {
  console.log('Connected once');
});

// Remove listener
const handler = () => console.log('Handler');
emitter.on('event', handler);
emitter.removeListener('event', handler);

// Remove all listeners
emitter.removeAllListeners('event');

// Get listener count
console.log(emitter.listenerCount('data'));`}
        />
      </ConceptCard>

      <ConceptCard
        id="38"
        number={38}
        title="Event Emitters"
        priority="🔥"
        theory={{
          what: "Event emitters are objects that can emit named events and allow listeners to register callbacks for those events. They're the core of Node.js's event-driven architecture.",
          why: "Event emitters enable loose coupling between components. Objects can communicate without direct references, making code more modular and maintainable. They're essential for handling async operations.",
          how: "Create custom EventEmitter classes by extending EventEmitter. Emit events with this.emit(). Listeners register with .on(). Handle errors with 'error' event. Use .once() for one-time listeners.",
          keyPoints: [
            "Objects that emit named events",
            "Enable loose coupling",
            "Extend EventEmitter for custom emitters",
            "Emit events with emit()",
            "Listeners register with on()"
          ],
          interviewQuestions: [
            {
              question: "How do you create custom event emitters?",
              answer: "Create custom event emitters by extending the EventEmitter class. Define methods that emit events using this.emit(eventName, data). Other code can listen with .on(eventName, callback). Always handle 'error' events. Custom emitters enable loose coupling and make code more modular."
            }
          ]
        }}
      >
        <CodeExample
          title="Custom Event Emitters"
          description="Creating custom event-emitting classes"
          code={`const EventEmitter = require('events');

// Custom EventEmitter class
class UserManager extends EventEmitter {
  constructor() {
    super();
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
    // Emit event
    this.emit('userAdded', user);
  }

  removeUser(userId) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      this.users = this.users.filter(u => u.id !== userId);
      this.emit('userRemoved', user);
    }
  }

  getUserCount() {
    return this.users.length;
  }
}

// Use the custom emitter
const userManager = new UserManager();

// Listen to events
userManager.on('userAdded', (user) => {
  console.log('User added:', user.name);
});

userManager.on('userRemoved', (user) => {
  console.log('User removed:', user.name);
});

// Trigger events
userManager.addUser({ id: 1, name: 'John' });
userManager.addUser({ id: 2, name: 'Jane' });

// Error event handling
userManager.on('error', (err) => {
  console.error('Error:', err);
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="39"
        number={39}
        title="Custom Events"
        theory={{
          what: "Custom events allow you to define your own event names and data structures. They enable communication between different parts of your application without tight coupling.",
          why: "Custom events make applications more modular and maintainable. Components can communicate without direct dependencies, making code easier to test and refactor.",
          how: "Define custom event names (use descriptive names). Emit events with data: emitter.emit('customEvent', data). Listen with emitter.on('customEvent', callback). Use namespaces or prefixes for organization.",
          keyPoints: [
            "Define your own event names",
            "Pass custom data with events",
            "Use descriptive event names",
            "Organize with namespaces",
            "Enable loose coupling between components"
          ],
          interviewQuestions: [
            {
              question: "How do you implement custom events in Node.js?",
              answer: "Define custom event names (use descriptive, namespaced names like 'user:created'). Emit events with emitter.emit('eventName', data) passing relevant data. Listeners register with emitter.on('eventName', callback). Custom events enable loose coupling - components communicate without direct references, making code more modular and testable."
            }
          ]
        }}
      >
        <CodeExample
          title="Custom Events"
          description="Creating and using custom events"
          code={`const EventEmitter = require('events');

class OrderProcessor extends EventEmitter {
  processOrder(order) {
    // Emit custom events with data
    this.emit('order:created', order);
    
    // Process order
    if (order.items.length === 0) {
      this.emit('order:error', { order, error: 'Empty order' });
      return;
    }
    
    this.emit('order:validated', order);
    
    // Simulate processing
    setTimeout(() => {
      this.emit('order:processed', { order, status: 'completed' });
    }, 1000);
  }
}

const processor = new OrderProcessor();

// Listen to custom events
processor.on('order:created', (order) => {
  console.log('Order created:', order.id);
});

processor.on('order:validated', (order) => {
  console.log('Order validated:', order.id);
});

processor.on('order:processed', (data) => {
  console.log('Order processed:', data.order.id, data.status);
});

processor.on('order:error', (data) => {
  console.error('Order error:', data.error);
});

// Use namespaced events
processor.on('order:*', (data) => {
  console.log('Any order event:', data);
});

// Trigger custom events
processor.processOrder({
  id: 1,
  items: ['item1', 'item2']
});

// Event with multiple listeners
processor.on('order:created', (order) => {
  sendEmail(order);
});

processor.on('order:created', (order) => {
  logToDatabase(order);
});`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== EXPRESS.JS (40-45) ==========
function ExpressJS({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🚀 Express.js</h3>
        <p className="text-green-100 break-words">The most popular Node.js web framework - MOST USED WITH NODE</p>
      </div>

      <ConceptCard
        id="40"
        number={40}
        title="Express Basics"
        priority="🔥"
        theory={{
          what: "Express.js is a minimal, flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It's built on top of Node.js's http module.",
          why: "Express simplifies web server creation compared to using the raw http module. It provides routing, middleware, templating, and many other features. It's the most popular Node.js framework and has a huge ecosystem.",
          how: "Install Express: npm install express. Create app: const express = require('express'); const app = express(). Start server: app.listen(port). Define routes: app.get(), app.post(), etc. Use middleware: app.use().",
          keyPoints: [
            "Minimal, flexible web framework",
            "Built on Node.js http module",
            "Most popular Node.js framework",
            "Provides routing and middleware",
            "Huge ecosystem of packages"
          ],
          interviewQuestions: [
            {
              question: "What is Express.js and why is it popular?",
              answer: "Express.js is a minimal, flexible Node.js web framework built on top of the http module. It simplifies web server creation with features like routing, middleware, templating, and error handling. It's popular because it's lightweight, unopinionated, has a huge ecosystem, and makes building web APIs and applications much easier than using raw Node.js."
            }
          ]
        }}
      >
        <CodeExample
          title="Express Basics"
          description="Creating a basic Express application"
          code={`const express = require('express');
const app = express();
const PORT = 3000;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route with parameters
app.get('/users/:id', (req, res) => {
  res.json({ userId: req.params.id });
});

// POST route
app.post('/users', express.json(), (req, res) => {
  res.status(201).json({ message: 'User created', user: req.body });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});

// Express provides:
// - app.get(), app.post(), app.put(), app.delete()
// - req.params, req.query, req.body
// - res.send(), res.json(), res.status()
// - Middleware support`}
        />
      </ConceptCard>

      <ConceptCard
        id="41"
        number={41}
        title="Routing"
        priority="🔥"
        theory={{
          what: "Routing determines how an application responds to client requests to particular endpoints (URIs) and HTTP methods. Express provides powerful routing capabilities.",
          why: "Routing organizes your application by mapping URLs to handlers. It makes code maintainable and allows RESTful API design. Express routing is flexible and supports parameters, query strings, and middleware.",
          how: "Define routes: app.get(path, handler), app.post(path, handler), etc. Use route parameters: /users/:id. Access with req.params. Use query strings: ?name=value, access with req.query. Chain routes with app.route().",
          keyPoints: [
            "Map URLs to handlers",
            "Support all HTTP methods",
            "Route parameters with :param",
            "Query strings via req.query",
            "Can chain routes with app.route()"
          ],
          interviewQuestions: [
            {
              question: "How does routing work in Express?",
              answer: "Express routing maps URLs and HTTP methods to handler functions. Define routes with app.get(), app.post(), etc. Use route parameters (/users/:id) accessed via req.params. Query strings (?name=value) are accessed via req.query. Routes are matched in order, so more specific routes should come before general ones. You can chain routes with app.route() and use Router for modular routing."
            }
          ]
        }}
      >
        <CodeExample
          title="Express Routing"
          description="Defining and using routes"
          code={`const express = require('express');
const app = express();

// Basic routes
app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/about', (req, res) => {
  res.send('About');
});

// Route parameters
app.get('/users/:id', (req, res) => {
  res.json({ userId: req.params.id });
});

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  res.json({
    userId: req.params.userId,
    postId: req.params.postId
  });
});

// Query strings
app.get('/search', (req, res) => {
  res.json({
    query: req.query.q,
    page: req.query.page || 1
  });
  // /search?q=nodejs&page=2
});

// Route chaining
app.route('/books')
  .get((req, res) => res.send('Get all books'))
  .post((req, res) => res.send('Create book'));

// Router for modular routes
const router = express.Router();
router.get('/', (req, res) => res.send('Router home'));
router.get('/about', (req, res) => res.send('Router about'));
app.use('/api', router);`}
        />
      </ConceptCard>

      <ConceptCard
        id="42"
        number={42}
        title="Middleware"
        priority="🔥"
        theory={{
          what: "Middleware functions are functions that have access to the request object (req), response object (res), and next function. They execute during the request-response cycle.",
          why: "Middleware enables cross-cutting concerns like logging, authentication, parsing, error handling, and more. It makes code reusable and keeps route handlers clean. Express is built around middleware.",
          how: "Use app.use() or app.METHOD() with middleware function. Middleware receives (req, res, next). Call next() to pass control to next middleware. Order matters - middleware executes sequentially.",
          keyPoints: [
            "Functions with (req, res, next)",
            "Execute during request-response cycle",
            "Use app.use() to register",
            "Call next() to continue",
            "Order matters - executes sequentially"
          ],
          interviewQuestions: [
            {
              question: "What is middleware in Express and how does it work?",
              answer: "Middleware functions have access to req, res, and next. They execute during the request-response cycle. Register with app.use() or app.METHOD(). Middleware receives (req, res, next) - call next() to pass control to the next middleware. Order matters - middleware executes sequentially. Common uses: logging, authentication, body parsing, CORS, error handling."
            }
          ]
        }}
      >
        <CodeExample
          title="Middleware"
          description="Creating and using middleware"
          code={`const express = require('express');
const app = express();

// Built-in middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded

// Custom middleware
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Pass to next middleware
};

app.use(logger);

// Middleware with path
app.use('/api', (req, res, next) => {
  console.log('API request');
  next();
});

// Route-specific middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    req.user = { id: 1, name: 'John' };
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.get('/protected', auth, (req, res) => {
  res.json({ message: 'Protected route', user: req.user });
});

// Error handling middleware (4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Third-party middleware
const cors = require('cors');
app.use(cors());`}
        />
      </ConceptCard>

      <ConceptCard
        id="43"
        number={43}
        title="Error-handling Middleware"
        priority="🔥"
        theory={{
          what: "Error-handling middleware is special middleware with 4 parameters (err, req, res, next) that handles errors in Express applications. It should be defined after all routes and middleware.",
          why: "Error-handling middleware centralizes error handling, making it consistent across your application. It prevents crashes and provides proper error responses to clients.",
          how: "Define middleware with 4 parameters: (err, req, res, next). Place it after all routes. Call next(err) in route handlers or middleware to pass errors. Handle different error types appropriately.",
          keyPoints: [
            "4 parameters: (err, req, res, next)",
            "Place after all routes",
            "Call next(err) to pass errors",
            "Centralizes error handling",
            "Prevents application crashes"
          ],
          interviewQuestions: [
            {
              question: "How do you handle errors in Express?",
              answer: "Use error-handling middleware with 4 parameters (err, req, res, next). Place it after all routes and middleware. In route handlers or middleware, call next(err) to pass errors to error-handling middleware. Handle different error types (validation errors, database errors, etc.) appropriately and return proper HTTP status codes and error messages."
            }
          ]
        }}
      >
        <CodeExample
          title="Error-handling Middleware"
          description="Handling errors in Express"
          code={`const express = require('express');
const app = express();

// Route that might throw error
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      return next(error);
    }
    res.json(user);
  } catch (err) {
    next(err); // Pass to error handler
  }
});

// Error-handling middleware (4 parameters)
app.use((err, req, res, next) => {
  // Set default status
  const status = err.status || 500;
  
  // Log error
  console.error('Error:', err.message);
  
  // Send error response
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: status,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

// Use custom error
app.get('/error', (req, res, next) => {
  next(new AppError('Custom error', 400));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="44"
        number={44}
        title="Request Lifecycle"
        theory={{
          what: "The request lifecycle in Express describes the journey of an HTTP request through middleware and route handlers until a response is sent. Understanding it is crucial for debugging and optimization.",
          why: "Understanding the request lifecycle helps you place middleware correctly, debug issues, and optimize performance. It explains how Express processes requests and responses.",
          how: "Request flows: 1) Middleware (app.use) executes sequentially, 2) Route matching (app.get/post/etc), 3) Route handlers execute, 4) Response sent. Middleware order matters. next() passes control to next middleware.",
          keyPoints: [
            "Request → Middleware → Route → Response",
            "Middleware executes sequentially",
            "Route matching happens after middleware",
            "next() passes control forward",
            "Response ends the cycle"
          ],
          interviewQuestions: [
            {
              question: "What is the Express request lifecycle?",
              answer: "The request lifecycle: 1) Request arrives, 2) Middleware executes sequentially (app.use), 3) Route matching (app.get/post/etc), 4) Route handlers execute, 5) Response sent. Middleware order matters - they execute in the order registered. Call next() to pass control to the next middleware. Understanding this helps with debugging and middleware placement."
            }
          ]
        }}
      >
        <CodeExample
          title="Request Lifecycle"
          description="Understanding request flow"
          code={`const express = require('express');
const app = express();

// 1. Global middleware (executes first)
app.use((req, res, next) => {
  console.log('1. Global middleware');
  next();
});

// 2. Body parsing middleware
app.use(express.json());

// 3. Route-specific middleware
app.use('/api', (req, res, next) => {
  console.log('2. API middleware');
  next();
});

// 4. Route handler
app.get('/api/users', (req, res, next) => {
  console.log('3. Route handler');
  res.json({ users: [] });
  // Response sent - lifecycle ends
});

// Request flow:
// Request → Global middleware → Body parser → API middleware → Route handler → Response

// Example with error:
app.get('/api/error', (req, res, next) => {
  console.log('Route handler');
  next(new Error('Something went wrong'));
  // Control passes to error handler
});

// Error handler (executes if next(err) called)
app.use((err, req, res, next) => {
  console.log('Error handler');
  res.status(500).json({ error: err.message });
});

// Async route handler
app.get('/api/async', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (err) {
    next(err); // Pass to error handler
  }
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="45"
        number={45}
        title="MVC Pattern"
        priority="🔥"
        theory={{
          what: "MVC (Model-View-Controller) is a software architectural pattern that separates an application into three components: Models (data/business logic), Views (presentation), and Controllers (request handling).",
          why: "MVC separates concerns, making code more maintainable, testable, and scalable. Models handle data, Views handle presentation, Controllers handle user input and coordinate between Models and Views.",
          how: "Organize Express apps: Models (data/database logic), Views (templates/rendering), Controllers (route handlers). Controllers call Models for data, then render Views or send JSON. Use folder structure: /models, /views, /controllers.",
          keyPoints: [
            "Model: Data and business logic",
            "View: Presentation layer",
            "Controller: Request handling",
            "Separates concerns",
            "Makes code maintainable and testable"
          ],
          interviewQuestions: [
            {
              question: "How do you implement MVC pattern in Express?",
              answer: "MVC separates concerns: Models handle data/business logic (database operations), Views handle presentation (templates), Controllers handle requests (route handlers). In Express: Controllers receive requests, call Models for data, then render Views or send JSON. Organize with folders: /models, /views, /controllers. Controllers are thin - they delegate to Models and render Views. This makes code maintainable, testable, and scalable."
            }
          ]
        }}
      >
        <CodeExample
          title="MVC Pattern"
          description="Implementing MVC in Express"
          code={`// models/User.js
class User {
  static async findById(id) {
    // Database query
    return { id, name: 'John', email: 'john@example.com' };
  }
  
  static async findAll() {
    return [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ];
  }
}

module.exports = User;

// controllers/userController.js
const User = require('../models/User');

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);

module.exports = router;

// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(3000);

// Folder structure:
// /models
//   - User.js
// /controllers
//   - userController.js
// /routes
//   - userRoutes.js
// app.js`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== DATABASES (46-52) ==========
function Databases({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🗄️ Databases</h3>
        <p className="text-teal-100 break-words">Working with databases in Node.js applications</p>
      </div>

      <ConceptCard
        id="46"
        number={46}
        title="MongoDB with Node"
        priority="🔥"
        theory={{
          what: "MongoDB is a NoSQL document database. The official MongoDB driver for Node.js allows you to connect to MongoDB and perform CRUD operations. MongoDB stores data as JSON-like documents.",
          why: "MongoDB is popular for Node.js applications because it uses JavaScript-like syntax, is schema-less (flexible), and works well with JSON. It's great for rapid development and handling unstructured or semi-structured data.",
          how: "Install: npm install mongodb. Connect: MongoClient.connect(uri). Use collections: db.collection('name'). Perform CRUD: insertOne(), find(), updateOne(), deleteOne(). Use async/await for operations.",
          keyPoints: [
            "NoSQL document database",
            "Uses official MongoDB driver",
            "Stores JSON-like documents",
            "Schema-less and flexible",
            "Great for rapid development"
          ],
          interviewQuestions: [
            {
              question: "How do you connect to MongoDB in Node.js?",
              answer: "Use the official mongodb package. Connect with MongoClient.connect(connectionString). Get database with client.db('dbName'). Access collections with db.collection('collectionName'). Perform CRUD operations: insertOne(), find(), updateOne(), deleteOne(). Always use async/await and handle errors. Close connection with client.close()."
            }
          ]
        }}
      >
        <CodeExample
          title="MongoDB with Node"
          description="Connecting and using MongoDB"
          code={`const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('mydb');
    const collection = db.collection('users');
    
    // Insert document
    await collection.insertOne({
      name: 'John',
      email: 'john@example.com',
      age: 30
    });
    
    // Find documents
    const users = await collection.find({ age: { $gte: 18 } }).toArray();
    console.log(users);
    
    // Update document
    await collection.updateOne(
      { name: 'John' },
      { $set: { age: 31 } }
    );
    
    // Delete document
    await collection.deleteOne({ name: 'John' });
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

connectDB();`}
        />
      </ConceptCard>

      <ConceptCard
        id="47"
        number={47}
        title="SQL Databases (PostgreSQL, MySQL)"
        priority="🔥"
        theory={{
          what: "SQL databases like PostgreSQL and MySQL are relational databases that use SQL for queries. Node.js has drivers for both: pg for PostgreSQL and mysql2 for MySQL.",
          why: "SQL databases provide ACID transactions, strong consistency, and structured data storage. They're ideal for applications requiring complex queries, relationships, and data integrity.",
          how: "PostgreSQL: npm install pg, use Pool or Client. MySQL: npm install mysql2, use createConnection or createPool. Execute queries with query() method. Use parameterized queries to prevent SQL injection.",
          keyPoints: [
            "Relational databases with SQL",
            "PostgreSQL: pg package",
            "MySQL: mysql2 package",
            "Use connection pools",
            "Always use parameterized queries"
          ],
          interviewQuestions: [
            {
              question: "How do you connect to PostgreSQL or MySQL in Node.js?",
              answer: "For PostgreSQL: use 'pg' package, create Pool or Client, connect with connection string. For MySQL: use 'mysql2' package, create connection or pool. Execute queries with query() method. Always use parameterized queries (placeholders) to prevent SQL injection. Use connection pools for better performance. Handle errors and close connections properly."
            }
          ]
        }}
      >
        <CodeExample
          title="SQL Databases"
          description="Using PostgreSQL and MySQL"
          code={`// PostgreSQL
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: 'password',
  port: 5432,
});

async function queryDB() {
  try {
    // Parameterized query (prevents SQL injection)
    const result = await pool.query(
      'SELECT * FROM users WHERE age > $1',
      [18]
    );
    console.log(result.rows);
    
    // Insert
    await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2)',
      ['John', 'john@example.com']
    );
  } catch (err) {
    console.error('Error:', err);
  }
}

// MySQL
const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
});

const [rows] = await connection.execute(
  'SELECT * FROM users WHERE age > ?',
  [18]
);

await connection.end();`}
        />
      </ConceptCard>

      <ConceptCard
        id="48"
        number={48}
        title="ORM / ODM"
        theory={{
          what: "ORM (Object-Relational Mapping) and ODM (Object-Document Mapping) are tools that map database records to objects in your code. They provide abstraction over raw database queries.",
          why: "ORMs/ODMs make database operations easier, provide type safety, handle migrations, and reduce boilerplate code. They abstract away SQL/database specifics, making code more maintainable.",
          how: "Define models/schemas. Use model methods: Model.create(), Model.find(), Model.update(), Model.delete(). ORMs handle relationships, migrations, and validations. Popular: Sequelize (SQL), Prisma (SQL), Mongoose (MongoDB).",
          keyPoints: [
            "Maps database to objects",
            "Abstracts raw queries",
            "Provides type safety",
            "Handles relationships",
            "Reduces boilerplate code"
          ],
          interviewQuestions: [
            {
              question: "What are ORM and ODM, and why use them?",
              answer: "ORM (Object-Relational Mapping) maps SQL database records to objects. ODM (Object-Document Mapping) does the same for NoSQL databases. They abstract away raw queries, provide type safety, handle relationships, migrations, and validations. They make code more maintainable and reduce boilerplate. Popular: Sequelize/Prisma for SQL, Mongoose for MongoDB."
            }
          ]
        }}
      >
        <CodeExample
          title="ORM / ODM"
          description="Using ORM/ODM abstractions"
          code={`// ORM Example (Sequelize)
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING
});

// Use model methods instead of raw SQL
await User.create({ name: 'John', email: 'john@example.com' });
const users = await User.findAll({ where: { name: 'John' } });
await User.update({ name: 'Jane' }, { where: { id: 1 } });
await User.destroy({ where: { id: 1 } });

// ODM Example (Mongoose)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', userSchema);

await User.create({ name: 'John', email: 'john@example.com' });
const users = await User.find({ name: 'John' });
await User.updateOne({ name: 'John' }, { name: 'Jane' });
await User.deleteOne({ name: 'John' });`}
        />
      </ConceptCard>

      <ConceptCard
        id="49"
        number={49}
        title="Mongoose"
        priority="🔥"
        theory={{
          what: "Mongoose is the most popular ODM (Object-Document Mapper) for MongoDB and Node.js. It provides schema-based solution for modeling application data.",
          why: "Mongoose simplifies MongoDB operations, provides schema validation, middleware, type casting, and query building. It's the standard way to work with MongoDB in Node.js.",
          how: "Install: npm install mongoose. Connect: mongoose.connect(uri). Define schemas: new mongoose.Schema({}). Create models: mongoose.model('Name', schema). Use model methods: save(), find(), findOne(), updateOne(), deleteOne().",
          keyPoints: [
            "Most popular MongoDB ODM",
            "Schema-based modeling",
            "Validation and middleware",
            "Type casting",
            "Query building"
          ],
          interviewQuestions: [
            {
              question: "What is Mongoose and how do you use it?",
              answer: "Mongoose is the most popular ODM for MongoDB in Node.js. Connect with mongoose.connect(uri). Define schemas with mongoose.Schema() for validation and structure. Create models with mongoose.model(). Use model methods: save(), find(), findOne(), updateOne(), deleteOne(). Mongoose provides validation, middleware (pre/post hooks), type casting, and query building, making MongoDB operations easier and safer."
            }
          ]
        }}
      >
        <CodeExample
          title="Mongoose"
          description="Using Mongoose ODM"
          code={`const mongoose = require('mongoose');

// Connect
mongoose.connect('mongodb://localhost:27017/mydb');

// Define schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Add methods
userSchema.methods.getInfo = function() {
  return \`\${this.name} - \${this.email}\`;
};

// Create model
const User = mongoose.model('User', userSchema);

// Create document
const user = new User({ name: 'John', email: 'john@example.com' });
await user.save();

// Or use create
await User.create({ name: 'Jane', email: 'jane@example.com' });

// Find
const users = await User.find({ age: { $gte: 18 } });
const user = await User.findOne({ email: 'john@example.com' });

// Update
await User.updateOne({ name: 'John' }, { age: 30 });
await user.updateOne({ age: 31 });

// Delete
await User.deleteOne({ name: 'John' });`}
        />
      </ConceptCard>

      <ConceptCard
        id="50"
        number={50}
        title="Prisma"
        priority="🔥"
        theory={{
          what: "Prisma is a modern ORM for Node.js and TypeScript. It provides type-safe database access, auto-generated migrations, and a powerful query API. It works with PostgreSQL, MySQL, SQLite, and more.",
          why: "Prisma offers excellent TypeScript support, type safety, intuitive API, and great developer experience. It generates types from your schema and provides autocomplete. It's becoming very popular for modern Node.js applications.",
          how: "Install: npm install prisma @prisma/client. Initialize: npx prisma init. Define schema in schema.prisma. Generate client: npx prisma generate. Use PrismaClient for queries: prisma.user.findMany(). Run migrations: npx prisma migrate dev.",
          keyPoints: [
            "Modern ORM for TypeScript/Node.js",
            "Type-safe database access",
            "Auto-generated migrations",
            "Works with SQL databases",
            "Excellent developer experience"
          ],
          interviewQuestions: [
            {
              question: "What is Prisma and how does it differ from other ORMs?",
              answer: "Prisma is a modern ORM for Node.js and TypeScript. It provides type-safe database access with auto-generated types, intuitive query API, and auto-generated migrations. Unlike traditional ORMs, Prisma uses a schema file (schema.prisma) and generates a type-safe client. It offers excellent TypeScript support, autocomplete, and a great developer experience. It works with PostgreSQL, MySQL, SQLite, and more."
            }
          ]
        }}
      >
        <CodeExample
          title="Prisma"
          description="Using Prisma ORM"
          code={`// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

// Using Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create
const user = await prisma.user.create({
  data: {
    name: 'John',
    email: 'john@example.com',
    posts: {
      create: { title: 'My Post' }
    }
  }
});

// Find
const users = await prisma.user.findMany({
  where: { email: { contains: '@example.com' } },
  include: { posts: true }
});

// Update
await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane' }
});

// Delete
await prisma.user.delete({ where: { id: 1 } });`}
        />
      </ConceptCard>

      <ConceptCard
        id="51"
        number={51}
        title="Sequelize"
        theory={{
          what: "Sequelize is a popular ORM for Node.js that supports PostgreSQL, MySQL, MariaDB, SQLite, and MSSQL. It provides promise-based ORM with migrations, validations, and associations.",
          why: "Sequelize is mature, well-documented, and supports multiple SQL databases. It provides migrations, validations, hooks, and associations. It's widely used in Node.js applications.",
          how: "Install: npm install sequelize pg2 (or mysql2). Create Sequelize instance. Define models with sequelize.define(). Use model methods: create(), findAll(), findOne(), update(), destroy(). Define associations: hasMany(), belongsTo(). Run migrations.",
          keyPoints: [
            "Popular ORM for SQL databases",
            "Supports multiple databases",
            "Migrations and validations",
            "Associations and hooks",
            "Promise-based API"
          ],
          interviewQuestions: [
            {
              question: "What is Sequelize and how do you use it?",
              answer: "Sequelize is a popular ORM for Node.js supporting PostgreSQL, MySQL, SQLite, and more. Create instance with new Sequelize(). Define models with sequelize.define() with attributes and options. Use model methods: create(), findAll(), findOne(), update(), destroy(). Define associations: hasMany(), belongsTo(), hasOne(). Sequelize provides migrations, validations, hooks (beforeCreate, afterUpdate, etc.), and transaction support."
            }
          ]
        }}
      >
        <CodeExample
          title="Sequelize"
          description="Using Sequelize ORM"
          code={`const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

// Define model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: { isEmail: true }
  }
});

// Associations
const Post = sequelize.define('Post', {
  title: DataTypes.STRING
});

User.hasMany(Post);
Post.belongsTo(User);

// CRUD operations
await User.create({ name: 'John', email: 'john@example.com' });
const users = await User.findAll({ where: { name: 'John' } });
await User.update({ name: 'Jane' }, { where: { id: 1 } });
await User.destroy({ where: { id: 1 } });

// Include associations
const user = await User.findOne({
  where: { id: 1 },
  include: [Post]
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="52"
        number={52}
        title="Connection Pooling"
        theory={{
          what: "Connection pooling maintains a cache of database connections that can be reused. Instead of creating a new connection for each request, connections are reused from a pool.",
          why: "Creating database connections is expensive. Connection pooling improves performance by reusing connections, limits the number of connections, and manages connection lifecycle efficiently.",
          how: "Most database drivers and ORMs support connection pooling. Configure pool size (min, max connections), idle timeout, and connection timeout. Pools automatically manage connection creation, reuse, and cleanup.",
          keyPoints: [
            "Reuses database connections",
            "Improves performance",
            "Limits connection count",
            "Manages connection lifecycle",
            "Built into most drivers/ORMs"
          ],
          interviewQuestions: [
            {
              question: "What is connection pooling and why is it important?",
              answer: "Connection pooling maintains a cache of reusable database connections. Instead of creating a new connection for each request, connections are reused from a pool. This improves performance (creating connections is expensive), limits the number of connections (prevents overwhelming the database), and manages connection lifecycle. Most database drivers and ORMs (pg, mysql2, Sequelize, Prisma) support connection pooling with configurable pool size and timeouts."
            }
          ]
        }}
      >
        <CodeExample
          title="Connection Pooling"
          description="Using connection pools"
          code={`// PostgreSQL with pg
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'mydb',
  user: 'user',
  password: 'password',
  max: 20, // Maximum pool size
  min: 5,  // Minimum pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Pool automatically manages connections
const result = await pool.query('SELECT * FROM users');

// MySQL with mysql2
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  database: 'mydb',
  user: 'user',
  password: 'password',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const [rows] = await pool.execute('SELECT * FROM users');

// Prisma automatically uses connection pooling
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Prisma manages connection pool internally`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== AUTHENTICATION & SECURITY (53-59) ==========
function AuthenticationSecurity({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🔐 Authentication & Security</h3>
        <p className="text-red-100 break-words">Securing Node.js applications</p>
      </div>

      <ConceptCard
        id="53"
        number={53}
        title="JWT Authentication"
        priority="🔥"
        theory={{
          what: "JWT (JSON Web Token) is a compact, URL-safe token format for securely transmitting information. JWTs are stateless and contain claims (user info) that can be verified.",
          why: "JWTs are popular for API authentication because they're stateless (no server-side session storage), scalable, and work well with microservices. They're self-contained and can include user information.",
          how: "Install: npm install jsonwebtoken. Sign token: jwt.sign(payload, secret, options). Verify token: jwt.verify(token, secret). Store token in Authorization header: Bearer <token>. Use middleware to verify on protected routes.",
          keyPoints: [
            "Stateless authentication",
            "Self-contained tokens",
            "Sign with secret key",
            "Verify on each request",
            "Store in Authorization header"
          ],
          interviewQuestions: [
            {
              question: "How does JWT authentication work?",
              answer: "JWT authentication: 1) User logs in, server signs JWT with secret key containing user info, 2) Server sends JWT to client, 3) Client stores JWT (localStorage/cookie), 4) Client sends JWT in Authorization header (Bearer token), 5) Server verifies JWT on protected routes. JWTs are stateless (no server session), self-contained, and include expiration. Use jsonwebtoken package: jwt.sign() to create, jwt.verify() to verify."
            }
          ]
        }}
      >
        <CodeExample
          title="JWT Authentication"
          description="Implementing JWT auth"
          code={`const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

const SECRET_KEY = 'your-secret-key';

// Login - generate token
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Verify credentials (simplified)
  if (username === 'user' && password === 'pass') {
    // Sign token
    const token = jwt.sign(
      { userId: 1, username: 'user' },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Protected route
app.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="54"
        number={54}
        title="Sessions & Cookies"
        theory={{
          what: "Sessions store user data on the server, identified by a session ID stored in a cookie. Cookies are small pieces of data stored in the browser and sent with requests.",
          why: "Sessions provide server-side state management for authentication. Cookies are the standard way to store session IDs. They're more secure than storing tokens in localStorage (HttpOnly cookies prevent XSS).",
          how: "Use express-session middleware. Configure session store (memory, Redis, database). Session ID stored in cookie. Access session: req.session. Set cookie options: httpOnly, secure, sameSite. Use cookie-parser middleware.",
          keyPoints: [
            "Server-side session storage",
            "Session ID in cookie",
            "More secure than localStorage",
            "Use express-session",
            "Configure cookie options"
          ],
          interviewQuestions: [
            {
              question: "How do sessions and cookies work in Express?",
              answer: "Sessions store user data on the server, identified by a session ID stored in a cookie. Use express-session middleware. Configure session store (memory for dev, Redis/database for production). Session ID automatically stored in cookie. Access session data with req.session. Configure cookie options: httpOnly (prevents JavaScript access), secure (HTTPS only), sameSite (CSRF protection). Sessions are more secure than client-side storage for sensitive data."
            }
          ]
        }}
      >
        <CodeExample
          title="Sessions & Cookies"
          description="Using sessions in Express"
          code={`const express = require('express');
const session = require('express-session');
const app = express();

// Configure session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true for HTTPS
    httpOnly: true, // Prevents JavaScript access
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// Login - set session
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'user' && password === 'pass') {
    req.session.userId = 1;
    req.session.username = username;
    res.json({ message: 'Logged in' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Middleware to check session
const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
};

// Protected route
app.get('/profile', requireAuth, (req, res) => {
  res.json({ userId: req.session.userId });
});

// Logout - destroy session
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out' });
  });
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="55"
        number={55}
        title="Password Hashing (bcrypt)"
        priority="🔥"
        theory={{
          what: "Password hashing converts passwords into irreversible hashes. bcrypt is a popular hashing algorithm designed specifically for passwords. It includes salt and is computationally expensive.",
          why: "Never store plain text passwords! Hashing makes passwords unreadable. bcrypt is designed to be slow (resistant to brute force), includes salt (prevents rainbow table attacks), and is the industry standard.",
          how: "Install: npm install bcrypt. Hash password: bcrypt.hash(password, saltRounds). Compare: bcrypt.compare(password, hash). Use salt rounds of 10-12. Always hash before storing, compare when authenticating.",
          keyPoints: [
            "Never store plain text passwords",
            "bcrypt designed for passwords",
            "Includes salt automatically",
            "Computationally expensive (slow)",
            "Use salt rounds 10-12"
          ],
          interviewQuestions: [
            {
              question: "Why use bcrypt for password hashing?",
              answer: "Never store passwords in plain text! bcrypt is designed specifically for passwords. It includes automatic salt (prevents rainbow table attacks), is computationally expensive (resistant to brute force), and is the industry standard. Use bcrypt.hash() with salt rounds 10-12 to hash passwords before storing. Use bcrypt.compare() to verify passwords during login. bcrypt is slow by design to make brute force attacks impractical."
            }
          ]
        }}
      >
        <CodeExample
          title="Password Hashing"
          description="Using bcrypt for passwords"
          code={`const bcrypt = require('bcrypt');

// Hash password (when registering)
async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

// Compare password (when logging in)
async function verifyPassword(password, hash) {
  const match = await bcrypt.compare(password, hash);
  return match;
}

// Example usage
const express = require('express');
const app = express();
app.use(express.json());

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Store username and hashedPassword in database
  // await User.create({ username, password: hashedPassword });
  
  res.json({ message: 'User registered' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // Get user from database
  // const user = await User.findOne({ username });
  
  // Compare password
  // const isValid = await bcrypt.compare(password, user.password);
  
  if (isValid) {
    res.json({ message: 'Logged in' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="56"
        number={56}
        title="OAuth"
        theory={{
          what: "OAuth is an authorization framework that allows third-party services to access user resources without sharing passwords. OAuth 2.0 is the current standard used by Google, GitHub, Facebook, etc.",
          why: "OAuth enables 'Login with Google/GitHub' functionality. Users don't need to create new accounts, and you don't handle passwords. It's secure and widely supported.",
          how: "Use libraries like passport.js with OAuth strategies (passport-google-oauth20, passport-github2). Configure client ID and secret. Handle OAuth callback. Create or find user, then create session/JWT.",
          keyPoints: [
            "Third-party authentication",
            "Users don't share passwords",
            "OAuth 2.0 is current standard",
            "Use passport.js strategies",
            "Handle OAuth callback"
          ],
          interviewQuestions: [
            {
              question: "How do you implement OAuth in Node.js?",
              answer: "Use passport.js with OAuth strategies (passport-google-oauth20, passport-github2, etc.). Configure client ID and secret from OAuth provider. Set up routes: /auth/google (initiates OAuth), /auth/google/callback (handles callback). In callback, get user info from provider, create or find user in database, then create session or JWT. OAuth allows users to authenticate with third-party services without sharing passwords."
            }
          ]
        }}
      >
        <CodeExample
          title="OAuth"
          description="Implementing OAuth with Passport"
          code={`const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');
const app = express();

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    // Find or create user
    let user = await User.findOne({ googleId: profile.id });
    
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });
    }
    
    return done(null, user);
  }
));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/profile');
  }
);`}
        />
      </ConceptCard>

      <ConceptCard
        id="57"
        number={57}
        title="Environment Variables"
        priority="🔥"
        theory={{
          what: "Environment variables store configuration that varies between environments (development, production). They keep sensitive data (API keys, secrets) out of code.",
          why: "Environment variables keep secrets secure, allow different configs per environment, and prevent committing sensitive data to version control. They're essential for production applications.",
          how: "Use dotenv package: npm install dotenv. Create .env file (add to .gitignore). Load: require('dotenv').config(). Access: process.env.VARIABLE_NAME. Use in production: set environment variables on server or use hosting platform's config.",
          keyPoints: [
            "Store configuration outside code",
            "Keep secrets secure",
            "Different configs per environment",
            "Use dotenv package",
            "Never commit .env file"
          ],
          interviewQuestions: [
            {
              question: "How do you use environment variables in Node.js?",
              answer: "Use dotenv package: require('dotenv').config() loads variables from .env file. Access with process.env.VARIABLE_NAME. Create .env file with KEY=value format. Add .env to .gitignore (never commit secrets!). In production, set environment variables on server or use hosting platform's config. Environment variables keep secrets secure and allow different configs per environment."
            }
          ]
        }}
      >
        <CodeExample
          title="Environment Variables"
          description="Using dotenv for configuration"
          code={`// Install: npm install dotenv

// .env file (add to .gitignore!)
DATABASE_URL=mongodb://localhost:27017/mydb
JWT_SECRET=your-secret-key
PORT=3000
NODE_ENV=development
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

// Load environment variables
require('dotenv').config();

// Access variables
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const dbUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;

// Use in code
mongoose.connect(process.env.DATABASE_URL);

app.listen(process.env.PORT, () => {
  console.log(\`Server running on port \${process.env.PORT}\`);
});

// Check environment
if (process.env.NODE_ENV === 'production') {
  // Production settings
} else {
  // Development settings
}

// In production, set variables:
// export PORT=3000
// Or use hosting platform's environment variable settings`}
        />
      </ConceptCard>

      <ConceptCard
        id="58"
        number={58}
        title="Helmet"
        theory={{
          what: "Helmet is Express middleware that sets various HTTP headers to help protect your app from common web vulnerabilities like XSS, clickjacking, etc.",
          why: "Helmet provides security headers that protect against common attacks. It's easy to use and should be included in all Express applications. It's maintained by the Express team.",
          how: "Install: npm install helmet. Use: app.use(helmet()). Helmet sets headers like X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, etc. You can configure individual headers if needed.",
          keyPoints: [
            "Sets security HTTP headers",
            "Protects against common vulnerabilities",
            "Easy to use",
            "Maintained by Express team",
            "Should use in all Express apps"
          ],
          interviewQuestions: [
            {
              question: "What is Helmet and why use it?",
              answer: "Helmet is Express middleware that sets security HTTP headers to protect against common vulnerabilities like XSS, clickjacking, MIME sniffing, etc. Simply use app.use(helmet()) and it sets headers like X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security. It's easy to use, maintained by the Express team, and should be included in all Express applications for basic security."
            }
          ]
        }}
      >
        <CodeExample
          title="Helmet"
          description="Using Helmet for security headers"
          code={`const express = require('express');
const helmet = require('helmet');
const app = express();

// Use Helmet (sets security headers)
app.use(helmet());

// Helmet sets headers like:
// X-Content-Type-Options: nosniff
// X-Frame-Options: SAMEORIGIN
// X-XSS-Protection: 1; mode=block
// Strict-Transport-Security: max-age=31536000

// Configure specific options
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"]
    }
  }
}));

// Disable specific header
app.use(helmet({
  xFrameOptions: false
}));`}
        />
      </ConceptCard>

      <ConceptCard
        id="59"
        number={59}
        title="Rate Limiting"
        theory={{
          what: "Rate limiting restricts the number of requests a client can make in a given time period. It prevents abuse, DDoS attacks, and API overuse.",
          why: "Rate limiting protects your server from abuse, prevents DDoS attacks, ensures fair API usage, and can prevent brute force attacks. It's essential for production APIs.",
          how: "Use express-rate-limit middleware: npm install express-rate-limit. Configure: rateLimit({ windowMs, max }). Apply to routes or globally. Can use Redis for distributed rate limiting.",
          keyPoints: [
            "Limits requests per time period",
            "Prevents abuse and DDoS",
            "Use express-rate-limit",
            "Configurable window and max requests",
            "Can use Redis for distributed limiting"
          ],
          interviewQuestions: [
            {
              question: "What is rate limiting and how do you implement it?",
              answer: "Rate limiting restricts requests per time period. Use express-rate-limit middleware. Configure with windowMs (time window) and max (max requests). Apply globally with app.use() or to specific routes. Rate limiting prevents abuse, DDoS attacks, and ensures fair API usage. For distributed systems, use Redis store for shared rate limiting across multiple servers."
            }
          ]
        }}
      >
        <CodeExample
          title="Rate Limiting"
          description="Implementing rate limiting"
          code={`const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// Global rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// Route-specific rate limiter
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Limit login attempts
  skipSuccessfulRequests: true
});

app.post('/login', loginLimiter, (req, res) => {
  // Login logic
});

// API rate limiter
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10 // 10 requests per minute
});

app.use('/api/', apiLimiter);

// Redis store for distributed rate limiting
const RedisStore = require('rate-limit-redis');
const redis = require('redis');
const client = redis.createClient();

const limiterWithRedis = rateLimit({
  store: new RedisStore({
    client: client
  }),
  windowMs: 15 * 60 * 1000,
  max: 100
});`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== TESTING & DEBUGGING (60-65) ==========
function TestingDebugging({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🧪 Testing & Debugging</h3>
        <p className="text-orange-100 break-words">Testing and debugging Node.js applications</p>
      </div>

      <ConceptCard
        id="60"
        number={60}
        title="Unit Testing"
        priority="🔥"
        theory={{
          what: "Unit testing tests individual units (functions, modules) in isolation. Each test verifies that a unit behaves correctly. Tests should be fast, isolated, and repeatable.",
          why: "Unit tests catch bugs early, document code behavior, enable refactoring with confidence, and improve code quality. They're the foundation of a good testing strategy.",
          how: "Use testing frameworks: Jest, Mocha, or Vitest. Write test files: *.test.js or *.spec.js. Use describe() for test suites, it() or test() for individual tests. Use assertions: expect().toBe(), expect().toEqual(). Run tests: npm test.",
          keyPoints: [
            "Tests individual units in isolation",
            "Fast and repeatable",
            "Use Jest, Mocha, or Vitest",
            "describe() and it()/test()",
            "Use assertions to verify behavior"
          ],
          interviewQuestions: [
            {
              question: "What is unit testing and how do you write unit tests?",
              answer: "Unit testing tests individual functions/modules in isolation. Use testing frameworks like Jest or Mocha. Write test files (*.test.js). Use describe() for test suites, it() or test() for individual tests. Use assertions (expect().toBe(), expect().toEqual()) to verify behavior. Unit tests should be fast, isolated, and repeatable. They catch bugs early and enable confident refactoring."
            }
          ]
        }}
      >
        <CodeExample
          title="Unit Testing"
          description="Writing unit tests with Jest"
          code={`// math.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };

// math.test.js
const { add, multiply } = require('./math');

describe('Math functions', () => {
  describe('add', () => {
    it('should add two numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    
    it('should handle negative numbers', () => {
      expect(add(-1, 1)).toBe(0);
    });
  });
  
  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(multiply(2, 3)).toBe(6);
    });
  });
});

// Run: npm test

// package.json
{
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="61"
        number={61}
        title="Integration Testing"
        theory={{
          what: "Integration testing tests how multiple units work together. It tests interactions between components, APIs, databases, and external services.",
          why: "Integration tests verify that components work together correctly. They catch issues that unit tests miss (like API integration, database queries, middleware interactions).",
          how: "Test API endpoints with Supertest. Test database operations with test database. Test middleware chains. Use setup/teardown for test data. Mock external services. Use separate test database.",
          keyPoints: [
            "Tests multiple units together",
            "Tests API endpoints",
            "Tests database operations",
            "Use Supertest for HTTP testing",
            "Use test database"
          ],
          interviewQuestions: [
            {
              question: "What is integration testing and how does it differ from unit testing?",
              answer: "Integration testing tests how multiple units work together (APIs, databases, middleware). Unit tests test individual functions in isolation. Integration tests verify API endpoints, database operations, and component interactions. Use Supertest for HTTP endpoint testing. Use a separate test database. Integration tests catch issues that unit tests miss, like API integration problems or database query errors."
            }
          ]
        }}
      >
        <CodeExample
          title="Integration Testing"
          description="Testing API endpoints"
          code={`const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: 2, name });
});

// users.test.js
describe('Users API', () => {
  describe('GET /api/users', () => {
    it('should return list of users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);
      
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty('id');
    });
  });
  
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Jane' })
        .expect(201);
      
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Jane');
    });
  });
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="62"
        number={62}
        title="Jest / Mocha"
        priority="🔥"
        theory={{
          what: "Jest and Mocha are popular JavaScript testing frameworks. Jest is all-in-one (test runner, assertions, mocking). Mocha is a test runner that needs assertion libraries (Chai) and mocking libraries (Sinon).",
          why: "Jest is popular for its simplicity and built-in features. Mocha is flexible and widely used. Both are industry standards. Jest is often preferred for new projects due to zero configuration.",
          how: "Jest: npm install --save-dev jest, write *.test.js files, run npm test. Mocha: npm install --save-dev mocha chai, write *.test.js files, run npx mocha. Both support describe(), it(), beforeEach(), afterEach().",
          keyPoints: [
            "Jest: all-in-one framework",
            "Mocha: flexible test runner",
            "Both support describe() and it()",
            "Jest has built-in assertions and mocking",
            "Mocha needs Chai and Sinon"
          ],
          interviewQuestions: [
            {
              question: "What are Jest and Mocha, and how do they differ?",
              answer: "Jest and Mocha are JavaScript testing frameworks. Jest is all-in-one with built-in test runner, assertions (expect), and mocking. Mocha is a flexible test runner that needs assertion libraries (Chai) and mocking libraries (Sinon). Jest is often preferred for simplicity and zero configuration. Mocha offers more flexibility. Both support describe(), it(), beforeEach(), afterEach(). Choose Jest for simplicity, Mocha for flexibility."
            }
          ]
        }}
      >
        <CodeExample
          title="Jest vs Mocha"
          description="Using Jest and Mocha"
          code={`// Jest (all-in-one)
// math.test.js
const { add } = require('./math');

describe('add function', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  
  it('should handle async', async () => {
    const result = await asyncFunction();
    expect(result).toBeDefined();
  });
});

// Run: npm test (Jest)

// Mocha + Chai (needs separate libraries)
// math.test.js
const { expect } = require('chai');
const { add } = require('./math');

describe('add function', () => {
  it('should add two numbers', () => {
    expect(add(2, 3)).to.equal(5);
  });
});

// Run: npx mocha

// Jest features:
// - Built-in assertions
// - Built-in mocking
// - Code coverage
// - Snapshot testing

// Mocha features:
// - Flexible
// - Works with any assertion library
// - Works with any mocking library`}
        />
      </ConceptCard>

      <ConceptCard
        id="63"
        number={63}
        title="Supertest"
        theory={{
          what: "Supertest is a library for testing HTTP endpoints. It provides a high-level abstraction for testing Express and other Node.js HTTP servers.",
          why: "Supertest makes testing HTTP endpoints easy. It handles request/response, status codes, headers, and body. It's the standard tool for integration testing Express APIs.",
          how: "Install: npm install --save-dev supertest. Import: const request = require('supertest'). Use: request(app).get('/path').expect(status). Use .send() for POST body, .set() for headers, .expect() for assertions.",
          keyPoints: [
            "Tests HTTP endpoints",
            "Works with Express",
            "Easy request/response testing",
            "Chainable API",
            "Standard for API testing"
          ],
          interviewQuestions: [
            {
              question: "What is Supertest and how do you use it?",
              answer: "Supertest is a library for testing HTTP endpoints. Use request(app).get('/path') to make requests. Chain methods: .expect(status) for status codes, .send(data) for POST body, .set('header', 'value') for headers. Use with Jest or Mocha. Supertest makes testing Express APIs easy - it handles requests, responses, and provides a chainable API for assertions."
            }
          ]
        }}
      >
        <CodeExample
          title="Supertest"
          description="Testing HTTP endpoints"
          code={`const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  res.status(201).json({ id: 2, name });
});

// users.test.js
describe('Users API', () => {
  it('GET /api/users should return 200', async () => {
    await request(app)
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /json/);
  });
  
  it('POST /api/users should create user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Jane' })
      .set('Accept', 'application/json')
      .expect(201);
    
    expect(response.body.name).toBe('Jane');
  });
  
  it('should handle errors', async () => {
    await request(app)
      .get('/api/users/999')
      .expect(404);
  });
});`}
        />
      </ConceptCard>

      <ConceptCard
        id="64"
        number={64}
        title="Debugging Node Apps"
        theory={{
          what: "Debugging is finding and fixing bugs in code. Node.js provides built-in debugging support. You can use debugger statement, Node.js inspector, VS Code debugger, or console.log.",
          why: "Debugging is essential for development. Understanding debugging tools and techniques makes development faster and helps solve complex issues.",
          how: "Use debugger statement and run: node --inspect app.js. Use VS Code debugger: create launch.json. Use console.log() for simple debugging. Use debug module: require('debug')('namespace'). Use Node.js inspector: chrome://inspect.",
          keyPoints: [
            "Use debugger statement",
            "Node.js inspector: --inspect flag",
            "VS Code debugger",
            "console.log() for simple debugging",
            "debug module for conditional logging"
          ],
          interviewQuestions: [
            {
              question: "How do you debug Node.js applications?",
              answer: "Use debugger statement and run with node --inspect app.js, then open chrome://inspect in Chrome. Use VS Code debugger: create launch.json configuration. Use console.log() for simple debugging. Use debug module (require('debug')('namespace')) for conditional logging controlled by DEBUG environment variable. Use breakpoints in VS Code. Use Node.js inspector for advanced debugging."
            }
          ]
        }}
      >
        <CodeExample
          title="Debugging"
          description="Debugging techniques"
          code={`// 1. Debugger statement
function calculateTotal(items) {
  let total = 0;
  debugger; // Breakpoint here
  items.forEach(item => {
    total += item.price;
  });
  return total;
}

// Run: node --inspect app.js
// Open: chrome://inspect

// 2. VS Code debugger
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Node App",
      "program": "\${workspaceFolder}/app.js",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}

// 3. Debug module
const debug = require('debug')('app:server');

debug('Server starting'); // Only logs if DEBUG=app:server

// Run: DEBUG=app:* node app.js

// 4. Console.log (simple)
console.log('Value:', variable);
console.error('Error:', error);
console.table(array);

// 5. Node.js inspector
// node --inspect-brk app.js
// Opens debugger on first line`}
        />
      </ConceptCard>

      <ConceptCard
        id="65"
        number={65}
        title="Logging"
        theory={{
          what: "Logging records application events, errors, and information. Good logging helps with debugging, monitoring, and understanding application behavior in production.",
          why: "Logging is essential for production applications. It helps debug issues, monitor performance, track errors, and understand user behavior. Use structured logging for better analysis.",
          how: "Use logging libraries: Winston, Pino, or Bunyan. Log levels: error, warn, info, debug. Use structured logging (JSON). Log to files, console, or external services. Use log rotation. Don't log sensitive data.",
          keyPoints: [
            "Record application events",
            "Use Winston, Pino, or Bunyan",
            "Log levels: error, warn, info, debug",
            "Structured logging (JSON)",
            "Don't log sensitive data"
          ],
          interviewQuestions: [
            {
              question: "How do you implement logging in Node.js?",
              answer: "Use logging libraries like Winston, Pino, or Bunyan. Configure log levels (error, warn, info, debug). Use structured logging (JSON format) for better analysis. Log to files, console, or external services (like Loggly, Datadog). Use log rotation to manage file sizes. Never log sensitive data (passwords, tokens). Logging helps debug issues, monitor performance, and track errors in production."
            }
          ]
        }}
      >
        <CodeExample
          title="Logging"
          description="Implementing logging"
          code={`// Winston logger
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

logger.error('Error message');
logger.warn('Warning message');
logger.info('Info message');
logger.debug('Debug message');

// Pino (faster)
const pino = require('pino');

const logger = pino({
  level: 'info'
});

logger.info({ userId: 1 }, 'User logged in');
logger.error({ err }, 'Error occurred');

// Simple logging
const log = {
  error: (msg) => console.error(\`[ERROR] \${new Date().toISOString()} - \${msg}\`),
  info: (msg) => console.log(\`[INFO] \${new Date().toISOString()} - \${msg}\`),
  warn: (msg) => console.warn(\`[WARN] \${new Date().toISOString()} - \${msg}\`)
};

log.info('Server started');
log.error('Database connection failed');`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== PERFORMANCE & SCALABILITY (66-72) ==========
function PerformanceScalability({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">⚙️ Performance & Scalability</h3>
        <p className="text-purple-100 break-words">Optimizing Node.js applications for performance</p>
      </div>

      <ConceptCard
        id="66"
        number={66}
        title="Clustering"
        priority="🔥"
        theory={{
          what: "Clustering allows Node.js to create multiple worker processes that share server ports. The cluster module enables you to take advantage of multi-core systems by spawning child processes.",
          why: "Node.js is single-threaded, so it can only use one CPU core. Clustering allows you to create multiple Node.js processes (one per CPU core) to handle more requests and improve performance. It's essential for scaling Node.js applications.",
          how: "Use cluster module: require('cluster'). Check if master: cluster.isMaster. Fork workers: cluster.fork(). Listen for worker events: 'online', 'exit'. Workers share the same port. Use PM2 for production clustering.",
          keyPoints: [
            "Creates multiple worker processes",
            "Utilizes all CPU cores",
            "Shares server ports",
            "Improves performance and scalability",
            "Use PM2 for production"
          ],
          interviewQuestions: [
            {
              question: "What is clustering in Node.js and why is it important?",
              answer: "Clustering creates multiple worker processes that share server ports, allowing Node.js to utilize all CPU cores. Since Node.js is single-threaded, clustering enables better performance and scalability. Use cluster module: cluster.fork() to create workers, cluster.isMaster to check if master process. Workers share the same port. For production, use PM2 which handles clustering automatically."
            }
          ]
        }}
      >
        <CodeExample
          title="Clustering"
          description="Using cluster module"
          code={`const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(\`Master \${process.pid} is running\`);
  
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    cluster.fork(); // Restart worker
  });
} else {
  // Workers share the same port
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(\`Hello from worker \${process.pid}\`);
  }).listen(3000);
  
  console.log(\`Worker \${process.pid} started\`);
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="67"
        number={67}
        title="Worker Threads"
        theory={{
          what: "Worker Threads allow you to run JavaScript in parallel. Unlike clustering (separate processes), worker threads share memory and are lighter weight. They're useful for CPU-intensive tasks.",
          why: "Worker threads enable true parallelism for CPU-intensive operations without blocking the main thread. They're lighter than processes and share memory. Use them for heavy computations, image processing, or data parsing.",
          how: "Use worker_threads module: require('worker_threads'). Create worker: new Worker(filename). Pass data: worker.postMessage(data). Receive: parentPort.on('message'). Return: parentPort.postMessage(result).",
          keyPoints: [
            "Parallel JavaScript execution",
            "Lighter than processes",
            "Share memory",
            "Good for CPU-intensive tasks",
            "Don't block main thread"
          ],
          interviewQuestions: [
            {
              question: "What are worker threads and when should you use them?",
              answer: "Worker threads enable parallel JavaScript execution in separate threads. They're lighter than processes (clustering) and share memory. Use worker threads for CPU-intensive tasks like heavy computations, image processing, or data parsing that would block the main thread. Use worker_threads module: new Worker() to create, postMessage() to communicate, parentPort.on('message') to receive data."
            }
          ]
        }}
      >
        <CodeExample
          title="Worker Threads"
          description="Using worker threads"
          code={`// main.js
const { Worker } = require('worker_threads');

function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: data
    });
    
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(\`Worker stopped with code \${code}\`));
      }
    });
  });
}

// Use worker
runWorker({ start: 0, end: 1000000 })
  .then(result => console.log('Result:', result));

// worker.js
const { parentPort, workerData } = require('worker_threads');

// CPU-intensive task
function heavyComputation(start, end) {
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += i;
  }
  return sum;
}

const result = heavyComputation(workerData.start, workerData.end);
parentPort.postMessage(result);`}
        />
      </ConceptCard>

      <ConceptCard
        id="68"
        number={68}
        title="Load Balancing"
        theory={{
          what: "Load balancing distributes incoming requests across multiple servers or processes to prevent any single server from becoming overwhelmed. It improves availability and performance.",
          why: "Load balancing ensures high availability, distributes traffic evenly, handles server failures gracefully, and improves overall performance. It's essential for production applications.",
          how: "Use reverse proxy (Nginx, HAProxy) or cloud load balancers (AWS ELB, Google Cloud Load Balancer). Distribute by round-robin, least connections, or IP hash. Health checks ensure only healthy servers receive traffic.",
          keyPoints: [
            "Distributes requests across servers",
            "Improves availability",
            "Prevents server overload",
            "Use Nginx or cloud load balancers",
            "Health checks for reliability"
          ],
          interviewQuestions: [
            {
              question: "What is load balancing and how do you implement it?",
              answer: "Load balancing distributes incoming requests across multiple servers/processes. Use reverse proxies like Nginx or cloud load balancers (AWS ELB, Google Cloud). Distribution methods: round-robin, least connections, IP hash. Configure health checks to route traffic only to healthy servers. Load balancing improves availability, prevents overload, and handles server failures gracefully."
            }
          ]
        }}
      >
        <CodeExample
          title="Load Balancing"
          description="Load balancing setup"
          code={`// Nginx configuration
upstream nodejs_backend {
    least_conn; // or round-robin, ip_hash
    server localhost:3000;
    server localhost:3001;
    server localhost:3002;
    server localhost:3003 backup; // Backup server
}

server {
    listen 80;
    server_name example.com;
    
    location / {
        proxy_pass http://nodejs_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

// PM2 load balancing
// pm2 start app.js -i 4  // 4 instances

// Express with cluster
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Each worker listens on same port
  app.listen(3000);
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="69"
        number={69}
        title="Caching (Redis)"
        priority="🔥"
        theory={{
          what: "Caching stores frequently accessed data in fast storage (memory) to avoid expensive operations. Redis is an in-memory data store used for caching, sessions, and real-time data.",
          why: "Caching dramatically improves performance by avoiding expensive database queries or computations. Redis is fast (in-memory), supports various data structures, and is widely used for caching, sessions, and pub/sub.",
          how: "Install: npm install redis. Connect: redis.createClient(). Set: client.set(key, value, 'EX', seconds). Get: client.get(key). Use for: API responses, database queries, session storage. Set TTL (time-to-live) for expiration.",
          keyPoints: [
            "Stores data in fast memory",
            "Avoids expensive operations",
            "Redis is popular caching solution",
            "Set TTL for expiration",
            "Improves response times"
          ],
          interviewQuestions: [
            {
              question: "What is caching and how do you use Redis for caching?",
              answer: "Caching stores frequently accessed data in fast storage (memory) to avoid expensive operations. Redis is an in-memory data store perfect for caching. Use redis.createClient() to connect. Cache API responses, database queries, or computed values. Use client.set(key, value, 'EX', seconds) with TTL for expiration. Use client.get(key) to retrieve. Caching dramatically improves performance and reduces database load."
            }
          ]
        }}
      >
        <CodeExample
          title="Caching with Redis"
          description="Implementing Redis caching"
          code={`const redis = require('redis');
const client = redis.createClient();

// Cache API response
async function getCachedData(key) {
  const cached = await client.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  return null;
}

async function setCachedData(key, data, ttl = 3600) {
  await client.setEx(key, ttl, JSON.stringify(data));
}

// Example: Cache user data
app.get('/users/:id', async (req, res) => {
  const cacheKey = \`user:\${req.params.id}\`;
  
  // Check cache
  const cached = await getCachedData(cacheKey);
  if (cached) {
    return res.json(cached);
  }
  
  // Fetch from database
  const user = await User.findById(req.params.id);
  
  // Cache for 1 hour
  await setCachedData(cacheKey, user, 3600);
  
  res.json(user);
});

// Cache database queries
async function getUsers() {
  const cacheKey = 'users:all';
  const cached = await getCachedData(cacheKey);
  
  if (cached) return cached;
  
  const users = await User.find();
  await setCachedData(cacheKey, users, 1800); // 30 minutes
  return users;
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="70"
        number={70}
        title="Compression"
        theory={{
          what: "Compression reduces the size of HTTP responses by compressing data before sending it to clients. This reduces bandwidth usage and improves response times.",
          why: "Compression reduces bandwidth usage, speeds up page loads, improves user experience, and reduces server costs. It's especially important for text-based content (JSON, HTML, CSS, JS).",
          how: "Use compression middleware: npm install compression. Use: app.use(compression()). Supports gzip, deflate, brotli. Automatically compresses responses. Configure compression level and filters.",
          keyPoints: [
            "Reduces response size",
            "Saves bandwidth",
            "Improves load times",
            "Use compression middleware",
            "Automatic for text content"
          ],
          interviewQuestions: [
            {
              question: "How do you implement compression in Express?",
              answer: "Use compression middleware: npm install compression, then app.use(compression()). It automatically compresses HTTP responses (gzip, deflate, brotli) before sending to clients. Compression reduces bandwidth usage, speeds up page loads, and improves user experience. Configure compression level and filters if needed. It's especially effective for text-based content like JSON, HTML, CSS, and JavaScript."
            }
          ]
        }}
      >
        <CodeExample
          title="Compression"
          description="Using compression middleware"
          code={`const express = require('express');
const compression = require('compression');
const app = express();

// Enable compression
app.use(compression());

// Configure compression
app.use(compression({
  level: 6, // Compression level (1-9)
  filter: (req, res) => {
    // Don't compress if client doesn't support it
    if (req.headers['no-compression']) {
      return false;
    }
    // Use compression for all other requests
    return compression.filter(req, res);
  }
}));

app.get('/api/data', (req, res) => {
  const data = { /* large data object */ };
  res.json(data); // Automatically compressed
});

// Response headers will include:
// Content-Encoding: gzip`}
        />
      </ConceptCard>

      <ConceptCard
        id="71"
        number={71}
        title="Memory Management"
        theory={{
          what: "Memory management involves monitoring and optimizing memory usage in Node.js applications. This includes avoiding memory leaks, managing large objects, and understanding garbage collection.",
          why: "Poor memory management leads to memory leaks, crashes, and poor performance. Understanding memory usage helps optimize applications and prevent issues in production.",
          how: "Monitor memory: process.memoryUsage(). Use --max-old-space-size flag. Avoid memory leaks: remove event listeners, clear intervals/timeouts, avoid global variables. Use streams for large data. Profile with node --inspect.",
          keyPoints: [
            "Monitor memory usage",
            "Avoid memory leaks",
            "Remove event listeners",
            "Use streams for large data",
            "Profile with --inspect"
          ],
          interviewQuestions: [
            {
              question: "How do you manage memory in Node.js applications?",
              answer: "Monitor memory with process.memoryUsage(). Avoid memory leaks by removing event listeners, clearing intervals/timeouts, and avoiding global variables. Use streams for large data instead of loading everything into memory. Use --max-old-space-size flag to increase heap size if needed. Profile memory usage with node --inspect and Chrome DevTools. Proper memory management prevents crashes and improves performance."
            }
          ]
        }}
      >
        <CodeExample
          title="Memory Management"
          description="Monitoring and managing memory"
          code={`// Monitor memory usage
const used = process.memoryUsage();
console.log({
  rss: \`\${Math.round(used.rss / 1024 / 1024)}MB\`,
  heapTotal: \`\${Math.round(used.heapTotal / 1024 / 1024)}MB\`,
  heapUsed: \`\${Math.round(used.heapUsed / 1024 / 1024)}MB\`,
  external: \`\${Math.round(used.external / 1024 / 1024)}MB\`
});

// Increase heap size
// node --max-old-space-size=4096 app.js

// Avoid memory leaks
class EventEmitter {
  constructor() {
    this.listeners = new Map();
  }
  
  on(event, handler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(handler);
  }
  
  off(event, handler) {
    const handlers = this.listeners.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) handlers.splice(index, 1);
    }
  }
  
  removeAllListeners(event) {
    this.listeners.delete(event);
  }
}

// Use streams for large data
const fs = require('fs');
const readStream = fs.createReadStream('large-file.txt');
const writeStream = fs.createWriteStream('output.txt');
readStream.pipe(writeStream);`}
        />
      </ConceptCard>

      <ConceptCard
        id="72"
        number={72}
        title="Performance Optimization"
        priority="🔥"
        theory={{
          what: "Performance optimization involves improving application speed, reducing response times, and efficiently using resources. It includes caching, compression, database optimization, code optimization, and monitoring.",
          why: "Performance directly impacts user experience, server costs, and scalability. Optimized applications handle more traffic, respond faster, and use fewer resources. It's critical for production applications.",
          how: "Use caching (Redis), compression (gzip), database indexing, connection pooling, async operations, code profiling, load balancing, clustering, and monitoring. Identify bottlenecks with profiling tools. Optimize hot paths.",
          keyPoints: [
            "Improve response times",
            "Use caching and compression",
            "Optimize database queries",
            "Profile and monitor",
            "Identify bottlenecks"
          ],
          interviewQuestions: [
            {
              question: "How do you optimize Node.js application performance?",
              answer: "Performance optimization: 1) Use caching (Redis) for frequently accessed data, 2) Enable compression (gzip) for responses, 3) Optimize database queries (indexing, connection pooling), 4) Use async operations and avoid blocking, 5) Implement clustering/load balancing, 6) Profile code to identify bottlenecks, 7) Monitor performance metrics, 8) Use streams for large data, 9) Minimize dependencies, 10) Optimize hot paths. Measure before and after to verify improvements."
            }
          ]
        }}
      >
        <CodeExample
          title="Performance Optimization"
          description="Performance best practices"
          code={`// 1. Caching
const redis = require('redis');
const client = redis.createClient();
app.use(async (req, res, next) => {
  const cached = await client.get(req.url);
  if (cached) return res.json(JSON.parse(cached));
  next();
});

// 2. Compression
const compression = require('compression');
app.use(compression());

// 3. Database optimization
// Use indexes
db.users.createIndex({ email: 1 });
// Use connection pooling
const pool = new Pool({ max: 20 });

// 4. Async operations
async function processData() {
  const [users, posts] = await Promise.all([
    User.find(),
    Post.find()
  ]);
}

// 5. Clustering
const cluster = require('cluster');
if (cluster.isMaster) {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}

// 6. Monitoring
const performance = require('perf_hooks');
const start = performance.now();
// ... operation
const duration = performance.now() - start;
console.log(\`Operation took \${duration}ms\`);`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== DEVOPS & DEPLOYMENT (73-77) ==========
function DevOpsDeployment({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🐳 DevOps & Deployment</h3>
        <p className="text-blue-100 break-words">Deploying and managing Node.js applications</p>
      </div>

      <ConceptCard
        id="73"
        number={73}
        title="Environment Configurations"
        theory={{
          what: "Environment configurations manage different settings for development, staging, and production environments. They include database URLs, API keys, feature flags, and other environment-specific values.",
          why: "Different environments need different configurations. Environment variables keep secrets secure, allow easy configuration changes, and prevent committing sensitive data to version control.",
          how: "Use .env files with dotenv package. Create .env.development, .env.production. Load: require('dotenv').config(). Access: process.env.VARIABLE. Use config libraries: node-config, convict. Set variables on hosting platforms.",
          keyPoints: [
            "Separate configs per environment",
            "Use .env files",
            "Keep secrets secure",
            "Never commit .env files",
            "Use config libraries"
          ],
          interviewQuestions: [
            {
              question: "How do you manage environment configurations?",
              answer: "Use .env files with dotenv package for different environments (.env.development, .env.production). Load with require('dotenv').config(). Access variables with process.env.VARIABLE_NAME. Use config libraries like node-config or convict for complex configurations. Never commit .env files to version control. In production, set environment variables on hosting platforms (Heroku, AWS, etc.)."
            }
          ]
        }}
      >
        <CodeExample
          title="Environment Configurations"
          description="Managing environment configs"
          code={`// .env.development
DATABASE_URL=mongodb://localhost:27017/mydb_dev
JWT_SECRET=dev-secret-key
PORT=3000
NODE_ENV=development

// .env.production
DATABASE_URL=mongodb://prod-server:27017/mydb
JWT_SECRET=production-secret-key
PORT=8080
NODE_ENV=production

// config.js
require('dotenv').config({ path: \`.env.\${process.env.NODE_ENV}\` });

module.exports = {
  database: {
    url: process.env.DATABASE_URL
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  server: {
    port: process.env.PORT || 3000
  },
  env: process.env.NODE_ENV
};

// Using node-config
const config = require('config');

// config/development.json
{
  "database": {
    "url": "mongodb://localhost:27017/mydb_dev"
  }
}

// config/production.json
{
  "database": {
    "url": "mongodb://prod-server:27017/mydb"
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="74"
        number={74}
        title="Process Managers (PM2)"
        priority="🔥"
        theory={{
          what: "Process managers keep Node.js applications running, restart them on crashes, and manage multiple instances. PM2 is the most popular process manager for Node.js.",
          why: "Process managers ensure applications stay running, automatically restart on crashes, enable zero-downtime deployments, provide logging, and manage clustering. Essential for production deployments.",
          how: "Install: npm install -g pm2. Start: pm2 start app.js. Commands: pm2 list, pm2 stop, pm2 restart, pm2 delete, pm2 logs. Use ecosystem file: pm2.config.js. Enable clustering: pm2 start app.js -i 4.",
          keyPoints: [
            "Keeps apps running",
            "Auto-restart on crashes",
            "Zero-downtime deployments",
            "Built-in clustering",
            "Logging and monitoring"
          ],
          interviewQuestions: [
            {
              question: "What is PM2 and how do you use it?",
              answer: "PM2 is a process manager for Node.js. Install: npm install -g pm2. Start app: pm2 start app.js. Commands: pm2 list (show processes), pm2 stop/restart/delete (manage), pm2 logs (view logs). Use ecosystem file (pm2.config.js) for configuration. Enable clustering: pm2 start app.js -i 4. PM2 keeps apps running, auto-restarts on crashes, enables zero-downtime deployments, and provides logging/monitoring."
            }
          ]
        }}
      >
        <CodeExample
          title="PM2 Process Manager"
          description="Using PM2"
          code={`// Install: npm install -g pm2

// Start application
pm2 start app.js

// Start with name
pm2 start app.js --name myapp

// Start with clustering (4 instances)
pm2 start app.js -i 4

// PM2 commands
pm2 list              // List all processes
pm2 stop myapp        // Stop process
pm2 restart myapp      // Restart process
pm2 reload myapp       // Zero-downtime reload
pm2 delete myapp       // Delete process
pm2 logs               // View logs
pm2 monit              // Monitor processes

// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'myapp',
    script: './app.js',
    instances: 4,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss'
  }]
};

// Start with ecosystem file
pm2 start ecosystem.config.js

// Save PM2 configuration
pm2 save

// Setup startup script
pm2 startup
pm2 save`}
        />
      </ConceptCard>

      <ConceptCard
        id="75"
        number={75}
        title="Docker with Node"
        priority="🔥"
        theory={{
          what: "Docker containerizes Node.js applications, packaging them with dependencies and runtime. Containers are isolated, portable, and consistent across environments.",
          why: "Docker ensures consistency across environments, simplifies deployment, enables microservices, and makes scaling easier. It's the industry standard for containerization.",
          how: "Create Dockerfile: FROM node, COPY files, RUN npm install, EXPOSE port, CMD node app.js. Build: docker build -t image-name. Run: docker run -p port:port image-name. Use docker-compose for multi-container apps.",
          keyPoints: [
            "Containerizes applications",
            "Consistent across environments",
            "Simplifies deployment",
            "Use Dockerfile",
            "docker-compose for multi-container"
          ],
          interviewQuestions: [
            {
              question: "How do you containerize Node.js applications with Docker?",
              answer: "Create Dockerfile: FROM node:18-alpine, WORKDIR /app, COPY package*.json, RUN npm install, COPY . ., EXPOSE 3000, CMD ['node', 'app.js']. Build: docker build -t myapp. Run: docker run -p 3000:3000 myapp. Use .dockerignore to exclude files. Use docker-compose.yml for multi-container apps (app, database, redis). Docker ensures consistency, simplifies deployment, and enables easy scaling."
            }
          ]
        }}
      >
        <CodeExample
          title="Docker with Node"
          description="Dockerizing Node.js apps"
          code={`// Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "app.js"]

// .dockerignore
node_modules
npm-debug.log
.env
.git
.gitignore
README.md

// Build image
docker build -t my-node-app .

// Run container
docker run -p 3000:3000 my-node-app

// Run with environment variables
docker run -p 3000:3000 -e NODE_ENV=production my-node-app

// docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=mongodb://mongo:27017/mydb
    depends_on:
      - mongo
      - redis
  
  mongo:
    image: mongo:5
    ports:
      - "27017:27017"
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

// Run with docker-compose
docker-compose up -d`}
        />
      </ConceptCard>

      <ConceptCard
        id="76"
        number={76}
        title="CI/CD"
        theory={{
          what: "CI/CD (Continuous Integration/Continuous Deployment) automates testing and deployment. CI runs tests on code changes. CD automatically deploys to production after tests pass.",
          why: "CI/CD ensures code quality, catches bugs early, automates deployment, reduces manual errors, and enables faster releases. It's essential for modern development workflows.",
          how: "Use CI/CD platforms: GitHub Actions, GitLab CI, Jenkins, CircleCI. Configure workflows: install dependencies, run tests, build, deploy. Use secrets for sensitive data. Deploy to staging, then production.",
          keyPoints: [
            "Automates testing and deployment",
            "Catches bugs early",
            "Reduces manual errors",
            "Use GitHub Actions, GitLab CI",
            "Deploy automatically after tests"
          ],
          interviewQuestions: [
            {
              question: "What is CI/CD and how do you implement it?",
              answer: "CI/CD automates testing (CI) and deployment (CD). Use platforms like GitHub Actions, GitLab CI, or Jenkins. Configure workflows: 1) Install dependencies, 2) Run tests, 3) Build application, 4) Deploy to staging/production. Use secrets for sensitive data. CI/CD ensures code quality, catches bugs early, automates deployment, and enables faster releases. It's essential for modern development workflows."
            }
          ]
        }}
      >
        <CodeExample
          title="CI/CD"
          description="GitHub Actions CI/CD"
          code={`// .github/workflows/deploy.yml
name: Deploy Node.js App

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linter
      run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to production
      uses: appleboy/ssh-action@master
      with:
        host: \${{ secrets.HOST }}
        username: \${{ secrets.USERNAME }}
        key: \${{ secrets.SSH_KEY }}
        script: |
          cd /var/www/myapp
          git pull
          npm install --production
          pm2 restart myapp`}
        />
      </ConceptCard>

      <ConceptCard
        id="77"
        number={77}
        title="Deployment Strategies"
        theory={{
          what: "Deployment strategies define how applications are deployed to production. Common strategies include blue-green, rolling, canary, and zero-downtime deployments.",
          why: "Different deployment strategies suit different needs. Some minimize downtime, others allow gradual rollouts, and some enable quick rollbacks. Choosing the right strategy is crucial for production.",
          how: "Blue-green: Deploy new version alongside old, switch traffic. Rolling: Gradually replace instances. Canary: Deploy to small percentage, monitor, then full rollout. Zero-downtime: Use PM2 reload or load balancer. Use Docker/Kubernetes for advanced strategies.",
          keyPoints: [
            "Different strategies for different needs",
            "Blue-green deployment",
            "Rolling deployment",
            "Canary deployment",
            "Zero-downtime deployments"
          ],
          interviewQuestions: [
            {
              question: "What are different deployment strategies?",
              answer: "Deployment strategies: 1) Blue-green: Deploy new version alongside old, switch traffic instantly, enables quick rollback. 2) Rolling: Gradually replace instances, minimal downtime. 3) Canary: Deploy to small percentage of users, monitor, then full rollout. 4) Zero-downtime: Use PM2 reload or load balancer to switch without downtime. Choose based on requirements: blue-green for quick rollback, canary for gradual rollout, rolling for minimal downtime."
            }
          ]
        }}
      >
        <CodeExample
          title="Deployment Strategies"
          description="Different deployment approaches"
          code={`// Blue-Green Deployment
// Deploy new version (green) alongside old (blue)
// Switch traffic to green
// If issues, switch back to blue

// PM2 Zero-Downtime
pm2 reload app.js  // Graceful reload

// Rolling Deployment
// Gradually replace instances
pm2 start app.js -i 4
pm2 reload app.js  // Reloads one at a time

// Canary Deployment (with load balancer)
// Deploy to 10% of servers
// Monitor metrics
// If successful, deploy to 100%

// Docker Blue-Green
docker-compose -f docker-compose.blue.yml up -d
# Test blue
docker-compose -f docker-compose.green.yml up -d
# Switch traffic
docker-compose -f docker-compose.blue.yml down

// Kubernetes Rolling Update
kubectl set image deployment/myapp app=myapp:v2
kubectl rollout status deployment/myapp
kubectl rollout undo deployment/myapp  // Rollback`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== ARCHITECTURE & BEST PRACTICES (78-82) ==========
function ArchitectureBestPractices({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🧱 Architecture & Best Practices</h3>
        <p className="text-green-100 break-words">Building maintainable Node.js applications</p>
      </div>

      <ConceptCard
        id="78"
        number={78}
        title="Project Structure"
        priority="🔥"
        theory={{
          what: "Project structure organizes code into logical directories and files. A good structure makes code maintainable, scalable, and easy to navigate.",
          why: "A well-organized project structure improves code maintainability, makes onboarding easier, enables team collaboration, and follows industry best practices. It's crucial for large applications.",
          how: "Common structure: /src (source code), /routes (API routes), /controllers (business logic), /models (data models), /middleware (middleware), /services (service layer), /utils (utilities), /config (configuration), /tests (tests). Separate concerns.",
          keyPoints: [
            "Organizes code logically",
            "Improves maintainability",
            "Separates concerns",
            "Follows MVC pattern",
            "Easy to navigate"
          ],
          interviewQuestions: [
            {
              question: "What is a good Node.js project structure?",
              answer: "Good project structure: /src (source), /routes (API routes), /controllers (business logic), /models (data models), /middleware (middleware functions), /services (service layer), /utils (utilities), /config (configuration), /tests (tests). Separate concerns: routes handle HTTP, controllers handle logic, models handle data, services handle business rules. This structure improves maintainability, scalability, and makes code easy to navigate."
            }
          ]
        }}
      >
        <CodeExample
          title="Project Structure"
          description="Organizing Node.js projects"
          code={`// Recommended project structure
myapp/
├── src/
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── productRoutes.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── productController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Product.js
│   ├── services/
│   │   ├── userService.js
│   │   └── productService.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   ├── logger.js
│   │   └── validators.js
│   ├── config/
│   │   ├── database.js
│   │   └── env.js
│   └── app.js
├── tests/
│   ├── unit/
│   └── integration/
├── .env
├── .gitignore
├── package.json
└── README.md

// Example: routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);

module.exports = router;

// Example: controllers/userController.js
const userService = require('../services/userService');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};`}
        />
      </ConceptCard>

      <ConceptCard
        id="79"
        number={79}
        title="Separation of Concerns"
        priority="🔥"
        theory={{
          what: "Separation of concerns divides application into distinct sections, each handling a specific responsibility. Routes handle HTTP, controllers handle logic, models handle data, services handle business rules.",
          why: "Separation of concerns improves maintainability, testability, reusability, and makes code easier to understand. It follows SOLID principles and is a fundamental software engineering practice.",
          how: "Separate layers: Routes (HTTP routing), Controllers (request/response handling), Services (business logic), Models (data access), Middleware (cross-cutting concerns). Each layer has a single responsibility. Don't mix concerns.",
          keyPoints: [
            "Divides app into distinct sections",
            "Each section has single responsibility",
            "Improves maintainability",
            "Makes code testable",
            "Follows SOLID principles"
          ],
          interviewQuestions: [
            {
              question: "What is separation of concerns and why is it important?",
              answer: "Separation of concerns divides application into distinct sections with single responsibilities: Routes handle HTTP routing, Controllers handle request/response, Services handle business logic, Models handle data access, Middleware handles cross-cutting concerns. This improves maintainability, testability, reusability, and makes code easier to understand. It's a fundamental software engineering practice following SOLID principles."
            }
          ]
        }}
      >
        <CodeExample
          title="Separation of Concerns"
          description="Implementing separation of concerns"
          code={`// ❌ Bad: Mixed concerns
app.get('/users/:id', async (req, res) => {
  const user = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
  if (!user) {
    return res.status(404).json({ error: 'Not found' });
  }
  const isAdmin = user.role === 'admin';
  if (isAdmin) {
    user.permissions = ['read', 'write', 'delete'];
  }
  res.json(user);
});

// ✅ Good: Separated concerns

// routes/userRoutes.js (HTTP routing)
router.get('/users/:id', userController.getUser);

// controllers/userController.js (Request/response)
exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// services/userService.js (Business logic)
exports.getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }
  if (user.role === 'admin') {
    user.permissions = ['read', 'write', 'delete'];
  }
  return user;
};

// models/User.js (Data access)
class User {
  static async findById(id) {
    return await db.query('SELECT * FROM users WHERE id = ?', [id]);
  }
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="80"
        number={80}
        title="Service Layer Pattern"
        theory={{
          what: "Service layer pattern encapsulates business logic in service classes/functions, separate from controllers and models. Services contain the core business rules and orchestrate data operations.",
          why: "Service layer separates business logic from HTTP handling (controllers) and data access (models). It makes business logic reusable, testable, and easier to maintain. It's a common architectural pattern.",
          how: "Create service files: userService.js, productService.js. Services contain business logic, validation, and orchestrate model calls. Controllers call services, services call models. Services are independent of HTTP.",
          keyPoints: [
            "Encapsulates business logic",
            "Separates from controllers/models",
            "Makes logic reusable",
            "Easier to test",
            "Independent of HTTP"
          ],
          interviewQuestions: [
            {
              question: "What is the service layer pattern?",
              answer: "Service layer pattern encapsulates business logic in service classes/functions, separate from controllers (HTTP handling) and models (data access). Services contain core business rules, validation, and orchestrate data operations. Controllers call services, services call models. This makes business logic reusable, testable, and easier to maintain. Services are independent of HTTP, making them usable in different contexts."
            }
          ]
        }}
      >
        <CodeExample
          title="Service Layer Pattern"
          description="Implementing service layer"
          code={`// services/userService.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserService {
  async createUser(userData) {
    // Business logic: Validate email
    if (!this.isValidEmail(userData.email)) {
      throw new Error('Invalid email');
    }
    
    // Business logic: Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Business logic: Set default role
    const user = {
      ...userData,
      password: hashedPassword,
      role: userData.role || 'user'
    };
    
    // Call model
    return await User.create(user);
  }
  
  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Business logic: Add computed fields
    user.fullName = \`\${user.firstName} \${user.lastName}\`;
    
    return user;
  }
  
  isValidEmail(email) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  }
}

module.exports = new UserService();

// controllers/userController.js
const userService = require('../services/userService');

exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};`}
        />
      </ConceptCard>

      <ConceptCard
        id="81"
        number={81}
        title="Dependency Injection"
        theory={{
          what: "Dependency injection provides dependencies to a module from outside rather than creating them inside. It makes code more testable, flexible, and follows inversion of control principle.",
          why: "Dependency injection makes code testable (can inject mocks), flexible (can swap implementations), and reduces coupling. It's a fundamental design pattern for maintainable code.",
          how: "Pass dependencies as parameters or constructor arguments. Don't require() inside functions. Use dependency injection containers or frameworks. In tests, inject mock dependencies.",
          keyPoints: [
            "Provides dependencies from outside",
            "Makes code testable",
            "Reduces coupling",
            "Enables swapping implementations",
            "Follows inversion of control"
          ],
          interviewQuestions: [
            {
              question: "What is dependency injection and why use it?",
              answer: "Dependency injection provides dependencies to a module from outside rather than creating them inside. Pass dependencies as parameters or constructor arguments. This makes code testable (can inject mocks), flexible (can swap implementations), and reduces coupling. Don't require() inside functions - inject dependencies instead. Use DI containers or frameworks for complex apps. It follows inversion of control principle."
            }
          ]
        }}
      >
        <CodeExample
          title="Dependency Injection"
          description="Implementing dependency injection"
          code={`// ❌ Bad: Dependencies created inside
class UserService {
  constructor() {
    this.db = require('./database'); // Hard dependency
    this.logger = require('./logger');
  }
  
  async getUser(id) {
    this.logger.log('Getting user');
    return await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
  }
}

// ✅ Good: Dependencies injected
class UserService {
  constructor(db, logger) {
    this.db = db;      // Injected dependency
    this.logger = logger; // Injected dependency
  }
  
  async getUser(id) {
    this.logger.log('Getting user');
    return await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
  }
}

// Usage
const db = require('./database');
const logger = require('./logger');
const userService = new UserService(db, logger);

// In tests: Inject mocks
const mockDb = {
  query: jest.fn().mockResolvedValue({ id: 1, name: 'John' })
};
const mockLogger = {
  log: jest.fn()
};
const userService = new UserService(mockDb, mockLogger);

// Function-based DI
function createUserService(db, logger) {
  return {
    async getUser(id) {
      logger.log('Getting user');
      return await db.query('SELECT * FROM users WHERE id = ?', [id]);
    }
  };
}

// Usage
const db = require('./database');
const logger = require('./logger');
const userService = createUserService(db, logger);`}
        />
      </ConceptCard>

      <ConceptCard
        id="82"
        number={82}
        title="Clean Code Practices"
        priority="🔥"
        theory={{
          what: "Clean code practices are guidelines for writing readable, maintainable, and efficient code. They include naming conventions, code organization, error handling, and following SOLID principles.",
          why: "Clean code is easier to read, understand, maintain, and debug. It reduces bugs, improves team collaboration, and makes code reviews easier. It's essential for professional development.",
          how: "Use descriptive names, keep functions small and focused, avoid deep nesting, handle errors properly, use comments wisely, follow consistent style, write self-documenting code, refactor regularly, follow SOLID principles.",
          keyPoints: [
            "Readable and maintainable",
            "Descriptive naming",
            "Small, focused functions",
            "Proper error handling",
            "Follow SOLID principles"
          ],
          interviewQuestions: [
            {
              question: "What are clean code practices in Node.js?",
              answer: "Clean code practices: 1) Use descriptive names (functions, variables), 2) Keep functions small and focused (single responsibility), 3) Avoid deep nesting, 4) Handle errors properly (try/catch, error middleware), 5) Use comments wisely (explain why, not what), 6) Follow consistent style (ESLint, Prettier), 7) Write self-documenting code, 8) Refactor regularly, 9) Follow SOLID principles. Clean code is readable, maintainable, and easier to debug."
            }
          ]
        }}
      >
        <CodeExample
          title="Clean Code Practices"
          description="Writing clean code"
          code={`// ❌ Bad: Unclear, nested, hard to read
function proc(u) {
  if (u) {
    if (u.a) {
      if (u.a.length > 0) {
        let r = [];
        for (let i = 0; i < u.a.length; i++) {
          if (u.a[i].s) {
            r.push(u.a[i].n);
          }
        }
        return r;
      }
    }
  }
  return [];
}

// ✅ Good: Clear, readable, well-structured
function getActiveUserNames(users) {
  if (!users || !users.length) {
    return [];
  }
  
  return users
    .filter(user => user.isActive)
    .map(user => user.name);
}

// ✅ Good: Small, focused functions
async function createUser(userData) {
  validateUserData(userData);
  const hashedPassword = await hashPassword(userData.password);
  const user = await saveUser({ ...userData, password: hashedPassword });
  await sendWelcomeEmail(user.email);
  return user;
}

function validateUserData(userData) {
  if (!userData.email) {
    throw new Error('Email is required');
  }
  if (!isValidEmail(userData.email)) {
    throw new Error('Invalid email format');
  }
}

// ✅ Good: Proper error handling
async function getUserById(id) {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new DatabaseError('Failed to fetch user', error);
  }
}

// ✅ Good: Descriptive names
const userRepository = new UserRepository();
const emailService = new EmailService();
const isUserAuthenticated = checkAuthentication(user);`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== ADVANCED NODE.JS CONCEPTS (83-88) ==========
function AdvancedConcepts({ activeConcept: _activeConcept }: { activeConcept: string | null }) {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full max-w-full overflow-x-hidden">
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white w-full max-w-full overflow-hidden">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 break-words">🌍 Advanced Node.js Concepts</h3>
        <p className="text-pink-100 break-words">Advanced topics for experienced developers</p>
      </div>

      <ConceptCard
        id="83"
        number={83}
        title="Microservices"
        theory={{
          what: "Microservices architecture breaks applications into small, independent services that communicate over networks. Each service handles a specific business capability and can be developed, deployed, and scaled independently.",
          why: "Microservices enable independent deployment, scaling, and technology choices per service. They improve fault isolation, team autonomy, and allow services to be developed by different teams. They're suitable for large, complex applications.",
          how: "Design services around business capabilities. Use API Gateway for routing. Implement service discovery. Use message queues for async communication. Handle distributed transactions. Implement circuit breakers. Use containers (Docker) for deployment.",
          keyPoints: [
            "Small, independent services",
            "Independent deployment",
            "Service-specific scaling",
            "Use API Gateway",
            "Message queues for communication"
          ],
          interviewQuestions: [
            {
              question: "What are microservices and how do you implement them?",
              answer: "Microservices break applications into small, independent services. Design services around business capabilities. Use API Gateway for routing and load balancing. Implement service discovery (Consul, Eureka). Use message queues (RabbitMQ, Kafka) for async communication. Handle distributed transactions with saga pattern. Implement circuit breakers for resilience. Use containers (Docker) and orchestration (Kubernetes) for deployment. Microservices enable independent deployment, scaling, and technology choices."
            }
          ]
        }}
      >
        <CodeExample
          title="Microservices"
          description="Microservices architecture"
          code={`// Service 1: User Service
// user-service/app.js
const express = require('express');
const app = express();

app.get('/users/:id', async (req, res) => {
  const user = await getUserFromDB(req.params.id);
  res.json(user);
});

app.listen(3001);

// Service 2: Order Service
// order-service/app.js
const express = require('express');
const app = express();

app.get('/orders/:id', async (req, res) => {
  const order = await getOrderFromDB(req.params.id);
  // Call user service
  const user = await fetch(\`http://user-service:3001/users/\${order.userId}\`);
  res.json({ ...order, user });
});

app.listen(3002);

// API Gateway
// gateway/app.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/api/users', createProxyMiddleware({
  target: 'http://user-service:3001',
  changeOrigin: true
}));

app.use('/api/orders', createProxyMiddleware({
  target: 'http://order-service:3002',
  changeOrigin: true
}));

app.listen(3000);

// docker-compose.yml
version: '3.8'
services:
  user-service:
    build: ./user-service
    ports:
      - "3001:3001"
  
  order-service:
    build: ./order-service
    ports:
      - "3002:3002"
  
  gateway:
    build: ./gateway
    ports:
      - "3000:3000"
    depends_on:
      - user-service
      - order-service`}
        />
      </ConceptCard>

      <ConceptCard
        id="84"
        number={84}
        title="Message Queues (RabbitMQ, Kafka)"
        theory={{
          what: "Message queues enable asynchronous communication between services. RabbitMQ is a message broker implementing AMQP. Kafka is a distributed streaming platform for high-throughput event streaming.",
          why: "Message queues decouple services, enable async processing, handle traffic spikes, and provide reliability. RabbitMQ is good for task queues. Kafka is excellent for event streaming and high throughput.",
          how: "RabbitMQ: Install amqplib, connect, create channel, assert queue, send/receive messages. Kafka: Install kafkajs, create producer/consumer, send/receive messages. Use for: task queues, event streaming, service communication.",
          keyPoints: [
            "Asynchronous communication",
            "Decouples services",
            "RabbitMQ for task queues",
            "Kafka for event streaming",
            "Handles traffic spikes"
          ],
          interviewQuestions: [
            {
              question: "What are message queues and how do you use RabbitMQ/Kafka?",
              answer: "Message queues enable async communication between services. RabbitMQ: Use amqplib, connect to broker, create channel, assert queue, send messages with channel.sendToQueue(), consume with channel.consume(). Kafka: Use kafkajs, create producer/consumer, send messages with producer.send(), consume with consumer.run(). RabbitMQ is good for task queues and request/response. Kafka is excellent for event streaming and high-throughput scenarios."
            }
          ]
        }}
      >
        <CodeExample
          title="Message Queues"
          description="Using RabbitMQ and Kafka"
          code={`// RabbitMQ Producer
const amqp = require('amqplib');

async function sendMessage() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  const queue = 'tasks';
  await channel.assertQueue(queue, { durable: true });
  
  const message = { task: 'process-order', orderId: 123 };
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true
  });
  
  console.log('Message sent');
  await channel.close();
  await connection.close();
}

// RabbitMQ Consumer
async function receiveMessage() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  
  const queue = 'tasks';
  await channel.assertQueue(queue, { durable: true });
  
  channel.consume(queue, (msg) => {
    const content = JSON.parse(msg.content.toString());
    console.log('Received:', content);
    
    // Process message
    processTask(content);
    
    channel.ack(msg);
  });
}

// Kafka Producer
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

async function sendEvent() {
  await producer.connect();
  await producer.send({
    topic: 'events',
    messages: [
      { value: JSON.stringify({ event: 'user-created', userId: 123 }) }
    ]
  });
  await producer.disconnect();
}

// Kafka Consumer
const consumer = kafka.consumer({ groupId: 'my-group' });

async function consumeEvents() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'events' });
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log('Received event:', event);
      // Process event
    }
  });
}`}
        />
      </ConceptCard>

      <ConceptCard
        id="85"
        number={85}
        title="WebSockets"
        priority="🔥"
        theory={{
          what: "WebSockets provide full-duplex communication between client and server over a single TCP connection. Unlike HTTP, WebSockets allow real-time, bidirectional communication.",
          why: "WebSockets enable real-time features like chat, live updates, gaming, and collaborative editing. They're more efficient than HTTP polling for real-time applications.",
          how: "Use Socket.io (popular library) or ws (lightweight). Install: npm install socket.io. Server: io.on('connection', socket => {}). Client: socket.on('event', data => {}). Emit events: socket.emit(), socket.broadcast.emit().",
          keyPoints: [
            "Full-duplex communication",
            "Real-time bidirectional",
            "Use Socket.io or ws",
            "Persistent connection",
            "Great for real-time apps"
          ],
          interviewQuestions: [
            {
              question: "What are WebSockets and how do you implement them?",
              answer: "WebSockets provide full-duplex, real-time communication between client and server. Use Socket.io (popular, feature-rich) or ws (lightweight). Server: io.on('connection', socket => { socket.on('event', data => {}); socket.emit('response', data); }). Client: socket.on('event', data => {}); socket.emit('event', data). WebSockets enable real-time features like chat, live updates, and gaming. They're more efficient than HTTP polling."
            }
          ]
        }}
      >
        <CodeExample
          title="WebSockets"
          description="Using Socket.io"
          code={`// Server
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Listen for events
  socket.on('message', (data) => {
    console.log('Message:', data);
    
    // Send to sender
    socket.emit('message', { user: 'Server', text: 'Message received' });
    
    // Broadcast to all others
    socket.broadcast.emit('message', data);
    
    // Send to all
    io.emit('message', data);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000);

// Client (browser)
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to server');
  
  // Send message
  socket.emit('message', { user: 'John', text: 'Hello!' });
});

socket.on('message', (data) => {
  console.log('Received:', data);
});

// HTML Client
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();
  
  socket.on('connect', () => {
    socket.emit('message', 'Hello Server!');
  });
  
  socket.on('message', (data) => {
    console.log('Received:', data);
  });
</script>`}
        />
      </ConceptCard>

      <ConceptCard
        id="86"
        number={86}
        title="Server-Sent Events"
        theory={{
          what: "Server-Sent Events (SSE) allow servers to push data to clients over HTTP. Unlike WebSockets, SSE is one-way (server to client) and simpler to implement.",
          why: "SSE is simpler than WebSockets for one-way server-to-client communication. It works over HTTP, doesn't require special protocols, and automatically reconnects. Good for live updates, notifications, and real-time feeds.",
          how: "Set headers: Content-Type: text/event-stream, Cache-Control: no-cache, Connection: keep-alive. Send data: res.write('data: message\\n\\n'). Keep connection open. Client uses EventSource API.",
          keyPoints: [
            "One-way server-to-client",
            "Works over HTTP",
            "Automatic reconnection",
            "Simpler than WebSockets",
            "Good for live updates"
          ],
          interviewQuestions: [
            {
              question: "What are Server-Sent Events and when to use them?",
              answer: "Server-Sent Events (SSE) allow servers to push data to clients over HTTP. Set headers: Content-Type: text/event-stream, Cache-Control: no-cache, Connection: keep-alive. Send data with res.write('data: message\\n\\n'). Client uses EventSource API. SSE is one-way (server to client), simpler than WebSockets, works over HTTP, and automatically reconnects. Use for live updates, notifications, and real-time feeds when bidirectional communication isn't needed."
            }
          ]
        }}
      >
        <CodeExample
          title="Server-Sent Events"
          description="Implementing SSE"
          code={`// Server
const express = require('express');
const app = express();

app.get('/events', (req, res) => {
  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Send initial connection message
  res.write('data: Connected\\n\\n');
  
  // Send periodic updates
  const interval = setInterval(() => {
    const data = {
      time: new Date().toISOString(),
      message: 'Update'
    };
    res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);
  }, 1000);
  
  // Cleanup on client disconnect
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

app.listen(3000);

// Client (browser)
const eventSource = new EventSource('/events');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

eventSource.onerror = (error) => {
  console.error('SSE error:', error);
  eventSource.close();
};

// Client (Node.js)
const EventSource = require('eventsource');

const eventSource = new EventSource('http://localhost:3000/events');

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};`}
        />
      </ConceptCard>

      <ConceptCard
        id="87"
        number={87}
        title="GraphQL"
        theory={{
          what: "GraphQL is a query language and runtime for APIs. It allows clients to request exactly the data they need. Unlike REST, GraphQL uses a single endpoint and clients specify what fields to fetch.",
          why: "GraphQL reduces over-fetching (getting unnecessary data) and under-fetching (needing multiple requests). It provides a single endpoint, strong typing, and enables clients to request exactly what they need.",
          how: "Use Apollo Server or GraphQL.js. Define schema with types, queries, and mutations. Create resolvers to fetch data. Install: npm install apollo-server-express graphql. Use GraphQL Playground for testing.",
          keyPoints: [
            "Query language for APIs",
            "Single endpoint",
            "Clients specify fields",
            "Reduces over/under-fetching",
            "Strong typing"
          ],
          interviewQuestions: [
            {
              question: "What is GraphQL and how do you implement it?",
              answer: "GraphQL is a query language for APIs. Use Apollo Server or GraphQL.js. Define schema with types, queries (read), and mutations (write). Create resolvers to fetch data. Clients request exactly the fields they need. GraphQL reduces over-fetching and under-fetching, provides a single endpoint, and has strong typing. Use GraphQL Playground for testing. It's an alternative to REST APIs."
            }
          ]
        }}
      >
        <CodeExample
          title="GraphQL"
          description="Implementing GraphQL API"
          code={`const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

// Define schema
const typeDefs = gql\`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }
  
  type Post {
    id: ID!
    title: String!
    author: User!
  }
  
  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
  }
  
  type Mutation {
    createUser(name: String!, email: String!): User!
    createPost(title: String!, authorId: ID!): Post!
  }
\`;

// Resolvers
const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
    posts: async () => await Post.find()
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      return await User.create({ name, email });
    },
    createPost: async (_, { title, authorId }) => {
      return await Post.create({ title, authorId });
    }
  },
  User: {
    posts: async (user) => await Post.find({ authorId: user.id })
  },
  Post: {
    author: async (post) => await User.findById(post.authorId)
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log('GraphQL server running on http://localhost:4000/graphql');
});

// Query example
// {
//   users {
//     id
//     name
//     email
//     posts {
//       id
//       title
//     }
//   }
// }`}
        />
      </ConceptCard>

      <ConceptCard
        id="88"
        number={88}
        title="Serverless Functions"
        theory={{
          what: "Serverless functions are code that runs in response to events without managing servers. They're stateless, auto-scale, and you pay only for execution time. Examples: AWS Lambda, Vercel Functions, Netlify Functions.",
          why: "Serverless functions eliminate server management, auto-scale, and reduce costs (pay per use). They're great for APIs, scheduled tasks, and event-driven applications. They simplify deployment.",
          how: "Deploy functions to serverless platforms (AWS Lambda, Vercel, Netlify). Functions are triggered by HTTP requests, events, or schedules. Export handler function. Use serverless frameworks: Serverless Framework, AWS SAM.",
          keyPoints: [
            "No server management",
            "Auto-scaling",
            "Pay per execution",
            "Event-driven",
            "Stateless functions"
          ],
          interviewQuestions: [
            {
              question: "What are serverless functions and how do you use them?",
              answer: "Serverless functions run code in response to events without managing servers. Deploy to platforms like AWS Lambda, Vercel, or Netlify. Functions are triggered by HTTP requests, events, or schedules. Export handler function that receives event and context. They auto-scale, are stateless, and you pay only for execution time. Use serverless frameworks (Serverless Framework, AWS SAM) for easier deployment. Great for APIs, scheduled tasks, and event-driven applications."
            }
          ]
        }}
      >
        <CodeExample
          title="Serverless Functions"
          description="Creating serverless functions"
          code={`// AWS Lambda (Node.js)
exports.handler = async (event, context) => {
  const { name } = JSON.parse(event.body);
  
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: \`Hello \${name}!\`
    })
  };
};

// Vercel Function
// api/hello.js
export default function handler(req, res) {
  const { name } = req.query;
  
  res.status(200).json({
    message: \`Hello \${name}!\`
  });
}

// Netlify Function
// netlify/functions/hello.js
exports.handler = async (event, context) => {
  const { name } = event.queryStringParameters;
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: \`Hello \${name}!\`
    })
  };
};

// Serverless Framework
// serverless.yml
service: my-service

provider:
  name: aws
  runtime: nodejs18.x

functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: hello
          method: get`}
        />
      </ConceptCard>
    </div>
  );
}

// Helper component for concept cards
interface ConceptCardProps {
  id?: string;
  number: number;
  title: string;
  description?: string;
  priority?: string;
  children: React.ReactNode;
  theory?: {
    what: string;
    why?: string;
    how?: string;
    keyPoints?: string[];
    interviewQuestions?: Array<{
      question: string;
      answer: string;
    }>;
  };
}

function ConceptCard({
  id,
  number,
  title,
  description,
  priority,
  children,
  theory,
}: ConceptCardProps) {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div 
      id={id ? `concept-${id}` : undefined}
      className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500 w-full max-w-full flex flex-col overflow-hidden scroll-mt-4"
    >
      <div className="flex flex-wrap items-center gap-3 mb-4 w-full">
        <span className="text-2xl font-bold text-blue-500 flex-shrink-0">#{number}</span>
        <h4 className="text-2xl font-bold text-gray-900 break-words flex-1 min-w-0">{title}</h4>
        {priority && (
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold flex-shrink-0">
            {priority}
          </span>
        )}
      </div>
      {description && (
        <p className="text-gray-600 mb-4 break-words w-full">{description}</p>
      )}
      
      {/* Theory Section - Always Visible */}
      {theory && (
        <div className="mb-6">
          <TheorySection {...theory} />
        </div>
      )}
      
      {/* Code Examples - Toggleable - Always show button if children exist */}
      {children && (
        <div className="mt-6 w-full max-w-full overflow-visible">
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md z-10 relative"
            type="button"
          >
            <span className="text-black font-semibold">{showExamples ? "Hide Examples" : "See Examples"}</span>
            <span className="text-xl text-black">{showExamples ? "▲" : "▼"}</span>
          </button>
          {showExamples && (
            <div className="mt-4 w-full max-w-full flex flex-col space-y-4 overflow-hidden">
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

