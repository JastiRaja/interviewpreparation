# Learning Notes: React.js, TypeScript, and Node.js

## Table of Contents
1. [React.js](#reactjs)
2. [TypeScript](#typescript)
3. [Node.js](#nodejs)
4. [Project-Specific Examples](#project-specific-examples)
5. [Common Commands](#common-commands)

---

## React.js

### What is React?
React is a JavaScript library for building user interfaces, particularly web applications. It allows you to create reusable UI components.

### Key Concepts

#### 1. Components
Components are the building blocks of React applications. They are reusable pieces of code that return JSX (JavaScript XML).

**Functional Component (Modern Approach):**
```typescript
// Simple component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Arrow function component
const Welcome = () => {
  return <h1>Hello, World!</h1>;
}

// Component with props
interface WelcomeProps {
  name: string;
}

const Welcome = ({ name }: WelcomeProps) => {
  return <h1>Hello, {name}!</h1>;
}
```

**Example from this project:**
```typescript
export default function CardGrid() {
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      {/* Component content */}
    </div>
  );
}
```

#### 2. JSX (JavaScript XML)
JSX allows you to write HTML-like syntax in JavaScript.

```typescript
// JSX syntax
const element = <h1>Hello, World!</h1>;

// JSX with expressions
const name = "John";
const element = <h1>Hello, {name}!</h1>;

// JSX with attributes
const element = <div className="container" id="main">Content</div>;
```

#### 3. Props (Properties)
Props are how you pass data from parent to child components.

```typescript
interface CardProps {
  title: string;
  description: string;
}

const Card = ({ title, description }: CardProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

// Usage
<Card title="Analytics" description="Track metrics" />
```

#### 4. State Management with Hooks

**useState Hook:**
```typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**useEffect Hook:**
```typescript
import { useEffect, useState } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Runs after component mounts
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty array means run once on mount

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}
```

**Common Hooks:**
- `useState` - Manage component state
- `useEffect` - Handle side effects (API calls, subscriptions)
- `useContext` - Access React context
- `useRef` - Access DOM elements or store mutable values
- `useMemo` - Memoize expensive calculations
- `useCallback` - Memoize functions

#### 5. Event Handling
```typescript
function Button() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

#### 6. Conditional Rendering
```typescript
function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
}
```

#### 7. Lists and Keys
```typescript
const items = ['Apple', 'Banana', 'Orange'];

function FruitList() {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// In this project:
{cards.map((card) => (
  <motion.div key={card.id}>
    {/* card content */}
  </motion.div>
))}
```

### React Best Practices
1. **Component Naming**: Use PascalCase for component names
2. **Props Interface**: Always define TypeScript interfaces for props
3. **Keys in Lists**: Always provide unique `key` prop when rendering lists
4. **Component Organization**: Keep components small and focused
5. **State Lifting**: Lift state up to the nearest common ancestor when needed

---

## TypeScript

### What is TypeScript?
TypeScript is a superset of JavaScript that adds static type checking. It helps catch errors during development.

### Basic Types

```typescript
// Primitive types
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
let data: null = null;
let value: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["John", "Jane"];

// Objects
let person: { name: string; age: number } = {
  name: "John",
  age: 30
};
```

### Interfaces
Interfaces define the shape of objects.

```typescript
// Basic interface
interface User {
  id: number;
  name: string;
  email: string;
}

// Interface with optional properties
interface User {
  id: number;
  name: string;
  email?: string; // Optional
}

// Interface with readonly properties
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

// Example from this project:
const cards = [
  {
    id: 1,
    title: "Analytics",
    description: "Track your metrics...",
  },
  // ...
];
```

### Type Aliases
```typescript
type ID = number | string;
type Status = "pending" | "approved" | "rejected";

interface User {
  id: ID;
  status: Status;
}
```

### Functions
```typescript
// Function with typed parameters and return
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Function with optional parameter
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : name;
}

// Function with default parameter
function createUser(name: string, age: number = 18): User {
  return { name, age };
}
```

### Generics
Generics allow you to create reusable components.

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Generic interface
interface Box<T> {
  value: T;
}

const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };
```

### Union and Intersection Types
```typescript
// Union type (either/or)
type ID = string | number;

// Intersection type (both)
type Employee = Person & {
  employeeId: number;
  department: string;
};
```

### Type Assertions
```typescript
let value: unknown = "hello";
let str: string = value as string;
```

### Enums
```typescript
enum Status {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected"
}

// Usage
let currentStatus: Status = Status.Pending;
```

### TypeScript Best Practices
1. **Always use types**: Avoid `any` type when possible
2. **Define interfaces**: Use interfaces for object shapes
3. **Use strict mode**: Enable strict type checking in `tsconfig.json`
4. **Type inference**: Let TypeScript infer types when obvious
5. **Readonly**: Use `readonly` for immutable properties

---

## Node.js

### What is Node.js?
Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows you to run JavaScript on the server-side.

### Key Concepts

#### 1. Package Management with npm
npm (Node Package Manager) is used to install and manage dependencies.

**Common npm Commands:**
```bash
# Initialize a new project
npm init

# Install a package
npm install package-name

# Install as dev dependency
npm install -D package-name

# Install all dependencies from package.json
npm install

# Uninstall a package
npm uninstall package-name

# Update a package
npm update package-name

# Run scripts defined in package.json
npm run script-name

# Check outdated packages
npm outdated

# View package information
npm info package-name
```

#### 2. package.json
The `package.json` file contains project metadata and dependencies.

**Structure:**
```json
{
  "name": "project-name",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^19.2.0"
  },
  "devDependencies": {
    "typescript": "^5.9.3"
  }
}
```

**In this project:**
- `dependencies`: Packages needed for production (React, framer-motion)
- `devDependencies`: Packages needed only for development (TypeScript, ESLint, Vite)

#### 3. Modules (ES Modules)
Modern JavaScript uses ES modules for importing/exporting.

```javascript
// Export
export const myFunction = () => { /* ... */ };
export default myComponent;

// Import
import myFunction from './myFile';
import { myFunction } from './myFile';
```

**In this project:**
```typescript
// App.tsx
import { motion } from "framer-motion";
export default function CardGrid() { /* ... */ }

// main.tsx
import App from './App.tsx';
```

#### 4. Node.js Built-in Modules
```javascript
// File System
import fs from 'fs';
import path from 'path';

// HTTP Server
import http from 'http';

// Utilities
import { promisify } from 'util';
```

#### 5. Environment Variables
```bash
# Create .env file
NODE_ENV=development
API_URL=http://localhost:3000
```

```typescript
// Access in code (with dotenv package)
import dotenv from 'dotenv';
dotenv.config();

const apiUrl = process.env.API_URL;
```

### Node.js Best Practices
1. **Use ES Modules**: Prefer `import/export` over `require/module.exports`
2. **Environment Variables**: Never commit `.env` files
3. **Error Handling**: Always handle errors in async operations
4. **Package Management**: Keep dependencies updated
5. **Scripts**: Use npm scripts for common tasks

---

## Project-Specific Examples

### Current Project Structure

```
interviewpreparation/
├── src/
│   ├── App.tsx          # Main component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── package.json          # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── tailwind.config.js   # Tailwind CSS configuration
```

### Example: App.tsx Breakdown

```typescript
// 1. Import statement
import { motion } from "framer-motion";

// 2. TypeScript interface (implicit)
const cards = [
  {
    id: number,      // TypeScript infers number
    title: string,   // TypeScript infers string
    description: string
  }
];

// 3. React functional component
export default function CardGrid() {
  // 4. JSX return
  return (
    <div className="...">
      {/* 5. Array mapping with keys */}
      {cards.map((card) => (
        <motion.div key={card.id}>
          {/* 6. JSX expressions */}
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
```

### Key Technologies Used

1. **React 19**: Latest React version with improved features
2. **TypeScript**: Type-safe JavaScript
3. **Vite**: Fast build tool and dev server
4. **Tailwind CSS**: Utility-first CSS framework
5. **Framer Motion**: Animation library for React

---

## Common Commands

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Package Management

```bash
# Install all dependencies
npm install

# Add a new dependency
npm install package-name

# Add a dev dependency
npm install -D package-name

# Remove a package
npm uninstall package-name

# Update packages
npm update
```

### TypeScript Commands

```bash
# Type check without building
npx tsc --noEmit

# Build TypeScript
npx tsc

# Watch mode
npx tsc --watch
```

### Git Commands (Bonus)

```bash
# Initialize git repository
git init

# Add files
git add .

# Commit changes
git commit -m "Your message"

# Check status
git status

# View history
git log
```

---

## Learning Path

### Beginner
1. Learn JavaScript fundamentals
2. Understand React components and JSX
3. Learn basic TypeScript types
4. Understand npm and package.json

### Intermediate
1. React Hooks (useState, useEffect)
2. TypeScript interfaces and types
3. Component composition
4. State management patterns

### Advanced
1. Custom hooks
2. TypeScript generics and advanced types
3. Performance optimization
4. Testing (Jest, React Testing Library)

---

## Resources

### Official Documentation
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

### Practice
- Try modifying `App.tsx` to add new features
- Create new components
- Experiment with different TypeScript types
- Add new npm packages and explore them

---

## Quick Reference

### React Component Template
```typescript
import React from 'react';

interface ComponentProps {
  // Define props here
}

const Component = ({ /* props */ }: ComponentProps) => {
  return (
    <div>
      {/* Component content */}
    </div>
  );
};

export default Component;
```

### TypeScript Interface Template
```typescript
interface Entity {
  id: number;
  name: string;
  createdAt: Date;
}
```

### npm Script Template
```json
{
  "scripts": {
    "dev": "development command",
    "build": "build command",
    "test": "test command"
  }
}
```

---

**Happy Learning! 🚀**

