/** Sidebar metadata for Node.js module — titles match ConceptCards in NodeJSModule.tsx */
const c = (id: number, title: string) => ({
  id: String(id),
  title,
  number: id,
});

const concepts1 = [
  c(1, "What is Node.js"),
  c(2, "Node.js Architecture"),
  c(3, "Single-threaded Model"),
  c(4, "Event Loop"),
  c(5, "Non-blocking I/O"),
  c(6, "V8 JavaScript Engine"),
  c(7, "REPL"),
];

const concepts2 = [
  c(8, "CommonJS (require, module.exports)"),
  c(9, "ES Modules (import, export)"),
  c(10, "Built-in Modules - fs"),
  c(11, "Built-in Modules - path"),
  c(12, "Built-in Modules - os"),
  c(13, "Built-in Modules - http"),
  c(14, "Built-in Modules - events"),
  c(15, "Third-party Modules & Package Managers"),
  c(16, "package.json & package-lock.json"),
];

const concepts3 = [
  c(17, "HTTP Module"),
  c(18, "Creating Web Servers"),
  c(19, "Request & Response Objects"),
  c(20, "REST APIs"),
  c(21, "Status Codes"),
  c(22, "Headers"),
  c(23, "CORS"),
];

const concepts4 = [
  c(24, "Callbacks"),
  c(25, "Promises"),
  c(26, "Async / Await"),
  c(27, "Error Handling (try/catch)"),
  c(28, "Async Patterns"),
  c(29, "Async Best Practices"),
];

const concepts5 = [
  c(30, "File System (fs) - Synchronous vs Asynchronous"),
  c(31, "Streams - Readable"),
  c(32, "Streams - Writable"),
  c(33, "Streams - Duplex"),
  c(34, "Streams - Transform"),
  c(35, "Buffers"),
  c(36, "Pipes"),
];

const concepts6 = [c(37, "Events Module"), c(38, "Event Emitters"), c(39, "Custom Events")];

const concepts7 = [
  c(40, "Express Basics"),
  c(41, "Routing"),
  c(42, "Middleware"),
  c(43, "Error-handling Middleware"),
  c(44, "Request Lifecycle"),
  c(45, "MVC Pattern"),
];

const concepts8 = [
  c(46, "MongoDB with Node"),
  c(47, "SQL Databases (PostgreSQL, MySQL)"),
  c(48, "ORM / ODM"),
  c(49, "Mongoose"),
  c(50, "Prisma"),
  c(51, "Sequelize"),
  c(52, "Connection Pooling"),
];

const concepts9 = [
  c(53, "JWT Authentication"),
  c(54, "Sessions & Cookies"),
  c(55, "Password Hashing (bcrypt)"),
  c(56, "OAuth"),
  c(57, "Environment Variables"),
  c(58, "Helmet"),
  c(59, "Rate Limiting"),
];

const concepts10 = [
  c(60, "Unit Testing"),
  c(61, "Integration Testing"),
  c(62, "Jest / Mocha"),
  c(63, "Supertest"),
  c(64, "Debugging Node Apps"),
  c(65, "Logging"),
];

const concepts11 = [
  c(66, "Clustering"),
  c(67, "Worker Threads"),
  c(68, "Load Balancing"),
  c(69, "Caching (Redis)"),
  c(70, "Compression"),
  c(71, "Memory Management"),
  c(72, "Performance Optimization"),
];

const concepts12 = [
  c(73, "Environment Configurations"),
  c(74, "Process Managers (PM2)"),
  c(75, "Docker with Node"),
  c(76, "CI/CD"),
  c(77, "Deployment Strategies"),
];

const concepts13 = [
  c(78, "Project Structure"),
  c(79, "Separation of Concerns"),
  c(80, "Service Layer Pattern"),
  c(81, "Dependency Injection"),
  c(82, "Clean Code Practices"),
];

const concepts14 = [
  c(83, "Microservices"),
  c(84, "Message Queues (RabbitMQ, Kafka)"),
  c(85, "WebSockets"),
  c(86, "Server-Sent Events"),
  c(87, "GraphQL"),
  c(88, "Serverless Functions"),
];

export const nodeJsSections = [
  { id: "core", title: "Core Fundamentals", icon: "🔰", count: "1-7", concepts: concepts1 },
  { id: "modules", title: "Modules & Packages", icon: "📦", count: "8-16", concepts: concepts2 },
  { id: "web", title: "Web & Networking", icon: "🌐", count: "17-23", concepts: concepts3 },
  { id: "async", title: "Async Programming", icon: "⚡", count: "24-29", concepts: concepts4 },
  { id: "filesystem", title: "File System & Streams", icon: "📁", count: "30-36", concepts: concepts5 },
  { id: "events", title: "Event-Driven Architecture", icon: "🧠", count: "37-39", concepts: concepts6 },
  { id: "express", title: "Express.js", icon: "🚀", count: "40-45", concepts: concepts7 },
  { id: "databases", title: "Databases", icon: "🗄️", count: "46-52", concepts: concepts8 },
  { id: "security", title: "Authentication & Security", icon: "🔐", count: "53-59", concepts: concepts9 },
  { id: "testing", title: "Testing & Debugging", icon: "🧪", count: "60-65", concepts: concepts10 },
  { id: "performance", title: "Performance & Scalability", icon: "⚙️", count: "66-72", concepts: concepts11 },
  { id: "devops", title: "DevOps & Deployment", icon: "🐳", count: "73-77", concepts: concepts12 },
  { id: "architecture", title: "Architecture & Best Practices", icon: "🧱", count: "78-82", concepts: concepts13 },
  { id: "advanced", title: "Advanced Node.js Concepts", icon: "🌍", count: "83-88", concepts: concepts14 },
] as const;
