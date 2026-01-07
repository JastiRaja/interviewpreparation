import { useState } from "react";
import CodeExample from "./CodeExample";
import InteractiveCounter from "./InteractiveCounter";
import TheorySection from "./TheorySection";

export default function ReactModule() {
  const [activeSection, setActiveSection] = useState("core");

  const sections = [
    { id: "core", title: "Core/Beginner", icon: "🔰", count: "1-7" },
    { id: "hooks", title: "Hooks", icon: "🪝", count: "8-15" },
    { id: "dataflow", title: "Data Flow", icon: "🧠", count: "16-20" },
    { id: "styling", title: "Styling", icon: "🎨", count: "21-25" },
    { id: "routing", title: "Routing", icon: "🌐", count: "26" },
    { id: "state", title: "State Management", icon: "📦", count: "27-30" },
    { id: "effects", title: "Side Effects", icon: "🔄", count: "31-35" },
    { id: "performance", title: "Performance", icon: "🚀", count: "36-41" },
    { id: "testing", title: "Testing", icon: "🧪", count: "42-44" },
    { id: "advanced", title: "Advanced", icon: "🧱", count: "45-50" },
    { id: "tooling", title: "Tooling", icon: "🛠️", count: "51-55" },
    { id: "architecture", title: "Architecture", icon: "🏗️", count: "56-60" },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "core":
        return <CoreConcepts />;
      case "hooks":
        return <HooksConcepts />;
      case "dataflow":
        return <DataFlowConcepts />;
      case "styling":
        return <StylingConcepts />;
      case "routing":
        return <RoutingConcepts />;
      case "state":
        return <StateManagementConcepts />;
      case "effects":
        return <SideEffectsConcepts />;
      case "performance":
        return <PerformanceConcepts />;
      case "testing":
        return <TestingConcepts />;
      case "advanced":
        return <AdvancedConcepts />;
      case "tooling":
        return <ToolingConcepts />;
      case "architecture":
        return <ArchitectureConcepts />;
      default:
        return <CoreConcepts />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl font-bold mb-2 text-gray-900">
          React.js - Complete Guide
        </h2>
        <p className="text-gray-600">
          Master all 60 React concepts from basics to advanced
        </p>
      </div>

      {/* Section Tabs - Scrollable */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 border-b border-gray-200 min-w-max pb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 font-semibold transition-colors border-b-2 whitespace-nowrap ${
                activeSection === section.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.title}
              <span className="ml-2 text-xs opacity-75">
                ({section.count})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">{renderContent()}</div>
    </div>
  );
}

// ========== CORE/BEGINNER CONCEPTS (1-7) ==========
function CoreConcepts() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">🔰 Core/Beginner Concepts</h3>
        <p className="text-blue-100">
          Master the fundamentals that every React developer must know
        </p>
      </div>

      {/* 1. Components */}
      <ConceptCard
        number={1}
        title="Components"
        description="Building blocks of React applications"
        priority="🔥"
        theory={{
          what: "Components are independent, reusable pieces of UI that encapsulate both structure and behavior. They are the fundamental building blocks of React applications, allowing you to break complex UIs into smaller, manageable pieces.",
          why: "Components promote code reusability, maintainability, and testability. They enable you to build complex applications by composing simple, focused pieces. Each component manages its own state and can be developed, tested, and debugged independently.",
          how: "React components are JavaScript functions that return JSX. When you use a component (e.g., <Button />), React calls the function, processes the returned JSX, and renders it to the DOM. Components can receive data via props and maintain internal state using hooks.",
          keyPoints: [
            "Components are functions that return JSX",
            "They can be functional (modern) or class-based (legacy)",
            "Components should be pure functions when possible (same input = same output)",
            "Component names must start with uppercase letter",
            "Components can be composed together to build complex UIs",
            "Each component should have a single responsibility"
          ],
          interviewQuestions: [
            {
              question: "What is a React component?",
              answer: "A React component is a reusable piece of code that returns JSX to describe what should appear on the screen. Components can be functional (functions) or class-based (classes). Functional components are the modern standard and use hooks for state and lifecycle management."
            },
            {
              question: "What's the difference between functional and class components?",
              answer: "Functional components are JavaScript functions that return JSX and use hooks for state/lifecycle. Class components are ES6 classes that extend React.Component and use this.state and lifecycle methods. Functional components are preferred because they're simpler, have better performance, and work better with hooks."
            },
            {
              question: "What is component composition?",
              answer: "Component composition is the practice of building complex UIs by combining smaller, simpler components. Instead of creating one large component, you break it down into smaller pieces that each handle a specific part of the UI. This makes code more maintainable, reusable, and easier to test."
            }
          ]
        }}
      >
        <CodeExample
          title="Functional Components"
          description="Modern React uses functional components"
          code={`// Simple functional component
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Arrow function component
const Welcome = () => {
  return <h1>Hello, World!</h1>;
}

// Component with TypeScript
interface WelcomeProps {
  name: string;
}

const Welcome = ({ name }: WelcomeProps) => {
  return <h1>Hello, {name}!</h1>;
}`}
        />
        <CodeExample
          title="Component Composition"
          description="Build complex UIs from simple components"
          code={`// Small, reusable components
function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return <button onClick={onClick}>{label}</button>;
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// Compose them together
function App() {
  return (
    <Card title="Welcome">
      <Button label="Click Me" onClick={() => alert('Clicked!')} />
    </Card>
  );
}`}
        />
      </ConceptCard>

      {/* 2. JSX */}
      <ConceptCard
        number={2}
        title="JSX"
        description="JavaScript + HTML syntax"
        priority="🔥"
        theory={{
          what: "JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript. It's not HTML - it's a syntax that gets transpiled to React.createElement() calls.",
          why: "JSX makes React code more readable and intuitive. It allows developers to write UI code that looks similar to HTML, making it easier to visualize the component structure. It also provides compile-time error checking.",
          how: "JSX is transpiled by Babel (or similar tools) into React.createElement() calls. For example, <div>Hello</div> becomes React.createElement('div', null, 'Hello'). JSX expressions are evaluated, and you can embed JavaScript expressions using curly braces {}.",
          keyPoints: [
            "JSX is syntactic sugar for React.createElement()",
            "Must return a single root element (or use fragments)",
            "Use className instead of class, htmlFor instead of for",
            "JavaScript expressions go in curly braces {}",
            "JSX prevents injection attacks by escaping values",
            "Self-closing tags must end with />"
          ],
          interviewQuestions: [
            {
              question: "What is JSX?",
              answer: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in JavaScript. It's transpiled to React.createElement() calls. JSX makes React code more readable and provides compile-time error checking."
            },
            {
              question: "Can you use JavaScript expressions in JSX?",
              answer: "Yes, you can embed any valid JavaScript expression in JSX using curly braces {}. This includes variables, function calls, ternary operators, and map() for lists. However, you cannot use statements like if/else or for loops directly - you need to use expressions."
            },
            {
              question: "What's the difference between JSX and HTML?",
              answer: "JSX looks like HTML but has key differences: use className instead of class, htmlFor instead of for, camelCase for event handlers (onClick not onclick), and it must return a single root element or use fragments. JSX is also transpiled to JavaScript, while HTML is markup."
            }
          ]
        }}
      >
        <CodeExample
          title="JSX Basics"
          description="JSX allows you to write HTML-like syntax in JavaScript"
          code={`// JSX with expressions
const name = "John";
const element = <h1>Hello, {name}!</h1>;

// JSX with attributes (use className, not class)
const button = (
  <button className="btn" onClick={handleClick}>
    Click Me
  </button>
);

// JSX must return a single element (use fragments)
const element = (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);

// Or wrap in a div
const element = (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
);`}
        />
        <CodeExample
          title="JSX Expressions"
          description="Embed JavaScript expressions in JSX"
          code={`function UserProfile({ user }: { user: { name: string; age: number } }) {
  const isAdult = user.age >= 18;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
      <p>Status: {isAdult ? 'Adult' : 'Minor'}</p>
      <p>Next year: {user.age + 1}</p>
      <p>Uppercase: {user.name.toUpperCase()}</p>
    </div>
  );
}`}
        />
      </ConceptCard>

      {/* 3. Props */}
      <ConceptCard
        number={3}
        title="Props"
        description="Passing data to components"
        priority="🔥"
        theory={{
          what: "Props (short for properties) are read-only data passed from parent components to child components. They allow components to be reusable and configurable by accepting different data.",
          why: "Props enable component reusability and data flow in React. They allow parent components to pass data down to children, creating a unidirectional data flow. Props are immutable, which helps prevent bugs and makes components predictable.",
          how: "Props are passed as attributes to JSX elements. Inside the component, they're received as function parameters. Props are read-only - you cannot modify them. If you need to change data, it should be managed by the parent component's state.",
          keyPoints: [
            "Props are read-only (immutable)",
            "Data flows down from parent to child via props",
            "Props can be any JavaScript value (strings, numbers, objects, functions)",
            "Use TypeScript interfaces to type props",
            "Never modify props directly",
            "Default props can be set using default parameters"
          ],
          interviewQuestions: [
            {
              question: "What are props in React?",
              answer: "Props are read-only data passed from parent components to child components. They allow components to be reusable and configurable. Props are immutable - you cannot modify them inside the child component. If data needs to change, it should be managed by the parent's state."
            },
            {
              question: "Can you modify props in a component?",
              answer: "No, props are read-only and should never be modified. React enforces this to maintain unidirectional data flow and prevent bugs. If you need to change data, it should be managed by the parent component's state, and the parent should pass down a callback function to update that state."
            },
            {
              question: "What's the difference between props and state?",
              answer: "Props are data passed from parent to child (downward flow) and are immutable. State is data managed within a component and can be changed using setState or useState. Props are for configuration, state is for interactivity. When state changes, the component re-renders."
            }
          ]
        }}
      >
        <CodeExample
          title="Props Basics"
          description="Props are read-only and passed from parent to child"
          code={`// Define props interface
interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

// Component receives props
function Card({ title, description, onClick }: CardProps) {
  return (
    <div onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Usage - passing props
function App() {
  return (
    <Card 
      title="React Learning" 
      description="Learn React fundamentals"
      onClick={() => console.log('Clicked')}
    />
  );
}

// Props are read-only - DON'T modify them
function BadComponent({ count }: { count: number }) {
  count++; // ❌ ERROR! Props are immutable
  return <div>{count}</div>;
}`}
        />
        <CodeExample
          title="Default Props & Children"
          description="Using default values and children prop"
          code={`interface ButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
}

function Button({ 
  label, 
  variant = 'primary',
  children 
}: ButtonProps) {
  return (
    <button className={\`btn btn-\${variant}\`}>
      {children || label}
    </button>
  );
}

// Usage
<Button label="Click Me" />
<Button variant="secondary">Click Me</Button>
<Button>
  <span>Custom Content</span>
</Button>`}
        />
      </ConceptCard>

      {/* 4. State */}
      <ConceptCard
        number={4}
        title="State"
        description="Component state management"
        priority="🔥"
        theory={{
          what: "State is data that belongs to a component and can change over time. When state changes, React re-renders the component to reflect the new state. State makes components interactive and dynamic.",
          why: "State enables components to be interactive. Without state, components would be static. State allows components to respond to user input, API responses, and other events. It's the source of truth for component data that can change.",
          how: "In functional components, state is managed using the useState hook. When you call setState (or the setter from useState), React schedules a re-render. React batches state updates for performance. State updates are asynchronous - the state doesn't change immediately after calling setState.",
          keyPoints: [
            "State is component-specific data that can change",
            "State changes trigger re-renders",
            "State updates are asynchronous and batched",
            "Never mutate state directly - always use setState",
            "State should be lifted up when multiple components need it",
            "Keep state as minimal as possible"
          ],
          interviewQuestions: [
            {
              question: "What is state in React?",
              answer: "State is data that belongs to a component and can change over time. When state changes, React re-renders the component. State makes components interactive and dynamic. In functional components, state is managed using the useState hook."
            },
            {
              question: "What happens when you call setState?",
              answer: "When you call setState (or the setter from useState), React schedules a re-render. The state update is asynchronous - the state doesn't change immediately. React batches multiple setState calls for performance. After the state updates, React re-renders the component and its children if needed."
            },
            {
              question: "Can you update state directly?",
              answer: "No, you should never mutate state directly. Always use setState or the setter function from useState. Direct mutation won't trigger a re-render and can cause bugs. For objects and arrays, create new copies using spread operators or methods like map/filter."
            }
          ]
        }}
      >
        <CodeExample
          title="useState Hook"
          description="Manage component state with useState"
          code={`import { useState } from 'react';

function Counter() {
  // State declaration
  const [count, setCount] = useState(0);
  
  // State can be any type
  const [name, setName] = useState('');
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [items, setItems] = useState<string[]>([]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`}
        />
        <InteractiveCounter />
        <CodeExample
          title="State Updates"
          description="Important patterns for state updates"
          code={`function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState('');

  // ✅ Correct: Functional update for previous state
  const increment = () => {
    setCount(prev => prev + 1);
  };

  // ✅ Correct: Spread operator for arrays
  const addTodo = () => {
    setTodos([...todos, input]);
  };

  // ✅ Correct: Spread operator for objects
  const [user, setUser] = useState({ name: '', age: 0 });
  const updateName = (name: string) => {
    setUser({ ...user, name });
  };

  // ❌ Wrong: Mutating state directly
  const badAddTodo = () => {
    todos.push(input); // Don't do this!
    setTodos(todos);
  };
}`}
        />
      </ConceptCard>

      {/* 5. Events */}
      <ConceptCard
        number={5}
        title="Events"
        description="Handling user interactions"
        priority="🔥"
        theory={{
          what: "Events in React are handled using event handlers (functions) passed as props. React uses SyntheticEvents, a wrapper around native browser events that provides consistent behavior across browsers.",
          why: "Event handling enables interactivity in React applications. SyntheticEvents normalize browser differences, improve performance through event delegation, and provide a consistent API. Event handlers allow components to respond to user actions like clicks, form submissions, and keyboard input.",
          how: "Pass event handler functions as props (onClick, onChange, onSubmit, etc.). Use arrow functions or bind methods. Access event data via the event parameter. Prevent default behavior with e.preventDefault(). Stop propagation with e.stopPropagation(). Use TypeScript event types for type safety.",
          keyPoints: [
            "Use event handler props (onClick, onChange, etc.)",
            "React uses SyntheticEvents (normalized events)",
            "Access event data via event parameter",
            "Use e.preventDefault() to prevent default behavior",
            "TypeScript provides event types for type safety"
          ],
          interviewQuestions: [
            {
              question: "How do you handle events in React?",
              answer: "Pass event handler functions as props like onClick, onChange, onSubmit. React uses SyntheticEvents (wrapper around native events) for consistency. Access event data via the event parameter. Use e.preventDefault() to prevent default behavior, e.stopPropagation() to stop bubbling. Use TypeScript event types (React.MouseEvent, React.ChangeEvent) for type safety. Event handlers can be inline arrow functions or defined separately."
            }
          ]
        }}
      >
        <CodeExample
          title="Event Handling"
          description="React uses SyntheticEvents (wrapper around native events)"
          code={`function Button() {
  // Inline handler
  const handleClick = () => {
    console.log('Clicked!');
  };

  // With event parameter
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  // With parameters
  const handleDelete = (id: number) => {
    console.log('Delete', id);
  };

  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <input onChange={handleChange} />
      <button onClick={() => handleDelete(1)}>Delete</button>
    </div>
  );
}`}
        />
        <CodeExample
          title="Common Event Types"
          description="TypeScript event types for common events"
          code={`function Form() {
  // Input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  // Textarea change
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
  };

  // Select change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  // Form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh
    console.log('Form submitted');
  };

  // Mouse events
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Mouse entered');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
      <textarea onChange={handleTextareaChange} />
      <select onChange={handleSelectChange}>
        <option>Option 1</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}`}
        />
      </ConceptCard>

      {/* 6. Conditional Rendering */}
      <ConceptCard
        number={6}
        title="Conditional Rendering"
        description="Render different content based on conditions"
        priority="🔥"
        theory={{
          what: "Conditional rendering allows you to display different UI based on conditions. React supports multiple patterns: if/else statements, ternary operators, logical AND (&&), and early returns.",
          why: "Conditional rendering is essential for dynamic UIs. It enables showing/hiding content, displaying loading states, handling authentication, and creating responsive interfaces. Different patterns suit different use cases.",
          how: "Use if/else for early returns. Use ternary operator (condition ? true : false) for inline conditional rendering. Use logical AND (condition && <Component />) to conditionally render. Use early returns for guard clauses. Combine patterns as needed.",
          keyPoints: [
            "Multiple patterns: if/else, ternary, logical AND",
            "Ternary: condition ? true : false",
            "Logical AND: condition && <Component />",
            "Early returns for guard clauses",
            "Choose pattern based on use case"
          ],
          interviewQuestions: [
            {
              question: "What are the different ways to conditionally render in React?",
              answer: "1) if/else statements for early returns, 2) Ternary operator (condition ? <True /> : <False />) for inline conditional rendering, 3) Logical AND (condition && <Component />) to conditionally render when true, 4) Early returns for guard clauses. Choose based on use case: ternary for two options, logical AND for single option, if/else for complex logic."
            }
          ]
        }}
      >
        <CodeExample
          title="Conditional Rendering Patterns"
          description="Multiple ways to conditionally render in React"
          code={`function UserProfile({ user, isLoggedIn }: { 
  user: { name: string } | null; 
  isLoggedIn: boolean;
}) {
  // 1. if/else statement
  if (!isLoggedIn) {
    return <div>Please log in</div>;
  }

  // 2. Ternary operator
  return (
    <div>
      {isLoggedIn ? <Welcome /> : <Login />}
      {user ? <UserInfo user={user} /> : <Loading />}
    </div>
  );

  // 3. Logical AND (&&)
  return (
    <div>
      {isLoggedIn && <Welcome />}
      {user && <UserInfo user={user} />}
      {items.length > 0 && <ItemList items={items} />}
    </div>
  );

  // 4. Early return
  if (!user) return <Loading />;
  return <UserInfo user={user} />;
}`}
        />
      </ConceptCard>

      {/* 7. Lists & Keys */}
      <ConceptCard
        number={7}
        title="Lists & Keys"
        description="Rendering arrays of data"
        priority="🔥"
        theory={{
          what: "Lists in React are rendered using the map() method. Keys are special attributes that help React identify which items have changed, been added, or removed. Keys should be stable, unique, and predictable.",
          why: "Keys help React efficiently update the UI by tracking which items changed. Without keys, React may re-render all items unnecessarily. Keys enable React to maintain component state correctly when list order changes.",
          how: "Use array.map() to render lists. Provide a unique key prop for each item. Use stable IDs (item.id) as keys when possible. Use index as key only if items don't reorder. Never use random values or array indices for keys if items can be reordered.",
          keyPoints: [
            "Use map() to render arrays",
            "Keys must be unique among siblings",
            "Use stable IDs (item.id) as keys",
            "Index as key only if no reordering",
            "Keys help React track changes efficiently"
          ],
          interviewQuestions: [
            {
              question: "Why are keys important when rendering lists in React?",
              answer: "Keys help React identify which items changed, were added, or removed. They enable efficient updates by tracking items between renders. Keys should be stable, unique, and predictable. Use item IDs as keys when possible. Using index as key is acceptable only if items don't reorder. Without proper keys, React may incorrectly update component state and cause performance issues."
            }
          ]
        }}
      >
        <CodeExample
          title="Rendering Lists"
          description="Always provide a unique key prop when rendering lists"
          code={`interface Item {
  id: number;
  name: string;
}

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul>
      {/* ✅ Good: Use unique ID as key */}
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}

      {/* ⚠️ Acceptable: Use index if no stable ID */}
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}

      {/* ❌ Bad: No key */}
      {items.map((item) => (
        <li>{item.name}</li> // Warning: Missing key
      ))}
    </ul>
  );
}

// Keys help React identify which items changed
// Keys should be stable, unique, and predictable`}
        />
        <CodeExample
          title="Complex List Rendering"
          description="Rendering lists with components"
          code={`interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div>
      <input type="checkbox" checked={todo.completed} />
      <span>{todo.text}</span>
    </div>
  );
}

function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos yet</p>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      )}
    </div>
  );
}`}
        />
      </ConceptCard>
    </div>
  );
}

// ========== HOOKS CONCEPTS (8-15) ==========
function HooksConcepts() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">🪝 Hooks</h3>
        <p className="text-green-100">
          Essential hooks every React developer must master
        </p>
      </div>

      {/* 8. useState */}
      <ConceptCard 
        number={8} 
        title="useState" 
        priority="🔥"
        theory={{
          what: "useState is a React Hook that allows functional components to manage local state. It returns an array with the current state value and a function to update it.",
          why: "useState enables functional components to have state, which was previously only possible with class components. It's the most fundamental hook and is used in almost every React component that needs interactivity.",
          how: "useState takes an initial value (or a function that returns the initial value for lazy initialization). It returns an array: [state, setState]. The setState function can accept a new value or a function that receives the previous state and returns the new state. State updates trigger re-renders.",
          keyPoints: [
            "useState returns [state, setState] array",
            "Initial state can be a value or a function (for expensive computations)",
            "setState can accept a value or a function (prevState => newState)",
            "State updates are batched for performance",
            "Multiple useState calls can be used for different state variables",
            "State is preserved between re-renders"
          ],
          interviewQuestions: [
            {
              question: "What is useState and how does it work?",
              answer: "useState is a React Hook that adds state to functional components. It takes an initial value and returns an array with the current state and a setter function. When you call the setter, React schedules a re-render with the new state. useState preserves state between re-renders."
            },
            {
              question: "What's the difference between passing a value and a function to useState?",
              answer: "Passing a value directly (useState(0)) calculates the initial state on every render (though React only uses it on mount). Passing a function (useState(() => expensiveComputation())) only runs the function once on mount, which is better for expensive calculations."
            },
            {
              question: "When should you use the functional form of setState?",
              answer: "Use the functional form (setCount(prev => prev + 1)) when the new state depends on the previous state, or when you have multiple rapid updates. This ensures you're working with the latest state value and prevents race conditions."
            }
          ]
        }}
      >
        <CodeExample
          title="useState Hook"
          description="Manage component state"
          code={`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  // Lazy initialization
  const [data, setData] = useState(() => {
    // Expensive computation only runs once
    return computeInitialValue();
  });

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}`}
        />
      </ConceptCard>

      {/* 9. useEffect */}
      <ConceptCard 
        number={9} 
        title="useEffect" 
        priority="🔥"
        theory={{
          what: "useEffect is a React Hook that lets you perform side effects in functional components. Side effects include data fetching, subscriptions, manually changing the DOM, and timers.",
          why: "useEffect allows functional components to handle side effects that were previously handled by lifecycle methods in class components. It separates side effects from rendering logic, making components easier to understand and test.",
          how: "useEffect runs after the render is committed to the screen. It takes a function (the effect) and an optional dependency array. If the dependency array is empty, the effect runs once after mount. If it has dependencies, it runs when those dependencies change. The effect can return a cleanup function.",
          keyPoints: [
            "useEffect runs after render",
            "Empty dependency array [] = runs once on mount",
            "No dependency array = runs on every render",
            "Dependencies in array = runs when dependencies change",
            "Return a cleanup function to clean up subscriptions/timers",
            "Effects run after the browser has painted"
          ],
          interviewQuestions: [
            {
              question: "What is useEffect and when do you use it?",
              answer: "useEffect is a Hook for performing side effects in functional components. Use it for API calls, subscriptions, timers, or any operation that needs to happen after render. It replaces componentDidMount, componentDidUpdate, and componentWillUnmount from class components."
            },
            {
              question: "What does the dependency array do in useEffect?",
              answer: "The dependency array controls when the effect runs. Empty array [] means run once on mount. No array means run on every render. Array with values means run when those values change. It's crucial for preventing infinite loops and ensuring effects run at the right time."
            },
            {
              question: "What is the cleanup function in useEffect?",
              answer: "The cleanup function (returned from useEffect) runs before the component unmounts or before the effect runs again. Use it to clean up subscriptions, timers, or event listeners to prevent memory leaks. It's essential for effects that create resources that need cleanup."
            }
          ]
        }}
      >
        <CodeExample
          title="useEffect Hook"
          description="Handle side effects (API calls, subscriptions, DOM manipulation)"
          code={`import { useEffect, useState } from 'react';

function DataFetcher({ userId }: { userId: number }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Run on every render (no dependency array)
  useEffect(() => {
    console.log('Runs on every render');
  });

  // 2. Run once on mount (empty dependency array)
  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data));
  }, []); // Empty array = run once

  // 3. Run when dependencies change
  useEffect(() => {
    fetch(\`/api/user/\${userId}\`)
      .then(res => res.json())
      .then(data => setData(data));
  }, [userId]); // Runs when userId changes

  // 4. Cleanup function
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Tick');
    }, 1000);

    // Cleanup: runs when component unmounts or before effect re-runs
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}`}
        />
      </ConceptCard>

      {/* 10. useContext */}
      <ConceptCard 
        number={10} 
        title="useContext"
        theory={{
          what: "useContext is a React Hook that allows you to consume a React Context value. It lets you access context data without prop drilling.",
          why: "useContext provides a clean way to access context values in functional components. It eliminates the need for Consumer components and makes context consumption more straightforward.",
          how: "useContext takes a context object (created by createContext) and returns the current context value. The value comes from the nearest Provider above the component. If there's no Provider, it returns the default value.",
          keyPoints: [
            "Consumes context values in functional components",
            "Takes context object as argument",
            "Returns value from nearest Provider",
            "Re-renders when context value changes",
            "Simpler than Consumer component pattern",
            "Always check if context exists before using"
          ],
          interviewQuestions: [
            {
              question: "What is useContext and how does it work?",
              answer: "useContext is a Hook that allows functional components to consume React Context values. It takes a context object and returns the current context value from the nearest Provider. If there's no Provider, it returns the default value. It's simpler than the Consumer component pattern."
            },
            {
              question: "What happens when context value changes?",
              answer: "When the context value changes, all components using useContext with that context will re-render. This is why you should be careful with context - if the value is an object that's recreated on every render, it will cause unnecessary re-renders of all consumers."
            }
          ]
        }}
      >
        <CodeExample
          title="useContext Hook"
          description="Access React Context without prop drilling"
          code={`import { createContext, useContext, useState } from 'react';

// 1. Create context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Provider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook to use context
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Use in components
function Button() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}

// 5. Wrap app with provider
function App() {
  return (
    <ThemeProvider>
      <Button />
    </ThemeProvider>
  );
}`}
        />
      </ConceptCard>

      {/* 11. useRef */}
      <ConceptCard 
        number={11} 
        title="useRef"
        theory={{
          what: "useRef is a React Hook that returns a mutable ref object that persists across renders. It can hold a reference to a DOM element or store any mutable value that doesn't trigger re-renders when changed.",
          why: "useRef is useful for accessing DOM elements directly, storing mutable values that don't need to trigger re-renders, tracking previous values, and storing timer IDs or other values that persist but don't affect rendering.",
          how: "Create ref: const ref = useRef(initialValue). Access current value: ref.current. Attach to DOM: <div ref={ref}>. Update ref.current doesn't trigger re-render. Use for DOM access, storing previous values, or mutable values that persist across renders.",
          keyPoints: [
            "Returns mutable ref object",
            "Persists across renders",
            "Access DOM elements directly",
            "ref.current changes don't trigger re-renders",
            "Use for DOM access or mutable values"
          ],
          interviewQuestions: [
            {
              question: "What is useRef and when would you use it?",
              answer: "useRef returns a mutable ref object that persists across renders. Use it to: 1) Access DOM elements directly (inputRef.current.focus()), 2) Store mutable values that don't trigger re-renders (render count, timer IDs), 3) Track previous values. Changing ref.current doesn't cause re-renders, making it useful for values that need to persist but don't affect UI."
            }
          ]
        }}
      >
        <CodeExample
          title="useRef Hook"
          description="Access DOM elements or store mutable values that don't trigger re-renders"
          code={`import { useRef, useEffect } from 'react';

function TextInput() {
  // 1. Access DOM element
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  // 2. Store mutable value (doesn't cause re-render)
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    console.log('Rendered', renderCount.current, 'times');
  });

  // 3. Store previous value
  const prevValueRef = useRef<string>();
  
  useEffect(() => {
    prevValueRef.current = value;
  });

  return (
    <div>
      <input ref={inputRef} />
      <p>Renders: {renderCount.current}</p>
    </div>
  );
}`}
        />
      </ConceptCard>

      {/* 12. useMemo */}
      <ConceptCard 
        number={12} 
        title="useMemo"
        theory={{
          what: "useMemo is a React Hook that memoizes expensive calculations. It returns a memoized value that only recalculates when dependencies change, preventing unnecessary recalculations on every render.",
          why: "useMemo optimizes performance by avoiding expensive recalculations. It's useful for expensive computations, filtering/sorting large arrays, or creating derived values. However, don't overuse it - React is already fast, and useMemo has its own overhead.",
          how: "Wrap expensive calculation: const memoized = useMemo(() => expensiveCalc(), [deps]). Only recalculates when dependencies change. Use for expensive operations, not for simple calculations. Dependencies array determines when to recalculate.",
          keyPoints: [
            "Memoizes expensive calculations",
            "Only recalculates when deps change",
            "Use for expensive operations",
            "Don't overuse - has overhead",
            "Dependencies array controls recalculation"
          ],
          interviewQuestions: [
            {
              question: "What is useMemo and when should you use it?",
              answer: "useMemo memoizes expensive calculations, recalculating only when dependencies change. Use it for expensive operations like filtering/sorting large arrays, complex calculations, or creating derived values. Don't use it for simple calculations - React is already fast and useMemo has overhead. The dependencies array determines when recalculation happens."
            }
          ]
        }}
      >
        <CodeExample
          title="useMemo Hook"
          description="Memoize expensive calculations"
          code={`import { useMemo, useState } from 'react';

function ExpensiveList({ items, filter }: { items: number[]; filter: string }) {
  // Without useMemo: recalculates on every render
  const filteredItems = items.filter(item => item.toString().includes(filter));

  // With useMemo: only recalculates when items or filter changes
  const memoizedItems = useMemo(() => {
    console.log('Filtering items...'); // Only logs when dependencies change
    return items.filter(item => item.toString().includes(filter));
  }, [items, filter]);

  return (
    <ul>
      {memoizedItems.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

// Use case: Expensive calculations
function ProductList({ products }: { products: Product[] }) {
  const [sortBy, setSortBy] = useState('name');

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.price - b.price;
    });
  }, [products, sortBy]);

  return <div>{/* Render sorted products */}</div>;
}`}
        />
      </ConceptCard>

      {/* 13. useCallback */}
      <ConceptCard 
        number={13} 
        title="useCallback"
        theory={{
          what: "useCallback is a React Hook that memoizes functions. It returns a memoized callback that only changes when dependencies change, preventing unnecessary re-renders of child components that receive the function as a prop.",
          why: "useCallback prevents function recreation on every render, which is important when passing functions to memoized child components (React.memo). It ensures referential equality, allowing React.memo to work correctly. Use it to optimize performance when passing callbacks to expensive child components.",
          how: "Wrap function: const memoized = useCallback(() => {}, [deps]). Function only changes when dependencies change. Use with React.memo for child components. Empty deps array means function never changes. Include all dependencies used in the function.",
          keyPoints: [
            "Memoizes functions",
            "Prevents function recreation",
            "Use with React.memo for optimization",
            "Ensures referential equality",
            "Dependencies control when function changes"
          ],
          interviewQuestions: [
            {
              question: "What is useCallback and when should you use it?",
              answer: "useCallback memoizes functions, returning the same function reference unless dependencies change. Use it when passing functions to memoized child components (React.memo) to prevent unnecessary re-renders. It ensures referential equality. Don't use it unnecessarily - only when optimizing performance with React.memo. Include all dependencies used in the function."
            }
          ]
        }}
      >
        <CodeExample
          title="useCallback Hook"
          description="Memoize functions to prevent unnecessary re-renders"
          code={`import { useCallback, useState, memo } from 'react';

// Without useCallback: new function created on every render
function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ❌ Bad: New function on every render
  const handleClick = () => {
    console.log('Clicked');
  };

  // ✅ Good: Memoized function
  const handleClickMemoized = useCallback(() => {
    console.log('Clicked');
  }, []); // Empty deps = function never changes

  // With dependencies
  const handleSubmit = useCallback((data: string) => {
    console.log('Submit', data, name);
  }, [name]); // Recreate when name changes

  return (
    <div>
      <ExpensiveChild onClick={handleClickMemoized} />
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}

// Memo prevents re-render if props haven't changed
const ExpensiveChild = memo(({ onClick }: { onClick: () => void }) => {
  console.log('ExpensiveChild rendered');
  return <button onClick={onClick}>Click</button>;
});`}
        />
      </ConceptCard>

      {/* 14. useReducer */}
      <ConceptCard 
        number={14} 
        title="useReducer"
        theory={{
          what: "useReducer is a React Hook that manages complex state using a reducer function. It's an alternative to useState, especially useful when state logic is complex or involves multiple sub-values. It follows the reducer pattern similar to Redux.",
          why: "useReducer is better than useState for complex state logic, when next state depends on previous state, or when you need to manage multiple related state values. It makes state updates predictable and easier to test. It's useful for forms, state machines, or complex state transitions.",
          how: "Define reducer: (state, action) => newState. Use hook: const [state, dispatch] = useReducer(reducer, initialState). Dispatch actions: dispatch({ type: 'ACTION', payload }). Reducer handles all state updates. Use for complex state logic.",
          keyPoints: [
            "Manages complex state with reducer",
            "Alternative to useState",
            "Follows reducer pattern",
            "Use for complex state logic",
            "dispatch() sends actions to reducer"
          ],
          interviewQuestions: [
            {
              question: "What is useReducer and when would you use it instead of useState?",
              answer: "useReducer manages complex state using a reducer function. Use it instead of useState when: 1) State logic is complex, 2) Next state depends on previous state, 3) Managing multiple related state values, 4) You need predictable state updates. It follows the reducer pattern: define reducer function, use useReducer hook, dispatch actions. It's better for complex state management."
            }
          ]
        }}
      >
        <CodeExample
          title="useReducer Hook"
          description="Manage complex state with reducer pattern (alternative to useState)"
          code={`import { useReducer } from 'react';

// State type
interface CounterState {
  count: number;
  step: number;
}

// Action types
type CounterAction =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'setStep'; step: number };

// Reducer function
function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'reset':
      return { ...state, count: 0 };
    case 'setStep':
      return { ...state, step: action.step };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    step: 1
  });

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Step: {state.step}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <input
        type="number"
        value={state.step}
        onChange={(e) =>
          dispatch({ type: 'setStep', step: Number(e.target.value) })
        }
      />
    </div>
  );
}`}
        />
      </ConceptCard>

      {/* 15. Custom Hooks */}
      <ConceptCard 
        number={15} 
        title="Custom Hooks"
        theory={{
          what: "Custom Hooks are JavaScript functions that start with 'use' and can call other Hooks. They allow you to extract component logic into reusable functions, sharing stateful logic between components without changing component hierarchy.",
          why: "Custom Hooks enable code reuse, separation of concerns, and cleaner components. They extract complex logic from components, making components easier to read and test. They follow the DRY (Don't Repeat Yourself) principle and enable sharing logic across multiple components.",
          how: "Create function starting with 'use': function useCustomHook() { /* use hooks */ return value; }. Use hooks inside (useState, useEffect, etc.). Return values or functions. Use in components: const value = useCustomHook(). Follow naming convention: useXxx.",
          keyPoints: [
            "Functions starting with 'use'",
            "Can call other Hooks",
            "Extract reusable logic",
            "Share stateful logic between components",
            "Follow naming convention: useXxx"
          ],
          interviewQuestions: [
            {
              question: "What are Custom Hooks and how do you create them?",
              answer: "Custom Hooks are JavaScript functions starting with 'use' that can call other Hooks. They extract component logic into reusable functions. Create: function useCustomHook() { const [state, setState] = useState(); return { state, setState }; }. Use in components: const { state } = useCustomHook(). They enable code reuse, separation of concerns, and sharing stateful logic between components without changing component hierarchy."
            }
          ]
        }}
      >
        <CodeExample
          title="Custom Hooks"
          description="Extract component logic into reusable functions"
          code={`// Custom hook: useLocalStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Custom hook: useFetch
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage
function MyComponent() {
  const [name, setName] = useLocalStorage('name', '');
  const { data, loading, error } = useFetch<User[]>('/api/users');

  return <div>{/* Use hooks */}</div>;
}

// Custom hooks must start with "use"`}
        />
      </ConceptCard>
    </div>
  );
}

// Continue with other sections... (Due to length, I'll create separate components)
// For now, let me add placeholder components for the remaining sections

function DataFlowConcepts() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">🧠 Component & Data Flow</h3>
        <p className="text-purple-100">Understanding how data flows in React</p>
      </div>
      <ConceptCard 
        number={16} 
        title="One-way Data Binding"
        theory={{
          what: "One-way data binding means data flows in one direction: from parent to child via props. Events flow in the opposite direction: from child to parent via callbacks. This creates a predictable data flow pattern.",
          why: "One-way data binding makes applications easier to understand and debug. It creates a clear data flow, prevents data inconsistencies, and makes it easier to track where data comes from and how it changes. It's a fundamental React principle.",
          how: "Data flows DOWN: Pass data from parent to child via props. Events flow UP: Pass callback functions from parent to child, child calls callback to notify parent. Parent manages state, children receive data and notify parent of changes via callbacks.",
          keyPoints: [
            "Data flows down (parent → child)",
            "Events flow up (child → parent)",
            "Props pass data down",
            "Callbacks pass events up",
            "Creates predictable data flow"
          ],
          interviewQuestions: [
            {
              question: "Explain one-way data binding in React.",
              answer: "One-way data binding means data flows in one direction: from parent to child via props. Events flow in the opposite direction: from child to parent via callback functions. Parent components manage state and pass data down via props. Child components receive data and notify parents of changes via callbacks. This creates predictable, easy-to-debug data flow."
            }
          ]
        }}
      >
        <CodeExample
          title="One-way Data Flow"
          description="Data flows down, events flow up"
          code={`// Data flows DOWN (parent → child via props)
function Parent() {
  const [count, setCount] = useState(0);
  
  return <Child count={count} />; // Data flows down
}

function Child({ count }: { count: number }) {
  return <div>{count}</div>; // Receives data
}

// Events flow UP (child → parent via callbacks)
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleIncrement = () => {
    setCount(count + 1); // Parent updates state
  };
  
  return <Child onIncrement={handleIncrement} />; // Callback flows down
}

function Child({ onIncrement }: { onIncrement: () => void }) {
  return <button onClick={onIncrement}>+</button>; // Event flows up
}`}
        />
      </ConceptCard>

      <ConceptCard 
        number={17} 
        title="Lifting State Up"
        theory={{
          what: "Lifting state up means moving state from child components to their nearest common ancestor (parent). This allows multiple children to share and update the same state.",
          why: "Lifting state up enables sharing state between sibling components, synchronizing components, and centralizing state management. When multiple components need the same data, lift it to their common parent. It's a common React pattern for shared state.",
          how: "Identify components that need shared state. Move state from child to nearest common ancestor. Pass state down via props. Pass state updaters (setState functions) down via callbacks. Children update parent state via callbacks. Parent re-renders and passes new state down.",
          keyPoints: [
            "Move state to common ancestor",
            "Share state between siblings",
            "Pass state down via props",
            "Pass updaters down via callbacks",
            "Common pattern for shared state"
          ],
          interviewQuestions: [
            {
              question: "What is lifting state up and when would you use it?",
              answer: "Lifting state up means moving state from child components to their nearest common ancestor. Use it when multiple sibling components need to share state or when components need to be synchronized. Move state to the common parent, pass state down via props, pass state updaters down via callbacks. Children update parent state via callbacks, parent re-renders and passes new state down."
            }
          ]
        }}
      >
        <CodeExample
          title="Lifting State Up"
          description="Move state to the nearest common ancestor"
          code={`// ❌ Bad: State in child components
function TemperatureInput() {
  const [temperature, setTemperature] = useState('');
  return <input value={temperature} onChange={(e) => setTemperature(e.target.value)} />;
}

// ✅ Good: State lifted to parent
function Calculator() {
  const [temperature, setTemperature] = useState('');
  const scale = 'celsius';
  
  return (
    <div>
      <TemperatureInput
        scale="celsius"
        temperature={temperature}
        onTemperatureChange={setTemperature}
      />
      <TemperatureInput
        scale="fahrenheit"
        temperature={convertToFahrenheit(temperature)}
        onTemperatureChange={(t) => setTemperature(convertToCelsius(t))}
      />
    </div>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard 
        number={18} 
        title="Controlled vs Uncontrolled Components" 
        priority="🔥"
        theory={{
          what: "Controlled components have their value controlled by React state, while uncontrolled components store their value in the DOM. Controlled components use value prop and onChange, uncontrolled components use defaultValue and refs.",
          why: "Controlled components give React full control over form data, making it easier to validate, transform, and manage form state. Uncontrolled components are simpler for basic forms but offer less control. Most React forms use controlled components.",
          how: "Controlled: React state controls the input value via the value prop, and onChange updates the state. Uncontrolled: The DOM controls the value, accessed via refs. React recommends controlled components for most use cases.",
          keyPoints: [
            "Controlled: value + onChange (React controls)",
            "Uncontrolled: defaultValue + ref (DOM controls)",
            "Controlled components are preferred in React",
            "Controlled allows validation and transformation",
            "Uncontrolled is simpler but less flexible",
            "Use controlled for most forms"
          ],
          interviewQuestions: [
            {
              question: "What's the difference between controlled and uncontrolled components?",
              answer: "Controlled components have their value controlled by React state via the value prop and onChange handler. Uncontrolled components store their value in the DOM and access it via refs. Controlled components give React full control over form data, while uncontrolled components are simpler but offer less control."
            },
            {
              question: "When would you use an uncontrolled component?",
              answer: "Uncontrolled components are useful for simple forms, integrating with non-React code, or when you need better performance with large forms. However, controlled components are generally preferred because they provide better control, validation, and state management."
            }
          ]
        }}
      >
        <CodeExample
          title="Controlled Components"
          description="React controls the form element's value"
          code={`// Controlled: React controls the value
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

// Uncontrolled: DOM controls the value
function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = () => {
    console.log(inputRef.current?.value); // Access value via ref
  };
  
  return (
    <div>
      <input ref={inputRef} defaultValue="initial" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

// Use controlled for most cases
// Use uncontrolled for simple forms or third-party libraries`}
        />
      </ConceptCard>

      <ConceptCard 
        number={19} 
        title="Prop Drilling"
        theory={{
          what: "Prop drilling is the process of passing props through multiple levels of components, even when intermediate components don't use those props. It's passing data from a parent component down through multiple child components to reach a deeply nested component.",
          why: "Prop drilling is a common problem in React applications. While it works, it makes code harder to maintain, creates unnecessary coupling, and makes components less reusable. It's a sign that you might need Context API or state management.",
          how: "Prop drilling occurs when you pass props through components that don't use them. Solution: Use Context API to share data without prop drilling. Or use state management libraries (Redux, Zustand). Or restructure components to reduce nesting. Context API is the built-in React solution.",
          keyPoints: [
            "Passing props through unused components",
            "Creates maintenance issues",
            "Makes components less reusable",
            "Use Context API to solve",
            "Or use state management libraries"
          ],
          interviewQuestions: [
            {
              question: "What is prop drilling and how do you solve it?",
              answer: "Prop drilling is passing props through multiple component levels, even when intermediate components don't use them. It makes code harder to maintain. Solutions: 1) Use Context API to share data without prop drilling, 2) Use state management libraries (Redux, Zustand), 3) Restructure components to reduce nesting. Context API is React's built-in solution for avoiding prop drilling."
            }
          ]
        }}
      >
        <CodeExample
          title="Prop Drilling Problem"
          description="Passing props through multiple levels"
          code={`// ❌ Prop drilling: passing props through components that don't need them
function App() {
  const [user, setUser] = useState({ name: 'John' });
  return <Header user={user} />; // Header doesn't need user
}

function Header({ user }: { user: User }) {
  return <Navigation user={user} />; // Navigation doesn't need user
}

function Navigation({ user }: { user: User }) {
  return <UserMenu user={user} />; // Finally uses user
}

// ✅ Solution: Use Context API
const UserContext = createContext<User | null>(null);

function App() {
  const [user, setUser] = useState({ name: 'John' });
  return (
    <UserContext.Provider value={user}>
      <Header /> {/* No props needed */}
    </UserContext.Provider>
  );
}

function UserMenu() {
  const user = useContext(UserContext); // Direct access
  return <div>{user?.name}</div>;
}`}
        />
      </ConceptCard>

      <ConceptCard 
        number={20} 
        title="Context API" 
        priority="🔥"
        theory={{
          what: "Context API provides a way to pass data through the component tree without prop drilling. It allows you to share values between components without explicitly passing props through every level.",
          why: "Context solves the prop drilling problem - when you need to pass data through many component levels. It's useful for global data like themes, user authentication, language settings, etc. However, it should be used sparingly as it can make components harder to test and reason about.",
          how: "Context is created using createContext(), provided using a Provider component, and consumed using useContext hook. The Provider wraps components that need access to the context value. When the context value changes, all consuming components re-render.",
          keyPoints: [
            "Context solves prop drilling",
            "Create context with createContext()",
            "Provide value with <Context.Provider>",
            "Consume with useContext hook",
            "All consumers re-render when context value changes",
            "Use sparingly - can make components harder to test"
          ],
          interviewQuestions: [
            {
              question: "What is Context API and when do you use it?",
              answer: "Context API allows you to share data across the component tree without prop drilling. Use it for global data like themes, user info, or language settings that many components need. However, use it sparingly - if only a few components need the data, prop drilling might be simpler."
            },
            {
              question: "What are the drawbacks of using Context?",
              answer: "Context can make components harder to test and reason about. All consumers re-render when context value changes, which can cause performance issues if not managed carefully. It also makes it harder to see data flow. Use Context for truly global data, not for avoiding a few prop levels."
            }
          ]
        }}
      >
        <CodeExample
          title="Context API"
          description="Share data without prop drilling"
          code={`// Already covered in useContext hook section
// Context is the solution to prop drilling`}
        />
      </ConceptCard>
    </div>
  );
}

function StylingConcepts() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-xl p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">🎨 Styling in React</h3>
        <p className="text-pink-100">Different ways to style React components</p>
      </div>

      <ConceptCard 
        number={21} 
        title="Inline Styling"
        theory={{
          what: "Inline styling in React involves passing style objects directly to JSX elements via the style prop. Styles are written as JavaScript objects with camelCase property names.",
          why: "Inline styles are useful for dynamic styles based on props or state, component-specific styles, or when you want to avoid CSS files. However, they don't support pseudo-classes, media queries, or animations, and can make JSX harder to read.",
          how: "Pass style object to style prop: style={{ color: 'red', fontSize: '16px' }}. Use camelCase for CSS properties (backgroundColor, not background-color). Use strings for values. Can use variables or computed values. Styles are scoped to the component.",
          keyPoints: [
            "Style prop accepts JavaScript objects",
            "Use camelCase for CSS properties",
            "Good for dynamic styles",
            "No pseudo-classes or media queries",
            "Styles scoped to component"
          ],
          interviewQuestions: [
            {
              question: "How do you apply inline styles in React?",
              answer: "Pass a style object to the style prop: style={{ color: 'red', fontSize: '16px' }}. Use camelCase for CSS properties (backgroundColor instead of background-color). Values are strings. Inline styles are useful for dynamic styles based on props/state, but don't support pseudo-classes or media queries."
            }
          ]
        }}
      >
        <CodeExample
          title="Inline Styles"
          description="Style objects in JavaScript"
          code={`function Button() {
  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };
  
  return <button style={buttonStyle}>Click Me</button>;
}

// Dynamic styles
function DynamicButton({ isActive }: { isActive: boolean }) {
  return (
    <button
      style={{
        backgroundColor: isActive ? 'green' : 'gray',
        padding: '10px'
      }}
    >
      Button
    </button>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard 
        number={22} 
        title="CSS Files"
        theory={{
          what: "CSS Files are traditional stylesheets imported into React components. You can import CSS files directly, and styles are applied globally unless scoped using CSS Modules or other techniques.",
          why: "CSS files are familiar, support all CSS features (pseudo-classes, media queries, animations), and allow separation of concerns. However, styles are global by default, which can cause naming conflicts. Use CSS Modules or scoped CSS for component-specific styles.",
          how: "Import CSS file: import './styles.css'. Styles are applied globally. Use class names: className='button'. Use CSS Modules for scoped styles: import styles from './Button.module.css', then className={styles.button}. CSS files support all CSS features.",
          keyPoints: [
            "Import CSS files directly",
            "Styles are global by default",
            "Use className prop",
            "Support all CSS features",
            "Use CSS Modules for scoped styles"
          ],
          interviewQuestions: [
            {
              question: "How do you use CSS files in React?",
              answer: "Import CSS files: import './styles.css'. Apply classes using className prop: className='button'. Styles are global by default. Use CSS Modules (import styles from './Button.module.css') for scoped, component-specific styles. CSS files support all CSS features like pseudo-classes, media queries, and animations."
            }
          ]
        }}
      >
        <CodeExample
          title="CSS Files"
          description="Import CSS files in components"
          code={`// styles.css
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
}

// Component.tsx
import './styles.css';

function Button() {
  return <button className="button">Click Me</button>;
}

// Global styles in index.css
// Component-specific styles in Component.css`}
        />
      </ConceptCard>

      <ConceptCard 
        number={23} 
        title="CSS Modules"
        theory={{
          what: "CSS Modules are CSS files where class names are scoped locally by default. They prevent naming conflicts by automatically generating unique class names. Each component gets its own scoped styles.",
          why: "CSS Modules solve the global CSS problem - they provide scoped styles that don't leak to other components. They prevent naming conflicts, make styles easier to maintain, and work well with component-based architecture. They're a good middle ground between global CSS and CSS-in-JS.",
          how: "Create file: Button.module.css. Import: import styles from './Button.module.css'. Use: className={styles.button}. Class names are automatically scoped. Can use :global() for global styles. Works with build tools (Vite, CRA) automatically.",
          keyPoints: [
            "Scoped CSS classes",
            "Prevents naming conflicts",
            "File naming: Component.module.css",
            "Import and use styles object",
            "Automatic class name scoping"
          ],
          interviewQuestions: [
            {
              question: "What are CSS Modules and how do they work?",
              answer: "CSS Modules are CSS files where class names are scoped locally. Create files like Button.module.css, import as import styles from './Button.module.css', use as className={styles.button}. Class names are automatically scoped to prevent conflicts. They provide component-scoped styles without the complexity of CSS-in-JS libraries."
            }
          ]
        }}
      >
        <CodeExample
          title="CSS Modules"
          description="Scoped CSS classes (prevents naming conflicts)"
          code={`// Button.module.css
.button {
  background-color: blue;
  color: white;
}

// Button.tsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.button}>Click Me</button>;
}

// CSS Modules automatically scope class names
// .button becomes .Button_button__abc123`}
        />
      </ConceptCard>

      <ConceptCard 
        number={24} 
        title="Styled Components"
        theory={{
          what: "Styled Components is a CSS-in-JS library that lets you write CSS directly in JavaScript. It uses tagged template literals to create styled React components. Styles are scoped to components and can use props and themes.",
          why: "Styled Components provides scoped styles, dynamic styling based on props, theme support, and eliminates class name conflicts. It keeps styles close to components and enables powerful styling features. However, it adds a runtime cost and learning curve.",
          how: "Install: npm install styled-components. Create styled component: const Button = styled.button`color: red;`. Use props: const Button = styled.button`color: ${props => props.primary ? 'blue' : 'red'};`. Use themes. Styles are scoped automatically. Supports all CSS features.",
          keyPoints: [
            "CSS-in-JS library",
            "Write CSS in JavaScript",
            "Scoped styles automatically",
            "Dynamic styles based on props",
            "Theme support"
          ],
          interviewQuestions: [
            {
              question: "What are Styled Components and when would you use them?",
              answer: "Styled Components is a CSS-in-JS library that lets you write CSS in JavaScript using tagged template literals. Use it when you want scoped styles, dynamic styling based on props, theme support, and want to keep styles close to components. It eliminates class name conflicts but adds runtime cost."
            }
          ]
        }}
      >
        <CodeExample
          title="Styled Components"
          description="CSS-in-JS library (npm install styled-components)"
          code={`import styled from 'styled-components';

// Create styled component
const Button = styled.button\`
  background-color: \${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  
  &:hover {
    opacity: 0.8;
  }
\`;

// Usage
function App() {
  return (
    <div>
      <Button>Default</Button>
      <Button primary>Primary</Button>
    </div>
  );
}

// Props-based styling
const Container = styled.div<{ isActive: boolean }>\`
  background: \${props => props.isActive ? 'green' : 'white'};
\`;`}
        />
      </ConceptCard>

      <ConceptCard 
        number={25} 
        title="Tailwind CSS" 
        priority="🔥"
        theory={{
          what: "Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs. Instead of writing custom CSS, you use pre-built utility classes directly in your JSX.",
          why: "Tailwind enables rapid UI development, consistent design systems, smaller CSS bundles (unused styles are purged), and eliminates naming conflicts. It's highly customizable and works well with component-based frameworks. It's popular for modern React applications.",
          how: "Install: npm install -D tailwindcss. Configure tailwind.config.js. Add directives to CSS: @tailwind base; @tailwind components; @tailwind utilities;. Use utility classes: className='bg-blue-500 text-white px-4 py-2'. Customize via config. Purge unused styles in production.",
          keyPoints: [
            "Utility-first CSS framework",
            "Use utility classes in JSX",
            "Highly customizable",
            "Smaller bundles (purging)",
            "Rapid development"
          ],
          interviewQuestions: [
            {
              question: "What is Tailwind CSS and how does it work?",
              answer: "Tailwind CSS is a utility-first CSS framework. Instead of writing custom CSS, you use pre-built utility classes like 'bg-blue-500 text-white px-4'. It enables rapid development, consistent designs, and smaller bundles (unused styles are purged). Configure via tailwind.config.js and use utility classes directly in className."
            }
          ]
        }}
      >
        <CodeExample
          title="Tailwind CSS"
          description="Utility-first CSS framework (used in this project!)"
          code={`// Install: npm install -D tailwindcss
// Configure in tailwind.config.js

function Button({ variant }: { variant: 'primary' | 'secondary' }) {
  return (
    <button
      className={\`px-4 py-2 rounded-lg font-semibold \${
        variant === 'primary'
          ? 'bg-blue-500 text-white hover:bg-blue-600'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      } transition-colors\`}
    >
      Click Me
    </button>
  );
}

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Responsive grid */}
</div>

// This project uses Tailwind CSS!`}
        />
      </ConceptCard>
    </div>
  );
}

function RoutingConcepts() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">🌐 Routing & Navigation</h3>
        <p className="text-indigo-100">React Router for navigation</p>
      </div>
      <ConceptCard 
        number={26} 
        title="React Router" 
        priority="🔥"
        theory={{
          what: "React Router is a library for routing in React applications. It enables navigation between different views/components based on the URL, making React apps feel like multi-page applications.",
          why: "React Router enables client-side routing, allowing navigation without full page reloads. This creates a faster, smoother user experience. It's essential for building single-page applications (SPAs) with multiple views.",
          how: "React Router uses the BrowserRouter to wrap your app, Routes to define route paths, and Route components to map paths to components. It uses the History API to update the URL without page reloads. Navigation can be done with Link components or programmatically with useNavigate.",
          keyPoints: [
            "Enables client-side routing in SPAs",
            "Uses BrowserRouter, Routes, and Route components",
            "Navigation with Link or useNavigate hook",
            "Access route params with useParams",
            "Supports nested routes and protected routes",
            "No page reload on navigation"
          ],
          interviewQuestions: [
            {
              question: "What is React Router and why do we need it?",
              answer: "React Router is a library for routing in React applications. It enables client-side navigation between different views based on the URL, making React apps feel like multi-page applications without full page reloads. It's essential for building SPAs with multiple pages/views."
            },
            {
              question: "How does React Router work?",
              answer: "React Router uses the BrowserRouter to wrap the app and listen to URL changes. Routes define path-to-component mappings. When the URL changes, React Router renders the matching component. It uses the History API to update the URL without page reloads, creating a seamless navigation experience."
            }
          ]
        }}
      >
        <CodeExample
          title="React Router Setup"
          description="Install: npm install react-router-dom"
          code={`import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/123">User 123</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

// Access route params
function UserProfile() {
  const { id } = useParams<{ id: string }>();
  return <div>User ID: {id}</div>;
}

// Programmatic navigation
function Login() {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    // Login logic...
    navigate('/dashboard'); // Navigate programmatically
  };
  
  return <button onClick={handleLogin}>Login</button>;
}`}
        />
      </ConceptCard>
    </div>
  );
}

function StateManagementConcepts() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">📦 State Management</h3>
        <p className="text-yellow-100">Managing application state</p>
      </div>

      <ConceptCard 
        number={27} 
        title="Local State"
        theory={{
          what: "Local state is state that exists within a single component and is only accessible within that component. It's managed using useState hook and is isolated to the component where it's declared.",
          why: "Local state is perfect for component-specific data like form inputs, UI state (open/closed), or temporary values. It keeps state close to where it's used, making components self-contained and easier to understand. Use local state when data doesn't need to be shared.",
          how: "Use useState hook: const [state, setState] = useState(initialValue). State is only accessible within the component. Update with setState. Local state is the simplest form of state management and should be your default choice unless you need to share state.",
          keyPoints: [
            "State within single component",
            "Managed with useState",
            "Only accessible in component",
            "Use for component-specific data",
            "Simplest state management"
          ],
          interviewQuestions: [
            {
              question: "What is local state and when do you use it?",
              answer: "Local state is state that exists within a single component, managed with useState. Use it for component-specific data like form inputs, UI state (modals, toggles), or temporary values. It keeps state close to where it's used and should be your default choice unless you need to share state between components."
            }
          ]
        }}
      >
        <CodeExample
          title="Local State (useState)"
          description="State within a single component"
          code={`// Local state - only accessible in component
function Counter() {
  const [count, setCount] = useState(0); // Local state
  return <div>{count}</div>;
}

// Use for: Component-specific UI state, form inputs, toggles`}
        />
      </ConceptCard>

      <ConceptCard 
        number={28} 
        title="Global State"
        theory={{
          what: "Global state is state that can be accessed by multiple components across the application. It's shared state that doesn't belong to a single component. Common solutions include Context API, Redux, Zustand, and other state management libraries.",
          why: "Global state is needed when multiple components need to share data, when you want to avoid prop drilling, or when state needs to persist across navigation. It's useful for user authentication, theme settings, shopping cart, or application-wide settings.",
          how: "Use Context API for simple global state: createContext(), Provider, useContext. Use Redux/Zustand for complex state management. Lift state to a common ancestor for simple cases. Choose based on complexity: Context for simple, Redux/Zustand for complex.",
          keyPoints: [
            "Shared across multiple components",
            "Use Context API or state libraries",
            "Avoids prop drilling",
            "Use for app-wide data",
            "Choose based on complexity"
          ],
          interviewQuestions: [
            {
              question: "What is global state and when do you use it?",
              answer: "Global state is state shared across multiple components. Use it when multiple components need the same data, to avoid prop drilling, or when state needs to persist across navigation. Use Context API for simple cases, Redux/Zustand for complex state management. Examples: user authentication, theme, shopping cart."
            }
          ]
        }}
      >
        <CodeExample
          title="Global State (Context API)"
          description="State shared across multiple components"
          code={`// Global state with Context
const AppStateContext = createContext<{
  user: User | null;
  theme: 'light' | 'dark';
}>({ user: null, theme: 'light' });

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <AppStateContext.Provider value={{ user, theme }}>
      <Components />
    </AppStateContext.Provider>
  );
}

// Use for: User data, theme, language settings`}
        />
      </ConceptCard>

      <ConceptCard 
        number={29} 
        title="Redux / Redux Toolkit" 
        priority="🔥"
        theory={{
          what: "Redux is a predictable state container for JavaScript apps. Redux Toolkit is the official, opinionated way to write Redux logic. It provides a store to hold state, actions to describe changes, and reducers to specify how state updates.",
          why: "Redux provides predictable state management, time-travel debugging, middleware support, and works well with React. Redux Toolkit simplifies Redux with less boilerplate, better defaults, and built-in best practices. Use for complex applications with lots of shared state.",
          how: "Install: npm install @reduxjs/toolkit react-redux. Create store with configureStore. Create slices with createSlice (reducers + actions). Use Provider to wrap app. Use useSelector to read state, useDispatch to dispatch actions. Redux Toolkit reduces boilerplate significantly.",
          keyPoints: [
            "Predictable state container",
            "Redux Toolkit simplifies Redux",
            "Store, actions, reducers pattern",
            "useSelector and useDispatch hooks",
            "Good for complex state management"
          ],
          interviewQuestions: [
            {
              question: "What is Redux and when would you use it?",
              answer: "Redux is a predictable state container. Use it for complex applications with lots of shared state, when you need time-travel debugging, or when state logic is complex. Redux Toolkit simplifies Redux with less boilerplate. Create store, slices (reducers + actions), use Provider, useSelector to read, useDispatch to dispatch actions."
            }
          ]
        }}
      >
        <CodeExample
          title="Redux Toolkit"
          description="Install: npm install @reduxjs/toolkit react-redux"
          code={`// store.ts
import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});

export const { increment, decrement } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// App.tsx
import { Provider } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard 
        number={30} 
        title="Zustand / Jotai / Recoil"
        theory={{
          what: "Zustand, Jotai, and Recoil are modern, lightweight state management libraries for React. They offer simpler APIs than Redux while providing global state management. Zustand is minimal, Jotai uses atomic state, Recoil uses atoms and selectors.",
          why: "These libraries provide simpler alternatives to Redux with less boilerplate, easier learning curves, and good performance. Zustand is minimal and straightforward. Jotai uses atomic state (fine-grained reactivity). Recoil was created by Facebook for React. Choose based on your needs.",
          how: "Zustand: Create store with create(), use store hook. Jotai: Create atoms with atom(), use atom hook. Recoil: Create atoms with atom(), use RecoilRoot, useRecoilValue/useSetRecoilState. All are simpler than Redux and work well with React.",
          keyPoints: [
            "Modern state management libraries",
            "Simpler than Redux",
            "Less boilerplate",
            "Zustand: minimal, Jotai: atomic, Recoil: atoms",
            "Good alternatives to Redux"
          ],
          interviewQuestions: [
            {
              question: "What are Zustand, Jotai, and Recoil?",
              answer: "Modern state management libraries simpler than Redux. Zustand is minimal and straightforward. Jotai uses atomic state for fine-grained reactivity. Recoil uses atoms and selectors, created by Facebook. All provide global state management with less boilerplate than Redux. Choose based on your needs and preferences."
            }
          ]
        }}
      >
        <CodeExample
          title="Modern State Management Libraries"
          description="Simpler alternatives to Redux"
          code={`// Zustand (simplest)
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}

// Jotai (atomic state)
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Recoil (Facebook)
import { atom, useRecoilState } from 'recoil';

const countState = atom({ key: 'count', default: 0 });
function Counter() {
  const [count, setCount] = useRecoilState(countState);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`}
        />
      </ConceptCard>
    </div>
  );
}

function SideEffectsConcepts() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">🔄 Side Effects & Data Fetching</h3>
        <p className="text-cyan-100">Handling API calls and side effects</p>
      </div>

      <ConceptCard 
        number={31} 
        title="useEffect Lifecycle" 
        priority="🔥"
        theory={{
          what: "useEffect lifecycle refers to when effects run during the component lifecycle. Effects run after render, can run on mount, on updates, and cleanup functions run before unmount or before the effect re-runs.",
          why: "Understanding useEffect lifecycle is crucial for proper side effect management. Effects run after render, allowing you to perform side effects safely. Cleanup functions prevent memory leaks and ensure proper resource management.",
          how: "No deps: runs after every render. Empty deps []: runs once on mount. With deps [a, b]: runs when dependencies change. Return cleanup function: runs before unmount or before effect re-runs. Always cleanup timers, subscriptions, and event listeners.",
          keyPoints: [
            "Runs after render",
            "Empty deps [] = mount only",
            "With deps = runs when deps change",
            "Return cleanup function",
            "Cleanup prevents memory leaks"
          ],
          interviewQuestions: [
            {
              question: "When does useEffect run?",
              answer: "useEffect runs after render. With no deps, it runs after every render. With empty deps [], it runs once on mount. With dependencies [a, b], it runs when those dependencies change. Cleanup functions (return value) run before unmount or before the effect re-runs. Always cleanup timers, subscriptions, and event listeners."
            }
          ]
        }}
      >
        <CodeExample
          title="useEffect Lifecycle"
          description="Understanding when effects run"
          code={`useEffect(() => {
  // Runs after every render
});

useEffect(() => {
  // Runs once on mount
}, []);

useEffect(() => {
  // Runs when dependencies change
}, [dependency1, dependency2]);

useEffect(() => {
  // Setup
  return () => {
    // Cleanup (runs before unmount or before effect re-runs)
  };
}, []);`}
        />
      </ConceptCard>

      <ConceptCard 
        number={32} 
        title="Fetching APIs" 
        priority="🔥"
        theory={{
          what: "Fetching APIs in React involves making HTTP requests to get data from servers. Common patterns include using useEffect to fetch on mount, handling loading and error states, and updating state with fetched data.",
          why: "API fetching is essential for dynamic applications. React components need to fetch data from APIs to display real-time information. Proper fetching patterns ensure good UX with loading states, error handling, and data updates.",
          how: "Use useEffect to fetch on mount or when dependencies change. Use useState for data, loading, and error states. Use async/await or Promises. Handle errors with try/catch. Show loading state while fetching. Display error state on failure. Update state with fetched data.",
          keyPoints: [
            "Use useEffect for fetching",
            "Manage loading and error states",
            "Use async/await or Promises",
            "Handle errors properly",
            "Update state with fetched data"
          ],
          interviewQuestions: [
            {
              question: "How do you fetch data from APIs in React?",
              answer: "Use useEffect to fetch data on mount or when dependencies change. Manage three states: data, loading, and error. Use async/await or Promises. Handle errors with try/catch. Show loading state while fetching, error state on failure. Update state with fetched data. Always handle edge cases like component unmounting during fetch."
            }
          ]
        }}
      >
        <CodeExample
          title="API Fetching Patterns"
          description="Common patterns for fetching data"
          code={`function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(\`/api/users/\${userId}\`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return <div>{user.name}</div>;
}`}
        />
      </ConceptCard>

      <ConceptCard 
        number={33} 
        title="Axios / Fetch"
        theory={{
          what: "Fetch is the native browser API for making HTTP requests. Axios is a popular third-party library that provides a simpler API and additional features. Both are used for API calls in React applications.",
          why: "Fetch is built-in and doesn't require installation. Axios provides better error handling, automatic JSON parsing, interceptors, and request/response transformation. Choose based on your needs: Fetch for simple cases, Axios for more features.",
          how: "Fetch: fetch(url, options).then(res => res.json()). Axios: axios.get(url) or axios.post(url, data). Axios automatically parses JSON, has better error handling, supports interceptors, and provides request/response transformation. Both support async/await.",
          keyPoints: [
            "Fetch: native browser API",
            "Axios: third-party library",
            "Axios: automatic JSON parsing",
            "Axios: better error handling",
            "Choose based on needs"
          ],
          interviewQuestions: [
            {
              question: "What's the difference between Fetch and Axios?",
              answer: "Fetch is the native browser API, while Axios is a third-party library. Axios provides automatic JSON parsing, better error handling, interceptors, request/response transformation, and timeout support. Fetch requires manual JSON parsing and error handling. Use Fetch for simple cases, Axios for more features and convenience."
            }
          ]
        }}
      >
        <CodeExample
          title="Axios vs Fetch"
          description="Two ways to make HTTP requests"
          code={`// Using Fetch (built-in)
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
})
  .then(res => res.json())
  .then(data => console.log(data));

// Using Axios (npm install axios)
import axios from 'axios';

axios.get('/api/users')
  .then(res => console.log(res.data));

axios.post('/api/users', { name: 'John' })
  .then(res => console.log(res.data));

// Axios advantages:
// - Automatic JSON parsing
// - Better error handling
// - Request/response interceptors
// - Built-in timeout support`}
        />
      </ConceptCard>

      <ConceptCard 
        number={34} 
        title="Loading & Error States" 
        priority="🔥"
        theory={{
          what: "Loading and error states are essential UX patterns for API calls. Loading state shows users that data is being fetched. Error state handles and displays errors when API calls fail. Both improve user experience.",
          why: "Loading states prevent confusion and show progress. Error states inform users of problems and allow recovery. Without these states, users don't know if the app is working, loading, or broken. They're essential for production applications.",
          how: "Use useState for loading and error states. Set loading to true when starting fetch, false when done. Set error when catch block executes. Show loading UI (spinner, skeleton) while loading. Show error UI (message, retry button) on error. Handle all error cases.",
          keyPoints: [
            "Essential for good UX",
            "Manage loading and error states",
            "Show loading UI while fetching",
            "Show error UI on failure",
            "Handle all error cases"
          ],
          interviewQuestions: [
            {
              question: "How do you handle loading and error states in React?",
              answer: "Use useState for loading and error states. Set loading to true when starting fetch, false when done. Set error in catch block. Show loading UI (spinner, skeleton) while loading. Show error UI (message, retry button) on error. Always handle edge cases like network failures, invalid responses, and component unmounting."
            }
          ]
        }}
      >
        <CodeExample
          title="Loading and Error Handling"
          description="Essential patterns for API calls"
          code={`function DataFetcher() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/data');
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return <div>{/* Render data */}</div>;
}`}
        />
      </ConceptCard>

      <ConceptCard 
        number={35} 
        title="Polling / Cleanup"
        theory={{
          what: "Polling is periodically fetching data at intervals (e.g., every 5 seconds). Cleanup functions in useEffect prevent memory leaks by cleaning up resources like timers, subscriptions, and event listeners when components unmount.",
          why: "Polling enables real-time updates without WebSockets. Cleanup prevents memory leaks, stops unnecessary operations, and ensures proper resource management. Without cleanup, timers and subscriptions continue running after component unmounts.",
          how: "Use setInterval for polling inside useEffect. Return cleanup function that clears interval. Cleanup runs before unmount or before effect re-runs. Always cleanup: timers (setInterval, setTimeout), subscriptions, event listeners, WebSocket connections.",
          keyPoints: [
            "Polling: periodic data fetching",
            "Use setInterval for polling",
            "Always return cleanup function",
            "Cleanup prevents memory leaks",
            "Cleanup timers, subscriptions, listeners"
          ],
          interviewQuestions: [
            {
              question: "Why is cleanup important in useEffect?",
              answer: "Cleanup prevents memory leaks by stopping timers, subscriptions, and event listeners when components unmount. Without cleanup, these resources continue running, causing memory leaks and unexpected behavior. Always return a cleanup function from useEffect when you create timers, subscriptions, or event listeners."
            }
          ]
        }}
      >
        <CodeExample
          title="Polling and Cleanup"
          description="Periodic updates and cleanup"
          code={`function LiveData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Polling: fetch data every 5 seconds
    const interval = setInterval(() => {
      fetch('/api/live-data')
        .then(res => res.json())
        .then(setData);
    }, 5000);

    // Cleanup: clear interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>{data && JSON.stringify(data)}</div>;
}

// Always cleanup:
// - Timers (setInterval, setTimeout)
// - Subscriptions
// - Event listeners
// - WebSocket connections`}
        />
      </ConceptCard>
    </div>
  );
}

function PerformanceConcepts() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">🚀 Performance Optimization</h3>
        <p className="text-emerald-100">Optimizing React applications</p>
      </div>

      <ConceptCard 
        number={36} 
        title="React.memo"
        theory={{
          what: "React.memo is a higher-order component that memoizes a component, preventing re-renders when props haven't changed. It's a performance optimization tool.",
          why: "React.memo prevents unnecessary re-renders when a component's props haven't changed. This improves performance, especially for expensive components. However, it should be used judiciously as the comparison itself has a cost.",
          how: "React.memo wraps a component and does a shallow comparison of props. If props are the same (by reference for objects/arrays), it skips re-rendering. You can provide a custom comparison function for more control.",
          keyPoints: [
            "Prevents re-renders when props haven't changed",
            "Does shallow comparison of props",
            "Use for expensive components",
            "Custom comparison function available",
            "Only helps if parent re-renders frequently",
            "Comparison has a cost - use judiciously"
          ],
          interviewQuestions: [
            {
              question: "What is React.memo and when do you use it?",
              answer: "React.memo is a HOC that memoizes a component, preventing re-renders when props haven't changed. Use it for expensive components that receive the same props frequently. However, use it judiciously - the comparison itself has a cost, and it only helps if the parent re-renders often."
            },
            {
              question: "How does React.memo work?",
              answer: "React.memo wraps a component and performs a shallow comparison of props. If props are the same (by reference for objects/arrays), it skips re-rendering and returns the cached result. You can provide a custom comparison function for more control over when to re-render."
            }
          ]
        }}
      >
        <CodeExample
          title="React.memo"
          description="Prevent re-renders when props haven't changed"
          code={`import { memo } from 'react';

// Without memo: re-renders on every parent render
function ExpensiveComponent({ data }: { data: Data }) {
  // Expensive computation
  const processed = expensiveProcess(data);
  return <div>{processed}</div>;
}

// With memo: only re-renders if props change
const MemoizedComponent = memo(ExpensiveComponent, (prevProps, nextProps) => {
  // Custom comparison (optional)
  return prevProps.data.id === nextProps.data.id;
});

// Usage
function Parent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState({ id: 1, name: 'Test' });
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <MemoizedComponent data={data} /> {/* Won't re-render when count changes */}
    </div>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard number={37} title="Code Splitting">
        <CodeExample
          title="Code Splitting"
          description="Load components only when needed"
          code={`import { lazy, Suspense } from 'react';

// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

// Route-based code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard number={38} title="Lazy Loading">
        <CodeExample
          title="Lazy Loading"
          description="Load resources on demand"
          code={`// Already covered in Code Splitting
// Also applies to images:

function Image({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div>
      {!loaded && <div>Loading image...</div>}
      <img
        src={src}
        alt={alt}
        loading="lazy" // Native browser lazy loading
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? 'block' : 'none' }}
      />
    </div>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard number={39} title="Suspense">
        <CodeExample
          title="Suspense"
          description="Show fallback while loading"
          code={`import { Suspense } from 'react';

// Suspense for lazy components
<Suspense fallback={<Spinner />}>
  <LazyComponent />
</Suspense>

// Suspense for data fetching (React 18+)
function DataComponent() {
  const data = use(fetchData()); // use() hook for promises
  return <div>{data}</div>;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent />
    </Suspense>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard 
        number={40} 
        title="Virtual DOM"
        theory={{
          what: "The Virtual DOM is a JavaScript representation of the real DOM. React maintains a virtual representation of the UI in memory and syncs it with the real DOM through a process called reconciliation.",
          why: "The Virtual DOM enables React's efficient updates. Instead of directly manipulating the DOM (which is slow), React compares the virtual DOM trees and updates only the changed parts. This makes React fast and efficient.",
          how: "When state changes, React creates a new virtual DOM tree. It then compares (diffs) this new tree with the previous one using a reconciliation algorithm. React identifies the minimal set of changes needed and updates only those parts in the real DOM.",
          keyPoints: [
            "Virtual DOM is a JavaScript representation of the real DOM",
            "React compares virtual DOM trees to find differences",
            "Only changed parts are updated in the real DOM",
            "This makes React updates efficient",
            "Virtual DOM enables declarative programming",
            "Reconciliation is the process of syncing virtual and real DOM"
          ],
          interviewQuestions: [
            {
              question: "What is the Virtual DOM?",
              answer: "The Virtual DOM is a JavaScript representation of the real DOM that React maintains in memory. When state changes, React creates a new virtual DOM tree, compares it with the previous one, and updates only the changed parts in the real DOM. This makes React updates efficient."
            },
            {
              question: "Why does React use Virtual DOM?",
              answer: "React uses Virtual DOM for performance. Direct DOM manipulation is slow. By maintaining a virtual representation and only updating what changed, React minimizes expensive DOM operations. The Virtual DOM also enables React's declarative programming model."
            },
            {
              question: "How does React update the DOM efficiently?",
              answer: "React uses a reconciliation algorithm that compares the new virtual DOM tree with the previous one. It identifies the minimal set of changes (the diff) and applies only those changes to the real DOM. React also batches updates and uses keys to efficiently update lists."
            }
          ]
        }}
      >
        <CodeExample
          title="Virtual DOM"
          description="React's reconciliation algorithm"
          code={`// React creates a virtual representation of the DOM
// When state changes:
// 1. React creates a new virtual DOM tree
// 2. Compares (diffs) with previous virtual DOM
// 3. Updates only the changed parts in real DOM

// This is why React is fast:
// - Batch updates
// - Efficient diffing algorithm
// - Minimal DOM manipulation

// You don't need to manually optimize this
// React handles it automatically`}
        />
      </ConceptCard>

      <ConceptCard 
        number={41} 
        title="Reconciliation"
        theory={{
          what: "Reconciliation is React's algorithm for comparing the new virtual DOM tree with the previous one and determining the minimal set of changes needed to update the real DOM.",
          why: "Reconciliation makes React efficient by minimizing DOM operations. Instead of replacing the entire DOM, React only updates what changed. This is crucial for performance, especially in large applications.",
          how: "React uses a diffing algorithm that compares elements by type and key. If elements are the same type, React updates only the changed attributes. If elements are different types, React replaces the entire subtree. Keys help React identify which items changed in lists.",
          keyPoints: [
            "Reconciliation compares virtual DOM trees",
            "Only changed parts are updated in real DOM",
            "Elements compared by type and key",
            "Keys are crucial for efficient list updates",
            "React batches updates for performance",
            "Different element types = full replacement"
          ],
          interviewQuestions: [
            {
              question: "What is reconciliation in React?",
              answer: "Reconciliation is React's algorithm for comparing the new virtual DOM tree with the previous one and determining what changed. React then updates only the changed parts in the real DOM, making updates efficient. It uses a diffing algorithm that compares elements by type and key."
            },
            {
              question: "How does React decide what to update?",
              answer: "React compares elements by type and key. If elements are the same type, React updates only the changed attributes. If elements are different types, React replaces the entire subtree. For lists, keys help React identify which items changed, moved, or were removed."
            },
            {
              question: "Why are keys important in lists?",
              answer: "Keys help React identify which items changed, were added, or removed in lists. Without keys, React has to compare items by position, which can cause unnecessary re-renders and bugs. Keys should be stable, unique, and predictable - ideally IDs from your data."
            }
          ]
        }}
      >
        <CodeExample
          title="Reconciliation"
          description="How React updates the DOM"
          code={`// React's reconciliation process:
// 1. Elements of different types → Replace entire tree
// 2. DOM elements of same type → Update changed attributes
// 3. Component elements of same type → Update props, re-render
// 4. Keys help React identify which items changed

// Keys are crucial for lists:
// ✅ Good: Stable, unique keys
{items.map(item => <Item key={item.id} data={item} />)}

// ❌ Bad: Index as key (if list can reorder)
{items.map((item, index) => <Item key={index} data={item} />)}

// React uses keys to match items between renders`}
        />
      </ConceptCard>
    </div>
  );
}

function TestingConcepts() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">🧪 Testing</h3>
        <p className="text-violet-100">Testing React applications</p>
      </div>

      <ConceptCard number={42} title="Jest">
        <CodeExample
          title="Jest Testing Framework"
          description="Install: npm install -D jest @testing-library/jest-dom"
          code={`// Button.test.tsx
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  const button = screen.getByText('Click Me');
  expect(button).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  const button = screen.getByText('Click');
  button.click();
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});`}
        />
      </ConceptCard>

      <ConceptCard number={43} title="React Testing Library" priority="🔥">
        <CodeExample
          title="React Testing Library"
          description="Test components like users interact with them"
          code={`import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function LoginForm() {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Submit logic
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Login</button>
    </form>
  );
}

test('user can type email and submit', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  
  const input = screen.getByPlaceholderText('Email');
  await user.type(input, 'test@example.com');
  
  expect(input).toHaveValue('test@example.com');
  
  const button = screen.getByText('Login');
  await user.click(button);
  
  // Assert submission
});`}
        />
      </ConceptCard>

      <ConceptCard number={44} title="Unit vs Integration Tests">
        <CodeExample
          title="Test Types"
          description="Different levels of testing"
          code={`// Unit Test: Test individual functions/components in isolation
test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});

// Integration Test: Test how components work together
test('user can add todo and see it in list', () => {
  render(<TodoApp />);
  const input = screen.getByPlaceholderText('Add todo');
  const button = screen.getByText('Add');
  
  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.click(button);
  
  expect(screen.getByText('New Todo')).toBeInTheDocument();
});

// E2E Test: Test entire user flows (Cypress, Playwright)`}
        />
      </ConceptCard>
    </div>
  );
}

function AdvancedConcepts() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">🧱 Advanced React Concepts</h3>
        <p className="text-rose-100">Advanced patterns and techniques</p>
      </div>

      <ConceptCard number={45} title="Error Boundaries">
        <CodeExample
          title="Error Boundaries"
          description="Catch JavaScript errors in component tree"
          code={`import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong: {this.state.error?.message}</div>;
    }
    return this.props.children;
  }
}

// Usage
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard number={46} title="Higher Order Components (HOC)">
        <CodeExample
          title="HOC Pattern"
          description="Function that takes a component and returns a new component"
          code={`// HOC: Adds loading state to any component
function withLoading<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithLoadingComponent(props: P & { isLoading?: boolean }) {
    if (props.isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...(props as P)} />;
  };
}

// Usage
const ButtonWithLoading = withLoading(Button);

<ButtonWithLoading isLoading={true} label="Click" />

// Common HOCs: withRouter, withAuth, withTheme`}
        />
      </ConceptCard>

      <ConceptCard number={47} title="Render Props">
        <CodeExample
          title="Render Props Pattern"
          description="Component that uses a function as a child"
          code={`// Render prop component
function Mouse({ render }: { render: (mouse: { x: number; y: number }) => ReactNode }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <>{render(mouse)}</>;
}

// Usage
<Mouse
  render={({ x, y }) => (
    <div>
      Mouse position: {x}, {y}
    </div>
  )}
/>`}
        />
      </ConceptCard>

      <ConceptCard number={48} title="Portals">
        <CodeExample
          title="Portals"
          description="Render children into a DOM node outside parent hierarchy"
          code={`import { createPortal } from 'react-dom';

function Modal({ children, isOpen }: { children: ReactNode; isOpen: boolean }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>,
    document.body // Render outside app root
  );
}

// Use cases: Modals, tooltips, dropdowns that need to escape parent overflow`}
        />
      </ConceptCard>

      <ConceptCard number={49} title="Refs & forwardRef">
        <CodeExample
          title="forwardRef"
          description="Forward refs to child components"
          code={`import { forwardRef, useImperativeHandle } from 'react';

// Forward ref to DOM element
const Input = forwardRef<HTMLInputElement, { label: string }>(
  ({ label }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} />
      </div>
    );
  }
);

// Expose methods via ref
const CustomInput = forwardRef<
  { focus: () => void },
  { label: string }
>(({ label }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  return <input ref={inputRef} />;
});

// Usage
function Form() {
  const inputRef = useRef<HTMLInputElement>(null);
  const customRef = useRef<{ focus: () => void }>(null);

  return (
    <div>
      <Input ref={inputRef} label="Name" />
      <CustomInput ref={customRef} label="Email" />
      <button onClick={() => customRef.current?.focus()}>Focus</button>
    </div>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard number={50} title="Concurrent Rendering (React 18)">
        <CodeExample
          title="React 18 Features"
          description="Concurrent features and improvements"
          code={`// Automatic batching (React 18)
// Multiple state updates are batched automatically
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setCount(c => c + 1); // Not batched in React 17
    setFlag(f => !f);     // Not batched in React 17
    // Both batched in React 18!
  }

  // useTransition: Mark updates as non-urgent
  const [isPending, startTransition] = useTransition();

  function handleChange(value: string) {
    setInput(value); // Urgent update
    startTransition(() => {
      setSearchResults(search(value)); // Non-urgent
    });
  }

  // useDeferredValue: Defer value updates
  const deferredValue = useDeferredValue(value);
}`}
        />
      </ConceptCard>
    </div>
  );
}

function ToolingConcepts() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-slate-500 to-gray-500 rounded-xl p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">🛠️ Tooling & Ecosystem</h3>
        <p className="text-slate-100">Development tools and setup</p>
      </div>

      <ConceptCard number={51} title="Vite / CRA" priority="🔥">
        <CodeExample
          title="Build Tools"
          description="Vite (modern, fast) vs Create React App (traditional)"
          code={`// Vite (This project uses Vite!)
npm create vite@latest my-app -- --template react-ts

// Features:
// - Lightning fast HMR
// - Optimized production builds
// - Native ES modules
// - Better TypeScript support

// Create React App (CRA)
npx create-react-app my-app --template typescript

// Features:
// - Zero configuration
// - Webpack under the hood
// - More established ecosystem

// Vite is recommended for new projects`}
        />
      </ConceptCard>

      <ConceptCard number={52} title="ESLint & Prettier">
        <CodeExample
          title="Code Quality Tools"
          description="Linting and formatting"
          code={`// ESLint: Find and fix code problems
// .eslintrc.js
module.exports = {
  extends: ['react-app', 'react-app/jest'],
  rules: {
    'no-console': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
};

// Prettier: Code formatter
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2
}

// VS Code settings
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}`}
        />
      </ConceptCard>

      <ConceptCard number={53} title="Babel">
        <CodeExample
          title="Babel"
          description="JavaScript compiler (transpiles modern JS to older versions)"
          code={`// Babel config (.babelrc)
{
  "presets": [
    "@babel/preset-env",      // Modern JavaScript
    "@babel/preset-react",     // JSX
    "@babel/preset-typescript" // TypeScript
  ],
  "plugins": [
    "@babel/plugin-proposal-class-properties"
  ]
}

// Vite uses esbuild (faster than Babel)
// CRA uses Babel
// Most build tools handle this automatically`}
        />
      </ConceptCard>

      <ConceptCard number={54} title="Webpack">
        <CodeExample
          title="Webpack"
          description="Module bundler (used by CRA)"
          code={`// webpack.config.js
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\\.tsx?$/,
        use: 'ts-loader',
      },
      {
        test: /\\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

// Vite uses Rollup for production (faster)
// Webpack is more configurable but slower`}
        />
      </ConceptCard>

      <ConceptCard number={55} title="TypeScript with React" priority="🔥">
        <CodeExample
          title="TypeScript Setup"
          description="This project uses TypeScript!"
          code={`// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}

// React + TypeScript patterns:
// - Define prop interfaces
// - Type event handlers
// - Type hooks
// - Type refs
// - Use generic types for reusable components

// This entire learning app is built with TypeScript!`}
        />
      </ConceptCard>
    </div>
  );
}

function ArchitectureConcepts() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl p-6 text-white">
        <h3 className="text-3xl font-bold mb-2">🏗️ Architectural Concepts</h3>
        <p className="text-amber-100">Design patterns and best practices</p>
      </div>

      <ConceptCard number={56} title="Component Design Patterns">
        <CodeExample
          title="Design Patterns"
          description="Common component patterns"
          code={`// 1. Container/Presentational Pattern
// Container: Handles logic
function UserContainer() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);
  return <UserPresentation user={user} />;
}

// Presentational: Handles UI
function UserPresentation({ user }: { user: User | null }) {
  return <div>{user?.name}</div>;
}

// 2. Compound Components
function Tabs({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);
  return <div>{children}</div>;
}
Tabs.Tab = ({ label }: { label: string }) => <button>{label}</button>;
Tabs.Panel = ({ children }: { children: ReactNode }) => <div>{children}</div>;

// 3. Render Props (covered earlier)
// 4. HOC (covered earlier)`}
        />
      </ConceptCard>

      <ConceptCard number={57} title="Separation of Concerns">
        <CodeExample
          title="Separation of Concerns"
          description="Organize code by responsibility"
          code={`// ✅ Good: Separate concerns
// components/UserCard.tsx - UI component
function UserCard({ user }: { user: User }) {
  return <div>{user.name}</div>;
}

// hooks/useUser.ts - Business logic
function useUser(userId: number) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  return user;
}

// utils/api.ts - API calls
export async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}

// ❌ Bad: Everything in one component
function UserCard({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`).then(res => res.json()).then(setUser);
  }, [userId]);
  return <div>{user?.name}</div>;
}`}
        />
      </ConceptCard>

      <ConceptCard number={58} title="Atomic Design">
        <CodeExample
          title="Atomic Design"
          description="Component hierarchy: Atoms → Molecules → Organisms"
          code={`// Atomic Design Structure:
// atoms/ - Smallest components (Button, Input)
// molecules/ - Simple combinations (SearchBar = Input + Button)
// organisms/ - Complex components (Header, Sidebar)
// templates/ - Page layouts
// pages/ - Full pages

// atoms/Button.tsx
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// molecules/SearchBar.tsx
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';

export function SearchBar() {
  return (
    <div>
      <Input placeholder="Search..." />
      <Button>Search</Button>
    </div>
  );
}

// organisms/Header.tsx
import { SearchBar } from '../molecules/SearchBar';
import { Button } from '../atoms/Button';

export function Header() {
  return (
    <header>
      <Logo />
      <SearchBar />
      <Button>Login</Button>
    </header>
  );
}`}
        />
      </ConceptCard>

      <ConceptCard number={59} title="Folder Structure">
        <CodeExample
          title="Project Structure"
          description="Organize files logically"
          code={`// Recommended structure:
src/
├── components/        # Reusable UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.module.css
│   └── Card/
├── pages/            # Page components
│   ├── Home.tsx
│   └── About.tsx
├── hooks/            # Custom hooks
│   ├── useAuth.ts
│   └── useFetch.ts
├── utils/            # Utility functions
│   ├── api.ts
│   └── helpers.ts
├── types/            # TypeScript types
│   └── index.ts
├── contexts/         # Context providers
│   └── AuthContext.tsx
├── assets/           # Images, fonts
└── App.tsx
└── main.tsx

// Alternative: Feature-based structure
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   └── dashboard/
└── shared/
    ├── components/
    └── utils/`}
        />
      </ConceptCard>

      <ConceptCard number={60} title="Reusable Components">
        <CodeExample
          title="Reusable Components"
          description="Build components that can be used in multiple places"
          code={`// ✅ Good: Flexible, reusable component
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled,
  loading,
}: ButtonProps) {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

// Usage in multiple places
<Button variant="primary" onClick={handleSave}>Save</Button>
<Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
<Button loading={isSubmitting}>Submit</Button>

// Principles:
// - Accept props for customization
// - Provide sensible defaults
// - Keep components focused
// - Make them composable`}
        />
      </ConceptCard>
    </div>
  );
}

// Helper component for concept cards
interface ConceptCardProps {
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
  number,
  title,
  description,
  priority,
  children,
  theory,
}: ConceptCardProps) {
  const [showExamples, setShowExamples] = useState(false);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500 w-full flex flex-col overflow-hidden">
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
