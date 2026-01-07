# Quick Reference Guide

## React.js Quick Reference

### Component Syntax
```typescript
// Functional Component
const Component = () => <div>Hello</div>;

// With Props
interface Props {
  name: string;
}
const Component = ({ name }: Props) => <div>Hello {name}</div>;

// Export
export default Component;
```

### Common Hooks
```typescript
// useState
const [state, setState] = useState(initialValue);

// useEffect
useEffect(() => {
  // Side effect
}, [dependencies]);

// useContext
const value = useContext(MyContext);
```

### Event Handling
```typescript
<button onClick={() => handleClick()}>Click</button>
<input onChange={(e) => setValue(e.target.value)} />
```

### Conditional Rendering
```typescript
{condition && <Component />}
{condition ? <True /> : <False />}
```

### Lists
```typescript
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

---

## TypeScript Quick Reference

### Basic Types
```typescript
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let arr: number[] = [1, 2, 3];
let obj: { name: string } = { name: "John" };
```

### Interfaces
```typescript
interface User {
  id: number;
  name: string;
  email?: string; // Optional
  readonly createdAt: Date; // Readonly
}
```

### Functions
```typescript
function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => a * b;
```

### Union Types
```typescript
type ID = string | number;
type Status = "pending" | "approved" | "rejected";
```

---

## Node.js / npm Quick Reference

### Essential Commands
```bash
npm install              # Install dependencies
npm install package      # Add package
npm install -D package   # Add dev dependency
npm uninstall package    # Remove package
npm run script           # Run npm script
npm update               # Update packages
```

### Project Scripts (from package.json)
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Vite Commands

```bash
npm run dev      # Start dev server (usually http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## TypeScript Commands

```bash
npx tsc              # Compile TypeScript
npx tsc --noEmit     # Type check only
npx tsc --watch      # Watch mode
```

---

## Common File Extensions

- `.ts` - TypeScript file
- `.tsx` - TypeScript + JSX (React components)
- `.js` - JavaScript file
- `.jsx` - JavaScript + JSX
- `.json` - JSON file
- `.css` - CSS file

---

## Import/Export Patterns

```typescript
// Default export
export default Component;
import Component from './Component';

// Named export
export const myFunction = () => {};
import { myFunction } from './utils';

// Multiple named exports
export { Component1, Component2 };
import { Component1, Component2 } from './components';
```

---

## Tailwind CSS Classes (Used in Project)

```typescript
// Layout
className="flex items-center justify-center"
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"

// Spacing
className="p-8 m-4 gap-6"

// Colors
className="bg-white text-gray-900"

// Effects
className="rounded-2xl shadow-md hover:shadow-lg"

// Responsive
className="sm:grid-cols-2 lg:grid-cols-4"
```

---

## Common Patterns

### React Component with State
```typescript
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};
```

### TypeScript Interface for Props
```typescript
interface CardProps {
  id: number;
  title: string;
  description: string;
  onClick?: () => void;
}

const Card = ({ id, title, description, onClick }: CardProps) => {
  return <div onClick={onClick}>{title}</div>;
};
```

### Array Operations
```typescript
// Map
const doubled = numbers.map(n => n * 2);

// Filter
const evens = numbers.filter(n => n % 2 === 0);

// Find
const item = items.find(item => item.id === 1);
```

---

## Debugging Tips

### Console Logging
```typescript
console.log('Value:', value);
console.table(array);
console.error('Error:', error);
```

### React DevTools
- Install React DevTools browser extension
- Inspect component tree and props

### TypeScript Errors
- Read error messages carefully
- Check type definitions
- Use `as` for type assertions when needed

---

## File Structure Convention

```
src/
├── components/     # Reusable components
├── pages/          # Page components
├── hooks/          # Custom hooks
├── utils/          # Utility functions
├── types/          # TypeScript types/interfaces
└── App.tsx         # Main app component
```

---

**Keep this file handy for quick lookups! 📚**

